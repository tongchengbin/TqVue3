(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43ba69b2"],{1738:function(e,t,a){"use strict";var l=a("8235"),n=a.n(l);n.a},"5d28":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"Search"},model:{value:e.listQuery.search,callback:function(t){e.$set(e.listQuery,"search",t)},expression:"listQuery.search"}}),a("el-select",{attrs:{placeholder:"执行结果"},model:{value:e.listQuery.result,callback:function(t){e.$set(e.listQuery,"result",t)},expression:"listQuery.result"}},e._l(e.result,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("Search")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.taskTableLoading,expression:"taskTableLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"username",label:"用户名",width:"180"}}),a("el-table-column",{attrs:{label:"索取结果"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_ok?a("el-button",{attrs:{type:"primary"}},[e._v("索取成功")]):a("el-button",{attrs:{type:"warning"}},[e._v("索取失败")])]}}])}),a("el-table-column",{attrs:{prop:"msg",label:"执行消息",width:"msg"}}),a("el-table-column",{attrs:{width:"180px",align:"center",label:"申请时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("parseTime")(t.row.ctime,"{y}-{m}-{d} {h}:{i}")))])]}}])}),a("el-table-column",{attrs:{width:"180px",align:"center",label:"执行时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("parseTime")(t.row.mtime,"{y}-{m}-{d} {h}:{i}")))])]}}])})],1),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},n=[],i=a("e876"),s=a("d060"),r=(a("e692"),{name:"goodsedit",omponents:{},data:function(){return{taskTableLoading:!1,result:[{value:null,label:"全部"},{value:"1",label:"执行成功"},{value:"0",label:"执行失败"}],list:[],total:null,listQuery:{result:null,search:null,page:1,pagesize:0}}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.taskTableLoading=!0,i["a"].get(s["a"].SHOP_QIAOHUTASK_LIST,this.listQuery).then(function(t){e.list=t.data.results,e.total=t.data.count,e.taskTableLoading=!1})},handleSizeChange:function(e){this.listQuery.pagesize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.fetchData()},handleFilter:function(){this.listQuery.offset=0,this.fetchData()}}}),u=r,o=(a("1738"),a("2877")),c=Object(o["a"])(u,l,n,!1,null,"50a7a57e",null);c.options.__file="qiaohuRecord.vue";t["default"]=c.exports},8235:function(e,t,a){},e692:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var l=a("b775");function n(e){return Object(l["a"])({url:"/api/admin/qiaohuorder/"+e.id+"/",method:"delete",data:e})}}}]);