<template>
  <div class="middle-indicator">
    <div class="indicator-left indicator-div"></div>
    <div class="middle-span">
      <div class="middle-title">增收节支金额</div>
      <div class="middle-value middle-interval">1209万元</div>
      <div class="middle-title">减少损失浪费</div>
      <div class="middle-value">19万元</div>
    </div>
    <div class="indicator-right indicator-div"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.middle-span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 440px;
  height: 388px;
  text-align: center;
  background: rgba(15, 67, 97, 0.6);
  padding: 28px 52px;
  .middle-title {
    color: rgba(255, 255, 255, 1);
    font-family: Microsoft YaHei;
    font-weight: regular;
    font-size: 28px;
    line-height: 44px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }
  .middle-value {
    color: rgba(0, 255, 163, 1);
    font-family: Google Sans;
    font-weight: bold;
    font-size: 32px;
    line-height: 80px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }

  .middle-interval {
    margin-bottom: 40px;
  }
}
.indicator-div {
  position: absolute;
  width: 44%;
  height: 100%;
  background: rgba(255, 0, 0, 0.2);
}
.indicator-right {
    left: 56%;
}
</style>
