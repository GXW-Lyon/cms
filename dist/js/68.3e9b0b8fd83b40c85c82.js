webpackJsonp([68],{"5cNQ":function(e,t,a){"use strict";t.a={data:function(){return{isRightBox:!1,isabled:!1,menu_nav:["CPA数据管理","渠道合同管理","创建合同信息"],dateValue:"",channel_from:{beginTime:"",channelCode:"",contractNo:"",endTime:"",id:"",isOwner:1,kyhdType:"",marketingMode:""},options:{channel:[],kyhd:[{id:"Y1",val:"深圳康远互动科技有限公司"},{id:"Y2",val:"霍尔果斯康远互动网络科技有限公司"},{id:"Y3",val:"上海贝玩网络科技有限公司"},{id:"Y4",val:"深圳自由泰格互动科技有限公司"}],product:[{placeHolder:"请选择",model_value:{},items:[]}],marketing:[{id:"CA",val:"CPA"},{id:"CD",val:"CPD"},{id:"CM",val:"CPM"},{id:"CC",val:"CPC"},{id:"CS",val:"CPS"},{id:"CT",val:"CPT"},{id:"CP",val:"CPPA "}]},channelContractId:"",pageTitle:"创建合同信息"}},created:function(){this.channelSelect(),this.channelContractId=this.$route.query.channelContractId,""!=this.channelContractId&&(this.pageInfo(),this.pageTitle="编辑合同信息",this.isabled=!0)},methods:{channelSelect:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelSearch,params:{offset:1,limit:9999,val:""}}).then(function(t){if(200==t.status){var a=t.data;e.options.channel=a.items}}).catch(function(e){console.log(e)})},pageInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.channelConGet,params:{id:this.channelContractId}}).then(function(t){if(200==t.status){var a=t.data;e.channel_from=a,e.dateValue=[new Date(e.channel_from.beginTime),new Date(e.channel_from.endTime)]}}).catch(function(e){console.log(e)})},addRow:function(){this.options.product.push(this.options.product[0])},checkFrom:function(){var e=this.channel_from;if(""!=e.channelCode&&""!=e.kyhdType&&""!=e.beginTime&&""!=e.marketingMode){var t=Math.ceil(this.datedifference(e.beginTime,e.endTime)/365),a=e.beginTime.replace(/-/g,"");1==e.isOwner?this.channel_from.contractNo=e.kyhdType+e.channelCode+e.marketingMode+a+t:2==this.channel_from.isOwner&&(this.channel_from.contractNo=e.channelCode+e.kyhdType+e.marketingMode+a+t)}else this.channel_from.contractNo=""},onSubmit:function(){var e=this,t=this.apiUrl.channelConNew;""!=this.channelContractId&&(t=this.apiUrl.channelConUpdate),this.$http({method:"post",url:t,data:this.channel_from}).then(function(t){200==t.status?(e.$message({type:"success",message:"操作成功"}),e.go_back()):e.$message({type:"error",message:"操作失败，请完善信息，并重新提交"})}).catch(function(t){console.log(t),e.$message({type:"error",message:"请完善信息，并重新提交"})})},go_back:function(){this.$router.back()},dateChange:function(){var e=this.dateValue;e.length>0&&(this.channel_from.beginTime=this.formatDateTime(e[0],"y-m-d"),this.channel_from.endTime=this.formatDateTime(e[1],"y-m-d")),this.checkFrom()}}}},L9W0:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"page_create customerContractNew channelContractNew"},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),e._l(e.menu_nav,function(t,n){return a("span",{key:n},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[e._v(e._s(t))])])})],2)]),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"page_d_con"},[a("div",{staticClass:"page_d_con_left cpa_page_left",class:{page_d_con_left_widthAll:!e.isRightBox}},[a("div",{staticClass:"banner_part_line page_create_set_line"},[e._v("合同信息")]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.channel_from,"label-width":"125px"}},[a("el-form-item",{attrs:{label:"渠道主体："}},[a("el-select",{staticClass:"f_select1 inlineBlock",attrs:{placeholder:"请选择",disabled:e.isabled},on:{change:e.checkFrom},model:{value:e.channel_from.channelCode,callback:function(t){e.$set(e.channel_from,"channelCode",t)},expression:"channel_from.channelCode"}},e._l(e.options.channel,function(e,t){return a("el-option",{key:e.channelCode,attrs:{label:e.name,value:e.channelCode}})})),e._v(" "),a("el-radio-group",{staticClass:"f_radio1 inlineBlock",on:{change:e.checkFrom},model:{value:e.channel_from.isOwner,callback:function(t){e.$set(e.channel_from,"isOwner",t)},expression:"channel_from.isOwner"}},[a("el-radio",{attrs:{label:2,disabled:e.isabled}},[e._v("甲方")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"我方主体："}},[a("el-select",{staticClass:"f_select1 inlineBlock",attrs:{placeholder:"请选择",disabled:e.isabled},on:{change:e.checkFrom},model:{value:e.channel_from.kyhdType,callback:function(t){e.$set(e.channel_from,"kyhdType",t)},expression:"channel_from.kyhdType"}},e._l(e.options.kyhd,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.val,value:e.id}})})),e._v(" "),a("el-radio-group",{staticClass:"f_radio1 inlineBlock",on:{change:e.checkFrom},model:{value:e.channel_from.isOwner,callback:function(t){e.$set(e.channel_from,"isOwner",t)},expression:"channel_from.isOwner"}},[a("el-radio",{attrs:{label:1,disabled:e.isabled}},[e._v("甲方")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"合同有效日期："}},[a("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围",format:"yyyy/MM/dd","picker-options":e.$store.state.pickerOptions2,disabled:e.isabled},on:{change:e.dateChange},model:{value:e.dateValue,callback:function(t){e.dateValue=t},expression:"dateValue"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"推广模式："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择",disabled:e.isabled},on:{change:e.checkFrom},model:{value:e.channel_from.marketingMode,callback:function(t){e.$set(e.channel_from,"marketingMode",t)},expression:"channel_from.marketingMode"}},e._l(e.options.marketing,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.val,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"合同编号："}},[a("el-input",{attrs:{placeholder:"请输入合同编号",disabled:""},model:{value:e.channel_from.contractNo,callback:function(t){e.$set(e.channel_from,"contractNo",t)},expression:"channel_from.contractNo"}})],1),e._v(" "),a("el-form-item",{staticClass:"form_button"},[e.isabled?e._e():a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确认")]),e._v(" "),a("el-button",{on:{click:function(t){e.go_back()}}},[e._v("返回")])],1)],1)],1),e._v(" "),e.isRightBox?a("div",{staticClass:"page_d_con_right cpa_page_right"},[a("div",{staticClass:"page_d_current page_create_current"},[a("div",{staticClass:"current_page_title create_page_title"},[e._v("操作历史记录")]),e._v(" "),a("div",{staticClass:"current_img"},e._l(4,function(t){return a("div",{key:t,staticClass:"text item"},[e._v("\n                                "+e._s("列表内容 "+t)+"\n                            ")])}))])]):e._e()])])])},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page_d_title"},[a("i"),a("span",[e._v("创建合同信息")])])}],i={render:n,staticRenderFns:l};t.a=i},SCYN:function(e,t,a){"use strict";function n(e){a("oTi0")}Object.defineProperty(t,"__esModule",{value:!0});var l=a("5cNQ"),i=a("L9W0"),o=a("vSla"),c=n,s=o(l.a,i.a,!1,c,null,null);t.default=s.exports},oTi0:function(e,t,a){var n=a("sEMN");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("FIqI")("176e3b26",n,!0,{})},sEMN:function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"channelContractNew.vue",sourceRoot:""}])}});
//# sourceMappingURL=68.3e9b0b8fd83b40c85c82.js.map