<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="info_flow_content customerCollect channelPay" @click="bodyEvent">
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
                <div class="info_a_s_content">
                    <div class="dateSelect">
                        <div class="block">
                            <span class="demonstration">账目周期</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                            <el-select clearable filterable v-model="channel_items.model_value"
                                       :placeholder="channel_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                       filterable>
                                <el-option
                                    v-for="item in channel_items.options"
                                    :key="item.channelCode"
                                    :label="item.name"
                                    :value="item.channelCode">
                                </el-option>
                            </el-select>
                            <el-select clearable filterable v-model="pay_items.model_value"
                                       :placeholder="pay_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                            >
                                <el-option
                                    v-for="item in $store.getters.cpaDingStatus"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch" style="text-align:left;">
                        <el-input v-model="billNo" class="page_d_select" placeholder="请输入对账单编号"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click.stop="seeBill(billNo)">搜索</el-button>
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
                            label="对账单"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="seeBill(scope.row.billNo)"><span>查看</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="deleteBill(scope.row.id)"><span>删除</span></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con_pager">
                <div class="block">
                    <!--<span class="demonstration">直接前往</span>-->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.currentPage"
                        :page-sizes="page.sizes"
                        :page-size="page.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.count">
                    </el-pagination>
                </div>
            </div>
            <div class="bill" v-if="billStatus" @click.stop="">
                <div class="bill_title">
                    <span>对账单</span>
                    <button @click.stop="exitBill">×</button>
                </div>
                <div class="memo">
                    <span>客户主体：</span>{{params.owner}}
                    <span class="r_span" style="margin:0;float: right;font-weight: bold;" @click="importData">下载对账单</span>
                </div>
                <div class="memo">
                    <span>备注：</span>{{params.memo}}
                </div>
                <div class="bill_table">
                    <el-table
                        :data="tableDataBill"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column_bill_title"
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
                <div class="realTimeCitySearch">
                    <el-button class="page_d_s_button" @click="" style="width:100px!important;">状态同步刷新</el-button>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked:true,
                billStatus: false,
                visibleMenuSelectStatus: false,
                checkedCities: [  '账目周期', '渠道名称',  '抵扣款项','抵扣后余额', '支付状态', '备注'],
                cities: [ '对账日期', '账目周期', '渠道名称', '结算金额','核减金额', '抵扣款项', '抵扣后余额', '支付状态', '备注'],
                citiesFilterVal:['date','channelName','productName','productChannelCode','channelProductCode','cooperateMode','ajustmentAct','price','revenue','upstreamSettlementStatus','downstreamSettlementStatus'],
                citiesFilter:['日期','渠道名称','产品名称','上游渠道号','产品包渠道代码','合作模式','业务数据','单价','收入金额（元）','上游结算状态','下游结算状态'],
                table_column: [
                    // {fixed: false, prop: 'billNo', label: '对账单编号', sortable: false, visible: true},
                    {fixed: false, prop: 'createdDate', label: '对账日期', sortable: true, visible: false},
                    {fixed: false, prop: 'city', label: '账目周期', sortable: false, visible: true,
                        format: function (row, col) {
                            return row.startDate + '-' + row.endDate;
                        }},
                    {fixed: false, prop: 'channelName', label: '渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'actualSettlementAmount', label: '结算金额', sortable: false, visible: false},
                    {fixed: false, prop: 'actualPrice', label: '核减金额', sortable: false, visible: false},
                    {fixed: false, prop: 'val_1', label: '抵扣款项', sortable: false, visible: true},
                   {fixed: false, prop: 'val_2', label: '抵扣后余额', sortable: false, visible: true},
                   {fixed: false, prop: 'paymentStatus', label: '支付状态', sortable: false, visible: true},
                   {fixed: false, prop: 'memo', label: '备注', sortable: false, visible: true},
                ],
                table_column_bill_detail: [
                    {fixed: true, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'channelName', label: '渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true},
                    {fixed: false, prop: 'channelProductCode', label: '产品包渠道代码', sortable: false, visible: true},
                    {fixed: false, prop: 'cooperateMode', label: '合作模式', sortable: false, visible: true},
                    {fixed: false, prop: 'ajustmentAct', label: '业务数据', sortable: false, visible: true},
                    {fixed: false, prop: 'price', label: '单价', sortable: false, visible: true},
                    {fixed: false, prop: 'revenue', label: '收入金额（元）', sortable: false, visible: true},
                    {fixed: false, prop: 'upstreamSettlementStatus', label: '上游结算状态', sortable: false, visible: true},
                    {fixed: false, prop: 'downstreamSettlementStatus', label: '下游结算状态', sortable: true, visible: true},
                ],
                table_column_bill_title: [
                    {fixed: false, prop: 'billNo', label: '结算单号', sortable: false, visible: true},
                    {fixed: false, prop: 'billDate', label: '结算单日期', sortable: false, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'startDate', label: '账目周期开始日期', sortable: false, visible: true},
                    {fixed: false, prop: 'endDate', label: '账目周期结束日期', sortable: false, visible: true},
                    {fixed: false, prop: 'actualCost', label: '结算金额（元）', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 30, 50,100,500],
                    offset: 1,
                    limit: 10,
                    count: 1000,
                    currentPage: 1,
                    landpageName: ''
                },
                menu_nav: ['CPA数据管理', '渠道预付'],
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道简称',
                    options: []
                },
                pay_items: {
                    model_value: '',
                    placeHolder: '支付状态',
                },
                tableDataBill: [],
                tableDataBillDetail: [],
                tableData: [],
                billNo: '',
                dateValue: '',
                financeDateValue: '',
                financeData: [],
                params: {
                    type: '2',
                    val: '',
                    startDate: '',
                    endDate: '',
                    memo:'',
                    owner:'',
                },
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated(){
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
            pageInfo() {
                var params = {
                    page: this.page.offset,
                    limit: this.page.limit,
                    type: this.params.type,
                    billDate: this.params.startDate + ':' + this.params.endDate,
                    channelCode: this.channel_items.model_value,
                    paymentStatus: this.pay_items.model_value,
                };
                if (this.channel_items.model_value == '') {
                    delete params.channelCode;
                }
                if (this.pay_items.model_value == '') {
                    delete params.paymentStatus;
                }
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelBillList,
                    params: params
                }).then(res => {
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        res.data.itemList.forEach((item,index)=>{
                            item.billMonth=new Date(item.createdDate).getMonth()+1;
                        });
                        this.tableData = res.data.itemList;
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '请选择日期!'
                    });
                });
            },
            seeCusBill(billNo) {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getChannelBill,
                    params: {
                        no: billNo
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.tableDataBill = [];
                        this.params.memo=data.bill.memo;
                        this.params.owner=data.bill.owner;
                        this.tableDataBill.push(data.bill);
                        this.tableDataBillDetail = data.realdatas;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            seeBill(billNo) {
                this.seeCusBill(billNo);
                this.billStatus = true;
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.pageInfo();
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
            exitBill() {
                this.billStatus = false;
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
                this.billStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            seeEvent(){
                this.billStatus=true;
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'ymd');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'ymd');
            },
            importData() {
                if (this.tableDataBillDetail.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请查询数据'
                    });
                    return false;
                }
                let tHeader = this.citiesFilter;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableDataBillDetail;
                let searchName = [this.params.memo, '对账单'];
                let fileName = searchName.join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },

        }
    };
</script>
