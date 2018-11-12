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
                        <el-form-item label="客户名称：">
                            <el-input v-model="customerInfo.customerName" class="" placeholder="请输入客户名称"></el-input>
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
                            <el-input v-model="customerInfo.address" class="" placeholder="请按格式输入地址：省 市 详细地址"
                                      style="width:260px;"></el-input>
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
                dateValue: '',
                title: '创建客户信息',
                menu_nav: ['信息流数据管理', '客户管理', '创建客户信息'],
                customerInfo: {
                    'accountAddress': '',
                    'address': '',
                    'bank': '',
                    'bankAccount': '',
                    'busNo': '',
                    'cardExpired': '',
                    'contact': '',
                    'customerCode': '',
                    'customerName': '',
                    'email': '',
                    'finType': '',
                    'id': '',
                    'phone': '',
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
        },
        methods: {
            onSubmit() {
                console.log(this.customerInfo);
                this.$http({
                    method: 'post',
                    url: this.apiUrl.fdpCusNewCustomer,
                    data: this.customerInfo,
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '创建成功'
                            });
                            this.go_back();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '创建失败'
                            });
                            console.log(data.msg);
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '创建失败，请完善信息，并重新提交'
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
            dateChange() {
//                var date=this.pro_from.prices[index].date;
//                this.pro_from.prices[index].date=this.formatDateTime(date,'y-m-d');
                this.customerInfo.cardExpired = this.formatDateTime(this.dateValue, 'y-m-d');
            },
        }
    };
</script>
