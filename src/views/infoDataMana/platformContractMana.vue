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
                        <el-input v-model="contractNo" class="page_d_select" placeholder="请输入合同编号"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click="pageInfo()">搜索</el-button>
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   >
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.platformCode"
                                :label="item.platformName"
                                :value="item.platformCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="contract_items.model_value"
                                   :placeholder="contract_items.placeHolder"  class="con_select unBorderRadius">
                            <el-option
                                v-for="item in contract_items.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo()">查询</el-button>
                        <div class="dateBut" @click="newContract">
                            <el-button type="primary"><i class="el-icon-plus"></i>新建合同</el-button>
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
                            :min-width="c.minwidth"
                            width="auto"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="查看合同"
                            width="80"
                            min-width="80"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click="exitEvent(scope.row.id,scope.column.label)"><i class="el-icon-view"></i></div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            fixed="right"
                            label="合同修改"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click="exitEvent(scope.row.id,scope.column.label)"><i class="el-icon-edit"></i></div>
                            </template>
                        </el-table-column> -->
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
                checkedCities: ['序号', '合同编号', '平台名称', '开始时间', '结束时间', '合同状态', '审核状态'],
                cities: ['序号', '合同编号', '平台名称', '开始时间', '结束时间', '合同状态', '审核状态'],
                table_column: [
                    {fixed: true, prop: 'id', label: '序号', sortable: true, visible: true,minwidth:70},
                    {fixed: false, prop: 'contractNo', label: '合同编号', sortable: false, visible: true,minwidth:200},
                    {fixed: false, prop: 'name', label: '平台名称', sortable: false, visible: true},
                    {fixed: false, prop: 'beginTime', label: '开始时间', sortable: false, visible: true},
                    {fixed: false, prop: 'endTime', label: '结束时间', sortable: false, visible: true},
                    {fixed: false, prop: 'status', label: '合同状态', sortable: true, visible: true,minwidth:100,format:function(row,col){
                        switch (row.status){
                            case 0:return '-';break;
                            case 1:return '正常';break;
                            case 2:return '即将过期';break;
                            case 3:return '已过期';break;
                        }
                    }},
                    {fixed: false, prop: 'checkStatus', label: '审核状态', sortable: true, visible: true,minwidth:100,format:(row,col)=>{
                        return this.$store.getters.findDingStatus(row.checkStatus)?this.$store.getters.findDingStatus(row.checkStatus).val:'未开始';
                    }},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['信息流数据管理', '平台合同管理'
                ],
                customer_items: {
                    model_value: '',
                    placeHolder: '全部平台',
                    options: [
                    ]
                },
                contract_items: {
                    model_value: '',
                    placeHolder: '全部状态',
                    options: [
                        {
                            id: '0',
                            val: '全部状态'
                        },
                        {
                            id: '1',
                            val: '正常'
                        },
                        {
                            id: '2',
                            val: '即将过期'
                        },
                        {
                            id: '3',
                            val: '已过期'
                        },
                    ]
                },
                tableData: [
                ],
                contractNo: '',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customerInfo();
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
            customerInfo() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpPlatGetPlatFormList,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        var data1 = data.unshift({'platformCode':'0','platformName':'全部平台'});
                        this.customer_items.options = data;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo(){
                /*合同列表*/
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpConSearchPlatform,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        contractNo: this.contractNo,
                        platformCode: this.customer_items.model_value=='0'?this.customer_items.model_value='' :this.customer_items.model_value,
                        contractStatus: this.contract_items.model_value,
                    }
                }).then(res => {
                    this.loading=false;
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count = data.totalNums;
                        this.tableData = data.items;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                    this.loading=false;
                });
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
            newContract() {
                this.$router.push({path: 'platformConNew', query: {customerContractId: ''}});
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            exitEvent(id,name) {
                this.$router.push({path: 'platformConEdit', query: {customerContractId: id,titleName:name}});
            }
        }
    };
</script>


