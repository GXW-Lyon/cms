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
                            <router-link :to="{name:'cusInfoNew'}">
                                <el-button type="primary"><i class="el-icon-plus"></i>新建客户</el-button>
                            </router-link>
                        </div>

                    </div>
                    <div class="realTimeCitySearch">
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   clearable filterable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.customerCode"
                                :label="item.customerName"
                                :value="item.customerCode">
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
                            width="auto"
                            :min-width="c.minwidth"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="100"
                            width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox r_span" @click.stop="seeDetail(scope.row.time,scope.row.id)">详情</span>
                                    <span class="inlineBox d_span" @click.stop="seeData(scope.row.id)">资料</span>
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
            <div class="bill info_ad_table" v-if="dataStatus" @click.stop="">
                <div class="examine_title">
                    <button @click.stop="exit">×</button>
                </div>
                <div class="examine_progress tableDetail">
                    <el-table
                        :data="ziliaoData"
                        :row-key="getRowKeys"
                        :expand-row-keys="expands"
                        style="width: 100%"
                        border>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand zhedieform">
                                    <el-form-item label="客户名称">
                                        <span>{{ props.row.customerName }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <span>{{ props.row.contact }}</span>
                                    </el-form-item>
                                    <el-form-item label="财务类型">
                                        <span>{{ props.row.finType>0?props.row.finType=='1'?'公司':'个人':'-'}}</span>
                                    </el-form-item>
                                    <el-form-item label="营业执照号">
                                        <span>{{ props.row.busNo}}</span>
                                    </el-form-item>
                                    <el-form-item label="手机号码">
                                        <span>{{ props.row.phone}}</span>
                                    </el-form-item>
                                    <el-form-item label="纳税登记号">
                                        <span>{{ props.row.taxId}}</span>
                                    </el-form-item>
                                    <el-form-item label="证件有效期">
                                        <span>{{ props.row.cardExpired}}</span>
                                    </el-form-item>
                                    <el-form-item label="QQ">
                                        <span>{{ props.row.qq}}</span>
                                    </el-form-item>
                                    <el-form-item label="收款银行">
                                        <span>{{ props.row.bank}}</span>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <span></span>
                                    </el-form-item>
                                    <el-form-item label="邮箱">
                                        <span>{{ props.row.email }}</span>
                                    </el-form-item>
                                    <el-form-item label="开户地址">
                                        <span>{{ props.row.accountAddress }}</span>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <span></span>
                                    </el-form-item>
                                    <el-form-item label="地址">
                                        <span>{{ props.row.address }}</span>
                                    </el-form-item>
                                    <el-form-item label="银行账号">
                                        <span>{{ props.row.bankAccount }}</span>
                                    </el-form-item>
                                    <el-form-item label="最后更新">
                                        <span>{{ props.row.ltime }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="客户名称"
                            prop="customerName">
                        </el-table-column>
                        <el-table-column
                            label="联系人"
                            prop="contact">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="50"
                            min-width=""
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <router-link :to="{name:'customerInfoEdit',query:{id:scope.row.id}}"><div><i class="el-icon-edit"></i></div></router-link>
                            </template>
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
                detailStatus: false,
                dataStatus: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['日期', '客户名称', 'wifi消耗', '猎豹消耗', '趣头条消耗', '合计消耗'],
                cities: ['日期', '客户名称', 'wifi消耗', '猎豹消耗', '趣头条消耗', '合计消耗'],
                citiesFilterVal: ['time', 'customerName', 'listConsumeWifi', 'listConsumeLiebao', 'listConsumeQtt', 'totalConsume'],
                table_column: [
                    {fixed: true, prop: 'time', label: '日期', sortable: true, visible: true,minwidth:100},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true,minwidth:280},
                    {fixed: false, prop: 'listConsumeWifi', label: 'wifi消耗', sortable: false, visible: true,format: function (row, col){
                        return row.listConsume[0].todayConsumer;
                    }},
                    {fixed: false, prop: 'listConsumeLiebao', label: '猎豹消耗', sortable: false, visible: true,format: function (row, col){
                        return row.listConsume[1].todayConsumer;
                    }},
                    {fixed: false, prop: 'listConsumeQtt', label: '趣头条消耗', sortable: false, visible: true,format: function (row, col){
                        return row.listConsume[2].todayConsumer;
                    }},
                    {fixed: false, prop: 'totalConsume', label: '合计消耗', sortable: false, visible: true},
                ],
                detailDataCol: [
                    {fixed: false, prop: 'time', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'productName', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'platformName', label: '平台', sortable: false, visible: true},
                    {fixed: false, prop: 'totalConsume', label: '消耗', sortable: false, visible: true},
                    {fixed: false, prop: 'discdConsume', label: '折后消耗', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['信息流数据管理', '客户管理'
                ],
                tableData: [],
                detailData: [],
                ziliaoData: [],
                dateValue: '',
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: []
                },
                params: {
                    stime: '',
                    etime: '',
                },
                isFirstEnter:false, // 是否第一次进入，默认false

                // 要展开的行，数值的元素是row的key值
                expands: []
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
            this.pageInfo();
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
            /*查询表格数据*/
            pageInfo() {
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusSearchCustomer,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        customerCode: this.customer_items.model_value,
                        stime: this.params.stime,
                        etime: this.params.etime,
                    }
                }).then(res => {
                    this.loading=false;
                    console.log(res);
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.items;
                    }
                }).catch(err => {
                    this.loading=false;
                });
            },
            /*查询详情数据*/
            detailInfo(time,id){
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusSearchCustomerDetail,
                    params: {
                        time: time,
                        id: id,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        this.detailData = res.data;
                    }
                }).catch(err => {
                });
            },
            // 获取row的key值
            getRowKeys(row) {
                return row.id;
            },
            /*查询资料数据*/
            ziliaoInfo(id){
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGetCustomer,
                    params: {
                        id: id,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        this.ziliaoData =[res.data];
                        this.expands.push(this.ziliaoData[0].id);
                    }
                    console.log(this.ziliaoData);
                }).catch(err => {
                });
            },
            /*页码翻页*/
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            /*改变每页条数*/
            handleSizeChange(val) {
                this.page.limit = val;
                this.pageInfo();
            },
            /*显示、隐藏表格列*/
            checkedChange() {
//                console.log(this.checkedCities);
                for (let item of this.table_column) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            /*显示、隐藏表格列容易*/
            changeCheckStatus() {
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            seeDetail(time,id){
                this.detailStatus=true;
                this.detailInfo(time,id);
            },
            seeData(id){
                this.dataStatus=true;
                this.ziliaoInfo(id);
            },
            exit(){
                this.detailStatus= this.dataStatus=false;
            },
            /*body事件*/
            bodyEvent() {
                this.visibleMenuSelectStatus =this.detailStatus=this.dataStatus= false;
            },
            /*改变时间选择器*/
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.stime = this.formatDateTime(this.dateValue[0], 'ymd');
                    this.params.etime = this.formatDateTime(this.dateValue[1], 'ymd');
                } else {
                    this.params.stime =this.params.etime = '';
                }
            },
            /*导出*/
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
                let fileName = [this.params.stime,this.params.etime, this.customer_items.model_value, '客户信息'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
        }
    };
</script>
