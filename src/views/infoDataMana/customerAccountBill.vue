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
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   filterable clearable @change="proInfo">
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.id"
                                :label="item.customerName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="platform_items.model_value"
                                   :placeholder="platform_items.placeHolder" class="con_select unBorderRadius"
                                   clearable @change="proInfo">
                            <el-option
                                v-for="item in platform_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                   clearable filterable>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item.productId">
                            </el-option>
                        </el-select>
                        <el-select v-model="status_items.model_value"
                                   :placeholder="status_items.placeHolder" class="con_select unBorderRadius"
                                   clearable>
                            <el-option
                                v-for="item in status_items.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click.stop="importData" style="margin-left:5px;">导出当前数据
                        </el-button>
                        <el-button class="page_d_s_button" @click.stop="pageInfo">查询</el-button>
                    </div>
                    <div class="realTimeCitySearch">
                        <el-select v-for="(c, i) in select_itemss" :key="i" v-model="c.model_value"
                                   :placeholder="c.placeHolder" class="con_select" @change="">
                            <el-option
                                v-for="item in c.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="noAccountBtn"
                                   style="float:right;">
                            不予结算
                        </el-button>
                        <el-button class="page_d_s_button" @click="createBill"
                                   style="float:right;">
                            对账无误，生成结算单
                        </el-button>
                        <el-button class="page_d_s_button" @click="oneKeyCreateBill"
                                   style="float:right;" :disabled="oneKeyStatus">
                            一键生成结算单
                        </el-button>
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
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :formatter="c.format"
                            :prop="c.prop"
                            :label="c.label"
                            :class-name="c.prop.split('.')[1]"
                            :min-width="c.minwidth"
                            width="auto"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="有效核算"
                            width="100"
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
            <div class="bill" v-if="billStatus" @click.stop="" style="height:auto;">
                <div class="bill_title">
                    <span>对账单预览</span>
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
                        <!--<el-table-column-->
                            <!--label="折后金额"-->
                            <!--width=""-->
                            <!--min-width=""-->
                            <!--class-name="exitBut">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-input type="number" class="" placeholder="" :value="scope.row.settleDiscountAmount"-->
                                          <!--@change="scope.row.settleDiscountAmount=changeInput($event)"></el-input>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                    <div style="text-align:center;height:200px;line-height:200px;">
                        <el-button type="primary" @click="createCusBill" class="formalBtn">确认</el-button>
                        <el-button type="primary" @click="exitBill" class="formalBtn">返回</el-button>
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
                checked: true,
                loading: false,
                billStatus: false,
                visibleMenuSelectStatus: false,
                checkAll: true,
                checkedCities: ['日期', '客户名称', '产品名称', '账号', '平台名称', '消耗金额', '折后金额', '结算状态'],
                cities: ['日期', '客户名称', '产品名称', '账号', '平台名称', '消耗金额', '折后金额', '结算状态'],
                citiesFilterVal: ['date', 'custmoerName', 'productName', 'accountName', 'platformName', 'consumeAmount', 'settleDiscountAmount', 'settleStatus'],
                table_column: [
                    {fixed: true, prop: 'date', label: '日期', sortable: true, visible: true, minwidth: 100},
                    {fixed: false, prop: 'custmoerName', label: '客户名称', sortable: false, visible: true, minwidth: 250},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'accountName', label: '账号', sortable: false, visible: true, minwidth: 140},
                    {fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true, minwidth: 100},
                    {fixed: false, prop: 'consumeAmount', label: '消耗金额', sortable: false, visible: true},
                    {
                        fixed: false,
                        prop: 'settleDiscountAmount',
                        label: '折后金额',
                        sortable: false,
                        visible: true,
                        minwidth: 110
                    },
                    {fixed: false, prop: 'rebate', label: '折扣', sortable: false, visible: true},
                    {fixed: false, prop: 'settleStatus', label: '结算状态', sortable: false, visible: true, minwidth: 80},
                ],
                table_column_bill_title: [
                    {fixed: false, prop: 'accountCycle', label: '账目周期', sortable: false, visible: true},
                    {fixed: false, prop: 'custmoerName', label: '客户名称', sortable: false, visible: true},
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
                menu_nav: ['信息流数据管理', '客户对账'],
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: []
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: []
                },
                status_items: {
                    model_value: '',
                    placeHolder: '状态',
                    options: [
                        {id: 0, val: '未结算'},
                        {id: 1, val: '已结算'},
                        {id: 2, val: '已核算'},
                        {id: 3, val: '不结算'},
                        {id: 4, val: '已抵扣'},
                    ]
                },
                select_itemss: [
                    {
                        model_value: '',
                        placeHolder: '结算主体',
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
                    }, {
                        model_value: '',
                        placeHolder: '结账模式',
                        options: [
                            {
                                id: '2',
                                val: '正常结算'
                            },
                            {
                                id: '1',
                                val: '预收抵扣'
                            },
                            {
                                id: '3',
                                val: '充值结算'
                            },
                        ]
                    },
                ],
                tableData: [],
                tableDataBill: [],
                dateValue: '',
                params: {
                    type: '',
                    val: '',
                    date: '',
                },
                idList: [],
                oneKeyStatus:true,
                oneKeyBtnStatus:false,
                oneKey:'',
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customer();
//                this.proInfo();
                this.platform();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;
        },
        created() {
            this.isFirstEnter = true;
        },
        methods: {
            /*客户*/
            customer() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGetCustomerList,
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*产品*/
            proInfo() {
                this.pro_items.model_value = '';
                this.pro_items.options=[];
                if(!(this.customer_items.model_value && this.platform_items.model_value)){
                    return false;
                }
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListname,
                    params: {
                        customerId: this.customer_items.model_value || -1,
                        platformId: this.platform_items.model_value || -1,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
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
            /*列表*/
            pageInfo() {
                if (this.dateValue == '' || typeof this.dateValue == 'undefined' || this.dateValue[0] == null) {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                } else if (this.customer_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择客户'
                    });
                    return false;
                } else if (this.platform_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择平台'
                    });
                    return false;
                } else if (this.pro_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择产品'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusFilter,
                    params: {
                        curPage: this.page.offset,
                        limit: this.page.limit,
                        sDateTime: this.params.date,
                        customerId: this.customer_items.model_value,
                        productId: this.pro_items.model_value,
                        platformId: this.platform_items.model_value,
                        status: this.status_items.model_value,
                    }
                }).then(res => {
                    if (res.status = 200) {
                        for (let row of res.data.list) {
                            row.settleStatus = this.status_items.options.find(item => item.id == row.settleStatus).val || '-';
                            row.settleStatus == '未结算' ? row.validStatus = false : null;
                        }
                        this.checkAll = true;
                        if(res.data.list.length>0){
                            this.$http({
                                method: 'get',
                                url: this.apiUrl.fdpCusFilterSum,
                                params: {
                                    sDateTime: this.params.date,
                                    customerId: this.customer_items.model_value,
                                    productId: this.pro_items.model_value,
                                    platformId: this.platform_items.model_value,
                                    status: this.status_items.model_value,
                                }
                            }).then(response => {
                                this.loading=false;
                                if (response.status = 200) {
                                    this.page.count = response.data.totalNums;
                                    this.oneKey = response.data.ids;
                                    if(this.oneKey){
                                        this.oneKeyStatus=false;
                                    }else{
                                        this.oneKeyStatus=true;
                                    }
                                    res.data.list.unshift({date:'总计',settleDiscountAmount:response.data.totalDstConsum,consumeAmount:response.data.totalConsume,validStatus: 'button'});
                                    this.tableData = res.data.list;
                                }
                            }).catch(err => {
                            });
                        }
                    }
                }).catch(err => {
                    this.loading=false;
                });
            },
            /*生成结算单*/
            createCusBill() {
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGenerate,
                    params: {
                        entity: this.select_itemss[0].model_value,
                        settleMode: this.select_itemss[1].model_value,
                        Ids: this.oneKeyBtnStatus?this.oneKey:this.idList.join(','),
                        amounts: this.tableDataBill[0].settleDiscountAmount||0,
                    }
                }).then(res => {
                    if (res.status = 200) {
                        this.loading=false;
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '生成成功!'
                            });
                            this.billStatus=false;
                            this.pageInfo();
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    }
                }).catch(err => {
                    this.loading=false;
                    this.$message({
                        type: 'error',
                        message: '生成对账单失败'
                    });
                });
            },
            /*预览结算单*/
            preCusBill() {
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusPreview,
                    params: {
                        entity: this.select_itemss[0].model_value,
                        settleMode: this.select_itemss[1].model_value,
                        Ids: this.oneKeyBtnStatus?this.oneKey:this.idList.join(',')
                    }
                }).then(res => {
                    if (res.status = 200) {
                        this.loading=false;
                        var data = res.data;
                        if (data.status == 1) {
                            this.tableDataBill = [{accountCycle:data.accountCycle,consumeAmount:data.consumeAmount,custmoerName:data.custmoerName,settleDiscountAmount:data.settleDiscountAmount}];
                            this.billStatus=true;
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    }
                }).catch(err => {
                    this.loading=false;
                    this.$message({
                        type: 'error',
                        message: '预览对账单失败'
                    });
                });
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
            changeCheckStatus() {
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            changeInput(e) {
                return e;
            },
            /*时间选择器*/
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.date = this.formatDateTime(this.dateValue[0], 'y/m/d') + '-' + this.formatDateTime(this.dateValue[1], 'y/m/d');
                } else {
                    this.params.date = '';
                }
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
            /*生成结算单按钮*/
            createBill() {
                if (this.select_itemss[0].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结算主体'
                    });
                    return false;
                } else if (this.select_itemss[1].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结账模式'
                    });
                    return false;
                }
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
                    this.oneKeyBtnStatus=false;
                    this.preCusBill();
                }
            },
            /*一键生成结算单按钮*/
            oneKeyCreateBill() {
                if(this.loading){
                    this.$message({
                        type: 'info',
                        message: '正在生成结算单，请稍后再试'
                    });
                    return false;
                }
                if (this.select_itemss[0].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结算主体'
                    });
                    return false;
                } else if (this.select_itemss[1].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结账模式'
                    });
                    return false;
                }
                this.oneKeyBtnStatus=true;
                this.preCusBill();
            },
            /*不予结算按钮*/
            noAccountBtn() {
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
                    this.noAccount();
                }
            },
            /*不予结算*/
            noAccount() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusUpdate,
                    params: {
                        Ids: this.idList.join(',')
                    }
                }).then(res => {
                    if (res.status = 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.pageInfo();
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    });
                });
            },
            /*导出当前数据*/
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
                let fileName = [this.params.date, this.customer_items.model_value, this.pro_items.model_value, this.platform_items.model_value, this.status_items.model_value, '客户对账'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            exitBill() {
                this.billStatus = false;
            },
        }
    };
</script>
