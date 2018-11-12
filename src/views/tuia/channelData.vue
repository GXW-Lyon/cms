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
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        <div class="dateBut" @click="newContract">
                            <el-button type="primary"><i class="el-icon-plus"></i>新建创意</el-button>
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
                        <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="tuiaBtn" type="primary" @click.stop="editAccount(scope.row.id)">编辑</el-button>
                                </div>
                            </template>
                        </el-table-column>
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
export default {
    data () {
        return {
            visibleMenuSelectStatus: false,
            checkedCities: ['日期', '渠道', '平台来源', '新增'],
            cities: ['日期', '渠道', '平台来源', '新增'],
            table_column: [
                { fixed: true, prop: 'date', label: '日期', sortable: true, visible: true },
                { fixed: false, prop: 'channel', label: '渠道', sortable: false, visible: true },
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
            menu_nav: ['推啊数据管理', '渠道每日数据'
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
            contractNo: ''
        };
    },
    activated () {
        this.channelInfo();
        if(this.dateValue !=''){
            this.pageInfo();
        };
    },
    created () {

    },
    methods: {
        /*渠道*/
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
        /*详细列表*/
        pageInfo () {
            if (this.dateValue == '') {
                this.$message({
                    type: 'warning',
                    message: '请选择时间'
                });
                return false;
            }
            this.$http({
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
                    this.tableData = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*编辑数据*/
        editAccount (id) {
            this.$router.push({
                path: 'channelDataEdit',
                query: { id: id }
            });
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
        newContract () {
            this.$router.push({ path: 'channelDataNew', query: { customerContractId: '' } });
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
            } else {
                this.params.startDate = '';
                this.params.endDate = '';
            }
        },
        exitEvent (id, name) {
            // console.log(id);
            this.$router.push({ path: 'cusContractEdit', query: { customerContractId: id, titleName: name } });
        }
    }
};
</script>



