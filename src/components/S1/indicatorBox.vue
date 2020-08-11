<template>
  <div class="indicator-box">
    <div v-for="(item, index) in ids" :key="index" class="single-indicator-box">
      <span class="indicator-title">{{item.name}}</span>
      <div class="indicator-content">
        <span class="content-num">
          {{indData[item.keyV]}}
          <span class="content-unit">个</span>
        </span>
        <span class="hb">同比</span>
        <span class="sz">{{indicatorYear[item.keyV]}}</span>
        <img class="hb-img" :src="imgYear[item.keyV]" alt />
      </div>
    </div>
  </div>
</template>

<script>
import UPImg from "@/assets/images/first/Frame-26@4x.png";
import DOWNImg from "@/assets/images/first/Frame-25@4x.png";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    for (let i in this.ids) {
      this.initData(this.ids[i], this.chartData, i);
      this.initIndicator(this.ids[i], this.leftIndicator, i);
    }
  },
  data() {
    return {
      indData: {
        plan: 0,
        actual: 0
      },
      indicatorYear: {
        plan: 0,
        actual: 0
      },
      imgYear: {
        plan: null,
        actual: null
      }
    };
  },
  computed: {
    // 切换部门
    currentPro: {
      get: function() {
        return this.$store.state.currentPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurrentPro", newVal);
      }
    },
    leftIndicator: {
      get: function() {
        return this.$store.state.leftIndicator;
      },
      set: function(newVal) {
        this.$store.commit("newLeftIndicator", newVal);
      }
    }
  },
  methods: {
    initData(id, chartData, index) {
      let temp = 0;
      if (this.currentPro === "全省") {
        temp = chartData
          ? chartData.y[index].data.reduce((pre, cur) => {
              return Number(pre) + Number(cur);
            })
          : 0;
        // } else if (this.currentPro === "直属单位") {
        //   let curIndex = chartData.x[0].data.indexOf("直属");
        //   temp = chartData ? chartData.y[index].data[curIndex] : 0;
      } else {
        let curIndex = chartData.x[0].data.indexOf(this.currentPro);
        temp = chartData ? chartData.y[index].data[curIndex] : 0;
      }
      this.indData[id.keyV] = temp;
    },

    // 初始化指标
    initIndicator(id, data, index) {
      if (!data.x) return;
      let tempIncrement = 0,
        tempReduce = 0,
        tempPro = this.currentPro;
      if (this.currentPro === "全省") {
        tempPro = "合计";
      }
      let tempIndex = data.x[0].data.indexOf(tempPro);
      tempIncrement = data.y[0].data[tempIndex];
      tempReduce = data.y[1].data[tempIndex];
      this.indicatorYear["plan"] =
        (parseFloat(tempIncrement) * 100).toFixed(1) + "%";
      this.indicatorYear["actual"] =
        (parseFloat(tempReduce) * 100).toFixed(1) + "%";
      this.imgYear["plan"] = tempIncrement > 0 ? UPImg : DOWNImg;
      this.imgYear["actual"] = tempReduce > 0 ? UPImg : DOWNImg;
    }
  },
  components: {},
  watch: {
    currentPro: function() {
      for (let i in this.ids) {
        this.initData(this.ids[i], this.chartData, i);
        this.initIndicator(this.ids[i], this.leftIndicator, i);
      }
    },
    chartData: function(newVal) {
      for (let i in this.ids) {
        this.initData(this.ids[i], newVal, i);
        this.initIndicator(this.ids[i], this.leftIndicator, i);
      }
    },
    leftIndicator: function(newVal) {
      for (let i in this.ids) {
        this.initData(this.ids[i], this.chartData, i);
        this.initIndicator(this.ids[i], newVal, i);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.single-indicator-box {
  width: 840px;
  height: 316px;
  background: url("../../assets/images/first/bg-indicator.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 48px;
  padding: 0 40px;
  .indicator-title {
    display: block;
    height: 120px;
    line-height: 120px;
    opacity: 0.699999988079071;
    color: rgba(255, 255, 255, 1);
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 56px;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 40px;
  }
  .indicator-content {
    height: 190px;
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 56px;
    text-align: left;

    .content-num,
    .content-rate {
      display: inline-block;
    }
    .content-num {
      color: rgba(255, 179, 88, 1);
      font-size: 128px;
      padding-left: 40px;
      font-family: Google Sans;
      .content-unit {
        font-size: 56px;
      }
    }
    .hb {
      position: absolute;
      right: 100px;
      width: 160px;
      top: 30px;
      font-size: 56px;
    }
    .sz {
      position: absolute;
      right: 100px;
      width: 160px;
      top: 90px;
      font-size: 56px;
    }
    .hb-img {
      position: absolute;
      right: -2px;
      top: 98px;
      font-size: 56px;
    }
  }
}
</style>
