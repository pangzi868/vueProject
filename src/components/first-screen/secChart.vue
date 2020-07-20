<template>
  <div class="sec-chart">
    <img class="img-span" :src="imgUrl" :alt="imgUrl" />
    <div class="image">{{chartData[0] ? (chartData[0].value + 's') : ''}}</div>
  </div>
</template>

<script>
import credit from "@/assets/images/material/creditDate.png";
import loan from "@/assets/images/material/loanDate.png";
export default {
  name: "",
  props: ["chartData", "ids"],
  mounted() {
    if (this.ids === "extension") {
      this.imgUrl = credit;
    } else {
      this.imgUrl = loan;
    }
  },
  data() {
    return {
      imgUrl: ""
    };
  },
  computed: {},
  methods: {},
  components: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.sec-chart {
  position: relative;
}
.img-span {
  display: block;
  height: 242px;
  width: 242px;
  margin: 0 auto;
  margin-top: 6%;
}
.image {
  position: absolute;
  top: 43%;
  left: 44%;
  color: #00bbc2;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 48px;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: left;
}
</style>
