<template>
  <div class="category clearfix">
    <el-dialog :visible.sync="visible"
               custom-class="cardtree"
               title="选择部门"
               :center="true"
               :show="show"
               @close="$emit('update:show', false)"
               :modal="false"
    >
      <div>
        <el-tree  v-loading="treeLoading"
                  :data="treedata"
                  node-key="id"
                  ref="category"
                  default-expand-all
                  :expand-on-click-node="false"

                 >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}  </span>
                 </span>
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="centerDialogVisible">确 定</el-button>
        <el-button type="primary" size="mini" @click="noSelect">不选择</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { featchCategoryTree } from '@/api/shop'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      show: {
        type: Boolean,
        default: false
      },
      handleSelectedTree: {
        type: Function,
        default: null
      }
    },
    watch: {
      show() {
        this.visible = this.show
      },
      data() {
        this.treedata = this.data && []
      }
    },
    data() {
      return {
        visible: this.show,
        checkNode: null,
        treeLoading: false,
        treedata: []
      }
    },
    methods: {
      featchtreeDate() {
        this.treeLoading = true
        featchCategoryTree().then(res => {
          this.treedata = res.data
        })
        this.treeLoading = false
      },
      noSelect() {
        this.$emit('submitNode', { id: null, label: null })
        this.$emit('update:show', false)
      },
      centerDialogVisible() {
        const node = this.$refs.category.currentNode && this.$refs.category.currentNode.node
        if (node) {
          this.$emit('submitNode', node.data)
        }
        this.$emit('update:show', false)
      }
    },
    computed: {
    },
    mounted() {
      console.log(this.handleSelectedTree)
      if (this.data) {
        this.treedata = this.data
      } else {
        this.featchtreeDate()
      }
    },
    components: {
    },
    created() {
    }

  }
</script>
<style >
  .cardtree {
    width: 450px!important;
  }
  .category .el-dialog{
    width: 450px;
  }
  .category.el-dialog__header{
    background: #F8F8F8;
    /*padding: 5px 10px 5px 5px;*/
  }
  .category .el-dialog__body{
    padding-top: 20px;
  }
  .layui-layer-title{
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #F8F8F8;
    border-radius: 2px 2px 0 0;
  }
</style>