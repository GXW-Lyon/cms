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
                        <el-input v-model="contractNo" class="page_d_select" placeholder="请输入合同编号或客户名称"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click="">搜索</el-button>
                        <el-select v-model="channel_items.model_value"
                                   :placeholder="channel_items.placeHolder" class="con_select unBorderRadius"
                                   @change="">
                            <el-option
                                v-for="item in channel_items.options"
                                :key="item.channelCode "
                                :label="item.name"
                                :value="item.channelCode ">
                            </el-option>
                        </el-select>
                        <el-select v-model="contract_items.model_value"
                                   :placeholder="contract_items.placeHolder" class="con_select unBorderRadius"
                                   @change="">
                            <el-option
                                v-for="item in contract_items.options"
                                :key="item.id"
                                :label="item.val"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="">查询</el-button>
                        <div class="dateBut">
                            <el-button type="primary" @click="newContract"><i class="el-icon-plus"></i>新建合同</el-button>
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadChannelContract"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button type="primary"><i class="el-icon-plus"></i>导入合同</el-button>
                            </el-upload>
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
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="查看合同"
                            width="100"
                            min-width="100"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click="exitEvent(scope.row.id)"><i class="el-icon-view"></i></div>
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
                fileList: [],
                importTitleStatus: false,
                importTitleTxt: '',
                visibleMenuSelectStatus: false,
                checkedCities: ['序号', '合同编号', '渠道主体', '开始时间', '结束时间', '推广模式', '合同状态', '审核状态'],
                cities: ['序号', '合同编号', '渠道主体', '开始时间', '结束时间', '推广模式', '合同状态', '审核状态'],
                table_column: [
                    {fixed: true, prop: 'id', label: '序号', sortable: true, visible: true},
                    {fixed: false, prop: 'contractNo', label: '合同编号', sortable: false, visible: true},
                    {fixed: false, prop: 'channelName', label: '渠道主体', sortable: false, visible: true},
                    {fixed: false, prop: 'beginTime', label: '开始时间', sortable: false, visible: true},
                    {fixed: false, prop: 'endTime', label: '结束时间', sortable: false, visible: true},
                    {fixed: false, prop: 'marketingMode', label: '推广模式', sortable: false, visible: true,format:function(row,col){
                        switch (row.marketingMode){
                            case '':return '-';break;
                            case 'CA':return 'CPA';break;
                            case 'CD':return 'CPD';break;
                            case 'CM':return 'CPM';break;
                            case 'CC':return 'CPC';break;
                            case 'CS':return 'CPS';break;
                            case 'CT':return 'CPT';break;
                            case 'CP':return 'CPPA';break;
                        }
                    }},
                    {fixed: false, prop: 'status', label: '合同状态', sortable: true, visible: true,format:function(row,col){
                        switch (row.status){
                            case 0:return '-';break;
                            case 1:return '正常';break;
                            case 2:return '即将过期';break;
                            case 3:return '已过期';break;
                        }
                    }},
                    {fixed: false, prop: 'checkStatus', label: '审核状态', sortable: true, visible: true,format:(row,col)=>{
                        return this.$store.getters.findDingStatus(row.checkStatus)?this.$store.getters.findDingStatus(row.checkStatus).val:'未开始';
                    }},
                ],
                page: {
                    sizes: [10, 20, 30, 50,100,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['CPA数据管理', '渠道合同管理'
                ],
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: [
                    ]
                },
                contract_items: {
                    model_value: '',
                    placeHolder: '状态',
                    options: [
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
                contractNo:'',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.channelInfo();
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
            pageInfo(){
                /*合同列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelConSearch,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        contractNo: this.contractNo,
                        channelCode: this.channel_items.model_value,
                        contractStatus: this.contract_items.model_value,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count = data.totalNums;
                        this.tableData = data.items;
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
            newContract() {
                this.$router.push({path: 'channelContractNew', query: {channelContractId: ''}});
            },
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            exitEvent(id) {
                this.$router.push({path: 'channelContractNew', query: {channelContractId: id}});
            },
            handleSuccess(response, file, fileList) {
                this.importTitleTxt = response;
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
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                const extension = fileName[fileNameLen] === 'csv';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!extension) {
                    this.$message({
                        type: 'info',
                        message: '上传渠道包只能是 csv 格式'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'info',
                        message: '上传包大小不能超过 2MB'
                    });
                }
                return extension && isLt2M;
            },
            exitImportTitle() {
                this.importTitleStatus=false;
                this.pageInfo();
            },
        }
    };
</script>
