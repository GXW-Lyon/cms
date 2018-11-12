<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="img_template">
            <div class="con_search">
                <div class="con_search_left">
                    <el-select v-model="page.templateType" placeholder="类型" class="con_select"
                               @change="select">
                        <el-option
                            v-for="item in type_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="page.designerID" placeholder="设计" class="con_select"
                               @change="select">
                        <el-option
                            v-for="item in design_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div><!--
				-->
                <div class="con_search_right" @click="template_input()">
                    <el-button type="primary"><i class="el-icon-plus"></i>新建模板</el-button>
                </div>
            </div>
            <div class="con_list">
                <el-row>
                    <el-col :span="5" v-for="(c, i) in listInfo" :key="i" :offset="i > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="img_preview" @click="pic_preview(c.id,c.picUrls)"><img
                                v-for="img_src in c.picUrls"
                                :src="img_src"
                                class="image"></div>
                            <div style="padding-left: 12px;" class="img_bottom_alt img_t_bottom_alt">
                                <span>{{c.name}}</span>
                                <p class="edit e_visible" @click="template_input(c.id)">
                                    <el-button type="primary" class="button">编辑</el-button>
                                </p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="con_pager">
                <div class="block">
                    <!-- <span class="demonstration">大于 7 页时的效果</span> -->
                    <el-pagination
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="page.count">
                    </el-pagination>
                </div>
            </div>
            <div class="page_d_con_right big_img" :class="{none:!replaceInfo.status}">
                <i class="el-icon-close" @click="exit_replace"></i>
                <div class="page_d_current page_create_current">
                    <div class="current_page_title create_page_title">落地页预览</div>
                    <div class="replace_img">
                        <p class="edit refresh" v-if="replaceInfo.clearCDNstatus">
                            <button type="button" class="el-button button el-button--primary" @click="clearCDN(replaceInfo.id)">
                                <!----><!----><span>清除缓存</span>
                            </button>
                        </p>
                        <el-input v-model="replaceInfo.id" placeholder="输入落地页ID替换图片" @keyup.enter.native="replace_button">
                            <el-button slot="append" @click="replace_button">替换</el-button>
                        </el-input>
                    </div>
                    <div class="current_img">
                        <img v-for="img_src in replaceInfo.picUrls"
                             :src="img_src"
                             class="image replaceImg">
                    </div>
                </div>
            </div>
            <div class="mengceng" :class="{none:!replaceInfo.mengcengStatus}" @click="exit_replace"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listInfo: [
//                    {
//                        productName: '',
//                        designer: '',
//                        id: '',
//                        name: '',
//                        showType: 1,
//                        picUrls: []
//                    }
                ],
                page: {
                    offset: 1,
                    limit: 10,
                    count: 0,
                    productID: '',
                    designerID: '',
                    templateType: ''
                },
                replaceInfo: {
                    mengcengStatus: false,
                    status: false,
                    clearCDNstatus:false,
                    id: '',
                    templateID: '',
                    picUrls: []
                },
                templateId: '',
                design_options: [
                    {
                        id: '',
                        val: ''
                    }
                ],
                type_options: [
                    {
                        id: '',
                        val: ''
                    }
                ],
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        created() {
            this.isFirstEnter=true;
        },
        activated(){
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.selectInfo();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;
            this.pageInfo();
        },
        methods: {
            selectInfo() {
                /*类型*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '2'}
                }).then(res => {
//                    console.log(res);
                    var data = res.data;
                    if (data.status == 1) {
                        this.type_options = this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*设计师*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '1'}
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.design_options = this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                /*模板初始化*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.templateListsUrl,
                    params: {
                        type: '2',
                        offset: this.page.offset,
                        limit: this.page.limit,
                        templateType: this.page.templateType,
                        designerID: this.page.designerID
                    }
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.page.count = data.count;
                        this.listInfo = data.list;
                        this.listInfo.forEach((item, i) => {
                            this.listInfo[i].picUrls = this.picSort(item.picUrls, '@#@');
                        });
                    } else {
//                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            select() {
                this.pageInfo();
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.pageInfo();
            },
            template_input(res) {
                if (sessionStorage.userType == '1') {
                    this.$message({
                        type: 'info',
                        message: '您不是设计师，没有此权限'
                    });
                } else {
                    typeof res != 'undefined' ? this.templateId = res : this.templateId='';
                    this.$router.push({
                        path: 'templateInput',
                        query: {templateId: encodeURIComponent(this.templateId)}
                    });
                }
            },
            pic_preview(templateID, picUrls) {
                this.replaceInfo.status = true;
                this.replaceInfo.mengcengStatus = true;
                this.replaceInfo.clearCDNstatus = false;
                this.replaceInfo.picUrls = picUrls;
                this.replaceInfo.templateID = templateID;
            },
            replace_button() {
                this.$http({
                    method: 'post',
                    url: this.apiUrl.landpageUpdateUrl,
                    data: {
                        onlyUpdateTemplateId: true,
                        id: this.replaceInfo.id,
                        templateID: this.replaceInfo.templateID,
                        lastEditerId: sessionStorage.userId
                    }
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '替换成功'
                        });
                        this.replaceInfo.clearCDNstatus = true;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '替换成功'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            clearCDN(id){
                this.$http({
                    method: 'get',
                    url: this.apiUrl.landpageRefreshUrl,
                    params: {id: id}
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '清除成功'
                        });
                        this.exit_replace();
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
            exit_replace() {
                this.replaceInfo.status = false;
                this.replaceInfo.mengcengStatus = false;
            }
        }
    };
</script>
