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
                            <router-link :to="{name:'proManaNew'}">
                                <el-button type="primary"><i class="el-icon-plus"></i>新建产品</el-button>
                            </router-link>
                        </div>

                    </div>
                    <div class="realTimeCitySearch">
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
                                <div @click="editEvent(scope.row.id)"><i class="el-icon-edit"></i></div>
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
                loading: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['日期', '产品', '平台', '今日消耗', '折后今日消耗', '未结算总预算', '未结算总消耗'],
                cities: ['日期', '产品', '平台', '今日消耗', '折后今日消耗', '未结算总预算', '未结算总消耗'],
                citiesFilterVal: ['dataTime', 'product', 'platform', 'yestConsume', 'todayConsume', 'dctTodayConsume', 'nsettlementBudget', 'nsettlementConsume'],
                table_column: [
                    {fixed: false, prop: 'dataTime', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'product', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'platform', label: '平台', sortable: false, visible: true},
//                    {fixed: false, prop: 'yestConsume', label: '昨日消耗', sortable: false, visible: true},
                    {fixed: false, prop: 'todayConsume', label: '今日消耗', sortable: false, visible: true},
                    {fixed: false, prop: 'dctTodayConsume', label: '折后今日消耗', sortable: false, visible: true},
//                    {fixed: false, prop: 'nsettlementBudget', label: '未结算总预算', sortable: false, visible: true},
//                    {fixed: false, prop: 'nsettlementConsume', label: '未结算总消耗', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['信息流数据管理', '产品管理'
                ],
                tableData: [],
                dateValue: '',
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: [
                        {
                            val: 'wifi万能钥匙',
                            id: '0'
                        },
                        {
                            val: '趣头条',
                            id: '1'
                        },
                        {
                            val: '猎豹',
                            id: '2'
                        },
                    ]
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                params: {
                    sDateTime: '',
                },
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.platform();
//                this.proInfo();
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
            /*平台*/
            platform(){
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
            /*产品*/
            proInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListall,
                    params:{
                        platformId:this.platform_items.model_value
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*查询表格数据*/
            pageInfo() {
                if(this.params.sDateTime==''){
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProSearch,
                    params: {
                        curPage: this.page.offset,
                        limit: this.page.limit,
                        productId: this.pro_items.model_value||-1,
                        platformId: this.platform_items.model_value||-1,
                        sDateTime: this.params.sDateTime,
                    }
                }).then(res => {
                    this.loading=false;
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.list;
                    }
                }).catch(err => {
                    this.loading=false;
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
                for (let item of this.table_column) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            /*显示、隐藏表格列容易*/
            changeCheckStatus() {
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            /*body事件*/
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            /*改变时间选择器*/
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.sDateTime = this.formatDateTime(this.dateValue[0], 'y/m/d')+'-'+this.formatDateTime(this.dateValue[1], 'y/m/d');
                } else {
                    this.params.sDateTime = '';
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
                let tHeader = this.cities;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileName = [this.params.sDateTime, this.platform_items.model_value,this.pro_items.model_value, '产品数据'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            editEvent(id){
                this.$router.push({path: 'proManaEdit',query:{proId:id}});
            }
        }
    };
</script>
