webpackJsonp([62],{Dw8s:function(e,t,a){var n=a("UksU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("FIqI")("a84dc6da",n,!0,{})},UksU:function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"channelProNew.vue",sourceRoot:""}])},cgzz:function(e,t,a){"use strict";t.a={data:function(){return{pageTitle:"创建产品信息",menu_nav:["CPA数据管理","渠道产品管理","创建产品信息"],isRightBox:!1,dateStatus:!1,importTitleStatus:!1,importTitleTxt:"",channelPro_from:{channelCode:"",status:0,channelPrices:[{date:"",deleted:!1,disable:!1,disexist:!1,price:""}],customerProductCode:"",channelStatus:[{onLineDate:"",offLineDate:"",deleted:!1,disable:!1}],customerCode:"",productCode:""},lineDate:[],customer_items:{placeHolder:"客户",options:[]},pro_items:{placeHolder:"产品",options:[]},channelPro_items:{model_value:"",placeHolder:"上游渠道号",options:[]},channel_items:{model_value:"",placeHolder:"渠道",options:[]},options:{product:[{id:"",val:""}]},value3:"目前该时间点为上线状态",channelProductId:""}},created:function(){this.customerSelect(),this.channelProductId=this.$route.query.channelProductId,""!=this.channelProductId&&(this.pageInfo(),this.pageTitle="编辑产品信息",this.dateStatus=!0)},methods:{customerSelect:function(){var e=this;this.$http({method:"get",url:this.apiUrl.customerSearch,params:{offset:1,limit:9999,val:""}}).then(function(t){if(200==t.status){var a=t.data;e.customer_items.options=a.items}}).catch(function(e){console.log(e)}),this.$http({method:"get",url:this.apiUrl.channelSearch,params:{offset:1,limit:9999,val:""}}).then(function(t){if(200==t.status){var a=t.data;a.items.length>0&&(e.channel_items.options=a.items)}}).catch(function(e){console.log(e)})},proInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.customerProListLight,params:{customerCode:this.channelPro_from.customerCode}}).then(function(t){if(200==t.status){var a=t.data;e.pro_items.options=a.items,""!=e.channelProductId||(e.channelPro_from.productCode="")}}).catch(function(e){console.log(e)})},pageInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelProGet,params:{id:this.channelProductId}}).then(function(t){(t.status=200)&&(e.channelPro_from=t.data,e.channelPro_from.channelStatus.forEach(function(t){t.isValueChange=!1,e.lineDate.push({onLineDate:t.onLineDate,offLineDate:t.offLineDate})}),e.channelPro_from.status=parseInt(e.channelPro_from.status))}).catch(function(e){})},channelProInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.customerProSearch,params:{offset:1,limit:9999,type:2,code:this.channelPro_from.productCode}}).then(function(t){if(200==t.status){var a=t.data;e.channelPro_items.options=a.items,""!=e.channelProductId||(e.channelPro_from.customerProductCode="")}}).catch(function(e){console.log(e)})},cusSelect:function(){this.proInfo()},proSelect:function(){this.channelProInfo()},onSubmit:function(){var e=this,t=this.channelPro_from.channelPrices,a=t.length,n=!1;if(""!=this.channelProductId&&this.channelProductId)for(var o=0;o<a;o++){if(!(""!=t[o].date&&""!=t[o].price&&t[o].date||t[o].deleted))return this.$message({type:"info",message:"渠道价不能为空，请修改并重新提交"}),!1;t[o].disexist&&(n=!0)}else{for(var i=0;i<a;i++)""!=t[i].date&&""!=t[i].price&&t[i].date?t[i].disexist&&(n=!0):(t.splice(i,1),i--,a=t.length);0==a&&this.addPrice()}if(n)return this.$message({type:"info",message:"存在重复的渠道价，请修改或删除并重新提交"}),!1;for(var s=this.channelPro_from.channelStatus,l=s.length;l--;)if(s[l].onLineDate||s[l].offLineDate){if(s[l].onLineDate=s[l].onLineDate||"1970-01-01",s[l].offLineDate=s[l].offLineDate||"9999-12-31",s[l].onLineDate>=s[l].offLineDate&&!s[l].deleted)return this.$message({type:"info",message:"上线时间不能大于或等于下线时间，请修改并重新提交"}),!1}else s.splice(l,1);if(0==(l=s.length))return this.addStatus(),this.$message({type:"info",message:"上下线时间不能为空，请修改并重新提交"}),!1;var r=this.apiUrl.channelProNew;""!=this.channelProductId&&(r=this.apiUrl.channelProUpdate);for(var c in this.channelPro_from)if("channelPrices"!=c&&"status"!=c&&""==this.channelPro_from[c])return this.$message({type:"info",message:"名称、渠道号、渠道为空或数据异常，请重新选择并提交"}),!1;this.$http({method:"post",url:r,data:this.channelPro_from}).then(function(t){if(200==t.status){var a=t.data;2==a.status||a.status<0?(e.importTitleTxt=a.msg.replace(/\|/g,"<br>"),e.importTitleStatus=!0):(e.$message({type:"success",message:"操作成功"}),e.go_back())}else e.$message({type:"error",message:"操作失败，请完善信息，并重新提交"})}).catch(function(t){console.log(t),e.$message({type:"error",message:"请完善信息，并重新提交"})})},go_back:function(){this.$router.back()},deletePrice:function(e){var t=this.channelPro_from.channelPrices,a=t.length,n=!1;if(""!=this.channelProductId&&this.channelProductId)for(var o=0;o<a;o++)t[o].disexist&&(n=!0);if(n)return this.$message({type:"info",message:"存在重复的渠道价，请修改后再进行删除"}),!1;this.channelPro_from.channelPrices[e].deleted=!0,this.channelPro_from.channelPrices[e].disexist=!1},deleteStatus:function(e){this.channelPro_from.channelStatus[e].deleted=!0},addPrice:function(){this.channelPro_from.channelPrices.push({date:"",deleted:!1,disable:!1,disexist:!1,price:""})},addStatus:function(){this.channelPro_from.channelStatus.push({onLineDate:"",offLineDate:"",deleted:!1,disable:!1,isValueChange:!1}),this.lineDate.push({onLineDate:"",offLineDate:""})},dateChange:function(e,t){var a=this.channelPro_from[e][t].date||"";this.channelPro_from[e][t].date=""!=a&&"undefined"!=a&&void 0!==a&&a?this.formatDateTime(new Date(a),"y-m-d"):"","channelPrices"==e&&this.priceInputChange(t)},channelStatusDateChange:function(e,t){var a=this.channelPro_from.channelStatus[t][e]||"";this.channelPro_from.channelStatus[t][e]=""!=a&&"undefined"!=a&&void 0!==a&&a?this.formatDateTime(new Date(a),"y-m-d"):"",this.dateStatus&&this.lineDateChange(t)},lineDateChange:function(e){var t=this.lineDate[e],a=this.channelPro_from.channelStatus[e];t.onLineDate==a.onLineDate&&t.offLineDate==a.offLineDate?a.isValueChange=!1:a.isValueChange=!0},priceInputChange:function(e){var t=this.channelPro_from.channelPrices,a=this.channelPro_from.channelPrices[e];if(a.price&&a.date)try{t.forEach(function(t,n){n!=e&&t.date==a.date&&t.price&&!t.deleted?(a.disexist=!0,foreach.break=new Error("StopIteration")):n!=e&&t.date!=a.date&&t.price&&!t.deleted&&(a.disexist=!1)})}catch(e){if("foreach is not defined"===e.message)return;throw e}else t.forEach(function(e,a){if(e.disexist&&e.date&&e.price){var n=!0;t.forEach(function(t,o){a!=o&&e.date==t.date&&t.price&&(n=!1)}),n&&(e.disexist=!1)}else e.disexist=!1})},exitImportTitle:function(){this.importTitleStatus=!1}}}},lNXX:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"page_create channelProNew"},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),e._l(e.menu_nav,function(t,n){return a("span",{key:n},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[e._v(e._s(t))])])})],2)]),e._v(" "),a("div",{staticClass:"page_d_title"},[a("i"),a("span",[e._v(e._s(e.pageTitle))])]),e._v(" "),a("div",{staticClass:"page_d_con"},[a("div",{staticClass:"page_d_con_left cpa_page_left",class:{page_d_con_left_widthAll:!e.isRightBox}},[a("div",{staticClass:"banner_part_line page_create_set_line"},[e._v("产品信息")]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.channelPro_from,"label-width":"125px"}},[a("el-form-item",{attrs:{label:"客户名称："}},[a("el-select",{staticClass:"f_select1",attrs:{filterable:"",placeholder:"请选择",disabled:e.dateStatus},on:{change:e.cusSelect},model:{value:e.channelPro_from.customerCode,callback:function(t){e.$set(e.channelPro_from,"customerCode",t)},expression:"channelPro_from.customerCode"}},e._l(e.customer_items.options,function(e,t){return a("el-option",{key:e.customerCode,attrs:{label:e.name,value:e.customerCode}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"产品名称："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择",disabled:e.dateStatus},on:{change:e.proSelect},model:{value:e.channelPro_from.productCode,callback:function(t){e.$set(e.channelPro_from,"productCode",t)},expression:"channelPro_from.productCode"}},e._l(e.pro_items.options,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.productName,value:e.customerProductCode}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"上游渠道号："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择",disabled:e.dateStatus,filterable:""},on:{change:function(e){}},model:{value:e.channelPro_from.customerProductCode,callback:function(t){e.$set(e.channelPro_from,"customerProductCode",t)},expression:"channelPro_from.customerProductCode"}},e._l(e.channelPro_items.options,function(e,t){return a("el-option",{key:e.productPackageCode,attrs:{label:e.productChannelCode,value:e.productPackageCode,disabled:1==e.packageStatus}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"投放渠道："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择",disabled:e.dateStatus,filterable:""},model:{value:e.channelPro_from.channelCode,callback:function(t){e.$set(e.channelPro_from,"channelCode",t)},expression:"channelPro_from.channelCode"}},e._l(e.channel_items.options,function(e,t){return a("el-option",{key:e.channelCode,attrs:{label:e.channelCode+" "+e.name,value:e.channelCode}})}))],1),e._v(" "),a("el-form-item",{staticStyle:{height:"auto"},attrs:{label:"渠道价："}},[e._l(e.channelPro_from.channelPrices,function(t,n){return t.deleted?e._e():a("div",{key:t.id},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:!1},on:{change:function(t){e.dateChange("channelPrices",n)}},model:{value:t.date,callback:function(a){e.$set(t,"date",a)},expression:"item.date"}}),e._v(" "),a("el-input",{staticClass:"el_input_short",attrs:{disabled:!1,placeholder:"请输入渠道价"},on:{change:function(t){e.priceInputChange(n)}},model:{value:t.price,callback:function(a){e.$set(t,"price",a)},expression:"item.price"}}),e._v("\n                                元\n                                "),e.dateStatus?a("span",{staticClass:"r_span",staticStyle:{"font-size":"16px"},on:{click:function(t){e.deletePrice(n)}}},[e._v("删除")]):e._e(),e._v(" "),t.disexist?a("span",{staticStyle:{display:"inline-block","margin-left":"10px",color:"red"}},[e._v("* 已存在")]):e._e()],1)}),e._v(" "),a("el-button",{on:{click:e.addPrice}},[e._v("添加一行")])],2),e._v(" "),e._l(e.channelPro_from.channelStatus,function(t,n){return t.deleted?e._e():a("div",{key:t.id},[a("el-form-item",{staticStyle:{height:"auto",display:"inline-block"},attrs:{label:"上线时间:"}},[a("div",[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:t.disable},on:{change:function(t){e.channelStatusDateChange("onLineDate",n)}},model:{value:t.onLineDate,callback:function(a){e.$set(t,"onLineDate",a)},expression:"item.onLineDate"}})],1)]),e._v(" "),a("el-form-item",{staticStyle:{height:"auto",display:"inline-block"},attrs:{label:"下线时间:"}},[a("div",[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:t.disable},on:{change:function(t){e.channelStatusDateChange("offLineDate",n)}},model:{value:t.offLineDate,callback:function(a){e.$set(t,"offLineDate",a)},expression:"item.offLineDate"}})],1)]),e._v(" "),e.dateStatus?a("span",{staticClass:"r_span",staticStyle:{"font-size":"16px"},on:{click:function(t){e.deleteStatus(n)}}},[e._v("删除")]):e._e()],1)}),e._v(" "),a("el-button",{staticStyle:{margin:"0 0 6px 125px"},on:{click:e.addStatus}},[e._v("添加一行")]),e._v(" "),a("el-form-item",{attrs:{label:"是否封包："}},[a("el-radio-group",{staticClass:"f_radio2 f_radio",model:{value:e.channelPro_from.status,callback:function(t){e.$set(e.channelPro_from,"status",t)},expression:"channelPro_from.status"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{staticClass:"form_button"},[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确认")]),e._v(" "),a("el-button",{on:{click:function(t){e.go_back()}}},[e._v("返回")])],1)],2)],1),e._v(" "),e.isRightBox?a("div",{staticClass:"page_d_con_right cpa_page_right"},[a("div",{staticClass:"page_d_current page_create_current"},[a("div",{staticClass:"current_page_title create_page_title"},[e._v("操作历史记录")]),e._v(" "),a("div",{staticClass:"current_img"},e._l(4,function(t){return a("div",{key:t,staticClass:"text item"},[e._v("\n                                "+e._s("列表内容 "+t)+"\n                            ")])}))])]):e._e()]),e._v(" "),e.importTitleStatus?a("div",{staticClass:"importTitle",on:{click:function(e){e.stopPropagation()}}},[a("div",{staticClass:"importTitle_top"},[a("span",[e._v("提示")]),e._v(" "),a("button",{on:{click:function(t){return t.stopPropagation(),e.exitImportTitle(t)}}},[e._v("×")])]),e._v(" "),a("div",{staticClass:"importTitleTxt",domProps:{innerHTML:e._s(e.importTitleTxt)}})]):e._e()])])},o=[],i={render:n,staticRenderFns:o};t.a=i},vNZF:function(e,t,a){"use strict";function n(e){a("Dw8s")}Object.defineProperty(t,"__esModule",{value:!0});var o=a("cgzz"),i=a("lNXX"),s=a("vSla"),l=n,r=s(o.a,i.a,!1,l,null,null);t.default=r.exports}});
//# sourceMappingURL=62.a63e6d2886d6e21101a5.js.map