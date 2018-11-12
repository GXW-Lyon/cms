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
                        <el-select v-model="platform_items.model_value"
                                   :placeholder="platform_items.placeHolder" class="con_select unBorderRadius"
                        clearable @change="pro">
                            <el-option
                                v-for="item in platform_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                   clearable>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item.productId">
                            </el-option>
                        </el-select>
                        <!--<el-select v-model="operate_items.model_value"-->
                                   <!--:placeholder="operate_items.placeHolder" class="con_select unBorderRadius"-->
                                   <!--clearable>-->
                            <!--<el-option-->
                                <!--v-for="(item,index) in operate_items.options"-->
                                <!--:key="index"-->
                                <!--:label="item"-->
                                <!--:value="item">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                        <el-select v-model="status_items.model_value"
                                   :placeholder="status_items.placeHolder" class="con_select unBorderRadius"
                                   filterable clearable>
                            <el-option
                                v-for="item in status_items.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="dateBut">
                            <el-button type="primary" @click.stop="importData" :style="{'margin-left':'29px'}">导出
                            </el-button>
                            <router-link :to="{name:'accountManaNew'}"><el-button type="primary"><i class="el-icon-plus"></i>新建账号</el-button></router-link>
                        </div>
                    </div>
                    <div class="realTimeCitySearch">
                        <el-input v-model="accountName" class="page_d_select" placeholder="请输入账号"
                                  @keyup.enter.native="pageInfo"></el-input>
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
                            sortable
                            prop="name"
                            label="账号名称"
                            min-width="200">
                        </el-table-column>
                        <el-table-column
                            label="密码"
                            min-width="70"
                            class-name="exitInput copyInput">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox r_span copyPassBtn" :data-clipboard-text="scope.row.pwd" @click="copypass">复制密码</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-for="(c, i) in table_column"
                            :key="c.prop"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            width="auto"
                            :min-width="c.minwidth"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="170"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox r_span" @click.stop="recharge(scope.row.id,scope.row.platformId,scope.row.productName,scope.row.name)">充值</span>
                                    <span class="inlineBox d_span" @click.stop="depositInfo(scope.row.id)">明细</span>
                                    <span class="inlineBox d_span" @click.stop="editAccount(scope.row.id)">修改</span>
                                    <span v-if="!scope.row.deleted" class="inlineBox d_span" @click.stop="deleteAccount(scope.row.id)">禁用</span>
                                    <span v-if="scope.row.deleted" class="inlineBox d_span" style="opacity:0;">禁用</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="examine" v-if="examineStatus" @click.stop="">
                <div class="examine_title">
                    <span>发起账号充值审批</span>
                    <button @click.stop="exit">×</button>
                </div>
                <el-form ref="form" :model="examine_from" label-width="125px">
                    <el-form-item label="产品名称：">
                        <el-input v-model="examinePro" class="f_input1" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="账号名称：">
                        <el-input v-model="examineName" class="f_input1" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额：">
                        <el-input v-model="examine_from.amount" class="f_input1" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" style="height:auto!important;">
                        <el-input type="textarea" class="f_textarea" v-model="examine_from.notes"></el-input>
                    </el-form-item>
                    <el-form-item class="form_button" style="margin-top:20px;">
                        <el-button type="primary page_d_s_button" @click="onSubmit">确认</el-button>
                        <el-button class="page_d_s_button" @click="exit">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bill" v-if="billStatus" @click.stop="">
                <div class="bill_title">
                    <span>明细</span>
                    <button @click.stop="exit">×</button>
                </div>
                <div class="bill_table_detail">
                    <el-table
                        :data="tableDataBillDetail"
                        border
                        stripe
                        style="width:100%;max-height:450px;overflow-y:auto;"
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
                <div class="con_pager" :style="{width:'100%','min-width':'100%'}">
                    <div class="block">
                        <!--<span class="demonstration">直接前往</span>-->
                        <el-pagination
                            @size-change="handleSizeChangeBill"
                            @current-change="handleCurrentChangeBill"
                            :current-page.sync="bill_page.currentPage"
                            :page-sizes="bill_page.sizes"
                            :page-size="bill_page.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="bill_page.count">
                        </el-pagination>
                    </div>
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
    import Clipboard from 'clipboard';
    export default {
        data() {
            return {
                loading: false,
                examineStatus:false,
                billStatus:false,
                visibleMenuSelectStatus: false,
                checkedCities: [ '产品', '当前余额', '平台', '状态'],
                cities: [ '产品', '当前余额', '平台', '状态'],
                importCities: [ '账号名称','密码','产品', '当前余额', '平台', '状态'],
                citiesFilterVal: [ 'name', 'pwd', 'productName', 'amount', 'platformName', 'statusFormat'],
                table_column: [
                    {fixed: false, prop: 'productName', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'amount', label: '当前余额', sortable: false, visible: true,minwidth:100},
                    // {fixed: false, prop: 'operator', label: '运营人', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'platformName', label: '平台', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'deleted', label: '状态', sortable: false, visible: true,minwidth:80,format:function (row,col) {
                        switch (row.deleted){
                            case false:row.statusFormat='执行中';return '执行中';break;
                            case true:row.statusFormat='已关闭';return '已关闭';break;
                        }
                    }},
                ],
                table_column_bill_detail: [
                    {fixed: false, prop: 'amount', label: '金额', sortable: false, visible: true},
                    {fixed: false, prop: 'ctime', label: '日期', sortable: false, visible: true},
                    {fixed: false, prop: 'status', label: '状态', sortable: false, visible: true,format:(row,col)=>{
                        return this.$store.getters.findDingStatus(row.status)?this.$store.getters.findDingStatus(row.status).val:'未开始';
                    }},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                bill_page: {
                    sizes: [10, 20, 30, 50],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['信息流数据管理', '账号管理'
                ],
                tableData: [],
                tableDataBillDetail: [],
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: [
                    ]
                },
                status_items: {
                    model_value: '',
                    placeHolder: '状态',
                    options: [
                        {
                            id:false,
                            val:'执行中'
                        },
                        {
                            id:true,
                            val:'已关闭'
                        },
                    ]
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
                operate_items: {
                    model_value: '',
                    placeHolder: '运营',
                    options: []
                },
                params: {
                    type: '',
                    val: '',
                    startDate: '',
                    endDate: '',
                },
                examine_from: {
                    accountId: '',
                    amount: '',
                    notes: '',
                    platformId: '',
                },
                examineName:'',
                examinePro:'',
                accountName:'',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.platform();
//                this.pro();
//                 this.operate();
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
            pro() {
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
            /*运营人*/
            // operate(){
            //     this.$http({
            //         method: 'get',
            //         url: this.apiUrl.fdpAccGetOperator
            //     }).then(res => {
            //         if (res.status == 200) {
            //             var data = res.data;
            //             this.operate_items.options = data;
            //         } else {
            //         }
            //     }).catch(error => {
            //         console.log(error);
            //     });
            // },
            /*查询表格数据*/
            pageInfo() {
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccSearchAccount,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        platformId: this.platform_items.model_value,
                        productId: this.pro_items.model_value,
                        name: this.accountName,
                        deleted: this.status_items.model_value,
                    }
                }).then(res => {
                    this.loading=false;
                    console.log(res);
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.items;
                    }
                }).catch(err => {
                    this.loading=false;
                });
            },
            /*查询明细表格数据*/
            depositInfo(id) {
                this.billStatus=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccSearchAccountDeposit,
                    params: {
                        offset: this.bill_page.offset,
                        limit: this.bill_page.limit,
                        accountId: id,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        this.bill_page.count = res.data.totalNums;
                        this.tableDataBillDetail = res.data.items;
                    }
                }).catch(err => {

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
            /*页码翻页*/
            handleCurrentChangeBill(val) {
                this.bill_page.offset = val;
                this.depositInfo();
            },
            /*改变每页条数*/
            handleSizeChangeBill(val) {
                this.bill_page.limit = val;
                this.depositInfo();
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
                this.visibleMenuSelectStatus =this.examineStatus=this.billStatus= false;
            },
            exit(){
                this.examineStatus=this.billStatus=false;
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
                let tHeader = this.importCities;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileName = [this.platform_items.model_value,this.pro_items.model_value,this.status_items.model_value, '账号数据'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            /*复制密码*/
            copypass(){
                const clipboard = new Clipboard('.copyPassBtn');
                this.$message({
                    type: 'success',
                    message: '复制成功'
                });
            },
            /*充值*/
            recharge(accountId,platformId,pro,account){
                this.examineStatus=true;
                this.examine_from.accountId=accountId;
                this.examine_from.platformId=platformId;
                this.examineName=account;
                this.examinePro=pro;
            },
            /*提交充值审批*/
            onSubmit(){
                if(this.examine_from.amount==''){
                    this.$message({
                        type: 'info',
                        message: '请输入充值金额'
                    });
                    return false;
                }else if(this.examine_from.amount==0){
                    this.$message({
                        type: 'info',
                        message: '充值金额不能为0'
                    });
                    return false;
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.fdpAccAccountDeposit,
                    data: this.examine_from,
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if(data.status==1){
                            this.$message({
                                type: 'success',
                                message: '充值成功'
                            });
                            this.examineStatus=false;
                            this.pageInfo();
                        }else if(data.status==2){
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '充值失败，请重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请重新提交'
                    });
                });
            },
            /*修改账号*/
            editAccount(id){
                this.$router.push({
                    path: 'accountManaNew',
                    query: {id: id}
                });
            },
            /*删除账号*/
            deleteAccount(id) {
                this.$confirm('此操作将永久禁用该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.fdpAccDel,
                        params: {id: id}
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            this.pageInfo();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        }
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
        }
    };
</script>
