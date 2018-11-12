<style rel="stylesheet/scss" lang="scss">
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 33%;
    }

</style>

<template>
    <div>
        <div class="info_flow_content">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content">
                    <div class="customerProCitySearch">
                        <el-input v-model="value" class="page_d_select longInput" placeholder="请输入客户名称、联系人或手机号"></el-input><!--
					  -->
                        <el-button class="page_d_s_button" @click="search">搜索</el-button>
                        <!--<el-select v-for="(c, i) in select_items" :key="i" v-model="c.model_value"-->
                                   <!--:placeholder="c.placeHolder" class="con_select unBorderRadius" @change="">-->
                            <!--<el-option-->
                                <!--v-for="item in c.options"-->
                                <!--:key="item.id"-->
                                <!--:label="item.val"-->
                                <!--:value="item.id">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<el-button class="page_d_s_button" @click="">查询</el-button>-->
                        <div class="dateBut">
                            <el-upload
                                class="upload-demo"
                                :action="apiUrl.uploadChannel"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                :on-progress	="uploading"
                                :beforeUpload="beforeAvatarUpload"
                                :onError="uploadError"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button type="primary"><i class="el-icon-plus"></i>导入数据</el-button>
                            </el-upload>
                            <el-button type="primary" @click="newChannel"><i class="el-icon-plus"></i>新建渠道</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info_ad_table">
                <div class="tableDetail ">
                    <el-table
                        v-loading="loading"
                        element-loading-text="拼命上传中"
                        :data="tableData"
                        style="width: 100%"
                        border>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand zhedieform">
                                    <el-form-item label="渠道代码">
                                        <span>{{ props.row.channelCode}}</span>
                                    </el-form-item>
                                    <el-form-item label="账号">
                                        <span>{{ props.row.account}}</span>
                                    </el-form-item>
                                    <el-form-item label="财务类型">
                                        <span v-if="props.row.finType==1">公司</span>
                                        <span v-if="props.row.finType==2">个人</span>
                                    </el-form-item>
                                    <el-form-item label="渠道简称">
                                        <span>{{ props.row.name }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <span>{{ props.row.contact }}</span>
                                    </el-form-item>
                                    <el-form-item label="纳税登记号">
                                        <span>{{ props.row.taxId }}</span>
                                    </el-form-item>
                                    <el-form-item label="渠道主体">
                                        <span><span v-for="item in JSON.parse(props.row.alias)" :key="item.id">{{ item.name+' '}}</span></span>
                                    </el-form-item>
                                    <el-form-item label="手机号码">
                                        <span>{{ props.row.phone }}</span>
                                    </el-form-item>
                                    <el-form-item label="收款银行">
                                        <span>{{ props.row.bank }}</span>
                                    </el-form-item>
                                    <el-form-item label="渠道性质">
                                        <span v-if="props.row.property==1">公司</span>
                                        <span v-if="props.row.property==2">个人</span>
                                    </el-form-item>
                                    <el-form-item label="QQ">
                                        <span>{{ props.row.qq }}</span>
                                    </el-form-item>
                                    <el-form-item label="开户地址">
                                        <span>{{ props.row.accountAddress }}</span>
                                    </el-form-item>
                                    <el-form-item label="营业执照号">
                                        <span>{{ props.row.busNo }}</span>
                                    </el-form-item>
                                    <el-form-item label="邮箱">
                                        <span>{{ props.row.email }}</span>
                                    </el-form-item>
                                    <el-form-item label="银行账号">
                                        <span>{{ props.row.bankAccount}}</span>
                                    </el-form-item>
                                    <el-form-item label="证件有效期">
                                        <span>{{ props.row.cardExpired }}</span>
                                    </el-form-item>
                                    <el-form-item label="地址">
                                        <span>{{ props.row.address}}</span>
                                    </el-form-item>
                                    <el-form-item label="账户预收/抵扣">
                                        <span>{{ props.row.advancePayment }}</span>
                                    </el-form-item>
                                    <el-form-item label="最后更新">
                                        <span>{{ props.row.ltime }}</span>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <span></span>
                                    </el-form-item>
                                    <el-form-item label="账户应收/实收">
                                        <span>{{ props.row.accountPayable }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="渠道代码"
                            prop="channelCode">
                        </el-table-column>
                        <el-table-column
                            label="渠道简称"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="账号"
                            prop="account">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="50"
                            min-width=""
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div @click="exitEvent(scope.row.id)"><i class="el-icon-edit"></i></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con_pager">
                <div class="block">
                    <!--<span class="demonstration">直接前往</span>-->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.currentPage"
                        :page-sizes="page.sizes"
                        :page-size="page.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.count">
                    </el-pagination>
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
                page: {
                    sizes: [10, 20, 30, 50,100,500],
                    offset: 1,
                    limit: 10,
                    count: 0,
                    currentPage: 1,
                    landpageName: ''
                },
                menu_nav: ['CPA数据管理', '渠道信息管理'
                ],
                select_items: [
                    {
                        model_value: '',
                        placeHolder: '客户',
                        options: [
                            {
                                id: '1',
                                val: '1'
                            }
                        ]
                    }
                ],
                tableData: [],
                value:'',
                importTitleStatus: false,
                importTitleTxt: '',
                fileList: [],
                loading: false,
            };
        },
        activated(){
            this.listInfo();
        },
        created() {

        },
        methods: {
            listInfo() {
                /*列表*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelSearch,
                    params: {
                        offset: this.page.offset,
                        limit: this.page.limit,
                        val: this.value,
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.page.count = data.totalNum;
                        data.items.length > 0 ? this.tableData = data.items : null;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                this.page.offset = val;
                this.listInfo();
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.listInfo();
            },
            newChannel(){
                this.$router.push({path: 'channelInfoNew'});
            },
            exitEvent(id){
                this.$router.push({path: 'channelInfoNew',query:{channelId:id}});
            },
            search(){
                if(this.value!=''){
                    this.listInfo();
                }
            },
            exitImportTitle() {
                this.importTitleStatus = false;
                this.listInfo();
            },
        }
    };
</script>
