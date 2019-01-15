<template>
  <div class="good-item">
    <div>
      <div class="good-img">
        <!--<router-link :to="{path:'/funserver',query: {name: msg.en}}">-->
          <img :src="msg.frist_img" >
        <!--</router-link>-->
      </div>
      <h6 class="good-title">{{msg.title}}</h6>
      <div class="good-price">
        <p><span style="font-size: 16px;text-align: left">￥ {{ msg.sales}}</span><span style="font-size: 16px">￥</span>{{ msg.price}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from './YButton'
  import { mapMutations, mapState } from 'vuex'
  export default {
    props: {
      msg: { type: [Object, Array] }
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      addCart(id, price, name, img) {
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted() {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/style/mixin";
  .good-item {
    background: #fff;
    width: 20%;
    transition: all .5s;
    height: 300px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }
    .good-img {
      img {
        margin: 0px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 20px;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }
  }
</style>
