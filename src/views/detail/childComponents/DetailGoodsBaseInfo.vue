<template>
  <div class="goods_base_info">
    <div class="good_title">{{goods.title}}</div>
    <div class="good_price">
      <span class="good_now_price">￥{{goods.nowPrice}}</span>
      <span class="good_old_price">{{goods.oldPrice}}</span>
      <span class="good_price_dis" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="good_info">
      <span class="good_sales">{{goods.sales}}</span>
      <span class="good_collect">{{goods.collect}}</span>
      <span class="good_express">{{goods.express}}</span>
    </div>
    <div class="good_shop_serve">
      <div v-for="item in goods.services" class="shop_serve">
        <span class="shop_serve_item_img"><img :src="item.icon" alt=""></span>
        <span class="shop_serve_item_text">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
 .good_title {
   padding: 8px 5px;
   font-size: 16px;
   line-height: 20px;
   color: black;
   width: 100vw;
 }
 .good_now_price {
   color: var(--color-high-text);
   font-size: 20px;
   margin: 0 5px;
 }
 .good_old_price {
   color: var(--color-text);
   text-decoration: line-through;
   font-size: 14px;
 }
 .good_price_dis{
   background: var(--color-high-text);
   margin: 0 5px;
   border-radius: 8px;
   font-size: 14px;
   color: white;
   padding: 3px;
   position: relative;
   bottom: 8px;
 }
 .good_info {
   display: flex;
   margin-top: 10px;
   font-size: 13px;
 }
 .good_sales {
   flex: 1;
   padding-left: 5px;
 }
.good_collect {
  flex: 1;
  text-align: center;
}
.good_express {
  flex: 1;
  text-align: right;
  padding-right: 10px;
}
.good_shop_serve {
  display: flex;
  margin: 5px 0;
  padding: 20px 5px;
  border-top: 3px solid #cccccc;
  border-bottom: 3px solid #cccccc;
}
.shop_serve {
  font-size: 0.7rem;
  margin: 0 auto;
}
.shop_serve shop_serve_item_text{
  float: left;
}
.shop_serve img {
  width: 0.7rem;
  float: left;
}
</style>
