<template>
  <div
    :class="((amplification[ids] == true ? 'transform-test-div' : '') + (visual[ids] == true ? 'visual': ''))"
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
    },
    visual: {
      get: function() {
        return this.$store.state.visual;
      },
      set: function(newValue) {
        this.$store.commit("newVisual", newValue);
      }
    }
  },
  methods: {
    mouseOverHandler(e) {
      let className = e.target && e.target.classList.value;
      let hoverBox =
        className.indexOf("left-side-bar") !== -1
          ? "left-side-bar"
          : "right-side-bar";
      let arr = document.getElementsByClassName(hoverBox);
      let hoverBoxIds = [];
      for (let i in arr) {
        arr[i].id && hoverBoxIds.push(arr[i].id);
      }
      let id = e.target.id;
      hoverBoxIds.splice(hoverBoxIds.indexOf(id), 1);
      let visualTemp = {};
      hoverBoxIds.forEach(item => {
        visualTemp[item] = true;
      });
      this.$store.commit("newVisual", visualTemp);

      let temp = {};
      temp[id] = true;
      this.$store.commit("newAmplification", temp);
    },
    mouseOutHandler(e) {
      let className = e.target && e.target.classList.value;
      let hoverBox =
        className.indexOf("left-side-bar") !== -1
          ? "left-side-bar"
          : "right-side-bar";
      let arr = document.getElementsByClassName(hoverBox);
      let hoverBoxIds = [];
      for (let i in arr) {
        arr[i].id && hoverBoxIds.push(arr[i].id);
      }
      let id = e.target.id;
      hoverBoxIds.splice(hoverBoxIds.indexOf(id), 1);
      let visualTemp = {};
      hoverBoxIds.forEach(item => {
        visualTemp[item] = false;
      });
      this.$store.commit("newVisual", visualTemp);

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
.visual {
  opacity: 0.3;
}
</style>
