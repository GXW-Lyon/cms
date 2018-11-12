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
                    <div class="realTimeCitySearch">
                        <el-select v-model="channel_items.model_value"
                                      :placeholder="channel_items.placeHolder" class="con_select unBorderRadius"
                                      filterable @change="select('3',channel_items.model_value)">
                        <el-option
                            v-for="item in channel_items.options"
                            :key="item.channelCode"
                            :label="item.name"
                            :value="item.channelCode">
                        </el-option>
                    </el-select><!--
                        --><el-select v-model="customer_items.model_value"
                                      :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                      filterable @change="select('1',customer_items.model_value)">
                        <el-option
                            v-for="item in customer_items.options"
                            :key="item.customerCode"
                            :label="item.name"
                            :value="item.customerCode">
                        </el-option>
                    </el-select><!--
                        --><el-select v-model="pro_items.model_value"
                                      :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                      @change="select('2',pro_items.model_value)">
                        <el-option
                            v-for="item in pro_items.options"
                            :key="item.productCode"
                            :label="item.productName"
                            :value="item.productCode">
                        </el-option>
                    </el-select><!--
                        --><el-select v-model="channelPro_items.model_value"
                                      :placeholder="channelPro_items.placeHolder" class="con_select unBorderRadius"
                                      @change="select('4',channelPro_items.model_value)" filterable>
                        <el-option
                            v-for="item in channelPro_items.options"
                            :key="item.customerProductCode"
                            :label="item.productChannelCode"
                            :value="item.customerProductCode">
                        </el-option>
                    </el-select>
                        <div class="dateBut">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadChannelProduct"
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
                    <div class="dateSelect">
                        <div class="block">
                            <el-input v-model="value" class="page_d_select" placeholder="请输入上游渠道号"
                                      @keyup.enter.native="search()"></el-input><!--
					  -->
                            <el-button class="page_d_s_button" @click="search()" style="margin-left:40px;">搜索</el-button>
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
                            width=""
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <span class="inlineBox d_span" @click.stop="exitEvent(scope.row.id)">编辑</span>
                                    <span class="inlineBox d_span" @click.stop="delpro(scope.row.channelProductCode)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con_pager">
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
                checkedCities: [ '产品名称', '上游渠道号', '客户名称', '渠道', '上线时间', '下线时间', '包状态', '现渠道价'],
                cities: ['产品包渠道代码', '产品名称', '上游渠道号','康远渠道号', '客户名称', '渠道', '上线时间', '下线时间', '包状态', '现渠道价'],
                table_column: [
                    {fixed: true, prop: 'channelProductCode', label: '产品包渠道代码', sortable: true, visible: false,width:140},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true,width:120},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true,width:280},
                    {fixed: false, prop: 'kyProductChannelCode', label: '康远渠道号', sortable: false, visible: false,width:150},
                    {fixed: false, prop: 'channelName', label: '渠道', sortable: false, visible: true},
                    {fixed: false, prop: 'status', label: '包状态', sortable: false, visible: true,format: function (row, col){
                        switch (row.status){
                            case 0:return '未封包';break;
                            case 1:return '封包';break;
                        }
                    }},
//                    {fixed: false, prop: 'prodcutPackageLink', label: '产品链接', sortable: false, visible: true},
                    {fixed: false, prop: 'onlineTime', label: '上线时间', sortable: false, visible: true,format:function (row,col) {
                        return row.onlineTime.split(' ')[0];
                    }},
                    {fixed: false, prop: 'offlineTime', label: '下线时间', sortable: false, visible: true,format:function (row,col) {
                        return row.offlineTime.split(' ')[0];
                    }},
                    {fixed: false, prop: 'channelCurPrice', label: '现渠道价', sortable: false, visible: true},
                ],
                page: {
                    sizes: [10, 20, 30, 50,100,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['CPA数据管理', '渠道产品管理'
                ],
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
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: [
                    ]
                },
                channelPro_items: {
                    model_value: '',
                    placeHolder: '上游渠道号',
                    options: []
                },
                params:{
                    type:'',
                    val:''
                },
                tableData: [
                ],
                importTitleStatus: false,
                importTitleTxt: '',
                fileList: [],
                loading: false,
                value:'',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated(){
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.channelInfo();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;
            this.customer_items.model_value!==''||this.channel_items.model_value!==''?this.pageInfo():null;
        },
        created() {
            this.isFirstEnter=true;
        },
        methods: {
            channelInfo() {
                /*渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        data.items.length > 0 ? this.channel_items.options = data.items : null;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            customerInfo() {
                /*客户*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelProListCustomer,
                    params: {
                        channelCode: this.channel_items.model_value,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.customer_items.options = data.customerItems;
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
                    url: this.apiUrl.channelProList,
                    params: {
                        customerCode: this.customer_items.model_value,
                        channelCode: this.channel_items.model_value,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            channelPro() {
                /*上游渠道号*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelProListPack,
                    params: {
                        productCode: this.pro_items.model_value,
                        channelCode: this.channel_items.model_value,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.channelPro_items.options = data.items;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            //搜索
            search(){
                if(!this.value){
                    this.$message({
                        type: 'info',
                        message: '请输入上游渠道号'
                    });
                }else{
                    /*渠道产品list*/
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.channelProSearchByPackageCode,
                        params: {
                            code: this.value,
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            var data = res.data;
                            this.page.count=data.totalNums;
                            this.tableData = data.items;
                        } else {
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            pageInfo(){
                /*渠道产品list*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelProSearch,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        type: this.params.type!=3?this.params.type:null,
                        code: this.params.type!=3?this.params.val:null,
                        channelCode: this.channel_items.model_value,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count=data.totalNums;
                        this.tableData = data.items;
                        if(this.pro_items.model_value==''){
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
            newPro() {
                this.$router.push({path: 'channelProNew',query:{channelProductId:''}});
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            exitEvent(id){
                this.$router.push({path: 'channelProNew',query:{channelProductId:id}});
            },
            select(type,val) {
                if (val != '' && typeof val != 'undefined') {
                    this.params.type = type;
                    this.params.val = val;
                    switch (type) {
                        case '3':
                            this.customer_items.model_value=this.pro_items.model_value=this.channelPro_items.model_value='';
                            this.pro_items.options=this.channelPro_items.options=[];
                            this.customerInfo();
                            break;
                        case '1':
                            this.pro_items.model_value=this.channelPro_items.model_value='';
                            this.channelPro_items.options=[];
                            this.proInfo();
                            break;
                        case '2':
                            this.channelPro_items.model_value='';
                            this.channelPro();
                            break;
                    }
                    this.pageInfo();
                }
            },
            deleteBill(id) {
                this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.channelProDel,
                        params: {id: id}
                    }).then(res => {
//                        console.log(res);
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.pageInfo();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
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
            delpro(channelProductCode){
                this.$confirm('此操作将永久删除所选行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.channelProDelNew,
                        params: {channelProductCode: channelProductCode}
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
