<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div class="nav">
        <div class="logo"><img :src="logoUrl"/></div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-blue-dark">
                    <div class="title">康远CMS平台</div>
                </div>
            </el-col>
        </el-row>
        <div class="nav_right">
            <div class="nav_user">
                <div>
                    <img :src="touXiangUrl"/>
                    <span>{{userName}}</span>
                </div>
            </div>
            <span class="nav_shuxian"></span>
            <div class="nav_exit" @click="nav_exit">
                <div>
                    <img :src="exitUrl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adverHeader',
        props: {
            userInfo: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {
                logoUrl: require('static/logo.png'),
                touXiangUrl: require('static/touxiang.png'),
                exitUrl: require('static/tuichu.png'),
                userName: ''
            };
        },
        created() {
            this.userName = sessionStorage.userName;
        },
        methods: {
            nav_exit() {
                sessionStorage.clear();
                this.$router.push({path: '/login'});
            }
        }
    };
</script>
