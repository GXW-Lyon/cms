<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create channelProNew">
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
                    <el-form ref="form" :model="channelPro_from" label-width="125px">
                        <el-form-item label="客户名称：">
                            <el-select v-model="channelPro_from.customerCode" filterable placeholder="请选择"
                                       class="f_select1"
                                       @change="cusSelect" :disabled="dateStatus">
                                <el-option
                                    v-for="(item,index) in customer_items.options "
                                    :key="item.customerCode"
                                    :label="item.name"
                                    :value="item.customerCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品名称：">
                            <el-select v-model="channelPro_from.productCode" placeholder="请选择" class="f_select1"
                                       @change="proSelect" :disabled="dateStatus">
                                <el-option
                                    v-for="(item,index) in pro_items.options"
                                    :key="item.id"
                                    :label="item.productName"
                                    :value="item.customerProductCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上游渠道号：">
                            <el-select v-model="channelPro_from.customerProductCode" placeholder="请选择" class="f_select1"
                                       @change="" :disabled="dateStatus" filterable>
                                <el-option
                                    v-for="(item,index) in channelPro_items.options"
                                    :key="item.productPackageCode"
                                    :label="item.productChannelCode "
                                    :value="item.productPackageCode"
                                    :disabled="item.packageStatus==1">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="投放渠道：">
                            <el-select v-model="channelPro_from.channelCode" placeholder="请选择" class="f_select1"
                                       :disabled="dateStatus" filterable>
                                <el-option
                                    v-for="(item,index) in channel_items.options"
                                    :key="item.channelCode"
                                    :label="item.channelCode+' '+item.name"
                                    :value="item.channelCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="渠道价：" style="height:auto;">
                            <div v-for="(item,index) in channelPro_from.channelPrices" :key="item.id" v-if="!item.deleted">
                                <el-date-picker
                                    v-model="item.date"
                                    type="date"
                                    placeholder="选择日期"
                                    :disabled="false"
                                    @change="dateChange('channelPrices',index)">
                                </el-date-picker>
                                <el-input v-model="item.price" :disabled="false" class="el_input_short"
                                          placeholder="请输入渠道价" @change="priceInputChange(index)"></el-input>
                                元
                                <span class="r_span" style="font-size:16px;" v-if="dateStatus" @click="deletePrice(index)">删除</span>
                                <span style="display:inline-block;margin-left:10px;color:red;" v-if="item.disexist">* 已存在</span>
                            </div>
                            <el-button @click="addPrice">添加一行</el-button>
                        </el-form-item>
                        <div v-for="(item,index) in channelPro_from.channelStatus" :key="item.id" v-if="!item.deleted">
                            <el-form-item style="height:auto;display: inline-block;" label="上线时间:">
                                <div>
                                    <el-date-picker
                                        v-model="item.onLineDate"
                                        type="date"
                                        placeholder="选择日期"
                                        :disabled="item.disable"
                                        @change="channelStatusDateChange('onLineDate',index)">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item style="height:auto;display: inline-block;" label="下线时间:">
                                <div>
                                    <el-date-picker
                                        v-model="item.offLineDate"
                                        type="date"
                                        placeholder="选择日期"
                                        :disabled="item.disable"
                                        @change="channelStatusDateChange('offLineDate',index)">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <span class="r_span" style="font-size:16px;" v-if="dateStatus" @click="deleteStatus(index)">删除</span>
                        </div>
                        <el-button @click="addStatus" style="margin:0 0 6px 125px;">添加一行</el-button>
                        <el-form-item label="是否封包：">
                            <el-radio-group v-model="channelPro_from.status" class="f_radio2 f_radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
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
                pageTitle: '创建产品信息',
                menu_nav: ['CPA数据管理', '渠道产品管理', '创建产品信息'],
                isRightBox: false,
                dateStatus: false,
                importTitleStatus: false,
                importTitleTxt: '',
                channelPro_from: {
                    'channelCode': '',
                    'status': 0,
                    'channelPrices': [
                        {
                            'date': '',
                            'deleted': false,
                            'disable': false,
                            'disexist': false,
                            'price': ''
                        },
                    ],
                    'customerProductCode': '',
                    'channelStatus': [
                        {
                            'onLineDate': '',
                            'offLineDate': '',
                            'deleted': false,
                            'disable': false
                        },
                    ],
                    'customerCode': '',
                    'productCode': ''
                },
                lineDate:[],
                customer_items: {
                    placeHolder: '客户',
                    options: []
                },
                pro_items: {
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
                options: {
                    product: [
                        {
                            id: '',
                            val: ''
                        }
                    ],
                },
                value3: '目前该时间点为上线状态',
                channelProductId: '',
            };
        },
        created() {
//            this.channelPro_from.creatorID = sessionStorage.userId;
//            this.pageInfo();
            this.customerSelect();
            this.channelProductId = this.$route.query.channelProductId;
            if (this.channelProductId != '') {
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
                /*投放渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
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
            proInfo() {
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.customerProListLight,
                    params: {
                        customerCode: this.channelPro_from.customerCode,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.pro_items.options = data.items;
                        this.channelProductId != '' ? null : this.channelPro_from.productCode = '';
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelProGet,
                    params: {
                        id: this.channelProductId
                    }
                }).then(res => {
                    if (res.status = 200) {
                        this.channelPro_from = res.data;
                        this.channelPro_from.channelStatus.forEach(item=>{
                            item.isValueChange=false;
                            this.lineDate.push({
                                onLineDate:item.onLineDate,
                                offLineDate:item.offLineDate
                            });
                        });
                        this.channelPro_from.status=parseInt(this.channelPro_from.status);
                    }
                }).catch(err => {

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
                        code: this.channelPro_from.productCode,
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.channelPro_items.options = data.items;
                        this.channelProductId != '' ? null : this.channelPro_from.customerProductCode = '';
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            cusSelect() {
                this.proInfo();
            },
            proSelect() {
                this.channelProInfo();
            },
            onSubmit() {
                var pricesArr = this.channelPro_from.channelPrices;
                var pricesLen = pricesArr.length;
                let isexist=false;//判断是否有重复的渠道价
                if(this.channelProductId != ''&&this.channelProductId){
                    for (let i = 0; i < pricesLen; i++) {
                        if ((pricesArr[i].date == '' || pricesArr[i].price == ''||!pricesArr[i].date)&&!pricesArr[i].deleted){
                            this.$message({
                                type: 'info',
                                message: '渠道价不能为空，请修改并重新提交'
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
                    if (pricesLen == 0) {
                        this.addPrice();
                    }
                }
                if(isexist){
                    this.$message({
                        type: 'info',
                        message: '存在重复的渠道价，请修改或删除并重新提交'
                    });
                    return false;
                }
//                this.channelPro_from.channelStatus.forEach((item,index)=>{
//                    item.onLineDate=item.onLineDate||'1970-01-01';
//                    item.offLineDate=item.offLineDate||'9999-12-31';
//                });
                let cStatus=this.channelPro_from.channelStatus;
                let cLen=cStatus.length;
                while(cLen--){
                    if(!cStatus[cLen].onLineDate&&!cStatus[cLen].offLineDate){
                        cStatus.splice(cLen,1);
                    }else{
                        cStatus[cLen].onLineDate=cStatus[cLen].onLineDate||'1970-01-01';
                        cStatus[cLen].offLineDate=cStatus[cLen].offLineDate||'9999-12-31';
                        if(cStatus[cLen].onLineDate>=cStatus[cLen].offLineDate&&!cStatus[cLen].deleted){
                            this.$message({
                                type: 'info',
                                message: '上线时间不能大于或等于下线时间，请修改并重新提交'
                            });
                            return false;
                        }
                    }
                }
                cLen=cStatus.length;
                if(cLen==0){
                    this.addStatus();
                    this.$message({
                        type: 'info',
                        message: '上下线时间不能为空，请修改并重新提交'
                    });
                    return false;
                }
//                console.log(this.channelPro_from);
//                return false;
                var url = this.apiUrl.channelProNew;
                if (this.channelProductId != '') {
                    url = this.apiUrl.channelProUpdate;
                }
                for(let key in this.channelPro_from){
                    if(key!='channelPrices'&&key!='status'&&this.channelPro_from[key]==''){
                        this.$message({
                            type: 'info',
                            message: '名称、渠道号、渠道为空或数据异常，请重新选择并提交'
                        });
                        return false;
                    }
                }
                this.$http({
                    method: 'post',
                    url: url,
                    data: this.channelPro_from,
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 2||data.status < 0) {
                            this.importTitleTxt=data.msg.replace(/\|/g,'<br>');
                            this.importTitleStatus=true;
                        } else{
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                            this.go_back();
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败，请完善信息，并重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请完善信息，并重新提交'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
            deletePrice(index){
                var pricesArr = this.channelPro_from.channelPrices;
                var pricesLen = pricesArr.length;
                let isexist=false;//判断是否有重复的接入价
                if(this.channelProductId != ''&&this.channelProductId){
                    for (let i = 0; i < pricesLen; i++) {
                        if(pricesArr[i].disexist){
                            isexist=true;
                        }
                    }
                }
                if(isexist){
                    this.$message({
                        type: 'info',
                        message: '存在重复的渠道价，请修改后再进行删除'
                    });
                    return false;
                }
                this.channelPro_from.channelPrices[index].deleted=true;
                this.channelPro_from.channelPrices[index].disexist=false;
            },
            deleteStatus(index){
                this.channelPro_from.channelStatus[index].deleted=true;
            },
            addPrice() {
                this.channelPro_from.channelPrices.push({
                    'date': '',
                    'deleted': false,
                    'disable': false,
                    'disexist': false,
                    'price': ''
                });
            },
            addStatus() {
                this.channelPro_from.channelStatus.push({
                    'onLineDate': '',
                    'offLineDate': '',
                    'deleted': false,
                    'disable': false,
                    'isValueChange': false
                });
                this.lineDate.push({
                    onLineDate:'',
                    offLineDate:''
                });
            },
            dateChange(str, index) {
                var date = this.channelPro_from[str][index].date || '';
                if (date != '' && date != 'undefined' && typeof date != 'undefined' && date) {
                    this.channelPro_from[str][index].date = this.formatDateTime(new Date(date), 'y-m-d');
                } else {
                    this.channelPro_from[str][index].date = '';
                }
                if(str=='channelPrices'){
                    this.priceInputChange(index);
                }
            },
            channelStatusDateChange(str,index){
                var date = this.channelPro_from.channelStatus[index][str] || '';
                if (date != '' && date != 'undefined' && typeof date != 'undefined' && date) {
                    this.channelPro_from.channelStatus[index][str] = this.formatDateTime(new Date(date), 'y-m-d');
                } else {
                    this.channelPro_from.channelStatus[index][str] = '';
                }
                if(this.dateStatus)
                    this.lineDateChange(index);
            },
            lineDateChange(index){
                let oldDate=this.lineDate[index];
                let newDate=this.channelPro_from.channelStatus[index];
                if(oldDate.onLineDate==newDate.onLineDate&&oldDate.offLineDate==newDate.offLineDate){
                    newDate.isValueChange=false;
                }else{
                    newDate.isValueChange=true;
                }
            },
            priceInputChange(index){
                let priceArr=this.channelPro_from.channelPrices;
                let obj=this.channelPro_from.channelPrices[index];
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
            exitImportTitle() {
                this.importTitleStatus = false;
            },
        }
    };
</script>
