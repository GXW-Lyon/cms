webpackJsonp([73],{"242b":function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"changeChannelPrices.vue",sourceRoot:""}])},Hjpl:function(e,t,a){"use strict";var i=a("HzJ8"),s=a.n(i);t.a={data:function(){return{fileList:[],importTitleStatus:!1,importTitleTxt:"",visibleMenuSelectStatus:!1,dialogVisible:!1,loading:!1,checkAll:!0,checkedCities:["客户名称","产品名称","上游渠道号","价格"],cities:["客户名称","产品名称","上游渠道号","价格"],table_column:[{fixed:!1,prop:"customerName",label:"客户名称",sortable:!1,visible:!0},{fixed:!1,prop:"productName",label:"产品名称",sortable:!1,visible:!0},{fixed:!1,prop:"packageName",label:"上游渠道号",sortable:!1,visible:!0,width:280},{fixed:!1,prop:"currentPrice",label:"价格",sortable:!1,visible:!0}],dateValue:new Date,page:{sizes:[100,500],offset:1,limit:100,count:0,currentPage:1},menu_nav:["CPA数据管理","渠道批量改价格"],channel_items:{model_value:"",placeHolder:"渠道",options:[]},customer_items:{model_value:"",placeHolder:"客户",options:[]},pro_items:{model_value:"",placeHolder:"产品",options:[]},channelPro_items:{model_value:"",placeHolder:"上游渠道号",options:[]},params:{type:"",val:"",date:"",price:""},tableData:[],idList:[],contractNo:"",isFirstEnter:!1}},activated:function(){this.$route.meta.isBack&&!this.isFirstEnter||(this.channelInfo(),this.dateChange()),this.$route.meta.isBack=!1,this.isFirstEnter=!1},created:function(){this.isFirstEnter=!0},methods:{channelInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelSearch,params:{offset:1,limit:9999,val:""}}).then(function(t){if(200==t.status){var a=t.data;a.items.length>0&&(e.channel_items.options=a.items)}}).catch(function(e){console.log(e)})},customerInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelProListCustomer,params:{channelCode:this.channel_items.model_value}}).then(function(t){if(200==t.status){var a=t.data;e.customer_items.options=a.customerItems}}).catch(function(e){console.log(e)})},proInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelProList,params:{customerCode:this.customer_items.model_value,channelCode:this.channel_items.model_value}}).then(function(t){if(200==t.status){var a=t.data;e.pro_items.options=a.items}}).catch(function(e){console.log(e)})},channelPro:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelProListPack,params:{productCode:this.pro_items.model_value,channelCode:this.channel_items.model_value}}).then(function(t){if(200==t.status){var a=t.data;e.channelPro_items.options=a.items}}).catch(function(e){console.log(e)})},pageInfo:function(){var e=this;return this.params.date?""==this.channel_items.model_value?(this.$message({type:"info",message:"请选择渠道"}),!1):void this.$http({method:"get",url:this.apiUrl.channelProListPackage,params:{offset:this.page.offset,limit:this.page.limit,datetime:this.params.date,channelCode:this.channel_items.model_value,type:3!=this.params.type?this.params.type:null,code:3!=this.params.type?this.params.val:null}}).then(function(t){if(200==t.status){var a=t.data;e.page.count=a.totalNums;var i=!0,l=!1,n=void 0;try{for(var o,c=s()(a.items);!(i=(o=c.next()).done);i=!0){o.value.validStatus=!1}}catch(e){l=!0,n=e}finally{try{!i&&c.return&&c.return()}finally{if(l)throw n}}a.items.length>0&&a.items.unshift({validStatus:"button"}),e.checkAll=!0,e.tableData=a.items,e.idList=[]}}).catch(function(e){console.log(e)}):(this.$message({type:"info",message:"请选择日期"}),!1)},select:function(e,t){if(""!=t&&void 0!==t)switch(this.params.type=e,this.params.val=t,e){case"3":this.customer_items.model_value=this.pro_items.model_value=this.channelPro_items.model_value="",this.pro_items.options=this.channelPro_items.options=[],this.customerInfo();break;case"1":this.pro_items.model_value=this.channelPro_items.model_value="",this.channelPro_items.options=[],this.proInfo();break;case"2":this.channelPro_items.model_value="",this.channelPro()}},handleCurrentChange:function(e){this.page.offset=e,this.pageInfo()},handleSizeChange:function(e){this.page.limit=e,this.pageInfo()},checkedChange:function(){var e=!0,t=!1,a=void 0;try{for(var i,l=s()(this.table_column);!(e=(i=l.next()).done);e=!0){var n=i.value,o=this.checkedCities.indexOf(n.label);n.visible=o>=0}}catch(e){t=!0,a=e}finally{try{!e&&l.return&&l.return()}finally{if(t)throw a}}},changeCheckStatus:function(e){e.stopPropagation(),this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},bodyEvent:function(){this.visibleMenuSelectStatus=!1},preventDefault:function(e){e.stopPropagation()},dateChange:function(){""!=this.dateValue&&void 0!==this.dateValue?this.params.date=this.formatDateTime(this.dateValue,"y-m-d"):this.params.date=""},checkAllEvent:function(){var e=!0,t=!0,a=!1,i=void 0;try{for(var l,n=s()(this.tableData);!(t=(l=n.next()).done);t=!0){var o=l.value;"button"!=o.validStatus&&(o.validStatus=this.checkAll,e=!1)}}catch(e){a=!0,i=e}finally{try{!t&&n.return&&n.return()}finally{if(a)throw i}}if(e)return!1;this.checkAll=!this.checkAll},changePriceBut:function(){if(!this.params.date)return this.$message({type:"info",message:"请选择日期"}),!1;this.idList=[];var e=!0,t=!1,a=void 0;try{for(var i,l=s()(this.tableData);!(e=(i=l.next()).done);e=!0){var n=i.value;n.validStatus&&"button"!=n.validStatus&&this.idList.push(n.channelProductCode)}}catch(e){t=!0,a=e}finally{try{!e&&l.return&&l.return()}finally{if(t)throw a}}if(0==this.idList.length)return this.$message({type:"info",message:"请选择包"}),!1;this.params.price="",this.dialogVisible=!0},changePriceSub:function(){this.params.price?this.changePriceApi():this.$message({type:"info",message:"请输入价格"})},changePriceApi:function(){var e=this;this.dialogVisible=!1,this.loading=!0,this.$http({method:"post",url:this.apiUrl.channelProUpdatePackPrice,data:{datetime:this.params.date,channelProductCode:this.idList,prices:this.params.price}}).then(function(t){e.loading=!1,(t.status=200)&&(1==t.data.status?(e.$message({type:"success",message:t.data.msg}),e.pageInfo()):e.$message({type:"error",message:t.data.msg}))}).catch(function(t){console.log(t),e.loading=!1,e.$message({type:"error",message:t.response.data})})}}}},"JK/w":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:e.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),e._l(e.menu_nav,function(t,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[e._v(e._s(t))])])})],2)]),e._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"customerProCitySearch"},[a("div",{staticClass:"block",staticStyle:{"margin-right":"14px"}},[a("span",{staticClass:"demonstration"},[e._v("选择日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},on:{change:e.dateChange},model:{value:e.dateValue,callback:function(t){e.dateValue=t},expression:"dateValue"}})],1),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:e.channel_items.placeHolder,filterable:""},on:{change:function(t){e.select("3",e.channel_items.model_value)}},model:{value:e.channel_items.model_value,callback:function(t){e.$set(e.channel_items,"model_value",t)},expression:"channel_items.model_value"}},e._l(e.channel_items.options,function(e){return a("el-option",{key:e.channelCode,attrs:{label:e.name,value:e.channelCode}})})),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:e.customer_items.placeHolder,filterable:""},on:{change:function(t){e.select("1",e.customer_items.model_value)}},model:{value:e.customer_items.model_value,callback:function(t){e.$set(e.customer_items,"model_value",t)},expression:"customer_items.model_value"}},e._l(e.customer_items.options,function(e){return a("el-option",{key:e.customerCode,attrs:{label:e.name,value:e.customerCode}})})),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:e.pro_items.placeHolder},on:{change:function(t){e.select("2",e.pro_items.model_value)}},model:{value:e.pro_items.model_value,callback:function(t){e.$set(e.pro_items,"model_value",t)},expression:"pro_items.model_value"}},e._l(e.pro_items.options,function(e){return a("el-option",{key:e.productCode,attrs:{label:e.productName,value:e.productCode}})})),a("el-select",{staticClass:"con_select unBorderRadius",attrs:{placeholder:e.channelPro_items.placeHolder},on:{change:function(t){e.select("4",e.channelPro_items.model_value)}},model:{value:e.channelPro_items.model_value,callback:function(t){e.$set(e.channelPro_items,"model_value",t)},expression:"channelPro_items.model_value"}},e._l(e.channelPro_items.options,function(e){return a("el-option",{key:e.customerProductCode,attrs:{label:e.productChannelCode,value:e.customerProductCode}})})),e._v(" "),a("el-button",{staticClass:"page_d_s_button",staticStyle:{float:"right","margin-right":"0"},on:{click:e.pageInfo}},[e._v("查询")]),e._v(" "),a("div",{staticClass:"dateBut",staticStyle:{"margin-top":"4px"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.changePriceBut}},[e._v("批量修改")])],1)],1)])]),e._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i",{staticStyle:{visibility:"hidden"}}),a("span"),e._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(t){e.changeCheckStatus(t)}}}),e._v(" "),e.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(t){e.preventDefault(t)}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:e.checkedChange},model:{value:e.checkedCities,callback:function(t){e.checkedCities=t},expression:"checkedCities"}},e._l(e.cities,function(t){return a("el-checkbox",{key:t,attrs:{label:t}},[e._v(e._s(t))])}))],1):e._e()])]),e._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"拼命加载中",data:e.tableData,border:"",stripe:""}},[e._l(e.table_column,function(t,i){return t.visible?a("el-table-column",{key:i,attrs:{fixed:t.fixed,sortable:t.sortable,prop:t.prop,label:t.label,formatter:t.format,width:t.width,"min-width":"100"}}):e._e()}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100","min-width":"100","class-name":"exitBut"},scopedSlots:e._u([{key:"default",fn:function(t){return["button"==t.row.validStatus?a("span",{staticClass:"r_span",on:{click:e.checkAllEvent}},[e._v(e._s(e.checkAll?"全选":"取消全选"))]):a("el-checkbox",{model:{value:t.row.validStatus,callback:function(a){e.$set(t.row,"validStatus",a)},expression:"scope.row.validStatus"}})]}}])})],2)],1)]),e._v(" "),a("div",{staticClass:"con_pager"},[a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.page.currentPage,"page-sizes":e.page.sizes,"page-size":e.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.page.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.page,"currentPage",t)}}})],1)]),e._v(" "),a("el-dialog",{attrs:{title:"输入价格：",visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-input",{attrs:{type:"number",placeholder:""},model:{value:e.params.price,callback:function(t){e.$set(e.params,"price",t)},expression:"params.price"}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{height:"auto"},attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{staticStyle:{height:"auto"},attrs:{type:"primary"},on:{click:e.changePriceSub}},[e._v("确 定")])],1)],1)],1)])},s=[],l={render:i,staticRenderFns:s};t.a=l},xNzu:function(e,t,a){"use strict";function i(e){a("zDFR")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("Hjpl"),l=a("JK/w"),n=a("vSla"),o=i,c=n(s.a,l.a,!1,o,null,null);t.default=c.exports},zDFR:function(e,t,a){var i=a("242b");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("FIqI")("74eaa191",i,!0,{})}});
//# sourceMappingURL=73.be95519e92b885a50889.js.map