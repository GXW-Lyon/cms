<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="info_flow_content customerAccountBill" @click="bodyEvent">
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
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                   clearable>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                        <el-select v-model="channelPro_items.model_value"
                                   :placeholder="channelPro_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                   clearable>
                            <el-option
                                v-for="item in channelPro_items.options"
                                :key="item.status"
                                :label="item.value"
                                :value="item.status">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                    </div>
                    <div class="realTimeCitySearch">
                        <el-select v-model="select_itemss.model_value"
                                   :placeholder="select_itemss.placeHolder" class="con_select" @change="" clearable>
                            <el-option
                                v-for="item in select_itemss.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="createBill"
                                   style="float:right;width:150px!important;">
                            对账无误，生成结算单
                        </el-button>
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
                            :class-name="c.prop.split('.')[1]"
                            min-width="100"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="结算状态"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <span>{{scope.row.settleStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="有效核算"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                 <span v-if="scope.row.validStatus=='button'" @click="checkAllEvent"
                                       class="r_span">{{checkAll ? '全选' : '取消全选'}}</span>
                                <el-checkbox v-if="scope.row.settleStatus=='未结算'"
                                             v-model="scope.row.validStatus"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con_pager">
                <div class="block">
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
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            checked: true,
            loading: false,
            visibleMenuSelectStatus: false,
            checkAll: true,
            checkedCities: ['日期', '平台名称', '充值金额', '返点后到账金额'],
            cities: ['日期', '平台名称', '充值金额', '返点后到账金额'],
            table_column: [
                { fixed: false, prop: 'date', label: '日期', sortable: true, visible: true },
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
            menu_nav: ['信息流数据管理', '平台对账'],
            customer_items: {
                model_value: '',
                placeHolder: '客户',
                options: []
            },
            pro_items: {
                model_value: '',
                placeHolder: '请选择平台',
                options: []
            },
            channelPro_items: {
                model_value: '',
                placeHolder: '全部状态',
                options: []
            },
            select_itemss: {
                model_value: '',
                placeHolder: '请选则结算主体',
                options: [
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
                ]
            },
            tableDataBill: [],
            tableDataBillDetail: [],
            tableData: [],
            dateValue: '',
            params: {
                type: '',
                val: '',
                startDate: '',
                endDate: ''
            },
            idList: [],
            isFirstEnter:false, // 是否第一次进入，默认false
        };
    },
    activated () {
        if(!this.$route.meta.isBack|| this.isFirstEnter){
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            this.customerSelect();
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
        customerSelect () {
            /*平台*/
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatGetPlatFormList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    var data1 = data.unshift({ 'platformId': '-1', 'platformName': '请选择' });
                    this.pro_items.options = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        allStatus(){
            /*全部状态*/
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatReconciliationCombobox,
            }).then(res =>{
                if(res.status == 200){
                    var data = res.data;
                    var data1 = data.unshift({ 'status': '-2', 'value': '请选择' });
                    this.channelPro_items.options = data;
                }
            }).catch(error =>{
                console.log(error);
            });
        },
        pageInfo () {
            /*列表*/
            if (this.params.startDate == '' || this.params.endDate == '') {
                this.$message({
                    type: 'info',
                    message: '请选择日期!'
                });
                return false;
            }else if(this.pro_items.model_value== ''|| this.pro_items.model_value == '-1'){
                this.$message({
                    type: 'info',
                    message: '请选择平台!'
                });
                return false;
            }
            this.loading=true;
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatReconciliationSearch,
                params: {
                    curPage: this.page.offset,
                    limit: this.page.limit,
                    status: this.channelPro_items.model_value==''?this.channelPro_items.model_value='-2':this.channelPro_items.model_value,
                    platformId:this.pro_items.model_value,
                    stime: this.params.startDate,
                    etime: this.params.endDate,
                }
            }).then(res => {
                this.loading=false;
                if (res.status = 200) {
                    var rebateTotalAmount = res.data.rebateTotalAmount;
                    var rechargeToatalAmount = res.data.rechargeToatalAmount;
                    var data=res.data.list;
                    for (let row of data) {
                        row.settleStatus == '未结算' ? row.validStatus = false : null;
                    }
                    data.unshift({date:this.params.startDate+'/'+this.params.endDate,platformName:data[0].platformName,rechargeAmount:rechargeToatalAmount,rebateAmount:rebateTotalAmount,validStatus: 'button'});
                    this.checkAll = true;
                    this.tableData = data;
                    this.page.count = res.data.totalNums;
                }
            }).catch(err => {
                this.loading=false;
            });
        },
        createCusBill () {
            this.$http({
                method: 'post',
                url: this.apiUrl.fdpPlatReconciliationGenerate,
                data: {
                    entity: this.select_itemss.model_value,
                    ids: this.idList.join(','),
                    platformId: this.pro_items.model_value,
                }
            }).then(res => {
                if (res.status ==200) {
                    this.$message({
                        type: 'success',
                        message: '生成成功!'
                    });
                }
                this.pageInfo();
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '生成对账单失败'
                });
            });
        },
        seeCusBill (billNo) {
            this.$http({
                method: 'get',
                url: this.apiUrl.getCustomerBill,
                params: {
                    no: billNo
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.tableDataBill = [];
                    this.tableDataBill.push(data.bill);
                    this.tableDataBillDetail = data.realdatas;
                } else {
                    //                        console.log('');
                }
            }).catch(error => {
                console.log(error);
            });
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
        seeBill (billNo) {
            this.seeCusBill(billNo);
            this.billStatus = true;
        },
        dateChange () {
            this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d');
            this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d');
        },
        /*账单全选事件*/
        checkAllEvent() {
            let flag=true;
            for (let item of this.tableData) {
                if (item.validStatus != 'button'&&item.settleStatus=='未结算') {
                    item.validStatus = this.checkAll;
                    flag=false;
                }
            }
            if (flag)
                return false;
            this.checkAll = !this.checkAll;
        },
        createBill () {
            if (this.select_itemss.model_value == '') {
                this.$message({
                    type: 'info',
                    message: '请选择结算主体'
                });
                return false;
            };
            this.idList = [];
            for (let item of this.tableData) {
                item.validStatus&&item.validStatus!='button' ? this.idList.push(item.id) : null;
            }
            if (this.idList.length == 0) {
                this.$message({
                    type: 'info',
                    message: '请选择账单'
                });
            } else {
                this.createCusBill();
            }
        }
    }
};
</script>
