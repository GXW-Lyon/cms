<style rel="stylesheet/scss" lang="scss">
    .template_input {
        .f_select2 .el-input__inner {
            width: 56px;
        }
    }
</style>

<template>
    <div>
        <div class="template_input">
            <div class="page_d_title">
                <i></i><span>模板录入</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-form ref="form" :model="template_from" label-width="125px">
                        <el-form-item label="类型：">
                            <el-select
                                v-model="template_from.templateType"
                                filterable
                                allow-create
                                class="f_select4"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in type_options"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模板名称：">
                            <el-input v-model="template_from.templateName" class="f_input4" :disabled="templateDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="展示形式：">
                            <el-radio-group v-model="template_from.showType" class="f_radio1">
                                <el-radio :label="1">平铺</el-radio>
                                <el-radio :label="2">轮播</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="上传图片：" class="upload_img">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadImgUrl"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :with-credentials="true"
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过2MB</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="轮播间隔：" v-bind:class="{none:template_from.showType=='1'?true:false}">
                            <el-select v-model="template_from.intervalTime" placeholder="500"
                                       class="f_select2 clear_f_select2">
                                <el-option :label="300" value="300"></el-option>
                                <el-option :label="400" value="400"></el-option>
                                <el-option :label="500" value="500"></el-option>
                                <el-option :label="600" value="600"></el-option>
                                <el-option :label="700" value="700"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="轮播最后一帧停止：" class="lunbo"
                                      v-bind:class="{none:template_from.showType=='1'?true:false}">
                            <el-radio-group v-model="template_from.lastFrameStop">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
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
                        <div class="current_page_title create_page_title">落地页预览</div>
                        <div class="current_img">
                            <img v-for="img_src in template_from.picUrls"
                                 :src="img_src.replace(/^\d+@#@/g,'').replace(/8888/g,'8080')" class="image">
                        </div>
                    </div>
                    <div class="page_d_alt" v-bind:class="{none:!saveAlt.status}">
                        提示：保存已生效，生效时间：<span>{{saveAlt.date}}</span></div>
                    <p class="edit delete">
                        <button type="button" class="el-button button el-button--primary" @click="deleteTemplate" v-if="templateDisable">
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
                but_text: '创建',
                template_from: {
                    id:'',
                    type: '2',
                    templateType: '',
                    productID: '',
                    designerID: '',
                    templateName: '',
                    showType: 1,
                    intervalTime: '500',
                    lastFrameStop: 0,
                    picUrls: []
                },
                templateId: '',
                templateDisable:false,
                saveAlt: {
                    status: false,
                    date: ''
                },
                fileList: [],
                type_options: [
                    {
                        id: '1',
                        val: '设计1'
                    }, {
                        id: '2',
                        val: '设计2'
                    }, {
                        id: '3',
                        val: '设计3'
                    }, {
                        id: '4',
                        val: '设计4'
                    }, {
                        id: '5',
                        val: '设计5'
                    }
                ],
            };
        },
        created() {
            this.template_from.designerID = sessionStorage.userType == '2' ? sessionStorage.userId : '';
            this.pageInfo();
        },
        methods: {
            pageInfo() {
                /*类型*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '2'}
                }).then(res => {
//                    console.log(res);
                    var data = res.data;
                    if (data.status == 1) {
                        this.type_options = data.list;
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*编辑模板*/
                if (this.$route.query.templateId != '') {
                    this.templateDisable=true;
                    this.templateId = decodeURIComponent(this.$route.query.templateId);
                    this.but_text = '保存';
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.templateGetUrl,
                        params: {id: this.templateId}
                    }).then(res => {
//                        console.log(res);
                        if (res.status == 200) {
                            this.template_from = res.data;
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
                if (this.template_from.picUrls.length > 0) {
                    this.template_from.picUrls = this.pic_sort(this.template_from.picUrls);
                    this.but_text=='保存'?this.template_from.id=this.templateId:null;
                    var nowUrl='';
                    nowUrl=this.but_text=='保存'?this.apiUrl.templateUpdateUrl:this.apiUrl.templateNewUrl;
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
            handleRemove(file, fileList) {
                this.template_from.picUrls = [];
                for (let item of fileList) {
                    if (item.response) {
                        this.template_from.picUrls.push(item.response.url);
                    } else {
                        this.template_from.picUrls.push(item.url);
                    }
                }
            },
            handleSuccess(response, file, fileList) {
//                console.log(fileList);
//                this.template_from.picUrls = [];
//                for (let item of fileList) {
                this.template_from.picUrls.push(response.url);
//                }
//                console.log(this.template_from.picUrls);
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
                const extension2 = fileName[fileNameLen] === 'gif';
                const extension3 = fileName[fileNameLen] === 'png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!extension && !extension2 && !extension3) {
                    this.$message({
                        type: 'info',
                        message: '上传模板只能是 jpg、gif、png 格式'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'info',
                        message: '上传图片大小不能超过 2MB'
                    });
                }
                return extension || extension2 || extension3 && isLt2M;
            },
            deleteTemplate() {
//                console.log(this.templateId);
                this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'delete',
                        url: this.apiUrl.templateDelUrl,
                        params: {id: this.templateId}
                    }).then(res => {
//                        console.log(res);
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.$router.push({
                                path: 'templateList'
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
            go_back() {
                this.$router.back();
            }
        }
    };
</script>
