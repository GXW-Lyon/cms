webpackJsonp([75],{"3Wtl":function(e,t,a){var i=a("ByFf");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("FIqI")("5e77a8cb",i,!0,{})},ByFf:function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"detailAD.vue",sourceRoot:""}])},cXY9:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"info_flow_content",on:{click:e.bodyEvent}},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),e._l(e.menu_nav,function(t,i){return a("span",{key:i},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[e._v(e._s(t))])])})],2)]),e._v(" "),a("div",{staticClass:"info_ad_search"},[a("div",{staticClass:"info_a_s_content"},[a("div",{staticClass:"dateSelect"},[a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[e._v("检索条件")]),e._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围",format:"yyyy / MM / dd","picker-options":e.$store.state.pickerOptions2},on:{change:e.dateChange},model:{value:e.dateValue,callback:function(t){e.dateValue=t},expression:"dateValue"}})],1),e._v(" "),e._l(e.select_items,function(t,i){return a("el-select",{key:i,staticClass:"con_select",attrs:{placeholder:t.placeHolder},on:{change:function(a){e.selectChange(t.param,t.model_value)}},model:{value:t.model_value,callback:function(a){e.$set(t,"model_value",a)},expression:"c.model_value"}},e._l(t.options,function(e){return a("el-option",{key:e.id,attrs:{label:e.val,value:e.id}})}))}),e._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:e.searchQuery}},[e._v("查询")])],2),e._v(" "),a("div",{staticClass:"citySearch"},[a("span",{staticClass:"demonstration"},[e._v("目标查询")]),e._v(" "),a("el-input",{staticClass:"page_d_select",attrs:{placeholder:"请输入搜索城市"},model:{value:e.api_params.city,callback:function(t){e.$set(e.api_params,"city",t)},expression:"api_params.city"}}),e._v(" "),a("el-button",{staticClass:"page_d_s_button",on:{click:e.searchCity}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"info_ad_table"},[a("div",{staticClass:"page_d_title"},[a("i"),a("span",[e._v("详细数据")]),e._v(" "),a("div",{staticClass:"tableVisibleMenu"},[a("p",{staticClass:"visibleMenuBut",on:{click:function(t){e.changeCheckStatus(t)}}}),e._v(" "),e.visibleMenuSelectStatus?a("div",{staticClass:"visibleMenuSelect",on:{click:function(t){e.preventDefault(t)}}},[a("el-checkbox-group",{attrs:{min:1},on:{change:e.checkedChange},model:{value:e.checkedCities,callback:function(t){e.checkedCities=t},expression:"checkedCities"}},e._l(e.cities,function(t){return a("el-checkbox",{key:t,attrs:{label:t}},[e._v(e._s(t))])}))],1):e._e()])]),e._v(" "),a("div",{staticClass:"tableDetail"},[a("el-table",{staticStyle:{width:"100%!important"},attrs:{data:e.tableData,border:"",stripe:"",fit:"","min-height":"440"}},[e._l(e.table_column,function(t,i){return t.visible?a("el-table-column",{key:t.prop,attrs:{fixed:t.fixed,sortable:t.sortable,prop:t.prop,label:t.label,formatter:t.format,width:"","min-width":"100","class-name":t.prop.split(".")[1]}}):e._e()}),e._v(" "),e._l(e.table_column_pic,function(t,i){return t.visible?a("el-table-column",{key:t.prop,attrs:{fixed:t.fixed,sortable:t.sortable,prop:t.prop,label:t.label,formatter:t.format,"class-name":t.prop.split(".")[1],width:"","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(i){return e._l("广告截图"==t.label?i.row.crawlAttr.adPicUrls:i.row.crawlAttr.landpagePicUrls,function(l,s){return a("img",{key:s,attrs:{src:l},on:{click:function(a){e.preImg("广告截图"==t.label?i.row.crawlAttr.adPicUrls:i.row.crawlAttr.landpagePicUrls)}}})})}}])}):e._e()}),e._v(" "),e._l(e.table_column_isDownload,function(t,i){return t.visible?a("el-table-column",{key:t.prop,attrs:{fixed:t.fixed,sortable:t.sortable,prop:t.prop,label:t.label,formatter:t.format,"class-name":t.prop.split(".")[1],"label-class-name":t.prop.split(".")[1]+"title",width:"","min-width":"100"}}):e._e()})],2)],1)]),e._v(" "),a("div",{staticClass:"con_pager"},[a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.page.currentPage,"page-sizes":e.page.sizes,"page-size":e.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.page.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.page,"currentPage",t)}}})],1)]),e._v(" "),e.replaceInfo.bigImgStatus?a("div",{staticClass:"page_d_con_right big_img"},[a("i",{staticClass:"el-icon-close",on:{click:e.exit_replace}}),e._v(" "),a("div",{staticClass:"page_d_current page_create_current"},[a("div",{staticClass:"current_page_title create_page_title"},[e._v("落地页预览")]),e._v(" "),a("div",{staticClass:"replace_img"}),e._v(" "),a("div",{staticClass:"current_img"},e._l(e.replaceInfo.picUrls,function(e){return a("img",{staticClass:"image replaceImg",attrs:{src:e}})}))])]):e._e(),e._v(" "),e.replaceInfo.mengcengStatus?a("div",{staticClass:"mengceng",on:{click:e.exit_replace}}):e._e()])])},l=[],s={render:i,staticRenderFns:l};t.a=s},oAMi:function(e,t,a){"use strict";var i=a("HzJ8"),l=a.n(i);t.a={data:function(){return{replaceInfo:{bigImgStatus:!1,mengcengStatus:!1,picUrls:[]},visibleMenuSelectStatus:!1,checkedCities:["区域","省份","城市","日期","时间","位置","位置2","产品名称","文案","广告截图","链接1地址","链接1页面","链接2地址","来源","归属"],cities:["日期","时间","区域","省份","城市","位置","位置2","产品名称","文案","广告截图","链接1地址","链接1页面","链接2地址","来源","归属"],table_column:[{fixed:!0,prop:"date",label:"日期",sortable:!0,visible:!0,format:function(e,t){return e.date.split(" ")[0]}},{fixed:!1,prop:"time",label:"时间",sortable:!1,visible:!0,format:function(e,t){return e.date.split(" ")[1]}},{fixed:!1,prop:"areaName",label:"区域",sortable:!1,visible:!0},{fixed:!1,prop:"provinceName",label:"省份",sortable:!1,visible:!0},{fixed:!1,prop:"cityName",label:"城市",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.type",label:"位置",sortable:!1,visible:!0,format:function(e,t){return"信息流"}},{fixed:!1,prop:"crawlAttr.position",label:"位置2",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.productTitle",label:"产品名称",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.adDesc",label:"文案",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.landpageUrl",label:"链接1地址",sortable:!1,visible:!0,format:function(e,t){return 1==e.crawlAttr.isDownload?e.crawlAttr.apkUrl:e.crawlAttr.landpageUrl}},{fixed:!1,prop:"",label:"链接2地址",sortable:!1,visible:!0}],table_column_pic:[{fixed:!1,prop:"crawlAttr.adPicUrls",label:"广告截图",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.landpagePicUrls",label:"链接1页面",sortable:!1,visible:!0}],table_column_isDownload:[{fixed:!1,prop:"crawlAttr.referer",label:"来源",sortable:!1,visible:!0},{fixed:!1,prop:"crawlAttr.isDownload",label:"归属",sortable:!1,visible:!0,format:function(e,t){return 1==e.crawlAttr.isDownload?"√":"×"}}],page:{sizes:[10,20,30,50,100],offset:1,limit:30,count:0,currentPage:1},api_params:{st:"",et:"",areaId:"",provinceId:"",cityId:"",isOwn:"",city:""},menu_nav:["地域广告","信息流广告"],select_items:[{model_value:"",param:"areaId",placeHolder:"区域",options:[{id:"1",val:"1"}]},{model_value:"",param:"provinceId",placeHolder:"省份",options:[{id:"1",val:"1"}]},{model_value:"",param:"cityId",placeHolder:"城市",options:[{id:"1",val:"1"}]},{model_value:"",param:"isOwn",placeHolder:"归属",options:[{id:"1",val:"1"}]}],tableData:[],dateValue:""}},activated:function(){this.infoFlowInit()},created:function(){},methods:{infoFlowInit:function(){var e=this;this.$http({method:"get",url:this.apiUrl.crawlListUrl,params:{page:this.page.offset,limit:this.page.limit,type:"2",st:this.api_params.st,et:this.api_params.et,areaId:this.api_params.areaId,provinceId:this.api_params.provinceId,cityId:this.api_params.cityId,isOwn:this.api_params.isOwn,city:this.api_params.city}}).then(function(t){var a=t.data;200==t.status&&(e.page.count=a.total,e.tableData=a.list)}).catch(function(e){console.log(e)})},handleCurrentChange:function(e){this.page.offset=e,this.infoFlowInit()},handleSizeChange:function(e){this.page.limit=e,this.infoFlowInit()},checkedChange:function(){var e=!0,t=!1,a=void 0;try{for(var i,s=l()(this.table_column);!(e=(i=s.next()).done);e=!0){var r=i.value,n=this.checkedCities.indexOf(r.label);r.visible=n>=0}}catch(e){t=!0,a=e}finally{try{!e&&s.return&&s.return()}finally{if(t)throw a}}var c=!0,o=!1,p=void 0;try{for(var u,d=l()(this.table_column_pic);!(c=(u=d.next()).done);c=!0){var f=u.value,n=this.checkedCities.indexOf(f.label);f.visible=n>=0}}catch(e){o=!0,p=e}finally{try{!c&&d.return&&d.return()}finally{if(o)throw p}}var v=!0,_=!1,b=void 0;try{for(var h,m=l()(this.table_column_isDownload);!(v=(h=m.next()).done);v=!0){var g=h.value,n=this.checkedCities.indexOf(g.label);g.visible=n>=0}}catch(e){_=!0,b=e}finally{try{!v&&m.return&&m.return()}finally{if(_)throw b}}},changeCheckStatus:function(e){e.stopPropagation(),this.visibleMenuSelectStatus=!this.visibleMenuSelectStatus},dateChange:function(){this.api_params.st=this.dateFormat(this.dateValue[0]),this.api_params.et=this.dateFormat(this.dateValue[1])},selectChange:function(e,t){this.api_params[e]=t},searchCity:function(){this.page.offset=1,this.page.currentPage=1,this.infoFlowInit()},searchQuery:function(){this.page.offset=1,this.page.currentPage=1,this.infoFlowInit()},bodyEvent:function(){this.visibleMenuSelectStatus=!1},preventDefault:function(e){e.stopPropagation()},preImg:function(e){this.replaceInfo.picUrls=e,this.replaceInfo.mengcengStatus=!0,this.replaceInfo.bigImgStatus=!0},exit_replace:function(){this.replaceInfo.bigImgStatus=!1,this.replaceInfo.mengcengStatus=!1}}}},xXIA:function(e,t,a){"use strict";function i(e){a("3Wtl")}Object.defineProperty(t,"__esModule",{value:!0});var l=a("oAMi"),s=a("cXY9"),r=a("vSla"),n=i,c=r(l.a,s.a,!1,n,null,null);t.default=c.exports}});
//# sourceMappingURL=75.a882b7a44a880728a780.js.map