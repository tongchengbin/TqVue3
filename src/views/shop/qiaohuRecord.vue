<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.search" style="width: 200px;"  placeholder="Search"></el-input>
      <el-select v-model="listQuery.result" placeholder="执行结果">
        <el-option
          v-for="item in result"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button  type="primary"  icon="el-icon-search" @click="handleFilter">Search</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border fit highlight-current-row v-loading="taskTableLoading">
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column  label="索取结果">
        <template slot-scope="scope">
          <el-button v-if=scope.row.is_ok type="primary">索取成功</el-button>
          <el-button v-else type="warning">索取失败</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="执行消息" width="msg"></el-table-column>
      <el-table-column width="180px" align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.ctime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="执行时间">
        <template slot-scope="scope">
          <span>{{scope.row.mtime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import request from '@/api/public'
  import CoreApi from '@/api/CoreApi'
  import { qiaohuDelete, qiaohuCreate } from '@/api/shop'
  export default {
    name: 'goodsedit',
    omponents: {
    },
    data() {
      return {
        taskTableLoading:false,
        result: [{
          value: null,
          label: '全部'
        },
        {
          value: '1',
          label: '执行成功'
        }, {
          value: '0',
          label: '执行失败'
        }],
        list: [],
        total: null,
        listQuery: {
          result: null,
          search: null,
          page: 1,
          pagesize: 0
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.taskTableLoading=true;
        request.get(CoreApi.SHOP_QIAOHUTASK_LIST,this.listQuery).then(response => {
          this.list = response.data.results;
          this.total = response.data.count;
          this.taskTableLoading=false
        })
      },
      handleSizeChange(val) {
        this.listQuery.pagesize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.fetchData()
      },
      handleFilter() {
        this.listQuery.offset = 0;
        this.fetchData()
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
