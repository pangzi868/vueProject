<template>
  <div class="credit-chart" id="creditChart"></div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {};
  },
  mounted() {
    this.drawChart(this.chartData);
    // this.axios.get('/api/p2/cmpGraph')
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
  },
  methods: {
    drawChart(data) {
      let indicator = [
        { name: "基本信息", max: 10 },
        { name: "经营风险", max: 10 },
        { name: "纳税信用", max: 10 },
        { name: "融资情况", max: 10 },
        { name: "盈利能力", max: 10 },
        { name: "注册资金", max: 10 }
      ];

      let myChart = this.$echarts.init(document.getElementById("creditChart"));
      // 绘制图表
      myChart.setOption({
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#22ABF5" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0F72E7" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#76F9FF" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#41F1FD" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#FAD961" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#F9A842" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {},
        legend: {
          data: data ? [data[0].name] : ["指标1", "指标2", "指标3"],
          icon: "circle",
          orient: "vertical",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          right: 200,
          bottom: 150,
          textStyle: {
            color: "rgba(255,255,255,0.72)"
          }
        },
        radar: {
          center: ["40%", "50%"],
          name: {
            textStyle: {
              color: "rgba(255,255,255,0.72)",
              backgroundColor: "transparent",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: indicator,
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "rgba(81,164,228,0.5"
            }
          },
          splitLine: {
            lineStyle: {
              color: ["rgba(81,164,228,0.5"]
            }
          },
          splitArea: {
            areaStyle: {
              color: ["transparent"]
            }
          }
        },
        series: [
          {
            type: "radar",
            areaStyle: {},
            data: data || [
              {
                value: [50, 60, 65, 70, 55, 60, 70],
                name: "指标1"
              },
              {
                value: [30, 33, 56, 44, 30, 22, 50],
                name: "指标2"
              },
              {
                value: [10, 20, 30, 40, 80, 60, 80],
                name: "指标3"
              }
            ]
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.drawChart(newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.credit-chart {
  padding-left: 15%;
  width: 100%;
  height: 360px;
}
</style>
