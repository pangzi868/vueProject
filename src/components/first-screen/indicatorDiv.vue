<template>
  <div class="indicator-div">
    <div :style="titleStyle" class="title-content">{{titleContent}}</div>
    <div :style="digitalStyle" class="digital-data">{{digital || 0}}</div>
  </div>
</template>

<script>
export default {
  name: "axis",
  props: ["titleContent", "titleStyle", "digital", "digitalStyle"],
  created() {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  watch: {}
};
</script>

<style lang="less" scroped>
// @font-face {
//   font-family: "UnidreamLED";
//   src: url(./font/UnidreamLED.eot); /***兼容ie9***/
//   src: url(./font/UnidreamLED.eot?#iefix) format("embedded-opentype"),
//     /***兼容ie6-ie8***/ url("./font/UnidreamLED.woff") format("woff"),
//     local("UnidreamLED"), url("./font/UnidreamLED.woff"); /***默认使用本地的***/
// }

@font-face {
  font-family: "DS-Digital";
  src: url(../font/DS-DIGIB-2.ttf); /***兼容ie9***/
}
.indicator-div {
  width: 100%;
  .title-content {
    color: rgba(255, 255, 255, 1);
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 32px;
    line-height: normal;
    letter-spacing: 0px;
    // text-align: left;
  }
  .digital-data {
    font-family: "DS-Digital";
    color: rgba(255, 255, 255, 1);
    // font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 64px;
    line-height: normal;
    letter-spacing: 20px;
    // text-align: left;
    // margin-top: 34px;
  }
}
</style>
