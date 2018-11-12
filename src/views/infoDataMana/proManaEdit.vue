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
                    <el-form ref="form" :model="proInfo" label-width="125px">
                        <div class="banner_part_line page_create_set_line">账号信息</div>
                        <el-form-item label="选择平台：">
                            <el-select v-model="proInfo.platformId" filterable placeholder="请选择"
                                       class="f_select1" disabled
                            >
                                <el-option
                                    v-for="(item,index) in platform_items.options "
                                    :key="item.platformId"
                                    :label="item.platformName"
                                    :value="item.platformId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-select v-model="proInfo.customId" filterable placeholder="请选择"
                                       class="f_select1" disabled
                            >
                                <el-option
                                    v-for="(item,index) in customer_items.options "
                                    :key="item.id"
                                    :label="item.customerName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品名称：">
                            <el-input v-model="proInfo.productName" class="" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="添加预算：">
                            <el-input v-model="proInfo.budget" class="" placeholder="请输入预算"
                                      :style="{'margin-right':'10px'}"></el-input>
                            元
                        </el-form-item>
                        <el-form-item label="返点比例：" style="height:auto;position:relative;">
                            <el-form-item v-for="(item,index) in proInfo.rebateList" :key="index">
                                <el-date-picker
                                    v-model="item.time"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateChange(item.time,index)">
                                </el-date-picker>
                                <el-input v-model="item.value" class="" type="number" placeholder="请输入返点比例"
                                          :style="{margin:'0 10px'}"></el-input>
                                %
                            </el-form-item>
                            <div class="addRow">
                                <el-button @click="addRow()">添加一行</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                        <div class="banner_part_line page_create_set_line">添加关联账号</div>
                        <el-form-item label="关联账号：" style="height:auto;position:relative;">
                            <div class="checkGroupBox">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox v-for="(item,index) in checks" :key="item.id" :label="item.name"
                                    ></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="relatAccount">确认</el-button>
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
                title: '创建产品信息',
                menu_nav: ['信息流数据管理', '产品管理', '编辑产品信息'],
                checks: [],
                checkList: [],
                relationList: [],
                proInfo: {
                    'budget': '',
                    'customId': '',
                    'platformId': '',
                    'productName': '',
                    'rebateList': [
                        {
                            'time': '',
                            'value': ''
                        }
                    ]
                },
                productId: '',
                relationAccountInfo: {},
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: []
                },
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: []
                },
            };
        },
        created() {
            this.productId = this.$route.query.proId;
            this.platform();
            this.customer();
            this.pageInfo();
        },
        methods: {
            /*平台*/
            platform() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpPlaGetPlatformList,
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.platform_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*客户*/
            customer() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGetCustomerList,
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*账号*/
            account() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccSearchAccount,
                    params: {
                        offset: 1,
                        limit: 9999,
                        platformId: this.proInfo.platformId
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.checks = [];
                        for (let item of data.items) {
                            item.productName == null || item.productName == this.proInfo.productName ? this.checks.push(item) : null;
                        }
                        this.accountInfo();
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*初始化产品信息*/
            pageInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListproduct,
                    params: {
                        productId: this.productId,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.proInfo = res.data;
                        this.account();
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*初始化账号信息*/
            accountInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProSearch_product_account,
                    params: {
                        productId: this.productId,
                        platformId: this.proInfo.platformId
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.relationAccountInfo = data;
                        this.checkList = [];
                        for (let item of data.list) {
                            for (let check of this.checks) {
                                if (item.accountId == check.id) {
                                    this.checkList.push(check.name);
                                }
                            }
                        }
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*提交*/
            onSubmit() {
                for (let key in this.proInfo) {
                    if(key == 'rebateList') {
                        var rebate = this.proInfo[key];
                        var rebatelen = rebate.length;
                        for (let i = 0; i < rebatelen; i++) {
                            if (rebate[i].time == '' || rebate[i].value == '') {
                                rebate.splice(i, 1);
                                i--;
                                rebatelen = rebate.length;
                            }
                        }
                        if (rebatelen == 0) {
                            this.addRow();
                        }
                    }
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.fdpProModify,
                    data: this.proInfo,
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                            this.productId = data.id;
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
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
            /*返回*/
            go_back() {
                this.$router.back();
            },
            /*时间选择器*/
            dateChange(date, index) {
                if (date != '' && typeof date != 'undefined' && date != null) {
                    this.proInfo.rebateList[index].time = this.formatDateTime(new Date(date), 'y-m-d');
                } else {
                    this.proInfo.rebateList[index].time = '';
                }
            },
            /*关联账号*/
            relatAccount() {
                this.relationList = [];
                for (let checked of this.checkList) {
                    for (let item of this.checks) {
                        if (item.name === checked) {
                            this.relationList.push({
                                accountId: item.id,
                                accountName: item.name
                            });
                        }
                    }
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.fdpProUpdate_product_account,
                    data: {
                        list: this.relationList,
                        platformId: this.proInfo.platformId,
                        productId: this.productId,
                        productName: this.proInfo.productName,
                    },
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                            this.go_back();
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '关联失败，请完善信息，并重新提交'
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
            /*添加一行*/
            addRow() {
                for (let item of this.proInfo.rebateList) {
                    if (item.time == '' || item.value == '') {
                        this.$message({
                            type: 'info',
                            message: '请完善返点比例信息再添加新行'
                        });
                        return false;
                    }
                }
                this.proInfo.rebateList.push({
                    time: '',
                    value: ''
                });
            },
        }
    };
</script>
