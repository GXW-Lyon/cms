<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="info_flow_content customerCollect" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content" style="padding: 27px 5%;">
                    <div class="dateSelect" style="display:inline-block;width:50%;">
                        <div class="block">
                            <el-select clearable v-model="customer_items.model_value"
                                       :placeholder="customer_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                                       filterable>
                                <el-option
                                    v-for="item in customer_items.options"
                                    :key="item.id"
                                    :label="item.customerName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select clearable v-model="platform_items.model_value"
                                       :placeholder="platform_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                            >
                                <el-option
                                    v-for="item in platform_items.options"
                                    :key="item.platformId"
                                    :label="item.platformName"
                                    :value="item.platformId">
                                </el-option>
                            </el-select>
                            <el-select clearable v-model="kyhd.model_value" :placeholder="kyhd.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth">
                                <el-option
                                    v-for="(item,index) in kyhd.options"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch dateBut" style="display:inline-block;width:45%;text-align:right;">
                        <el-button type="primary" @click.stop="addExamine"><i class="el-icon-plus"></i>添加预收款
                        </el-button><!--
					  -->
                        <el-button class="page_d_s_button" @click.stop="importData">导出当前明细</el-button>
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
                            :formatter="c.format"
                            :prop="c.prop"
                            :label="c.label"
                            width="auto"
                            :min-width="c.minwidth"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="查看明细"
                            width="80"
                            min-width="80"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div
                                    @click.stop="seeCusBill(scope.row.customerId,scope.row.productId,scope.row.platformId,scope.row.entityCode)">
                                    <i
                                        class="el-icon-view"></i></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="bill" v-if="billStatus" @click.stop="">
                <div class="bill_title">
                    <span @click="billImport">导出</span>
                    <button @click.stop="exit">×</button>
                </div>
                <div class="bill_table_detail">
                    <el-table
                        :data="tableDataBillDetail"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column_bill_detail"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :formatter="c.format"
                            :prop="c.prop"
                            :label="c.label"
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="examine" v-if="examineStatus" @click.stop="">
                <div class="examine_title">
                    <span>发起预收款审批</span>
                    <button @click.stop="exit">×</button>
                </div>
                <el-form ref="form" :model="examine_from" label-width="125px">
                    <el-form-item label="客户名称：">
                        <el-select clearable filterable v-model="examine_from.customerId"
                                   :placeholder="customer_items.placeHolder" class="f_input1 unBorderRadius"
                        @change="proInfo">
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.id"
                                :label="item.customerName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select clearable filterable v-model="examine_from.productId"
                                   :placeholder="pro_items.placeHolder" class="f_input1 unBorderRadius">
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item.productId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预收金额：">
                        <el-input v-model="examine_from.advanceAmount" class="f_input1"></el-input>
                    </el-form-item>
                    <el-form-item label="我方主体：">
                        <el-select v-model="examine_from.entity" :placeholder="kyhd.placeHolder"
                                   class="f_input1 inlineBlock"
                                   @change="">
                            <el-option
                                v-for="(item,index) in kyhd.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投放平台：">
                        <el-select v-model="examine_from.platformId" :placeholder="platform_items.placeHolder"
                                   class="f_input1 inlineBlock"
                                   @change="">
                            <el-option
                                v-for="item in platform_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" style="height:auto!important;">
                        <el-input type="textarea" class="f_textarea" v-model="examine_from.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="form_button" style="margin-top:20px;">
                        <el-button type="primary page_d_s_button" @click="onSubmit">确认</el-button>
                        <el-button class="page_d_s_button" @click="exit">取消</el-button>
                    </el-form-item>
                </el-form>
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
                billStatus: false,
                examineStatus: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['客户名称', '产品名称', '预收余额', '推广平台', '我方主体'],
                cities: ['客户名称', '产品名称', '预收余额', '推广平台', '我方主体'],
                citiesFilterVal: ['custmoerName', 'productName', 'advanceBanlance', 'platformName', 'entityFormat'],
                table_column: [
                    {fixed: false, prop: 'custmoerName', label: '客户名称', sortable: false, visible: true,minwidth:250},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: true, visible: true,minwidth:100},
                    {fixed: false, prop: 'advanceBanlance', label: '预收余额', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'platformName', label: '推广平台', sortable: false, visible: true,minwidth:100},
                    {
                        fixed: false,
                        prop: 'entity',
                        label: '我方主体',
                        sortable: false,
                        visible: true,
                        minwidth:300,
                        format: (row, col) => {
                            for (let item of this.kyhd.options) {
                                if (item.id == row.entity) {
                                    row.entityFormat = item.val;
                                    return item.val;
                                }
                            }
                            return '-';
                        }
                    },
                ],
                table_column_bill_detail: [
                    {fixed: false, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'custmoerName', label: '客户', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'advanceAmount', label: '预收', sortable: false, visible: true},
                    {
                        fixed: false,
                        prop: 'entity',
                        label: '我方主体',
                        sortable: false,
                        visible: true,
                        format: (row, col) => {
                            for (let item of this.kyhd.options) {
                                if (item.id == row.entity) {
                                    row.entityFormat = item.val;
                                    return item.val;
                                }
                            }
                            return '-';
                        }
                    },
                    {fixed: false, prop: 'name', label: '发起人', sortable: false, visible: true},
                    {fixed: false, prop: 'approvalStatus', label: '审批进度', sortable: false, visible: true},
                    {fixed: false, prop: 'approvalDays', label: '该节点审批等待天数', sortable: false, visible: true},
                ],
                detailCities: ['日期', '客户', '产品', '预收', '我方主体', '发起人', '审批进度', '该节点审批等待天数'],
                detailCitiesFilterVal: ['date', 'custmoerName', 'productName', 'advanceAmount', 'entityFormat', 'name', 'approvalStatus', 'approvalDays'],
                menu_nav: ['信息流数据管理', '客户预收'],
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: []
                },
                pro_items: {
                    placeHolder: '产品',
                    options: []
                },
                tableDataBillDetail: [],
                tableData: [],
                dateValue: '',
                params: {
                    type: '2',
                    val: '',
                    startDate: '',
                    endDate: ''
                },
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                examine_from: {
                    entity: '',
                    customerId: '',
                    productId: '',
                    remark: '',
                    advanceAmount: '',
                    platformId: ''
                },
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: []
                },
                kyhd: {
                    model_value: '',
                    placeHolder: '我方主体',
                    options: [
                        {
                            id: 'Y1',
                            val: '深圳康远互动科技有限公司'
                        },
                        {
                            id: 'Y2',
                            val: '霍尔果斯康远互动网络科技有限公司'
                        },
                        {
                            id: 'Y3',
                            val: '上海贝玩网络科技有限公司'
                        },
                        {
                            id: 'Y4',
                            val: '深圳自由泰格互动科技有限公司'
                        },
                    ]
                },
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customer();
//                this.proInfo();
                this.platform();
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
            /*客户*/
            customer() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusGetCustomerList,
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*平台*/
            platform() {
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
                this.examine_from.productId='';
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListall,
                    params: {
                        customerId: this.examine_from.customerId || -1,
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
            pageInfo() {
                if (this.customer_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '客户为必选项'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusSearch,
                    params: {
                        curPage: this.page.offset,
                        limit: this.page.limit,
                        customerId: this.customer_items.model_value,
                        platformId: this.platform_items.model_value,
                        entityCode: this.kyhd.model_value
                    }
                }).then(res => {
                    this.loading=false;
//                    console.log(res);
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.list;
                    }
                }).catch(err => {
                    this.loading=false;
                });
            },
            seeCusBill(cusId, proId, platId, entityCode) {
                this.billStatus = true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpCusDetailsquery,
                    params: {
                        customerId: cusId,
                        productId: proId,
                        platformId: platId,
                        entityCode: entityCode,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.tableDataBillDetail = res.data;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
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
            exit() {
                this.billStatus = this.examineStatus = false;
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = this.billStatus = this.examineStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            seeEvent() {
                this.billStatus = true;
            },
            addExamine() {
                this.examineStatus = true;
            },
            /*发起预收款审批*/
            onSubmit() {
                for (let item in this.examine_from) {
                    if (item != 'remark' && this.examine_from[item] == '') {
                        this.$message({
                            type: 'info',
                            message: '除备注信息，其他不能为空'
                        });
                        return false;
                    }
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.fdpCusCreate,
                    data: this.examine_from,
                }).then(res => {
                    var data = res.data;
                    if (res.status == 200) {
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.examineStatus = false;
                            this.customer_items.model_value != '' ? this.pageInfo() : null;
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加失败'
                    });
                });
            },
            /*导出当前明细*/
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
                let fileName = [this.customer_items.model_value, this.platform_items.model_value, this.kyhd.model_value, '预收明细'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            /*导出详细明细*/
            billImport() {
                if (this.tableDataBillDetail.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '暂无数据'
                    });
                    return false;
                }
                let tHeader = this.detailCities;
                let filterVal = this.detailCitiesFilterVal;
                let importData = this.tableDataBillDetail;
                let fileName = [this.customer_items.model_value, '明细'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.pageInfo();
            },
        }
    };
</script>
