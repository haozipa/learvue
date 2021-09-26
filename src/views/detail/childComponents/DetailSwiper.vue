<template>
  <div>
    <swiper class="detail_swiper">
      <swiper-item v-for="item in topswiper">
        <img :src="item" alt="" @load="swiperImgLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
import {debounce} from "../../../utils";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topswiper: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperImgLoad() {
      let length = this.topswiper.length || 0
      this.$emit('swiperImgLoad',length)
    }
  }
}
</script>

<style scoped>
.detail_swiper {
  height: 45vh;
}
</style>
