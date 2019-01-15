<template>
  <div class="app-container">
    <el-form :inline="true">
      <div class="filter-container">
        <el-form-item>
          <el-input v-model="listQuery.search" style="width: 200px;"  placeholder="搜索"></el-input>
          <el-select class="" v-model="listQuery.ordering" >
            <el-option v-for="item in  orderoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="temp_time"
            type="daterange"
            align="right"
            unlink-panels
            format
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="pickTime"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <el-button class="f" type="primary"  icon="el-icon-search" @click="handleFilter">Search</el-button>
        </el-form-item>
      </div>
    </el-form>
      <el-row>
        <el-col :span="4" v-for="(item, index) in items" :key="index" class="el-box" >
          <el-card :body-style="{ padding: '0px' }" class="card-box" style="height: 340px">
            <a :href="item.url" target="_blank"><img :src="item.index_img" class="card-img" @click="diaplayer(item)" ></a>
            <div style="padding: 14px;">
              <div style="height: 2.5rem;overflow: hidden;padding: 2px 0">
                <a :href="item.url" target="_blank">{{item.title}}</a>
              </div>
              <div>
                <span style="margin: auto 4px"><svg-icon icon-class="people_blue" style="font-size: 1rem;"/> {{item.views_num}}</span>
                <span style="margin: auto 4px"><svg-icon icon-class="好评" style="font-size: 1rem;"/> {{item.praise_rate}}</span>
                <span style="margin: auto 4px"><svg-icon icon-class="time" style="font-size: 1rem;"/> {{item.upload_time | formatDate }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[24,30,36, 42]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisiblePlayer" style="background: none!important;">
      <div v :visible.sync="dialogVisiblePlayer">
        <video-player class="vjs-custom-skin"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"
                       @statechanged="playerStateChanged($event)">
        </video-player>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')
  import infiniteScroll from 'vue-infinite-scroll'
  import { sexxlist } from '@/api/shop'
  // import mallGoods from './components/mallGoods'
  import InfiniteLoading from 'vue-infinite-loading'
  import videoPlayer from './components/player'

  export default {
    components: { videoPlayer,
      player() {
        return this.$refs.videoPlayer.player
      },
      // mallGoods,
      InfiniteLoading,
      infiniteScroll },
    data() {
      return {
        busy: true,
        temp_time: null,
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
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: '',
          width: document.documentElement.clientWidth,
          // notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true// 全屏按钮
          }
        },
        imageSrc: this.src,
        loading: false,
        items: [],
        computer: [],
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        data: [],
        listQuery: {
          search: null,
          lang: null,
          pagesize: 36,
          page: 1,
          ordering: 'id',
          upload_time__gt: null,
          upload_time__lt: null
        },
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
          this.listQuery.upload_time__gt = time[0]
          this.listQuery.upload_time__lt = time[1]
        } else {
          this.listQuery.upload_time__gt = null
          this.listQuery.upload_time__lt = null
        }
      },
      featchData() {
        sexxlist(this.listQuery).then(response => {
          this.items = response.data.results
          this.total = response.data.count
        })
      },
      handleSizeChange(val) {
        this.listQuery.pagesize = val
        this.featchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.featchData()
      },
      diaplayer(item) {
        console.log(item)
        this.playerOptions.sources[0].src = item.video_url
        console.log(item.video_url)
        // this.playerOptions.poster = item.index_img
        this.dialogVisiblePlayer = true
      },
      // listen event
      onPlayerPlay(player) {
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      loadMore() {
        this.loading = true
        this.listQuery.offset += this.listQuery.limit
        this.featchData()
        this.loading = false
      },
      handleFilter() {
        this.items = []
        this.featchData()
      }
    },
    created() {
      this.featchData()
    },
    mounted() {
      // setTimeout(() => {
      //   console.log('dynamic change options', this.player)
      //   this.playerOptions.muted(false)
      // }, 5000)
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  .el-box {
    padding: 5px 10px;
  }
  .card-box {
  }
  .card-img {
    width: 100%;
    padding: 20px 10px;
    margin: auto;
  }
  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }
  .load-more {
    text-align: center;background: #fff
  }
  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }
   .container{
     overflow: auto;
     width: 100%;
     background-color: white;
     display: flex;
     flex-wrap:wrap;
     justify-content:space-around;
     align-items: center;
     align-content: space-between;
     .box{  flex: 0 0 15%; height: 300px;
          img {
            width: 200px;
            height: 180px;
            overflow: hidden;
          }
     }
   }
  .loading-bubbles {
    margin-bottom: 50px;
  }
  .el-dialog__header{
    padding: 0 0 ;
  }
  .el-dialog__body {
    padding: 0 0 ;
  }
</style>
