<template>
  <div class="left-indicator" :id="ids">
    <div v-for="item in indicator" :key="item.name" class="single-in">
      <div class="name">{{item.name}}</div>
      <div class="value">{{item.value || 0}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData, this.curPro);
  },
  data() {
    return {
      indicator: [
        { name: "销户总户数", value: "" },
        { name: "预收总余额", value: "" }
      ]
    };
  },
  computed: {
    // 切换部门
    curPro: {
      get: function() {
        return this.$store.state.curPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurPro", newVal);
      }
    }
  },
  methods: {
    initColumnChart(id, data) {
      if (!data) return;
      for (var index in data.x[0].data) {
        if (this.curPro === data.x[0].data[index]) {
          let temp = [...this.indicator];
          temp[0].value = data.y[0].data[index];
          temp[1].value =
            (Number(data.y[1].data[index]) / 10000).toFixed(2) + "万";
          this.indicator = [...temp];
        }
      }
      // let myCharts = this.$echarts.init(document.getElementById(id));
      // myCharts.setOption({});
    }
  },
  components: {},
  watch: {
    // chartData: function(newVal) {
    //   this.initColumnChart(this.ids, this.chartData);
    // }
    curPro: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.left-indicator {
  background: url("../../assets/images/second/Frame-747@4x.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 56px;
  top: 200px;
  width: 840px;
  height: 526px;
  .single-in {
    height: 50%;
    padding: 36px 72px;
    .name {
      color: rgba(255, 255, 255, 1);
      font-family: Microsoft YaHei;
      font-weight: regular;
      font-size: 56px;
      line-height: 70px;
      letter-spacing: 0px;
      text-align: left;
    }
    .value {
      color: rgba(0, 247, 255, 1);
      font-family: Google Sans;
      font-weight: bold;
      font-size: 112px;
      line-height: 140px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
}
</style>
