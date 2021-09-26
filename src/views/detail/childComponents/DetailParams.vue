<template>
  <div class="detail_params">
    <div class="detail_good_params" v-if="showParams.info !== undefined">
      <table>
        <tr>
          <td>{{showParams.info.key}}</td>
        </tr>
        <tr v-for="item in showParams.info.set">
          <td>{{ item.key }}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="detail_good_rule" v-if="showParams.rule !== undefined">
      <table v-for="item1 in showParams.rule.tables">
        <tr>
          <td>{{showParams.rule.key}}</td>
        </tr>
        <tr v-for="item2 in item1">
          <td v-for="item3 in item2">{{item3}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    showParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail_params{
  margin-top: 20px;
  color: var(--color-text);
}
.detail_good_params table {
  border-collapse: collapse;
  width: 100%;
}
.detail_good_params tr{
  border-bottom: 2px solid #cccccc;
  display: flex;
  padding: 5px 0;
}
.detail_good_params tr :first-child{
  text-indent: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail_good_params tr :nth-child(2) {
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
.detail_good_params table :first-child td {
  display: inline;
}
.detail_good_rule{
  margin-top: 20px;
  color: var(--color-text);
}
.detail_good_rule table {
  border-collapse: collapse;
  width: 100%;
}
.detail_good_rule tr{
  border-bottom: 2px solid #cccccc;
  display: flex;
  padding: 5px 0;
}
.detail_good_rule tr td {
  text-indent: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail_good_rule table :first-child td {
  display: inline;
}
</style>
