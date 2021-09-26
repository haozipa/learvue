<template>
  <div class="cart_nav_bar">
    <nav-bar>
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from 'vuex'

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartCount'])
  }
}
</script>

<style scoped>
 .cart_nav_bar {
   background-color: var(--color-tint);
   color: white;
 }
</style>
