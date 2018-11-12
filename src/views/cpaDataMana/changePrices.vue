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
                                type="date"
                                placeholder="选择日期"
                                @change="dateChange">
                            </el-date-picker>
                        </div><!--
                        -->
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   filterable @change="select('1',customer_items.model_value)">
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.customerCode"
                                :label="item.name"
                                :value="item.customerCode">
                            </el-option>
                        </el-select><!--
                        -->
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select('2',pro_items.model_value)">
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.id"
                                :label="item.productName"
                                :value="item.customerProductCode">
                            </el-option>
                        </el-select><!--
                        -->
                        <el-select v-model="business_items.model_value"
                                   :placeholder="business_items.placeHolder" class="con_select unBorderRadius"
                                   @change="">
                            <el-option
                                v-for="item in business_items.options"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        <div class="dateBut">
                            <el-button type="primary" @click="changePriceBut">批量修改</el-button>
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
                        <el-table-column
                            label="操作"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <span v-if="scope.row.validStatus=='button'" @click="checkAllEvent"
                                      class="r_span">{{checkAll ? '全选' : '取消全选'}}</span>
                                <el-checkbox v-else v-model="scope.row.validStatus"></el-checkbox>
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
            <el-dialog
                title="输入价格："
                :visible.sync="dialogVisible"
                size="tiny">
                <el-input type="number" class="" placeholder="" v-model="params.price"></el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" style="height:auto;">取 消</el-button>
    <el-button type="primary" @click="changePriceSub" style="height:auto;">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [],
                importTitleStatus: false,
                importTitleTxt: '',
                visibleMenuSelectStatus: false,
                dialogVisible: false,
                loading: false,
                checkAll: true,
                checkedCities: ['产品包代码', '价格'],
                cities: ['产品包代码', '价格'],
                table_column: [
                    {fixed: false, prop: 'productChannelCode', label: '产品包代码', sortable: false, visible: true},
                    {fixed: false, prop: 'currentPrice', label: '价格', sortable: false, visible: true},
                ],
                dateValue: '',
                page: {
                    sizes: [100, 500],
                    offset: 1,
                    limit: 100,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['CPA数据管理', '客户批量改价格'
                ],
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: []
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                business_items: {
                    model_value: '',
                    placeHolder: '业务模式',
                    options: []
                },
                params: {
                    type: '',
                    val: '',
                    date: '',
                    price: '',
                },
                tableData: [],
                idList: [],
                contractNo: '',
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customerInfo();
                this.businessModel();
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
            customerInfo() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data.items;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            proInfo() {
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListLight,
                    params: {
                        customerCode: this.customer_items.model_value,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                        this.pro_items.model_value = '';
//                        this.customerProductCode.model_value = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            businessModel() {
                /*业务模式*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListBiztype,
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.business_items.options = data.lists;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                if (!this.params.date) {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                } else if (this.customer_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择客户'
                    });
                    return false;
                }else if (this.pro_items.model_value == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择产品'
                    });
                    return false;
                }
                /*列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListPackage,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        datetime: this.params.date,
                        bizType: this.business_items.model_value,
                        type: this.params.type,
                        code: this.params.val,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count = data.totalNums;
                        for (let row of data.items) {
                            row.validStatus = false;
                        }
                        data.items.length > 0 ? data.items.unshift({validStatus: 'button'}) : null;
                        this.checkAll = true;
                        this.tableData = data.items;
                        this.idList = [];
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            select(type, val) {
                if (val != '' && typeof val != 'undefined') {
                    this.params.type = type;
                    this.params.val = val;
                    switch (type) {
                        case '1':
                            this.proInfo();
                            break;
                    }
                }
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.pageInfo();
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined') {
                    this.params.date = this.formatDateTime(this.dateValue, 'y-m-d');
                } else {
                    this.params.date = '';
                }
            },
            /*全选事件*/
            checkAllEvent() {
                let flag = true;
                for (let item of this.tableData) {
                    if (item.validStatus != 'button') {
                        item.validStatus = this.checkAll;
                        flag = false;
                    }
                }
                if (flag)
                    return false;
                this.checkAll = !this.checkAll;
            },
            changePriceBut() {
                if (!this.params.date) {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                this.idList = [];
                for (let item of this.tableData) {
                    item.validStatus && item.validStatus != 'button' ? this.idList.push(item.customerProductCode+'|'+item.productChannelCode) : null;
                }
                if(this.idList.length==0){
                    this.$message({
                        type: 'info',
                        message: '请选择包'
                    });
                    return false;
                }
                this.params.price = '';
                this.dialogVisible = true;
            },
            changePriceSub() {
                if(!this.params.price){
                    this.$message({
                        type: 'info',
                        message: '请输入价格'
                    });
                }else{
                    this.changePriceApi();
                }
            },
            changePriceApi(){
                this.dialogVisible = false;
                this.loading=true;
                this.$http({
                    method: 'post',
                    url: this.apiUrl.customerProUpdatePackage,
                    data: {
                        datetime : this.params.date,
                        customerProductCode: this.idList,
                        prices : this.params.price
                    }
                }).then(res => {
                    console.log(res);
                    this.loading=false;
                    if (res.status = 200) {
                        if(res.data.status==1){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.pageInfo();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    }
                }).catch(err => {
                    console.log(err);
                    this.loading=false;
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
            },
        }
    };
</script>
