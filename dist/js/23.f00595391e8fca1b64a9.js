webpackJsonp([23],{FnRX:function(t,e,a){"use strict";var i=a("HzJ8"),s=a.n(i);e.a={data:function(){return{loading:!1,visibleMenuSelectStatus:!1,checkedCities:["日期","产品","平台","今日消耗","折后今日消耗","未结算总预算","未结算总消耗"],cities:["日期","产品","平台","今日消耗","折后今日消耗","未结算总预算","未结算总消耗"],citiesFilterVal:["dataTime","product","platform","yestConsume","todayConsume","dctTodayConsume","nsettlementBudget","nsettlementConsume"],table_column:[{fixed:!1,prop:"dataTime",label:"日期",sortable:!0,visible:!0},{fixed:!1,prop:"product",label:"产品",sortable:!1,visible:!0},{fixed:!1,prop:"platform",label:"平台",sortable:!1,visible:!0},{fixed:!1,prop:"todayConsume",label:"今日消耗",sortable:!1,visible:!0},{fixed:!1,prop:"dctTodayConsume",label:"折后今日消耗",sortable:!1,visible:!0}],page:{sizes:[10,20,50,100,200,500],offset:1,limit:10,count:0,currentPage:1},menu_nav:["信息流数据管理","产品管理"],tableData:[],dateValue:"",platform_items:{model_value:"",placeHolder:"平台",options:[{val:"wifi万能钥匙",id:"0"},{val:"趣头条",id:"1"},{val:"猎豹",id:"2"}]},pro_items:{model_value:"",placeHolder:"产品",options:[]},params:{sDateTime:""},isFirstEnter:!1}},activated:function(){this.$route.meta.isBack&&!this.isFirstEnter||this.platform(),this.$route.meta.isBack=!1,this.isFirstEnter=!1},created:function(){this.isFirstEnter=!0},methods:{platform:function(){var t=this;this.$http({method:"get",url:this.apiUrl.fdpPlaGetPlatformList}).then(function(e){if(200==e.status){var a=e.data;t.platform_items.options=a}}).catch(function(t){console.log(t)})},proInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.fdpProListall,params:{platformId:this.platform_items.model_value}}).then(function(e){if(200==e.status){var a=e.data;t.pro_items.options=a}}).catch(function(t){console.log(t)})},pageInfo:function(){var t=this;if(""==this.params.sDateTime)return this.$message({type:"info",message:"请选择日期"}),!1;this.loading=!0,this.$http({method:"get",url:this.apiUrl.fdpProSearch,params:{curPage:this.page.offset,limit:this.page.limit,productId:this.pro_items.model_value||-1,platformId:this.platform_items.model_value||-1,sDateTime:this.params.sDateTime}}).then(function(e){t.loading=!1,(e.status=200)&&(t.page.count=e.data.totalNums,t.tableData=e.data.list)}).catch(function(e){t.loading=!1})},handleCurrentChange:function(t){this.page.offset=t,this.pageInfo()},handleSizeChange:function(t){this.page.limit=t,this.pageInfo()},checkedChange:function(){var t=!0,e=!1,a=void 0;try{for(var i,l=s()(this.table_column);!(t=(i=l.next()).done);t=!0){var o=i.value,n=this.checkedCities.indexOf(o.label);o.visible=n>=0}}catch(t){e=!0,a=t}finally{try{!t&&l.return&&l.return()}finally{if(e)throw a}}},changeCheckStatus:function(){this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},bodyEvent:function(){this.visibleMenuSelectStatus=!1},dateChange:function(){""!=this.dateValue&&void 0!==this.dateValue&&null!=this.dateValue[0]&&null!=this.dateValue[1]?this.params.sDateTime=this.formatDateTime(this.dateValue[0],"y/m/d")+"-"+this.formatDateTime(this.dateValue[1],"y/m/d"):this.params.sDateTime=""},importData:function(){if(0==this.tableData.length)return this.$message({type:"info",message:"请查询数据"}),!1;var t=this.cities,e=this.citiesFilterVal,a=this.tableData,i=[this.params.sDateTime,this.platform_items.model_value,this.pro_items.model_value,"产品数据"].join("_");this.handleDownload(t,e,a,i)},editEvent:function(t){this.$router.push({path:"proManaEdit",query:{proId:t}})}}}},LzUa:function(t,e,a){"use strict";function i(t){a("t6Hq")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("FnRX"),l=a("Z9Mb"),o=a("vSla"),n=i,r=o(s.a,l.a,!1,n,null,null);e.default=r.exports},Qm0C:function(t,e,a){e=t.exports=a("UTlt")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"proMana.vue",sourceRoot:""}])},Z9Mb:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:t.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),t._l(t.menu_nav,function(e,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[t._v(t._s(e))])])})],2)]),t._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"dateSelect"},[a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围",format:"yyyy / MM / dd","picker-options":t.$store.state.pickerOptions2},on:{change:t.dateChange},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}})],1),t._v(" "),a("div",{staticClass:"dateBut"},[a("el-button",{style:{"margin-left":"29px"},attrs:{type:"primary"},on:{click:function(e){return e.stopPropagation(),t.importData(e)}}},[t._v("导出数据\n                        ")]),t._v(" "),a("router-link",{attrs:{to:{name:"proManaNew"}}},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-plus"}),t._v("新建产品")])],1)],1)]),t._v(" "),a("div",{staticClass:"realTimeCitySearch"},[a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.platform_items.placeHolder,clearable:""},on:{change:t.proInfo},model:{value:t.platform_items.model_value,callback:function(e){t.$set(t.platform_items,"model_value",e)},expression:"platform_items.model_value"}},t._l(t.platform_items.options,function(t){return a("el-option",{key:t.platformId,attrs:{label:t.platformName,value:t.platformId}})})),t._v(" "),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.pro_items.placeHolder,clearable:"",filterable:""},model:{value:t.pro_items.model_value,callback:function(e){t.$set(t.pro_items,"model_value",e)},expression:"pro_items.model_value"}},t._l(t.pro_items.options,function(t){return a("el-option",{key:t.productId,attrs:{label:t.productName,value:t.productId}})})),t._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:t.pageInfo}},[t._v("查询")])],1)])]),t._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i",{staticStyle:{visibility:"hidden"}}),a("span"),t._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(e){return e.stopPropagation(),t.changeCheckStatus(e)}}}),t._v(" "),t.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(t){t.stopPropagation()}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:t.checkedChange},model:{value:t.checkedCities,callback:function(e){t.checkedCities=e},expression:"checkedCities"}},t._l(t.cities,function(e){return a("el-checkbox",{key:e,attrs:{label:e}},[t._v(t._s(e))])}))],1):t._e()])]),t._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"拼命加载中",data:t.tableData,border:"",stripe:""}},[t._l(t.table_column,function(e,i){return e.visible?a("el-table-column",{key:e.prop,attrs:{fixed:e.fixed,sortable:e.sortable,prop:e.prop,label:e.label,formatter:e.format,"min-width":"100"}}):t._e()}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100","class-name":"exitBut"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{on:{click:function(a){t.editEvent(e.row.id)}}},[a("i",{staticClass:"el-icon-edit"})])]}}])})],2)],1)]),t._v(" "),a("div",{staticClass:"con_pager"},[a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-sizes":t.page.sizes,"page-size":t.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.page.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.page,"currentPage",e)}}})],1)])])])},s=[],l={render:i,staticRenderFns:s};e.a=l},t6Hq:function(t,e,a){var i=a("Qm0C");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("19b3b5c8",i,!0,{})}});
//# sourceMappingURL=23.f00595391e8fca1b64a9.js.map