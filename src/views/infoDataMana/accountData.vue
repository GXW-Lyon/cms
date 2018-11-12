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
                            <span class="demonstration">选择日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                style="margin-top: 2px;"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                            <el-button class="page_d_s_button" @click="refresh" style="margin-left: 125px;">刷新</el-button>
                        </div>
                        <div class="dateBut">
                            <el-select v-model="importPlatform"
                                       placeholder="导入数据所属平台" class="con_select unBorderRadius"
                                       :style="{'vertical-align':'top',width:'150px','margin-top':'2px'}" clearable>
                                <el-option
                                    v-for="item in platform_items.options"
                                    :key="item.platformId"
                                    :label="item.platformName"
                                    :value="item.platformId">
                                </el-option>
                            </el-select>
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.fdpAccImport"
                                :data="uploadData"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button type="primary" :disabled="this.importPlatform==''" :title="this.importPlatform==''?'请选择数据所属平台':null"><i class="el-icon-plus"></i>导入数据</el-button>
                            </el-upload>
                            <el-button type="primary" @click.stop="importData" :style="{'margin-left':'29px'}">导出数据
                            </el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch">
                        <el-select clearable v-model="platform_items.model_value"
                                   :placeholder="platform_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select">
                            <el-option
                                v-for="item in platform_items.options"
                                :key="item.platformId"
                                :label="item.platformName"
                                :value="item.platformId">
                            </el-option>
                        </el-select>
                        <el-select clearable v-model="pro_items.model_value"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                   >
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item.productId">
                            </el-option>
                        </el-select>
                        <el-select clearable v-model="account_items.model_value"
                                   :placeholder="account_items.placeHolder" class="con_select unBorderRadius"
                                    filterable>
                            <el-option
                                v-for="item in account_items.options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="selectBtn">查询</el-button>
                        <a href="http://kydev.oss-cn-beijing.aliyuncs.com/file/importModel.xlsx">
                            <el-button class="page_d_s_button" :style="{'margin-left':'29px',float:'right'}">下载导入数据模板</el-button>
                        </a>
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
                        :data="tableData"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        border
                        stripe
                        style="width: 100%;"
                    >
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
                            label="今日消耗"
                            min-width="150"
                            class-name="exitInput">
                            <template slot-scope="scope">
                                <div><span v-if="scope.row.dataTime=='总计'">{{scope.row.todayConsume}}</span>
                                    <el-input v-if="scope.row.dataTime!='总计'" type="number" class="" placeholder="" :value="scope.row.todayConsume"
                                              @change="scope.row.newTodayConsume=changeInput($event)" style="width:80%!important;"></el-input></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-for="(c, i) in table_column_"
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
                            label="操作"
                            min-width="50"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div v-if="scope.row.dataTime!='总计'" @click="updateConsume(scope.row.newTodayConsume,scope.row.id)"><span class="r_span">修改</span></div>
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
                loading: false,
                fileList: [],
                uploadData:{platformId:''},
                visibleMenuSelectStatus: false,
                importTitleStatus: false,
                importTitleTxt: '',
                checkedCities: ['日期', '产品', '账号名称', '今日折后消耗', '平台', '运营人'],
                cities: ['日期', '产品', '账号名称', '今日折后消耗', '平台', '运营人'],
                importCities: ['日期', '产品', '账号名称', '今日消耗', '今日折后消耗', '平台', '运营人'],
                citiesFilterVal: ['dataTime', 'productName', 'accountName', 'yestConsume', 'todayConsume', 'todayBalance', 'platformName', 'operator'],
                table_column: [
                    {fixed: false, prop: 'dataTime', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'productName', label: '产品', sortable: false, visible: true},
                    {fixed: false, prop: 'accountName', label: '账号名称', sortable: false, visible: true,minwidth:250},
//                    {fixed: false, prop: 'yestConsume', label: '昨日消耗', sortable: false, visible: true},
                ],
                table_column_: [
                    {fixed: false, prop: 'todayBalance', label: '今日折后消耗', sortable: false, visible: true,minwidth:110},
                    {fixed: false, prop: 'platformName', label: '平台', sortable: false, visible: true,minwidth:100},
                    {fixed: false, prop: 'operator', label: '运营人', sortable: false, visible: true,minwidth:100},
                ],
                page: {
                    sizes: [10, 20, 50,100,200,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['信息流数据管理', '账号数据'
                ],
                tableData: [],
                dateValue: '',
                platform_items: {
                    model_value: '',
                    placeHolder: '平台',
                    options: [
                    ]
                },
                account_items: {
                    model_value: '',
                    placeHolder: '账号',
                    options: []
                },
                pro_items: {
                    model_value: '',
                    placeHolder: '产品',
                    options: []
                },
//                operate_items: {
//                    model_value: '',
//                    placeHolder: '运营人',
//                    options: []
//                },
                params: {
                    date:''
                },
                importPlatform:'',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.platform();
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
            /*账号*/
            account() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccSearchAccount,
                    params: {
                        offset: 1,
                        limit: 9999,
                        platformId: this.platform_items.model_value
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.account_items.model_value='';
                        this.account_items.options = data.items;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /*产品*/
            proInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpProListall,
                    params: {
                        platformId: this.platform_items.model_value||-1,
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
//            operate(){
//                this.$http({
//                    method: 'get',
//                    url: this.apiUrl.fdpAccGetOperator
//                }).then(res => {
//                    if (res.status == 200) {
//                        var data = res.data;
//                        this.operate_items.options = data;
//                    } else {
//                    }
//                }).catch(error => {
//                    console.log(error);
//                });
//            },
            /*select检索*/
            select() {
                this.account();
                this.proInfo();
            },
            /*查询按钮*/
            selectBtn(){
                if(this.params.date == ''){
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                this.pageInfo();
            },
            /*查询表格数据*/
            pageInfo() {
                this.tableData=[];
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccSearch,
                    params: {
                        curPage: this.page.offset,
                        limit: this.page.limit,
                        productId: this.pro_items.model_value||-1,
                        accountId: this.account_items.model_value||-1,
                        platformId: this.platform_items.model_value||-1,
                        sDateTime: this.params.date,
                    }
                }).then(res => {
                    this.loading=false;
                    console.log(res);
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        this.tableData = res.data.list;
                        if(this.tableData.length>0){
                            this.tableData.unshift({dataTime:'总计',todayConsume:res.data.todayAllConsume,todayBalance:res.data.dstCountAllConsume});
                        }
                    }
                }).catch(err => {
                    this.loading=false;
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
            /*显示、隐藏表格列*/
            checkedChange() {
//                console.log(this.checkedCities);
                var newArr=this.table_column.concat(this.table_column_);
                for (let item of newArr) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            /*显示、隐藏表格列容易*/
            changeCheckStatus() {
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
            /*上传成功*/
            handleSuccess(response, file, fileList) {
                this.importTitleTxt = response.msg;
                this.importTitleStatus = true;
            },
            // 上传错误
            uploadError(err, file, fileList) {
                this.$message({
                    type: 'error',
                    message: '上传失败，请重试'
                });
            },
            // 上传前对文件的大小的判断
            beforeAvatarUpload(file) {
                if(this.importPlatform!=''){
                    this.uploadData.platformId=this.importPlatform;
                }
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                const extension = fileName[fileNameLen] === 'xlsx';
                const extension2 = fileName[fileNameLen] === 'xls';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!extension && !extension2) {
                    this.$message({
                        type: 'info',
                        message: '上传渠道包只能是 xlsx/xls 格式'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'info',
                        message: '上传包大小不能超过 2MB'
                    });
                }
                return extension || extension2 && isLt2M;
            },
            /*body事件*/
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            /*关闭上传成功的提示*/
            exitImportTitle() {
                this.importTitleStatus = false;
                this.pageInfo();
            },
            /*改变时间选择器*/
            dateChange() {
                if (this.dateValue != '' && typeof this.dateValue != 'undefined' && this.dateValue[0] != null && this.dateValue[1] != null) {
                    this.params.date = this.formatDateTime(this.dateValue[0], 'y/m/d')+'-'+this.formatDateTime(this.dateValue[1], 'y/m/d');
                } else {
                    this.params.date = '';
                }
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
                let fileName = [this.params.date, this.platform_items.model_value,this.account_items.model_value, this.pro_items.model_value,  '账号数据'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            changeInput(e) {
                return e;
            },
            updateConsume(num,id){
                if(isNaN(num)){
                    this.$message({
                        type: 'info',
                        message: '请修改今日消耗，并重新提交'
                    });
                    return false;
                }else if(num<0){
                    this.$message({
                        type: 'info',
                        message: '请填写大于等于0的数值'
                    });
                    return false;
                }
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccModify,
                    params: {
                        id:id,
                        todayConsume:parseFloat(num).toFixed(2),
                    },
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                            this.pageInfo();
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败，请重新提交'
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
            refresh(){
                if(this.params.date == ''){
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }
                let d=this.params.date.split('-');
                let sd=d[0].replace(/\//g,'-');
                let ed=d[1].replace(/\//g,'-');
                this.$http({
                    method: 'get',
                    url: this.apiUrl.fdpAccOnekeyrefresh,
                    params: {
                        sdate: sd,
                        edate: ed,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        let data=res.data;
                        this.$message({
                            type:data.status==1?'success':'error',
                            message:data.message
                        });
                    }
                }).catch(err => {
                });
            },
        }
    };
</script>
