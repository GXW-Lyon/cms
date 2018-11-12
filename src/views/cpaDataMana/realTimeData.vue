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
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                @change="dateChange"
                                format="yyyy / MM / dd"
                                :picker-options="$store.state.pickerOptions2">
                            </el-date-picker>
                            <el-input v-model="value" class="page_d_select" placeholder="请输入上游渠道号"
                                      @keyup.enter.native="search()"></el-input><!--
					  -->
                            <el-button class="page_d_s_button" @click="search()" style="margin-left:77px;">搜索
                            </el-button>
                        </div>
                        <div class="dateBut">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadData"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button type="primary"><i class="el-icon-plus"></i>导入数据</el-button>
                            </el-upload>
                            <el-button type="primary" @click.stop="importData"><i class="el-icon-plus"></i>导出数据
                            </el-button>
                        </div>

                    </div>
                    <div class="realTimeCitySearch">
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select('1',customer_items.model_value)" filterable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item.customerCode"
                                :label="item.name"
                                :value="item.customerCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="proModelValue"
                                   :placeholder="pro_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select('2',proModelValue)" multiple>
                            <el-option
                                v-for="item in pro_items.options"
                                :key="item.id"
                                :label="item.productName"
                                :value="item.customerProductCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="channelPro_items.model_value" :disabled="multipleStatus"
                                   :placeholder="channelPro_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select('3',channelPro_items.model_value)" filterable>
                            <el-option
                                v-for="item in channelPro_items.options"
                                :key="item.productPackageCode"
                                :label="item.productChannelCode"
                                :value="item.productPackageCode">
                            </el-option>
                        </el-select>
                        <el-select v-model="channel_items.model_value" :disabled="multipleStatus"
                                   :placeholder="channel_items.placeHolder" class="con_select unBorderRadius"
                                   @change="select('4',channel_items.model_value)">
                            <el-option
                                v-for="item in channel_items.options"
                                :key="item.channelProductCode"
                                :label="item.channelName"
                                :value="item.channelProductCode">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="sql">查询</el-button>
                        <el-button class="page_d_s_button" style="float:right;" @click="mulDelete">删除</el-button>
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
                            :key="c.prop"
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
                            label="调账激活"
                            min-width="150"
                            v-if="activationVisible"
                            class-name="exitInput">
                            <template slot-scope="scope">
                                <div v-if="scope.row.dataTime!='总计'">
                                    <el-input type="number" class="" placeholder="" :value="scope.row.adjustmentAct"
                                              @change="scope.row.zip=changeInput($event)"></el-input>
                                    <i class="el-icon-upload2" @click="exitInput(scope.row.id,scope.row.zip)"></i></div>
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
                            min-width="100"
                            v-if="c.visible">
                        </el-table-column>
                        <!--<el-table-column-->
                        <!--fixed="right"-->
                        <!--label="操作"-->
                        <!--min-width="80"-->
                        <!--class-name="exitBut">-->
                        <!--<template slot-scope="scope">-->
                        <!--<div @click.stop="deleteBill(scope.row.id)" v-if="scope.row.dataTime!='总计'"><span class="r_span">删除</span></div>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            label="操作"
                            fixed="right"
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
                proModelValue: [],
                fileList: [],
                loading: false,
                multipleStatus: false,
                visibleMenuSelectStatus: false,
                activationVisible: false,
                importTitleStatus: false,
                importTitleTxt: '',
                checkedCities: ['日期', '产品名称', '上游渠道号', '产品包渠道代码', '预估激活', '结算激活', '留存率', '渠道名称', '客户名称'],
                cities: ['日期', '产品名称', '上游渠道号','康远渠道号', '产品包渠道代码', '预估激活', '结算激活', '调账激活', '留存率', '数据属性', '渠道名称', '客户名称', '客户ID'],
                citiesFilterVal: ['dataTime', 'productName', 'productChannelCode','kyChannelName', 'channelProductCode', 'expectedAct', 'settlementAct', 'adjustmentAct', 'retention', 'dataType', 'channelName', 'customerName', 'id'],
                table_column: [
                    {fixed: true, prop: 'dataTime', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'id', label: '客户ID', sortable: false, visible: false},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true,width:280},
                    {fixed: false, prop: 'kyChannelName', label: '康远渠道号', sortable: false, visible: false,width:200},
