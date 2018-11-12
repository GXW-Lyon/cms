<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="info_flow_content" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content">
                    <div class="dateSelect">
                        <div class="block">
                            <span class="demonstration">对账日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                            <el-select clearable v-model="customer_items.model_value"
                                       :placeholder="customer_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                                       filterable>
                                <el-option
                                    v-for="item in customer_items.options"
                                    :key="item.id"
                                    :label="item.customerName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select clearable v-model="pay_items.model_value"
                                       :placeholder="pay_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                            >
                                <el-option
                                    v-for="item in $store.getters.fdpDingStatus"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        </div>
                        <div class="dateBut" style="margin-top: 0 !important;">
                            <el-button type="primary" @click.stop="importData">导出数据
                            </el-button>
                        </div>
                    </div>
                    <div class="realTimeCitySearch">
                        <el-input v-model="billNo" class="page_d_select" placeholder="请输入对账单编号" @keyup.enter.native="searchBill"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click.stop="searchBill">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="info_ad_table">
                <div class="page_d_title">
                    <i style="visibility:hidden;"></i><span></span>
                    <div class="tableVisibleMenu">
                        <p class="visibleMenuBut" @click.stop="changeCheckStatus"></p>
                        <div class="visibleMenuSelect" v-if="visibleMenuSelectStatus" @click.stop="">
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
                            :key="c.prop"
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
                            label="实际结算金额"
                            min-width="150"
                            class-name="exitInput">
                            <template slot-scope="scope">
                                <div>
                                    <el-input type="number" class="" placeholder="" v-model="scope.row.actualAmout"
                                              style="width:80%!important;"></el-input></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-for="(c, i) in tabale_column_one"
                            :key="c.prop"
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
                            width="80"
                            min-width="80"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="seeBill(scope.row.id)"><span class="r_span">查看</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="80"
                            min-width="80"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="deleteBill(scope.row.id)"><span class="r_span">删除</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="审批"
                            width="80"
                            min-width="80"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click.stop="submitBill(scope)" v-if="scope.row.payStatus==0"><span class="r_span">提交</span></div>
                                <div v-else><span class="r_span"></span></div>
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
                            :formatter="c.format"
                            :prop="c.prop"
                            :label="c.label"
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                    </el-table>
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
                            :formatter="c.format"
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
                loading: false,
                billStatus: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['对账单编号','平台名称', '客户名称','产品名称', '账目周期', '消耗金额', '折后金额', '结算金额','结算模式','折扣', '支付状态'],
                cities: ['对账单编号','平台名称', '客户名称','产品名称', '账目周期', '消耗金额', '折后金额', '结算金额', '结算模式','折扣', '支付状态'],
                citiesFilterVal: ['billNo','pltName', 'custmoerName', 'prdName', 'accountCycle', 'consumeAmount', 'settleDiscountAmount', 'actualAmout', 'settleMode','rebate', 'payStatus'],
                table_column: [
                    {fixed: false, prop: 'billNo', label: '对账单编号', sortable: false, visible: true,minwidth:110},
                    // {fixed: false, prop: 'billDate', label: '对账日期', sortable: true, visible: true,minwidth:100},
                    {fixed: false, prop: 'pltName', label: '平台名称', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'custmoerName', label: '客户名称', sortable: false, visible: true,minwidth:200},
                    {fixed: false, prop: 'prdName', label: '产品名称', sortable: false, visible: true,minwidth:100},
                    {
                        fixed: false,
                        prop: 'accountCycle',
                        label: '账目周期',
                        sortable: false,
                        visible: true,
                        minwidth:110
                    },
                    {fixed: false, prop: 'consumeAmount', label: '消耗金额', sortable: false, visible: true},
                    {fixed: false, prop: 'settleDiscountAmount', label: '折后金额', sortable: false, visible: true},
                ],
                tabale_column_one: [
                    {fixed: false, prop: 'settleMode', label: '结算模式', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'rebate', label: '折扣', sortable: false, visible: true,minwidth:80},
                    {fixed: false, prop: 'payStatus', label: '支付状态', sortable: false, visible: true,minwidth:150},
                ],
                table_column_bill_detail: [
                    {fixed: false, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'accountName', label: '账号', sortable: false, visible: true},
                    {fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true},
                    {fixed: false, prop: 'consumeAmount', label: '消耗金额', sortable: false, visible: true},
                    {fixed: false, prop: 'settleDiscountAmount', label: '折后金额', sortable: false, visible: true},
                    {fixed: false, prop: 'settleStatus', label: '结算状态', sortable: true, visible: true,format:function(row,col){
                        switch (row.settleStatus){
                            case '0':return '未结算';break;
                            case '1':return '已结算';break;
                            case '2':return '已核算';break;
                            case '3':return '不结算';break;
                            case '4':return '已抵扣';break;
                        }
                    }},
                ],
                table_column_bill_title: [
                    {fixed: false, prop: 'billNo', label: '结算单号', sortable: false, visible: true},
                    {fixed: false, prop: 'date', label: '结算单日期', sortable: false, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'consumeAmount', label: '消耗金额', sortable: false, visible: true},
                    {fixed: false, prop: 'settleDiscountAmount', label: '折后金额', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setDate(1);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '上个月',
                        onClick(picker) {
                            const date = new Date();
                            var year = date.getFullYear();
                            var month = date.getMonth();
                            const start=new Date(year, month-1, 1);
                            const day=new Date(year, month, 0).getDate();
                            const end=new Date(year, month-1, day);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '前三个月',
                        onClick(picker) {
                            const date = new Date();
                            var year = date.getFullYear();
                            var month = date.getMonth();
                            const start=new Date(year, month-3, 1);
                            const day=new Date(year, month, 0).getDate();
                            const end=new Date(year, month-1, day);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                menu_nav: ['信息流数据管理', '客户结算单'],
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
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
                params: {
                    type: '1',
                    val: '',
                    date: '',
                },
                importSearchDataValue:'',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customer();
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
            pageInfo() {
                if (this.dateValue == '' || typeof this.dateValue == 'undefined' && this.dateValue[0] == null) {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                this.loading=true;
                var params = {
                    curPage: this.page.offset,
                    limit: this.page.limit,
                    sDateTime: this.params.date,
                    customerId: this.customer_items.model_value,
                    paystatus: this.pay_items.model_value,
                };
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusSetFilter,
                    params: params
                }).then(res => {
                    this.loading=false;
                    if (res.status = 200) {
                        console.log(res);
                        this.importSearchDataValue=this.billNo='';
                        this.page.count = res.data.totalNums;
                        this.tableData=res.data.list.map((item,index)=>{
                            let settleMode=item.settleMode;
                            switch (settleMode){
                                case '1':settleMode= '预收抵扣';break;
                                case '2':settleMode= '正常结算';break;
                                case '3':settleMode= '充值结算';break;
                            }
                            let payStatus=this.$store.getters.findDingStatus(item.payStatus)?this.$store.getters.findDingStatus(item.payStatus).val:'财务已确认';
                            return {...item,settleMode:settleMode,payStatus:payStatus};
                        });
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '查询失败'
                    });
                    this.loading=false;
                });
            },
            /*查看对账单*/
            seeCusBill(id) {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusDisplay,
                    params: {
                        Id: id
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.tableDataBill = [];
                        this.tableDataBill.push(data.csItem);
                        this.tableDataBillDetail = data.listData;
                    } else {
                    }
                }).catch((err, response) => {
                    console.log(response);
                });
            },
            /*查看对账单按钮*/
            seeBill(id) {
                this.seeCusBill(id);
                this.billStatus = true;
            },
            /*搜索对账单*/
            searchBill(){
                if(this.billNo==''){
                    this.$message({
                        type: 'info',
                        message: '对账单编号不能为空'
                    });
                    return false;
                }
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusSetSearch,
                    params: {
                        billNo:this.billNo
                    }
                }).then(res => {
                    if (res.status = 200) {
                        this.importSearchDataValue=this.billNo;
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.list;
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '查询失败'
                    });
                });
            },
            /*提交审批*/
            submitBill(scope){
                if(scope.row.payStatus == 0){
                    this.loading=true;
                    this.$http({
                        method:'get',
                        url:this.apiUrl.fdpCusSettlementSubmitApproval,
                        params:{id:scope.row.id,amount:scope.row.actualAmout}
                    }).then(res => {
                        this.loading=false;
                        if(res.status==200){
                            console.log(res);
                            if(res.data.status==1){
                                this.$message({
                                    type: 'info',
                                    message: '操作成功'
                                });
                                this.pageInfo();
                            }
                            if(res.data.status==2){
                                this.$message({
                                    type: 'info',
                                    message: '提交失败，请重试！'
                                });
                            }
                        }
                    }).catch(err=>{
                        this.loading=false;
                    });
                }
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
                var newArr=this.table_column.concat(this.tabale_column_one);
                for (let item of newArr) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            changeCheckStatus() {
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            exitBill() {
                this.billStatus = false;
            },
            /*删除账单*/
            deleteBill(id) {
                this.$confirm('此操作将永久删除该账单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.fdpCusDelete,
                        params: {Id: id}
                    }).then(res => {
                        if (res.status == 200) {
                            var data = res.data;
                            if(data.status==1){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.pageInfo();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: data.msg
                                });
                            }
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
                this.billStatus = false;
            },
            seeEvent() {
                this.billStatus = true;
            },
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.date = this.formatDateTime(this.dateValue[0], 'y/m/d') + '-' + this.formatDateTime(this.dateValue[1], 'y/m/d');
                } else {
                    this.params.date = '';
                }
            },
            importData() {
                if (this.tableData.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请查询数据'
                    });
                    return false;
                }
                let tHeader = this.cities;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileNameArr=this.importSearchDataValue?[this.importSearchDataValue,'客户结算单']:[this.params.date, this.customer_items.model_value,this.pay_items.model_value, '客户结算单'];
                let fileName =fileNameArr.join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
        }
    };
</script>
