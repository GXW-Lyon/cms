webpackJsonp([55],{"/AoQ":function(t,e,o){"use strict";var a=o("hRKE"),r=o.n(a),c=o("HzJ8"),i=o.n(c);e.a={data:function(){return{isRightBox:!1,isabled:!1,menu_nav:["CPA数据管理","客户合同管理","创建合同信息"],dateValue:"",contract_from:{beginTime:"",contractNo:"",customerCode:"",endTime:"",id:"",isOwner:1,kyhdType:"",marketingMode:"",productItems:[]},options:{customer:[],kyhd:[{id:"Y1",val:"深圳康远互动科技有限公司"},{id:"Y2",val:"霍尔果斯康远互动网络科技有限公司"},{id:"Y3",val:"上海贝玩网络科技有限公司"},{id:"Y4",val:"深圳自由泰格互动科技有限公司"}],product:[{placeHolder:"请选择",model_value:{},items:[]}],marketing:[{id:"CA",val:"CPA"},{id:"CD",val:"CPD"},{id:"CM",val:"CPM"},{id:"CC",val:"CPC"},{id:"CS",val:"CPS"},{id:"CT",val:"CPT"},{id:"CP",val:"CPPA "}]},customerContractId:"",pageTitle:"创建合同信息"}},created:function(){this.customerSelect(),this.customerContractId=this.$route.query.customerContractId,""!=this.customerContractId&&(this.pageInfo(),this.pageTitle="编辑合同信息",this.isabled=!0)},methods:{pageInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.customercContGet,params:{id:this.customerContractId}}).then(function(e){if(200==e.status){var o=e.data;t.contract_from=o,t.dateValue=[new Date(t.contract_from.beginTime),new Date(t.contract_from.endTime)]}}).catch(function(t){console.log(t)})},customerSelect:function(){var t=this;this.$http({method:"get",url:this.apiUrl.customerSearch,params:{offset:1,limit:9999,val:""}}).then(function(e){if(200==e.status){var o=e.data;t.options.customer=o.items}}).catch(function(t){console.log(t)})},proInfo:function(){var t=this;this.$http({method:"get",url:this.apiUrl.customerProListLight,params:{customerCode:this.contract_from.customerCode}}).then(function(e){if(200==e.status){var o=e.data;t.options.product=t.options.product.map(function(t,e){return{placeHolder:"请选择",model_value:"",items:o.items}});for(var a=1;a<t.contract_from.productItems.length;a++)t.addRow();""==t.customerContractId?t.contract_from.productItems=[]:t.options.product.forEach(function(e,o){var a=!0,r=!1,c=void 0;try{for(var s,n=i()(e.items);!(a=(s=n.next()).done);a=!0){var l=s.value;l.id==t.contract_from.productItems[o].id&&(e.model_value=l)}}catch(t){r=!0,c=t}finally{try{!a&&n.return&&n.return()}finally{if(r)throw c}}})}}).catch(function(t){console.log(t)})},cusSelect:function(){this.proInfo()},proSelect:function(t,e){"object"==(void 0===e?"undefined":r()(e))&&(this.contract_from.productItems[t]||this.contract_from.productItems.push({id:"",productNo:""}),this.contract_from.productItems[t].id=e.id,this.contract_from.productItems[t].productNo=e.customerProductCode),this.checkFrom()},addRow:function(){this.options.product.push(this.options.product[0])},checkFrom:function(){var t=this.contract_from;if(""!=t.customerCode&&""!=t.kyhdType&&t.productItems.length>0&&""!=t.beginTime&&""!=t.marketingMode){var e=Math.ceil(this.datedifference(t.beginTime,t.endTime)/365),o=t.beginTime.replace(/-/g,""),a=t.productItems[0].productNo;1==t.isOwner?this.contract_from.contractNo=t.kyhdType+t.customerCode+a.substr(a.length-3)+t.marketingMode+o+e:2==this.contract_from.isOwner&&(this.contract_from.contractNo=t.customerCode+t.kyhdType+a.substr(a.length-3)+t.marketingMode+o+e)}else this.contract_from.contractNo=""},onSubmit:function(){var t=this,e=this.apiUrl.customercContNew;""!=this.customerContractId&&(e=this.apiUrl.customercContUpdate),this.$http({method:"post",url:e,data:this.contract_from}).then(function(e){e.data;200==e.status?(t.$message({type:"success",message:"操作成功"}),t.go_back()):t.$message({type:"error",message:"操作失败，请完善信息，并重新提交"})}).catch(function(e){console.log(e),t.$message({type:"error",message:"请完善信息，并重新提交"})})},go_back:function(){this.$router.back()},dateChange:function(){var t=this.dateValue;t.length>0&&(this.contract_from.beginTime=this.formatDateTime(t[0],"y-m-d"),this.contract_from.endTime=this.formatDateTime(t[1],"y-m-d")),this.checkFrom()}}}},"8VF1":function(t,e,o){e=t.exports=o("UTlt")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"customerContractNew.vue",sourceRoot:""}])},Q9Gn:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"page_create customerContractNew"},[o("div",{staticClass:"menuNav"},[o("p",[o("i",{staticClass:"nav_index"}),t._l(t.menu_nav,function(e,a){return o("span",{key:a},[o("i",{staticClass:"el-icon-arrow-right"}),o("em",[t._v(t._s(e))])])})],2)]),t._v(" "),o("div",{staticClass:"page_d_title"},[o("i"),o("span",[t._v(t._s(t.pageTitle))])]),t._v(" "),o("div",{staticClass:"page_d_con"},[o("div",{staticClass:"page_d_con_left cpa_page_left",class:{page_d_con_left_widthAll:!t.isRightBox}},[o("div",{staticClass:"banner_part_line page_create_set_line"},[t._v("合同信息")]),t._v(" "),o("el-form",{ref:"form",attrs:{model:t.contract_from,"label-width":"125px"}},[o("el-form-item",{attrs:{label:"客户主体："}},[o("el-select",{staticClass:"f_select1 inlineBlock",attrs:{filterable:"",placeholder:"请选择",disabled:t.isabled},on:{change:function(e){t.cusSelect()}},model:{value:t.contract_from.customerCode,callback:function(e){t.$set(t.contract_from,"customerCode",e)},expression:"contract_from.customerCode"}},t._l(t.options.customer,function(t,e){return o("el-option",{key:t.customerCode,attrs:{label:t.name,value:t.customerCode}})})),t._v(" "),o("el-radio-group",{staticClass:"f_radio1 inlineBlock",on:{change:t.checkFrom},model:{value:t.contract_from.isOwner,callback:function(e){t.$set(t.contract_from,"isOwner",e)},expression:"contract_from.isOwner"}},[o("el-radio",{attrs:{label:2,disabled:t.isabled}},[t._v("甲方")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"我方主体："}},[o("el-select",{staticClass:"f_select1 inlineBlock",attrs:{placeholder:"请选择",disabled:t.isabled},on:{change:t.checkFrom},model:{value:t.contract_from.kyhdType,callback:function(e){t.$set(t.contract_from,"kyhdType",e)},expression:"contract_from.kyhdType"}},t._l(t.options.kyhd,function(t,e){return o("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})})),t._v(" "),o("el-radio-group",{staticClass:"f_radio1 inlineBlock",on:{change:t.checkFrom},model:{value:t.contract_from.isOwner,callback:function(e){t.$set(t.contract_from,"isOwner",e)},expression:"contract_from.isOwner"}},[o("el-radio",{attrs:{label:1,disabled:t.isabled}},[t._v("甲方")])],1)],1),t._v(" "),o("el-form-item",{staticStyle:{height:"auto",position:"relative"},attrs:{label:"客户产品："}},[t._l(t.options.product,function(e,a){return o("el-form-item",{key:a},[o("el-select",{staticClass:"f_select1 inlineBlock",attrs:{filterable:"",placeholder:e.placeHolder,"value-key":"id",disabled:t.isabled},on:{change:function(o){t.proSelect(a,e.model_value)}},model:{value:e.model_value,callback:function(o){t.$set(e,"model_value",o)},expression:"item.model_value"}},t._l(e.items,function(t,e){return o("el-option",{key:t.id,attrs:{label:t.productName,value:t}})}))],1)}),t._v(" "),t.isabled?t._e():o("div",{staticClass:"addRow",staticStyle:{left:"225px"}},[o("el-button",{on:{click:t.addRow}},[t._v("添加一行")])],1)],2),t._v(" "),o("el-form-item",{attrs:{label:"合同有效日期："}},[o("el-date-picker",{attrs:{type:"daterange",align:"right",placeholder:"选择日期范围",format:"yyyy/MM/dd","picker-options":t.$store.state.pickerOptions2,disabled:t.isabled},on:{change:t.dateChange},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"推广模式："}},[o("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择",disabled:t.isabled},on:{change:t.checkFrom},model:{value:t.contract_from.marketingMode,callback:function(e){t.$set(t.contract_from,"marketingMode",e)},expression:"contract_from.marketingMode"}},t._l(t.options.marketing,function(t,e){return o("el-option",{key:t.id,attrs:{label:t.val,value:t.id}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"合同编号："}},[o("el-input",{attrs:{placeholder:"请输入合同编号",disabled:""},model:{value:t.contract_from.contractNo,callback:function(e){t.$set(t.contract_from,"contractNo",e)},expression:"contract_from.contractNo"}})],1),t._v(" "),o("el-form-item",{staticClass:"form_button"},[t.isabled?t._e():o("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("确认")]),t._v(" "),o("el-button",{on:{click:function(e){t.go_back()}}},[t._v("返回")])],1)],1)],1),t._v(" "),t.isRightBox?o("div",{staticClass:"page_d_con_right cpa_page_right"},[o("div",{staticClass:"page_d_current page_create_current"},[o("div",{staticClass:"current_page_title create_page_title"},[t._v("操作历史记录")]),t._v(" "),o("div",{staticClass:"current_img"},t._l(4,function(e){return o("div",{key:e,staticClass:"text item"},[t._v("\n                                "+t._s("列表内容 "+e)+"\n                            ")])}))])]):t._e()])])])},r=[],c={render:a,staticRenderFns:r};e.a=c},"eme+":function(t,e,o){"use strict";function a(t){o("shml")}Object.defineProperty(e,"__esModule",{value:!0});var r=o("/AoQ"),c=o("Q9Gn"),i=o("vSla"),s=a,n=i(r.a,c.a,!1,s,null,null);e.default=n.exports},shml:function(t,e,o){var a=o("8VF1");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);o("FIqI")("f791993a",a,!0,{})}});
//# sourceMappingURL=55.8504ef2a58f338a780f9.js.map