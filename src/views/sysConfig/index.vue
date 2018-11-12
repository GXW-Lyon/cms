<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="page_create sysConfig">
            <div class="page_d_title">
                <i></i><span>系统配置</span>
            </div>
            <div class="page_d_con">
                <div class="page_d_con_left">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(item,i) in tabs" :key="i" :label=item.label :name=item.name></el-tab-pane>
                    </el-tabs>
                    <el-form ref="form" :model="config" label-width="180px">
                        <el-form-item label="屏蔽城市：">
                            <el-select v-model="areaList.commonAreas" multiple placeholder="请选择"
                                       class="f_select3">
                                <el-option
                                    v-for="(item,index) in config.areaConfig.commonAreas"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-input v-model="addCity.commonAreas" placeholder="输入省/城市" class="week"></el-input>
                            <el-button type="primary" @click="addCityFun(addCity.commonAreas,'commonAreas')">添加</el-button>
                        </el-form-item>
                        <el-form-item label="周时间段增加屏蔽城市：" style="height:auto;">
                            周&nbsp;<el-input v-model="weekStart" placeholder="" class="week" type="number" max="7" min="1"></el-input>
                            <el-time-select
                                placeholder="起始时间"
                                v-model="startTime"
                                :picker-options="{
start: '00:00',
step: '00:30',
end: '23:30'
                                }">
                            </el-time-select>
                            - -
                            周&nbsp;<el-input v-model="weekEnd" placeholder="" class="week" type="number" max="7" min="1"></el-input>
                            <el-time-select
                                placeholder="结束时间"
                                v-model="endTime"
                                :picker-options="{
