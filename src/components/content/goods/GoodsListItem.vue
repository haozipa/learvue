<template>
  <div class="goods_item" @click="itemClick">
    <img v-lazy="showimg" alt="" @load="imgItemLoad">
    <div class="goods_item_info" v-if="goods_list_item !== undefined">
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
  },
  computed: {
    showimg() {
      if (this.goods_list_item !== undefined) {
        if(this.goods_list_item.show !== undefined) return this.goods_list_item.show.img
        if(this.goods_list_item.image !== undefined) return this.goods_list_item.image
      }
      else {
        return ''
      }
    }
  },
  methods: {
    imgItemLoad() {
      this.$bus.$emit('imgItemLoad')
    },
    itemClick() {
      if(this.goods_list_item.iid){
        this.$router.push('/detail/' + this.goods_list_item.iid)
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
