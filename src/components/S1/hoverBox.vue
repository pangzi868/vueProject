<template>
  <div
    :class="(mouseOverJudge[ids] ? 'transform-test-div' : '')"
    :id="ids"
    @mouseover="mouseOverHandler($event)"
    @mouseout="mouseOutHandler($event)"
  ></div>
</template>

<script>
export default {
  name: "",
  props: ["ids"],
  mounted() {},
  data() {
    return {
      mouseOverJudge: {}
    };
  },
  computed: {},
  methods: {
    mouseOverHandler(e) {
      let id = e.target.id;
      this.mouseOverJudge[id] = true;
    },
    mouseOutHandler(e) {
      let id = e.target.id;
      this.mouseOverJudge[id] = false;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.transform-test-div {
  // 放大x， y
  transform: scale(1.05, 1.05);
  // 位移 x， y
  transform: translate(1.05, 1.05);
}
</style>
