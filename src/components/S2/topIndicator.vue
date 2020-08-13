<template>
  <div class="top-indicator" :id="ids">
    <div class="single-indicator" v-for="(item, index) in theme" :key="index">
      <div class="img-left" />
      <img :src="item.imgUrl" alt class="img-span" />
      <div class="img-right" />
      <div class="indicator-right">
        <span v-html="item.name"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Scene from "@/assets/images/second/Frame-34@4x.png";
import Response from "@/assets/images/second/Frame-35@4x.png";
import Middle from "@/assets/images/second/Frame-36@4x.png";
import Check from "@/assets/images/second/Frame-37@4x.png";
import Power from "@/assets/images/second/Frame-38@4x.png";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    // this.initColumnChart(this.ids, this.chartData);
  },
  data() {
    return {
      theme: [
        {
          name: "现场勘查",
          imgUrl: Scene
        },
        {
          name: "方案答复",
          imgUrl: Response
        },
        {
          name: "中间检查",
          imgUrl: Middle
        },
        {
          name: "竣工验收",
          imgUrl: Check
        },
        {
          name: "装表送电",
          imgUrl: Power
        }
      ]
    };
  },
  computed: {},
  methods: {
    initColumnChart(id, data) {
      //   let myCharts = this.$echarts.init(document.getElementById(id));
      //   myCharts.setOption({});
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      //   this.initColumnChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
.top-indicator {
  position: absolute;
  display: flex;
  top: 160px;
  left: 0;
  width: 100%;
  height: 266px;
  padding: 52px 50px;
  .single-indicator {
    display: flex;
    width: 20%;
    height: 100%;
    padding: 0 40px 0 20px;
    justify-content: center;
    align-items: center;
    .img-left {
      display: inline-block;
      width: 32px;
      height: 100%;
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-right: 0px;
    }
    .img-right {
      display: inline-block;
      width: 32px;
      height: 100%;
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-left: 0px;
      margin-right: 32px;
    }
    .img-span {
      display: inline-block;
      height: 50%;
    }
    .indicator-right {
      display: inline-block;
      height: 100%;
      color: rgba(255, 255, 255, 1);
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 56px;
      line-height: 104px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
}
</style>
