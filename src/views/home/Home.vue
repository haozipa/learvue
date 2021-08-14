<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <scroll class="content"
            ref="wrapper"
            :probe-type="3"
            @scroll="contentBackTop"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control class="tab-control" :titles="tab_control_titles" @tabClickIndex="tabClickIndex"/>
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
import BackTop from "components/content/backTop/BackTop";

import {getHomeGoodslist, getHomeMultidata} from "../../network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll,
    BackTop
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
      isShow: false
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
  methods: {
    /**
     *  事件监听相关
     */
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
    },

    backTop() {
      this.$refs.wrapper.scrollTo(0,0,500)
    },

    contentBackTop(position) {
      this.isShow = (-position.y) > 1000
    },

    loadMore() {
      this.getHomeGoodslist(this.currentType)
    },
    /**
     *  网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoodslist(type) {
      const page = this.goodsList[type].page+1;
      getHomeGoodslist(type,page).then(res => {
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page++;
        this.$refs.wrapper.finishedPullUp();
        this.$refs.wrapper.refresh();
      })
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 44px;
  background: white;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  height: calc(100vh - 93px);
}
</style>
