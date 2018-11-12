<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create">
            <div class="page_d_title">
                <i></i><span>{{title}}</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="template_from" label-width="125px">
                        <el-form-item label="产品名称：">
                            <el-select v-model="template_from.productID" placeholder="请选择" class="f_select1" :disabled="status.product">
                                <el-option
                                    v-for="(item,index) in options.product "
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模板名称：">
                            <el-input v-model="template_from.templateName" class="f_input2"
                                      placeholder="请输入模板名称" :disabled="status.template"></el-input>
                        </el-form-item>
                        <el-form-item label="apk链接：">
                            <el-input v-model="template_from.apk" class="f_input2" placeholder="请输入模板apk"></el-input>
                        </el-form-item>
                        <el-form-item label="logo：" style="height:auto;">
                            <div class="new_logo" v-if="logo_visible">
                                <img :src="template_from.logo"/>
                            </div>
                            <el-upload
                                :action="apiUrl.uploadImgUrl"
                                :with-credentials="true"
                                list-type="picture-card"
                                :on-remove="handleRemove"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :on-success="logoImgSuccess">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="上传图片：" class="upload_img">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadImgUrl"
                                :with-credentials="true"
                                :on-success="handleSuccessImg"
                                :on-remove="handleRemoveImg"
                                :beforeUpload="beforeAvatarUploadImg"
                                :onError="uploadError"
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过2MB</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">{{but_text}}</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div><!--
				-->
                <div class="page_d_con_right">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">模板预览</div>
                        <div class="current_img">
                            <img v-for="img_src in template_from.picUrls" :src="img_src.replace(/^\d+@#@/g,'')"
                                 class="image">
                        </div>
                    </div>
                    <div class="page_d_alt" v-bind:class="{none:!saveAlt.status}">
                        提示：保存已生效，生效时间：<span>{{saveAlt.date}}</span></div>
                    <p class="edit delete">
                        <button type="button" class="el-button button el-button--primary" @click="deleteTemplate"
                                v-if="templateDisable">
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
                title: '新建预审模板',
                fileList: [],
                logo_visible: false,
                template_from: {
                    productID: '',
                    templateName: '',
                    apk: '',
                    logo: '',
                    picUrls: [],
                    id: '',
                    type: '1'
                },
                templateDisable: false,
                saveAlt: {
                    status: false,
                    date: ''
                },
                options: {
                    product: [
                        {
                            id: '1',
                            val: 'nihao'
                        }
                    ],
                },
                but_text: '确认',
                status:{
                    product:false,
                    template:false
                }
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
                    if (data.status == 1) {
                        this.options.product = data.list;
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*编辑模板*/
                if (this.$route.query.templateId != '') {
                    this.template_from.id = decodeURIComponent(this.$route.query.templateId);
                    this.templateDisable = this.logo_visible = this.status.product=this.status.template=true;
                    this.title = '编辑预审模板';
                    this.but_text = '保存';
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.templateGetUrl,
                        params: {id: this.template_from.id}
                    }).then(res => {
//                        console.log(res);
                        if (res.status == 200) {
                            this.template_from = res.data;
                            this.template_from.productID=parseInt(this.template_from.productID);
                            this.template_from.picUrls = this.picSort(this.template_from.picUrls, '@#@');
                            var newArr = [];
                            for (let url of this.template_from.picUrls) {
                                newArr.push({name: this.picSubName(url), url: url});
                            }
                            this.fileList = newArr;
                        } else {
//                            alert(data.msg);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }

            },
            onSubmit() {
//                console.log(this.template_from);
                if (this.template_from.picUrls.length > 0) {
                    this.template_from.picUrls = this.pic_sort(this.template_from.picUrls);
                    var nowUrl = '';
                    nowUrl = this.but_text == '保存' ? this.apiUrl.templateUpdateUrl : this.apiUrl.templateNewUrl;
                    this.$http({
                        method: 'post',
                        url: nowUrl,
                        data: this.template_from
                    }).then(res => {
//                        console.log(res);
                        var data = res.data;
                        if (data.status == 1) {
                            this.saveAlt.status = true;
                            this.saveAlt.date = new Date().toLocaleString();
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '请上传图片'
                    });
                }
            },
            go_back() {
                this.$router.back();
            },
            handleRemove(file, fileList) {
                this.template_from.logo = '';
                document.querySelector('.el-upload--picture-card').classList.remove('none');
            },
            logoImgSuccess(response, file, fileList) {
                this.logo_visible = false;
                this.template_from.logo = response.url;
                document.querySelector('.el-upload--picture-card').classList.add('none');
            },
            // 上传错误
            uploadError(response, file, fileList) {
                alert('上传失败，请重试！');
            },
            // 上传前对文件的大小的判断
            beforeAvatarUpload(file) {
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                const extension = fileName[fileNameLen] === 'jpg';
                const extension2 = fileName[fileNameLen] === 'png';
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!extension && !extension2) {
                    alert('上传logo只能是 jpg、png 格式!');
                }
                if (!isLt2M) {
                    alert('logo大小不能超过 1MB!');
                }
                return extension || extension2 && isLt2M;
            },
            handleRemoveImg(file, fileList) {
                this.template_from.picUrls = [];
                for (let item of fileList) {
                    if (item.response) {
                        this.template_from.picUrls.push(item.response.url);
                    } else {
                        this.template_from.picUrls.push(item.url);
                    }
                }
            },
            handleSuccessImg(response, file, fileList) {
//                console.log(fileList);
                this.template_from.picUrls.push(response.url);
//                console.log(this.template_from.picUrls);
            },
            // 上传前对文件的大小的判断
            beforeAvatarUploadImg(file) {
                var fileName = file.name.split('.');
                var fileNameLen = fileName.length - 1;
                const extension = fileName[fileNameLen] === 'jpg';
                const extension2 = fileName[fileNameLen] === 'gif';
                const extension3 = fileName[fileNameLen] === 'png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!extension && !extension2 && !extension3) {
                    alert('上传模板只能是 jpg、gif、png 格式!');
                }
                if (!isLt2M) {
                    alert('上传图片大小不能超过 2MB!');
                }
                return extension || extension2 || extension3 && isLt2M;
            },
            deleteTemplate() {
//                console.log(this.template_from.id);
                this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.templateDelUrl,
                        params: {id: this.template_from.id}
                    }).then(res => {
//                        console.log(res);
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.$router.push({
                                path: 'defaultTemplate'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '模板正在使用，删除失败'
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
        }
    };
</script>
