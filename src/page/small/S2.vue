<template>
  <div class="second-screen" @contextmenu.prevent></div>
</template>

<script>
export default {
  name: "",
  props: [],
  mounted() {
    let data = null;
    if (window.name) {
      data = JSON.parse(window.name);
      // data = window.name;
    } else {
      data = JSON.parse(dataJson.S1);
    }
    this.screenFirstData = data;
    this.initData();
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initData() {}
  },
  components: {},
  watch: {}
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "ShiShangZhongHeiJianTi";
  src: url(../../components/font/shishangzhongheijianti.ttf); /***兼容ie9***/
}

.second-screen {
  position: relative;
  width: 7680px;
  height: 4320px;
  background: url("../../assets/images/first/background-s.png") no-repeat;
  background-size: 100% 100%;
}
</style>
