<template>
    <div class="app-container">
        <imp-panel>
            <h3 class="box-title" slot="header" style="width: 100%;">
                <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
            </h3>
            <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
                <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="4" style="margin-bottom: 20px;">
                    <el-tree :data="leftRoleTree.roleTree"
                             v-loading="leftRoleTree.loading"
                             show-checkbox
                             node-key="id"
                             highlight-current
                             default-expand-all
                             @node-click="handleNodeClick"
                             :props="defaultProps">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span class="render-content">
                            <i class="fa fa-wrench" title="配置权限" @click=settingResource(data.id)></i>
                            <i class="fa fa-trash" @click=deleteSelected(data.id)></i>
                        </span>
                        </div>
                    </el-tree>
                </el-col>
                <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
                    <el-card class="box-card">
                        <div class="text item">
                            <el-form :model="form" ref="form">
                                <el-form-item label="父级" :label-width="formLabelWidth">
                                    <el-select v-model="form.pid_id" filterable placeholder="请选择">
                                        <el-option
                                                :clearable="true"
                                                v-for="item in treeOptions"
                                                :key="item.id"
                                                :label="item.label"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.label" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="英文" :label-width="formLabelWidth">
                                    <el-input v-model="form.enName" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="是否生效" :label-width="formLabelWidth">
                                    <el-radio class="radio" v-model="form.usable" label="1">是</el-radio>
                                    <el-radio class="radio" v-model="form.usable" label="0">否</el-radio>
                                </el-form-item>
                                <el-form-item label="排序" :label-width="formLabelWidth">
                                    <el-slider v-model="form.sort"></el-slider>
                                </el-form-item>
                                <el-form-item label="" :label-width="formLabelWidth">
                                    <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
                                    <el-button type="info" @click="settingResource($event,form.id)" icon="setting" v-show="form.id && form.id!=null">配置资源
                                    </el-button>
                                    <el-button type="danger" @click="deleteSelected(form.id)" icon="delete" v-show="form.id && form.id!=null">删除</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </imp-panel>
        <el-dialog title="配置菜单" :visible="setResource.dialogVisible"  width="30%" v-loading="true">
            <div class="select-tree">
                <el-scrollbar
                        tag="div"
                        class='is-empty'
                        wrap-class="el-select-dropdown__wrap"
                        view-class="el-select-dropdown__list">
                    <el-tree
                            :data="setResource.data"
                            ref="resourceTree"
                            show-checkbox
                            :default-checked-keys="setResource.checkMenu"
                            node-key="id"
                            :default-expand-all="true"
                            v-loading="setResource.loading"
                            :props="defaultProps">
                    </el-tree>
                </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="setResource.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configRoleResources">确 定</el-button>
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
              leftRoleTree:{
                roleTree:[],
                loading:false
              },
              //菜单配置
              setResource:{
                dialogVisible:false,
                loading:false,
                data:[],
                checkMenu:[]
              },
                //数据列表
                treeOptions:[],
                formLabelWidth: '100px',
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: "id",
                },
                roleTree: [],
                MenuTree:[],
                maxId:700000,
                form: {
                    id: null,
                    pid_id: null,
                    label: '',
                    enName: '',
                    sort: 0,
                    usable: '1'
                }
            }
        },
        methods: {
            configRoleResources(){
                let data = this.$refs.resourceTree.getCheckedKeys();
                this.setResource.loading=true;
                http.post(CoreApi.ACCOUNT_ROLE_SETMENU,{data},this.setResource.pk).then(res=>{
                  this.setResource.loading=false;
                  this.setResource.dialogVisible = false;
                });
            },
            handleNodeClick(data){
                this.form = data;
            },
            newAdd(){
                this.form = {
                    id: null,
                    pid_id: null,
                    name: '',
                    enName: '',
                    sort: 0,
                    usable: '1',
                    remarks: ''
                };
            },
            selectclear(){
                console.log('cleart')
            },
            batchDelete(){
                var checkKeys = this.$refs.roleTree.getCheckedKeys();
                if (checkKeys == null || checkKeys.length <= 0) {
                    this.$message.warning('请选择要删除的资源');
                    return;
                }
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.SYS_ROLE_DELETE + "?roleIds=" + checkKeys.join(','))
                        .then(res => {
                            this.$message('操作成功');
                            this.load();
                        }).catch(e => {
                        this.$message('操作成功');
                        console.log(checkKeys);
                        this.batchDeleteFromTree(this.roleTree, checkKeys);
                    })
                });
            },
            onSubmit(){
                this.form.pid=this.form.pid_id;
                if(this.form.id){
                    http.put(api.SHOP_CATEGORY_PK, this.form,this.form.id)
                        .then(res => {
                            this.featchData()
                        }).catch(e => {
                        let errorMsgs=e.response.data.label || e.response.data.non_field_errors;
                        console.log(errorMsgs);
                        this.$message({
                            message: errorMsgs[0],
                            type: 'error',
                            duration: 1500
                        })
                    });
                }else{
                    // add
                    http.post(api.SHOP_CATEGORY_LIST,this.form).then(
                        this.featchData()
                    )
                }

            },
            deleteSelected(id){
              this.leftRoleTree.loading=true;
                http.delete(api.ACCOUNT_ROLE_PK,id).then(res => {
                        this.$message('已删除');
                        this.featchData()
                    }).catch(e =>{
                })
            },
            featchData(){
              this.leftRoleTree.loading=true;
                http.get(api.ACCOUNT_ROLE_TREE,{}).then(res => {
                    this.leftRoleTree.roleTree = res.data.data;
                  this.leftRoleTree.loading=false;
                });
            },
          settingResource(id){
              //配置资源  id:角色id
            this.setResource.pk=id;
            this.setResource.loading = true;
            this.setResource.dialogVisible = true;
            http.get(api.ACCOUNT_MENU_TREE,{"role":id}).then(res => {
              this.setResource.data = res.data.results;
              this.setResource.checkMenu = res.data.hasmenu;
              this.setResource.loading = false;
            });
          }
        },
      created(){
        this.featchData();
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