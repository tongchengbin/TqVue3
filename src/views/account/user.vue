<template>
  <div class="app-container">
      <!--搜索-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
              <el-form-item>
                  <el-input size="small" v-model="listQuery.search" style="width: 200px;"  placeholder="用户名/邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button size="small" type="primary"  icon="el-icon-search" @click="handleFilter">Search</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button size="small" @click="handleUpdate(userForm)" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
              </el-form-item>
          </el-form>
      </el-col>
    <!--用户列表-->
    <el-table :data="list" highlight-current-row  border style="width: 100%;" v-loading="listLoading">
        <el-table-column label="头像" width="70px">
          <template slot-scope="scope">
            <img  :src="scope.row.avatar" width="50px">
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="150px" align="center">
          <template slot-scope="scope">
            <span >{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="邮箱">
          <template slot-scope="scope">
            <span>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column width="70px" align="center" label="超管">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_superuser" type="success">是</el-tag>
            <el-tag v-else type="info" >否</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="70px" align="center"  label="管理员">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_admin" type="success">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色"  width="180">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roles_vo" type="primary" :key="item.id" disable-transitions>{{item.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="注册日期">
          <template slot-scope="scope">
            <span v-if="scope.row.reg_time">{{scope.row.reg_time | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="上次登陆" width="250">
          <template slot-scope="scope">
            <span v-if="scope.row.last_login">{{scope.row.last_login | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作"  width="280">
          <template slot-scope="scope">
            <el-button  type="primary" @click="handleUpdate(scope.row)" size="small" icon="el-icon-edit-outline"></el-button>
            <el-button  type="danger" @click="userDelete(scope.row)" size="small" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                         :page-sizes="[10,20,30, 50]"  :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"
                         style="float:right;">
          </el-pagination>
      </el-col>
      <!--编辑框-->
      <el-dialog  :visible="userFormdialogFormVisible"
                  custom-class="usereidt"
                  :title="userForm.id?'编辑用户':'新增用户'"
                  :show-close="false"
                 >
          <el-form  size="mini" ref="dataForm" :model="userForm" label-position="left" label-width="80px" label-suffix=":"  style='width: 600px; margin: auto auto;font-size: 13px;'>
          <el-form-item size="mini" label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="邮    箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="密    码" prop="password">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="确认密码" prop="confirm_password" style="font-size: 12px">
            <el-input type="password" v-model="userForm.confirm_password"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="角    色">
              <template>
                  <el-select v-model="userForm.roles" :multiple="true" placeholder="请选择">
                      <el-option
                              v-for="item in rolesData.roleOptions"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                  </el-select>
              </template>
          </el-form-item>
          <el-form-item size="mini" label="管理员">
            <el-switch v-model="userForm.is_admin"></el-switch>
          </el-form-item>
          <el-form-item size="mini" label="超    管">
            <el-switch v-model="userForm.is_superuser"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userFormdialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateData">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import http from '@/api/public'
  import api from '@/api/CoreApi'
  import { mapGetters } from 'vuex'

export default {
  name: 'user',
  data() {
      return {
          list: null,
          total: 0,
          listLoading: true,
          listQuery: {
              search: null,
              page: 1,
              limit: 10
          },
          //角色管理
          rolesData: {
              defaultProps: {
                  children: 'children',
                  label: 'label',
                  id: "id",
              },
              data:[],
              dialogVisible:false,
              Loading:false,
              roleOptions:[]
          },
          userFormdialogFormVisible:false,
          userForm:{
              dialogFormVisible:false,
              email: null,
              id: null,
              username: null,
              roles: [],
              is_admin: null,
              is_superuser: null,
              confirm_password: null,
              password: null
          },
      }
      },
  filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        };
        return statusMap[status]
      }
  },
  computed: {
      ...mapGetters([
        'roles'
      ])
  },
  created() {
      this.getList();
  },
  methods: {
      featchData(){
      },
      handleRoleConfig(row){
      //    角色配置
          this.rolesData.dialogVisible=true;
          http.get(api.ACCOUNT_ROLE_LIST)
              .then(res=>{
                  this.rolesData.data=res.data;
                  console.log(res.data)
              })
      },
      getList() {
        this.listLoading = true;
        http.get(api.ACCOUNT_USER_LIST, this.listQuery).then(response => {
          this.list = response.data.results;
          this.total = response.data.count;
          this.listLoading = false
        })
      },
      userDelete(row) {
        http.httpDelete(api.ACCOUNT_USER_PK, row.id).then(res => {
          this.getList()
        })
      },
      getRoleData() {
        // request.get(api.ACCOUNT_ROLE_GET, {}).then(response => {
        //   response.data.forEach(item => {
        //     this.RolesData.push({
        //       'label': item.name, 'key': item.id
        //     })
        //   })
        // })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter() {
        this.getList()
      },
      handleUpdate(row) {
          console.log(row);
          this.userForm = row;
          this.userFormdialogFormVisible = true;
          http.get(api.ACCOUNT_ROLE_LIST).then(res=>{
              this.rolesData.roleOptions=res.data.results;

          })
      },
      updateData() {
        //  提交表单
        if (this.userForm.id) {
            http.put(api.ACCOUNT_USER_PK, this.userForm, this.userForm.id).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.userFormdialogFormVisible = false;
                this.featchData()
            })
        } else {
            http.post(api.ACCOUNT_USER_LIST, this.userForm).then(res => {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.userFormdialogFormVisible = false;
                this.fetchData()
            }).catch(res => {
            })
        }
      }
  }
}
</script>
<style>
    .el-dialog__title {
        line-height: 1;
        font-size: 16px;
        font-weight: 700;
        color: #1f2d3d;
    }
</style>