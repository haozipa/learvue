<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="recommendImgLoading">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    recommendImgLoading() {
      if(!this.isLoad) {
        this.$emit('recommendImgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100vw;
  font-size: 12px;
  padding: 15px 0 30px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
  width: 100%;
  text-align: center;
}
.recommend-item img{
  width: 80%;
}
</style>
