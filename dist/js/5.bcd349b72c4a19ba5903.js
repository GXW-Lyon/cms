webpackJsonp([5],{"7PxY":function(e,t,a){"use strict";function l(e){a("PFeH")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("DgXy"),i=a("Vt1y"),r=a("vSla"),n=l,o=r(s.a,i.a,!1,n,null,null);t.default=o.exports},DgXy:function(e,t,a){"use strict";var l=a("rVsN"),s=a.n(l),i=a("HzJ8"),r=a.n(i);t.a={data:function(){return{apkFlag:!0,isTrue:!1,isModel:!1,inpFlag:!1,adFlag:!1,lpFlag:!1,logo_visible:!1,title:"新建创意",menu_nav:["推啊数据管理","创意管理","新建创意"],fileList:[],upLoadData:{imgType:1},upLoadData1:{imgType:2},template_from:{apkUrl:"",bntDesc:"",channel:"",creativeTemplate:"",desc:"",landpageUrl:"",weight:"",lpType:"",lpImgUrls:[],imgUrls:[]},adNo:"",adName:"",templateDisable:!1,saveAlt:{status:!1,date:""},channelList:[],creativeTemplateList:[{id:1,val:"单图"},{id:2,val:"左图右文"},{id:3,val:"三图上文"},{id:4,val:"推啊"}],channelWeight:[],landType:[{lpType:1,val:"链接落地页地址"},{lpType:2,val:"直接下载（仅支持包地址）"}],bntType:["点击","点击领取"],but_text:"确认",status:{product:!1,template:!1}}},created:function(){this.channelInfo(),this.getAdNo()},methods:{channelInfo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.tuiaAdminChannelList}).then(function(t){if(200==t.status){var a=t.data;e.channelList=a}}).catch(function(e){console.log(e)})},getAdNo:function(){var e=this;this.$http({method:"get",url:this.apiUrl.tuiaAdminAdNO}).then(function(t){200==t.status?e.adNo=t.data:e.$message({type:"error",message:"服务器错误！请稍后再试。"})}).catch(function(t){e.$message({type:"error",message:"服务器错误！请稍后再试。"})})},weightRatio:function(){var e=this;this.channelWeight=[],this.$http({method:"get",url:this.apiUrl.tuiaAdminChannelWeightRatio,params:{channel:this.template_from.channel}}).then(function(t){var a=t.data.weightRatio;for(var l in a)e.channelWeight.push(l)}).catch(function(e){console.log(e)})},linkFlag:function(){1===this.template_from.lpType?(this.apkFlag=!1,this.lpFlag=!1,this.template_from.lpImgUrls=[]):0===this.template_from.lpType?(this.apkFlag=!0,this.lpFlag=!0):(this.apkFlag=!0,this.lpFlag=!1,this.template_from.lpImgUrls=[])},onSubmit:function(){var e=this;if(""==this.adName||""==this.template_from.channel||""==this.template_from.weight||4===this.template_from.creativeTemplate&&""==this.template_from.bntDesc||1!=this.template_from.creativeTemplate&&""==this.template_from.desc||""===this.template_from.lpType||1===this.template_from.lpType&&""==this.template_from.landpageUrl||0===this.template_from.lpType&&""==this.template_from.apkUrl||2===this.template_from.lpType&&""==this.template_from.apkUrl||0==this.template_from.imgUrls.length)return this.$message({type:"error",message:"所有信息不能为空，请重新提交"}),!1;this.template_from.imgUrls.length>0&&(this.template_from.imgUrls=this.pic_sort(this.template_from.imgUrls)),this.$http({method:"post",url:this.apiUrl.tuiaAdminAdNew,data:{adAttrJson:this.template_from,adName:this.adName,adNo:this.adNo}}).then(function(t){if(200==t.status){1==t.data.status?(e.saveAlt.date=(new Date).toLocaleString(),e.$message({type:"success",message:"创建成功"}),e.go_back()):e.$message({type:"error",message:"创建失败"})}}).catch(function(e){console.log(e)})},go_back:function(){this.$router.back()},handleRemove:function(e,t){this.template_from.imgUrls=[];var a=!0,l=!1,s=void 0;try{for(var i,n=r()(t);!(a=(i=n.next()).done);a=!0){var o=i.value;o.response?this.template_from.imgUrls.push(o.response.url):this.template_from.imgUrls.push(o.url)}}catch(e){l=!0,s=e}finally{try{!a&&n.return&&n.return()}finally{if(l)throw s}}0==this.template_from.imgUrls.length&&(this.isModel=!1)},handleRemoveImg:function(e,t){this.template_from.lpImgUrls=[];var a=!0,l=!1,s=void 0;try{for(var i,n=r()(t);!(a=(i=n.next()).done);a=!0){var o=i.value;o.response?this.template_from.lpImgUrls.push(o.response.url):this.template_from.lpImgUrls.push(o.url)}}catch(e){l=!0,s=e}finally{try{!a&&n.return&&n.return()}finally{if(l)throw s}}""==this.template_from.lpImgUrls&&(this.isTrue=!1)},adImgSuccess:function(e,t,a){this.isModel=!0,this.saveAlt.date=(new Date).toLocaleString(),this.template_from.imgUrls.push(e.url)},handleSuccessImg:function(e,t,a){this.isTrue=!0,this.saveAlt.date=(new Date).toLocaleString(),this.template_from.lpImgUrls.push(e.url)},uploadError:function(e,t,a){alert("上传失败，请重试！")},beforeAvatarUpload:function(e){if(""==this.template_from.creativeTemplate)return this.$message({type:"info",message:"请先选择素材样式"}),!1;var t=!1;switch(this.template_from.creativeTemplate){case 1:case 2:case 4:if(1==this.template_from.imgUrls.length){this.$message({type:"info",message:"当前素材样式只可上传一张图片"}),t=!0;break}case 3:if(3==this.template_from.imgUrls.length){this.$message({type:"info",message:"当前素材样式最多可上传三张图片"}),t=!0;break}default:if(this.template_from.imgUrls.length>=3){this.$message({type:"info",message:"广告素材最多可上传三张图片"}),t=!0;break}}if(t)return!1;var a=this;return new s.a(function(e,t){var a={};a.size=!0,e(a)}).then(function(t){var l=e.name.split("."),s=l.length-1;return t.extension="jpg"===l[s],t.isLt2M=e.size/1024/1024<1,t.extension||a.$message({type:"info",message:"上传模板只能是 jpg格式"}),t.isLt2M||a.$message({type:"info",message:"上传图片大小不能超过 1MB"}),t}).then(function(e){var t=e.extension;e.size&&e.isLt2M&&t||reject(!1)})},beforeAvatarUploadImg:function(e){var t=e.name.split("."),a=t.length-1,l="jpg"===t[a],s="gif"===t[a],i="png"===t[a],r=e.size/1024/1024<2;return l||s||i||alert("上传模板只能是 jpg格式!"),r||alert("上传图片大小不能超过 2MB!"),l||s||i&&r}}}},PFeH:function(e,t,a){var l=a("RRyx");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("FIqI")("304edc46",l,!0,{})},RRyx:function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,".el-select .el-input .el-input__icon{top:50%!important}","",{version:3,sources:["/Users/pby/dev/cmsweb/src/views/tuia/ideaNew.vue"],names:[],mappings:"AACA,qCACE,iBAAoB,CACrB",file:"ideaNew.vue",sourcesContent:["\n.el-select .el-input .el-input__icon {\n  top: 50% !important;\n}\n"],sourceRoot:""}])},Vt1y:function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"page_create"},[a("div",{staticClass:"menuNav"},[a("p",[a("i",{staticClass:"nav_index"}),e._l(e.menu_nav,function(t,l){return a("span",{key:l},[a("i",{staticClass:"el-icon-arrow-right"}),a("em",[e._v(e._s(t))])])})],2)]),e._v(" "),a("div",{staticClass:"page_d_title"},[a("i"),a("span",[e._v(e._s(e.title))])]),e._v(" "),a("div",{staticClass:"page_d_con"},[a("div",{staticClass:"page_d_con_left",staticStyle:{width:"600px"}},[a("el-form",{ref:"form",attrs:{model:e.template_from,"label-width":"125px"}},[a("el-form-item",{attrs:{label:"选择位置："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择渠道",disabled:e.inpFlag},on:{change:e.weightRatio},model:{value:e.template_from.channel,callback:function(t){e.$set(e.template_from,"channel",t)},expression:"template_from.channel"}},e._l(e.channelList,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"创意名称："}},[a("el-input",{staticClass:"f_input2",attrs:{placeholder:"请输入创意名称",disabled:e.inpFlag},model:{value:e.adName,callback:function(t){e.adName=t},expression:"adName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"素材样式："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择样式",disabled:e.inpFlag},model:{value:e.template_from.creativeTemplate,callback:function(t){e.$set(e.template_from,"creativeTemplate",t)},expression:"template_from.creativeTemplate"}},e._l(e.creativeTemplateList,function(e){return a("el-option",{key:e.id,attrs:{label:e.val,value:e.id}})}))],1),e._v(" "),a("el-form-item",{staticStyle:{height:"auto"},attrs:{label:"上传广告图片："}},[a("el-upload",{staticClass:"upload-demo",attrs:{data:e.upLoadData,action:e.apiUrl.tuiaUploadImgUrl,"with-credentials":!0,"on-success":e.adImgSuccess,"on-remove":e.handleRemove,beforeUpload:e.beforeAvatarUpload,onError:e.uploadError,disabled:e.inpFlag}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("请上传格式为JPG，大小1MB以内的图片")])],1)],1),e._v(" "),1!=e.template_from.creativeTemplate?a("el-form-item",{attrs:{label:"广告文案："}},[a("el-input",{staticClass:"f_input2",attrs:{placeholder:"",disabled:e.inpFlag},model:{value:e.template_from.desc,callback:function(t){e.$set(e.template_from,"desc",t)},expression:"template_from.desc"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"链接方式："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择状态",disabled:e.inpFlag},on:{change:e.linkFlag},model:{value:e.template_from.lpType,callback:function(t){e.$set(e.template_from,"lpType",t)},expression:"template_from.lpType"}},e._l(e.landType,function(e){return a("el-option",{key:e.lpType,attrs:{label:e.val,value:e.lpType}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"链接/包地址："}},[e.apkFlag?a("el-input",{staticClass:"f_input2",attrs:{placeholder:"请输入包链接",disabled:e.inpFlag},model:{value:e.template_from.apkUrl,callback:function(t){e.$set(e.template_from,"apkUrl",t)},expression:"template_from.apkUrl"}}):e._e(),e._v(" "),e.apkFlag?e._e():a("el-input",{staticClass:"f_input2",attrs:{placeholder:"请输入落地页链接",disabled:e.inpFlag},model:{value:e.template_from.landpageUrl,callback:function(t){e.$set(e.template_from,"landpageUrl",t)},expression:"template_from.landpageUrl"}})],1),e._v(" "),4==e.template_from.creativeTemplate?a("el-form-item",{attrs:{label:"触发按键："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择按键",disabled:e.inpFlag,filterable:"","allow-create":""},model:{value:e.template_from.bntDesc,callback:function(t){e.$set(e.template_from,"bntDesc",t)},expression:"template_from.bntDesc"}},e._l(e.bntType,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"创意权重："}},[a("el-select",{staticClass:"f_select1",attrs:{placeholder:"请选择权重",disabled:e.inpFlag},model:{value:e.template_from.weight,callback:function(t){e.$set(e.template_from,"weight",t)},expression:"template_from.weight"}},e._l(e.channelWeight,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),a("el-form-item",{staticClass:"form_button",staticStyle:{"margin-top":"60px"}},[a("el-button",{attrs:{type:"primary",disabled:e.inpFlag},on:{click:e.onSubmit}},[e._v(e._s(e.but_text))]),e._v(" "),a("el-button",{on:{click:function(t){e.go_back()}}},[e._v("返回")])],1)],1)],1),e._v(" "),a("div",{staticClass:"page_d_con_right",staticStyle:{width:"530px"}},[a("div",{staticClass:"page_d_current page_create_current"},[a("div",{staticClass:"current_page_title create_page_title"},[e._v("创意预览")]),e._v(" "),e.isModel?a("div",{staticClass:"current_img",staticStyle:{height:"auto"}},[a("h2",[e._v("广告图片")]),e._v(" "),e._l(e.template_from.imgUrls,function(e,t){return a("img",{key:t,staticClass:"image",attrs:{src:e.replace(/^\d+@#@/g,"")}})})],2):e._e()])])])])])},s=[],i={render:l,staticRenderFns:s};t.a=i}});
//# sourceMappingURL=5.bcd349b72c4a19ba5903.js.map