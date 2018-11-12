<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
            </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style>
    @import './style/index.scss';
</style>
