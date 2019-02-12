<template>
  <div class="app-container" >
    <el-form :inline="true" size="small">
      <div class="filter-container">
        <el-form-item>
          <el-input v-model="params.search" style="width: 150px;"  placeholder="搜索"></el-input>
          <el-select  v-model="params.ordering" style="width: 100px">
            <el-option  v-for="item in  orderoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="temp_time"
            type="daterange"
            align="right"
            unlink-panels
            format
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="pickTime"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <el-button  type="primary"  icon="el-icon-search" @click="handleFilter"></el-button>
        </el-form-item>
      </div>
    </el-form>
      <el-row v-loading="listDataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div v-if="items.length==0&&!listDataLoading">
          <h2 style="text-align: center">无数据</h2>
        </div>
        <el-col  :span="4" v-for="(item, index) in items" :key="index" class="el-box" >
          <el-card class="card-box" style="height: 340px">
            <img :title="item.title" :src="item.index_img" @click="goSexx(item)" class="card-img" >
            <div style="padding: 14px;">
              <div style="padding: 2px 0;height: 40px">
                <a :href="item.url" target="_blank"  :title="item.title">{{item.title | maxSize(15)}}</a>
              </div>
              <div class="summary">
                <div style="display: block;height: 20px;padding: 4px 0">
                  <span style="float: left;"><i class="iconfont tq-liulanliang" style="font-size:16px;"></i> {{item.views_num}}</span>
                  <span style="float: right;"> <i class="iconfont tq-haoping" style="font-size:16px;color: #d4237a;"></i>&nbsp;{{item.praise_rate}}</span>
                </div>
                <div style="display: block;padding-top: 4px" ><i class="iconfont tq-shangchuanshijian"/> {{item.upload_time | msDate }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <!--<video-player  class="video-player vjs-custom-skin"-->
                   <!--ref="videoPlayer"-->
                   <!--:playsinline="true"-->
                   <!--:options="playerOptions"-->
    <!--&gt;-->
    <!--</video-player>-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
                     :page-sizes="[24,48,60]"  :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     style="float:right;">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import request from '../../api/public'
  import CoreApi from '../../api/CoreApi'
  import VideoPlayer from 'vue-video-player'
  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')
  export default {
    data() {
      return {
        total: null,
        orderoptions: [
          {
            label: '默认排序',
            value: 'id'
          },
          {
            label: '上传时间',
            value: '-upload_time'
          },
          {
            label: '浏览量',
            value: '-views_num'
          },
          {
            label: '投票数',
            value: '-vote_num'
          },
          {
            label: '好评度',
            value: '-praise_rate'
          }

        ],
        dialogVisiblePlayer: false,
        items: [],
        data: [],
        temp_time:null,
        params: {
          search: null,
          lang: null,
          pagesize: 36,
          page: 1,
          ordering: 'id',
          upload_time__gt: null,
          upload_time__lt: null
        },
        listDataLoading:false,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "http://www.caca050.com/get_file/3/2148293f28ae9fc64d36426224956656/60000/60678/60678.mp4/?br=345&rnd=1549453484921"
          }],
          poster: "http://cdn-img.tadpoles.xyz/contents/videos_screenshots/52000/52051/180x135/1.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    filters: {
      formatDate(val) {
        var value = new Date(val)
        var year = value.getFullYear()
        var month = value.getMonth()
        var day = value.getDate()
        return year + '-' + month + '-' + day
      },
      imgurl(url) {
        url.replace('preview.jpg', '180x135/1.jpg')
      }
    },
    methods: {
      pickTime(time) {
        if (time) {
          this.params.upload_time__gt = time[0]
          this.params.upload_time__lt = time[1]
        } else {
          this.params.upload_time__gt = null
          this.params.upload_time__lt = null
        }
      },
      featchData() {
        this.listDataLoading=true;
        request.get(CoreApi.SHOP_KDW_LIST,this.params).then(res=>{
          this.items=res.data.results;
          this.total=res.data.total;
          this.listDataLoading=false;
        })

      },
      handleSizeChange(val) {
        this.params.pagesize = val;
        this.featchData()
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.featchData()
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.featchData()
      },
      handleFilter() {
        this.items = [];
        this.featchData()
      },
      goSexx(item){
        console.log(item.id)
        request.get(CoreApi.SHOP_KDW_FILE,{},item.id).then(res=>{
          // window.open(res.data.location, "_blank");
          this.$confirm(res.data.location, '', {
            confirmButtonText: '确定',
            type: 'success',
            showCancelButton:false,
            center:true
          })
        })

      }
    },
    created() {
      this.featchData()
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .card-img{
    width: 100%;
  }
  .el-box{
    padding: 4px;
  }
  .el-card__body{
    padding: 10px;
  }
  .summary{
    float: bottom;
  }
</style>
