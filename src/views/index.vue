<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div>
        <adver-header></adver-header>
        <adver-menu></adver-menu>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
            </router-view>
        </keep-alive>
    </div>
</template>

<script>
    import adverHeader from 'components/dspAdverHeader';
    import adverMenu from 'components/dspAdverMainMenu';
    export default {
        data() {
            return {

            };
        },
        components: {
            adverMenu,
            adverHeader
        },
        created() {
        },
        methods: {

        }
    };
</script>
