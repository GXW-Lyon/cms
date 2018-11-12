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
                    <el-form ref="form" :model="account" label-width="125px">
                        <div class="banner_part_line page_create_set_line">账号信息</div>
                        <el-form-item label="选择平台：">
                            <el-select v-model="account.platformId" filterable placeholder="请选择"
                                       class="f_select1" :disabled="platformStatus"
                            >
                                <el-option
                                    v-for="(item,index) in platform_items.options "
                                    :key="item.platformId"
                                    :label="item.platformName"
                                    :value="item.platformId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建账号：" style="height:auto;position:relative;">
                            <el-input v-model="account.name" class=""
                                      placeholder="请输入后台账号" auto-complete="off" disabled
                                      style="position: absolute;z-index: -1;"></el-input>
                            <el-input v-model="account.pwd" class=""
                                      placeholder="请输入后台密码" auto-complete="off" disabled
                                      style="position: absolute;z-index: -1;"></el-input>
                            <el-input v-model="account.name" class=""
                                      placeholder="请输入后台账号" auto-complete="off"></el-input>
                            <el-input v-model="account.pwd" class=""
                                      placeholder="请输入后台密码" auto-complete="off"></el-input>
                            <el-button type="primary" @click="add" style="margin-left: 20px;">添加一行</el-button>
                        </el-form-item>
                        <el-form-item label="" style="height:auto;position:relative;" v-for="(items,i) in account.operators" :key="i">
                            <el-date-picker
                                v-model="items.date"
                                type="date"
                                placeholder="选择日期"
                                @change="dateChange(i)">
                            </el-date-picker>
                            <el-select v-model="operate_items.model_value[i]" placeholder="运营者" class="f_select1" clearable value-key="operatorId" @change="operateSelect(i)">
                                <el-option
                                    v-for="(item,index) in operate_items.options "
                                    :key="index"
                                    :label="item.name"
                                    :value="item">
                                </el-option>
                            </el-select>
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
                title: '创建账号信息',
                menu_nav: ['信息流数据管理', '账号管理', '创建账号信息'],
                msg: '创建',
                params: {
                    date:''
                },
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: []
                },
                operate_items: {
                    model_value: [],
                    placeHolder: '运营人',
                    options: []
                },
                platformStatus: false,
                accountId: '',
                account:{
                    "id": null,
                    "name": "",
                    "operators": [],
                    "platformId": '',
                    "pwd": "",
                }
            };
        },
        created() {
            this.accountId = this.$route.query.id;
            if (this.accountId != '' && typeof this.accountId != 'undefined') {
                this.title = '编辑账号信息';
                this.msg = '编辑';
                this.menu_nav[2] = '编辑账号信息';
                this.platformStatus = true;
                this.pageInfo();
            }
            this.platform();
            this.operate();
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
                    console.log(this.platform_items.options);
                }).catch(error => {
                    console.log(error);
                });
            },
            /*运营人*/
            operate() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccGetOperator
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.operate_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*获取账号信息*/
            pageInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccGetAccount,
                    params: {
                        id: this.accountId
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        data.operators.forEach((item,index)=>{
                            this.operate_items.model_value.push({
                                operatorId:item.operatorId,
                                date:item.date,
                                id:item.id
                            });
                        });
                        this.account = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            dateChange(index) {
                let nowDate=this.account.operators[index].date;
                if (nowDate != '' && typeof nowDate != 'undefined') {
                    this.account.operators[index].date = this.formatDateTime(nowDate, 'y-m-d');
                } else {
                    this.account.operators[index].date = '';
                }
            },
            operateSelect(index){
                this.account.operators[index].operatorId=this.operate_items.model_value[index].operatorId;
            },
            add(){
                this.account.operators.push({
                    "date": "",
                    "id": null,
                    "operatorId": ''
                });
            },
            onSubmit() {
                if (this.account.platformId == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择平台'
                    });
                    return false;
                } else if (this.account.name == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入账号'
                    });
                    return false;
                } else if (this.account.pwd == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入密码'
                    });
                    return false;
                }
                let apiUrl = this.apiUrl.fdpAccNewPlatform;
                if (this.accountId != '' && typeof this.accountId != 'undefined') {
                    apiUrl = this.apiUrl.fdpAccUpdateAccount;
                }
                console.log(this.account);
                this.$http({
                    method: 'post',
                    url: apiUrl,
                    data: this.account,
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        console.log(data);
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: this.msg + '成功'
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
                            message: this.msg + '失败，请重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请重新提交'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
        }
    };
</script>
