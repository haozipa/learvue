<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control v-show="isTabFixed"
                 :titles="tab_control_titles"
                 ref="tabControl1"
                 class="tab-control-fixed"
                 @tabClickIndex="tabClickIndex"/>
    <scroll class="content"
            ref="wrapper"
            :probe-type="3"
            @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"  @recommendImgLoad="recommendImgLoad"/>
      <feature-view/>
      <tab-control :titles="tab_control_titles"
                   ref="tabControl2"
                   @tabClickIndex="tabClickIndex"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import FeatureView from "./childComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll"

import {getHomeGoodslist, getHomeMultidata} from "../../network/home";
import {listenImg , backTop} from "../../utils/mixin";
import {debounce} from "../../utils";

export default {
  name: "Home",
  mixins: [listenImg,backTop],
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll
  },
  data(){
    return {
      banners: [],
      recommends: [],
      tab_control_titles: ['流行','新款','精选'],
      goodsList: {
        'pop' : {page: 0,list: []},
        'new' : {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      tabControltop: 0,
      isTabFixed: false,
      swiperload: false,
      recommendload: false,
      saveY: 0,
      loadflag: false,
      activeflag:false
    }
  },
  methods: {
    /**
     *  事件监听相关
     */
    //tabcontrol点击事件
    tabClickIndex(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
      //为了2个tabcontrol保持同步
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
    },
    //监听scroll滚动
    contentScroll(position) {
      //返回图标显示
      this.isShow = (-position.y) > 1000

      //吸顶实现
      this.isTabFixed = (-position.y) > this.tabControltop

      //提前显示下一页
      if((-position.y) > (-this.$refs.wrapper.scroll.maxScrollY)*0.5) {
        if(!this.loadflag) {
          this.pullingUp()
          this.loadflag = true
        }
      }
    },
    //监听轮播图加载是否完成
    swiperImgLoad() {
      this.swiperload = true
      this.imgLoad()
    },
    //监听推荐图片是否加载完成
    recommendImgLoad() {
      this.recommendload = true
      this.imgLoad()
    },
    //监听图片是否加载完成，获取真实tabcontrol距离顶部高度
    imgLoad() {
      if(this.swiperload && this.recommendload) {
        this.tabControltop = this.$refs.tabControl2.$el.offsetTop-40
      }
    },
    //上拉加载更多函数
    pullingUp() {
      this.getHomeGoodslist(this.currentType)
      const refresh = debounce(() => {
        this.$refs.wrapper.refresh
        this.loadflag = false
      },500);
      //监听事件总线，图片加载完成
      this.$bus.$on('imgItemLoad',() => {
        refresh()
      })
    },
    /**
     *  网络请求相关
     */
    //获取主页轮播图，推荐图数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //获取商品列表数据
    getHomeGoodslist(type) {
      const page = this.goodsList[type].page+1;
      getHomeGoodslist(type,page).then(res => {
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page++;
      })
    }
  },
  computed: {
    showGoods() {
      return this.goodsList[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoodslist('pop');
    this.getHomeGoodslist('new');
    this.getHomeGoodslist('sell');
  },
  //进入主页
  activated() {
    // console.log('进入主页')
    if(this.activeflag == true) {
      this.$refs.wrapper.refresh()
      this.$refs.wrapper.scroll.scrollTo(0,this.saveY,0)
      this.$refs.wrapper.refresh()
    }
    else{
      this.activeflag = true
    }
  },
  //离开主页
  deactivated() {
    this.saveY = this.$refs.wrapper.scrollY
    // console.log(this.$refs.wrapper.scroll.scrollTo)
    this.$bus.$off('imgItemLoad',this.imgItemlisten)
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
  background: white;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}

.tab-control-fixed {
  position: fixed;
  z-index: 1;
  top: 44px;
  left: 0;
  right: 0;
}

.content {
  height: calc(100vh - 93px);
}
</style>
