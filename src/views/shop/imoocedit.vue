<template>
  <div class="app-container">
    <el-form ref="form" :model="GoodsForm" label-width="80px" size="medium ">
    <el-form-item align="center">
      <img :src="GoodsForm.default_img">
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="GoodsForm.title"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="GoodsForm.price"></el-input-number>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="GoodsForm.lang" placeholder="分类">
        <el-option
          v-for="item in langlist"
          :key="item.id"
          :label="item.cn"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述"  >
      <el-input v-model="GoodsForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="资源">
      <el-input  v-model="GoodsForm.res"></el-input>
    </el-form-item>
    <el-form-item label="备用资源">
      <el-input  v-model="GoodsForm.spare_res"></el-input>
    </el-form-item>
    <el-form-item size="medium" align="center">
      <el-button type="primary" @click="handleUpdate">保存</el-button>
      <el-button @click="handleCancle">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import Upload from '@/components/Upload/singleImage3'
import { goodsdetail } from '@/api/shop'
import { goodslanglist } from '@/api/shop'
import { goodsupdate } from '@/api/shop'
export default {
  name: 'goodsedit',
  omponents: {
    Upload
  },
  data() {
    return {
      resList: [],
      dialogResVisible: false,
      langlist: null,
      GoodsForm: {
        id: null,
        lang: null,
        title: '',
        res: null,
        price: null,
        status: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        default_img: null
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getlanglist()
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      goodsdetail(id).then(response => {
        this.GoodsForm = response.data
        // Just for test
      }).catch(err => {
        console.log(err)
      })
    },
    getlanglist() {
      goodslanglist().then(response => {
        this.langlist = response.data
      })
    },
    handleUpdate() {
      goodsupdate(this.GoodsForm).then(response => {
        Message({
          message: 'Update Success',
          type: 'success',
          duration: 5 * 1000
        })
        this.$router.back()
      })
    },
    handleCancle() {
      this.$router.back()
    }
  }
}
</script>
