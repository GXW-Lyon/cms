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
                    <div class="realTimeCitySearch">
                        <div class="block">
                            <span class="demonstration">选择日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                class="iosDate"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                        >
                            <el-option
                                v-for="(val, key, index) in customer_items.options"
                                :key="index"
                                :label="val"
                                :value="key">
                            </el-option>
                        </el-select>
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                        >
                            <el-option
                                v-for="(val, key, index) in pro_items.options"
                                :key="index"
                                :label="val"
                                :value="key">
                            </el-option>
                        </el-select>
                        <el-select v-model="channel_items.model_value"
                                   :placeholder="channel_items.placeHolder" class="con_select unBorderRadius"
                        >
                            <el-option
                                v-for="(val, key, index) in channel_items.options"
                                :key="index"
                                :label="val"
                                :value="key">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click.stop="submit('search')" style="margin-right:15px;">
                            查询
                        </el-button>
                        <el-button class="page_d_s_button" @click.stop="importData" style="margin-right:15px;">导出数据
                        </el-button>
                    </div>
                    <div class="dateSelect">
                        <div class="block">
                            <el-input v-model="idfa" class="page_d_select" placeholder="请输入IDFA"
                                      @keyup.enter.native="submit('find')"></el-input><!--
					  -->
                            <el-button class="page_d_s_button" @click="submit('find')" style="margin-left:40px;">搜索
                            </el-button>
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
                loading: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['渠道', '产品', '类型', '日期时间', 'ID', 'MAC'],
                cities: ['渠道', '产品', '类型', '日期时间', 'ID', 'MAC'],
                citiesFilterVal: ['mediaName', 'appName', 'type', 'date', 'idfa', 'mac'],
                table_column: [
                    {fixed: true, prop: 'mediaName', label: '渠道', sortable: true, visible: true},
                    {fixed: false, prop: 'appName', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'type', label: '类型', sortable: false, visible: true},
                    {fixed: false, prop: 'date', label: '日期时间', sortable: false, visible: true},
                    {fixed: false, prop: 'idfa', label: 'ID', sortable: false, visible: true},
                    {fixed: false, prop: 'mac', label: 'MAC', sortable: false, visible: true},
                ],
                page: {
                    sizes: [50, 100, 500, 1000],
                    offset: 1,
                    limit: 50,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['IOS数据管理', '详细数据'
                ],
                customer_items: {
                    model_value: '',
                    placeHolder: '广告主产品',
                    options: [
//                            {
//                                id: '1',
//                                val: '1'
//                            }
                    ]
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: []
                },
                tableData: [],
                dateValue: '',
                idfa: '',
                params: {
                    type: '',
                    val: '',
                    startDate: '',
                    endDate: ''
                },
                paramsData: {},
                requestUrl:'',
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.selectInfo();
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
            selectInfo() {
                /*客户、产品、渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.reportIdName
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = this.objPush(data.adver);
                        this.pro_items.options = this.objPush(data.appid);
                        this.channel_items.options = this.objPush(data.media);
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                this.loading = true;
                /*详细数据*/
                this.$http({
                    method: 'get',
                    url: this.requestUrl,
                    params: this.paramsData
                }).then(res => {
//                    console.log(res);
                    this.loading = false;
                    var data = res.data;
                    if (data.status == 0) {
                        this.page.count = data.total;
                        this.tableData = data.result;
                    } else {
                        this.tableData = [];
                        this.$message({
                            type: 'error',
                            message: data.msg
                        });
                    }
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                    this.tableData = [];
                });
            },
            handleCurrentChange(val) {
                this.page.offset=this.paramsData.page = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = this.paramsData.limit = val;
//                console.log(`每页 ${val} 条`);
                this.pageInfo();
            },
            checkedChange() {
//                console.log(this.checkedCities);
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
            exitEvent(id) {
                this.$router.push({path: 'customerContractNew', query: {customerContractId: id}});
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d');
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
                let fileName = [this.params.startDate, this.params.endDate, '详细数据'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            submit(flag) {
                if (flag == 'search') {
                    if (this.params.startDate == '' || this.params.endDate == '') {
                        this.$message({
                            type: 'info',
                            message: '请选择时间'
                        });
                        return false;
                    }
                    this.paramsData = {
                        page: this.page.offset,
                        limit: this.page.limit,
                        bdate: this.params.startDate,
                        edate: this.params.endDate,
                        adver: this.customer_items.model_value,
                        media: this.channel_items.model_value,
                        appid: this.pro_items.model_value
                    };
                    this.requestUrl=this.apiUrl.reportDetail;
                } else {
                    if (this.idfa == '') {
                        this.$message({
                            type: 'info',
                            message: '请输入IDFA'
                        });
                        return false;
                    }
                    this.page.offset = 1;
                    this.paramsData = {
                        page: this.page.offset,
                        limit: this.page.limit,
                        idfa: this.idfa
                    };
                    this.requestUrl=this.apiUrl.reportDetailIdfa;
                }
                this.pageInfo();
            },
        }
    };
</script>
