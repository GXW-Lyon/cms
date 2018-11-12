<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <div>
        <div class="menu">
            <div v-for="(item,oneIndex) in menu_items" v-if="item.isVisibility">
                <div class="menu_first" @click="oneMenu_click(oneIndex)">
                    <i class="menu_icon_l" :class="item.classname"></i><!--
				--><span>{{item.name}}</span><!--
				--><i class="menu_icon_r"></i>
                </div>
                <ul class="menu_second" v-if="item.isSelected">
                    <li v-for="(c,twoIndex) in item.children_menu_items" v-bind:class="{nav_active:c.isSelected}"
                        @click="menu_click(oneIndex,twoIndex)"
                        v-if="c.isVisibility">
                        {{c.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adverMenu',
        props: {},
        data() {
            return {
                menu_items: [
                    {
                        name: '落地页管理',
                        classname: 'langPageIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/landpage',
                        children_menu_items: [
                            {name: '落地页列表', isSelected: false, isVisibility: true, path: '/pageList'},
                            {name: '预审模板库', isSelected: false, isVisibility: true, path: '/defaultTemplate'},
                            {name: '模板库', isSelected: false, isVisibility: true, path: '/templateList'},
                            {name: '系统配置', isSelected: false, isVisibility: false, path: '/sysConfig'},
                            {name: '产品管理', isSelected: false, isVisibility: false, path: '/proConfig'},
                        ]
                    },
                    {
                        name: 'CPA数据管理',
                        classname: 'cpaDataManaIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/cpaDataMana',
                        children_menu_items: [
                            {name: '实时数据', isSelected: false, isVisibility: true, path: '/realTimeData'},
                            {name: '实时数据刷新', isSelected: false, isVisibility: true, path: '/realTimeDataUpdate'},
                            {name: '客户信息管理', isSelected: false, isVisibility: true, path: '/customerInfoMana'},
                            {name: '客户产品管理', isSelected: false, isVisibility: true, path: '/customerProMana'},
                            {name: '客户合同管理', isSelected: false, isVisibility: true, path: '/customerContractMana'},
                            {name: '渠道信息管理', isSelected: false, isVisibility: true, path: '/channelInfoMana'},
                            {name: '渠道产品管理', isSelected: false, isVisibility: true, path: '/channelProMana'},
                            {name: '渠道合同管理', isSelected: false, isVisibility: true, path: '/channelContractMana'},
                            {name: '客户对账', isSelected: false, isVisibility: true, path: '/customerAccountBill'},
                            {name: '客户结算', isSelected: false, isVisibility: true, path: '/customerAccount'},
                            {name: '客户预收', isSelected: false, isVisibility: true, path: '/customerCollect'},
                            {name: '客户预收管理', isSelected: false, isVisibility: true, path: '/customerCollectMana'},
                            {name: '渠道对账', isSelected: false, isVisibility: true, path: '/channelAccountBill'},
                            {name: '渠道结算', isSelected: false, isVisibility: true, path: '/channelAccount'},
                            {name: '渠道预付', isSelected: false, isVisibility: true, path: '/channelPay'},
                            {name: '渠道预付管理', isSelected: false, isVisibility: true, path: '/channelPayMana'},
                            {name: '客户批量改价格', isSelected: false, isVisibility: true, path: '/changePrices'},
                            {name: '渠道批量改价格', isSelected: false, isVisibility: true, path: '/changeChannelPrices'},
                            {name: '内容抓取', isSelected: false, isVisibility: true, path: '/contentGrab'},
                        ]
                    },
                    {
                        name: '地域广告',
                        classname: 'areaAdIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/areaAD',
                        children_menu_items: [
                            {name: '信息流广告', isSelected: false, isVisibility: true, path: '/infoAD'},
                            {name: '详情页广告', isSelected: false, isVisibility: true, path: '/detailAD'},
                        ]
                    },
                    {
                        name: 'IOS数据管理',
                        classname: 'iosDataIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/iosDataManage',
                        children_menu_items: [
                            {name: '概述数据', isSelected: false, isVisibility: true, path: '/summaryData'},
                            {name: '详细数据', isSelected: false, isVisibility: true, path: '/detailData'},
                        ]
                    },
                    {
                        name: '信息流数据管理',
                        classname: 'infoDataIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/infoDataMana',
                        children_menu_items: [
                            {name: '账号数据', isSelected: false, isVisibility: true, path: '/accountData'},
                            {name: '账号管理', isSelected: false, isVisibility: true, path: '/accountMana'},
                            {name: '产品管理', isSelected: false, isVisibility: true, path: '/proMana'},
                            {name: '客户管理', isSelected: false, isVisibility: true, path: '/customerMana'},
                            {name: '平台管理', isSelected: false, isVisibility: true, path: '/platformMana'},
                            {name: '客户合同管理', isSelected: false, isVisibility: true, path: '/cusContractMana'},
                            {name: '平台合同管理', isSelected: false, isVisibility: true, path: '/platformContractMana'},
                            {name: '客户预收', isSelected: false, isVisibility: true, path: '/cusCollect'},
                            {name: '客户对账', isSelected: false, isVisibility: true, path: '/cusAccountBill'},
                            {name: '客户结算单', isSelected: false, isVisibility: true, path: '/cusAccount'},
                            {name: '客户预收结算单', isSelected: false, isVisibility: true, path: '/cusCollecAccount'},
                            {name: '平台对账', isSelected: false, isVisibility: true, path: '/platformAccountBill'},
                            {name: '平台结算单', isSelected: false, isVisibility: true, path: '/platformAccount'},
                            {name: '人员绩效管理', isSelected: false, isVisibility: false, path: '/performance'},
                        ]
                    },
                    {
                        name: '推啊数据管理',
                        classname: 'tuiaIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/tuia',
                        children_menu_items: [
                            {name: '详细数据', isSelected: false, isVisibility: true, path: '/detailData'},
                            {name: '游戏数据', isSelected: false, isVisibility: true, path: '/gameData'},
                            {name: '广告数据', isSelected: false, isVisibility: true, path: '/adData'},
                            {name: '创意管理', isSelected: false, isVisibility: true, path: '/ideaMana'},
                            {name: '渠道每日数据', isSelected: false, isVisibility: true,path:'/channelData'}
                        ]
                    },
                    {
                        name: '口袋头条数据管理',
                        classname: 'koudaiIcon',
                        isSelected: false,
                        isVisibility: false,
                        path: '/koudai',
                        children_menu_items: [
                            {name: '批量提现', isSelected: false, isVisibility: true, path: '/putForward'},
                        ]
                    },
                ]
            };
        },
        created() {
            switch (sessionStorage.userType) {
                case '1':
                case '2':
                    this.menu_items[0].isVisibility = true;
                    break;
                case '3':
                    this.menu_items[0].isVisibility = true;
                    this.menu_items[1].isVisibility = true;
                    this.menu_items[2].isVisibility = true;
                    this.menu_items[3].isVisibility = true;
                    this.menu_items[4].isVisibility = true;
                    this.menu_items[5].isVisibility = true;
                    this.menu_items[6].isVisibility = true;
                    this.menu_items[0].children_menu_items[3].isVisibility = true;
                    this.menu_items[0].children_menu_items[4].isVisibility = true;
                    this.menu_items[4].children_menu_items[13].isVisibility = true;
                    break;
                case '4':
                    this.menu_items[1].isVisibility = true;
                    break;
                case '5':
                    this.menu_items[2].isVisibility = true;
                    break;
                case '6':
                    this.menu_items[3].isVisibility = true;
                    break;
                case '7':
                    this.menu_items[4].isVisibility = true;
                    break;
                case '8':
                    this.menu_items[0].isVisibility = true;
                    this.menu_items[4].isVisibility = true;
                case '9':
                    this.menu_items[4].isVisibility = true;
                    this.menu_items[5].isVisibility = true;
                case '10':
                    this.menu_items[1].isVisibility = true;
                    this.menu_items[4].isVisibility = true;
                case '11':
                    this.menu_items[3].isVisibility = true;
                    this.menu_items[4].isVisibility = true;
                case '12':
                    this.menu_items[1].isVisibility = true;
                    this.menu_items[3].isVisibility = true;
                    this.menu_items[4].isVisibility = true;
            }
            var path = this.$router.currentRoute.path;
            var pathArr = path.split('/');
            switch (pathArr[1]) {
                case 'landpage':
                    var menuItem = this.menu_items[0];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'pageList':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'pageNew':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'pageEdit':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'defaultTemplate':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'defaultTemplateNew':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'templateList':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'templateInput':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'sysConfig':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'proConfig':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                    }
                    break;
                case 'cpaDataMana':
                    var menuItem = this.menu_items[1];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'realTimeData':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'realTimeDataUpdate':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'customerInfoMana':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'customerInfoNew':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'customerProMana':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'customerProNew':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'customerContractMana':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                        case 'customerContractNew':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                        case 'channelInfoMana':
                            this.content_items_each(menuItem.children_menu_items, 5);
                            break;
                        case 'channelInfoNew':
                            this.content_items_each(menuItem.children_menu_items, 5);
                            break;
                        case 'channelProMana':
                            this.content_items_each(menuItem.children_menu_items, 6);
                            break;
                        case 'channelProNew':
                            this.content_items_each(menuItem.children_menu_items, 6);
                            break;
                        case 'channelContractMana':
                            this.content_items_each(menuItem.children_menu_items, 7);
                            break;
                        case 'channelContractNew':
                            this.content_items_each(menuItem.children_menu_items, 7);
                            break;
                        case 'customerAccountBill':
                            this.content_items_each(menuItem.children_menu_items, 8);
                            break;
                        case 'customerAccount':
                            this.content_items_each(menuItem.children_menu_items, 9);
                            break;
                        case 'customerCollect':
                            this.content_items_each(menuItem.children_menu_items, 10);
                            break;
                        case 'customerCollectMana':
                            this.content_items_each(menuItem.children_menu_items, 11);
                            break;
                        case 'channelAccountBill':
                            this.content_items_each(menuItem.children_menu_items, 12);
                            break;
                        case 'channelAccount':
                            this.content_items_each(menuItem.children_menu_items, 13);
                            break;
                        case 'channelPay':
                            this.content_items_each(menuItem.children_menu_items, 14);
                            break;
                        case 'channelPayMana':
                            this.content_items_each(menuItem.children_menu_items, 15);
                            break;
                        case 'changePrices':
                            this.content_items_each(menuItem.children_menu_items, 16);
                            break;
                        case 'changeChannelPrices':
                            this.content_items_each(menuItem.children_menu_items, 17);
                            break;
                        case 'contentGrab':
                            this.content_items_each(menuItem.children_menu_items, 18);
                            break;
                    }
                    break;
                case 'areaAD':
                    var menuItem = this.menu_items[2];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'infoAD':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'detailAD':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                    }
                    break;
                case 'iosDataManage':
                    var menuItem = this.menu_items[3];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'summaryData':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'detailData':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                    }
                    break;
                case 'infoDataMana':
                    var menuItem = this.menu_items[4];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'accountData':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'accountMana':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'accountManaNew':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'accountManaEdit':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'proMana':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'proManaNew':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'proManaEdit':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'customerMana':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'cusInfoNew':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'customerInfoEdit':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'platformMana':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                        case 'cusContractMana':
                            this.content_items_each(menuItem.children_menu_items, 5);
                            break;
                        case 'cusContractNew':
                            this.content_items_each(menuItem.children_menu_items, 5);
                            break;
                        case 'cusContractEdit':
                            this.content_items_each(menuItem.children_menu_items, 5);
                            break;
                        case 'platformContractMana':
                            this.content_items_each(menuItem.children_menu_items, 6);
                            break;
                        case 'platformConNew':
                            this.content_items_each(menuItem.children_menu_items, 6);
                            break;
                        case 'platformConEdit':
                            this.content_items_each(menuItem.children_menu_items, 6);
                            break;
                        case 'cusCollect':
                            this.content_items_each(menuItem.children_menu_items, 7);
                            break;
                        case 'cusAccountBill':
                            this.content_items_each(menuItem.children_menu_items, 8);
                            break;
                        case 'cusAccount':
                            this.content_items_each(menuItem.children_menu_items, 9);
                            break;
                        case 'cusCollecAccount':
                            this.content_items_each(menuItem.children_menu_items, 10);
                            break;
                        case 'platformAccountBill':
                            this.content_items_each(menuItem.children_menu_items, 11);
                            break;
                        case 'platformAccount':
                            this.content_items_each(menuItem.children_menu_items, 12);
                            break;
                        case 'performance':
                            this.content_items_each(menuItem.children_menu_items, 13);
                            break;
                    }
                    break;
                case 'tuia':
                    var menuItem = this.menu_items[5];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'detailData':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                        case 'gameData':
                            this.content_items_each(menuItem.children_menu_items, 1);
                            break;
                        case 'adData':
                            this.content_items_each(menuItem.children_menu_items, 2);
                            break;
                        case 'ideaMana':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'ideaNew':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'ideaEdit':
                            this.content_items_each(menuItem.children_menu_items, 3);
                            break;
                        case 'channelData':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                        case 'channelDataNew':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                        case 'channelDataEdit':
                            this.content_items_each(menuItem.children_menu_items, 4);
                            break;
                    }
                    break;
                case 'koudai':
                    var menuItem = this.menu_items[6];
                    menuItem.isSelected = true;
                    switch (pathArr[2]) {
                        case 'putForward':
                            this.content_items_each(menuItem.children_menu_items, 0);
                            break;
                    }
                    break;
            }
        },
        methods: {
            content_items_each(arr, index) {
                for (let i in arr) {
                    if (i == index) {
                        arr[i].isSelected = true;
                    } else {
                        arr[i].isSelected = false;
                    }
                }
            },
            menu_click(oneIndex, twoIndex) {
                var items = this.menu_items[oneIndex].children_menu_items;
                for (let item of this.menu_items) {
                    this.content_items_each(item.children_menu_items, -1);
                }
                items[twoIndex].isSelected = true;
                this.$router.push({path: this.menu_items[oneIndex].path + items[twoIndex].path});
            },
            oneMenu_click(oneIndex) {
                if (this.menu_items[oneIndex].isSelected) {
                    this.menu_items[oneIndex].isSelected = !this.menu_items[oneIndex].isSelected;
                } else {
                    this.content_items_each(this.menu_items, oneIndex);
                }
            }
        },
    };
</script>
