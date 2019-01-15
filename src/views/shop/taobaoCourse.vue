<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.search" style="width: 200px;"  placeholder="Search"></el-input>
      <el-button  type="primary"  icon="el-icon-search" @click="handleFilter">Search</el-button>
      <el-button class="" align="right" @click="handleCreate" type="primary" icon="el-icon-edit">ADD</el-button>
    </div>
    <el-table :data="list" stripe border style="width: 100%" v-loading="Loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课程名称">
              <span>{{ props.row.course_title }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="100">
        <template slot-scope="scope">
          <a style="color: #409EFF" :href="scope.row.tburl" target="_blank">{{scope.row.title}}</a>
        </template>
      </el-table-column>

      <el-table-column prop="classificatio" label="分类" ></el-table-column>
      <el-table-column prop="price" label="售价" ></el-table-column>
      <el-table-column prop="sales" label="销售量" ></el-table-column>
      <el-table-column align="center" label="资源" width="100">
        <template slot-scope="scope">
          <a style="color: #409EFF" target="_blank">{{scope.row.res}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online" >出售中</el-tag>
          <el-tag v-else type="warning" >仓库中</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="动作" width="200">
        <template slot-scope="scope">
          <el-button  type="success" @click="handleUpdate(scope.row)" size="small" icon="el-icon-circle-check-outline">编辑</el-button>
          <el-button  type="warning" @click="handleDelete(scope.row)" size="small" icon="el-icon-edit">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]"  :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" style="padding-bottom: 30px;border-radius: 5px">
      <el-form  :model="temp" label-position="left" label-width="70px" style='width: 600px; margin-left:50px; '>
        <el-form-item label="标题" >
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="资源名称" >
          <el-input v-model="temp.course_title"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="temp.classification"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="temp.frist_img"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="temp.content"></el-input>
        </el-form-item>
        <el-form-item label="连接">
          <el-input v-model="temp.tburl"></el-input>
        </el-form-item>
        <el-form-item label="资源">
          <el-input v-model="temp.res"></el-input>
        </el-form-item>
        <el-form-item label="上线">
          <el-switch v-model="temp.online"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="warnin">Calcel</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="CreateData">Submit</el-button>
        <el-button v-else type="primary" @click="updateData">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { taobaoCourseUpdate, taobaoCourselist, taobaoCourseCreate, taobaoCourseDelete } from '@/api/shop'
  import { Message } from 'element-ui'
  export default {
    name: 'sourse',
    data() {
      return {
        dialogStatus: null,
        dialogVisible: false,
        temp: {
          title: null,
          course_title: null,
          classification: null,
          frist_img: null,
          price: null,
          res: null,
          tburl: null,
          sales: null
        },
        list: null,
        total: null,
        Loading: false,
        listQuery: {
          search: null,
          lang: null,
          offset: 0,
          limit: 10
        }
      }
    },
    filters: {
    },
    created() {
      this.featchData()
    },
    methods: {
      featchData() {
        if (!this.Loading) {
          this.Loading = true
          taobaoCourselist(this.listQuery).then(response => {
            console.log(response)
            this.list = response.data.results
            this.total = response.data.count
            this.Loading = false
          })
        }
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.featchData(this.listQuery)
      },
      handleCurrentChange(val) {
        console.log(val)
        this.listQuery.offset = val * this.listQuery.limit - this.listQuery.limit
        this.featchData(this.listQuery)
      },
      jumptourl(url) {
        window.open(url)
      },
      handleDelete(row) {
        console.log(row)
        taobaoCourseDelete(row).then(response => {
          this.handleFilter()
        })
      },
      handleFilter() {
        this.listQuery.offset = 0
        this.featchData(this.listQuery)
      },
      handleUpdate(row) {
        this.dialogVisible = true
        this.temp = row
        if (this.temp.online) {
          this.temp.online = true
        } else {
          this.temp.online = false
        }
      },
      updateData() {
        console.log(this.temp.online)
        this.temp.online = this.temp.online ? 1 : 0
        taobaoCourseUpdate(this.temp).then(response => {
          Message({
            message: 'Update Success',
            type: 'success',
            duration: 5 * 1000
          })
        })
        this.dialogVisible = false
        this.handleFilter()
      },
      CreateData() {
        this.temp.online = this.temp.online ? 1 : 0
        taobaoCourseCreate(this.temp).then(response => {
          if (response.status === 201) {
            Message({
              message: 'Create Success',
              type: 'success',
              duration: 5 * 1000
            })
            this.dialogVisible = false
            this.handleFilter()
          }
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      resetTemp() {
        this.temp = {
          title: null,
          course_title: null,
          classification: null,
          frist_img: null,
          price: null,
          res: null,
          tburl: null,
          sales: null
        }
      }
    }
  }
</script>
