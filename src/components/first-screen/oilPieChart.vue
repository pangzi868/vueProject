<template>
  <div class="oil-pie-div">
    <div class="oil-pie-chart" v-for="(item) in ids" :key="item" :id="item"></div>
  </div>
</template>

<script>
export default {
  props: ["chartData", "ids"],
  data() {
    return {};
  },
  mounted() {
    for (let i in this.ids) {
      this.drawDialPlate(this.ids[i], this.chartData[this.ids[i]]);
    }
    // this.axios.get('/api/p2/cmpGraph')
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
  },
  methods: {
    // 画表盘图
    drawDialPlate(id, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "",
            type: "gauge",
            startAngle: 220,
            endAngle: -40,
            min: 0,
            max: 150,
            detail: { formatter: "{value}" },
            data: [{ value: data, name: "" }],
            axisLine: {
              lineStyle: {
                color: [
                  [0.2, "#33FFFF"],
                  [0.8, "#0066FF"],
                  [1, "#FF77FF"]
                ],
                width: 10
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "50%"],
              color: "#FFF",
              formatter: function(params) {
                return id === "oilCharts01" ? params : params + "%";
              },
              textStyle: {
                fontSize: 24
              }
            }
          },
          {
            startAngle: 220,
            endAngle: -40,
            type: "gauge",
            radius: "63%",
            min: 0,
            max: 150,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [[1, "#3E789F"]],
                width: 2
              }
            },
            axisTick: {
              show: true,
              length: 3,
              lineStyle: {
                color: "#3E789F"
              }
            },
            detail: {
              show: false
            },
            splitLine: {
              show: true,
              length: 8,
              lineStyle: {
                color: "#3E789F"
              }
            },
            axisLabel: {
              show: true,
              color: "#FFF",
              fontSize: 12
            }
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      for (let i in this.ids) {
        this.drawDialPlate(this.ids[i], newVal[this.ids[i]]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.oil-pie-div {
  display: flex;
}
.oil-pie-chart {
  //   padding-left: 15%;
  width: 50%;
  height: 375px;
}
</style>
