<template>

</template>

<script>
  import request from '@/api/public'
  import { CommonApi } from '@/api/account'

  export default {
    name: 'account-admin',
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
        dialogStatus: 'update',
        dialogFormVisible: false,
        RolesData: [],
        formData: {
          email: null,
          id: null,
          username: null,
          roles: [],
          is_admin: null,
          is_superuser: null,
          confirm_password: null,
          password: null
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList(this.listQuery)
      this.getRoleData()
    },
    methods: {
      getList() {
        this.listLoading = true
        request.get('/api/admin/user/').then(response => {
          this.list = response.data.results
          this.total = response.data.count
          this.listLoading = false
        })
      },
      getRoleData() {
        CommonApi('role', 'get', {}).then(response => {
          response.data.forEach(item => {
            this.RolesData.push({
              'label': item.name, 'key': item.id
            })
          })
        })
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
      handleCreate() {
        this.dialogStatus = 'post'
        this.dialogFormVisible = true
        this.restFormData()
      },
      restFormData() {
        this.formData = {
          email: null,
          id: null,
          username: null,
          roles: [],
          is_admin: null,
          is_superuser: null
        }
      },
      handleUpdate(row) {
        // get roles data
        this.dialogStatus = 'put'
        this.formData = row
        this.dialogFormVisible = true
      },
      updateData() {
        CommonApi('user', this.dialogStatus, this.formData).then(response => {
          if (response.status === 200 || response.status === 201) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '操作s失败',
              type: 'warinning'
            })
          }
          this.dialogFormVisible = false
          this.fetchData()
        })
      }
    }
  }
</script>

<style scoped>
  .el-dialog {
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
