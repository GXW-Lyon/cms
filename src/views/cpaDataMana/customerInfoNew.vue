<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create customerInfoNew">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{title}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="customerInfo" label-width="125px">
                        <div class="banner_part_line page_create_set_line">公司信息</div>
                        <el-form-item label="客户简称：">
                            <el-input v-model="customerInfo.name" class="" placeholder="请输入客户简称"></el-input>
                        </el-form-item>
                        <el-form-item label="客户主体：" style="height:auto;position:relative;">
                            <el-form-item v-for="(item,index) in customerInfo.alias" :key="item.id" v-if="!item.delete">
                                <el-input v-model="item.name" class="" placeholder="请输入客户主体"></el-input>
                                <span class="r_span" style="font-size:16px;" v-if="" @click="delAlias(index)">删除</span>
                            </el-form-item>
                            <div class="addRow">
                                <el-button @click="addAlias">添加一行</el-button>
                            </div>
                        </el-form-item>
                        <!--<el-form-item label="客户全称：">-->
                            <!--<el-input v-model="customerInfo.fullName" class="" placeholder="请输入客户全称"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="客户性质：">
                            <el-select v-model="customerInfo.property" filterable placeholder="请选择" class="f_select1"
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
                            <el-input v-model="customerInfo.busNo" class="" placeholder="请输入营业执照号"></el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期：">
                            <!--<el-input v-model="customerInfo.cardExpired" class="" placeholder="请输入证件有效期：yyyy-mm-dd"></el-input>-->
                            <div class="block">
                                <el-date-picker
                                    v-model="dateValue"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <div class="banner_part_line page_create_set_line">联系方式</div>
                        <el-form-item label="联系人：">
                            <el-input v-model="customerInfo.contact" class="" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码：">
                            <el-input v-model="customerInfo.phone" class="" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="customerInfo.email" class="" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ：">
                            <el-input v-model="customerInfo.qq" class="" placeholder="请输入QQ号"></el-input>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <el-input v-model="customerInfo.address" class="" placeholder="请按格式输入地址：省 市 详细地址" style="width:260px;"></el-input>
                        </el-form-item>
                        <el-form-item label="后台账号：" style="height:auto;position:relative;">
                            <el-form-item v-for="item in customerInfo.adminSysAccounts" :key="item.id">
                                http://
                                <el-input v-model="item.url" class="account_number"
                                          placeholder="请输入后台网址" auto-complete	="off" disabled style="position: absolute;z-index: -1;"></el-input>
                                <el-input v-model="item.account" class="account_number"
                                          placeholder="请输入后台账号" auto-complete	="off" disabled style="position: absolute;z-index: -1;"></el-input>
                                <el-input type="password" v-model="item.pwd" class="account_number"
                                          placeholder="请输入后台密码" auto-complete	="off" disabled style="position: absolute;z-index: -1;"></el-input>
                                <el-input v-model="item.url" class="account_number"
                                          placeholder="请输入后台网址" auto-complete	="off"></el-input>
                                <el-input v-model="item.account" class="account_number"
                                          placeholder="请输入后台账号" auto-complete	="off"></el-input>
                                <el-input type="password" v-model="item.pwd" class="account_number"
                                          placeholder="请输入后台密码" auto-complete	="off"></el-input>
                            </el-form-item>
                            <div class="addRow">
                                <el-button @click="addRow()">添加一行</el-button>
                            </div>
                        </el-form-item>
                        <div class="banner_part_line page_create_set_line">财务信息</div>
                        <el-form-item label="财务类型：">
                            <el-select v-model="customerInfo.finType" filterable placeholder="请选择" class="f_select1"
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
                            <el-input v-model="customerInfo.taxId" class="" placeholder="请输入纳税登记号"></el-input>
                        </el-form-item>
                        <el-form-item label="收款银行：">
                            <el-input v-model="customerInfo.bank" class="" placeholder="请输入收款银行"></el-input>
                        </el-form-item>
                        <el-form-item label="开户地址：">
                            <el-input v-model="customerInfo.accountAddress" class="" placeholder="请输入开户地址"></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号：">
                            <el-input v-model="customerInfo.bankAccount" class="" placeholder="请输入银行账号"></el-input>
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
                dateValue:'',
                title:'创建客户信息',
                menu_nav: ['CPA数据管理', '客户信息管理', '创建客户信息'],
                customerInfo: {
                    'accountAddress': '',
                    'address': '',
                    'adminSysAccounts': [
                        {
                            'account': '',
                            'id': 1,
                            'pwd': '',
                            'url': ''
                        },
                    ],
                    'alias':[
                        {
                            'id':1,
                            'name':'',
                            'delete':false
                        }
                    ],
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
                    'phone': '',
                    'property': '',
                    'qq': '',
                    'taxId': ''
                },
                adminSysAccountsIdCount:1,
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
            this.customerInfo.id = parseInt(this.$route.query.customerId);
            if(this.customerInfo.id>0){
                this.title='编辑客户信息';
                this.pageInfo();
            }
        },
        methods: {
            pageInfo(){
                /*初始化客户信息*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerGet,
                    params: {
                        id: this.customerInfo.id,
                    }
                }).then(res => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.customerInfo = res.data;
                        this.customerInfo.finType=String(this.customerInfo.finType);
                        this.customerInfo.property=String(this.customerInfo.property);
                        this.customerInfo.adminSysAccounts.length==0?this.customerInfo.adminSysAccounts.push({
                            'account': '',
                            'id': 1,
                            'pwd': '',
                            'url': ''
                        }):null;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            onSubmit() {
                var apiUrl=this.apiUrl.customerNew;
                this.customerInfo.id>0?apiUrl=this.apiUrl.customerUpdate:null;
                var adminLen=this.customerInfo.adminSysAccounts.length;
                if(adminLen>1&&this.customerInfo.adminSysAccounts[adminLen-1].url==''){
                    this.customerInfo.adminSysAccounts.pop();
                }
                if(!this.customerInfo.id&&this.customerInfo.alias.length==1&&this.customerInfo.alias[0].name==''){
                    this.$message({
                        type: 'info',
                        message: '客户主体不能为空'
                    });
                }
                let flag=false;
                if(this.customerInfo.id){
                    this.customerInfo.alias.forEach((item,index)=>{
                        console.log(item.delete);
                        if(!item.delete&&item.name)
                            return false;
                        if(index==this.customerInfo.alias.length-1){
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
                    data: this.customerInfo,
                }).then(res => {
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
            addRow(){
                var adminArr=this.customerInfo.adminSysAccounts;
                var adminLen=adminArr.length;
                if(adminArr[adminLen-1].url==''){
                    this.$message({
                        type: 'info',
                        message: '后台链接不能为空'
                    });
                    return false;
                }
                this.adminSysAccountsIdCount=adminLen+1;
                this.customerInfo.adminSysAccounts.push({
                    'account': '',
                    'id': this.adminSysAccountsIdCount,
                    'pwd': '',
                    'url': ''
                });
            },
            addAlias(){
                var aliasArr=this.customerInfo.alias;
                var aliasLen=aliasArr.length;
                if(aliasLen>0&&aliasArr[aliasLen-1].name==''&&!aliasArr[aliasLen-1].delete){
                    this.$message({
                        type: 'info',
                        message: '不可重复添加空字段'
                    });
                    return false;
                }
                this.customerInfo.alias.push({
                    'id': aliasLen+1,
                    'name': '',
                    'delete': false
                });
            },
            delAlias(index){
                let aliasArr=this.customerInfo.alias;
                let aliasLen=aliasArr.length;
                if(aliasLen<=1){
                    if(this.customerInfo.id){
                        this.customerInfo.alias[index].delete=true;
                        // this.customerInfo.alias.push({
                        //     'id': aliasLen+1,
                        //     'name': '',
                        //     'delete': false
                        // });
                    }else{
                        this.customerInfo.alias=[{
                            'id': 1,
                            'name': '',
                            'delete': false
                        }];
                    }
                }else{
                    if(this.customerInfo.id){
                        this.customerInfo.alias[index].delete=true;
                    }else{
                        this.customerInfo.alias.splice(index,1);
                        this.customerInfo.alias.forEach((item,index)=>{
                            item.id=index+1;
                        });
                    }
                }
                console.log(this.customerInfo.alias);
            },
            dateChange(){
//                var date=this.pro_from.prices[index].date;
//                this.pro_from.prices[index].date=this.formatDateTime(date,'y-m-d');
                this.customerInfo.cardExpired = this.formatDateTime(this.dateValue, 'y-m-d');
            },
        }
    };
</script>
