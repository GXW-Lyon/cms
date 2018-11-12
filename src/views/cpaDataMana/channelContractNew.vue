<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create customerContractNew channelContractNew">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="page_d_title">
                <i></i><span>创建合同信息</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left cpa_page_left" :class="{page_d_con_left_widthAll:!isRightBox}">
                    <div class="banner_part_line page_create_set_line">合同信息</div>
                    <el-form ref="form" :model="channel_from" label-width="125px">
                        <el-form-item label="渠道主体：">
                            <el-select v-model="channel_from.channelCode" placeholder="请选择"
                                       class="f_select1 inlineBlock" @change="checkFrom" :disabled="isabled">
                                <el-option
                                    v-for="(item,index) in options.channel"
                                    :key="item.channelCode"
                                    :label="item.name"
                                    :value="item.channelCode">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="channel_from.isOwner" class="f_radio1 inlineBlock" @change="checkFrom">
                                <el-radio :label="2" :disabled="isabled">甲方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="我方主体：">
                            <el-select v-model="channel_from.kyhdType" placeholder="请选择" class="f_select1 inlineBlock"
                                       @change="checkFrom" :disabled="isabled">
                                <el-option
                                    v-for="(item,index) in options.kyhd"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-radio-group v-model="channel_from.isOwner" class="f_radio1 inlineBlock" @change="checkFrom">
                                <el-radio :label="1" :disabled="isabled">甲方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="合同有效日期：">
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                format="yyyy/MM/dd"
                                @change="dateChange"
                                :picker-options="$store.state.pickerOptions2"
                                :disabled="isabled">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="推广模式：">
                            <el-select v-model="channel_from.marketingMode" placeholder="请选择" class="f_select1"
                                       @change="checkFrom" :disabled="isabled">
                                <el-option
                                    v-for="(item,index) in options.marketing"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="合同编号：">
                            <el-input v-model="channel_from.contractNo" class="" placeholder="请输入合同编号" disabled></el-input>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit" v-if="!isabled">确认</el-button>
                            <el-button @click="go_back()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div><!--
				-->
                <div class="page_d_con_right cpa_page_right" v-if="isRightBox">
                    <div class="page_d_current page_create_current">
                        <div class="current_page_title create_page_title">操作历史记录</div>
                        <div class="current_img">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </div>
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
                isRightBox: false,
                isabled:false,
                menu_nav: ['CPA数据管理', '渠道合同管理','创建合同信息'],
                dateValue:'',
                channel_from: {
                    "beginTime": "",
                    "channelCode": "",
                    "contractNo": "",
                    "endTime": "",
                    "id": '',
                    "isOwner": 1,
                    "kyhdType": "",
                    "marketingMode": ""
                },
                options: {
                    channel: [],
                    kyhd: [
                        {
                            id: 'Y1',
                            val: '深圳康远互动科技有限公司'
                        },
                        {
                            id: 'Y2',
                            val: '霍尔果斯康远互动网络科技有限公司'
                        },
                        {
                            id: 'Y3',
                            val: '上海贝玩网络科技有限公司'
                        },
                        {
                            id: 'Y4',
                            val: '深圳自由泰格互动科技有限公司'
                        },
                    ],
                    product: [
                        {
                            placeHolder: '请选择',
                            model_value: {},
                            items: []
                        }
                    ],
                    marketing: [
                        {
                            id: 'CA',
                            val: 'CPA'
                        },
                        {
                            id: 'CD',
                            val: 'CPD'
                        },
                        {
                            id: 'CM',
                            val: 'CPM'
                        },
                        {
                            id: 'CC',
                            val: 'CPC'
                        },
                        {
                            id: 'CS',
                            val: 'CPS'
                        },
                        {
                            id: 'CT',
                            val: 'CPT'
                        },
                        {
                            id: 'CP',
                            val: 'CPPA '
                        },
                    ]
                },
                channelContractId: '',
                pageTitle: '创建合同信息',
            };
        },
        created() {
            this.channelSelect();
            this.channelContractId = this.$route.query.channelContractId;
            if (this.channelContractId != '') {
                this.pageInfo();
                this.pageTitle = '编辑合同信息';
                this.isabled=true;
//                this.isRightBox = this.dateStatus = true;
            }
        },
        methods: {
            channelSelect() {
                /*渠道*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelSearch,
                    params: {
                        offset: 1,
                        limit: 9999,
                        val: '',
                    }
                }).then(res => {
//                    console.log(res);
                    if (res.status == 200) {
                        var data = res.data;
                        this.options.channel = data.items;
                    } else {
//                        console.log('');
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            pageInfo() {
                /*合同*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.channelConGet,
                    params: {id: this.channelContractId}
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        this.channel_from = data;
                        this.dateValue = [new Date(this.channel_from.beginTime), new Date(this.channel_from.endTime)];
                    } else {
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            addRow() {
                this.options.product.push(this.options.product[0]);
            },
            checkFrom() {
                var obj = this.channel_from;
                if (obj.channelCode != '' && obj.kyhdType != '' &&  obj.beginTime != '' && obj.marketingMode != '') {
                    var year = Math.ceil(this.datedifference(obj.beginTime, obj.endTime) / 365);
                    var beginT = obj.beginTime.replace(/-/g, '');
//                    console.log(obj.productItems);
                    if (obj.isOwner == 1) {
                        this.channel_from.contractNo = obj.kyhdType + obj.channelCode  + obj.marketingMode + beginT + year;
                    } else if (this.channel_from.isOwner == 2) {
                        this.channel_from.contractNo = obj.channelCode + obj.kyhdType  + obj.marketingMode + beginT + year;
                    }
                } else {
//                    console.log(false);
                    this.channel_from.contractNo = '';
                }
            },
            onSubmit() {
                var url=this.apiUrl.channelConNew;
                this.channelContractId != ''?url=this.apiUrl.channelConUpdate:null;
                this.$http({
                    method: 'post',
                    url: url,
                    data: this.channel_from,
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.go_back();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败，请完善信息，并重新提交'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '请完善信息，并重新提交'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
            dateChange() {
                var date = this.dateValue;
                if (date.length > 0) {
                    this.channel_from.beginTime = this.formatDateTime(date[0], 'y-m-d');
                    this.channel_from.endTime = this.formatDateTime(date[1], 'y-m-d');
                }
                this.checkFrom();
            }
        }
    };
</script>
