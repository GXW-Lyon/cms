<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="default_template">
            <div class="con_search">
                <div class="con_search_left">
                    <el-select v-model="page.productID" placeholder="产品" class="con_select"
                               @change="selectChange">
                        <el-option
                            v-for="(item,index) in options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div><!--
				-->
                <div class="con_search_right" @click="template_input()">
                    <el-button type="primary"><i class="el-icon-plus"></i>新建预审模板</el-button>
                </div>
            </div>
            <div class="con_list">
                <el-row>
                    <el-col :span="5" v-for="(c, i) in listInfo" :key="i" :offset="i > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="img_preview"><img v-for="img_src in c.picUrls"
                                                          :src="img_src.replace(/^\d+@#@/g,'')" class="image">
                            </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listInfo: [
//                    {
//                        productName:'',
//                        designer:'',
//                        name: '',
//                        showType: '',
//                        picUrls: [
//                        ]
//                    }
                ],
                page: {
                    offset: 1,
                    limit: 10,
                    count: 0,
                    productID: ''
                },
                options: [
                    {
                        id: '',
                        val: ''
                    }
                ],
                templateId:'',
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
            pageInfo() {
                /*模板初始化*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.templateListsUrl,
                    params: {
                        type: '1',
                        offset: this.page.offset,
                        limit: this.page.limit,
                        productID: this.page.productID
                    }
                }).then(res => {
                    var data = res.data;
                    if (data.status == 1) {
                        this.page.count=data.count;
                        this.listInfo = data.list;
                        this.listInfo.forEach( ( item, i ) => {
                            this.listInfo[i].picUrls=this.picSort(item.picUrls,'@#@');
                        } );
                    } else {
//                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            selectInfo(){
                /*产品*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.getListUrl,
                    params: {type: '3'}
                }).then(res => {
//                    console.log(res);
                    var data = res.data;
                    if (data.status == 1) {
                        this.options = this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            selectChange() {
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
                } else{
                    typeof res != 'undefined' ? this.templateId = res : this.templateId='';
                    this.$router.push({
                        path: 'defaultTemplateNew',
                        query: {templateId: encodeURIComponent(this.templateId)}
                    });
                }
            },
        }
    };
</script>
