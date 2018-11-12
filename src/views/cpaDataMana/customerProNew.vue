<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create customerProNew">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{pageTitle}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left cpa_page_left" :class="{page_d_con_left_widthAll:!isRightBox}">
                    <div class="banner_part_line page_create_set_line">产品信息</div>
                    <el-form ref="form" :model="pro_from" label-width="125px">
                        <el-form-item label="客户名称：">
                            <el-select v-model="pro_from.customerCode" filterable placeholder="请选择" class="f_select1"
                                       @change="cusSelect" :disabled="dateStatus" filterable>
                                <el-option
                                    v-for="(item,index) in customer_items.options "
                                    :key="item.customerCode"
                                    :label="item.name"
                                    :value="item.customerCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品名称：" style="height:auto;">
                            <el-radio-group v-model="proStatus" class="f_radio2 f_radio" :disabled="dateStatus">
                                <el-radio :label="0">新产品</el-radio>
                                <el-radio :label="1">选择已有产品</el-radio>
                            </el-radio-group>
                            <el-input v-model="pro_from.productName" placeholder="请输入产品名称"
                                      class="blockBox" v-if="proStatus==0" :disabled="dateStatus"></el-input>
                            <el-select v-model="pro_from.productCode" placeholder="请选择" class="f_select1 blockBox"
                                       @change="" v-if="proStatus==1" :disabled="dateStatus">
                                <el-option
                                    v-for="(item,index) in pro_items.options"
                                    :key="item.id"
                                    :label="item.productName"
                                    :value="item.customerProductCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业务类型：">
                            <el-select v-model="pro_from.cooperativeMode"
                                       :placeholder="cooperativeMode_items.placeHolder" class="f_select1"
                                       @change="">
                                <el-option
                                    v-for="(item,index) in cooperativeMode_items.options"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上游渠道号：">
                            <el-input v-model="pro_from.productChannelCode" class="" placeholder="请输入上游渠道号"></el-input>
                        </el-form-item>
                        <el-form-item label="康远渠道号：">
                            <el-input v-model.trim="pro_from.kyProductChannelCode" class="" placeholder="请输入康远渠道号"></el-input>
                        </el-form-item>
                        <el-form-item label="填充渠道包：" style="height:auto;">
                            <el-radio-group v-model="channelPackstatus" class="f_radio2 f_radio">
                                <el-radio :label="1">填充渠道链接</el-radio>
                                <el-radio :label="0">上传渠道包</el-radio>
                            </el-radio-group>
                            <el-input v-model="pro_from.packageLink" placeholder="请输入渠道链接"
                                      v-if="channelPackstatus=='1'" class="blockBox"></el-input>
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadApk"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :file-list="fileList"
                                v-if="channelPackstatus=='0'">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传apk文件，且不超过2MB</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="选择后台账号：">
                            <el-select v-model="pro_from.backendAccountId" placeholder="请选择" class="f_select1"
                                       @change="">
                                <el-option
                                    v-for="(item,index) in adminSysAccounts"
                                    :key="item.id"
                                    :label="item.account"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="接入价：" style="height:auto;">
                            <div v-for="(item,index) in pro_from.prices" :key="item.id" v-if="!item.deleted">
                                <div class="block">
                                    <el-date-picker
                                        v-model="item.date"
                                        type="date"
                                        placeholder="选择日期"
                                        @change="dateChange(index)">
                                    </el-date-picker>
                                </div>
                                <el-input v-model="item.price" class="el_input_short"
                                          placeholder="请输入接入价" @change="priceInputChange(index)"></el-input>
                                元
                                <span class="r_span" style="font-size:16px;" v-if="dateStatus" @click="deletePrice(index)">删除</span>
                                <span style="display:inline-block;margin-left:10px;color:red;" v-if="item.disexist">* 已存在</span>
                            </div>
                            <el-button @click="addRow">添加一行</el-button>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div><!--
				-->
                <div class="page_d_con_right cpa_page_right" v-if="isRightBox">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">操作历史记录</div>
                        <div class="current_img">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageTitle: '创建产品信息',
                menu_nav: ['CPA数据管理', '客户产品管理', '创建产品信息'],
                isRightBox: false,
                dateStatus: false,
                uploadButStatus: true,
                fileList: [],
                pro_from: {
                    backendAccountId: '',
                    cooperativeMode: '',
                    customerCode: '',
                    kyProductChannelCode: '',
                    packageLink: '',
                    prices: [{
                        date: '',
                        id: '',
                        disable: false,
                        disexist: false,
                        price: ''
                    },],
                    productChannelCode: '',
                    productCode: '',
                    productName: '',
                },
                channelPackstatus: 1,
                proStatus: 1,
                customer_items: {
                    placeHolder: '客户',
                    options: []
                },
                pro_items: {
                    placeHolder: '产品',
                    options: []
                },
                cooperativeMode_items: {
                    model_value: '',
                    placeHolder: '业务类型',
                    options: []
                },
                adminSysAccounts: [],
                customerId: '',
                customerCode: ''
            };
        },
        created() {
//            this.new_from.creatorID = sessionStorage.userId;
            this.customerSelect();
            this.businessModel();
            this.customerId = this.$route.query.customerId;
            if (this.customerId != '') {
                this.pageInfo();
                this.pageTitle = '编辑产品信息';
//                this.isRightBox = this.dateStatus = true;
                this.dateStatus = true;
            }
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
                        customerCode: this.pro_from.customerCode,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                        this.pro_from.productName = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            adminSysInfo() {
                var id;
                if (this.pro_from.customerID) {
                    id = this.pro_from.customerID;
                } else {
                    this.customer_items.options.forEach((item, i) => {
                        if (item.customerCode == this.pro_from.customerCode) {
                            id = item.id;
                        }
                    });
                }
                /*新建产品的客户后台账号列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerGet,
                    params: {
                        id: id,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.adminSysAccounts = data.adminSysAccounts;
                        this.adminSysAccounts.map((item, index) => {
                            if (item.account == '') {
                                this.adminSysAccounts.splice(index, 1);
                            }
                        });
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            businessModel() {
                /*业务类型*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListBiztype,
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.cooperativeMode_items.options = data.lists;
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
//                console.log(this.customerId);
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProGet,
                    params: {
                        id: this.customerId
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status = 200) {
                        this.pro_from = res.data;
                        this.pro_from.cooperativeMode == 0 ? this.pro_from.cooperativeMode = '' : null;
                    }
                }).catch(err => {

                });
            },
            cusSelect() {
                this.proInfo();
                this.adminSysInfo();
                if (this.customerId == '') {
                    this.pro_from.productCode = this.pro_from.backendAccountId = '';
                }
            },
            onSubmit() {
                delete this.pro_from.adminSysAccounts;
//                this.pro_from.cooperativeMode=parseInt(this.pro_from.cooperativeMode);
                if (this.customerId == '' && this.proStatus == 0) {
                    delete this.pro_from.productCode;
                } else if (this.customerId == '' && this.proStatus == 1) {
                    delete this.pro_from.productName;
                }
                var pricesArr = this.pro_from.prices;
                var pricesLen = pricesArr.length;
                let isexist=false;//判断是否有重复的接入价
                if(this.customerId != ''&&this.customerId){
                    for (let i = 0; i < pricesLen; i++) {
                        if ((pricesArr[i].date == '' || pricesArr[i].price == ''||!pricesArr[i].date)&&!pricesArr[i].deleted){
                            this.$message({
                                type: 'info',
                                message: '接入价不能为空，请修改并重新提交'
                            });
                            return false;
                        }
                        if(pricesArr[i].disexist){
                            isexist=true;
                        }
                    }
                }else{
                    for (let i = 0; i < pricesLen; i++) {
                        if (pricesArr[i].date == '' || pricesArr[i].price == ''||!pricesArr[i].date) {
                            pricesArr.splice(i, 1);
                            i--;
                            pricesLen = pricesArr.length;
                        }else if(pricesArr[i].disexist){
                            isexist=true;
                        }
                    }
                }
                if(isexist){
                    this.$message({
                        type: 'info',
                        message: '存在重复的接入价，请修改或删除并重新提交'
                    });
                    return false;
                }
                if (pricesLen == 0) {
                    this.addRow();
                }
                var url = this.apiUrl.customerProNew;
                this.customerId != '' ? url = this.apiUrl.customerProUpdate : null;
                console.log(this.pro_from);
//                return false;
                this.$http({
                    method: 'post',
                    url: url,
                    data: this.pro_from,
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.id >= 0) {
                            if (data.status == 2) {
                                this.$message({
                                    type: 'info',
                                    message: data.msg
                                });
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.go_back();
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败，请完善信息，并重新提交'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '请完善信息，并重新提交'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
            handleRemove(file, fileList) {
                this.uploadButStatus = true;
                this.fileList = [];
                this.pro_from.packageLink = '';
            },
            handleSuccess(response, file, fileList) {
//                console.log(file);
                this.fileList.push({
                    name: file.name,
                    url: response.url
                });
                if (response.status == 1) {
                    this.pro_from.packageLink = response.url;
                    this.uploadButStatus = false;
                }
            },
            // 上传错误
            uploadError(response, file, fileList) {
                this.$message({
                    type: 'error',
                    message: '上传失败，请重试'
                });
            },
            // 上传前对文件的大小的判断
            beforeAvatarUpload(file) {
                if (!this.uploadButStatus) {
                    this.$message({
                        type: 'info',
                        message: '只能上传一个包，您可删除已选，重新上传'
                    });
                    return false;
                }
                if (this.fileList.length >= 1) {
                    return false;
                }
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                const extension = fileName[fileNameLen] === 'apk';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!extension) {
                    this.$message({
                        type: 'info',
                        message: '上传渠道包只能是 apk 格式'
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
            dateChange(index) {
                var date = this.pro_from.prices[index].date || '';
                if (date != '' && date != 'undefined' && typeof date != 'undefined') {
                    this.pro_from.prices[index].date = this.formatDateTime(new Date(date), 'y-m-d');
                } else {
                    this.pro_from.prices[index].date = '';
                }
                this.priceInputChange(index);
            },
            addRow() {
                this.pro_from.prices.push({
                    'date': '',
                    'disable': false,
                    'disexist': false,
                    'deleted': false,
                    'price': ''
                });
            },
            deletePrice(index){
                var pricesArr = this.pro_from.prices;
                var pricesLen = pricesArr.length;
                let isexist=false;//判断是否有重复的接入价
                if(this.customerId != ''&&this.customerId){
                    for (let i = 0; i < pricesLen; i++) {
                        if(pricesArr[i].disexist){
                            isexist=true;
                        }
                    }
                }
                if(isexist){
                    this.$message({
                        type: 'info',
                        message: '存在重复的接入价，请修改后再进行删除'
                    });
                    return false;
                }
                this.pro_from.prices[index].deleted=true;
                this.pro_from.prices[index].disexist=false;
            },
            priceInputChange(index){
                let priceArr=this.pro_from.prices;
                let obj=this.pro_from.prices[index];
                if(obj.price&&obj.date){
                    try{
                        priceArr.forEach((item,i)=>{
                            if(i!=index&&item.date==obj.date&&item.price&&!item.deleted){
                                obj.disexist=true;
                                foreach.break=new Error("StopIteration");
                            }else if(i!=index&&item.date!=obj.date&&item.price&&!item.deleted){
                                obj.disexist=false;
                            }
                        });
                    }catch (e){
//                        console.log(e.message);
                        if(e.message==="foreach is not defined") {
//                            console.log("跳出来了?");
                            return;
                        }else throw e;
                    }
                }else{
                    priceArr.forEach((item,i)=>{
                        if(item.disexist&&item.date&&item.price){
                            let flag=true;
//                            console.log(item);
                            priceArr.forEach((c,x)=>{
                                if(i!=x&&item.date==c.date&&c.price){
                                    flag=false;
                                }
                            });
//                            console.log(flag);
                            flag?item.disexist=false:null;
                        }else{
                            item.disexist=false;
                        }
                    });
                }
            },
        }
    };
</script>
