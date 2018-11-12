<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="info_flow_content customerCollect" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="finance_info">
                <div class="f_i_date">
                    <span class="f_i_date_title">财务信息</span>
                    <span class="demonstration">选择日期</span>
                    <el-date-picker
                        v-model="financeDateValue"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        format="yyyy / MM / dd"
                        :picker-options="$store.state.pickerOptions2">
                    </el-date-picker>
                </div>
                <div class="f_i_date f_i_info">
                    <p style="display:inline-block;" v-for="(c, i) in financeData" :key="i">
                        <span class="f_i_date_title">{{c.ownerName}}</span>
                        <span class="f_i_date_title f_i_info_long"><i class="moneyIcon"></i><span
                            class="span_margin">应收：<em>{{c.customerCost}}</em>元</span><span>实收：<em>{{c.realtimeDataCost}}</em>元</span></span>
                    </p>
                </div>

            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content" style="padding: 27px 5%;">
                    <div class="dateSelect" style="display:inline-block;width:45%;">
                        <div class="block">
                            <el-select v-model="channel_items.model_value"
                                       :placeholder="channel_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                                       filterable>
                                <el-option
                                    v-for="item in channel_items.options"
                                    :key="item.channelCode"
                                    :label="item.name"
                                    :value="item.channelCode">
                                </el-option>
                            </el-select>
                            <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch dateBut" style="display:inline-block;width:45%;text-align:right;">
                        <el-button type="primary" @click.stop="addExamine"><i class="el-icon-plus"></i>添加预付款
                        </el-button><!--
					  -->
                        <el-button class="page_d_s_button" @click.stop="importData">导出当前明细</el-button>
                    </div>
                </div>
            </div>
            <div class="info_ad_table">
                <div class="page_d_title">
                    <i style="visibility:hidden;"></i><span></span>
                    <div class="tableVisibleMenu">
                        <p class="visibleMenuBut" @click="changeCheckStatus($event)"></p>
                        <div class="visibleMenuSelect" v-if="visibleMenuSelectStatus" @click="preventDefault($event)">
                            <el-checkbox-group
                                v-model="checkedCities"
                                :min="1"
                                @change="checkedChange">
                                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="tableDetail">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="查看明细"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="seeBill(scope.row.entityCode,scope.row.entityProductCode)"><i class="el-icon-view"></i></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="审批进度"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="examineProgress(scope.row.txHistoryIds)">
                                    <span>{{scope.row.childNum}}</span></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="bill" v-if="billStatus" @click.stop="">
                <div class="bill_title">
                    <span @click="billImport">导出</span>
                    <button @click.stop="exit">×</button>
                </div>
                <div class="bill_table">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(item,i) in tabs" :key="i" :label=item.label :name=item.name></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="bill_table_detail">
                    <el-table
                        :data="tableDataBillDetail"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column_bill_detail"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="examine" v-if="examineStatus" @click.stop="">
                <div class="examine_title">
                    <span>发起预付款审批</span>
                    <button @click.stop="exit">×</button>
                </div>
                <el-form ref="form" :model="examine_from" label-width="125px">
                    <el-form-item label="渠道名称：">
                        <el-select v-model="examine_from.entityCode"
                                   :placeholder="channel_items.placeHolder" class="f_input1 unBorderRadius selectMaxWidth"
                                   @change="proInfo">
                            <el-option
                                v-for="item in channel_items.options"
                                :key="item.channelCode"
                                :label="item.name"
                                :value="item.channelCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select v-model="examine_from.entityProductCode"
                                   :placeholder="pro_items.placeHolder" class="f_input1 unBorderRadius selectMaxWidth"
                                   >
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.productCode"
                                :label="item.productName"
                                :value="item.productCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预付金额：">
                        <el-input v-model="examine_from.price" class="f_input1"></el-input>
                    </el-form-item>
                    <el-form-item label="我方主体：">
                        <el-select v-model="examine_from.ownerCode" placeholder="请选择" class="f_input1 inlineBlock"
                                   @change="">
                            <el-option
                                v-for="(item,index) in kyhd"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" style="height:auto!important;">
                        <el-input type="textarea" class="f_textarea" v-model="examine_from.notes"></el-input>
                    </el-form-item>
                    <el-form-item class="form_button" style="margin-top:20px;">
                        <el-button type="primary page_d_s_button" @click="onSubmit">确认</el-button>
                        <el-button class="page_d_s_button" @click="exit">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bill" v-if="examineProgressStatus" @click.stop="">
                <div class="examine_title">
                    <button @click.stop="exit">×</button>
                </div>
                <div class="examine_progress">
                    <el-table
                        :data="examine_progress"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column_examine_progress"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: true,
                billStatus: false,
                examineStatus: false,
                examineProgressStatus: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['渠道名称', '产品名称', '账户余额'],
                cities: ['渠道名称', '产品名称', '账户余额'],
                citiesImport: ['渠道名称', '产品名称', '账户余额', '审批进度'],
                citiesFilterVal: ['entityCodeName', 'entityProductCodeName', 'balance', 'childNum'],
                table_column: [
                    {fixed: false, prop: 'entityCodeName', label: '渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'entityProductCodeName', label: '产品名称', sortable: true, visible: true},
                    {fixed: false, prop: 'balance', label: '账户余额', sortable: false, visible: true},
                ],
                table_column_bill_detail: [
                    {fixed: false, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'entityCodeName', label: '渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'entityProductCodeName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'balance', label: '预付', sortable: false, visible: true},
                    {fixed: false, prop: 'source', label: '来源', sortable: false, visible: true},
                    {fixed: false, prop: 'ownerCodeName', label: '我方主体', sortable: false, visible: true},
                ],
                table_column_examine_progress: [
                    {fixed: false, prop: 'ctime', label: '发起时间', sortable: true, visible: true},
                    {fixed: false, prop: 'createUser', label: '发起人', sortable: false, visible: true},
                    {fixed: false, prop: 'customerName', label: '预付客户', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'kyhdType', label: '对应主体', sortable: false, visible: true},
                    {fixed: false, prop: 'amount', label: '金额', sortable: false, visible: true},
                    {fixed: false, prop: 'status', label: '审批进度', sortable: false, visible: true,format: (row, col)=>{
                        return this.$store.getters.findDingStatus(row.status)?this.$store.getters.findDingStatus(row.status).val:'未开始';
                    }},
                    {fixed: false, prop: 'diffDay', label: '该节点审批等待天数', sortable: false, visible: true,format: function (row, col){
                        switch (row.diffDay){
                            case 0:return '小于一天';break;
                            case -1:return '已完成';break;
                            default:return row.diffDay+'天';break;
                        }
                    }},
                ],
                detailCities: ['日期', '渠道名称', '产品名称', '预付', '来源', '我方主体'],
                detailCitiesFilterVal: ['date', 'entityCodeName', 'entityProductCodeName', 'balance', 'source', 'ownerCodeName'],
                menu_nav: ['CPA数据管理', '渠道预付管理'],
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: []
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                tableDataBillDetail: [],
                tableData: [],
                examine_progress: [],
                dateValue: '',
                financeDateValue: '',
                financeData: [],
                params: {
                    type: '2',
                    val: '',
                    startDate: '',
                    endDate: ''
                },
                tabs: [
                    {
                        label: '预付',
                        name: '1'
                    },
                    {
                        label: '抵扣',
                        name: '2'
                    },
                ],
                activeName: '1',
                examine_from: {
                    ownerCode: '',
                    entityCode: '',
                    entityProductCode: '',
                    notes: '',
                    price: '',
                    type: '2'
                },
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
                entityCode: '',
                entityProductCode: '',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.channelSelect();
                this.financeInfo();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;
        },
        created() {
            this.isFirstEnter=true;
        },
        methods: {
            channelSelect() {
                /*渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.channel_items.options = data.items;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            financeInfo() {
                /*财务*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.financeInfoBill,
                    params: {
                        type: 2
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.financeData = [];
                        for (let item of data.list) {
                            if (item.billType == 5) {
                                this.financeData.push(item);
                            }
                        }
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
                    url: this.apiUrl.channelProList,
                    params: {
                        channelCode: this.examine_from.entityCode,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                        this.examine_from.entityProductCode = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.txList,
                    params: {
                        type: '2',
                        entityCode: this.channel_items.model_value
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status = 200) {
                        this.tableData = res.data.items;
                    }
                }).catch(err => {

                });
            },
            seeCusBill() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.txDetail,
                    params: {
                        entityCode: this.entityCode,
                        entityProductCode: this.entityProductCode,
                        type: '2',
                        action: this.activeName,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.tableDataBillDetail = data.items;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            seeBill(entityCode, entityProductCode) {
                this.entityCode = entityCode || this.entityCode;
                this.entityProductCode = entityProductCode || this.entityProductCode;
                this.seeCusBill();
                this.billStatus = true;
            },
            checkedChange() {
                for (let item of this.table_column) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            changeCheckStatus(e) {
                e.stopPropagation();
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            exit() {
                this.billStatus =this.examineStatus =this.examineProgressStatus = false;
            },
            bodyEvent() {
                this.visibleMenuSelectStatus =this.billStatus = this.examineStatus =this.examineProgressStatus =false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            seeEvent() {
                this.billStatus = true;
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'ymd');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'ymd');
            },
            handleClick(tab, event) {
                if (this.activeName == '1') {
                    this.table_column_bill_detail[3].label = '预付';
                    this.detailCities[3] = '预付';
                } else if (this.activeName == '2') {
                    this.table_column_bill_detail[3].label = '抵扣';
                    this.detailCities[3] = '抵扣';
                }
                this.seeBill();
            },
            addExamine() {
                this.examineStatus = true;
            },
            onSubmit() {
                for (let item in this.examine_from) {
                    if (item != 'notes' && this.examine_from[item] == '') {
                        this.$message({
                            type: 'info',
                            message: '除备注信息，其他不能为空'
                        });
                        return false;
                    }
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.txCreate,
                    data: this.examine_from,
                }).then(res => {
                    var data = res.data;
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.examineStatus = false;
                        this.pageInfo();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加失败'
                    });
                });
            },
            importData() {
                if (this.tableData.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请查询数据'
                    });
                    return false;
                }
                let tHeader = this.citiesImport;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileName = [this.channel_items.model_value, '预付明细'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            billImport() {
                if (this.tableDataBillDetail.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '暂无数据'
                    });
                    return false;
                }
                let tHeader = this.detailCities;
                let filterVal = this.detailCitiesFilterVal;
                let importData = this.tableDataBillDetail;
                let action = this.activeName == '1' ? '预付' : '抵扣';
                let fileName = [this.channel_items.model_value, action, '明细'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            examineProgress(arr){
                let arrString=arr.join(',');
                this.examineProgressStatus = true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.dingGetTxList,
                    params: {
                        ids: arrString
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.examine_progress = data.list;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>
