webpackJsonp([12],{bGkB:function(t,e,a){var i=a("ruMl");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("0c0f8164",i,!0,{})},eFMi:function(t,e,a){"use strict";function i(t){a("bGkB")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("vwJc"),n=a("rMbN"),l=a("vSla"),c=i,o=l(s.a,n.a,!1,c,null,null);e.default=o.exports},rMbN:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:t.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),t._l(t.menu_nav,function(e,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[t._v(t._s(e))])])})],2)]),t._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"customerProCitySearch"},[a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围","picker-options":t.pickerOptions2},on:{change:t.dateChange},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}})],1),t._v(" "),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.customer_items.placeHolder,clearable:""},model:{value:t.customer_items.model_value,callback:function(e){t.$set(t.customer_items,"model_value",e)},expression:"customer_items.model_value"}},t._l(t.customer_items.options,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),t._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:t.pageInfo}},[t._v("查询")]),t._v(" "),a("div",{staticClass:"dateBut",on:{click:t.newContract}},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-plus"}),t._v("新建创意")])],1)],1)])]),t._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i",{staticStyle:{visibility:"hidden"}}),a("span"),t._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(e){t.changeCheckStatus(e)}}}),t._v(" "),t.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(e){t.preventDefault(e)}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:t.checkedChange},model:{value:t.checkedCities,callback:function(e){t.checkedCities=e},expression:"checkedCities"}},t._l(t.cities,function(e){return a("el-checkbox",{key:e,attrs:{label:e}},[t._v(t._s(e))])}))],1):t._e()])]),t._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[t._l(t.table_column,function(e,i){return e.visible?a("el-table-column",{key:i,attrs:{fixed:e.fixed,sortable:e.sortable,prop:e.prop,label:e.label,formatter:e.format,width:"","min-width":"100"}}):t._e()}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"100","class-name":"exitBut"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-button",{staticClass:"tuiaBtn",attrs:{type:"primary"},on:{click:function(a){a.stopPropagation(),t.editAccount(e.row.id)}}},[t._v("编辑")])],1)]}}])})],2)],1)])])])},s=[],n={render:i,staticRenderFns:s};e.a=n},ruMl:function(t,e,a){e=t.exports=a("UTlt")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"channelData.vue",sourceRoot:""}])},vwJc:function(t,e,a){"use strict";var i=a("HzJ8"),s=a.n(i);e.a={data:function(){return{visibleMenuSelectStatus:!1,checkedCities:["日期","渠道","平台来源","新增"],cities:["日期","渠道","平台来源","新增"],table_column:[{fixed:!0,prop:"date",label:"日期",sortable:!0,visible:!0},{fixed:!1,prop:"channel",label:"渠道",sortable:!1,visible:!0},{fixed:!1,prop:"srcTotal",label:"平台来源",sortable:!1,visible:!0},{fixed:!1,prop:"newTotal",label:"新增",sortable:!1,visible:!0}],page:{sizes:[10,20,30,50],offset:1,limit:10,count:0,currentPage:1},menu_nav:["推啊数据管理","渠道每日数据"],customer_items:{model_value:"",placeHolder:"全部渠道",options:[]},contract_items:{model_value:"",placeHolder:"全部游戏",options:[]},tableData:[],pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},dateValue:"",params:{startDate:"",endDate:""},contractNo:""}},activated:function(){this.channelInfo(),""!=this.dateValue&&this.pageInfo()},created:function(){},methods:{channelInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.tuiaAdminChannelList}).then(function(e){if(200==e.status){var a=e.data;t.customer_items.options=a}}).catch(function(t){console.log(t)})},pageInfo:function(){var t=this;if(""==this.dateValue)return this.$message({type:"warning",message:"请选择时间"}),!1;this.$http({method:"get",url:this.apiUrl.tuiaAdminStatChannelList,params:{channel:this.customer_items.model_value,etime:this.params.endDate,stime:this.params.startDate}}).then(function(e){if(200==e.status){var a=e.data;t.tableData=a}}).catch(function(t){console.log(t)})},editAccount:function(t){this.$router.push({path:"channelDataEdit",query:{id:t}})},handleCurrentChange:function(t){this.page.offset=t,this.pageInfo()},handleSizeChange:function(t){this.page.limit=t,this.pageInfo()},checkedChange:function(){var t=!0,e=!1,a=void 0;try{for(var i,n=s()(this.table_column);!(t=(i=n.next()).done);t=!0){var l=i.value,c=this.checkedCities.indexOf(l.label);l.visible=c>=0}}catch(t){e=!0,a=t}finally{try{!t&&n.return&&n.return()}finally{if(e)throw a}}},changeCheckStatus:function(t){t.stopPropagation(),this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},newContract:function(){this.$router.push({path:"channelDataNew",query:{customerContractId:""}})},bodyEvent:function(){this.visibleMenuSelectStatus=!1},preventDefault:function(t){t.stopPropagation()},dateChange:function(){""!=this.dateValue&&void 0!==this.dateValue&&null!=this.dateValue[0]&&null!=this.dateValue[1]?(this.params.startDate=this.formatDateTime(this.dateValue[0],"y-m-d")+" 00:00:00.000",this.params.endDate=this.formatDateTime(this.dateValue[1],"y-m-d")+" 23:59:59.999"):(this.params.startDate="",this.params.endDate="")},exitEvent:function(t,e){this.$router.push({path:"cusContractEdit",query:{customerContractId:t,titleName:e}})}}}}});
//# sourceMappingURL=12.98e6fc0f7b7cbc078386.js.map