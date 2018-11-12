<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_detail">
            <div class="page_d_title">
                <i></i><span>落地页详情设置</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="edit_from" label-width="125px">
                        <el-form-item label="投放平台：">
                            <el-input v-model="platformName" class="f_input1" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="落地页动态链接：">
                            <el-input v-model="edit_from.dynamicUrl" class="f_input1" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="产品名称：">
                            <el-input v-model="edit_from.pname" class="f_input2" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="落地页标题：">
                            <el-input v-model="edit_from.title" class="f_input2"></el-input>
                        </el-form-item>
                        <el-form-item label="产品包号：">
                            <el-select v-model="packApkUrl" placeholder="请选择" class="f_select1"
                                       @change="packSelect($event)">
                                <el-option
                                    v-for="(item,index) in options.productApks"
                                    :key="index"
                                    :label="item.key"
                                    :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="当前apk链接：">
                            <el-input v-model="edit_from.apk.val" class="f_input3" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="是否拉活：">
                            <el-radio-group v-model="edit_from.lahuo.flag" class="f_radio3 f_radio">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="拉活链接：" v-if="edit_from.lahuo.flag">
                            <el-input v-model="edit_from.lahuo.url" class="f_input3" placeholder="请输入Scheme链接"></el-input>
                        </el-form-item>
                        <el-form-item label="是否返回：">
                            <el-radio-group v-model="edit_from.returnBtn.flag" class="f_radio3 f_radio">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="返回链接：" v-if="edit_from.returnBtn.flag">
                            <el-input v-model="edit_from.returnBtn.url" class="f_input3" placeholder="请输入返回链接"></el-input>
                        </el-form-item>
                        <el-form-item label="地域规避：">
                            <el-radio-group v-model="edit_from.areaLimit.status" class="f_radio3 f_radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                                <el-select v-model="edit_from.areaLimit.areaList" multiple placeholder="请选择"
                                           class="f_select3"
                                           v-bind:class="{none:edit_from.areaLimit.status=='0'?true:false}"
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
                            <el-radio-group v-model="edit_from.autoDownload.status" class="f_radio1">
                                <el-radio :label="0">不开启</el-radio>
                                <el-radio :label="1">全国</el-radio>
                                <el-radio :label="2" :class="{none:edit_from.areaLimit.status=='0'?true:false}">规避下载
                                </el-radio>
                            </el-radio-group>
                            <el-select v-model="edit_from.autoDownload.times" placeholder="3000" class="f_select2"
                                       v-bind:class="{none:edit_from.autoDownload.status=='0'?true:false}">
                                <el-option :label="0" value="0"></el-option>
                                <el-option :label="1000" value="1000"></el-option>
                                <el-option :label="2000" value="2000"></el-option>
                                <el-option :label="3000" value="3000"></el-option>
                                <el-option :label="4000" value="4000"></el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="点击弹窗：">
                            <el-radio-group v-model="edit_from.openWindown.status" class="f_radio2 f_radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                                <el-input v-model="edit_from.openWindown.ct" placeholder="自定义弹窗内容"
                                          v-bind:class="{none:edit_from.openWindown.status=='0'?true:false}"></el-input>
                            </el-radio-group>
                        </el-form-item>

                        <div class="banner_part_line">悬浮banner设置</div>

                        <el-form-item label="位置：">
                            <el-radio-group v-model="edit_from.bannerSettings.position">
                                <el-radio :label="1">顶部</el-radio>
                                <el-radio :label="2">底部</el-radio>
                                <el-radio :label="0">不显示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="logo：" style="height:auto;" v-if="edit_from.bannerSettings.position!=0">
                            <div class="new_logo" :class="{none:!logo_visible}">
                                <img :src="edit_from.bannerSettings.logo"/>
                            </div>
                            <el-upload
                                :action="apiUrl.tuiaUploadImgUrl"
                                :with-credentials="true"
                                list-type="picture-card"
                                :on-remove="handleRemove"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :on-success="logoImgSuccess">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <!--<el-dialog v-model="logo_upload.dialogVisible" size="tiny">-->
                            <!--<img width="100%" :src="logo_upload.dialogImageUrl" alt="">-->
                            <!--</el-dialog>-->
                        </el-form-item>
                        <el-form-item label="slogan：" v-if="edit_from.bannerSettings.position!=0">
                            <el-input v-model="edit_from.bannerSettings.slogan" class="f_input4"></el-input>
                        </el-form-item>
                        <el-form-item label="按钮文字：" v-if="edit_from.bannerSettings.position!=0">
                            <el-select
                                v-model="edit_from.bannerSettings.bntCt"
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
                    <div class="page_d_current">
                        <div class="current_page_title">当前落地页预览</div>
                        <div class="none_ceng"></div>
                        <div class="current_img">
                            <img v-for="(c,i) in edit_from.picUrls" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                    </div><!--
					-->
                    <div class="page_d_preview">
                        <div class="preview_page_title">模板预览</div>
                        <div class="page_d_right_search">
                            <el-input v-model="search_text" class="page_d_select" placeholder="请输入模板名称" @keyup.enter.native="page_search"></el-input><!--
						  --><el-button class="page_d_s_button" @click="page_search">搜索</el-button>
                        </div>
                        <div class="preview_img">
                            <img v-for="(c,i) in langPagePreviewUrl" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                    </div>
                    <div class="page_d_alt" v-bind:class="{none:!saveAlt.status}">
                        提示：保存已生效，生效时间：<span>{{saveAlt.date}}</span></div>
                    <div class="page_d_msg">
                        <ul>
                            <li>创建人：</li>
                            <li>{{edit_from.creater}}</li><!--
							-->
                            <li>日期：</li>
                            <li>{{edit_from.createrDate}}</li><!--
							-->
                            <li>最后编辑人：</li>
                            <li>{{edit_from.lastModifier}}</li><!--
							-->
                            <li>日期：</li>
                            <li>{{edit_from.lastModifyDT}}</li>
                        </ul>
                    </div>
                    <p class="edit refresh">
                        <button type="button" class="el-button button el-button--primary" @click="clearCDN">
                            <!----><!----><span>清除缓存</span>
                        </button>
                    </p>
                    <p class="edit delete">
                        <button type="button" class="el-button button el-button--primary" @click="deleteLangPage">
                            <!----><!----><span>删除</span>
                        </button>
                    </p>
                </div><!--
				-->
                <div class="page_d_con_right shieldConfig" v-if="edit_from.areaLimit.status==1">
                    <div class="page_d_current">
                        <div class="current_page_title">当前落地页预览</div>
                        <div class="none_ceng">屏蔽地区预览</div>
                        <div class="current_img">
                            <img v-for="(c,i) in edit_from.picUrls" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                        <div class="none_ceng">非屏蔽地区预览</div>
                        <div class="current_img">
                            <img v-for="(c,i) in edit_from.evadePicUrls" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                    </div><!--
					-->
                    <div class="page_d_preview">
                        <div class="preview_page_title">模板预览</div>
                        <div class="page_d_right_search">
                            <el-input v-model="search_text" class="page_d_select" placeholder="请输入屏蔽地区模板名称"></el-input><!--
						  --><el-button class="page_d_s_button" @click="page_search">搜索</el-button>
                        </div>
                        <div class="preview_img">
                            <img v-for="(c,i) in langPagePreviewUrl" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                        <div class="page_d_right_search">
                            <el-input v-model="search_text_shield" class="page_d_select" placeholder="请输入非屏蔽地区模板名称"></el-input><!--
						  --><el-button class="page_d_s_button" @click="page_search('shield')">搜索</el-button>
                        </div>
                        <div class="preview_img">
                            <img v-for="(c,i) in unlangPagePreviewUrl" :src="c.replace(/^\d+@#@/g,'')"/>
                        </div>
                    </div>
                    <div class="page_d_alt" v-bind:class="{none:!saveAlt.status}">
                        提示：保存已生效，生效时间：<span>{{saveAlt.date}}</span></div>
                    <div class="page_d_msg">
                        <ul>
                            <li>创建人：</li>
                            <li>{{edit_from.creater}}</li><!--
							-->
                            <li>日期：</li>
                            <li>{{edit_from.createrDate}}</li><!--
							-->
                            <li>最后编辑人：</li>
                            <li>{{edit_from.lastModifier}}</li><!--
							-->
                            <li>日期：</li>
                            <li>{{edit_from.lastModifyDT}}</li>
                        </ul>
                    </div>
                    <p class="edit refresh">
                        <button type="button" class="el-button button el-button--primary" @click="clearCDN">
                            <!----><!----><span>清除缓存</span>
                        </button>
                    </p>
                    <p class="edit delete">
                        <button type="button" class="el-button button el-button--primary" @click="deleteLangPage">
                            <!----><!----><span>删除</span>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                landpageId: '',
                langPagePreviewUrl: [],
                unlangPagePreviewUrl:[],
                platformName:'',
                edit_from: {
                    platform: '',
                    templateID: '',
                    landPageUrl: '',
                    dynamicUrl:'',
                    pname: '',
                    title:'',
                    apk: {key: '', val: ''},
                    autoDownload: {
                        status: 0,
                        areaList: [1, 2],
                        times: 3000
                    },
                    openWindown: {
                        status: 0,
                        ct: '',
                    },
                    areaLimit: {
                        status: 0,
                        areaList: [3, 4],
                        templateID:''
                    },
                    bannerSettings: {
                        position: 2,
                        logo: '',
                        slogan: '',
                        bntCt: '打开'
                    },
                    picUrls: [],
                    evadePicUrls:[],
                    lahuo:{flag: false, url: ""},
                    returnBtn:{flag: false, url: ""},
                    creater: 'creater',
                    createrDate: 'createrDate',
                    lastModifier: 'lastModifier',
                    lastModifyDT: 'lastModifyDT',
                    productID: ''
                },
                saveAlt: {
                    status: false,
                    date: ''
                },
                options: {
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
                    langPage: [],
                    productApks: [
                        {key: '', val: ''}
                    ]
                },
                logo_visible: true,
                search_text: '',
                search_text_shield:'',
                designerID: '',
                domain: '',
                packApkUrl: '',
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        created() {
            this.landpageId = parseInt(this.$route.query.landpageId);
            this.pageInfo();
        },
        methods: {
            pageInfo() {
                /*落地页基本信息*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.landpageGetUrl,
                    params: {id: this.landpageId},
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        this.edit_from = res.data;
                        switch (this.edit_from.platform){
                            case 0:this.platformName='wifi';break;
                            case 1:this.platformName='猎豹';break;
                            case 2:this.platformName='趣头条';break;
                            case 3:this.platformName='铁血军事';break;
                        }
                        this.edit_from.picUrls = this.picSort(this.edit_from.picUrls, '@#@');
                        if(this.edit_from.evadePicUrls.length==0){
                            this.edit_from.evadePicUrls =this.edit_from.picUrls;
                        }else{
                            this.edit_from.evadePicUrls = this.picSort(this.edit_from.evadePicUrls, '@#@');
                        }
//                        this.edit_from.bannerSettings.slogan = this.edit_from.pname;
                        this.edit_from.title==''?this.edit_from.title='福利小视频':null;
                        this.packApkUrl=res.data.apk.key;
                        this.packUrlInfo();
                    } else {
//                        alert('');
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*地域*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '4'}
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.options.area = data.list;
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            packUrlInfo() {
//                console.log(this.edit_from.productID);
                /*产品包信息*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.productAttriUrl,
                    params: {id: this.edit_from.productID},
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.domain = res.data.domain;
                        this.options.productApks = res.data.apks;
                    } else {
//                        alert('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleRemove(file, fileList) {
                this.edit_from.bannerSettings.logo = '';
                document.querySelector('.el-upload--picture-card').classList.remove('none');
            },
            logoImgSuccess(response, file, fileList) {
                this.logo_visible = false;
                this.edit_from.bannerSettings.logo = response.url;
                document.querySelector('.el-upload--picture-card').classList.add('none');
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
                var fileName=file.name.split('.');
                var fileNameLen=fileName.length-1;
                const extension = fileName[fileNameLen] === 'jpg';
                const extension2 = fileName[fileNameLen] === 'png';
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!extension && !extension2) {
                    this.$message({
                        type: 'info',
                        message: '上传logo只能是 jpg、png 格式'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'info',
                        message: 'logo大小不能超过 1MB'
                    });
                }
                return extension || extension2 && isLt2M;
            },
            onSubmit() {
//                console.log(this.edit_from.title);
                if(!this.edit_from.lahuo.flag){
                    this.edit_from.lahuo.url='';
                }else if(this.edit_from.lahuo.flag&&!this.edit_from.lahuo.url){
                    this.$message({
                        type: 'info',
                        message: '请输入scheme链接'
                    });
                    return false;
                }
                if(!this.edit_from.returnBtn.flag){
                    this.edit_from.returnBtn.url='';
                }else if(this.edit_from.returnBtn.flag&&!this.edit_from.returnBtn.url){
                    this.$message({
                        type: 'info',
                        message: '请输入返回链接'
                    });
                    return false;
                }
                this.$http({
                    method: 'post',
                    url: this.apiUrl.landpageUpdateUrl,
                    data: {
                        onlyUpdateTemplateId: false,
                        id: this.landpageId,
                        templateID: this.edit_from.templateID,
                        autoDownload: this.edit_from.autoDownload,
                        openWindown: this.edit_from.openWindown,
                        areaLimit: this.edit_from.areaLimit,
                        bannerSettings: this.edit_from.bannerSettings,
                        lastEditerId: sessionStorage.userId,
                        designerID: this.designerID,
                        apk: this.edit_from.apk,
                        domain: this.domain[0],
                        title:this.edit_from.title,
                        platform:this.edit_from.platform,
                        lahuo:this.edit_from.lahuo,
                        returnBtn:this.edit_from.returnBtn,
                    }
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.saveAlt.status = true;
                        this.saveAlt.date = new Date().toLocaleString();
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.msg
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            page_search(flag) {
                var searchText=this.search_text;
                flag=='shield'?searchText=this.search_text_shield:null;
                this.$http({
                    method: 'get',
                    url: this.apiUrl.templateGetUrl,
                    params: {name: searchText}
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        if(flag=='shield'){
                            this.edit_from.areaLimit.templateID = data.id;
                            this.unlangPagePreviewUrl = this.picSort(data.picUrls, '@#@');
                        }else{
                            this.edit_from.templateID = data.id;
                            this.langPagePreviewUrl = this.picSort(data.picUrls, '@#@');
                        }
                        this.designerID = data.designerID;
//                        console.log(this.edit_from.templateID);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '该模板不存在'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '该模板不存在'
                    });
                });
            },
            deleteLangPage() {
//                console.log(this.landpageId);
                this.$confirm('此操作将永久删除该落地页, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.landpageDelUrl,
                        params: {id: this.landpageId}
                    }).then(res => {
//                        console.log(res);
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.$router.push({
                                path: 'pageList'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            });
                        }
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            packSelect(key) {
                this.options.productApks.forEach((item, i) => {
                    if (item.key == key) {
                        this.edit_from.apk = {
                            key: item.key,
                            val: item.val
                        };
                    }
                });
            },
            clearCDN(){
//                console.log(this.landpageId);
                this.$http({
                    method: 'get',
                    url: this.apiUrl.landpageRefreshUrl,
                    params: {id: this.landpageId}
                }).then(res => {
//                    console.log(res);
                    var data = res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '清除成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '清除失败'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            go_back() {
                this.$router.back();
            }
        }
    };
</script>
