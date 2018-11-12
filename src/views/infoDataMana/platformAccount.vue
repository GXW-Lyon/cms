<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="info_flow_content channelAccount" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content">
                    <div class="dateSelect">
                        <div class="block">
                            <span class="demonstration">选择日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                            <el-select v-model="channel_items.model_value"
                                       :placeholder="channel_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                       filterable clearable>
                                <el-option
                                    v-for="item in channel_items.options"
                                    :key="item.platformId"
                                    :label="item.platformName"
                                    :value="item.platformId">
                                </el-option>
                            </el-select>
                            <el-select v-model="pay_items.model_value"
                                       :placeholder="pay_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                            clearable>
                                <el-option
                                    v-for="item in pay_items.options"
                                    :key="item.status"
                                    :label="item.value"
                                    :value="item.status">
                                </el-option>
                            </el-select>
                            <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        </div>
                    </div>
                    <div class="realTimeCitySearch" style="text-align:left;">
                        <el-input v-model="billNo" class="page_d_select" placeholder="请输入对账单编号"></el-input>
                        <el-button class="page_d_s_button" @click.stop="billNoInfo">搜索</el-button>
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
                        v-loading="loading"
                        element-loading-text="拼命加载中"
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
                            :formatter="c.format"
                            width="auto"
                            :min-width="c.minwidth"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="对账单"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="seeBill(scope.row.id)"><span class="r_span">查看</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="deleteBill(scope.row.id)"><span class="r_span">删除</span></div>
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
                    <el-button class="page_d_s_button" @click="seeCusBill(scopeId)" style="width:100px!important;">状态同步刷新</el-button>
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
    data () {
        return {
            checked: true,
            loading: false,
            billStatus: false,
            visibleMenuSelectStatus: false,
            checkedCities: ['对账单编号', '对账日期', '平台名称', '账目周期', '结算充值金额', '返点后到账金额', '支付状态'],
            cities: ['对账单编号', '对账日期', '平台名称', '账目周期', '结算充值金额', '返点后到账金额', '支付状态'],
            table_column: [
                { fixed: false, prop: 'billNo', label: '对账单编号', sortable: false, visible: true },
                { fixed: false, prop: 'billDate', label: '对账日期', sortable: true, visible: true },
                { fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true },
                { fixed: false, prop: 'accountCycle', label: '账目周期', sortable: false, visible: true,minwidth:150},
                { fixed: false, prop: 'rechargeAmount', label: '结算充值金额', sortable: false, visible: true },
                { fixed: false, prop: 'rebateAmount', label: '返点后到账金额', sortable: false, visible: true,minwidth:120},
                { fixed: false, prop: 'payStatus', label: '支付状态', sortable: false, visible: true },
            ],
            table_column_bill_detail: [
                { fixed: true, prop: 'date', label: '日期', sortable: true, visible: true },
                { fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true },
                { fixed: false, prop: 'rechargeAmount', label: '充值金额', sortable: false, visible: true },
                { fixed: false, prop: 'rebateAmount', label: '返点后到账金额', sortable: false, visible: true },
                { fixed: false, prop: 'settleStatus', label: '结算状态', sortable: true, visible: true },
            ],
            table_column_bill_title: [
                { fixed: false, prop: 'billNo', label: '结算单号', sortable: false, visible: true },
                { fixed: false, prop: 'billDate', label: '结算单日期', sortable: false, visible: true },
                { fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true },
                { fixed: false, prop: 'rechargeAmount', label: '充值金额', sortable: false, visible: true },
                { fixed: false, prop: 'rebateAmount', label: '返点后到账金额', sortable: false, visible: true },
            ],
            page: {
                sizes: [10, 20, 50,100,200,500],
                offset: 1,
                limit: 10,
                count: 0,
                currentPage: 1,
                landpageName: ''
            },
            menu_nav: ['信息流数据管理', '平台结算'
            ],
            channel_items: {
                model_value: '',
                placeHolder: '请选择平台',
                options: []
            },
            pay_items: {
                model_value: '',
                placeHolder: '全部状态',
                options: [
                ]
            },
            tableDataBill: [],
            tableDataBillDetail: [],
            tableData: [],
            dateValue: '',
            financeDateValue: '',
            billNo: '',
            scopeId: '',
            params: {
                type: '1',
                val: '',
                startDate: '',
                endDate: ''
            },
            isFirstEnter:false, // 是否第一次进入，默认false
        };
    },
    activated () {
        if(!this.$route.meta.isBack|| this.isFirstEnter){
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            this.channelSelect();
            this.allStatus();
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack=false;
        // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
        this.isFirstEnter=false;
    },
    created () {
        this.isFirstEnter=true;
    },
    methods: {
        channelSelect () {
            /*平台*/
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatGetPlatFormList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    var data1 = data.unshift({ 'platformCode': '0', 'platformName': '全部平台' });
                    this.channel_items.options = data;
                } else {
                    //                        console.log('');
                }
            }).catch(error => {
                console.log(error);
            });
        },
        pageInfo () {
            /*筛选查询*/
            this.loading=true;
            var params = {
                curPage: this.page.offset,
                limit: this.page.limit,
                stime: this.params.startDate,
                etime: this.params.endDate,
                platformId: this.channel_items.model_value,
                paystatus: this.pay_items.model_value,
            };
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatSettlementFilter,
                params: params
            }).then(res => {
                this.loading=false;
                if (res.status = 200) {
                    this.page.count = res.data.totalNums;
                    this.tableData = res.data.list;
                }
            }).catch(error => {
                console.log(error);
                this.loading=false;
            });
        },
        billNoInfo(){
            /*对账单编号查询*/
            this.$http({
                method: 'get',
                url:this.apiUrl.fdpPlatSettlementSearch,
                params:{billNo: this.billNo}
            }).then(res => {
                if(res.status = 200){
                    this.page.count = res.data.totalNums;
                    this.tableData = res.data.list;
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        /*支付状态列表*/
        allStatus (){
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatSettlementCombobox,
            }).then(res => {
                if(res.status == 200){
                    this.pay_items.options = res.data;
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        seeCusBill (billNo) {
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpplatSettlementDisplay,
                params: {
                    id: billNo
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.tableDataBill = [];
                    this.tableDataBill.push(data.pfsItem);
                    this.tableDataBillDetail = data.listData;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        seeBill (id) {
            this.scopeId = id;
            this.seeCusBill(id);
            this.billStatus = true;
        },
        handleCurrentChange (val) {
            this.page.offset = val;
            this.pageInfo();
        },
        handleSizeChange (val) {
            this.page.limit = val;
            this.pageInfo();
        },
        checkedChange () {
            for (let item of this.table_column) {
                var index = this.checkedCities.indexOf(item.label);
                index >= 0 ? item.visible = true : item.visible = false;
            }
        },
        changeCheckStatus (e) {
            e.stopPropagation();
            this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
        },
        exitBill () {
            this.billStatus = false;
        },
        bodyEvent () {
            this.visibleMenuSelectStatus = false;
            this.billStatus = false;
        },
        preventDefault (e) {
            e.stopPropagation();
        },
        seeEvent () {
            this.billStatus = true;
        },
        deleteBill (id) {
            this.$confirm('此操作将永久删除该账单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'delete',
                    url: this.apiUrl.fdpPlatSettlementDelete,
                    params: { id: id }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.pageInfo();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        dateChange () {
            this.params.startDate = this.formatDateTime(this.dateValue[0], 'ymd');
            this.params.endDate = this.formatDateTime(this.dateValue[1], 'ymd');
        },
    }
};
</script>
