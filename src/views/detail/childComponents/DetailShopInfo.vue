<template>
  <div class="detail_shopInfo">
    <div class="detail_shopInfo_header">
      <img :src="shopInfo.shopLogo" alt="">
      <div class="detail_shop_name">{{shopInfo.name}}</div>
    </div>
    <div class="detail_shopInfo_body">
      <div class="detail_shopInfo_left">
        <div class="detail_shop_sell">
          <div>{{Sell}}</div>总销量
        </div>
        <div class="detail_shop_goods">
          <div>{{shopInfo.cGoods}}</div>全部宝贝
        </div>
      </div>
      <div class="detail_shopInfo_right">
        <div class="detail_shop_score" v-for="item in this.shopInfo.score">
          <span>{{item.name}}</span>
          <span :style="{color : (item.score >= 4) ? 'var(--color-high-text)' : ((item.score >= 3) ? 'green' : 'red')}">
            {{item.score}}</span>
          <span :style="{color : (item.score >= 4) ? 'var(--color-high-text)' : ((item.score >= 3) ? 'green' : 'red')}">
            {{(item.score >= 4) ? '高' : ((item.score >= 3) ? '中' : '低')}}</span>
        </div>
      </div>
    </div>
    <div class="detail_shopInfo_footer">
      <a :href="this.shopInfo.shopUrl" class="detail_shop_button">
        进 店 逛 逛
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    Sell() {
      if(this.shopInfo.cSells > 10000) {
        return Math.round(+(this.shopInfo.cSells/10000) + 'e' + 1) / Math.pow(10, 1) + '万'
      }
      else{
        return this.shopInfo.cSells
      }
    }
  }
}
</script>

<style scoped>
.detail_shopInfo_header {
  width: 100vw;
  height: 50px;
  padding: 10px 5px;
}
.detail_shopInfo_header div{
  line-height: 50px;
  padding-left: 70px;
}
.detail_shopInfo_header img{
  height: 50px;
  float: left;
  margin-left: 5px;
}
.detail_shopInfo_body {
  clear: both;
  display: flex;
}
.detail_shopInfo_left {
  flex: 1;
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin: 20px 5px;
  border-right: 2px solid #cccccc;
  align-items: center;
}
.detail_shop_sell {
  flex: 1;
  text-align: center;
}
.detail_shop_goods {
  flex: 1;
  text-align: center;
}
.detail_shopInfo_right {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 5px;
}
.detail_shop_score {
  flex: 1;
  display: flex;
  align-items: center;
}
.detail_shopInfo_footer {
  width: 100vw;
  border-bottom: 3px solid #cccccc;
  padding-bottom: 20px;
}
.detail_shop_button {
  display: block;
  width: 50%;
  margin: 0 25%;
  color: var(--color-text);
  background: #cccccc;
  border-radius: 20px;
  text-align: center;
  padding: 5px;
}
</style>
