<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create customerContractNew">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{pageTitle}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left cpa_page_left" :class="{page_d_con_left_widthAll:!isRightBox}">
                    <div class="banner_part_line page_create_set_line">合同信息</div>
                    <el-form ref="form" :model="contract_from" label-width="125px">
                        <el-form-item label="平台主体：">
                            <el-select v-model="contract_from.platformCode"  placeholder="请选择"
                                       class="f_select1 inlineBlock"
                                       :disabled="isabled"
                                       @change="checkFrom">
                                <el-option
                                    v-for="(item,index) in options.customer"
                                    :key="item.platformCode"
                                    :label="item.platformName"
                                    :value="item.platformCode">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="contract_from.isOwner" class="f_radio1 inlineBlock" @change="checkFrom">
                                <el-radio :label="2" :disabled="isabled">甲方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="我方主体：">
                            <el-select v-model="contract_from.kyhdType" placeholder="请选择" class="f_select1 inlineBlock"
                                       @change="checkFrom" :disabled="isabled">
                                <el-option
                                    v-for="(item,index) in options.kyhd"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="contract_from.isOwner" class="f_radio1 inlineBlock" @change="checkFrom">
                                <el-radio :label="1" :disabled="isabled">甲方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="合同有效日期：">
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                format="yyyy/MM/dd"
                                @change="dateChange"
                                :picker-options="$store.state.pickerOptions2"
                                :disabled="isabled">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="合同编号：">
                            <el-input v-model="contract_from.contractNo" class="" placeholder="请输入合同编号"
                                      disabled></el-input>
                        </el-form-item>

                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit" v-if="!isabled">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div><!--
				-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isRightBox: false,
                isabled:false,
                menu_nav: ['信息流数据管理', '客户合同管理', '创建合同信息'],
                dateValue: '',
                contract_from: {
                    beginTime: '',
                    contractNo: '',
                    customerCode: '',
                    platformCode:'',
                    endTime: '',
                    id: 0,
                    isOwner: 1,
                    kyhdType: '',
                    marketingMode: 'XN',
                    productItems: [

                    ]
                },
                options: {
                    customer: [],
                    kyhd: [
                        {
                            id: 'Y1',
                            val: '深圳康远互动科技有限公司'
                        },
                        {
                            id: 'Y2',
                            val: '霍尔果斯康远互动网络科技有限公司'
                        },
                        {
                            id: 'Y3',
                            val: '上海贝玩网络科技有限公司'
                        },
                        {
                            id: 'Y4',
                            val: '深圳自由泰格互动科技有限公司'
                        },
                    ],
                    product: [
                        {
                            placeHolder: '请选择',
                            model_value: {},
                            items: []
                        }
                    ]
                },
                customerContractId: '',
                pageTitle: '创建合同信息',
            };
        },
        created() {
            this.customerSelect();
        },
        methods: {
            customerSelect() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpPlatGetPlatFormList,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.options.customer = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            cusSelect() {
                this.proInfo();
            },
            proSelect(index, obj) {
                if (typeof obj == 'object') {
                    if (!this.contract_from.productItems[index]) {
                        this.contract_from.productItems.push({id: '', productNo: ''});
                    }
                    this.contract_from.productItems[index].id = obj.productId;
                    this.contract_from.productItems[index].productNo = obj.productId;
                }
                this.checkFrom();
            },
            addRow() {
                let a=Object.assign({},this.options.product[0]);
                this.options.product.push(a);
            },
            checkFrom() {
                var obj = this.contract_from;
                if (obj.platformCode != '' && obj.kyhdType != ''  && obj.beginTime != '') {
                    var year = Math.ceil(this.datedifference(obj.beginTime, obj.endTime) / 365);
                    var beginT = obj.beginTime.replace(/-/g, '');
                    // var proCode = obj.productItems[0].productNo;
                    if (obj.isOwner == 1) {
                        this.contract_from.contractNo = obj.kyhdType + obj.platformCode + '00' + 'XN'+ beginT + year;
                    } else if (this.contract_from.isOwner == 2) {
                        this.contract_from.contractNo = obj.platformCode + obj.kyhdType + '00' + 'XN' + beginT + year;
                    }
                } else {
//                    console.log(false);
                    this.contract_from.contractNo = '';
                }
            },
            onSubmit() {
                var obj = this.contract_from;
                var url = this.apiUrl.fdpConNewPlatform;
                if(obj.platformCode != '' && obj.kyhdType != ''  && obj.beginTime != ''){
                    this.$http({
                        method: 'post',
                        url: url,
                        data: this.contract_from
                    }).then(res => {
                        var data = res.data;
                        if(res.status == 200){
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                            this.go_back();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '操作失败，请完善信息，并重新提交'
                            });
                        }
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '操作失败，请完善信息，并重新提交'
                        });
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '操作失败，请完善信息，并重新提交'
                    });
                }
            },
            go_back() {
                this.$router.back();
            },
            dateChange() {
                var date = this.dateValue;
                if (date.length > 0) {
                    this.contract_from.beginTime = this.formatDateTime(date[0], 'y-m-d');
                    this.contract_from.endTime = this.formatDateTime(date[1], 'y-m-d');
                }
                this.checkFrom();
            }
        }
    };
</script>
