<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="300px" label="用户名">
        <template slot-scope="scope">
          <router-link class="link-type">
            <span>{{ scope.row.username }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                       :page-sizes="[10,20,30, 50]"  :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
    import http from '@/api/public'
    import CoreApi from '@/api/CoreApi'

export default {
  name: 'permission',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
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
  },
  methods: {
    getList() {
      this.listLoading = true
      http.get(CoreApi.ACCOUNT_USER_LIST,this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.count
        this.listLoading = false
        console.log(this.list)
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
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
