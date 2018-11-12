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
                                    v-model="dateValue"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="渠道权重：">
                            <el-select v-model="template_from.channel" placeholder="请选择渠道" class="f_select1">
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
            title: '新建渠道每日数据',
            menu_nav: ['推啊数据管理','渠道每日数据', '新建渠道每日数据'],
            template_from: {
                channel: '',
                date: '',
                newTotal: '',
                srcTotal:''
            },
            channelList: [],
            but_text: '确认',
            dateValue:''
        };
    },
    created () {
        this.channelInfo();
    },
    methods: {
        /*渠道*/
        channelInfo () {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.channelList = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onSubmit () {
            console.log(this.template_from);
            if (this.template_from.date == '' || this.template_from.channel == '' || this.template_from.newTotal === '' || this.srcTotal === '') {
                this.$message({
                    type: 'error',
                    message: "所有信息不能为空，请重新提交"
                });
                return false;
            };
            this.$http({
                method: 'post',
                url: this.apiUrl.tuiaAdminStatChannelNew,
                data: this.template_from
            }).then(res => {
                if(res.status==200){
                    var data = res.data;
                    if(data.status == 1){
                        this.$message({
                            type:'success',
                            message:'新建成功！'
                        });
                        this.go_back();
                    }else if(data.status == -1){
                        this.$message({
                            type:'error',
                            message:'数据已存在！'
                        });
                    }
                }else{
                    this.$message({
                        type:'error',
                        message:'新建失败！'
                    });
                }
            }).catch(error => {});
        },
        /*改变时间选择器*/
        dateChange () {
            if (this.dateValue != '' && typeof this.dateValue != 'undefined') {
                this.template_from.date = this.formatDateTime(this.dateValue, 'y-m-d');
            } else {
                this.template_from.date = '';
            }
        },
        go_back () {
            this.$router.back();
        },
    },
};
</script>
