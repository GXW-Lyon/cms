webpackJsonp([31],{"4vRo":function(t,e,a){"use strict";var i=a("HzJ8"),s=a.n(i);e.a={data:function(){return{loading:!1,detailStatus:!1,dataStatus:!1,visibleMenuSelectStatus:!1,checkedCities:["日期","客户名称","wifi消耗","猎豹消耗","趣头条消耗","合计消耗"],cities:["日期","客户名称","wifi消耗","猎豹消耗","趣头条消耗","合计消耗"],citiesFilterVal:["time","customerName","listConsumeWifi","listConsumeLiebao","listConsumeQtt","totalConsume"],table_column:[{fixed:!0,prop:"time",label:"日期",sortable:!0,visible:!0,minwidth:100},{fixed:!1,prop:"customerName",label:"客户名称",sortable:!1,visible:!0,minwidth:280},{fixed:!1,prop:"listConsumeWifi",label:"wifi消耗",sortable:!1,visible:!0,format:function(t,e){return t.listConsume[0].todayConsumer}},{fixed:!1,prop:"listConsumeLiebao",label:"猎豹消耗",sortable:!1,visible:!0,format:function(t,e){return t.listConsume[1].todayConsumer}},{fixed:!1,prop:"listConsumeQtt",label:"趣头条消耗",sortable:!1,visible:!0,format:function(t,e){return t.listConsume[2].todayConsumer}},{fixed:!1,prop:"totalConsume",label:"合计消耗",sortable:!1,visible:!0}],detailDataCol:[{fixed:!1,prop:"time",label:"日期",sortable:!0,visible:!0},{fixed:!1,prop:"productName",label:"产品",sortable:!1,visible:!0},{fixed:!1,prop:"platformName",label:"平台",sortable:!1,visible:!0},{fixed:!1,prop:"totalConsume",label:"消耗",sortable:!1,visible:!0},{fixed:!1,prop:"discdConsume",label:"折后消耗",sortable:!1,visible:!0}],page:{sizes:[10,20,50,100,200,500],offset:1,limit:10,count:0,currentPage:1},menu_nav:["信息流数据管理","客户管理"],tableData:[],detailData:[],ziliaoData:[],dateValue:"",customer_items:{model_value:"",placeHolder:"客户",options:[]},params:{stime:"",etime:""},isFirstEnter:!1,expands:[]}},activated:function(){this.$route.meta.isBack&&!this.isFirstEnter||this.customer(),this.$route.meta.isBack=!1,this.isFirstEnter=!1,this.pageInfo()},created:function(){this.isFirstEnter=!0},methods:{customer:function(){var t=this;this.$http({method:"get",url:this.apiUrl.fdpCusGetCustomerList}).then(function(e){if(200==e.status){var a=e.data;t.customer_items.options=a}}).catch(function(t){console.log(t)})},pageInfo:function(){var t=this;this.loading=!0,this.$http({method:"get",url:this.apiUrl.fdpCusSearchCustomer,params:{offset:this.page.offset,limit:this.page.limit,customerCode:this.customer_items.model_value,stime:this.params.stime,etime:this.params.etime}}).then(function(e){t.loading=!1,console.log(e),(e.status=200)&&(t.page.count=e.data.totalNums,t.tableData=e.data.items)}).catch(function(e){t.loading=!1})},detailInfo:function(t,e){var a=this;this.$http({method:"get",url:this.apiUrl.fdpCusSearchCustomerDetail,params:{time:t,id:e}}).then(function(t){console.log(t),(t.status=200)&&(a.detailData=t.data)}).catch(function(t){})},getRowKeys:function(t){return t.id},ziliaoInfo:function(t){var e=this;this.$http({method:"get",url:this.apiUrl.fdpCusGetCustomer,params:{id:t}}).then(function(t){console.log(t),(t.status=200)&&(e.ziliaoData=[t.data],e.expands.push(e.ziliaoData[0].id)),console.log(e.ziliaoData)}).catch(function(t){})},handleCurrentChange:function(t){this.page.offset=t,this.pageInfo()},handleSizeChange:function(t){this.page.limit=t,this.pageInfo()},checkedChange:function(){var t=!0,e=!1,a=void 0;try{for(var i,l=s()(this.table_column);!(t=(i=l.next()).done);t=!0){var o=i.value,n=this.checkedCities.indexOf(o.label);o.visible=n>=0}}catch(t){e=!0,a=t}finally{try{!t&&l.return&&l.return()}finally{if(e)throw a}}},changeCheckStatus:function(){this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},seeDetail:function(t,e){this.detailStatus=!0,this.detailInfo(t,e)},seeData:function(t){this.dataStatus=!0,this.ziliaoInfo(t)},exit:function(){this.detailStatus=this.dataStatus=!1},bodyEvent:function(){this.visibleMenuSelectStatus=this.detailStatus=this.dataStatus=!1},dateChange:function(){""!=this.dateValue&&void 0!==this.dateValue&&null!=this.dateValue[0]&&null!=this.dateValue[1]?(this.params.stime=this.formatDateTime(this.dateValue[0],"ymd"),this.params.etime=this.formatDateTime(this.dateValue[1],"ymd")):this.params.stime=this.params.etime=""},importData:function(){if(0==this.tableData.length)return this.$message({type:"info",message:"请查询数据"}),!1;var t=this.citiesImport,e=this.citiesFilterVal,a=this.tableData,i=[this.params.stime,this.params.etime,this.customer_items.model_value,"客户信息"].join("_");this.handleDownload(t,e,a,i)}}}},"KN/3":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:t.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),t._l(t.menu_nav,function(e,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[t._v(t._s(e))])])})],2)]),t._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"dateSelect"},[a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围",format:"yyyy / MM / dd","picker-options":t.$store.state.pickerOptions2},on:{change:t.dateChange},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}})],1),t._v(" "),a("div",{staticClass:"dateBut"},[a("el-button",{style:{"margin-left":"29px"},attrs:{type:"primary"},on:{click:function(e){return e.stopPropagation(),t.importData(e)}}},[t._v("导出数据\n                        ")]),t._v(" "),a("router-link",{attrs:{to:{name:"cusInfoNew"}}},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-plus"}),t._v("新建客户")])],1)],1)]),t._v(" "),a("div",{staticClass:"realTimeCitySearch"},[a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.customer_items.placeHolder,clearable:"",filterable:""},model:{value:t.customer_items.model_value,callback:function(e){t.$set(t.customer_items,"model_value",e)},expression:"customer_items.model_value"}},t._l(t.customer_items.options,function(t){return a("el-option",{key:t.customerCode,attrs:{label:t.customerName,value:t.customerCode}})})),t._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:t.pageInfo}},[t._v("查询")])],1)])]),t._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i",{staticStyle:{visibility:"hidden"}}),a("span"),t._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(e){return e.stopPropagation(),t.changeCheckStatus(e)}}}),t._v(" "),t.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(t){t.stopPropagation()}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:t.checkedChange},model:{value:t.checkedCities,callback:function(e){t.checkedCities=e},expression:"checkedCities"}},t._l(t.cities,function(e){return a("el-checkbox",{key:e,attrs:{label:e}},[t._v(t._s(e))])}))],1):t._e()])]),t._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"拼命加载中",data:t.tableData,border:"",stripe:""}},[t._l(t.table_column,function(e,i){return e.visible?a("el-table-column",{key:e.prop,attrs:{fixed:e.fixed,sortable:e.sortable,prop:e.prop,label:e.label,formatter:e.format,width:"auto","min-width":e.minwidth}}):t._e()}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"100",width:"100","class-name":"exitBut"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticClass:"inlineBox r_span",on:{click:function(a){a.stopPropagation(),t.seeDetail(e.row.time,e.row.id)}}},[t._v("详情")]),t._v(" "),a("span",{staticClass:"inlineBox d_span",on:{click:function(a){a.stopPropagation(),t.seeData(e.row.id)}}},[t._v("资料")])])]}}])})],2)],1)]),t._v(" "),a("div",{staticClass:"con_pager"},[a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-sizes":t.page.sizes,"page-size":t.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.page.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.page,"currentPage",e)}}})],1)]),t._v(" "),t.detailStatus?a("div",{staticClass:"bill",on:{click:function(t){t.stopPropagation()}}},[a("div",{staticClass:"examine_title"},[a("button",{on:{click:function(e){return e.stopPropagation(),t.exit(e)}}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"examine_progress"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.detailData,border:"",stripe:""}},t._l(t.detailDataCol,function(e,i){return e.visible?a("el-table-column",{key:i,attrs:{fixed:e.fixed,sortable:e.sortable,prop:e.prop,label:e.label,formatter:e.format,width:""}}):t._e()}))],1)]):t._e(),t._v(" "),t.dataStatus?a("div",{staticClass:"bill info_ad_table",on:{click:function(t){t.stopPropagation()}}},[a("div",{staticClass:"examine_title"},[a("button",{on:{click:function(e){return e.stopPropagation(),t.exit(e)}}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"examine_progress tableDetail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.ziliaoData,"row-key":t.getRowKeys,"expand-row-keys":t.expands,border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand zhedieform",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"客户名称"}},[a("span",[t._v(t._s(e.row.customerName))])]),t._v(" "),a("el-form-item",{attrs:{label:"联系人"}},[a("span",[t._v(t._s(e.row.contact))])]),t._v(" "),a("el-form-item",{attrs:{label:"财务类型"}},[a("span",[t._v(t._s(e.row.finType>0?"1"==e.row.finType?"公司":"个人":"-"))])]),t._v(" "),a("el-form-item",{attrs:{label:"营业执照号"}},[a("span",[t._v(t._s(e.row.busNo))])]),t._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("span",[t._v(t._s(e.row.phone))])]),t._v(" "),a("el-form-item",{attrs:{label:"纳税登记号"}},[a("span",[t._v(t._s(e.row.taxId))])]),t._v(" "),a("el-form-item",{attrs:{label:"证件有效期"}},[a("span",[t._v(t._s(e.row.cardExpired))])]),t._v(" "),a("el-form-item",{attrs:{label:"QQ"}},[a("span",[t._v(t._s(e.row.qq))])]),t._v(" "),a("el-form-item",{attrs:{label:"收款银行"}},[a("span",[t._v(t._s(e.row.bank))])]),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("span")]),t._v(" "),a("el-form-item",{attrs:{label:"邮箱"}},[a("span",[t._v(t._s(e.row.email))])]),t._v(" "),a("el-form-item",{attrs:{label:"开户地址"}},[a("span",[t._v(t._s(e.row.accountAddress))])]),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("span")]),t._v(" "),a("el-form-item",{attrs:{label:"地址"}},[a("span",[t._v(t._s(e.row.address))])]),t._v(" "),a("el-form-item",{attrs:{label:"银行账号"}},[a("span",[t._v(t._s(e.row.bankAccount))])]),t._v(" "),a("el-form-item",{attrs:{label:"最后更新"}},[a("span",[t._v(t._s(e.row.ltime))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"客户名称",prop:"customerName"}}),t._v(" "),a("el-table-column",{attrs:{label:"联系人",prop:"contact"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"50","min-width":"","class-name":"exitBut"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:{name:"customerInfoEdit",query:{id:t.row.id}}}},[a("div",[a("i",{staticClass:"el-icon-edit"})])])]}}])})],1)],1)]):t._e()])])},s=[],l={render:i,staticRenderFns:s};e.a=l},YjIK:function(t,e,a){var i=a("gRFa");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("34346af4",i,!0,{})},gRFa:function(t,e,a){e=t.exports=a("UTlt")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"customerMana.vue",sourceRoot:""}])},z8TR:function(t,e,a){"use strict";function i(t){a("YjIK")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("4vRo"),l=a("KN/3"),o=a("vSla"),n=i,r=o(s.a,l.a,!1,n,null,null);e.default=r.exports}});
//# sourceMappingURL=31.fd5264b848e234476ab9.js.map