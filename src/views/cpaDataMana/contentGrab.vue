<style rel="stylesheet/scss" lang="scss">
    .el-table .cell{word-wrap: inherit!important;}

</style>

<template>
    <div>
        <div class="info_flow_content customerCollect" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search" style="height:auto!important;">
                <div class="info_a_s_content" style="padding: 27px 5%;">
                    <div class="dateSelect">
                        <div class="block" style="width: 100%!important;position:relative;">
                            <span class="demonstration">选择日期</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="date"
                                placeholder="选择日期"
                                @change="dateChange">
                            </el-date-picker>
                            <el-select v-model="account_items.model_value"
                                       :placeholder="account_items.placeHolder"
                                       class="con_select unBorderRadius selectMaxWidth"
                                       filterable @change="getCookie">
                                <el-option
                                    v-for="item in account_items.options"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select><!--
                            --><div class="randImg" v-if="randImgSrc" v-html="randImgSrc"></div><!--
                            --><el-input v-if="randImgSrc" v-model="randValue" placeholder="输入验证码" class="el_input_short"></el-input>
                            <el-button @click.stop="pageInfo" class="page_d_s_button" style="position:absolute;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);right:120px;">抓取
                            </el-button><!--
					  -->
                            <el-button class="page_d_s_button" @click.stop="importData" style="position:absolute;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);right:10px;">导出当前数据</el-button>
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
                            width=""
                            v-if="c.visible">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                randImgSrc:'',
                randValue:'',
                cookie:'',
                checked: true,
                loading: false,
                visibleMenuSelectStatus: false,
                checkedCities: ['账号', '日期', '渠道号', '应用名称', '激活数', '留存率', '失败原因'],
                cities: ['账号', '日期', '渠道号', '应用名称', '激活数', '留存率', '失败原因'],
                citiesFilterVal: ['account', 'date', 'channel', 'appName', 'jihuo', 'liucun', 'failReason'],
                table_column: [
                    {fixed: false, prop: 'account', label: '账号', sortable: false, visible: true},
                    {fixed: false, prop: 'date', label: '日期', sortable: true, visible: true},
                    {fixed: false, prop: 'channel', label: '渠道号', sortable: false, visible: true},
                    {fixed: false, prop: 'appName', label: '应用名称', sortable: false, visible: true},
                    {fixed: false, prop: 'jihuo', label: '激活数', sortable: false, visible: true},
                    {fixed: false, prop: 'liucun', label: '留存率', sortable: false, visible: true},
                    {fixed: false, prop: 'failReason', label: '失败原因', sortable: false, visible: true},
                ],
                menu_nav: ['CPA数据管理', '内容抓取'],
                account_items: {
                    model_value: '',
                    placeHolder: '账号',
                    options: ['kydsp','kydsp_dy','kydsp_hs','2345-ky','aliyun_ky','2345-dsp',]
                },
                tableData: [],
                dateValue: new Date(new Date().getTime()-1*24*60*60*1000),
                params: {
                    type: '2',
                    val: '',
                    date:'',
                },
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        activated() {
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.dateChange();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;
        },
        created() {
            this.isFirstEnter=true;
        },
        methods: {
            /*获取cookie*/
            getCookie(){
                this.randValue='';
                if(this.account_items.model_value!=''){
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.importdataGetCookie,
                    }).then(res => {
//                    console.log(res);
                        if (res.status == 200) {
                            this.cookie=res.data;
                            this.getRnd();
                        }
                    }).catch(err => {

                    });
                }
            },
            /*获取验证码*/
            getRnd(){
                this.$http({
                    method: 'get',
                    url: this.apiUrl.get_captcha,
                    params:{
                        cookie: this.cookie,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.randImgSrc=res.data;
                    }
                }).catch(err => {
                });
            },
            pageInfo() {
                if(this.loading){
                    this.$message({
                        type: 'info',
                        message: '正在抓取数据中，请稍后再试'
                    });
                    return false;
                }
                if(this.params.date==''){
                    this.$message({
                        type: 'info',
                        message: '请选择日期'
                    });
                    return false;
                }else if(this.account_items.model_value==''){
                    this.$message({
                        type: 'info',
                        message: '请选择账户'
                    });
                    return false;
                }else if(this.randValue==''){
                    this.$message({
                        type: 'info',
                        message: '请输入验证码'
                    });
                    return false;
                }
                this.loading=true;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.importdataStartFetch,
                    params: {
                        captcha: this.randValue,
                        username: this.account_items.model_value,
                        cookie: this.cookie,
                        date: this.params.date,
                    }
                }).then(res => {
                    this.loading=false;
//                    console.log(res);
                    if (res.status == 200) {
                        let data=res.data;
                        if(data.status=='1'){
                            this.$message({
                                type: 'info',
                                message: '全部抓取成功'
                            });
                            this.tableData=[];
                        }else if(data.status=='2'){
                            let obj = eval ("(" + data.msg+ ")");
                            obj.forEach((item,i)=>{
                                item.account=this.account_items.model_value;
                            });
                            this.tableData = obj;
                        }else{
                            this.$message({
                                type: 'error',
                                message: data.msg
                            });
                            this.account_items.model_value='';
                            this.tableData=[];
                        }
                    }
                }).catch(err => {
                    this.loading=false;
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
            bodyEvent() {
                this.visibleMenuSelectStatus = false;
            },
            preventDefault(e) {
                e.stopPropagation();
            },
            importData() {
                if (this.tableData.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请抓取数据'
                    });
                    return false;
                }
                let tHeader = this.cities;
                let filterVal = this.citiesFilterVal;
                let importData = this.tableData;
                let fileName = [this.account_items.model_value,].join('_');
                this.handleDownload(tHeader, filterVal, importData, fileName);
            },
            dateChange() {
                this.account_items.model_value=this.randValue='';
                if (this.dateValue != '' && typeof this.dateValue != 'undefined') {
                    this.params.date = this.formatDateTime(this.dateValue, 'y-m-d');
                } else {
                    this.params.date = '';
                }
            },
        }
    };
</script>
