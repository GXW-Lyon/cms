<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <div class="info_flow_content" @click="bodyEvent">
            <div class="menuNav">
                <p><i class="nav_index"></i><span v-for="(c, i) in menu_nav" :key="i"><i
                    class="el-icon-arrow-right"></i><em>{{c}}</em></span></p>
            </div>
            <div class="info_ad_search">
                <div class="info_a_s_content">
                    <div class="customerProCitySearch">
                        <el-select v-model="customer_items.model_value"
                                   :placeholder="customer_items.placeHolder" class="con_select unBorderRadius"
                                   clearable>
                            <el-option
                                v-for="item in customer_items.options"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <el-button class="page_d_s_button" @click="pageInfo">查询</el-button>
                        <div class="dateBut" @click="newContract">
                            <el-button type="primary"><i class="el-icon-plus"></i>新建创意</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info_ad_table">
                <div class="page_d_title">
                    <i style="visibility:hidden;"></i><span></span>
                    <div class="tableVisibleMenu">
                        <p class="visibleMenuBut" @click="changeCheckStatus($event)"></p>
                        <div class="visibleMenuSelect" v-if="visibleMenuSelectStatus" @click="preventDefault($event)">
                            <el-checkbox-group
                                v-model="checkedCities"
                                :min="1"
                                @change="checkedChange">
                                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="tableDetail">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column
                            v-for="(c, i) in table_column"
                            :key="i"
                            :fixed="c.fixed"
                            :sortable="c.sortable"
                            :prop="c.prop"
                            :label="c.label"
                            :formatter="c.format"
                            width=""
                            min-width="100"
                            v-if="c.visible">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="140"
                            class-name="exitBut">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="tuiaBtn"  type="primary" @click.stop="editAccount(scope.row.adNo,scope.row.status)">编辑</el-button>
                                    <el-button class="tuiaBtn" type="danger"  @click.stop="deleteAd(scope.row.adNo)">删除</el-button>
                                    <el-button class="tuiaBtn" :type="scope.row.status=='1'?'success':'warning'" @click.stop="changeStatus(scope.row.status,scope.row.adNo)">{{scope.row.status=='0'?'暂停':'运行'}}</el-button>
                                    <!-- <el-button  v-if="!scope.row.deleted" class="tuiaBtn" type="warning" @click.stop="changeStatus(scope.row.status)">已暂停</el-button> -->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            visibleMenuSelectStatus: false,
            checkedCities: ['创建日期', '创意名称', '状态', '渠道', '渠道权重'],
            cities: ['创建日期', '创意名称', '状态', '渠道', '渠道权重'],
            table_column: [
                { fixed: true, prop: 'date', label: '创建日期', sortable: true, visible: true },
                { fixed: true, prop: 'adId', label: '广告ID', sortable: true, visible: true },
                { fixed: true, prop: 'adNo', label: '广告编号', sortable: false, visible: true },
                { fixed: false, prop: 'adName', label: '创意名称', sortable: false, visible: true },
                { fixed: false, prop: 'channel', label: '渠道', sortable: false, visible: true },
                { fixed: false, prop: 'status', label: '状态', sortable: false, visible: true, format: function (row, col) {
                    switch (row.status) {
                        case 0: return '运行中'; break;
                        case 1: return '已暂停'; break;
                    }
                }},
                { fixed: false, prop: 'weight', label: '渠道权重', sortable: false, visible: true },
            ],
            menu_nav: ['推啊数据管理', '创意管理'
            ],
            customer_items: {
                model_value: '',
                placeHolder: '全部渠道',
                options: [
                ]
            },
            tableData: [],
            deleted: '',
            adNo: '',
            chAd:''
        };
    },
    activated () {
        this.channelInfo();
        if(this.customer_items.model_value !=''){
            this.pageInfo();
        };
    },
    created () {
        
    },
    methods: {
        channelInfo () {
            /*渠道*/
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelList,
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    this.customer_items.options = data;
                } else {
                    console.log(error);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*广告列表*/
        pageInfo () {
            if(this.customer_items.model_value == ''){
                this.$message({
                    type: 'warning',
                    message: '请选择渠道！'
                });
                return false;
            }
            this.$http({
                method: 'get',
                url: this.apiUrl.tuiaAdminChannelAdlist,
                params: {
                    channel: this.customer_items.model_value
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data.adListResponse;
                    this.tableData = data;
                } else {
                    console.log(error);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        /*更改状态*/
        changeStatus (status, adNo) {
            var cStatus = status == 1 ? 0 : 1;
            this.$http({
                method: 'put',
                url: this.apiUrl.tuiaAdminChannelAdstatus,
                params: {
                    adNo: adNo,
                    status: cStatus,
                }
            }).then(res => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更改状态成功！'
                        });
                        this.pageInfo();
                    } else if (data.status == 2) {
                        this.$message({
                            type: 'warning',
                            message: data.msg
                        });
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '更改失败，请稍后再试'
                    });
                }
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '更改失败，请稍后再试'
                });
            });
        },
        /*编辑创意*/
        editAccount (id, status) {
            if (status == 0) {
                this.$message({
                    type: 'warning',
                    message: '运行状态不可编辑，请更改状态！'
                });
                return false;
            }
            this.$router.push({
                path: 'ideaEdit',
                query: { id: id, status: status }
            });
        },
        /*删除广告*/
        deleteAd (id) {
            this.$confirm('此操作将永久删除该账单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'delete',
                    url: this.apiUrl.tuiaAdminAdDel,
                    params: { adNo: id },
                }).then(res => {
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
                            this.pageInfo();
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                });
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        checkedChange () {
            for (let item of this.table_column) {
                var index = this.checkedCities.indexOf(item.label);
                index >= 0 ? item.visible = true : item.visible = false;
            }
        },
        changeCheckStatus (e) {
            e.stopPropagation();
            this.visibleMenuSelectStatus = !this.visibleMenuSelectStatus;
        },
        newContract () {
            this.$router.push({ path: 'ideaNew' });
        },
        bodyEvent () {
            this.visibleMenuSelectStatus = false;
        },
        preventDefault (e) {
            e.stopPropagation();
        },
        deleteAccount () {
            this.deleted = !this.deleted;
        },
        exitEvent (id, name) {
            // console.log(id);
            this.$router.push({ path: 'cusContractEdit', query: { customerContractId: id, titleName: name } });
        }
    }
};
</script>

