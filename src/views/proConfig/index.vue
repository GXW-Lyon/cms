<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create">
            <div class="page_d_title">
                <i></i><span>产品管理</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left page_d_con_left_widthAll">
                    <el-form ref="form" :model="profrom" label-width="125px">
                        <el-form-item label="产品名称：" style="height:auto;">
                            <el-select v-model="profrom.productID" placeholder="请选择" class="f_select1"
                                       @change="selectProduct" v-show="profrom.proStatus==0" filterable>
                                <el-option
                                    v-for="(item,index) in options.product"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-input v-model="profrom.productName" class="f_input2" v-show="profrom.proStatus==1"></el-input>
                            <el-radio-group v-model="profrom.proStatus" class="f_radio3 f_radio">
                                <el-radio :label="1">新建产品</el-radio>
                                <el-radio :label="0">选择已有产品</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="产品包：" v-show="profrom.proStatus==0" style="height:auto;">
                            <el-select v-model="profrom.proApk" placeholder="请选择" class="f_select1"
                                       value-key="val" v-show="profrom.proApkStatus!=0">
                                <el-option
                                    v-for="(item,index) in options.productApks"
                                    :key="index"
                                    :label="item.key"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="profrom.proApkStatus" class="f_radio3 f_radio">
                                <el-radio :label="0">新建</el-radio>
                                <el-radio :label="1">编辑</el-radio>
                                <el-radio :label="2">删除</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="包名：" v-show="profrom.proApkStatus==1&&profrom.proStatus==0">
                            <el-input v-model="profrom.proApk.key" class="f_input2"></el-input>
                        </el-form-item>
                        <el-form-item label="包链接：" v-show="profrom.proApkStatus==1&&profrom.proStatus==0">
                            <el-input v-model="profrom.proApk.val" class="f_input2"></el-input>
                        </el-form-item>
                        <el-form-item label="添加包：" style="height:auto!important;" v-show="profrom.proApkStatus==0||profrom.proStatus==1">
                            <el-input type="textarea" class="f_textarea" v-model="profrom.notes" style="width:85%!important;" placeholder="包名@#@包链接 的形式录入，多个请回车"></el-input>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                profrom: {
                    proStatus: 0,
                    proApkStatus: 1,
                    productID: '',
                    productName: '',
                    proApk: '',
                    notes: '',
                },
                options: {
                    productApks: [
                    ],
                    product: [
                        {
                            id: '',
                            val: ''
                        }
                    ],
                    butText: [
                        {
                            id: '打开',
                            val: '打开'
                        }, {
                            id: '下载',
                            val: '下载'
                        }
                    ],
                },
                domain:'',
            };
        },
        created() {
            this.pageInfo();
        },
        methods: {
            pageInfo() {
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '3'}
                }).then(res => {
                    var data = res.data;
//                    console.log(data);
                    if (data.status == 1) {
                        this.options.product = data.list;
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            selectProduct() {
                /*产品包信息*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.productAttriUrl,
                    params: {id: this.profrom.productID},
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.domain = res.data.domain;
                        this.options.productApks = res.data.apks;
                        this.profrom.proApk.key=this.profrom.proApk.val='';
                    } else {
//                        alert('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            apkFormat(str){
                let strArr=str.split('\n');
                let apks=[];
                for(let i in strArr){
                    let newArr=strArr[i].split('@#@');
                    apks.push({
                        key:newArr[0],
                        val:newArr[1]
                    });
                }
                return apks;
            },
            onSubmit() {
                var params={productAttrJSON:{}};
                if(this.profrom.proStatus==0&&this.profrom.productID!=''){
                    params.id=this.profrom.productID;
                    params.productAttrJSON.domain=this.domain;
                    params.productAttrJSON.apks=this.options.productApks;
                    if(this.profrom.proApkStatus==0) {
                        this.profrom.notes != '' ? params.productAttrJSON.apks.push.apply(params.productAttrJSON.apks,this.apkFormat(this.profrom.notes)): null;
                    }else if(this.profrom.proApkStatus==2){
                        params.productAttrJSON.apks.forEach((obj, i) => {
                            this.profrom.proApk==obj?params.productAttrJSON.apks.splice(i, 1):null;
                        });
                    }
                }else if(this.profrom.proStatus==1&&this.profrom.productName!=''){
                    params.id=0;
                    params.name=this.profrom.productName;
                    params.productAttrJSON.apks=this.apkFormat(this.profrom.notes);
                }else{
                    this.$message({
                        type: 'info',
                        message: '产品不能为空'
                    });
                    return false;
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.productAttriUrl,
                    data: params,
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        var data=res.data;
                        this.pageInfo();
                        this.profrom.productID=data.id;
                        this.selectProduct();
                        this.profrom.proStatus=0;
                        this.profrom.proApkStatus=1;
                        this.profrom.notes=this.profrom.proApk='';
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    });
                });
            },
            go_back() {
                this.$router.back();
            }
        }
    };
</script>
