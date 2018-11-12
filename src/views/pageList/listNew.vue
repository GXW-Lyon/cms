<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create">
            <div class="page_d_title">
                <i></i><span>新建落地页</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="new_from" label-width="125px">
                        <el-form-item label="投放平台：">
                            <el-select v-model="new_from.platform" placeholder="请选择" class="f_select1">
                                <el-option
                                    v-for="(item,index) in options.platform"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品名称：">
                            <el-select v-model="new_from.productID" placeholder="请选择" class="f_select1"
                                       @change="selectProduct($event)">
                                <el-option
                                    v-for="(item,index) in templateAll "
                                    :key="item.productID"
                                    :label="item.productName"
                                    :value="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="预审产品：">
                            <el-select v-model="temId" placeholder="请选择" class="f_select1"
                                       @change="selectChange($event)"
                                       :disabled="typeof this.new_from.productID=='string'">
                                <el-option
                                    v-for="(item,index) in templateAll[templateAllIndex].templateList"
                                    :key="item.id"
                                    :label="item.templateName"
                                    :value="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="预审apk链接：">
                            <el-input v-model="new_from.apkUrl" class="f_input1" :disabled="true"></el-input>
                        </el-form-item>

                        <div class="banner_part_line page_create_set_line">高级设置</div>

                        <el-form-item label="地域规避：">
                            <el-radio-group v-model="new_from.areaLimit.status" class="f_radio3 f_radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                                <el-select v-model="new_from.areaLimit.areaList" multiple placeholder="请选择"
                                           class="f_select3"
                                           v-bind:class="{none:new_from.areaLimit.status=='0'?true:false}"
                                           v-if="false">
                                    <el-option
                                        v-for="item in options.area"
                                        :key="item.id"
                                        :label="item.val"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="自动下载：" style="height:auto;">
                            <el-radio-group v-model="new_from.autoDownload.status" class="f_radio1">
                                <el-radio :label="0">不开启</el-radio>
                                <el-radio :label="1">全国</el-radio>
                                <el-radio :label="2" :class="{none:new_from.areaLimit.status=='0'?true:false}">规避下载
                                </el-radio>
                            </el-radio-group>
                            <el-select v-model="new_from.autoDownload.times" placeholder="3000" class="f_select2"
                                       v-bind:class="{none:new_from.autoDownload.status=='0'?true:false}">
                                <el-option :label="0" value="0"></el-option>
                                <el-option :label="1000" value="1000"></el-option>
                                <el-option :label="2000" value="2000"></el-option>
                                <el-option :label="3000" value="3000"></el-option>
                                <el-option :label="4000" value="4000"></el-option>
                            </el-select>


                        </el-form-item>
                        <el-form-item label="点击弹窗：">
                            <el-radio-group v-model="new_from.openWindown.status" class="f_radio2 f_radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                                <el-input v-model="new_from.openWindown.ct" placeholder="自定义弹窗内容"
                                          v-bind:class="{none:new_from.openWindown.status=='0'?true:false}"></el-input>
                            </el-radio-group>
                        </el-form-item>


                        <div class="banner_part_line page_create_banner_line">悬浮banner设置</div>

                        <el-form-item label="位置：">
                            <el-radio-group v-model="new_from.bannerSettings.position">
                                <el-radio :label="1">顶部</el-radio>
                                <el-radio :label="2">底部</el-radio>
                                <el-radio :label="0">不显示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="logo：" style="height:auto;" v-if="new_from.bannerSettings.position!=0">
                            <div class="new_logo">
                                <img :src='new_from.bannerSettings.logo'/>
                            </div>
                        </el-form-item>
                        <el-form-item label="slogan：" v-if="new_from.bannerSettings.position!=0">
                            <el-input v-model="new_from.bannerSettings.slogan" class="f_input4"
                                      placeholder="请输入banner名称"></el-input>
                        </el-form-item>
                        <el-form-item label="按钮文字：" v-if="new_from.bannerSettings.position!=0">
                            <el-select
                                v-model="new_from.bannerSettings.bntCt"
                                filterable
                                allow-create
                                class="f_select4"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in options.butText"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div><!--
				-->
                <div class="page_d_con_right">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">常规落地页预览</div>
                        <div class="current_img">
                            <img v-for="img_src in options.langPage" :src="img_src.replace(/^\d+@#@/g,'')"
                                 class="image">
                        </div>
                    </div>
                    <div class="page_c_link">
                        <span>链接：</span>
                        <el-input v-model="newLink" placeholder="请输入内容"></el-input>
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
                new_from: {
                    platform: '',
                    productID: '',
                    templateID: '',
                    creatorID: '',
                    apkUrl: '',
                    autoDownload: {
                        status: 0,
                        areaList: [],
                        times: 3000
                    },
                    openWindown: {
                        status: 0,
                        ct: ''
                    },
                    areaLimit: {
                        status: 0,
                        areaList: []
                    },
                    bannerSettings: {
                        position: 0,
                        logo: '',
                        slogan: '',
                        bntCt: '打开'
                    }
                },
                options: {
                    platform: [
                        {
                            id: '0',
                            val: 'wifi'
                        },
                        {
                            id: '1',
                            val: '猎豹'
                        },
                        {
                            id: '2',
                            val: '趣头条'
                        },
                        {
                            id: '3',
                            val: '铁血军事'
                        },
                        {
                            id: '4',
                            val: '喜马拉雅'
                        },
                        {
                            id: '5',
                            val: '东方头条'
                        },
                        {
                            id: '6',
                            val: 'B站'
                        },
                        {
                            id: '7',
                            val: '淘新闻'
                        },
                        {
                            id: '8',
                            val: '网易云音乐'
                        },
                    ],
                    product: [
                        {
                            id: '',
                            val: ''
                        }
                    ],
                    area: [
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
                    langPage: [
//                        '05@#@https://io.abjiv.cn/img/1026_wandu (14).jpg',
//                        '01@#@https://io.abjiv.cn/img/1026_wandu (10).jpg',
//                        '04@#@https://io.abjiv.cn/img/1026_wandu (13).jpg',
//                        '03@#@https://io.abjiv.cn/img/1026_wandu (12).jpg',
//                        '02@#@https://io.abjiv.cn/img/1026_wandu (11).jpg'
                    ]
                },
                templateAll: [
                    {productID: '', productName: '', templateList: []}
                ],
                temId: '',
                templateAllIndex: 0,
                templateSingleIndex: 0,
                newLink: '',
            };
        },
        created() {
            this.new_from.creatorID = sessionStorage.userId;
            this.pageInfo();
        },
        methods: {
            pageInfo() {
                /*地域*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '4'}
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.options.area = data.list;
                        this.new_from.autoDownload.areaList = this.new_from.areaLimit.areaList = this.areaListPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '3'}
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.options.product = data.list;
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*获取所有预审模板列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.productTemplateUrl
                }).then(res => {
                    var data = res.data;
                    if (res.status == 200) {
                        this.templateAll = data;
                    } else {
//                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            selectChange(index) {
                if(index===''){
                    return false;
                }
                this.templateSingleIndex = index;
                this.new_from.templateID = this.templateAll[this.templateAllIndex].templateList[index].id;
                this.new_from.apkUrl = this.templateAll[this.templateAllIndex].templateList[index].apk;
                this.new_from.bannerSettings.logo = this.templateAll[this.templateAllIndex].templateList[index].logo;
                var langPageUrl = this.templateAll[this.templateAllIndex].templateList[index].picUrls;
                this.options.langPage = this.picSort(langPageUrl, '@#@');
                this.new_from.bannerSettings.slogan = this.templateAll[this.templateAllIndex].templateList[index].templateName;
            },
            selectProduct(index) {
                this.templateAllIndex = index;
                if(this.templateAll[index].templateList.length>0){
                    this.temId = 0;
                    this.selectChange(this.temId);
                }else{
                    this.temId = this.new_from.apkUrl ='';
                    this.options.langPage =[];
                }
            },
            onSubmit() {
                this.$http({
                    method: 'post',
                    url: this.apiUrl.landpageNewUrl,
                    data: this.new_from,
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '创建成功'
                        });
                        this.$router.push({path: 'pageList'});
                    } else {
                        this.$message({
                            type: 'error',
                            message: '创建失败，请完善信息，并重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请完善信息'
                    });
                });
            },
            go_back() {
                this.$router.back();
            }
        }
    };
</script>
