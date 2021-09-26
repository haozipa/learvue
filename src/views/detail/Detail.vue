<template>
  <div class="detail">
    <detail-navbar @navbarClick="tabbarClick" ref="detail_navbar"/>
    <scroll class="detail_scroll" ref="wrapper" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topswiper="topswiper" @swiperImgLoad="swiperImgLoad"/>
      <detail-goods-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-shows :shows-info="showsInfo" @showsImgLoad="showsImgLoad"/>
      <detail-params ref="params" :show-params="showParams"/>
      <detail-rate ref="comment" :rates="rate" @rateImgLoad="rateImgLoad"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" ref="addGood"/>
    <back-top @click.native="backTop" v-show="isShow"/>
  </div>
</template>

<script>
import DetailNavbar from './childComponents/DetailNavbar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailGoodsBaseInfo from "./childComponents/DetailGoodsBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailShows from "./childComponents/DetailShows";
import DetailParams from "./childComponents/DetailParams";
import DetailRate from "./childComponents/DetailRate";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import {getDetail,GoodsBaseInfo,getRecommend} from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {listenImg,backTop} from "../../utils/mixin";
import {debounce} from "../../utils";

export default {
  name: "Detail",
  mixins: [listenImg,backTop],
  components: {
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailGoodsBaseInfo,
    DetailShopInfo,
    DetailShows,
    DetailParams,
    GoodsList,
    DetailRate,
    DetailBottomBar
  },
  data() {
    return {
      iid : null,
      topswiper: [],
      goods: {},
      shopInfo:{},
      showsInfo: {},
      showParams:{},
      rate:{},
      recommend:[],
      themeYs:[],
      imgLoad: {
        swiper:{
          content: null,
          num:0
        },
        rate: {
          content: 0,
          num: 0
        }
      },
      currentIndex: 0
    }
  },
  methods: {
    tabbarClick(index) {
      this.$refs.wrapper.scrollTo(0,-this.themeYs[index]+44,200)
    },
    swiperImgLoad(e) {
        this.imgLoad.swiper.content = e
        this.imgLoad.swiper.num +=1
    },
    rateImgLoad(e) {
      this.imgLoad.rate.content = e
      this.imgLoad.rate.num +=1
    },
    _initYs() {
      if(this.imgLoad.swiper.content ==  this.imgLoad.swiper.num && this.imgLoad.rate.content == this.imgLoad.rate.num){
        this.themeYs = [0]
        this.themeYs.push(this.$refs.params.$el.offsetTop)
        this.themeYs.push(this.$refs.comment.$el.offsetTop)
        this.themeYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeYs.push(Number.MAX_VALUE)
      }
    },
    showsImgLoad() {
      debounce(this._initYs(),300)
    },
    contentScroll(position) {
      for (let i=0;i < this.themeYs.length-1;i++) {
        if(this.currentIndex !== i && ((-position.y) >= (this.themeYs[i]-44) && (-position.y) < (this.themeYs[i+1]-44))){
          this.currentIndex = i
          this.$refs.detail_navbar.currentIndex = this.currentIndex
        }
      }
      this.isShow = (-position.y) > 1000
    },
    addToCart() {
      const product = {
        iid: this.iid,
        img: this.topswiper[0],
        price: this.goods.nowPrice,
        title: this.goods.title
      }
      this.$store.dispatch('addToCart',product).then( res => {
        // console.log('加入购物车成功')
        const toast = this.$toast({
          message: res,
          time: 1500
        })
        debounce(toast)
      })
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //获取详情页数据
    getDetail(this.iid).then( (res) => {
      //详情页轮播图数据
      this.topswiper = res.result.itemInfo.topImages
      //给商品基本数据赋值
      this.goods = new GoodsBaseInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo)
      //给店铺信息赋值
      this.shopInfo = res.result.shopInfo
      //图片展示信息
      this.showsInfo =res.result.detailInfo
      //商品参数信息
      this.showParams = res.result.itemParams
      //评论信息
      this.rate = res.result.rate
    })
    //获取推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list
    })
  },
  destroyed() {
    this.$bus.$off('imgItemLoad',this.imgItemlisten)
  }
}
</script>

<style scoped>
.detail_scroll {
  height: calc(100vh - 44px - 49px);
}
</style>
