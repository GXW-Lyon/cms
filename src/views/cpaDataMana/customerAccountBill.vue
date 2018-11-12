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
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder"
                                   class="con_select unBorderRadius selectMaxWidth"
                                   @change="select('1',customer_items.model_value)" filterable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.customerCode"
                                :label="item.name"
                                :value="item.customerCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="proModelValue"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                   @change="select('2',proModelValue)" multiple>
                            <p @click="proSelectAll" style="font-size: 14px;
    padding: 8px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #48576a;
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer;
    -moz-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    -khtml-user-select:none;
      user-select:none;">{{proSelectAllValue}}</p>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.id"
                                :label="item.productName"
                                :value="item.customerProductCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="channelPro_items.model_value" :disabled="multipleStatus"
                                   :placeholder="channelPro_items.placeHolder"
                                   class="con_select unBorderRadius selectMaxWidth"
                                   @change="select('3',channelPro_items.model_value)" filterable>
                            <el-option
                                v-for="item in channelPro_items.options"
                                :key="item.productPackageCode"
                                :label="item.productChannelCode"
                                :value="item.productPackageCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="channel_items.model_value" :disabled="multipleStatus"
                                   :placeholder="channel_items.placeHolder"
                                   class="con_select unBorderRadius selectMaxWidth"
                                   @change="select('4',channel_items.model_value)">
                            <el-option
                                v-for="item in channel_items.options"
                                :key="item.channelProductCode"
                                :label="item.channelName"
                                :value="item.channelProductCode">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
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
                        <el-select v-model="customer_full_items.model_value"
                                   :placeholder="customer_full_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                   filterable clearable>
                            <el-option
                                v-for="item in customer_full_items.options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <!--<el-button class="page_d_s_button" @click="createBill('all')"-->
                                   <!--style="float:right;width:150px!important;">-->
                            <!--一键快速生成客户结算单-->
                        <!--</el-button>-->
                        <el-button class="page_d_s_button" @click="createBill('part')"
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
                            :width="c.width"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <span v-if="scope.row.validStatus=='button'" @click="checkAllEvent"
                                      class="r_span">{{checkAll ? '全选' : '取消全选'}}</span>
                                <el-checkbox v-else v-model="scope.row.validStatus"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!--<div class="con_pager">-->
                <!--<div class="block">-->
                    <!--&lt;!&ndash;<span class="demonstration">直接前往</span>&ndash;&gt;-->
                    <!--<el-pagination-->
                        <!--@size-change="handleSizeChange"-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page.sync="page.currentPage"-->
                        <!--:page-sizes="page.sizes"-->
                        <!--:page-size="page.limit"-->
                        <!--layout="total, sizes, prev, pager, next, jumper"-->
                        <!--:total="page.count">-->
                    <!--</el-pagination>-->
                <!--</div>-->
            <!--</div>-->
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
            <el-dialog
                title="输入备注："
                :visible.sync='dialogVisible'
                size="tiny">
                <el-input type="textarea" style="margin-bottom:15px;" placeholder="请输入结算单备注（必填）" v-model="params.memo"></el-input>
                核减金额：<el-input v-model="params.price" :disabled="false" class="el_input_short"
                               placeholder="核减金额（选填）" style="width:200px!important;"></el-input>
                元
                <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="function(){dialogVisible = false;params.memo='';}" style="height:auto;">取 消</el-button>
    <el-button type="primary" @click="changePriceSub" style="height:auto;">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                multipleStatus: false,
                checked: true,
                billStatus: false,
                dialogVisible: false,
                visibleMenuSelectStatus: false,
                checkAll: false,
                checkedCities: ['日期', '客户名称', '产品名称', '上游渠道号','康远渠道号','单价','结算量',  '收入金额（元）'],
                cities: ['日期', '客户名称', '产品名称', '上游渠道号','康远渠道号','单价', '结算量',  '收入金额（元）'],
                table_column: [
                    {fixed: false, prop: 'date', label: '日期', sortable: true, visible: true,width:120},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true,width:280},
                    {fixed: false, prop: 'kyChannelName', label: '康远渠道号', sortable: false, visible: true},
                    {fixed: false, prop: 'amount', label: '结算量', sortable: false, visible: true},
                    {fixed: false, prop: 'price', label: '单价', sortable: false, visible: true},
                    {fixed: false, prop: 'revenue', label: '收入金额（元）', sortable: false, visible: true},
                ],
                table_column_bill_detail: [
                    {fixed: false, prop: 'dataTime', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true},
                    {fixed: false, prop: 'channelName', label: '渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'channelProductCode', label: '产品包渠道代码', sortable: false, visible: true},
                    {fixed: false, prop: 'cooperateMode', label: '合作模式', sortable: false, visible: true},
                    {fixed: false, prop: 'settlementAct', label: '结算量', sortable: false, visible: true},
                    {fixed: false, prop: 'unitPrice', label: '单价', sortable: false, visible: true},
                    {fixed: false, prop: 'gainings', label: '收入金额（元）', sortable: false, visible: true},
                    {fixed: false, prop: 'settlementStatus', label: '结算状态', sortable: true, visible: true},
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
                    sizes: [10, 20, 30, 50, 100, 500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                    landpageName: ''
                },
                menu_nav: ['CPA数据管理', '客户对账'],
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
                proModelValue:[],
                channelPro_items: {
                    model_value: '',
                    placeHolder: '上游渠道号',
                    options: []
                },
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: []
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
                            {
                                id: 'Y5',
                                val: '现金'
                            },
                            {
                                id: 'Y6',
                                val: '北京康远互动网络科技有限公司'
                            },
                        ]
                    }, {
                        model_value: '',
                        placeHolder: '结算模式',
                        options: [
                            {
                                id: '1',
                                val: '客户结算'
                            },
                            {
                                id: '2',
                                val: '客户预收'
                            },
                        ]
                    },
                ],
                customer_full_items: {
                    model_value: '',
                    placeHolder: '客户主体',
                    options: []
                },
                tableDataBill: [],
                tableDataBillDetail: [],
                tableData: [],
                dateValue: '',
                proSelectAllValue: '全部',
                params: {
                    type: '',
                    val: '',
                    startDate: '',
                    endDate: '',
                    sessionId:'',
                    memo:'',
                    price:'',
                },
                idList: [],
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customerSelect();
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
            customerSelect() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data.items;
                        if (data.items.length > 0) {
                            this.customer_items.model_value = data.items[0].customerCode;
                        }
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            fullName() {
                /*客户全称*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerGetAlias,
                    params: {
                        code: this.customer_items.model_value,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.customer_full_items.options = res.data;
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
                    url: this.apiUrl.customerProListLight,
                    params: {
                        customerCode: this.customer_items.model_value,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        // if(data.items.length>0)
                        //     data.items.unshift({
                        //         id:'全部',
                        //         productName:'全部',
                        //         customerProductCode:'全部'
                        //     });
                        this.pro_items.options = data.items;
//                        this.customerProductCode.model_value = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            channelProInfo() {
                if (this.proModelValue.length>0) {
                    /*上游渠道号*/
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.customerProSearch,
                        params: {
                            offset: 1,
                            limit: 9999,
                            type: 2,
                            code: this.proModelValue.join('|'),
                        }
                    }).then(res => {
//                    console.log(res);
                        if (res.status == 200) {
                            var data = res.data;
                            this.channelPro_items.options = data.items;
                        } else {
//                        console.log('');
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }else{
                    this.channelPro_items.model_value='';
                    this.channelPro_items.options=[];
                }
            },
            channelInfo() {
                if (this.channelPro_items.model_value != '') {
                    /*投放渠道*/
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.channelProSearch,
                        params: {
                            offset: 1,
                            limit: 9999,
                            type: 4,
                            code: this.channelPro_items.model_value,
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
                }else{
                    this.channel_items.model_value='';
                    this.channel_items.options=[];
                }
            },
            select(type, val) {
                if(val!=''&&typeof val!='undefined'){
                    this.params.type = type;
                    this.params.val = val;
                    switch (type) {
                        case '1':
                            this.proInfo();
                            this.fullName();
                            this.proModelValue = [];
                            this.proSelectAllValue='全部';
                            break;
                        case '2':
                            this.params.val=val.join('|');
                            if(val.length<=1){
                                this.multipleStatus=false;
                                this.channelProInfo();
                                this.channelPro_items.model_value = '';
                            }else{
                                this.multipleStatus=true;
                            }
                            break;
                        case '3':
                            this.channelInfo();
                            this.channel_items.model_value = '';
                            break;
                    }
                }
            },
            pageInfo() {
                if (this.params.startDate == '' || this.params.endDate == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.billStatConsume,
                    params: {
                        codeType: this.params.type,
                        type: '1',
                        searchKey: this.params.val,
                        sDataTime: this.params.startDate,
                        eDataTime: this.params.endDate,
                    }
                }).then(res => {
                    console.log(res);
                    this.loading=false;
                    if (res.status = 200) {
//                        this.page.count = res.data.totalNums;
                        this.params.sessionId  = res.data.sessionId ;
                        for (let row of res.data.list) {
                            row.validStatus = true;
                        }
                        res.data.list.unshift({date:'汇总',amount:res.data.summary.amount,revenue:res.data.summary.revenue,validStatus: 'button'});
                        this.checkAll = false;
                        this.tableData = res.data.list;
                    }
                }).catch(err => {
                    this.loading=false;
                    this.tableData=[];
                    this.params.sessionId='';
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
            },
            createCusBill() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.createBill,
                    params: {
                        sessionid: this.params.sessionId,
                        owner: this.select_itemss[0].model_value,
                        myOwner: this.customer_full_items.model_value,
                        billType: this.select_itemss[1].model_value,
                        statItemIds: this.idList.join('|'),
                        memo: this.params.memo,
                        actualPrice: this.params.price||0,
                    }
                }).then(res => {
                    this.params.memo='';
                    console.log(res);
                    if (res.status = 200) {
                        this.$message({
                            type: 'success',
                            message: '生成成功!'
                        });
//                        this.pageInfo();
                        this.tableData=[];
                        this.params.sessionId='';
                    }
                }).catch(err => {
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
            },
            seeCusBill(billNo) {
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
            seeBill(billNo) {
                this.seeCusBill(billNo);
                this.billStatus = true;
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d');
            },
            createBill(flag) {
                if (this.select_itemss[0].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结算主体'
                    });
                    return false;
                } else if (this.select_itemss[1].model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择结算模式'
                    });
                    return false;
                }
                if (flag == 'all') {
                    this.lockStatus();
                } else {
                    this.idList = [];
                    for (let item of this.tableData) {
                        item.validStatus && item.validStatus != 'button' ? this.idList.push(item.id) : null;
                    }
                    if (this.idList.length == 0) {
                        this.$message({
                            type: 'info',
                            message: '请选择账单'
                        });
                    } else {
                        this.dialogVisible=true;
                    }
                }
            },
            /*账单全选事件*/
            checkAllEvent() {
                let flag = true;
                for (let item of this.tableData) {
                    if (item.validStatus != 'button') {
                        item.validStatus = this.checkAll;
                        flag = false;
                    }
                }
                if (flag)
                    return false;
                this.checkAll = !this.checkAll;
            },
            /*获取客户结算锁状态*/
            lockStatus() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.lockStatus,
                    params: {
                        type: '1'
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data=res.data;
                        if(data==0){
                            this.$message({
                                type: 'info',
                                message: '正在结算客户对账单中，请稍后重试'
                            });
                        }else if(data==1){
                            this.quickCreateBill();
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取状态失败，请稍后重试'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '获取状态失败，请稍后重试'
                    });
                });
            },
            /*一键快速生成客户结算单*/
            quickCreateBill(){
                this.loading=true;
                this.$http({
                    method: 'post',
                    url: this.apiUrl.customerBillQuickCreate,
                    data: {
                        queryDate : this.params.startDate + ':' + this.params.endDate,
                        billOwner : this.select_itemss[0].model_value,
                        billType : this.select_itemss[1].model_value,
                        customerCode: this.customer_items.model_value,
                        searchKey: this.params.val,
                        type: this.params.type
                    }
                }).then(res => {
                    this.loading=false;
                    var data=res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '一键快速生成客户结算单成功!'
                        });
                        this.pageInfo();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }).catch(err => {
                    this.loading=false;
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
            },
            changePriceSub() {
                if(!this.params.memo){
                    this.$message({
                        type: 'info',
                        message: '请输入备注'
                    });
                }else{
                    this.dialogVisible=false;
                    this.createCusBill();
                }
            },
            proSelectAll(){
                if(this.proSelectAllValue=='全部'){
                    let arr=[];
                    this.pro_items.options.forEach((item,index)=>{
                        console.log(item);
                        arr.push(item.customerProductCode);
                    });
                    this.proModelValue=arr;
                    this.proSelectAllValue='取消全部';
                }else {
                    this.proModelValue=[];
                    this.proSelectAllValue='全部';
                }
            },
        }
    };
</script>
