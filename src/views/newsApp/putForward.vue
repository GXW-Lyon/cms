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
                    <div class="customerProCitySearch">
                        <div class="block" style="margin-right:14px;">
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
                        </div><!--
                        -->
                        <el-select v-model="status_items.model_value"
                                   :placeholder="status_items.placeHolder" class="con_select unBorderRadius"
                                   filterable>
                            <el-option
                                v-for="item in status_items.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        <div class="dateBut">
                            <el-button type="primary" @click="handleBatch(0)">批量批准</el-button>
                            <el-dropdown style="margin-left: 0;" trigger="click" @command="handleCommand">
                                <el-button type="primary">
                                    批量拒绝<i class="el-icon-caret-bottom el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="支付宝账户信息不完善，请完善支付宝账户信息">支付宝账户信息不完善，请完善支付宝账户信息</el-dropdown-item>
                                    <el-dropdown-item command="提现操作异常，请注意账号安全">提现操作异常，请注意账号安全</el-dropdown-item>
                                    <el-dropdown-item command="徒弟操作行为异常，请加强引导">徒弟操作行为异常，请加强引导</el-dropdown-item>
                                    <el-dropdown-item command="收徒相关操作行为异常">收徒相关操作行为异常</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="primary" @click="handleBatch(2)">批量提现</el-button>
                        </div>
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
                        :row-style="rowStyle"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            width=""
                            min-width="100"
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visibleMenuSelectStatus: false,
                loading: false,
                checkAll: true,
                checkedCities: ['提现日期', '申请单号', '用户', 'IP', '提现金币', '账户类型', '提现账户', '真实姓名', '提现状态', '备注'],
                cities: ['提现日期', '申请单号', '用户', 'IP', '提现金币', '账户类型', '提现账户', '真实姓名', '提现状态', '备注'],
                table_column: [
                    {fixed: false, prop: 'date', label: '提现日期', sortable: false, visible: true},
                    {fixed: false, prop: 'applyNo', label: '申请单号', sortable: false, visible: true},
                    {fixed: false, prop: 'phone', label: '用户', sortable: false, visible: true},
                    {fixed: false, prop: 'ip', label: 'IP', sortable: false, visible: true},
                    {fixed: false, prop: 'amount', label: '提现金币', sortable: false, visible: true},
                    {fixed: false, prop: 'channel', label: '账户类型', sortable: false, visible: true},
                    {fixed: false, prop: 'account', label: '提现账户', sortable: false, visible: true},
                    {fixed: false, prop: 'realName', label: '真实姓名', sortable: false, visible: true},
                    {fixed: false, prop: 'status', label: '提现状态', sortable: false, visible: true},
                    {fixed: false, prop: 'remark', label: '备注', sortable: false, visible: true},
                ],
                dateValue: '',
                command: '',
                page: {
                    sizes: [100, 500],
                    offset: 1,
                    limit: 100,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['口袋头条数据管理', '批量提现'
                ],
                status_items: {
                    model_value: 0,
                    placeHolder: '状态',
                    options: [
                        {id:10,val:'全部'},
                        {id:0,val:'待审核'},
                        {id:1,val:'提现成功'},
                        {id:2,val:'待提现'},
                        {id:3,val:'拒绝'},
                        {id:4,val:'提现失败'},
                    ]
                },
                params: {
                    sdate: '',
                    edate: '',
                },
                tableData: [],
                idList: [],
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
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
            pageInfo() {
                /*列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.koudaiPutForwardList,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        sdate: this.params.sdate,
                        edate: this.params.edate,
                        status: this.status_items.model_value,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count = data.totalNums;
                        for (let row of data.list) {
                            row.validStatus = false;
                            row.status=this.status_items.options.filter(s=>parseInt(s.id)==parseInt(row.status))[0].val;
                        }
                        data.list.length > 0 ? data.list.unshift({validStatus: 'button'}) : null;
                        this.checkAll = true;
                        this.tableData = data.list;
                        this.idList = [];
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.sdate = this.formatDateTime(this.dateValue[0], 'y-m-d');
                    this.params.edate = this.formatDateTime(this.dateValue[1], 'y-m-d');
                } else {
                    this.params.sdate =this.params.edate = '';
                }
            },
            /*全选事件*/
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
            handleBatch(type) {
                this.idList = [];
                for (let item of this.tableData) {
                    item.validStatus && item.validStatus != 'button' ? this.idList.push(item.applyNo) : null;
                }
                if(this.idList.length==0){
                    this.$message({
                        type: 'info',
                        message: '请选择申请单'
                    });
                    return false;
                }
                this.submit(type);
            },
            submit(type){
                this.loading=true;
                let url='';
                switch (type) {
                    case 0:url=this.apiUrl.koudaiPutForwardApproval;break;
                    case 1:url=this.apiUrl.koudaiPutForwardRefuse;break;
                    case 2:url=this.apiUrl.koudaiPutForwardCash;break;
                }
                this.$http({
                    method: 'post',
                    url: url,
                    data: {
                        action : type,
                        remark: type==1?this.command:'',
                        list : this.idList
                    }
                }).then(res => {
                    console.log(res);
                    this.loading=false;
                    if (res.status = 200) {
                        if(res.data.status==1){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.pageInfo();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    }
                }).catch(err => {
                    console.log(err);
                    this.loading=false;
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
            },
            handleCommand(command){
                this.command=command;
                this.handleBatch(1);
            },
            rowStyle(row,index){
                if(row.color){
                    if(row.color=='R') return { "color": "red" };
                    if(row.color=='B') return { "color": "blue" };
                }
            },
        }
    };
</script>
