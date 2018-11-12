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
                            <span class="demonstration">检索条件</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                format="yyyy / MM / dd"
                                @change="dateChange"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-select v-for="(c, i) in select_items" :key="i" v-model="c.model_value"
                                   :placeholder="c.placeHolder" class="con_select"
                                   @change="selectChange(c.param,c.model_value)">
                            <el-option
                                v-for="item in c.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="searchQuery">查询</el-button>
                    </div>
                    <div class="citySearch">
                        <span class="demonstration">目标查询</span>
                        <el-input v-model="api_params.city" class="page_d_select" placeholder="请输入搜索城市"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click="searchCity">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="info_ad_table">
                <div class="page_d_title">
                    <i></i><span>详细数据</span>
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
                        :data="tableData"
                        border
                        stripe
                        fit
                        style="width:100%!important;"
                        min-height="440"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column"
                            :key="c.prop"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            width=""
                            min-width="100"
                            :class-name="c.prop.split('.')[1]"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            v-for="(c, i) in table_column_pic"
                            :key="c.prop"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            :class-name="c.prop.split('.')[1]"
                            width=""
                            min-width="100"
                            v-if="c.visible">
                            <template slot-scope="scope">
                                <img
                                    v-for="(item, i) in c.label=='广告截图'?scope.row.crawlAttr.adPicUrls:scope.row.crawlAttr.landpagePicUrls"
                                    :key="i" :src="item"
                                    @click="preImg(c.label=='广告截图'?scope.row.crawlAttr.adPicUrls:scope.row.crawlAttr.landpagePicUrls)"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-for="(c, i) in table_column_isDownload"
                            :key="c.prop"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            :class-name="c.prop.split('.')[1]"
                            :label-class-name="c.prop.split('.')[1]+'title'"
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
            <div class="page_d_con_right big_img" v-if="replaceInfo.bigImgStatus">
                <i class="el-icon-close" @click="exit_replace"></i>
                <div class="page_d_current page_create_current">
                    <div class="current_page_title create_page_title">落地页预览</div>
                    <div class="replace_img">

                    </div>
                    <div class="current_img">
                        <img v-for="img_src in replaceInfo.picUrls"
                             :src="img_src"
                             class="image replaceImg">
                    </div>
                </div>
            </div>
            <div class="mengceng" @click="exit_replace" v-if="replaceInfo.mengcengStatus"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                replaceInfo: {
                    bigImgStatus: false,
                    mengcengStatus: false,
                    picUrls: []
                },
                visibleMenuSelectStatus: false,
                checkedCities: ['区域', '省份', '城市', '日期', '时间', '位置', '位置2', '产品名称', '文案', '广告截图', '链接1地址', '链接1页面', '链接2地址', '归属'],
                cities: ['日期', '时间','区域', '省份', '城市', '位置', '位置2', '产品名称', '文案', '广告截图', '链接1地址', '链接1页面', '链接2地址', '归属'],
                table_column: [
                    {
                        fixed: true,
                        prop: 'date',
                        label: '日期',
                        sortable: true,
                        visible: true,
                        format: function (row, col) {
                            return row.date.split(' ')[0];
                        }
                    },
                    {
                        fixed: false,
                        prop: 'time',
                        label: '时间',
                        sortable: false,
                        visible: true,
                        format: function (row, col) {
                            return row.date.split(' ')[1];
                        }
                    },
                    {fixed: false, prop: 'areaName', label: '区域', sortable: false, visible: true},
                    {fixed: false, prop: 'provinceName', label: '省份', sortable: false, visible: true},
                    {fixed: false, prop: 'cityName', label: '城市', sortable: false, visible: true},
                    {
                        fixed: false,
                        prop: 'crawlAttr.type',
                        label: '位置',
                        sortable: false,
                        visible: true,
                        format: function (row, col) {
                            return '信息流';
                        }
                    },
                    {fixed: false, prop: 'crawlAttr.position', label: '位置2', sortable: false, visible: true},
                    {fixed: false, prop: 'crawlAttr.productTitle', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'crawlAttr.adDesc', label: '文案', sortable: false, visible: true},
                    {
                        fixed: false,
                        prop: 'crawlAttr.landpageUrl',
                        label: '链接1地址',
                        sortable: false,
                        visible: true,
                        format: function (row, col) {
                            return row.crawlAttr.isDownload == 1 ? row.crawlAttr.apkUrl : row.crawlAttr.landpageUrl;
                        }
                    },
                    {fixed: false, prop: '', label: '链接2地址', sortable: false, visible: true},
                ],
                table_column_pic: [
                    {fixed: false, prop: 'crawlAttr.adPicUrls', label: '广告截图', sortable: false, visible: true},
                    {fixed: false, prop: 'crawlAttr.landpagePicUrls', label: '链接1页面', sortable: false, visible: true},
                ],
                table_column_isDownload: [
                    {
                        fixed: false,
                        prop: 'crawlAttr.isDownload',
                        label: '归属',
                        sortable: false,
                        visible: true,
                        format: function (row, col) {
                            return row.crawlAttr.isDownload == 1 ? '√' : '×';
                        }
                    },
                ],
                page: {
                    sizes: [10, 20, 30, 50, 100],
                    offset: 1,
                    limit: 30,
                    count: 1000,
                    currentPage: 1,
                },
                api_params: {
                    st: '',
                    et: '',
                    areaId: '',
                    provinceId: '',
                    cityId: '',
                    isOwn: '',
                    city: ''
                },
                menu_nav: ['地域广告', '信息流广告'],
                select_items: [
                    {
                        model_value: '',
                        param: 'areaId',
                        placeHolder: '区域',
                        options: [
                            {
                                id: '1',
                                val: '1'
                            }
                        ]
                    }, {
                        model_value: '',
                        param: 'provinceId',
                        placeHolder: '省份',
                        options: [
                            {
                                id: '1',
                                val: '1'
                            }
                        ]
                    }, {
                        model_value: '',
                        param: 'cityId',
                        placeHolder: '城市',
                        options: [
                            {
                                id: '1',
                                val: '1'
                            }
                        ]
                    }, {
                        model_value: '',
                        param: 'isOwn',
                        placeHolder: '归属',
                        options: [
                            {
                                id: '1',
                                val: '1'
                            }
                        ]
                    },
                ],
                tableData: [
                ],
                dateValue: ''
            };
        },
        activated(){
            this.infoFlowInit();
        },
        created() {

        },
        methods: {
            infoFlowInit() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.crawlListUrl,
                    params: {
                        page: this.page.offset,
                        limit: this.page.limit,
                        type: '1',
                        st: this.api_params.st,
                        et: this.api_params.et,
                        areaId: this.api_params.areaId,
                        provinceId: this.api_params.provinceId,
                        cityId: this.api_params.cityId,
                        isOwn: this.api_params.isOwn,
                        city: this.api_params.city
                    }
                }).then(res => {
                    var data = res.data;
                    if (res.status == 200) {
                        this.page.count = data.total;
                        this.tableData = data.list;
//                        console.log(this.tableData);
                    } else {
//                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.infoFlowInit();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.infoFlowInit();
            },
            checkedChange() {
                for (let item of this.table_column) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
                for (let item of this.table_column_pic) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
                for (let item of this.table_column_isDownload) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            changeCheckStatus(e) {
                e.stopPropagation();
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            dateChange() {
                this.api_params.st = this.dateFormat(this.dateValue[0]);
                this.api_params.et = this.dateFormat(this.dateValue[1]);
            },
            selectChange(param, val) {
                this.api_params[param] = val;
            },
            searchCity() {
                this.page.offset = 1;
                this.page.currentPage = 1;
                this.infoFlowInit();
            },
            searchQuery() {
                this.page.offset = 1;
                this.page.currentPage = 1;
                this.infoFlowInit();
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            preImg(imgurl) {
                this.replaceInfo.picUrls = imgurl;
                this.replaceInfo.mengcengStatus = true;
                this.replaceInfo.bigImgStatus = true;
            },
            exit_replace() {
                this.replaceInfo.bigImgStatus = false;
                this.replaceInfo.mengcengStatus = false;
            }
        }
    };
</script>
