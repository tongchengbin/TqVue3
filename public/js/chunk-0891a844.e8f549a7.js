(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0891a844"],{"4b3e":function(e,t,o){"use strict";var a=o("c1c3"),s=o.n(a);s.a},"7d47":function(e,t,o){},c1c3:function(e,t,o){},d6c6:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("imp-panel",[o("h3",{staticClass:"box-title",staticStyle:{width:"100%"},attrs:{slot:"header"},slot:"header"},[o("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.newAdd}},[e._v("新增")])],1),o("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{slot:"body",gutter:24},slot:"body"},[o("el-col",{staticStyle:{"margin-bottom":"20px"},attrs:{span:5,xs:24,sm:24,md:6,lg:4}},[o("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.leftRoleTree.loading,expression:"leftRoleTree.loading"}],attrs:{data:e.leftRoleTree.roleTree,"node-key":"id","highlight-current":"","default-expand-all":"",props:e.defaultProps},on:{"node-click":e.handleNodeClick},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node,s=t.data;return o("div",{staticClass:"custom-tree-node"},[o("span",[e._v(e._s(a.label))]),o("span",{staticClass:"render-content"},[o("i",{staticClass:"fa fa-wrench",attrs:{title:"配置权限"},on:{click:function(t){return e.settingResource(s.id)}}}),o("i",{staticClass:"fa fa-trash",on:{click:function(t){return e.deleteSelected(s.id)}}})])])}}])})],1),o("el-col",{attrs:{span:18,xs:24,sm:24,md:18,lg:18}},[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"text item"},[o("el-form",{ref:"form",attrs:{model:e.form}},[o("el-form-item",{attrs:{label:"父级","label-width":e.formLabelWidth}},[o("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.form.pid_id,callback:function(t){e.$set(e.form,"pid_id",t)},expression:"form.pid_id"}},e._l(e.MenuOptions,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),o("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"","label-width":e.formLabelWidth}},[o("el-button",{attrs:{type:"primary"},domProps:{textContent:e._s(e.form.id?"修改":"新增")},on:{click:e.onSubmit}}),o("el-button",{directives:[{name:"show",rawName:"v-show",value:e.form.id&&null!=e.form.id,expression:"form.id && form.id!=null"}],attrs:{type:"info",icon:"setting"},on:{click:function(t){return e.settingResource(t,e.form.id)}}},[e._v("配置资源\n                                ")]),o("el-button",{directives:[{name:"show",rawName:"v-show",value:e.form.id&&null!=e.form.id,expression:"form.id && form.id!=null"}],attrs:{type:"danger",icon:"delete"},on:{click:function(t){return e.deleteSelected(e.form.id)}}},[e._v("删除")])],1)],1)],1)])],1)],1)],1),o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:!0,expression:"true"}],attrs:{title:"配置菜单",visible:e.setResource.dialogVisible,width:"30%"}},[o("div",{staticClass:"select-tree"},[o("el-scrollbar",{staticClass:"is-empty",attrs:{tag:"div","wrap-class":"el-select-dropdown__wrap","view-class":"el-select-dropdown__list"}},[o("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.setResource.loading,expression:"setResource.loading"}],ref:"resourceTree",attrs:{data:e.setResource.data,"show-checkbox":"","default-checked-keys":e.setResource.checkMenu,"node-key":"id","default-expand-all":!0,props:e.defaultProps}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.setResource.dialogVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.configRoleResources}},[e._v("确 定")])],1)])],1)},s=[],l=o("ded0"),i=o("e876"),n=o("d060"),r={components:{"imp-panel":l["a"]},data:function(){return{leftRoleTree:{roleTree:[],loading:!1},setResource:{dialogVisible:!1,loading:!1,data:[],checkMenu:[]},MenuOptions:[],formLabelWidth:"100px",defaultProps:{children:"children",label:"name",id:"id"},roleTree:[],MenuTree:[],maxId:7e5,form:{id:null,pid_id:null,name:""}}},methods:{configRoleResources:function(){var e=this,t=this.$refs.resourceTree.getCheckedKeys();this.setResource.loading=!0,i["a"].post(n["a"].ACCOUNT_ROLE_SETMENU,{data:t},this.setResource.pk).then(function(t){e.setResource.loading=!1,e.setResource.dialogVisible=!1})},handleNodeClick:function(e){this.form=e},getAllRoleList:function(){var e=this;i["a"].get(n["a"].ACCOUNT_ROLE_ALL_LIST,{}).then(function(t){e.roleOptions=t.data.data})},newAdd:function(){this.form={id:null,pid_id:null,name:"",enName:"",sort:0,usable:"1",remarks:""}},selectclear:function(){console.log("cleart")},batchDelete:function(){var e=this,t=this.$refs.roleTree.getCheckedKeys();null==t||t.length<=0?this.$message.warning("请选择要删除的资源"):this.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.get(n["a"].SYS_ROLE_DELETE+"?roleIds="+t.join(",")).then(function(t){e.$message("操作成功"),e.load()}).catch(function(o){e.$message("操作成功"),console.log(t),e.batchDeleteFromTree(e.roleTree,t)})})},onSubmit:function(){var e=this;this.form.id?i["a"].put(n["a"].ACCOUNT_ROLE_PK,this.form,this.form.id).then(function(t){e.featchData()}):i["a"].post(n["a"].ACCOUNT_ROLE_LIST,this.form).then(function(t){e.featchData()})},deleteSelected:function(e){var t=this;this.leftRoleTree.loading=!0,i["a"].delete(n["a"].ACCOUNT_ROLE_PK,e).then(function(e){t.$message("已删除"),t.featchData()}).catch(function(e){})},featchData:function(){var e=this;this.leftRoleTree.loading=!0,i["a"].get(n["a"].ACCOUNT_ROLE_TREE,{}).then(function(t){e.leftRoleTree.roleTree=t.data.data,e.leftRoleTree.loading=!1})},settingResource:function(e){var t=this;this.setResource.pk=e,this.setResource.loading=!0,this.setResource.dialogVisible=!0,i["a"].get(n["a"].ACCOUNT_MENU_TREE,{role:e}).then(function(e){t.setResource.data=e.data.results,t.setResource.checkMenu=e.data.hasmenu,t.setResource.loading=!1})}},created:function(){this.getAllRoleList(),this.featchData()}},c=r,d=(o("f2dc"),o("fc05")),u=Object(d["a"])(c,a,s,!1,null,null,null);t["default"]=u.exports},ded0:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"box"},[e.title||e.$slots.header?o("div",{staticClass:"box-header",class:{"with-border":e.widthBorder}},[e._t("header",[e.title?o("h3",{staticClass:"box-title",domProps:{textContent:e._s(e.title)}}):e._e()])],2):e._e(),o("div",{staticClass:"box-body"},[e.$slots.body?e._t("body",[e._v("\n            暂无内容显示\n        ")]):e._t("default")],2),e.footer?o("div",{staticClass:"box-footer",domProps:{textContent:e._s(e.footer)}}):e._e()])},s=[],l={name:"ImpPanel",props:{widthBorder:{type:Boolean},title:{type:String},footer:{type:String}}},i=l,n=(o("4b3e"),o("fc05")),r=Object(n["a"])(i,a,s,!1,null,"ead89f6e",null);t["a"]=r.exports},f2dc:function(e,t,o){"use strict";var a=o("7d47"),s=o.n(a);s.a}}]);