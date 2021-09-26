<template>
  <div class="detail_shows" v-if="showsInfo !== undefined">
    <div class="detail_show_title" v-if="showsInfo.desc !== undefined">
      <div class="detail_show_left"></div>
      <div class="detail_show_content">{{showsInfo.desc}}</div>
      <div class="detail_show_right"></div>
    </div>
    <div class="detail_show_body" v-if="showsInfo.detailImage !== undefined">
      <div class="detail_show_key">{{showsInfo.detailImage[0].key}}</div>
      <div class="detail_show_images">
        <img :src="item" alt="" v-for="item in showsInfo.detailImage[0].list" @load="showsImgLoad">
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from "../../../utils";

export default {
  name: "DetailShows",
  props: {
    showsInfo: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    showsImgLoad() {
        this.$emit('showsImgLoad')
    }
  }
}
</script>

<style scoped>
.detail_shows {
  width: 100vw;
}
.detail_show_left {
  margin: 5px;
  width: 30%;
  height: 5px;
  border-left: 5px solid black;
  border-bottom: 1px solid black;
}
.detail_show_right {
  margin: 5px;
  width: 30%;
  height: 5px;
  border-right: 5px solid black;
  border-bottom: 1px solid black;
  float: right;
}
.detail_show_content {
  margin: 10px 5px;
  font-size: 15px;
}
.detail_show_body {
  clear: both;
}
.detail_show_key {
  margin: 10px 5px;
  font-size: 16px;
  font-weight: 550;
}
.detail_show_images img{
  width: 100%;
}
</style>
