<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods_list_item="item" class="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: calc(1vw);
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>
