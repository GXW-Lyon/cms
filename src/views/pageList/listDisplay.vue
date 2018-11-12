<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="content">
            <div class="con_search">
                <div class="con_search_left">
                    <el-select v-model="value.design" placeholder="设计" class="con_select" @change="select">
                        <el-option
                            v-for="item in design_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select><!--
					-->
                    <el-select v-model="value.type" placeholder="类型" class="con_select" @change="select">
                        <el-option
                            v-for="item in type_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select><!--
					-->
                    <el-select v-model="value.product" placeholder="产品" class="con_select" @change="select">
                        <el-option
                            v-for="item in product_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select><!--
					-->
                    <el-select v-model="value.operate" placeholder="运营" class="con_select" @change="select">
                        <el-option
                            v-for="item in operate_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select><!--
					-->
                    <el-select v-model="value.platform" placeholder="投放平台" class="con_select" @change="select">
                        <el-option
                            v-for="item in platform_options"
                            :key="item.id"
                            :label="item.val"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div><!--
                -->
                <div class="con_search_right" @click="content_new">
                    <el-button type="primary"><i class="el-icon-plus"></i>新建落地页</el-button>
                </div><!--
				--><div class="con_search_center">
                      <el-input v-model="page.landpageName" class="page_d_select" placeholder="请输入落地页ID" @keyup.enter.native="listSearch"></el-input><!--
					  --><el-button class="page_d_s_button" @click="listSearch">搜索</el-button>
                </div>
            </div>
            <div class="con_list">
                <el-row>
                    <el-col :span="5" v-for="(c, i) in listInfo" :key="i" :offset="i > 0 ? 2 : 0" :data-id="c.id">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="copyBgCeng"></div>
                            <div class="copy"><span>ID:<em>{{c.id}}</em></span><el-button type="primary" class="button copyBtn" :data-clipboard-text="c.dynamicUrl" @click="copyLink">复制链接</el-button></div>
                            <div class="img_preview"><img v-for="img_src in c.picUrls" :src="img_src.replace(/^\d+@#@/g,'')" class="image">
                            </div>
                            <div style="padding-left: 12px;" class="img_bottom_alt">
                                <span>{{c.name}}</span>
                                <div class="bottom clearfix">
                                    <!--<small style="display: inline-block;margin-right: 5px;">动态链接:</small>--><a style="display:inline-block;width:93%;text-overflow:ellipsis;overflow:hidden;vertical-align:top;" href="javascript:void(0);" @click="linkOpen(c.dynamicUrl)"><i class="link_png"></i>{{c.dynamicUrl}}</a>
                                    <h6></h6>
                                    <div>
                                        <p class="user_info">
                                            <span><i class="user_png"></i>{{c.lastModifier}}</span>
                                            <span><i class="user_time"></i><time class="time"> {{c.lastModifierDT
                                                }}</time></span>
                                        </p>
                                        <p class="edit" style="visibility:hidden;">
                                            <el-button type="primary" class="button"></el-button>
                                        </p>
                                        <p class="edit e_visible" @click="content_edit(c.id)">
                                            <el-button type="primary" class="button">编辑</el-button>
                                        </p>
                                    </div>
                                </div>
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
    import Clipboard from 'clipboard';
    export default {
        data() {
            return {
                listInfo: [
//                    {
//                        name: '',
//                        id:'',
//                        showType: '',
//                        picUrls: [
//                        ],
//                        landPageUrl: '',
//                        lastModifier: '',
//                        lastModifierDT: ''
//                    }
                ],
                page:{
                    offset:1,
                    limit:10,
                    count:0,
                    landpageName:''
                },
                value: {
                    design: '',
                    type: '',
                    product: '',
                    operate: '',
                    platform:''
                },
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
                product_options: [
                    {
                        id: '',
                        val: ''
                    }
                ],
                operate_options: [
                    {
                        id: '',
                        val: ''
                    }
                ],
                platform_options:[
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
                isFirstEnter:false, // 是否第一次进入，默认false
            };
        },
        created() {
            this.isFirstEnter=true;
        },
        activated(){
            if(!this.$route.meta.isBack|| this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.pageInfo();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;
            this.listInit();
        },
        methods: {
            pageInfo() {
                /*设计师*/
                this.$http({
                    method: 'get',
                    url:  this.apiUrl.getListUrl,
                    params:{type:'1'}
                }).then(res => {
//                    console.log(res);
                    var data=res.data;
                    if (data.status == 1) {
                        this.design_options=this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*类型*/
                this.$http({
                    method: 'get',
                    url:  this.apiUrl.getListUrl,
                    params:{type:'2'}
                }).then(res => {
//                    console.log(res);
                    var data=res.data;
                    if (data.status == 1) {
                        this.type_options=this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*产品*/
                this.$http({
                    method: 'get',
                    url:  this.apiUrl.getListUrl,
                    params:{type:'3'}
                }).then(res => {
//                    console.log(res);
                    var data=res.data;
                    if (data.status == 1) {
                        this.product_options=this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                /*运营*/
                this.$http({
                    method: 'get',
                    url:  this.apiUrl.getListUrl,
                    params:{type:'5'}
                }).then(res => {
//                    console.log(res);
                    var data=res.data;
                    if (data.status == 1) {
                        this.operate_options=this.selectPush(data.list);
                    } else {
                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            listInit(){
                /*列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.landpageListUrl,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        productID: this.value.product,
                        desiginerID: this.value.design,
                        type: this.value.type,
                        op: this.value.operate,
                        platform: this.value.platform,
                        landpageName: this.page.landpageName
                    }
                }).then(res => {
                    var data=res.data;
                    if (data.status == 1) {
                        this.page.count=data.count;
                        data.limit>0?this.listInfo=data.list:null;
                        this.listInfo.forEach( ( item, i ) => {
                            this.listInfo[i].picUrls=this.picSort(item.picUrls,'@#@');
                            this.listInfo[i].name+=this.listInfo[i].apk.key;
//                            console.log(item.apk.val);
//                            if(item.apk.val=='https://s.toutiao.com/oK1yq/'){
//                                console.log(item.id);
//                            }
                        } );
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.listInit();
            },
            select() {
                this.listInit();
            },
            listSearch(){
                if(this.page.landpageName==''){
                    this.listInit();
                }else{
                    this.$http({
                        method: 'get',
                        url: this.apiUrl.landpageGetUrl,
                        params: {id: this.page.landpageName},
                    }).then(res => {
                        if (res.status == 200) {
                            this.listInfo=[];
                            this.listInfo.push(res.data);
                            this.listInfo.forEach( ( item, i ) => {
                                this.listInfo[i].picUrls=this.picSort(item.picUrls,'@#@');
                            } );
                            this.listInfo[0].id=this.page.landpageName;
                            this.listInfo[0].lastModifierDT=this.listInfo[0].lastModifyDT;
                            this.listInfo[0].name=this.listInfo[0].pname+this.listInfo[0].apk.key;;
                        } else {
//                        alert('');
                        }
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '该落地页不存在'
                        });
                    });
                }
            },
            content_new() {
                if (sessionStorage.userType == '2') {
                    this.$message({
                        type: 'info',
                        message: '您不是运营，没有此权限'
                    });
                } else{
                    this.$router.push({path: 'pageNew'});
                }
            },
            content_edit(id) {
                if (sessionStorage.userType == '2') {
                    this.$message({
                        type: 'info',
                        message: '您不是运营，没有此权限'
                    });
                } else{
                    this.$router.push({path: 'pageEdit',query:{landpageId:id}});
                }
            },
            linkOpen(link){
                window.open(link);
            },
            copyLink(){
                let _this=this;
                const clipboard = new Clipboard('.copyBtn');
                clipboard.on('success', function (e) {
                    _this.$message({
                        type: 'success',
                        message: '动态链接复制成功'
                    });
                });
                clipboard.on('error', function (e) {
                    _this.$message({
                        type: 'error',
                        message: '复制失败，请手动操作'
                    });
                });

            }
        }
    };
</script>
