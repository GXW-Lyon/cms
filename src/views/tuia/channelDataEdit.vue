<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="page_create">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{title}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left page_d_con_left_widthAll">
                    <el-form ref="form" :model="template_from" label-width="125px">
                        <el-form-item label="创建日期：">
                            <div class="block">
                                <el-date-picker
                                    disabled
                                    v-model=this.template_from.date
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="渠道权重：">
                            <el-select v-model="template_from.channel" placeholder="请选择渠道" class="f_select1" disabled>
                                <el-option
                                    v-for="item in channelList "
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台来源：">
                            <el-input v-model="template_from.srcTotal" class="f_input2" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="新  增：">
                            <el-input v-model="template_from.newTotal" class="f_input2" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="form_button" style="margin-top:60px">
                            <el-button type="primary" @click="onSubmit">{{but_text}}</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            apkFlag: true,
            adFlag: false,
            lpFlag: false,
            logo_visible: false,
            title: '编辑渠道每日数据',
            menu_nav: ['推啊数据管理','渠道每日数据','编辑渠道每日数据'],
            fileList: [],
            template_from: {
                channel: '',
                date: '',
                srcTotal: '',
                newTotal: '',
                id: ''
            },
            channelList: [],
            but_text: '确认',
        };
    },
    created () {
        this.template_from.id = this.$route.query.id;
        this.pageInfo(this.template_from.id);
    },
    methods: {
        /*每条数据详情*/
        pageInfo (id) {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminStatChannelGet,
                params:{id:id}
            }).then(res => {
                if(res.status == 200){
                    var data = res.data;
                    var str = data.date;
                    var str2 = str.replace(/\./g,'-');
                    data.date = str2;
                    this.template_from.date = str2;
                    this.template_from = data;
                }
            }).catch();
        },
        onSubmit () {
            if (this.template_from.date == '' || this.template_from.channel == '' || this.template_from.newTotal === '' || this.srcTotal === '') {
                this.$message({
                    type: 'error',
                    message: "所有信息不能为空，请重新提交"
                });
                return false;
            };
            this.$http({
                method: 'post',
                url: this.apiUrl.tuiaAdminStatChannelUpdate,
                data: this.template_from,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    if(data.status == 1){
                        this.$message({
                            type:'success',
                            message:'编辑成功！'
                        });
                        this.go_back();
                    }else{
                        this.$message({
                            type:'error',
                            message:'编辑失败！'
                        });
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        go_back () {
            this.$router.back();
        },
    },
};
</script>
