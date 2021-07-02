<template>
  <div class="tab_bar_item" @click="ItemClick">
    <div v-show="!isActive"><slot name="item-icon"></slot></div>
    <div v-show="isActive"><slot name="item-icon-active"></slot></div>
    <div :style="itemactive"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activecolor: {
      type: String,
      default: 'deeppink'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    itemactive() {
      return this.isActive? {color: this.activecolor} : ''
    },
    isActive() {
      return this.$route.path.indexOf(this.link)!==-1
    }
  },
  methods: {
    ItemClick() {
      // console.log(this.link)
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
  .tab_bar_item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab_bar_item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
