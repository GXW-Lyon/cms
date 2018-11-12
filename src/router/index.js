export default [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },
    {
        meta: {
            title: '登录',
            noRequestApprove: true,
            keepAlive: false,
            isBack:false,
        },
        path: '/login',
        name:'login',
        component: resolve => require(['views/login'], resolve)
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive: false,
            isBack:false,
        },
        path: '/landpage',
        name: 'landpage',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '落地页列表', keepAlive:true,isBack:false,},
                path: 'pageList',
                name:'pageList',
                component: resolve => require(['views/pageList/listDisplay'], resolve),
            },
            {
                meta: {title: '新建落地页', keepAlive: false,isBack:false,},
                path: 'pageNew',
                name: 'pageNew',
                component: resolve => require(['views/pageList/listNew'], resolve),
            },
            {
                meta: {title: '落地页编辑', keepAlive: false,isBack:false,},
                path: 'pageEdit',
                name: 'pageEdit',
                component: resolve => require(['views/pageList/listEdit'], resolve),
            },
            {
                meta: {title: '模板库', keepAlive:true,isBack:false,},
                path: 'templateList',
                name: 'templateList',
                component: resolve => require(['views/imgTemplate/templateDisplay'], resolve),
            },
            {
                meta: {title: '模板库录入', keepAlive: false,isBack:false,},
                path: 'templateInput',
                name: 'templateInput',
                component: resolve => require(['views/imgTemplate/templateInput'], resolve),
            },
            {
                meta: {title: '预审模板库', keepAlive:true,isBack:false,},
                path: 'defaultTemplate',
                name: 'defaultTemplate',
                component: resolve => require(['views/defaultTemplate'], resolve),
            },
            {
                meta: {title: '预审模板库录入',keepAlive:false,isBack:false,},
                path: 'defaultTemplateNew',
                name: 'defaultTemplateNew',
                component: resolve => require(['views/defaultTemplate/defaultTemplateNew'], resolve),
            },
            {
                meta: {title: '系统配置',keepAlive:true,isBack:false,},
                path: 'sysConfig',
                name: 'sysConfig',
                component: resolve => require(['views/sysConfig'], resolve),
            },
            {
                meta: {title: '产品管理',keepAlive:true,isBack:false,},
                path: 'proConfig',
                name: 'proConfig',
                component: resolve => require(['views/proConfig'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/cpaDataMana',
        name: 'cpaDataMana',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '实时数据',keepAlive:true,isBack:false,},
                path: 'realTimeData',
                name: 'realTimeData',
                component: resolve => require(['views/cpaDataMana/realTimeData'], resolve),
            },
            {
                meta: {title: '实时数据刷新',keepAlive:true,isBack:false,},
                path: 'realTimeDataUpdate',
                name: 'realTimeDataUpdate',
                component: resolve => require(['views/cpaDataMana/realTimeDataUpdate'], resolve),
            },
            {
                meta: {title: '客户产品管理',keepAlive:true,isBack:false,},
                path: 'customerProMana',
                name: 'customerProMana',
                component: resolve => require(['views/cpaDataMana/customerProMana'], resolve),
            },
            {
                meta: {title: '新建客户产品',keepAlive:false,isBack:false,},
                path: 'customerProNew',
                name: 'customerProNew',
                component: resolve => require(['views/cpaDataMana/customerProNew'], resolve),
            },
            {
                meta: {title: '渠道产品管理',keepAlive:true,isBack:false,},
                path: 'channelProMana',
                name: 'channelProMana',
                component: resolve => require(['views/cpaDataMana/channelProMana'], resolve),
            },
            {
                meta: {title: '新建渠道产品',keepAlive:false,isBack:false,},
                path: 'channelProNew',
                name: 'channelProNew',
                component: resolve => require(['views/cpaDataMana/channelProNew'], resolve),
            },
            {
                meta: {title: '客户信息管理',keepAlive:true,isBack:false,},
                path: 'customerInfoMana',
                name: 'customerInfoMana',
                component: resolve => require(['views/cpaDataMana/customerInfoMana'], resolve),
            },
            {
                meta: {title: '新建客户信息',keepAlive:false,isBack:false,},
                path: 'customerInfoNew',
                name: 'customerInfoNew',
                component: resolve => require(['views/cpaDataMana/customerInfoNew'], resolve),
            },
            {
                meta: {title: '客户合同管理',keepAlive:true,isBack:false,},
                path: 'customerContractMana',
                name: 'customerContractMana',
                component: resolve => require(['views/cpaDataMana/customerContractMana'], resolve),
            },
            {
                meta: {title: '新建客户合同',keepAlive:false,isBack:false,},
                path: 'customerContractNew',
                name: 'customerContractNew',
                component: resolve => require(['views/cpaDataMana/customerContractNew'], resolve),
            },
            {
                meta: {title: '渠道信息管理',keepAlive:true,isBack:false,},
                path: 'channelInfoMana',
                name: 'channelInfoMana',
                component: resolve => require(['views/cpaDataMana/channelInfoMana'], resolve),
            },
            {
                meta: {title: '新建渠道信息',keepAlive:false,isBack:false,},
                path: 'channelInfoNew',
                name: 'channelInfoNew',
                component: resolve => require(['views/cpaDataMana/channelInfoNew'], resolve),
            },
            {
                meta: {title: '渠道合同管理',keepAlive:true,isBack:false,},
                path: 'channelContractMana',
                name: 'channelContractMana',
                component: resolve => require(['views/cpaDataMana/channelContractMana'], resolve),
            },
            {
                meta: {title: '新建渠道合同',keepAlive:false,isBack:false,},
                path: 'channelContractNew',
                name: 'channelContractNew',
                component: resolve => require(['views/cpaDataMana/channelContractNew'], resolve),
            },
            {
                meta: {title: '客户对账',keepAlive:true,isBack:false,},
                path: 'customerAccountBill',
                name: 'customerAccountBill',
                component: resolve => require(['views/cpaDataMana/customerAccountBill'], resolve),
            },
            {
                meta: {title: '客户结算',keepAlive:true,isBack:false,},
                path: 'customerAccount',
                name: 'customerAccount',
                component: resolve => require(['views/cpaDataMana/customerAccount'], resolve),
            },
            {
                meta: {title: '客户预收',keepAlive:true,isBack:false,},
                path: 'customerCollect',
                name: 'customerCollect',
                component: resolve => require(['views/cpaDataMana/customerCollect'], resolve),
            },
            {
                meta: {title: '客户预收管理',keepAlive:true,isBack:false,},
                path: 'customerCollectMana',
                name: 'customerCollectMana',
                component: resolve => require(['views/cpaDataMana/customerCollectMana'], resolve),
            },
            {
                meta: {title: '渠道对账',keepAlive:true,isBack:false,},
                path: 'channelAccountBill',
                name: 'channelAccountBill',
                component: resolve => require(['views/cpaDataMana/channelAccountBill'], resolve),
            },
            {
                meta: {title: '渠道结算',keepAlive:true,isBack:false,},
                path: 'channelAccount',
                name: 'channelAccount',
                component: resolve => require(['views/cpaDataMana/channelAccount'], resolve),
            },
            {
                meta: {title: '渠道预付',keepAlive:true,isBack:false,},
                path: 'channelPay',
                name: 'channelPay',
                component: resolve => require(['views/cpaDataMana/channelPay'], resolve),
            },
            {
                meta: {title: '渠道预付管理',keepAlive:true,isBack:false,},
                path: 'channelPayMana',
                name: 'channelPayMana',
                component: resolve => require(['views/cpaDataMana/channelPayMana'], resolve),
            },
            {
                meta: {title: '客户批量改价格',keepAlive:true,isBack:false,},
                path: 'changePrices',
                name: 'changePrices',
                component: resolve => require(['views/cpaDataMana/changePrices'], resolve),
            },
            {
                meta: {title: '渠道批量改价格',keepAlive:true,isBack:false,},
                path: 'changeChannelPrices',
                name: 'changeChannelPrices',
                component: resolve => require(['views/cpaDataMana/changeChannelPrices'], resolve),
            },
            {
                meta: {title: '内容抓取',keepAlive:true,isBack:false,},
                path: 'contentGrab',
                name: 'contentGrab',
                component: resolve => require(['views/cpaDataMana/contentGrab'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/areaAD',
        name: 'areaAD',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '信息流广告',keepAlive:true,isBack:false,},
                path: 'infoAD',
                name: 'infoAD',
                component: resolve => require(['views/areaAD/infoFlowAD'], resolve),
            },
            {
                meta: {title: '详情页广告',keepAlive:true,isBack:false,},
                path: 'detailAD',
                name: 'detailAD',
                component: resolve => require(['views/areaAD/detailAD'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/iosDataManage',
        name: 'iosDataManage',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '概述数据',keepAlive:true,isBack:false,},
                path: 'summaryData',
                name: 'summaryData',
                component: resolve => require(['views/iosDataManage/summaryData'], resolve),
            },
            {
                meta: {title: '详细数据',keepAlive:true,isBack:false,},
                path: 'detailData',
                name: 'detailData',
                component: resolve => require(['views/iosDataManage/detailData'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/infoDataMana',
        name: 'infoDataMana',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '账号数据',keepAlive:true,isBack:false,},
                path: 'accountData',
                name: 'accountData',
                component: resolve => require(['views/infoDataMana/accountData'], resolve),
            },
            {
                meta: {title: '账号管理',keepAlive:true,isBack:false,},
                path: 'accountMana',
                name: 'accountMana',
                component: resolve => require(['views/infoDataMana/accountMana'], resolve),
            },
            {
                meta: {title: '新建账号',keepAlive:false,isBack:false,},
                path: 'accountManaNew',
                name: 'accountManaNew',
                component: resolve => require(['views/infoDataMana/accountManaNew'], resolve),
            },
            {
                meta: {title: '编辑账号',keepAlive:false,isBack:false,},
                path: 'accountManaEdit',
                name: 'accountManaEdit',
                component: resolve => require(['views/infoDataMana/accountManaEdit'], resolve),
            },
            {
                meta: {title: '产品管理',keepAlive:true,isBack:false,},
                path: 'proMana',
                name: 'proMana',
                component: resolve => require(['views/infoDataMana/proMana'], resolve),
            },
            {
                meta: {title: '新建产品',keepAlive:false,isBack:false,},
                path: 'proManaNew',
                name: 'proManaNew',
                component: resolve => require(['views/infoDataMana/proManaNew'], resolve),
            },
            {
                meta: {title: '编辑产品',keepAlive:false,isBack:false,},
                path: 'proManaEdit',
                name: 'proManaEdit',
                component: resolve => require(['views/infoDataMana/proManaEdit'], resolve),
            },
            {
                meta: {title: '客户管理',keepAlive:true,isBack:false,},
                path: 'customerMana',
                name: 'customerMana',
                component: resolve => require(['views/infoDataMana/customerMana'], resolve),
            },
            {
                meta: {title: '新建客户信息',keepAlive:false,isBack:false,},
                path: 'cusInfoNew',
                name: 'cusInfoNew',
                component: resolve => require(['views/infoDataMana/customerInfoNew'], resolve),
            },
            {
                meta: {title: '编辑客户信息',keepAlive:false,isBack:false,},
                path: 'customerInfoEdit',
                name: 'customerInfoEdit',
                component: resolve => require(['views/infoDataMana/customerInfoEdit'], resolve),
            },
            {
                meta: {title: '平台管理',keepAlive:true,isBack:false,},
                path: 'platformMana',
                name: 'platformMana',
                component: resolve => require(['views/infoDataMana/platformMana'], resolve),
            },
            {
                meta: {title: '客户合同管理',keepAlive:true,isBack:false,},
                path: 'cusContractMana',
                name: 'cusContractMana',
                component: resolve => require(['views/infoDataMana/customerContractMana'], resolve),
            },
            {
                meta: {title: '新建客户合同',keepAlive:false,isBack:false,},
                path: 'cusContractNew',
                name: 'cusContractNew',
                component: resolve => require(['views/infoDataMana/cusContractNew'], resolve),
            },
            {
                meta: {title: '编辑客户合同',keepAlive:false,isBack:false,},
                path: 'cusContractEdit',
                name: 'cusContractEdit',
                component: resolve => require(['views/infoDataMana/cusContractEdit'], resolve),
            },
            {
                meta: {title: '平台合同管理',keepAlive:true,isBack:false,},
                path: 'platformContractMana',
                name: 'platformContractMana',
                component: resolve => require(['views/infoDataMana/platformContractMana'], resolve),
            },
            {
                meta: {title: '新建平台合同',keepAlive:false,isBack:false,},
                path: 'platformConNew',
                name: 'platformConNew',
                component: resolve => require(['views/infoDataMana/platformConNew'], resolve),
            },
            {
                meta: {title: '编辑平台合同',keepAlive:false,isBack:false,},
                path: 'platformConEdit',
                name: 'platformConEdit',
                component: resolve => require(['views/infoDataMana/platformConEdit'], resolve),
            },
            {
                meta: {title: '客户预收',keepAlive:true,isBack:false,},
                path: 'cusCollect',
                name: 'cusCollect',
                component: resolve => require(['views/infoDataMana/customerCollect'], resolve),
            },
            {
                meta: {title: '客户对账',keepAlive:true,isBack:false,},
                path: 'cusAccountBill',
                name: 'cusAccountBill',
                component: resolve => require(['views/infoDataMana/customerAccountBill'], resolve),
            },
            {
                meta: {title: '客户结算单',keepAlive:true,isBack:false,},
                path: 'cusAccount',
                name: 'cusAccount',
                component: resolve => require(['views/infoDataMana/customerAccount'], resolve),
            },
            {
                meta: {title: '客户预收结算单',keepAlive:true,isBack:false,},
                path: 'cusCollecAccount',
                name: 'cusCollecAccount',
                component: resolve => require(['views/infoDataMana/customerCollecAccount'], resolve),
            },
            {
                meta: {title: '平台对账',keepAlive:true,isBack:false,},
                path: 'platformAccountBill',
                name: 'platformAccountBill',
                component: resolve => require(['views/infoDataMana/platformAccountBill'], resolve),
            },
            {
                meta: {title: '平台结算单',keepAlive:true,isBack:false,},
                path: 'platformAccount',
                name: 'platformAccount',
                component: resolve => require(['views/infoDataMana/platformAccount'], resolve),
            },
            {
                meta: {title: '人员绩效管理',keepAlive:true,isBack:false,},
                path: 'performance',
                name: 'performance',
                component: resolve => require(['views/infoDataMana/performance'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/tuia',
        name: 'tuia',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '详细数据',keepAlive:true,isBack:false,},
                path: 'detailData',
                name: 'detailData',
                component: resolve => require(['views/tuia/detailData'], resolve),
            },
            {
                meta: {title: '游戏数据',keepAlive:true,isBack:false,},
                path: 'gameData',
                name: 'gameData',
                component: resolve => require(['views/tuia/gameData'], resolve),
            },
            {
                meta: {title: '广告数据',keepAlive:true,isBack:false,},
                path: 'adData',
                name: 'adData',
                component: resolve => require(['views/tuia/adData'], resolve),
            },
            {
                meta: {title: '创意管理',keepAlive:true,isBack:false,},
                path: 'ideaMana',
                name: 'ideaMana',
                component: resolve => require(['views/tuia/ideaMana'], resolve),
            },
            {
                meta: {title: '新建创意',keepAlive:false,isBack:false,},
                path: 'ideaNew',
                name: 'ideaNew',
                component: resolve => require(['views/tuia/ideaNew'], resolve),
            },
            {
                meta: {title: '编辑创意',keepAlive:false,isBack:false,},
                path: 'ideaEdit',
                name: 'ideaEdit',
                component: resolve => require(['views/tuia/ideaEdit'], resolve),
            },
            {
                meta: {title: '渠道每日数据',keepAlive:true,isBack:false,},
                path: 'channelData',
                name: 'channelData',
                component: resolve => require(['views/tuia/channelData'], resolve),
            },
            {
                meta: {title: '新建渠道每日数据',keepAlive:false,isBack:false,},
                path: 'channelDataNew',
                name: 'channelDataNew',
                component: resolve => require(['views/tuia/channelDataNew'], resolve),
            },
            {
                meta: {title: '编辑渠道每日数据',keepAlive:false,isBack:false,},
                path: 'channelDataEdit',
                name: 'channelDataEdit',
                component: resolve => require(['views/tuia/channelDataEdit'], resolve),
            },
        ]
    },
    {
        meta: {
            noRequestApprove: false,
            keepAlive:false,
            isBack:false,
        },
        path: '/koudai',
        name: 'koudai',
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {title: '批量提现',keepAlive:true,isBack:false,},
                path: 'putForward',
                name: 'putForward',
                component: resolve => require(['views/newsApp/putForward'], resolve),
            },
        ]
    },
    {
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['views/error/404'], resolve)
    }
];
