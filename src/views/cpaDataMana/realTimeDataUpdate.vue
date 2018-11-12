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
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                        <div class="dateBut">
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
                        <el-button class="page_d_s_button" @click="pageInfo">刷新</el-button>
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
                <div class="tabs">
                    <template>
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="待刷新数据" name="updatedRealtimeDatas"><el-button class="page_d_s_button" @click="modify" style="float: right;">确认修改</el-button></el-tab-pane>
                            <el-tab-pane label="已参与结算" name="billedRealtimeDatas"></el-tab-pane>
                            <el-tab-pane label="渠道时间冲突" name="errorRealtimeDatas"></el-tab-pane>
                        </el-tabs>
                    </template>
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
                            fixed="right"
                            v-if="activeName=='updatedRealtimeDatas'"
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
                loading: false,
                multipleStatus: false,
                visibleMenuSelectStatus: false,
                importTitleStatus: false,
                importTitleTxt: '',
                checkAll: true,
                checkedCities: ['日期', '客户名称', '产品名称', '原渠道名称', '新渠道名称', '上游渠道号', '结算激活'],
                cities: ['日期', '客户名称', '产品名称', '原渠道名称', '新渠道名称', '上游渠道号', '预估激活', '结算激活', '留存率', '详情'],
                citiesFilterVal: ['dataTime', 'customerName', 'productName', 'channelName','newChannelName', 'productChannelCode', 'expectedAct', 'settlementAct', 'retention', 'desc'],
                table_column: [
                    {fixed: true, prop: 'dataTime', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'customerName', label: '客户名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productName', label: '产品名称', sortable: false, visible: true},
                    {fixed: false, prop: 'productChannelCode', label: '上游渠道号', sortable: false, visible: true,width:280},
                    {fixed: false, prop: 'channelName', label: '原渠道名称', sortable: false, visible: true},
                    {fixed: false, prop: 'newChannelName', label: '新渠道名称', sortable: false, visible: true},
//                    {fixed: false, prop: 'channelProductCode', label: '产品包渠道代码', sortable: false, visible: true,width:150},
                    {fixed: false, prop: 'expectedAct', label: '预估激活', sortable: false, visible: false},
                    {fixed: false, prop: 'settlementAct', label: '结算激活', sortable: false, visible: true},
                    {
                        fixed: false,
                        prop: 'retention',
                        label: '留存率',
                        sortable: false,
                        visible: false,
                        format: function (row, col) {
                            if (row.validStatus != 'button') {
                                return row.retention + '%';
                            }
                            else {
                                return '';
                            }
                        }
                    },
                    {fixed: false, prop: 'desc', label: '详情', sortable: false, visible: false},
                ],
                menu_nav: ['CPA数据管理', '实时数据刷新'
                ],
                tableData: [],
                tableDataObj: {},
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
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                activeName:'updatedRealtimeDatas',
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
                if(val!=''){
                    this.params.type = type;
                    this.params.val = val;
                    switch (type) {
                        case '1':
                            this.proInfo();
                            break;
                        case '2':
                            this.params.val=val.join('|');
                            if(val.length<=1){
                                this.multipleStatus=false;
                                this.channelProInfo();
                            }else{
                                this.multipleStatus=true;
                            }
                            break;
                        case '3':
                            this.channelInfo();
                            break;
                    }
                }
//                this.pageInfo();
            },
            pageInfo() {
                if(this.params.startDate==''||this.params.endDate==''){
                    this.$message({
                        type: 'info',
                        message: '请选择时间'
                    });
                    return false;
                }else if(this.customer_items.model_value==''){
                    this.$message({
                        type: 'info',
                        message: '请选择客户'
                    });
                    return false;
                }else if(this.proModelValue.length==0){
                    this.$message({
                        type: 'info',
                        message: '请选择产品'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.realtimeRefresh,
                    params: {
                        type: this.params.type,
                        searchKey: this.params.val,
                        sDataTime: this.params.startDate,
                        eDataTime: this.params.endDate,
                    }
                }).then(res => {
                    console.log(res);
                    this.loading=false;
                    if (res.status = 200) {
                        this.checkAll = true;
                        let data=res.data;
                        if(this.activeName=='updatedRealtimeDatas'){
//                            for (let row of data.updatedRealtimeDatas) {
//                                row.validStatus = false;
//                            }
                            if(data.updatedRealtimeDatas.length>0){
                                data.updatedRealtimeDatas.unshift({validStatus: 'button'});
                            }
                        }
                        this.tableDataObj = data;
                        this.tableData = data[this.activeName];
                    }
                }).catch(err => {
                    this.loading=false;
                });
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            changeInput(e) {
                return e;
            },
            exitImportTitle() {
                this.importTitleStatus = false;
                this.pageInfo();
            },
            dateChange() {
                this.params.startDate = this.formatDateTime(this.dateValue[0], 'y-m-d');
                this.params.endDate = this.formatDateTime(this.dateValue[1], 'y-m-d');
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
            importData() {
                if (this.tableData.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '无可导出数据'
                    });
                    return false;
                }
                console.log(this.tableData);
                let tHeader = this.cities;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileName = [this.params.startDate,this.params.endDate, this.customer_items.model_value, this.proModelValue.join('|'),this.channelPro_items.model_value, this.channel_items.model_value,this.activeName, '实时数据刷新'].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            handleClick(tab, event) {
                if(this.activeName=='updatedRealtimeDatas'){
                    this.checkedCities.push('新渠道名称');
                }else{
                    let index=this.checkedCities.indexOf('新渠道名称');
                    if(index>-1){
                        this.checkedCities.splice(index,1);
                    }
                }
                this.checkedChange();
                this.tableData = this.tableDataObj[this.activeName]||[];
            },
            modify(){
                this.idList = [];
                for (let item of this.tableData) {
                    item.validStatus && item.validStatus != 'button' ? this.idList.push({id:item.id,channelInfo:item.newChannelName}) : null;
                }
                console.log( this.idList );
                if(this.idList.length==0){
                    this.$message({
                        type: 'info',
                        message: '请选择待刷新数据'
                    });
                    return false;
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.realtimeUpdateChannel,
                    data: {
                        list:this.idList
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        if(res.data.status=='2'){
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '修改失败'
                            });
                        }
                    }
                }).catch(err => {

                });
            },
        }
    };
</script>
