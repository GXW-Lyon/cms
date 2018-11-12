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
                        <div class="dateBut">
                            <el-button type="primary" @click.stop="importData" :style="{'margin-left':'29px'}">导出数据
                            </el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch">
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   >
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
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
                            min-width="100"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox d_span" @click.stop="recharge(scope.row.platformName,scope.row.id)">充值</span>
                                    <span class="inlineBox r_span" @click.stop="seeDetail(scope.row.time,scope.row.id)">明细</span>
                                </div>
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
            <div class="bill" v-if="detailStatus" @click.stop="">
                <div class="examine_title">
                    <button @click.stop="exit">×</button>
                </div>
                <div class="examine_progress">
                    <el-table
                        :data="detailData"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in detailDataCol"
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
            <div class="examine" v-if="examineStatus" @click.stop="">
                <div class="examine_title">
                    <span>发起账号充值审批</span>
                    <button @click.stop="exit">×</button>
                </div>
                <el-form ref="form" :model="examine_from" label-width="125px">
                    <el-form-item label="平台名称：">
                        <el-input v-model="examinePro" class="f_input1" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额：">
                        <el-input v-model="examine_from.amount" class="f_input1" type="number"></el-input>
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
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            detailStatus: false,
            examineStatus: false,
            visibleMenuSelectStatus: false,
            checkedCities: ['日期', '平台名称', '余额', '今日消耗'],
            cities: ['日期', '平台名称', '余额', '今日消耗'],
            citiesFilterVal: ['time', 'platformName', 'amount', 'yesterdayConsume', 'todayConsume', 'totalConsume'],
            table_column: [
                { fixed: false, prop: 'time', label: '日期', sortable: true, visible: true },
                { fixed: false, prop: 'platformName', label: '平台名称', sortable: false, visible: true },
                { fixed: false, prop: 'amount', label: '余额', sortable: false, visible: true },
//                { fixed: false, prop: 'yesterdayConsume', label: '昨日消耗', sortable: false, visible: true },
                { fixed: false, prop: 'todayConsume', label: '今日消耗', sortable: false, visible: true },
            ],
            detailDataCol: [
                { fixed: false, prop: 'time', label: '日期', sortable: true, visible: true },
                { fixed: false, prop: 'productName', label: '产品', sortable: false, visible: true },
                { fixed: false, prop: 'platformName', label: '平台', sortable: false, visible: true },
                { fixed: false, prop: 'consume', label: '消耗', sortable: false, visible: true },
            ],
            page: {
                sizes: [10, 20, 50,100,200,500],
                offset: 1,
                limit: 10,
                count: 0,
                currentPage: 1,
            },
            menu_nav: ['信息流数据管理', '平台管理'
            ],
            examine_from: {
                accountId: '',
                amount: '',
                notes: '',
                platformId: ''
            },
            examineName: '',
            examinePro: '',
            accountName: '',
            tableData: [],
            detailData: [],
            dateValue: '',
            customer_items: {
                model_value: '',
                placeHolder: '全部平台',
                options: []
            },
            params: {
                stime: '',
                etime: '',
            },
            isFirstEnter:false, // 是否第一次进入，默认false
        };
    },
    activated () {
        if(!this.$route.meta.isBack|| this.isFirstEnter){
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            this.customer();
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack=false;
        // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
        this.isFirstEnter=false;
        this.pageInfo();
    },
    created () {
        this.isFirstEnter=true;
    },
    methods: {
        /*全部平台*/
        customer () {
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlaGetPlatformList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    var data1 = data.unshift({ 'platformCode': '0', 'platformName': '全部平台' });
                    this.customer_items.options = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*查询表格数据*/
        pageInfo () {
            this.loading=true;
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatSearchPlatForm,
                params: {
                    offset: this.page.offset,
                    limit: this.page.limit,
                    id: this.customer_items.model_value,
                    stime: this.params.stime,
                    etime: this.params.etime,
                }
            }).then(res => {
                this.loading=false;
                if (res.status = 200) {
                    this.page.count = res.data.totalNums;
                    this.tableData = res.data.items;
                }
            }).catch(err => {
                this.loading=false;
            });
        },
        /*查询详情数据*/
        detailInfo (time, id) {
            this.$http({
                method: 'get',
                url: this.apiUrl.fdpPlatGetPlatDetial,
                params: {
                    time: time,
                    id: id,
                }
            }).then(res => {
                if (res.status = 200) {
                    this.detailData = res.data;
                }
            }).catch(err => {
            });
        },
        /*充值*/
        recharge (name, id) {
            this.examineStatus = true;
            this.examinePro = name;
            this.examine_from.platformId = id;
        },
        /*页码翻页*/
        handleCurrentChange (val) {
            this.page.offset = val;
            this.pageInfo();
        },
        /*改变每页条数*/
        handleSizeChange (val) {
            this.page.limit = val;
            this.pageInfo();
        },
        /*显示、隐藏表格列*/
        checkedChange () {
            for (let item of this.table_column) {
                var index = this.checkedCities.indexOf(item.label);
                index >= 0 ? item.visible = true : item.visible = false;
            }
        },
        /*显示、隐藏表格列容易*/
        changeCheckStatus () {
            this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
        },
        seeDetail (time, id) {
            this.detailStatus = true;
            this.detailInfo(time, id);
        },
        exit () {
            this.detailStatus = this.examineStatus = false;
        },
        /*body事件*/
        bodyEvent () {
            this.visibleMenuSelectStatus = this.detailStatus = this.examineStatus = false;
        },
        /*改变时间选择器*/
        dateChange () {
            if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                this.params.stime = this.formatDateTime(this.dateValue[0], 'ymd');
                this.params.etime = this.formatDateTime(this.dateValue[1], 'ymd');
            } else {
                this.params.stime = this.params.etime = '';
            }
        },
        /*导出*/
        importData () {
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
            let fileName = [this.params.stime, this.params.etime, this.customer_items.model_value, '平台信息'].join('_');
            this.handleDownload(tHeader, filterVal, importData, fileName);
        },
        /*充值审批*/
        onSubmit () {
            if (this.examine_from.amount == '') {
                this.$message({
                    type: 'info',
                    message: '请输入充值金额'
                });
                return false;
            } else if (this.examine_from.amount <= 0) {
                this.$message({
                    type: 'info',
                    message: '充值金额必须大于0'
                });
                return false;
            }
            this.$http({
                method: 'post',
                url: this.apiUrl.fdpPlatPlatFormDeposit,
                data: this.examine_from,
            }).then(res => {
                if (res.status == 200) {
                    console.log(res);
                    var data = res.data;
                    this.$message({
                        type: 'success',
                        message: '充值成功'
                    });
                    this.examineStatus = false;
                    this.examine_from.amount = '';
                    this.examine_from.notes = '';
                    // this.pageInfo();
                } else {
                    this.$message({
                        type: 'error',
                        message: '充值失败，请重新提交'
                    });
                }
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '请重新提交'
                });
            });
        }
    }
};
</script>
