<template>
  <div class="multiple">
    <div class="multiple-left">
      <div
        :class="'test-div ' + (mouseOverJudge['left2'] ? 'transform-test-div' : '')"
        :id="ids['left2']"
        @mouseover="mouseOverHander($event)"
        @mouseout="mouseOutHander($event)"
      ></div>
      <div
        :class="'test-div1 ' + (mouseOverJudge['left3'] ? 'transform-test-div' : '')"
        :id="ids['left3']"
        @mouseover="mouseOverHander($event)"
        @mouseout="mouseOutHander($event)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [],
  mounted() {},
  data() {
    return {
      // 存放id
      ids: {
        left2: "left2",
        left3: "left3"
      },
      mouseOverJudge: {
        left2: false,
        left3: false
      }
    };
  },
  computed: {},
  methods: {
    mouseOverHander(e) {
      let id = e.target.id;
      this.mouseOverJudge[id] = true;
    },
    mouseOutHander(e) {
      let id = e.target.id;
      this.mouseOverJudge[id] = false;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.multiple {
  width: 2560px;
  height: 1440px;
  color: #fff;
  background: url("../../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .multiple-left {
    position: absolute;
    left: 50px;
    top: 300px;
    width: 700px;
    height: 1000px;
    .test-div {
      background: url("../../assets/images/modal.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: rgba(0, 0, 0, 0.3) -10px -10px 1px;
      //   transform: scale(1.08, 1) skew(0deg, 1deg);
      position: absolute;
      top: 0%;
      left: 0%;
      height: 400px;
      width: 100%;
      transition: all 0.3s;
    }
    .test-div1 {
      background: url("../../assets/images/modal.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: rgba(0, 0, 0, 0.3) -10px -10px 1px;
      //   transform: scale(1.08, 1) skew(0deg, 1deg);
      position: absolute;
      top: 45%;
      left: 0%;
      height: 400px;
      width: 100%;
      transition: all 0.3s;
    }
    .transform-test-div {
      // 放大x， y
      transform: scale(1.05, 1.05);
      // 位移 x， y
      transform: translate(1.05, 1.05);
    }
  }
}
</style>
