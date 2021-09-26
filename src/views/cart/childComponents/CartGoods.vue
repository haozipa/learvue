<template>
  <div class="cart_goods">
    <cart-good-item v-for="(item,index) in $store.state.cartList" :key="index" :item-info="item"/>
  </div>
</template>

<script>
import CartGoodItem from "./CartGoodItem";

export default {
  name: "CartGoods",
  components: {
    CartGoodItem
  }
}
</script>

<style scoped>

</style>
