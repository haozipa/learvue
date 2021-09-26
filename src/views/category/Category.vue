<template>
  <div>
    <h2>分类</h2>
  </div>
</template>

<script>
import {getCateGory} from "network/category";

export default {
  name: "Category",
  data() {
    return {
      list: []
    }
  },
  created() {
    getCateGory().then(res => {
      this.list = res.data.category.list || []
    })
  }
}
</script>

<style scoped>

</style>
