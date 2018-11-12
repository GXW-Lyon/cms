
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
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   clearable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="contract_items.model_value"
                                   :placeholder="contract_items.placeHolder" class="con_select unBorderRadius"
                                   clearable>
                            <el-option
                                v-for="item in contract_items.options"
                                :key="item.gameNo"
                                :label="item.name"
                                :value="item.gameNo">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="btnClick">查询</el-button>
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
                        :data="tableData"
                        border
                        v-loading="loading"
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
                        <!-- <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="140"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox r_span" @click.stop="recharge(scope.row.id,scope.row.platformId,scope.row.productName,scope.row.name)">编辑</span>
                                    <span class="inlineBox d_span" @click.stop="editAccount(scope.row.id)">删除</span>
                                    <span v-if="!scope.row.deleted" class="inlineBox d_span" @click.stop="deleteAccount(scope.row.id)">运行中</span>
                                    <span v-if="scope.row.deleted" class="inlineBox d_span" style="opacity:0;">已暂停</span>
                                </div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
            </div>
            <!-- <div class="con_pager">
                <div class="block">
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
import axios from 'axios';
export default {
    data () {
        return {
            visibleMenuSelectStatus: false,
            checkedCities: ['日期', '渠道', '游戏展现', '游戏展现率', '游戏点击', '游戏点击率', '广告展现', '广告展现率', '广告点击', '广告点击率','平台来源','新增'],
            cities: ['日期', '渠道', '游戏展现', '游戏展现率', '游戏点击', '游戏点击率', '广告展现', '广告展现率', '广告点击', '广告点击率','平台来源','新增'],
            citiesFilterVal: ['date', 'originName', 'gameViewVolume', 'gameViewRate', 'gameClickVolume', 'gameClickRate', 'adViewVolume','adViewRate','adClickVolume','adClickRate','srcTotal','newTotal'],
            table_column: [
                { fixed: true, prop: 'date', label: '日期', sortable: true, visible: true },
                { fixed: false, prop: 'originName', label: '渠道', sortable: false, visible: true },
                { fixed: false, prop: 'gameViewVolume', label: '游戏展现', sortable: false, visible: true },
                { fixed: false, prop: 'gameViewRate', label: '游戏展现率', sortable: false, visible: true },
                { fixed: false, prop: 'gameClickVolume', label: '游戏点击', sortable: false, visible: true },
                { fixed: false, prop: 'gameClickRate', label: '游戏点击率', sortable: false, visible: true },
                { fixed: false, prop: 'adViewVolume', label: '广告展现', sortable: false, visible: true },
                { fixed: false, prop: 'adViewRate', label: '广告展现率', sortable: false, visible: true },
                { fixed: false, prop: 'adClickVolume', label: '广告点击', sortable: false, visible: true },
                { fixed: false, prop: 'adClickRate', label: '广告点击率', sortable: false, visible: true },
                { fixed: false, prop: 'srcTotal', label: '平台来源', sortable: false, visible: true },
                { fixed: false, prop: 'newTotal', label: '新增', sortable: false, visible: true },
            ],
            page: {
                sizes: [10, 20, 30, 50],
                offset: 1,
                limit: 10,
                count: 0,
                currentPage: 1,
            },
            menu_nav: ['推啊数据管理', '详细数据'
            ],
            customer_items: {
                model_value: '',
                placeHolder: '全部渠道',
                options: [
                ]
            },
            contract_items: {
                model_value: '',
                placeHolder: '全部游戏',
                options: []
            },
            tableData: [],
            newData:[],
            infoData:[],
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dateValue: '',
            params: {
                startDate: '',
                endDate: ''
            },
            loading: false,
            contractNo: ''
        };
    },
    activated () {
        this.channelInfo();
        this.gameInfo();
    },
    created () {

    },
    methods: {
        /*客户*/
        channelInfo () {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelList,
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
        /*按钮事件*/
        btnClick () {
            if (this.dateValue == '') {
                this.$message({
                    type: 'warning',
                    message: '请选择时间'
                });
                return false;
            }
            this.loading = true;
            axios.all([this.pageInfo(),this.newInfo()]).then(
                axios.spread(
                    (res1,res2)=>{
                        for(var key in this.infoData){
                            for(var index in this.newData){
                                if((this.infoData[key].originName==this.newData[index].channel) && (this.infoData[key].date==this.newData[index].date)){
                                    this.infoData[key].srcTotal = this.newData[index].srcTotal;
                                    this.infoData[key].newTotal = this.newData[index].newTotal;
                                }
                            }
                        }
                        this.tableData = this.infoData;                            
                        this.loading = false;
                    }
                )
            );
        },
        /*详细列表*/
        pageInfo () {
            return this.$http({
                method: 'post',
                url: this.apiUrl.tuiaAdminLogStatDetailData,
                data: {
                    adNo: "",
                    etime: this.params.endDate,
                    stime: this.params.startDate,
                    origin: this.customer_items.model_value,
                    gameNo: this.contract_items.model_value,
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data.sdds;
                    this.infoData = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*新增数据信息*/
        newInfo () {
            return this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminStatChannelList,
                params: {
                    channel: this.customer_items.model_value,
                    etime: this.params.endDate,
                    stime: this.params.startDate,
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.newData = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*获取游戏*/
        gameInfo () {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminGameList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.contract_items.options = data;
                } else {}
            }).catch();
        },
        handleCurrentChange (val) {
            this.page.offset = val;
            this.pageInfo();
        },
        handleSizeChange (val) {
            this.page.limit = val;
            this.pageInfo();
        },
        checkedChange () {
            for (let item of this.table_column) {
                var index = this.checkedCities.indexOf(item.label);
                index >= 0 ? item.visible = true : item.visible = false;
            }
        },
        changeCheckStatus (e) {
            e.stopPropagation();
            this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
        },
        bodyEvent () {
            this.visibleMenuSelectStatus = false;
        },
        preventDefault (e) {
            e.stopPropagation();
        },
        /*改变时间选择器*/
        dateChange () {
            if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d') + ' 00:00:00.000';
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d') + ' 23:59:59.999';
                var str = this.params.startDate.substr(0, 10);
                var str2 = this.params.endDate.substr(0, 10);
                this.params.date = str + '/' + str2;
            } else {
                this.params.startDate = '';
                this.params.endDate = '';
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
            let fileName = [this.params.date, this.customer_items.model_value, this.contract_items.model_value,  '详细数据'].join('_');
            this.handleDownload(tHeader, filterVal, importData, fileName);
        },
        exitEvent (id, name) {
            // console.log(id);
            this.$router.push({ path: 'cusContractEdit', query: { customerContractId: id, titleName: name } });
        }
    }
};
</script>

