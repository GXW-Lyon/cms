<template>
    <div>
        <div class="logo"><img src="../static/logo.png"/></div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-blue-dark">
                    <div class="title">康远运营管理平台</div>
                </div>
            </el-col>
        </el-row>
        <div class="bg_ceng"></div>
        <div class="box">
            <div class="logo_box_bg"><img src="../static/denglu_beijing.png"/></div>
            <div class="login_box">
                <div class="login_top">账号密码</div>
                <div class="login_middle">
                    <el-input placeholder="请输入账号" v-model="account" class="el_input">
                        <img src="../static/renwu.png" slot="prepend" class="user">
                    </el-input>
                    <el-input type="password" placeholder="请输入密码" v-model="password" class="el_input" @keyup.enter.native="login">
                        <img src="../static/suo.png" slot="prepend" class="password">
                    </el-input>
                </div>
                <div class="login_bottom">
                    <div class="login_button" @click="login">
                        <div>
                            <img class="playButton" src="../static/denglu.png"/>
                            <span>登录</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import crypto from 'crypto';

    export default {
        data() {
            return {
                account: '',
                password: '',
                md5Password: ''
            };
        },
        created() {
        },
        methods: {
            md(str) {
                var md5 = crypto.createHash('md5');
                md5.update(str);
                return md5.digest('hex');
            },
            login() {
                if (this.account == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入用户名'
                    });
                } else if (this.password == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入密码'
                    });
                } else {
                    this.md5Password = this.md(this.password);
                    this.$http({
                        method: 'post',
                        url: this.apiUrl.userLoginUrl,
                        data: {
                            userName: this.account,
                            pwd: this.md5Password
                        }
                    }).then(res => {
                        var data = res.data;
                        if (data.status == 1) {
                            this.set_storage('userName', data.nick);
                            this.set_storage('userId', data.userId);
                            this.set_storage('userType', data.type);
                            this.setCookie('userId',data.userId,1);
                            switch (data.type){
                                case '1':
                                case '2':
                                case '3':
                                case '8':
                                    this.$router.push({path: '/landpage/pageList'});
                                    break;
                                case '4':
                                case '10':
                                case '12':
                                    this.$router.push({path: '/cpaDataMana/realTimeData'});
                                    break;
                                case '5':
                                    this.$router.push({path: '/areaAD/infoAD'});
                                    break;
                                case '6':
                                case '11':
                                    this.$router.push({path: '/iosDataManage/summaryData'});
                                    break;
                                case '7':
                                case '9':
                                    this.$router.push({path: '/infoDataMana/accountData'});
                                    break;
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: '用户名或密码错误'
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }
        }
    };
</script>
<style rel="stylesheet/css" lang="scss">

</style>