start: '00:00',
step: '00:30',
end: '23:30'
                                }">
                            </el-time-select>
                            <el-select v-model="areaList.timingDateAreas" multiple placeholder="请选择"
                                       class="f_select3">
                                <el-option
                                    v-for="(item,index) in config.areaConfig.timingDateAreas"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-input v-model="addCity.timingDateAreas" placeholder="输入省/城市" class="week"></el-input>
                            <el-button type="primary" @click="addCityFun(addCity.timingDateAreas,'timingDateAreas')">添加</el-button>
                        </el-form-item>
                        <el-form-item label="日期时间段增加屏蔽城市：">
                            <div class="block">
                                <el-date-picker
                                    v-model="dateTimeValue"
                                    type="datetimerange"
                                    range-separator=" 至 "
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <el-select v-model="areaList.exactDateAreas" multiple placeholder="请选择"
                                       class="f_select3">
                                <el-option
                                    v-for="(item,index) in config.areaConfig.exactDateAreas"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-input v-model="addCity.exactDateAreas" placeholder="输入省/城市" class="week"></el-input>
                            <el-button type="primary" @click="addCityFun(addCity.exactDateAreas,'exactDateAreas')">添加</el-button>
                        </el-form-item>
                        <el-form-item label="是否开启低俗功能：">
                            <el-tooltip :content="'该功能处于' + switchAlt+'状态'" placement="top">
                                <el-switch
                                    v-model="config.globalSwitch"
                                    on-color="#13ce66"
                                    off-color="#ff4949"
                                    :on-value="onValue"
                                    :off-value="offValue"
                                    @change="switchChange">
                                </el-switch>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item class="form_button">
                            <el-button type="primary" @click="onSubmit">确认</el-button>
                            <!--<el-button @click="go_back()">返回</el-button>-->
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs:[
                    {
                        label:'wifi',
                        name:'0'
                    },
                    {
                        label:'猎豹',
                        name:'1'
                    },
                    {
                        label:'趣头条',
                        name:'2'
                    },
                    {
                        label:'铁血军事',
                        name:'3'
                    },
                    {
                        label:'喜马拉雅',
                        name:'4'
                    },
                    {
                        label:'东方头条',
                        name:'5'
                    },
                    {
                        label:'B站',
                        name:'6'
                    },
                    {
                        label:'淘新闻',
                        name:'7'
                    },
                    {
                        label:'网易云音乐',
                        name:'8'
                    },
                ],
                activeName:'0',
                switchAlt:'',
                addCity:{
                    commonAreas:'',
                    timingDateAreas:'',
                    exactDateAreas:''
                },
                weekStart:'',
                weekEnd:'',
                startTime:'',
                endTime:'',
                weekValue: [],
                dateTimeValue: [new Date('2017-12-07 0:00'),new Date('2018-01-09 0:00')],
                config:{
                    "globalSwitch": 'false',
                    "areaConfig": {
                        "commonAreas": [
                        ],
                        "timingDate": "5 07:00,1 07:00",
                        "timingDateAreas": [
                            "南京"
                        ],
                        "exactDate": "2018-10-11 07:00,2018-11-01 07:00",
                        "exactDateAreas": [
                            "成都",
                            "西安",
                            "南京"
                        ]
                    }
                },
                configMap:{},
                areaList:{
                    commonAreas:[],
                    timingDateAreas:[],
                    exactDateAreas:[],
                },
                onValue:'true',
                offValue:'false'
            };
        },
        activated(){
            this.pageInfo();
        },
        created() {
//            this.pageInfo();
        },
        methods: {
            handleClick(tab, event) {
                this.pageInfo();
            },
            pageInfo() {
                /*获取config*/
                this.$http({
                    method: 'get',
                    url: this.apiUrl.landpageConfigUrl,
                    params:{
                        platform:this.activeName
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var data=res.data;
                        this.configMap=data;
                        this.config.globalSwitch = data.globalSwitchMap[this.activeName];
                        this.config.areaConfig = data.areaConfigMap[this.activeName];
                        this.configInfo();
                    } else {
//                        console.log(data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            configInfo(){
                this.config.globalSwitch=String(this.config.globalSwitch);
                this.config.globalSwitch=='true'?this.switchAlt='打开':this.switchAlt='关闭';
                this.areaList.commonAreas=this.config.areaConfig.commonAreas;
                this.areaList.timingDateAreas=this.config.areaConfig.timingDateAreas;
                this.areaList.exactDateAreas=this.config.areaConfig.exactDateAreas;
                var weeks=this.config.areaConfig.timingDate.split(',');
                this.weekStart=weeks[0].split(' ')[0];
                this.weekEnd=weeks[1].split(' ')[0];
                var timeStart=weeks[0].split(' ')[1];
                var timeEnd=weeks[1].split(' ')[1];
                this.startTime=timeStart.split(':')[0]+':'+timeStart.split(':')[1];
                this.endTime=timeEnd.split(':')[0]+':'+timeEnd.split(':')[1];
                var dateTimes=this.config.areaConfig.exactDate.split(',');
                this.dateTimeValue=[new Date(dateTimes[0]),new Date(dateTimes[1])];
            },
            addCityFun(val,para){
                if(val!=''){
                    this.config.areaConfig[para].push(val);
                    this.addCity[para]='';
                }
            },
            onSubmit() {
                if(sessionStorage.userType!=3){
                    this.$message({
                        type: 'info',
                        message: '您没有修改权限'
                    });
                    return false;
                }
                if(this.startTime!=''&&this.endTime!=''){
                    this.config.areaConfig.timingDate=this.weekStart+' '+this.startTime+','+this.weekEnd+' '+this.endTime;
                }
                if(this.dateTimeValue.length>0){
                    this.config.areaConfig.exactDate=this.formatDateTime(this.dateTimeValue[0],'y-m-d h-m')+','+this.formatDateTime(this.dateTimeValue[1],'y-m-d h-m');
                }
                this.config.areaConfig.commonAreas=this.areaList.commonAreas;
                this.config.areaConfig.timingDateAreas=this.areaList.timingDateAreas;
                this.config.areaConfig.exactDateAreas=this.areaList.exactDateAreas;
                this.configMap.globalSwitchMap[this.activeName]=this.config.globalSwitch;
                this.configMap.areaConfigMap[this.activeName]=this.config.areaConfig;
                /*更新config*/
                this.$confirm('此操作是对落地页的全局配置, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'post',
                        url: this.apiUrl.landpageConfigUrl+'?platform='+this.activeName,
                        data:this.configMap
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '更新成功'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '更新失败'
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                        this.$message({
                            type: 'error',
                            message: '更新失败'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消更改'
                    });
                });
            },
            go_back() {
                this.$router.back();
            },
            switchChange(){
                this.config.globalSwitch=='true'?this.switchAlt='打开':this.switchAlt='关闭';
            }
        }
    };
</script>
