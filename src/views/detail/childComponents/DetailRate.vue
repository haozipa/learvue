<template>
  <div class="detail_rate" v-if="rates.cRate !== 0">
    <div class="detail_rate_header">
      用户评价
      <a href="#">更多</a>
    </div>
    <div class="detail_rate_userInfo" v-if="rates.list !== undefined">
      <div class="detail_rate_user_logo" v-if="rates.list[0].user !== undefined">
        <img :src="rates.list[0].user.avatar" alt="">
      </div>
      <div class="detail_rate_username" v-if="rates.list[0].user !== undefined">{{rates.list[0].user.uname}}</div>
    </div>
    <div class="detail_rate_content" v-if="rates.list !== undefined">
      <div class="detail_rate_text">{{rates.list[0].content}}</div>
      <div class="detail_rate_images" v-if="rates.list[0].images !== undefined">
        <img :src="item" alt="" v-for="item in rates.list[0].images" @load="rateImgLoad">
      </div>
      <span v-if="rates.list[0].style !== undefined" class="detail_rate_style">{{rates.list[0].style}}</span>
      <div class="detail_rate_extra" v-if="rates.list !== undefined">
        <span v-for="item in rates.list[0].extraInfo" v-if="rates.list[0].extraInfo !== undefined">{{item}}</span>
      </div>
      <span v-if="rates.list[0].created !== undefined" class="detail_rate_date">{{rateDate}}</span>
    </div>
    <div class="detail_rate_shop" v-if="rates.list !== undefined">{{rates.list[0].explain}}</div>
  </div>
</template>

<script>
import {getDate} from "../../../utils";

export default {
  name: "DetailRate",
  props: {
    rates: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    rateDate() {
      if (this.rates.list !== undefined) {
        if (this.rates.list[0].created !== undefined) {
          return getDate(this.rates.list[0].created)
        }
      }
    }
  },
  methods: {
    rateImgLoad() {
      let length = this.rates.list[0].images.length || 0
      this.$emit('rateImgLoad',length)
    }
  }
}
</script>

<style scoped>
.detail_rate_header {
  width: 100vw;
  padding: 10px;
  border-bottom: 2px solid #cccccc;
  margin-top: 20px;
}
.detail_rate_header a{
  display: block;
  float: right;
  color: var(--color-high-text);
}
.detail_rate_userInfo{
  display: flex;
  padding: 10px;
}
.detail_rate_user_logo{
  flex: 1;
}
.detail_rate_user_logo img{
  width: 100%;
}
.detail_rate_username{
  flex: 8;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.detail_rate_content{
  background: #eeeeee;
}
.detail_rate_text{
  text-indent: 10px;
  padding: 8px 5px 50px 5px;
}
.detail_rate_images {
  display: flex;
  width: 100%;
  padding: 5px;
}
.detail_rate_images img{
  flex: 1;
  width: 100%;
  padding: 5px;
}
.detail_rate_extra{
  display: flex;
}
.detail_rate_extra span{
  flex: 1;
  font-size: 12px;
  text-align: center;
}
.detail_rate_style{
  text-indent: 10px;
  display: block;
  width: 100%;
  font-size: 12px;
}
.detail_rate_date {
  width: 100%;
  text-align: right;
  padding-right: 10px;
  display: block;
  background: #eeeeee;
}
.detail_rate_shop {
  margin-top: 15px;
  font-size: 12px;
  text-indent: 10px;
  background: #eeeeee;
  margin-bottom: 50px;
}
</style>
