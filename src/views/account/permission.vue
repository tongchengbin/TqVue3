<template>
  <div class="app-container">
    <imp-panel>
      <h3 class="box-title" slot="header" style="width: 100%;">
        <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      </h3>
      <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
        <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="4" style="margin-bottom: 20px;">
          <el-tree :data="leftTree.roleTree"
                   v-loading="leftTree.loading"
                   node-key="id"
                   highlight-current
                   default-expand-all
                   @node-click="handleNodeClick"
                   :props="defaultProps">
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="render-content">
                <i class="fa fa-wrench" title="配置权限" @click=configRole(data.id)></i>
                <i class="fa fa-trash" @click=deleteMenu(data.id)></i>
              </span>
            </div>
          </el-tree>
        </el-col>
        <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
          <el-card class="box-card">
            <div class="text item">
              <el-form :model="leftTree.form" ref="form">
                <el-form-item label="父级" :label-width="formLabelWidth">
                  <el-select v-model="leftTree.form.parent" clearable filterable placeholder="请选择">
                    <el-option
                            v-for="item in menuOptions"
                            :key="item.id"
                            :label="item.nodes"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="leftTree.form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="key" :label-width="formLabelWidth">
                  <el-input v-model="leftTree.form.key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否生效" :label-width="formLabelWidth">
                  <el-switch v-model="leftTree.form.is_active"></el-switch>
                </el-form-item>
                <el-form-item label="仅超管可见" :label-width="formLabelWidth">
                  <el-switch v-model="leftTree.form.only_superuser"></el-switch>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                  <el-button type="primary" @click="onSubmit" v-text="leftTree.form.id?'保存':'新增'"></el-button>
                  <el-button type="info" @click="configRole(leftTree.form.id)" icon="setting" v-show="leftTree.form.id && leftTree.form.id!=null">配置角色
                  </el-button>
                  <el-button type="danger" @click="deleteMenu(leftTree.form.id)" icon="delete" v-show="leftTree.form.id && leftTree.form.id!=null">删除</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>

        </el-col>
      </el-row>
    </imp-panel>
    <el-dialog title="配置角色" :visible="roleData.dialogVisible"  width="30%" v-loading="true">
      <div class="select-tree">
        <el-scrollbar
                tag="div"
                class='is-empty'
                wrap-class="el-select-dropdown__wrap"
                view-class="el-select-dropdown__list">
          <el-tree
                  :data="roleData.data"
                  ref="roleTree"
                  show-checkbox
                  :default-checked-keys="roleData.checkedRole"
                  node-key="id"
                  :default-expand-all="true"
                  v-loading="roleData.loading"
                  :props="defaultProps">
          </el-tree>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="roleData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmitRole">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
  import panel from "@/components/panel.vue"
  import http from '@/api/public'
  import api from '@/api/CoreApi'
  import CoreApi from "../../api/CoreApi";
  export default {
    components: {
      'imp-panel': panel,
      // 'el-select-tree': selectTree,
    },
    data(){
      return {
        //左侧角色管理
        leftTree:{
          roleTree:[],
          loading:false,
          form: {
            id: null,
            parent: null,
            label: '',
            key: '',
            only_superuser:false,
            is_active: true
          }
        },
        //角色配置
        roleData:{
          dialogVisible:false,
          loading:false,
          data:[],
          checkedRole:[]
        },
        //数据列表
        menuOptions:[],
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        MenuTree:[],
        maxId:700000,

      }
    },
    methods: {
      changeParentMenu(form){
      //  修改父菜单
      },
      //设置菜单权限
      configRole(id){
        this.roleData.currentMenuId=id;
        this.roleData.loading=true;
        let params={"menu":id};
        http.get(CoreApi.ACCOUNT_ROLE_TREE,params).then(res=>{
          this.roleData.data=res.data.data;
          this.roleData.checkedRole=res.data.has_role;
          this.roleData.loading=false;
          this.roleData.dialogVisible = true;
        });
      },

      //提交权限
      onSubmitRole(){
        var data= this.$refs.roleTree.getCheckedKeys();
        this.roleData.loading=true;
        http.post(api.ACCOUNT_MENU_SET_ROLE,{data},this.roleData.currentMenuId).then(res=>{
          this.roleData.dialogVisible=false;
          this.roleData.loading=false;
        })
      },

      handleNodeClick(data){
        // 点击菜单
        this.leftTree.form = data;
      },
      newAdd(){
        this.leftTree.form = {
          id: null,
          parent: null,
          name: '',
        };
      },
      selectclear(){
        console.log('cleart')
      },
      onSubmit(){
        if(this.leftTree.form.id){
          //更新
            console.log(this.leftTree.form);
          http.put(api.ACCOUNT_MENU_PK, this.leftTree.form,this.leftTree.form.id).then(res => {
            this.featchData()
            })
        }else{
          // 添加
          http.post(api.ACCOUNT_MENU_LIST,this.leftTree.form).then(
            this.featchData()
          )
        }

      },
      deleteMenu(id){
        this.leftTree.loading=true;
        http.delete(api.ACCOUNT_ROLE_PK,id).then(res => {
          this.$message('已删除');
          this.featchData()
        }).catch(e =>{
        })
      },
      featchData(){
        this.leftTree.loading=true;
        http.get(api.ACCOUNT_MENU_TREE_LIST,{}).then(res => {
          this.leftTree.roleTree = res.data;
          this.leftTree.loading=false;
        });
      },
        getAllMenu(){
          http.get(api.ACCOUNT_MENU_LIST,{}).then(res=>{
              this.menuOptions=res.data.data

          });
        },
      settingResource(id){
        //配置资源  id:角色id
        this.roleData.pk=id;
        this.roleData.loading = true;
        this.roleData.dialogVisible = true;
        http.get(api.ACCOUNT_MENU_TREE,{"role":id}).then(res => {
          this.roleData.data = res.data.results;
          this.roleData.checkMenu = res.data.hasmenu;
          this.roleData.loading = false;
        });
      }
    },
    created(){
      this.featchData();
      this.getAllMenu();
    }
  }
</script>

<style>
  .render-content {
    float: right;
    margin-right: 20px
  }
  .render-content i.fa {
    margin-left: 10px;
  }
  .render-content i.fa:hover{
    color: #e6000f;
  }
  .select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0;
  }
  .select-tree .el-scrollbar {
    border: 1px solid #d1dbe5;
  }
  .select-tree .el-tree{
    border:0;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>