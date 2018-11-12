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
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   @change="cusSelect('1',customer_items.model_value)" filterable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.customerCode"
                                :label="item.name"
                                :value="item.customerCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius" @change="cusSelect('2',pro_items.model_value)" filterable>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.id"
                                :label="item.productName"
                                :value="item.customerProductCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="channelPro_items.model_value"
                                   :placeholder="channelPro_items.placeHolder" class="con_select unBorderRadius selectMaxWidth"
                                   @change="clientSql" filterable>
                            <el-option
                                v-for="(item,index) in channelPro_items.options"
                                :key="item.id"
                                :label="item.productChannelCode"
                                :value="index">
                            </el-option>
                        </el-select>
                        <div class="dateBut">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadCustomerProduct"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :on-progress	="uploading"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button type="primary"><i class="el-icon-plus"></i>导入数据</el-button>
                            </el-upload>
                            <el-button type="primary" @click="newPro"><i class="el-icon-plus"></i>新建产品</el-button>
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
                        element-loading-text="拼命上传中"
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
                            :width="c.width"
                            min-width="100"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox d_span" @click.stop="exitEvent(scope.row.id)">编辑</span>
                                    <span class="inlineBox d_span" @click.stop="delpro(scope.row.customerProductCode)">删除</span>
                                </div>
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
            <div class="importTitle" v-if="importTitleStatus" @click.stop="">
                <div class="importTitle_top">
                    <span>提示</span>
                    <button @click.stop="exitImportTitle">×</button>
                </div>
                <div class="importTitleTxt" v-html="importTitleTxt"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visibleMenuSelectStatus: false,
                checkedCities: [ '产品名称', '客户名称','上游渠道号',  '最新打包时间', '现接入价'],
                cities: ['产品包代码', '客户名称', '产品名称', '上游渠道号','康远渠道号', '最新打包时间', '现接入价'],
                table_column: [
                    {fixed: true, prop: 'productPackageCode', label: '产品包代码', sortable: true, visible: false,width:120},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true,width:280},
                    {fixed: false, prop: 'kyProductChannelCode', label: '康远渠道号', sortable: false, visible: false,width:150},
//                    {fixed: false, prop: 'status', label: '状态', sortable: false, visible: true,format: function (row, col){
//                        switch (row.status){
//                            case 1:return '投放中';break;
//                            case 2:return '已暂停';break;
//                            case 3:return '已下线';break;
//                            case 4:return '未使用';break;
//                        }
//                    }},
//                    {fixed: false, prop: 'customerName', label: '上游客户', sortable: false, visible: true,width:150},
//                    {fixed: false, prop: 'backendAccounts.url', label: '后台链接', sortable: false, visible: true,width:150},
//                    {fixed: false, prop: 'cooperativeMode', label: '合作模式', sortable: false, visible: true,format: function (row, col){
//                        switch (row.cooperativeMode){
//                            case 1:return '固定CPA';break;
//                            case 2:return 'CPM';break;
//                            case 3:return 'CPS';break;
//                        }
//                    }},
//                    {fixed: false, prop: 'packageLink', label: '包链接', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'lastPackageDT', label: '最新打包时间', sortable: false, visible: true,width:120},
                    {fixed: false, prop: 'currentPrice.price', label: '现接入价', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 30, 50,100,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['CPA数据管理', '客户产品管理'],
                customer_items: {
                    model_value: '',
                    placeHolder: '客户',
                    options: [
                    ]
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: [
                    ]
                },
                channelPro_items: {
                    model_value: '',
                    placeHolder: '上游渠道号',
                    options: []
                },
                tableData: [],
                params:{
                    type:'',
                    val:''
                },
                importTitleStatus: false,
                importTitleTxt: '',
                fileList: [],
                loading: false,
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
            this.customer_items.model_value!==''?this.pageInfo():null;
        },
        created() {
            this.isFirstEnter=true;
        },
        methods: {
            selectInfo() {
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
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data.items;
//                        if(this.customer_items.options.length>0){
//                            this.customer_items.model_value=this.customer_items.options[0].customerCode;
//                        }
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            proInfo(code) {
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListLight,
                    params: {
                        customerCode: code,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                        this.pro_items.model_value='';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo(){
                /*客户产品list*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProSearch,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        type: this.params.type,
                        code:this.params.val,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count=data.totalNums;
                        this.tableData = data.items;
                        if(this.params.type==2&&this.pro_items.model_value!=''){
                            this.channelPro_items.options=data.items;
                            this.channelPro_items.model_value='';
                        }else if(this.pro_items.model_value==''){
                            this.channelPro_items.options=[];
                            this.channelPro_items.model_value='';
                        }
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
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
            newPro() {
                this.$router.push({path: 'customerProNew', query: {customerId: ''}});
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            exitEvent(id) {
                this.$router.push({path: 'customerProNew', query: {customerId: id}});
            },
            cusSelect(type,val) {
                if(val!==''){
                    type=='1'?this.proInfo(val):null;
                    this.params.type=type;
                    this.params.val=val;
                    this.pageInfo();
                }
            },
            clientSql(){
                if(this.channelPro_items.model_value!==''){
                    this.page.count=1;
                    this.tableData=[];
                    this.tableData.push(this.channelPro_items.options[this.channelPro_items.model_value]);
                }
            },
            exitImportTitle() {
                this.importTitleStatus = false;
                this.pageInfo();
            },
            delpro(customerProductCode){
                this.$confirm('此操作将永久删除所选行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.customerProductDel,
                        params: {customerProductCode: customerProductCode}
                    }).then(res => {
                        console.log(res);
                        if(res.data&&res.data.status==1){
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
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    };
</script>
