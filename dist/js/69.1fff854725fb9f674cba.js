webpackJsonp([69],{"AD+i":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:t.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),t._l(t.menu_nav,function(e,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[t._v(t._s(e))])])})],2)]),t._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"customerProCitySearch"},[a("el-input",{staticClass:"page_d_select",attrs:{placeholder:"请输入合同编号或客户名称"},model:{value:t.contractNo,callback:function(e){t.contractNo=e},expression:"contractNo"}}),t._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:function(t){}}},[t._v("搜索")]),t._v(" "),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.channel_items.placeHolder},on:{change:function(t){}},model:{value:t.channel_items.model_value,callback:function(e){t.$set(t.channel_items,"model_value",e)},expression:"channel_items.model_value"}},t._l(t.channel_items.options,function(t){return a("el-option",{key:t.channelCode,attrs:{label:t.name,value:t.channelCode}})})),t._v(" "),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:t.contract_items.placeHolder},on:{change:function(t){}},model:{value:t.contract_items.model_value,callback:function(e){t.$set(t.contract_items,"model_value",e)},expression:"contract_items.model_value"}},t._l(t.contract_items.options,function(t){return a("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),t._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:function(t){}}},[t._v("查询")]),t._v(" "),a("div",{staticClass:"dateBut"},[a("el-button",{attrs:{type:"primary"},on:{click:t.newContract}},[a("i",{staticClass:"el-icon-plus"}),t._v("新建合同")]),t._v(" "),a("el-upload",{staticClass:"upload-demo",attrs:{action:t.apiUrl.uploadChannelContract,"with-credentials":!0,"on-success":t.handleSuccess,beforeUpload:t.beforeAvatarUpload,onError:t.uploadError,"show-file-list":!1,"file-list":t.fileList}},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-plus"}),t._v("导入合同")])],1)],1)],1)])]),t._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i",{staticStyle:{visibility:"hidden"}}),a("span"),t._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(e){t.changeCheckStatus(e)}}}),t._v(" "),t.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(e){t.preventDefault(e)}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:t.checkedChange},model:{value:t.checkedCities,callback:function(e){t.checkedCities=e},expression:"checkedCities"}},t._l(t.cities,function(e){return a("el-checkbox",{key:e,attrs:{label:e}},[t._v(t._s(e))])}))],1):t._e()])]),t._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[t._l(t.table_column,function(e,i){return e.visible?a("el-table-column",{key:i,attrs:{fixed:e.fixed,sortable:e.sortable,prop:e.prop,label:e.label,formatter:e.format,width:""}}):t._e()}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"查看合同",width:"100","min-width":"100","class-name":"exitBut"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{on:{click:function(a){t.exitEvent(e.row.id)}}},[a("i",{staticClass:"el-icon-view"})])]}}])})],2)],1)]),t._v(" "),a("div",{staticClass:"con_pager"},[a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-sizes":t.page.sizes,"page-size":t.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.page.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.page,"currentPage",e)}}})],1)]),t._v(" "),t.importTitleStatus?a("div",{staticClass:"importTitle",on:{click:function(t){t.stopPropagation()}}},[a("div",{staticClass:"importTitle_top"},[a("span",[t._v("提示")]),t._v(" "),a("button",{on:{click:function(e){return e.stopPropagation(),t.exitImportTitle(e)}}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"importTitleTxt",domProps:{innerHTML:t._s(t.importTitleTxt)}})]):t._e()])])},n=[],s={render:i,staticRenderFns:n};e.a=s},B2il:function(t,e,a){"use strict";var i=a("HzJ8"),n=a.n(i);e.a={data:function(){var t=this;return{fileList:[],importTitleStatus:!1,importTitleTxt:"",visibleMenuSelectStatus:!1,checkedCities:["序号","合同编号","渠道主体","开始时间","结束时间","推广模式","合同状态","审核状态"],cities:["序号","合同编号","渠道主体","开始时间","结束时间","推广模式","合同状态","审核状态"],table_column:[{fixed:!0,prop:"id",label:"序号",sortable:!0,visible:!0},{fixed:!1,prop:"contractNo",label:"合同编号",sortable:!1,visible:!0},{fixed:!1,prop:"channelName",label:"渠道主体",sortable:!1,visible:!0},{fixed:!1,prop:"beginTime",label:"开始时间",sortable:!1,visible:!0},{fixed:!1,prop:"endTime",label:"结束时间",sortable:!1,visible:!0},{fixed:!1,prop:"marketingMode",label:"推广模式",sortable:!1,visible:!0,format:function(t,e){switch(t.marketingMode){case"":return"-";case"CA":return"CPA";case"CD":return"CPD";case"CM":return"CPM";case"CC":return"CPC";case"CS":return"CPS";case"CT":return"CPT";case"CP":return"CPPA"}}},{fixed:!1,prop:"status",label:"合同状态",sortable:!0,visible:!0,format:function(t,e){switch(t.status){case 0:return"-";case 1:return"正常";case 2:return"即将过期";case 3:return"已过期"}}},{fixed:!1,prop:"checkStatus",label:"审核状态",sortable:!0,visible:!0,format:function(e,a){return t.$store.getters.findDingStatus(e.checkStatus)?t.$store.getters.findDingStatus(e.checkStatus).val:"未开始"}}],page:{sizes:[10,20,30,50,100,500],offset:1,limit:10,count:0,currentPage:1},menu_nav:["CPA数据管理","渠道合同管理"],channel_items:{model_value:"",placeHolder:"渠道",options:[]},contract_items:{model_value:"",placeHolder:"状态",options:[{id:"1",val:"正常"},{id:"2",val:"即将过期"},{id:"3",val:"已过期"}]},tableData:[],contractNo:"",isFirstEnter:!1}},activated:function(){this.$route.meta.isBack&&!this.isFirstEnter||this.channelInfo(),this.$route.meta.isBack=!1,this.isFirstEnter=!1,this.pageInfo()},created:function(){this.isFirstEnter=!0},methods:{channelInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.channelSearch,params:{offset:1,limit:9999,val:""}}).then(function(e){if(200==e.status){var a=e.data;a.items.length>0&&(t.channel_items.options=a.items)}}).catch(function(t){console.log(t)})},pageInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.channelConSearch,params:{offset:this.page.offset,limit:this.page.limit,contractNo:this.contractNo,channelCode:this.channel_items.model_value,contractStatus:this.contract_items.model_value}}).then(function(e){if(200==e.status){var a=e.data;t.page.count=a.totalNums,t.tableData=a.items}}).catch(function(t){console.log(t)})},handleCurrentChange:function(t){this.page.offset=t,this.pageInfo()},handleSizeChange:function(t){this.page.limit=t,this.pageInfo()},checkedChange:function(){var t=!0,e=!1,a=void 0;try{for(var i,s=n()(this.table_column);!(t=(i=s.next()).done);t=!0){var l=i.value,o=this.checkedCities.indexOf(l.label);l.visible=o>=0}}catch(t){e=!0,a=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw a}}},changeCheckStatus:function(t){t.stopPropagation(),this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},newContract:function(){this.$router.push({path:"channelContractNew",query:{channelContractId:""}})},bodyEvent:function(){this.visibleMenuSelectStatus=!1},preventDefault:function(t){t.stopPropagation()},exitEvent:function(t){this.$router.push({path:"channelContractNew",query:{channelContractId:t}})},handleSuccess:function(t,e,a){this.importTitleTxt=t,this.importTitleStatus=!0},uploadError:function(t,e,a){this.$message({type:"error",message:"上传失败，请重试"})},beforeAvatarUpload:function(t){var e=t.name.split("."),a=e.length-1,i="csv"===e[a],n=t.size/1024/1024<2;return i||this.$message({type:"info",message:"上传渠道包只能是 csv 格式"}),n||this.$message({type:"info",message:"上传包大小不能超过 2MB"}),i&&n},exitImportTitle:function(){this.importTitleStatus=!1,this.pageInfo()}}}},LL70:function(t,e,a){e=t.exports=a("UTlt")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"channelContractMana.vue",sourceRoot:""}])},"W+Cn":function(t,e,a){"use strict";function i(t){a("s3R6")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("B2il"),s=a("AD+i"),l=a("vSla"),o=i,c=l(n.a,s.a,!1,o,null,null);e.default=c.exports},s3R6:function(t,e,a){var i=a("LL70");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("4b687f42",i,!0,{})}});
//# sourceMappingURL=69.1fff854725fb9f674cba.js.map