<template>
  <div class="detail_navbar">
    <nav-bar class="detail_nav_bar">
      <div slot="left" class="detail_left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail_center">
        <div class="detail_title_item"
             @click="itemClick(index)"
             :class="{active : index === currentIndex}"
             v-for="(item,index) in titles">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Detail_Navbar",
  components: {
    NavBar
  },
  data() {
    return {
      currentIndex: 0,
      titles: ['商品','详情','评论','推荐']
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('navbarClick',index)
    }
  }
}
</script>

<style scoped>
.detail_left {
  margin-left: 10px;
}
.detail_left  img{
  width: 80%;
  height: 80%;
}
.detail_center {
  display: flex;
}
.detail_title_item {
  flex: 1;
  font-size: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>