//                    {fixed: false, prop: 'channelProductCode', label: '产品包渠道代码', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'channelName', label: '渠道名称', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'expectedAct', label: '预估激活', sortable: false, visible: true},
                    {fixed: false, prop: 'settlementAct', label: '结算激活', sortable: false, visible: true},
                ],
                table_column_: [
                    {
                        fixed: false,
                        prop: 'retention',
                        label: '留存率',
                        sortable: false,
                        visible: true,
                        format: function (row, col) {
                            if (row.dataTime != '总计') {
                                return row.retention + '%';
                            }
                            else {
                                return '';
                            }
                        }
                    },
                    {fixed: false, prop: 'dataType', label: '数据属性', sortable: false, visible: false},
                ],
                page: {
                    sizes: [100, 500, 1000, 5000],
                    offset: 1,
                    limit: 100,
                    count: 0,
                    currentPage: 1,
                },
                menu_nav: ['CPA数据管理', '实时数据'
                ],
                tableData: [],
                dateValue: '',
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
                channelPro_items: {
                    model_value: '',
                    placeHolder: '上游渠道号',
                    options: []
                },
                channel_items: {
                    model_value: '',
                    placeHolder: '渠道',
                    options: []
                },
                params: {
                    type: '',
                    val: '',
                    startDate: '',
                    endDate: '',
                },
                value: '',
                isSearch: false,
                checkAll: true,
                idList: [],
                isFirstEnter: false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.customerSelect();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;
            this.pageInfo();
        },
        created() {
            this.isFirstEnter = true;
        },
        methods: {
            customerSelect() {
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
                        this.proModelValue = [];
//                        this.customerProductCode.model_value = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            channelProInfo() {
                /*上游渠道号*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        type: 2,
                        code: this.proModelValue.join('|'),
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.channelPro_items.options = data.items;
                        this.channelPro_items.model_value = '';
//                        this.productChannelCode.model_value = '';
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            channelInfo() {
                /*投放渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelProSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        type: 4,
                        code: this.channelPro_items.model_value,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.channel_items.options = data.items;
                        this.channel_items.model_value = '';
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            select(type, val) {
                if (val != '') {
                    this.params.type = type;
                    this.params.val = val;
                    switch (type) {
                        case '1':
                            this.proInfo();
                            break;
                        case '2':
                            this.params.val = val.join('|');
                            if (val.length <= 1) {
                                this.multipleStatus = false;
                                this.channelProInfo();
                            } else {
                                this.multipleStatus = true;
                            }
                            break;
                        case '3':
                            this.channelInfo();
                            break;
                    }
                }
//                this.pageInfo();
            },
            //搜索
            search() {
                if (!this.params.startDate || !this.params.endDate) {
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                } else if (!this.value) {
                    this.$message({
                        type: 'info',
                        message: '请输入上游渠道号'
                    });
                } else {
                    this.isSearch = true;
                    this.pageInfo();
                }
            },
            //查询
            sql() {
                this.isSearch = false;
                this.pageInfo();
            },
            pageInfo() {
                this.loading = true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.realtimeSearch,
                    params: {
                        curPage: this.page.offset,
                        limit: this.page.limit,
                        type: this.isSearch ? '5' : this.params.type,
                        searchKey: this.isSearch ? this.value : this.params.val,
                        sDataTime: this.params.startDate,
                        eDataTime: this.params.endDate,
                    }
                }).then(res => {
//                    console.log(res);
                    this.loading = false;
                    if (res.status = 200) {
                        this.page.count = res.data.totalNums;
                        for (let row of res.data.list) {
                            row.validStatus = false;
                        }
                        this.tableData = res.data.list;
                        if (this.tableData.length > 0) {
                            this.tableData.unshift({
                                dataTime: '总计',
                                settlementAct: res.data.settlementActTotal,
                                validStatus: 'button'
                            });
                        }
                        this.checkAll = true;
                        this.idList = [];
                    }
                }).catch(err => {
                    this.loading = false;
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
                let flag=this.checkedCities.indexOf('调账激活');
                flag >= 0 ? this.activationVisible = true : this.activationVisible = false;
                const newArr = this.table_column.concat(this.table_column_);
                for (let item of newArr) {
                    var index = this.checkedCities.indexOf(item.label);
                    index >= 0 ? item.visible = true : item.visible = false;
                }
            },
            changeCheckStatus(e) {
                e.stopPropagation();
                this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
            },
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            changeInput(e) {
                return e;
            },
            exitInput(id, val) {
//                console.log(id);
                if (!val) {
                    this.$message({
                        type: 'info',
                        message: '您还没有修改调账激活'
                    });
                }
                this.$http({
                    method: 'put',
                    url: this.apiUrl.realtimeUpdateAct,
                    params: {
                        id: id,
                        act: val,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status = 200) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                }).catch(err => {

                });
            },
            exitImportTitle() {
                this.importTitleStatus = false;
                this.pageInfo();
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d');
            },
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
                let searchName = [this.params.startDate, this.params.endDate, this.value, '实时数据'];
                let sqlName = [this.params.startDate, this.params.endDate, this.customer_items.model_value, this.proModelValue.join('|'), this.channelPro_items.model_value, this.channel_items.model_value, '实时数据'];
                let fileName = (this.isSearch ? searchName : sqlName).join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            deleteBill(id) {
                this.$confirm('此操作将永久删除当前行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.realtimeDelete,
                        params: {id: id}
                    }).then(res => {
                        if (res.status == 200) {
                            if (res.data.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.pageInfo();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
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
            mulDelete() {
                this.idList = [];
                for (let item of this.tableData) {
                    item.validStatus && item.validStatus != 'button' ? this.idList.push(item.id) : null;
                }
                if (this.idList.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择需要删除的行'
                    });
                    return false;
                }
                this.$confirm('此操作将永久删除所选行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.realtimeBatch_del,
                        params: {ids: this.idList.join(',')}
                    }).then(res => {
                        console.log(res);
                        let list = [];
                        if (res.data)
                            list = res.data.list;
                        let html = '';
                        list.forEach((item, index) => {
                            html += `<p class="${item.status == 1 ? 'delSuc' : ''}"><span class="tipId">ID：${item.id}</span><span class="tipStatus">状态：${item.status == 1 ? "删除成功" : "删除失败"}</span><span class="tipMemo">备注：${item.msg}</span></p>`;
                        });
                        this.importTitleTxt = html;
                        this.importTitleStatus = true;
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
        }
    };
</script>
