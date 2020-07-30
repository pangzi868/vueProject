<template>
  <div
    :class="(amplification[ids] == true ? 'transform-test-div' : '')"
    :id="ids"
    @mouseenter="mouseOverHandler($event)"
    @mouseleave="mouseOutHandler($event)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids"],
  mounted() {},
  data() {
    return {};
  },
  computed: {
    amplification: {
      get: function() {
        return this.$store.state.amplification;
      },
      set: function(newValue) {
        this.$store.commit("newAmplification", newValue);
      }
    }
  },
  methods: {
    mouseOverHandler(e) {
      let className = e.target && e.target.classList.value;

      let id = e.target.id;
      let temp = {};
      temp[id] = true;
      this.$store.commit("newAmplification", temp);
    },
    mouseOutHandler(e) {
      let id = e.target.id;
      let temp = {};
      temp[id] = false;
      this.$store.commit("newAmplification", temp);
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.transform-test-div {
  // 放大x， y
  transform: scale(1.03, 1.03);
  // 位移 x， y
  transform: translate(1.03, 1.03);
}
</style>
