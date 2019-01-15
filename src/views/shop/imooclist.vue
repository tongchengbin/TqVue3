<template>
  <div class="app-container">
    <el-form :inline="true">
      <div class="filter-container">
        <el-form-item><el-input v-model="listQuery.search" style="width: 200px;" placeholder="搜索"></el-input></el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.lang" placeholder="分类">
            <el-option
            v-for="item in langlist"
            :key="item.id"
            :label="item.cn"
            :value="item.id">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary"  icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div style="width: 100%">
      <el-table :data="list" v-loading="listLoading"border fit highlight-current-row style="width: 100%">
        <el-table-column width="200px" align="center" label=标题>
          <template slot-scope="scope">
            <span>{{scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="描述">
          <template slot-scope="scope">
            <span>{{scope.row.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="分类" width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.lang_cn}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="价格" width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="资源">
          <template slot-scope="scope">
            <span>{{scope.row.res}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="282px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="jumptourl(scope.row.url)">查看源 </el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { goodslist, goodslanglist, goodsdelete } from '@/api/shop'
export default {
  name: 'imooclist',
  data() {
    return {
      lang: '',
      list: null,
      total: null,
      listLoading: true,
      langlist: [{ 'cn': '全部', en: '', 'id': '' }],
      listQuery: {
        search: null,
        lang: null,
        offset: 0,
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
    this.getlanglist()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      goodslist(this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.count
        this.listLoading = false
      })
    },
    getlanglist() {
      goodslanglist().then(response => {
        this.langlist = this.langlist.concat(response.data)
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val * this.listQuery.limit - this.listQuery.limit
      this.getList()
    },
    jumptourl(url) {
      window.open(url)
    },
    handleDelete(index, row) {
      goodsdelete(row).then(response => {
        this.handleFilter()
      })
    },
    handleFilter() {
      this.listQuery.offset = 0
      this.getList()
    },
    handleEdit(data) {
      this.$router.push({ name: 'imoocedit', params: { id: data.id }})
    }
  }
}
</script>
