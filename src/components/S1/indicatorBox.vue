<template>
  <div class="indicator-box">
    <div v-for="(item, index) in ids" :key="index" class="single-indicator-box">
      <span class="indicator-title">{{item.name}}</span>
      <div class="indicator-content">
        <span class="content-num">
          {{indData[item.keyV]}}
          <span class="content-unit">个</span>
        </span>
        <span class="hb">环比</span>
        <span class="sz">46.9%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    for (let i in this.ids) {
      this.initData(this.ids[i], this.chartData, i);
    }
  },
  data() {
    return {
      indData: {
        plan: 0,
        actual: 0
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
      } else if (this.currentPro === "直属单位") {
        let curIndex = chartData.x[0].data.indexOf("直属");
        temp = chartData ? chartData.y[index].data[curIndex] : 0;
      } else {
        let curIndex = chartData.x[0].data.indexOf(this.currentPro);
        temp = chartData ? chartData.y[index].data[curIndex] : 0;
      }
      this.indData[id.keyV] = temp;
    }
  },
  components: {},
  watch: {
    currentPro: function() {
      for (let i in this.ids) {
        this.initData(this.ids[i], this.chartData, i);
      }
    },
    chartData: function(newVal) {
      for (let i in this.ids) {
        this.initData(this.ids[i], newVal, i);
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
  }
}
</style>
