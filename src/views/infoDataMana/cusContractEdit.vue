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
                        <el-form-item label="客户主体：">
                            <el-select v-model="contract_from.customerCode" filterable placeholder="请选择"
                                       class="f_select1 inlineBlock"
                                       @change="cusSelect()"
                                       :disabled="isabled">
                                <el-option
                                    v-for="(item,index) in options.customer"
                                    :key="item.customerCode"
                                    :label="item.customerName"
                                    :value="item.customerCode">
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
                        <el-form-item label="客户产品：" style="height:auto;position:relative;">
                            <el-form-item v-for="(item,index) in options.product" :key="index">
                                <el-select v-model="item.model_value" filterable :placeholder="item.placeHolder"
                                           class="f_select1 inlineBlock"
                                           @change="proSelect(index,item.model_value)" value-key="productId" :disabled="isabled">
                                    <el-option
                                        v-for="(c,i) in item.items"
                                        :key="c.productId"
                                        :label="c.productName"
                                        :value="c">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class="addRow" style="left:225px;" v-if="!isabled">
                                <el-button @click="addRow" style="">添加一行</el-button>
                            </div>
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
                <div class="page_d_con_right cpa_page_right" v-if="isRightBox">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">操作历史记录</div>
                        <div class="current_img">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </div>
                    </div>

                </div>
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
                menu_nav: ['信息流数据管理', '客户合同管理', '查看合同信息'],
                dateValue: '',
                contract_from: {
                    beginTime: '',
                    contractNo: '',
                    customerCode: '',
                    endTime: '',
                    id: '',
                    isOwner: 1,
                    kyhdType: '',
                    marketingMode: 'XN',
                    productItems: [
//                        {
//                            id: 0,
//                            productNo: ''
//                        }
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
//            this.pageInfo();
            this.customerSelect();
            this.customerContractId = this.$route.query.customerContractId;
            this.titleName = this.$route.query.titleName;
            if (this.customerContractId != ''&& this.titleName=='合同修改') {
                this.pageInfo();
                this.pageTitle = '编辑合同信息';
                this.isRightBox = this.dateStatus = true;
            }else if(this.customerContractId != ''&& this.titleName=='查看合同'){
                this.pageInfo();
                this.isabled=true;
                this.pageTitle = '合同信息';
            }
        },
        methods: {
            pageInfo() {
                /*合同*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpConGetCustomer,
                    params: {id: this.customerContractId}
                }).then(res => {
                    if (res.status == 200) {
                        console.log(res);
                        var data = res.data;
                        this.contract_from = data;
                        this.dateValue = [new Date(this.contract_from.beginTime), new Date(this.contract_from.endTime)];
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            customerSelect() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGetCustomerList,
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
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            proInfo() {
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListall,
                    params: {
                        customerCode: this.contract_from.customerCode,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.options.product = this.options.product.map((item, i) => {
                            return {placeHolder: '请选择', model_value: '', items: data};
                        });
                        for (let i = 1; i < this.contract_from.productItems.length; i++) {
                            this.addRow();
                        }
                        if (this.customerContractId == '') {
                            this.contract_from.productItems = [];
                        } else {
                            this.options.product.forEach((item, i) => {
                                for (let items of item.items) {
                                    if (items.productId == this.contract_from.productItems[i].id) {
                                        item.model_value = items;
                                    }
                                }
                            });
                        }
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
                if (obj.customerCode != '' && obj.kyhdType != '' && obj.productItems.length > 0 && obj.beginTime != '') {
                    var year = Math.ceil(this.datedifference(obj.beginTime, obj.endTime) / 365);
                    var beginT = obj.beginTime.replace(/-/g, '');
                    var proCode = obj.productItems[0].productNo;
                    if (obj.isOwner == 1) {
                        this.contract_from.contractNo = obj.kyhdType + obj.customerCode + proCode + 'XN' + beginT + year;
                    } else if (this.contract_from.isOwner == 2) {
                        this.contract_from.contractNo = obj.customerCode + obj.kyhdType + proCode + 'XN' + beginT + year;
                    }
                } else {
//                    console.log(false);
                    this.contract_from.contractNo = '';
                }
            },
            onSubmit() {
                var url = this.apiUrl.customercContNew;
                this.customerContractId != '' ? url = this.apiUrl.customercContUpdate : null;
                this.$http({
                    method: 'post',
                    url: url,
                    data: this.contract_from,
                }).then(res => {
                    var data=res.data;
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.go_back();
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
