<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create customerInfoNew channelInfoNew">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{title}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="channelInfo" label-width="125px">
                        <div class="banner_part_line page_create_set_line">公司信息</div>
                        <el-form-item label="渠道简称：">
                            <el-input v-model="channelInfo.name" class="" placeholder="请输入客户名称"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="渠道全称：">-->
                            <!--<el-input v-model="channelInfo.fullName" class="" placeholder="请输入客户名称"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="渠道主体：" style="height:auto;position:relative;">
                            <el-form-item v-for="(item,index) in channelInfo.alias" :key="item.id" v-if="!item.delete">
                                <el-input v-model="item.name" class="" placeholder="请输入渠道主体"></el-input>
                                <span class="r_span" style="font-size:16px;" v-if="" @click="delAlias(index)">删除</span>
                            </el-form-item>
                            <div class="addRow">
                                <el-button @click="addAlias">添加一行</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item label="渠道性质：">
                            <el-select v-model="channelInfo.property" filterable placeholder="请选择" class="f_select1"
                            >
                                <el-option
                                    v-for="(item,index) in options.property "
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="营业执照号：">
                            <el-input v-model="channelInfo.busNo" class="" placeholder="请输入营业执照号"></el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期：">
                            <el-input v-model="channelInfo.cardExpired" class="" placeholder="请输入证件有效期：yyyy-mm-dd"></el-input>
                        </el-form-item>
                        <div class="banner_part_line page_create_set_line">联系方式</div>
                        <el-form-item label="账号：">
                            <el-input v-model="channelInfo.account" class="" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input v-model="channelInfo.contact" class="" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码：">
                            <el-input v-model="channelInfo.phone" class="" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="channelInfo.email" class="" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ：">
                            <el-input v-model="channelInfo.qq" class="" placeholder="请输入QQ号"></el-input>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <el-input v-model="channelInfo.address" class="" placeholder="请按格式输入地址：省 市 详细地址" style="width:260px;"></el-input>
                        </el-form-item>
                        <div class="banner_part_line page_create_set_line">财务信息</div>
                        <el-form-item label="财务类型：">
                            <el-select v-model="channelInfo.finType" filterable placeholder="请选择" class="f_select1"
                            >
                                <el-option
                                    v-for="(item,index) in options.property "
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="纳税登记号：">
                            <el-input v-model="channelInfo.taxId" class="" placeholder="请输入纳税登记号"></el-input>
                        </el-form-item>
                        <el-form-item label="收款银行：">
                            <el-input v-model="channelInfo.bank" class="" placeholder="请输入收款银行"></el-input>
                        </el-form-item>
                        <el-form-item label="开户地址：">
                            <el-input v-model="channelInfo.accountAddress" class="" placeholder="请输入开户地址"></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号：">
                            <el-input v-model="channelInfo.bankAccount" class="" placeholder="请输入银行账号"></el-input>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
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
        data() {
            return {
                title:'创建渠道信息',
                menu_nav: ['CPA数据管理', '渠道信息管理','创建渠道信息'],
                channelInfo: {
                    "account":'',
                    'accountAddress': '',
                    'address': '',
                    'bank': '',
                    'bankAccount': '',
                    'busNo': '',
                    'cardExpired': '',
                    'contact': '',
                    'email': '',
                    'finType':'',
                    'id': '',
                    'name': '',
                    'fullName': '',
                    'alias':[
                        {
                            'id':1,
                            'name':'',
                            'delete':false
                        }
                    ],
                    'phone': '',
                    'property': '',
                    'qq': '',
                    'taxId': ''
                },
                options: {
                    property: [
                        {
                            id: '1',
                            val: '公司'
                        },
                        {
                            id: '2',
                            val: '个人'
                        },
                    ],
                },
            };
        },
        created() {
            this.channelInfo.id = parseInt(this.$route.query.channelId);
            if(this.channelInfo.id>0){
                this.title='编辑客户信息';
                this.pageInfo();
            }
        },
        methods: {
            pageInfo(){
                /*初始化客户信息*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelGet,
                    params: {
                        id: this.channelInfo.id,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.channelInfo = res.data;
                        this.channelInfo.finType=String(this.channelInfo.finType);
                        this.channelInfo.property=String(this.channelInfo.property);
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            onSubmit() {
                var apiUrl=this.apiUrl.channelNew;
                this.channelInfo.id>0?apiUrl=this.apiUrl.channelUpdate:null;
                if(!this.channelInfo.id&&this.channelInfo.alias.length==1&&this.channelInfo.alias[0].name==''){
                    this.$message({
                        type: 'info',
                        message: '客户主体不能为空'
                    });
                }
                let flag=false;
                if(this.channelInfo.id){
                    this.channelInfo.alias.forEach((item,index)=>{
                        console.log(item.delete);
                        if(!item.delete&&item.name)
                            return false;
                        if(index==this.channelInfo.alias.length-1){
                            flag=true;
                            this.$message({
                                type: 'info',
                                message: '客户主体不能为空'
                            });
                        }
                    });
                }
                if(flag){return false;}
                this.$http({
                    method: 'post',
                    url: apiUrl,
                    data: this.channelInfo,
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if(data.status==2){
                            this.$message({
                                type: 'info',
                                message: data.msg
                            });
                        }else{
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                            this.go_back();
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败，请完善信息，并重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请完善信息，并重新提交'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
            addAlias(){
                var aliasArr=this.channelInfo.alias;
                var aliasLen=aliasArr.length;
                if(aliasLen>0&&aliasArr[aliasLen-1].name==''&&!aliasArr[aliasLen-1].delete){
                    this.$message({
                        type: 'info',
                        message: '不可重复添加空字段'
                    });
                    return false;
                }
                this.channelInfo.alias.push({
                    'id': aliasLen+1,
                    'name': '',
                    'delete': false
                });
            },
            delAlias(index){
                let aliasArr=this.channelInfo.alias;
                let aliasLen=aliasArr.length;
                if(aliasLen<=1){
                    if(this.channelInfo.id){
                        this.channelInfo.alias[index].delete=true;
                        // this.channelInfo.alias.push({
                        //     'id': aliasLen+1,
                        //     'name': '',
                        //     'delete': false
                        // });
                    }else{
                        this.channelInfo.alias=[{
                            'id': 1,
                            'name': '',
                            'delete': false
                        }];
                    }
                }else{
                    if(this.channelInfo.id){
                        this.channelInfo.alias[index].delete=true;
                    }else{
                        this.channelInfo.alias.splice(index,1);
                        this.channelInfo.alias.forEach((item,index)=>{
                            item.id=index+1;
                        });
                    }
                }
                console.log(this.channelInfo.alias);
            },
        }
    };
</script>
