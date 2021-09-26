<template>
  <div class="cart">
    <!--    顶部导航-->
    <cart-nav-bar/>
    <!--    显示商品-->
    <cart-goods/>
    <!--    底部工具栏-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartNavBar from "./childComponents/CartNavBar";
import CartGoods from "./childComponents/CartGoods";
import CartBottomBar from "./childComponents/CartBottomBar";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartGoods,
    CartBottomBar
  }
}
</script>

<style scoped>

</style>
