(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2342dc28"],{"4b3e":function(e,t,o){"use strict";var a=o("ba30"),l=o.n(a);l.a},"7ad2":function(e,t,o){},ba30:function(e,t,o){},d6c6:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("imp-panel",[o("h3",{staticClass:"box-title",staticStyle:{width:"100%"},attrs:{slot:"header"},slot:"header"},[o("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.newAdd}},[e._v("新增")]),o("el-button",{attrs:{type:"danger",icon:"delete"},on:{click:e.batchDelete}},[e._v("删除")])],1),o("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{slot:"body",gutter:24},slot:"body"},[o("el-col",{staticStyle:{"margin-bottom":"20px"},attrs:{span:5,xs:24,sm:24,md:6,lg:4}},[o("el-tree",{attrs:{data:e.roleTree,"show-checkbox":"","node-key":"id","highlight-current":"","default-expand-all":"",props:e.defaultProps},on:{"node-click":e.handleNodeClick},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node,l=t.data;return o("div",{staticClass:"custom-tree-node"},[o("span",[e._v(e._s(a.label))]),o("span",{staticClass:"render-content"},[o("i",{staticClass:"fa fa-wrench",attrs:{title:"配置权限"},on:{click:function(t){e.settingResource(l.id)}}}),o("i",{staticClass:"fa fa-trash",on:{click:function(t){e.deleteSelected(l.id)}}})])])}}])})],1),o("el-col",{attrs:{span:18,xs:24,sm:24,md:18,lg:18}},[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"text item"},[o("el-form",{ref:"form",attrs:{model:e.form}},[o("el-form-item",{attrs:{label:"父级","label-width":e.formLabelWidth}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.form.pid_id,callback:function(t){e.$set(e.form,"pid_id",t)},expression:"form.pid_id"}},e._l(e.treeOptions,function(e){return o("el-option",{key:e.id,attrs:{clearable:!0,label:e.label,value:e.id}})}),1)],1),o("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.label,callback:function(t){e.$set(e.form,"label",t)},expression:"form.label"}})],1),o("el-form-item",{attrs:{label:"英文","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.enName,callback:function(t){e.$set(e.form,"enName",t)},expression:"form.enName"}})],1),o("el-form-item",{attrs:{label:"是否生效","label-width":e.formLabelWidth}},[o("el-radio",{staticClass:"radio",attrs:{label:"1"},model:{value:e.form.usable,callback:function(t){e.$set(e.form,"usable",t)},expression:"form.usable"}},[e._v("是")]),o("el-radio",{staticClass:"radio",attrs:{label:"0"},model:{value:e.form.usable,callback:function(t){e.$set(e.form,"usable",t)},expression:"form.usable"}},[e._v("否")])],1),o("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[o("el-slider",{model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),o("el-form-item",{attrs:{label:"","label-width":e.formLabelWidth}},[o("el-button",{attrs:{type:"primary"},domProps:{textContent:e._s(e.form.id?"修改":"新增")},on:{click:e.onSubmit}}),o("el-button",{directives:[{name:"show",rawName:"v-show",value:e.form.id&&null!=e.form.id,expression:"form.id && form.id!=null"}],attrs:{type:"info",icon:"setting"},on:{click:function(t){e.settingResource(t,e.form.id)}}},[e._v("配置资源\n                            ")]),o("el-button",{directives:[{name:"show",rawName:"v-show",value:e.form.id&&null!=e.form.id,expression:"form.id && form.id!=null"}],attrs:{type:"danger",icon:"delete"},on:{click:function(t){e.deleteSelected(e.form.id)}}},[e._v("删除")])],1)],1)],1)]),o("el-dialog",{attrs:{title:"配置资源",visible:e.dialogVisible,width:"30%"}},[o("div",{staticClass:"select-tree"},[o("el-scrollbar",{staticClass:"is-empty",attrs:{tag:"div","wrap-class":"el-select-dropdown__wrap","view-class":"el-select-dropdown__list"}},[o("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],ref:"resourceTree",attrs:{data:e.resourceTree,"show-checkbox":"","check-strictly":"","node-key":"id",props:e.defaultProps}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.configRoleResources}},[e._v("确 定")])],1)])],1)],1)],1)},l=[],i=o("ded0"),s=o("e876"),r=o("d060"),n={components:{"imp-panel":i["a"]},data:function(){return{treeOptions:[],dialogLoading:!1,dialogVisible:!1,formLabelWidth:"100px",defaultProps:{children:"children",label:"label",id:"id"},roleTree:[],resourceTree:[],maxId:7e5,form:{id:null,pid_id:null,label:"",enName:"",sort:0,usable:"1"}}},methods:{configRoleResources:function(){var e=this.$refs.resourceTree.getCheckedKeys();console.log(e),this.$message("你选择的：",e),this.dialogVisible=!1},handleNodeClick:function(e){this.form=e,console.log(this.form)},newAdd:function(){this.form={id:null,pid_id:null,name:"",enName:"",sort:0,usable:"1",remarks:""}},selectclear:function(){console.log("cleart")},batchDelete:function(){var e=this,t=this.$refs.roleTree.getCheckedKeys();null==t||t.length<=0?this.$message.warning("请选择要删除的资源"):this.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.get(r["a"].SYS_ROLE_DELETE+"?roleIds="+t.join(",")).then(function(t){e.$message("操作成功"),e.load()}).catch(function(o){e.$message("操作成功"),console.log(t),e.batchDeleteFromTree(e.roleTree,t)})})},onSubmit:function(){var e=this;this.form.pid=this.form.pid_id,this.form.id?s["a"].put(r["a"].SHOP_CATEGORY_PK,this.form,this.form.id).then(function(t){e.featchData()}).catch(function(t){var o=t.response.data.label||t.response.data.non_field_errors;console.log(o),e.$message({message:o[0],type:"error",duration:1500})}):s["a"].post(r["a"].SHOP_CATEGORY_LIST,this.form).then(this.featchData())},deleteSelected:function(e){var t=this;s["a"].delete(r["a"].SHOP_CATEGORY_PK,e).then(function(e){t.$message("已删除"),t.featchData()}).catch(function(e){})},featchData:function(){var e=this;s["a"].get(r["a"].SHOP_CATEGORY_LIST+"tree/",{}).then(function(t){e.roleTree=t.data}),s["a"].get(r["a"].SHOP_CATEGORY_LIST,{}).then(function(t){e.treeOptions=t.data})},settingResource:function(e,t){var o=this;this.dialogVisible=!0,this.dialogLoading=!0,s["a"].get(r["a"].SHOP_CATEGORY_LIST+"tree/").then(function(e){o.dialogLoading=!1,o.resourceTree=e.data})}},created:function(){this.featchData()}},c=n,d=(o("f2dc"),o("2877")),f=Object(d["a"])(c,a,l,!1,null,null,null);f.options.__file="role.vue";t["default"]=f.exports},ded0:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"box"},[e.title||e.$slots.header?o("div",{staticClass:"box-header",class:{"with-border":e.widthBorder}},[e._t("header",[e.title?o("h3",{staticClass:"box-title",domProps:{textContent:e._s(e.title)}}):e._e()])],2):e._e(),o("div",{staticClass:"box-body"},[e.$slots.body?e._t("body",[e._v("\n            暂无内容显示\n        ")]):e._t("default")],2),e.footer?o("div",{staticClass:"box-footer",domProps:{textContent:e._s(e.footer)}}):e._e()])},l=[],i={name:"ImpPanel",props:{widthBorder:{type:Boolean},title:{type:String},footer:{type:String}}},s=i,r=(o("4b3e"),o("2877")),n=Object(r["a"])(s,a,l,!1,null,"ead89f6e",null);n.options.__file="panel.vue";t["a"]=n.exports},f2dc:function(e,t,o){"use strict";var a=o("7ad2"),l=o.n(a);l.a}}]);