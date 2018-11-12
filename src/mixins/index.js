var mixin = {
    data: () => {
        return {
            apiUrl: {
                userLoginUrl: '/api/user/login',//落地页
                getListUrl: '/api/get/list',
                productTemplateUrl: '/api/product/template',
                landpageNewUrl: '/api/landpage/new',
                landpageGetUrl: '/api/landpage/get',
                landpageUpdateUrl: '/api/landpage/update',
                landpageDelUrl: '/api/landpage/del',
                landpageListUrl: '/api/landpage/list',
                landpageRefreshUrl: '/api/landpage/refresh',
                landpageConfigUrl: '/api/landpage/config',
                templateGetUrl: '/api/template/get',
                templateNewUrl: '/api/template/new',
                templateUpdateUrl: '/api/template/update',
                templateDelUrl: '/api/template/del',
                templateListsUrl: '/api/template/lists',
                uploadImgUrl: 'http://api.kyhddsp.com/api/img/upload',
                productAttriUrl: '/api/product/attri',

                crawlListUrl: '/api/crawl/list',//地域广告

                customerSearch: '/cpa/api/customer/search',//CPA
                customerNew: '/cpa/api/customer/new',
                customerGet: '/cpa/api/customer/get',
                customerGetAlias: '/cpa/api/customer/getAlias',
                customerUpdate: '/cpa/api/customer/update',
                customerProSearch: '/cpa/api/customer_product/search',
                customerProListLight: '/cpa/api/customer_product/list_light',
                customerProNew: '/cpa/api/customer_product/new',
                customerProGet: '/cpa/api/customer_product/get',
                customerProUpdate: '/cpa/api/customer_product/update',
                customerProductDel: '/cpa/api/customer_product/del',
                customerProListBiztype: '/cpa/api/customer_product/list_biztype',
                customerProListPackage: '/cpa/api/customer_product/list_package',
                customerProUpdatePackage: '/cpa/api/customer_product/update_package_price',
                customercContNew: '/cpa/api/customer_contract/new',
                customercContSearch: '/cpa/api/customer_contract/search',
                customercContGet: '/cpa/api/customer_contract/get',
                customercContUpdate: '/cpa/api/customer_contract/update',
                channelSearch: '/cpa/api/channel/search',
                channelNew: '/cpa/api/channel/new',
                channelGet: '/cpa/api/channel/get',
                channelGetAlias: '/cpa/api/channel/getAlias',
                channelUpdate: '/cpa/api/channel/update',
                channelProSearch: '/cpa/api/channel_product/search',
                channelProSearchByProductCode: '/cpa/api/channel_product/searchByProductCode',
                channelProNew: '/cpa/api/channel_product/new',
                channelProGet: '/cpa/api/channel_product/get',
                channelProUpdate: '/cpa/api/channel_product/update',
                channelProUpdatePackPrice: '/cpa/api/channel_product/update_package_price',
                channelProDel: '/cpa/api/channel_product/del_product',
                channelProDelNew: '/cpa/api/channel_product/del',
                channelProList: '/cpa/api/channel_product/list_product',
                channelProListPack: '/cpa/api/channel_product/list_product_package',
                channelProListCustomer: '/cpa/api/channel_product/list_customer',
                channelProListPackage: '/cpa/api/channel_product/list_package',
                channelProSearchByPackageCode: '/cpa/api/channel_product/searchByPackageCode',
                channelConSearch: '/cpa/api/channel_contract/search',
                channelConNew: '/cpa/api/channel_contract/new',
                channelConGet: '/cpa/api/channel_contract/get',
                channelConUpdate: '/cpa/api/channel_contract/update',
                realtimeSearch: '/cpa/api/realtime/search',
                realtimeRefresh: '/cpa/api/realtime/refresh',
                realtimeDelete: '/cpa/api/realtime/delete',
                realtimeBatch_del: '/cpa/api/realtime/batch_del',
                realtimeSearchCustomer: '/cpa/api/realtime/list_customer_realdata',
                realtimeSearchChannel: '/cpa/api/realtime/list_channel_realdata',
                realtimeUpdateAct: '/cpa/api/realtime/updateAct',
                realtimeUpdateChannel: '/cpa/api/realtime/updateChannel',
                createCustomerBill: '/cpa/api/bill/create_customer_bill',
                createChannelBill: '/cpa/api/bill/create_channel_bill',
                createBill: '/cpa/api/bill/create_bill',
                getCustomerBill: '/cpa/api/bill/bill_detail?type=1',
                getChannelBill: '/cpa/api/bill/bill_detail?type=2',
                financeInfoBill: '/cpa/api/bill/finance_info',
                customerBillList: '/cpa/api/bill/list_customer_bill',
                channelBillList: '/cpa/api/bill/list_channel_bill',
                customerBillDel: '/cpa/api/bill/del_customer_bill',
                channelBillDel: '/cpa/api/bill/del_channel_bill',
                txList: '/cpa/api/tx/list',
                txDetail: '/cpa/api/tx/detail',
                txCreate: '/cpa/api/tx/create',
                dingGetTxList: '/cpa/api/tx/getTxList',
                lockStatus: '/cpa/api/bill/lock_status',
                customerBillQuickCreate: '/cpa/api/bill/quick_create_customer_bill',
                channelBillQuickCreate: '/cpa/api/bill/quick_create_channel_bill',
                billStatConsume: '/cpa/api/bill/stat_consume',
                billDetail: '/cpa/api/bill/bill_detail',

                uploadApk: 'http://api.kyhddsp.com/cpa/api/upload/uploadApk',
                uploadData: 'http://api.kyhddsp.com/cpa/api/realtime/import',
                uploadCustomer: 'http://api.kyhddsp.com/cpa/api/customer/import',
                uploadChannel: 'http://api.kyhddsp.com/cpa/api/channel/import',
                uploadChannelProduct: 'http://api.kyhddsp.com/cpa/api/channel_product/import_v2',
                uploadCustomerProduct: 'http://api.kyhddsp.com/cpa/api/customer_product/import',
                uploadCusContract: 'http://api.kyhddsp.com/cpa/api/customer_contract/import',
                uploadChannelContract: 'http://api.kyhddsp.com/cpa/api/channel_contract/import',

                /*IOS*/
                reportIdName: 'http://mreport.kyhddsp.com/report/id2name',
                reportTotal: 'http://mreport.kyhddsp.com/report/total',
                reportDetail: 'http://mreport.kyhddsp.com/report/detail',
                reportDetailIdfa: 'http://mreport.kyhddsp.com/report/detail_idfa',
                reportDetailExcel: 'http://mreport.kyhddsp.com/report/detail_excel',

                importdataGetCookie:  '/cpa/api/importdata/get_tt_cookie',
                importdataStartFetch:  '/cpa/api/importdata/start_fetch',
                get_captcha:  '/cpa/api/importdata/get_captcha',

                /*fdp*/
                fdpAccGetOperator: '/fdp/api/account/getOperator',
                fdpAccAccountDeposit: '/fdp/api/platform/accountDeposit',
                fdpAccDel: '/fdp/api/account/del',
                fdpAccGetAccount: '/fdp/api/account/getAccount',
                fdpAccUpdateAccount: '/fdp/api/account/updateAccount',
                fdpAccNewPlatform: '/fdp/api/account/newPlatform',
                fdpAccSearchAccount: '/fdp/api/account/searchAccount',
                fdpAccSearchAccountDeposit: '/fdp/api/platform/searchAccountDeposit',
                fdpAccModify: '/fdp/api/accountdata/modify',
                fdpAccSearch: '/fdp/api/accountdata/search',
                fdpAccImport: 'http://api.kyhddsp.com/fdp/api/accountdata/import',
                fdpAccOnekeyrefresh: '/fdp/api/accountdata/onekeyrefresh',
                fdpCusGetCustomer: '/fdp/api/customer/getCustomer',
                fdpCusGetCustomerList: '/fdp/api/customer/getCustomerList',
                fdpCusNewCustomer: '/fdp/api/customer/newCustomer',
                fdpCusSearchCustomer: '/fdp/api/customer/searchCustomer',
                fdpCusSearchCustomerDetail: '/fdp/api/customer/searchCustomerDetail',
                fdpCusUpdateCustomer: '/fdp/api/customer/updateCustomer',
                fdpProCreate: '/fdp/api/productmanage/create',
                fdpProListall: '/fdp/api/productmanage/listall',
                fdpProListproduct: '/fdp/api/productmanage/listproduct',
                fdpProListname: '/fdp/api/productmanage/listname',
                fdpProModify: '/fdp/api/productmanage/modify',
                fdpProSave_product_account: '/fdp/api/productmanage/save_product_account',
                fdpProSearch: '/fdp/api/productmanage/search',
                fdpProSearch_product_account: '/fdp/api/productmanage/search_product_account',
                fdpProUpdate_product_account: '/fdp/api/productmanage/update_product_account',
                fdpPlaGetPlatformList: '/fdp/api/platform/getPlatformList',
                fdpConSearchCustomer: '/fdp/api/contract/searchCustomer',
                fdpConNewCustomer: '/fdp/api/contract/newCustomer',
                fdpConSearchPlatform: '/fdp/api/contract/searchPlatform',
                fdpConNewPlatform: '/fdp/api/contract/newPlatform',
                fdpPlatGetPlatFormList: '/fdp/api/platform/getPlatformList',
                fdpPlatSearchPlatForm: '/fdp/api/platform/searchPlatform',
                fdpPlatGetPlatDetial: '/fdp/api/platform/getPlatformDetial',
                fdpConGetCustomer: '/fdp/api/contract/getCustomer',
                fdpConGetPlatform: '/fdp/api/contract/getPlatform',
                fdpPlatPlatFormDeposit: '/fdp/api/platform/platformDeposit',
                fdpCusCreate: '/fdp/api/customeradvance/create',
                fdpCusDetailsquery: '/fdp/api/customeradvance/detailsquery',
                fdpCusSearch: '/fdp/api/customeradvance/search',
                fdpCusFilter: '/fdp/api/customerreconciliation/filter',
                fdpCusFilterSum: '/fdp/api/customerreconciliation/sum',
                fdpCusGenerate: '/fdp/api/customerreconciliation/generate',
                fdpCusUpdate: '/fdp/api/customerreconciliation/update',
                fdpCusPreview: '/fdp/api/customerreconciliation/preview',
                fdpCusDelete: '/fdp/api/customersettlement/delete',
                fdpCusDisplay: '/fdp/api/customersettlement/display',
                fdpCusSetFilter: '/fdp/api/customersettlement/filter',
                fdpCusSetSearch: '/fdp/api/customersettlement/search',
                fdpPlatReconciliationSearch: '/fdp/api/platformreconciliation/search',
                fdpPlatSettlementFilter: '/fdp/api/platformsettlement/filter',
                fdpPlatReconciliationCombobox: '/fdp/api/platformreconciliation/combobox',
                fdpplatSettlementDisplay: '/fdp/api/platformsettlement/display',
                fdpPlatSettlementSearch: '/fdp/api/platformsettlement/search',
                fdpPlatReconciliationGenerate: '/fdp/api/platformreconciliation/generate',
                fdpCusAdvsettlementFilter: '/fdp/api/customeradvsettlement/filter',
                fdpCusAdvsettlementSearch: '/fdp/api/customeradvsettlement/search',
                fdpCusAdvsettlementDisplay: '/fdp/api/customeradvsettlement/display',
                fdpCusAdvsettlementDelete: '/fdp/api/customeradvsettlement/delete',
                fdpPlatSettlementCombobox: '/fdp/api/platformsettlement/combobox',
                fdpPlatSettlementDelete: '/fdp/api/platformsettlement/delete',
                fdpCusSettlementSubmitApproval: '/fdp/api/customersettlement/submitapproval',
                fdpCusAdvSettlementSubmitApproval: '/fdp/api/customeradvsettlement/submitapproval',

                /*tuia*/
                tuiaAdminChannelList: '/tuia/admin/channel/list',
                tuiaAdminChannelAdlist: '/tuia/admin/channel/adList',
                tuiaAdminChannelAdstatus: '/tuia/admin/channel/adstatus',
                tuiaAdminAdDel: '/tuia/admin/ad/del',
                tuiaAdminAdUpdate: '/tuia/admin/ad/update',
                tuiaAdminChannelWeightRatio: '/tuia/admin/channel/weight_ratio',
                tuiaAdminAdNO: '/tuia/admin/ad/no',
                tuiaAdminAdNew: '/tuia/admin/ad/new',
                tuiaAdminAdGet: '/tuia/admin/ad/get',
                tuiaAdminLogAdData: '/tuia/admin/logstash/statAdData',
                tuiaAdminGameList: '/tuia/admin/game/list',
                tuiaAdminLogStatGameData: '/tuia/admin/logstash/statGameData',
                tuiaAdminLogStatDetailData: '/tuia/admin/logstash/statDetailData',
                tuiaAdminStatChannelList: '/tuia/admin/statChannel/list',
                tuiaAdminStatChannelNew: '/tuia/admin/statChannel/new',
                tuiaAdminStatChannelGet: '/tuia/admin/statChannel/get',
                tuiaAdminStatChannelUpdate: '/tuia/admin/statChannel/update',
                tuiaUploadImgUrl: 'http://api.kyhddsp.com/tuia/admin/upload',

                /*口袋头条*/
                koudaiPutForwardList: '/tt/api/admin/get',
                koudaiPutForwardApproval: '/tt/api/admin/approval',
                koudaiPutForwardCash: '/tt/api/admin/cash',
                koudaiPutForwardRefuse: '/tt/api/admin/refuse',


                /*信息流绩效管理*/
                fdpApiAppraisalPersonal:'/fdp/api/appraisal/personal'
            }
        };
    },
    methods: {
        // 存储storage用户信息
        set_storage(str, val) {
            sessionStorage.setItem(str, val);
        },
        //设置cookie
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = 'expires=' + d.toUTCString();
            var domain = 'domain=' + 'kyhddsp.com';
            // console.info(cname + '=' + cvalue + '; ' + expires);
            document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + domain;
            // console.info(document.cookie);
        },
        //获取cookie
        getCookie: function (cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return '';
        },
        //清除cookie
        clearCookie: function () {
            this.setCookie('username', '', -1);
        },
        // 图片加排序前缀
        pic_sort(urlArr) {
            var newArr = [];
            for (let i = 0; i < urlArr.length; i++) {
                let str = '', id = i + 1;
                i < 9 ? str = '0' : null;
                newArr.push(str + id + '@#@' + urlArr[i].replace(/^\d+@#@/g,''));
            }
            return newArr;
        },
        /*图片排序重组*/
        picSort(urlArr, delimiter) {
            var newArr = [];
            urlArr.forEach((item, i) => {
                let arr = item.split(delimiter);
                let index = parseInt(arr[0]) - 1;
                newArr[index] = arr[1];
            });
            return newArr;
        },
        // 截取图片名字
        picSubName(url) {
            let arr = url.split('/');
            let arrLen = arr.length - 1;
            return arr[arrLen];
        },
        // 筛选条件
        selectPush(arr, label, value) {
            var key1 = label || 'id';
            var key2 = value || 'val';
            arr.unshift({[key1]: '0', [key2]: '请选择'});
            return arr;
        },
        // 对象筛选条件
        objPush(obj) {
            var newObj = {
                '0': '请选择'
            };
            for (let i in obj) {
                newObj[i] = obj[i];
            }
            return newObj;
        },
        // 屏蔽地区
        areaListPush(arr) {
            var newArr = [];
            for (let item of arr) {
                newArr.push(item.id);
            }
            return newArr;
        },
        // 日期转时间戳
        dateFormat(date) {
            if (!date) {
                return '';
            }
            var now = new Date(date);
            var sjc = Date.parse(now);
            return sjc;
        },
        //标准时间转常用格式
        formatDateTime(date, format) {
            if (!date) {
                return '';
            }
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            if (format == 'y-m-d h-m-s') {
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            } else if (format == 'h-m') {
                return ' ' + h + ':' + minute;
            } else if (format == 'y-m-d') {
                return y + '-' + m + '-' + d;
            } else if (format == 'y/m/d') {
                return y + '/' + m + '/' + d;
            } else if (format == 'ymd') {
                return y + '' + m + '' + d;
            }else if(format == 'y-m'){
                return y + '-' + m ;
            }
        },
        //两个时间相差天数 兼容firefox chrome
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
            var dateSpan,
                tempDate,
                iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays;
        },
        // 导出xls数据
        handleDownload(theader, filterval, tabledata, filename) {
            this.downloadLoading = true;
            require.ensure([], () => {
                const {export_json_to_excel} = require('@/vendor/Export2Excel');
                const tHeader = theader;
                const filterVal = filterval;
                const list = tabledata;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, filename);
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        //cpa信息、产品上传成功提示
        handleSuccess(res, file, fileList) {
            this.loading=false;
            res.error=res.error.replace(/\|/g,'<br>');
            res.msg=res.msg.replace(/\|/g,'<br>');
            let html=`
<h2 class="borderBottom">总共导入条数:${res.num}</h2>
<h2>导入提示:</h2>
<p class="borderBottom">${res.msg||'无'}</p>
<h2>导入错误:</h2>
<p class="borderBottom">${res.error||'无'}</p>
`;
            this.importTitleTxt = html;
            this.importTitleStatus = true;
        },
        // cpa信息、产品上传错误
        uploadError(err, file, fileList) {
            this.loading=false;
            this.$message({
                type: 'error',
                message: '上传失败，请重试'
            });
        },
        // cpa信息、产品上传时
        uploading(event, file, fileList) {
            this.loading=true;
        },
        // cpa信息、产品上传前对文件的大小的判断
        beforeAvatarUpload(file) {
            var fileName = file.name.split('.');
            var fileNameLen = fileName.length - 1;
            const extension = fileName[fileNameLen] === 'csv';
//                const isLt2M = file.size / 1024 / 1024 < 2;
            if (!extension) {
                this.$message({
                    type: 'info',
                    message: '上传渠道包只能是 csv 格式'
                });
            }
//                if (!isLt2M) {
//                    this.$message({
//                        type: 'info',
//                        message: '上传包大小不能超过 2MB'
//                    });
//                }
//                return extension && isLt2M;
            return extension;
        },
    }

};
export default mixin;

