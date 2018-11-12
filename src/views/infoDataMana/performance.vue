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
                                type="year"
                                align="center"
                                placeholder="选择年"
                                @change="dateChange">
                            </el-date-picker>
                            <el-select v-model="value" placeholder="请选择月份" clearable class="con_select unBorderRadius" :disabled="params.year==''">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        <div class="dateBut">
                             <el-button type="primary" @click.stop="importData" :style="{'margin-left':'29px'}">导出数据
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
            <!-- <div class="con_pager">
                <div class="block">
                    <span class="demonstration">直接前往</span>
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
            </div> -->
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
                checkedCities: ['月份', '团队', '姓名', '月目标', '月消耗', '月完成度', '季度目标', '季度完成度', '日均目标'],
                cities: ['月份', '团队', '姓名', '月目标', '月消耗', '月完成度', '季度目标', '季度完成度', '日均目标'],
                citiesFilterVal:['date','team','name','monthTarget','monthConsume','monthCompletion','quarterTarget','quarterCompletion','everydayTarget'],
                table_column: [
                    {fixed: false, prop: 'date', label: '月份', sortable: false, visible: true},
                    {fixed: false, prop: 'team', label: '团队', sortable: false, visible: true},
                    {fixed: false, prop: 'name', label: '姓名', sortable: false, visible: true},
                    {fixed: false, prop: 'monthTarget', label: '月目标', sortable: false, visible: true},
                    {fixed: false, prop: 'monthConsume', label: '月消耗', sortable: false, visible: true},
                    {fixed: false, prop: 'monthCompletion', label: '月完成度', sortable: false, visible: true},
                    {fixed: false, prop: 'quarterTarget', label: '季度目标', sortable: false, visible: true},
                    {fixed: false, prop: 'quarterCompletion', label: '季度完成度', sortable: false, visible: true},
                    {fixed: false, prop: 'everydayTarget', label: '日均目标', sortable: false, visible: true},
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
                menu_nav: ['信息流绩效管理', '人员绩效管理'
                ],
                params: {
                    year: '',
                    month: '',
                    date:''
                },
                tableData: [],
                isFirstEnter: false, // 是否第一次进入，默认false
                options: [
                    {
                        value: '1',
                        label: '1月份'
                    }, {
                        value: '2',
                        label: '2月份'
                    }, {
                        value: '3',
                        label: '3月份'
                    }, {
                        value: '4',
                        label: '4月份'
                    },
                    {
                        value: '5',
                        label: '5月份'
                    },
                    {
                        value: '6',
                        label: '6月份'
                    },
                    {
                        value: '7',
                        label: '7月份'
                    },
                    {
                        value: '8',
                        label: '8月份'
                    },
                    {
                        value: '9',
                        label: '9月份'
                    },
                    {
                        value: '10',
                        label: '10月份'
                    },
                    {
                        value: '11',
                        label: '11月份'
                    },
                    {
                        value: '12',
                        label: '12月份'
                    },
                ],
                value: ''
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
            pageInfo(){
                console.log(this.value);
                this.$http({
                    method:'get',
                    url:this.apiUrl.fdpApiAppraisalPersonal,
                    params:{year:this.params.year,month:this.value==''?0:this.value}
                }).then(res=>{
                    if(res.status==200){
                        console.log(res);
                        this.tableData = res.data.list;
                    }
                }).catch();
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.pageInfo();
            },
            checkedChange(val) {
                for (let item of this.table_column) {
                    var index = val.indexOf(item.label);
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
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue != null) {
                    this.params.year =  this.dateValue.getFullYear();
                } else {
                    this.params.year ='';
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
                let fileName = [this.params.year,this.value,'详细数据'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
        }
    };
</script>
