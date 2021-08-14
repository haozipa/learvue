<template>
  <div class="goods_item">
    <img :src="goods_list_item.show.img" alt="">
    <div class="goods_item_info">
      <p>{{goods_list_item.title}}</p>
      <span class="price">{{goods_list_item.price}}</span>
      <span class="collect">{{goods_list_item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goods_list_item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods_item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods_item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods_item_info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods_item_info p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-bottom: 3px;
  }

  .goods_item_info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods_item_info .collect {
    position: relative;
  }

  .goods_item_info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
