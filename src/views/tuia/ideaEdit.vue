<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="page_create">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>{{title}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left" style="width:600px">
                    <el-form ref="form" :model="template_from" label-width="125px">
                        <el-form-item label="选择位置：">
                            <el-select v-model="template_from.channel" placeholder="请选择渠道" class="f_select1"  @change="weightRatio" :disabled="inpFlag">
                                <el-option
                                    v-for="item in channelList "
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创意名称：">
                            <el-input v-model="adName" class="f_input2"
                                      placeholder="请输入创意名称" :disabled="inpFlag"></el-input>
                        </el-form-item>
                        <el-form-item label="素材样式：">
                            <el-select v-model="template_from.creativeTemplate" placeholder="请选择样式" class="f_select1" :disabled="inpFlag">
                                <el-option
                                    v-for="item in creativeTemplateList "
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上传广告图片：" style="height:auto;">
                            <el-upload
                                class="upload-demo"
                                :data="upLoadData"
                                :action="apiUrl.tuiaUploadImgUrl"
                                :with-credentials="true"
                                :on-success="adImgSuccess"
                                :on-remove="handleRemove"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :file-list="fileList"
                                :disabled="inpFlag">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">请上传格式为JPG，大小1MB以内的图片</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="广告文案：" v-if="template_from.creativeTemplate!=1">
                            <el-input v-model="template_from.desc" class="f_input2" placeholder="" :disabled="inpFlag"></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址：">
                            <el-select v-model="template_from.lpType" placeholder="请选择状态" class="f_select1" @change="linkFlag" :disabled="inpFlag">
                                <el-option
                                    v-for="item in landType "
                                    :key="item.lpType"
                                    :label="item.val"
                                    :value="item.lpType">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="链接/包地址：">
                            <el-input v-model="template_from.apkUrl" class="f_input2" v-if="apkFlag"
                                      placeholder="请输入包链接" :disabled="inpFlag"></el-input>
                            <el-input v-model="template_from.landpageUrl" class="f_input2" v-if="!apkFlag"
                                      placeholder="请输入落地页链接" :disabled="inpFlag"></el-input>
                        </el-form-item>
                        <el-form-item label="触发按键：" v-if="template_from.creativeTemplate==4">
                            <el-select v-model="template_from.bntDesc" placeholder="请选择按键" class="f_select1" :disabled="inpFlag" filterable allow-create>
                                <el-option
                                    v-for="item in bntType "
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创意权重：">
                            <el-select v-model="template_from.weight" placeholder="请选择权重" class="f_select1" :disabled="inpFlag">
                                <el-option
                                    v-for="item in channelWeight "
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="form_button" style="margin-top:60px">
                            <el-button type="primary" @click="onSubmit" :disabled="inpFlag">{{but_text}}</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="page_d_con_right" style="width:530px">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">创意预览</div>
                        <div class="current_img" style="height:auto" v-if="isModel">
                            <h2>广告图片</h2>
                            <img v-for="(item,index) in template_from.imgUrls" :key="index" :src="item.replace(/^\d+@#@/g,'')" class="image">
                        </div>
                        <!--<div v-if="isTrue">-->
                            <!--<h2>落地页图片</h2>-->
                            <!--<div class="current_img" style="height:380px">-->
                                <!--<img v-for="img_src in template_from.lpImgUrls " :src="img_src.replace(/^\d+@#@/g,'')" class="image">-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            apkFlag: true,
            isTrue: false,
            isModel: false,
            inpFlag: false,
            adFlag: false,
            lpFlag: false,
            logo_visible: false,
            title: '编辑创意',
            menu_nav: ['推啊数据管理','创意管理','编辑创意'],
            fileList: [],
            adurl: '',
            upLoadData: {
                imgType: 1,
            },
            template_from: {
                apkUrl: '',
                bntDesc: '',
                channel: '',
                creativeTemplate: '',
                desc: '',
                landpageUrl: '',
                weight: '',
                lpType: '',
                lpImgUrls: [],
                imgUrls: ''
            },
            adNo: '',
            adName: '',
            templateDisable: false,
            saveAlt: {
                status: false,
                date: ''
            },
            channelList: [],
            creativeTemplateList: [
                {id:1,val:'单图'},
                {id:2,val:'左图右文'},
                {id:3,val:'三图上文'},
                {id:4,val:'推啊'},
            ],
            channelWeight: [],
            bntType:['点击','点击领取'],
            landType: [
                {
                    lpType: 1,
                    val: '链接落地页地址'
                },
                {
                    lpType: 2,
                    val: '直接下载（仅支持包地址）'
                }
            ],
            but_text: '确认',
            status: {
                product: false,
                template: false
            }
        };
    },
    created () {
        this.adInfo(this.$route.query.id,this.$route.query.status);
        this.channelInfo();
    },
    methods: {
        /*广告信息*/
        adInfo (id,status) {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminAdGet,
                params: { adNo: id, status: status }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.template_from = data.adAttrJson;
                    this.adName = data.adName;
                    var newArr = [];
                    for (let url of this.template_from.imgUrls) {
                        newArr.push({ name: this.picSubName(url), url: url });
                    }
                    this.fileList = newArr;
                    if (data.adAttrJson.lpType === 0) {
                        this.isModel = true;
                        this.isTrue = true;
                        this.lpFlag = true;
                    } else {
                        this.isModel = true;
                    }
                    if (data.adAttrJson.lpType === 1) {
                        this.apkFlag = false;
                    }
                }
            }).catch();
        },
        /*显示隐藏链接地址*/
        linkFlag () {
            if (this.template_from.lpType === 1) {
                this.apkFlag = false;
                this.lpFlag = false;
                this.isTrue = false;
            } else if (this.template_from.lpType === 0) {
                this.apkFlag = true;
                this.lpFlag = true;
                this.isTrue = true;
            } else {
                this.apkFlag = true;
                this.lpFlag = false;
                this.isTrue = false;
            }
        },
        /*渠道*/
        channelInfo () {
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelList,
            }).then(res => {
                console.log(res);
                if (res.status == 200) {
                    var data = res.data;
                    this.channelList = data;
                } else {
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*渠道权重*/
        weightRatio () {
            this.channelWeight = [];
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelWeightRatio,
                params: { channel: this.template_from.channel },
            }).then(res => {
                var data = res.data.weightRatio;
                for (var key in data) {
                    this.channelWeight.push(key);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onSubmit (id) {
            if (this.template_from.lpType === 0) {
                this.template_from.landpageUrl = '';
            }
            if (this.template_from.lpType === 1) {
                this.template_from.lpImgUrls = [];
                this.template_from.apkUrl = '';
            }
            if (this.template_from.lpType === 2) {
                this.template_from.lpImgUrls = [];
                this.template_from.landpageUrl = '';
            }
            if (this.adName == '' || this.template_from.channel == '' || this.template_from.weight == '' || (this.template_from.creativeTemplate === 4 &&this.template_from.bntDesc == '') || (this.template_from.creativeTemplate!=1&&this.template_from.desc == '') || this.template_from.lpType === '' || (this.template_from.lpType === 1 && this.template_from.landpageUrl == '') || (this.template_from.lpType === 0 && this.template_from.apkUrl == '') || (this.template_from.lpType === 2 && this.template_from.apkUrl == '') ||  this.template_from.imgUrls.length ==0) {
                this.$message({
                    type: 'error',
                    message: "所有信息不能为空，请重新提交"
                });
                return false;
            }
            if (this.template_from.imgUrls.length > 0) {
                this.template_from.imgUrls = this.pic_sort(this.template_from.imgUrls);
            }
            this.$http({
                method: 'post',
                url: this.apiUrl.tuiaAdminAdUpdate,
                data: {
                    adAttrJson: this.template_from,
                    adName: this.adName,
                    adNo: this.$route.query.id
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.status == 1) {
                        this.inpFlag = true;
                        this.saveAlt.date = new Date().toLocaleString();
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        });
                        this.go_back();
                    }
                } else {
                    this.$message({
                        type:'error',
                        message:'编辑失败'
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        },
        go_back () {
            this.$router.back();
        },
        handleRemove (file, fileList) {
            this.template_from.imgUrls = [];
            for (let item of fileList) {
                if (item.response) {
                    this.template_from.imgUrls.push(item.response.url);
                } else {
                    this.template_from.imgUrls.push(item.url);
                }
            }
            if (this.template_from.imgUrls.length == 0) {
                this.isModel = false;
            }
        },
        handleRemoveImg (file, fileList) {
            this.template_from.lpImgUrls = [];
            for (let item of fileList) {
                if (item.response) {
                    this.template_from.lpImgUrls.push(item.response.url);
                } else {
                    this.template_from.lpImgUrls.push(item.url);
                }
            }
            if (this.template_from.lpImgUrls == '') {
                this.isTrue = false;
            }
        },
        adImgSuccess (response, file, fileList) {
            this.isModel = true;
            this.saveAlt.date = new Date().toLocaleString();
            this.template_from.imgUrls.push(response.url);
        },
        handleSuccessImg (response, file, fileList) {
            this.isTrue = true;
            this.saveAlt.date = new Date().toLocaleString();
            this.template_from.lpImgUrls.push(response.url);
        },
        // 上传错误
        uploadError (response, file, fileList) {
            alert('上传失败，请重试！');
        },
        // 上传前对文件的大小的判断
        beforeAvatarUpload (file) {
            let flag=false;
            switch (this.template_from.creativeTemplate){
                case 1:
                case 2:
                case 4:
                    if(this.template_from.imgUrls.length==1){
                        this.$message({
                            type: 'info',
                            message: '当前素材样式只可上传一张图片'
                        });
                        flag=true;
                        break;
                    }
                case 3:
                    if(this.template_from.imgUrls.length==3){
                        this.$message({
                            type: 'info',
                            message: '当前素材样式最多可上传三张图片'
                        });
                        flag=true;
                        break;
                    }
                default:
                    if(this.template_from.imgUrls.length>=3){
                        this.$message({
                            type: 'info',
                            message: '广告素材最多可上传三张图片'
                        });
                        flag=true;
                        break;
                    }
            }
            if(flag) return false;
            var _this = this;
            return new Promise(function (resolve, reject) {
                var rule = {};
//                var reader = new FileReader();
//                reader.readAsDataURL(file);
//                reader.onload = function (e) {
//                    var data = e.target.result;
//                    //加载图片获取图片真实宽度和高度
//                    var image = new Image();
//                    image.src = data;
//                    image.onload = function () {
//                        var width = image.width;
//                        var height = image.height;
//                        if (width != 520 || height != 220) {
//                            rule.size = false;
//                            _this.$message({
//                                type: 'info',
//                                message: '上传图片尺寸为520*220'
//                            });
//                        } else {
//                            rule.size = true;
//                        }
//                        resolve(rule);
//                    };
//                };
                rule.size = true;
                resolve(rule);
            }).then(function (rule) {
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                rule.extension = fileName[fileNameLen] === 'jpg';
                rule.isLt2M = file.size / 1024 / 1024 < 1;
                if (!rule.extension) {
                    _this.$message({
                        type: 'info',
                        message: '上传模板只能是 jpg格式'
                    });
                }
                if (!rule.isLt2M) {
                    _this.$message({
                        type: 'info',
                        message: '上传图片大小不能超过 1MB'
                    });
                }
                return rule;
            }).then(function (rule) {
                let flag = rule.extension;
                if (!rule.size || !rule.isLt2M || !flag) {
                    reject(false);
                };
            });
        },
        // 上传前对文件的大小的判断
        beforeAvatarUploadImg (file) {
            var fileName = file.name.split('.');
            var fileNameLen = fileName.length - 1;
            const extension = fileName[fileNameLen] === 'jpg';
            const extension2 = fileName[fileNameLen] === 'gif';
            const extension3 = fileName[fileNameLen] === 'png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!extension && !extension2 && !extension3) {
                alert('上传模板只能是 jpg格式!');
            }
            if (!isLt2M) {
                alert('上传图片大小不能超过 2MB!');
            }
            return extension || extension2 || extension3 && isLt2M;
        },
    },
};
</script>
