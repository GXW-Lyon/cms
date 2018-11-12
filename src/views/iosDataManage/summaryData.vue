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
                        <div class="block">
                            <span class="demonstration">选择日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                class="iosDate"
                                type="daterange"
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
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
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
            <div class="con_pager" v-if="false">
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
                checkedCities: ['日期', '广告主产品', '渠道', '点击', '激活', '激活率', '扣量', '放出数据'],
                cities: ['日期', '广告主产品', '渠道', '点击', '激活', '激活率', '扣量', '放出数据'],
                table_column: [
                    {fixed: true, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'adverName', label: '广告主产品', sortable: false, visible: true},
                    {fixed: false, prop: 'mediaName', label: '渠道', sortable: false, visible: true},
                    {fixed: false, prop: 'click', label: '点击', sortable: false, visible: true},
                    {fixed: false, prop: 'activation', label: '激活', sortable: false, visible: true},
                    {fixed: false, prop: 'activationRate', label: '激活率', sortable: false, visible: true},
                    {fixed: false, prop: 'deductionRatio', label: '扣量', sortable: false, visible: true},
                    {fixed: false, prop: 'releaseNum', label: '放出数据', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 30, 50],
                    offset: 1,
                    limit: 10,
                    count: 1000,
                    currentPage: 1,
                },
                menu_nav: ['IOS数据管理', '概述数据'
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
                params: {
                    type: '',
                    val: '',
                    startDate: '',
                    endDate: ''
                },
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.selectInfo();
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
            pageInfo(){
                if(this.params.startDate==''||this.params.endDate==''){
                    this.$message({
                        type:'info',
                        message:'请选择时间'
                    });
                    return false;
                }
                this.loading=true;
                /*概述数据*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.reportTotal,
                    params: {
                        bdate: this.params.startDate,
                        edate: this.params.endDate,
                        media: this.channel_items.model_value,
                        adver: this.customer_items.model_value,
                        appid: this.pro_items.model_value,
                    }
                }).then(res => {
//                    console.log(res);
                    this.loading=false;
                    var data = res.data;
                    if (data.status == 0) {
//                        this.page.count = data.totalNums;
                        this.tableData = data.result;
                        this.tableData.push({
                            date:'总计',
                            click:data.click_total,
                            activation:data.activation_total,
                            releaseNum:data.release_total
                        });
                    } else {
                        this.tableData=[];
                        this.$message({
                            type:'error',
                            message:data.msg
                        });
                    }
                }).catch(error => {
                    this.loading=false;
                    console.log(error);
                    this.tableData=[];
                });
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
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
        }
    };
</script>
