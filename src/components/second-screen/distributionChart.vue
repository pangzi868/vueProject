<template>
  <div class="distribution-chart" :id="ids['id']"></div>
</template>

<script>
export default {
  props: ["chartData", "ids"],
  data() {
    return {};
  },
  mounted() {
    // debugger
    if (!this.chartData.xAxis) return
    this.drawChart(this.ids, this.chartData);
    // this.axios.get('/api/p2/cmpGraph')
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
  },
  methods: {
    drawChart(id, data) {
      //   let indicator = [
      //     { name: "基本信息", max: 10 },
      //     { name: "经营风险", max: 10 },
      //     { name: "纳税信用", max: 10 },
      //     { name: "融资情况", max: 10 },
      //     { name: "盈利能力", max: 10 },
      //     { name: "注册资金", max: 10 }
      //   ];

      let myChart = this.$echarts.init(document.getElementById(id.id));
      if (myChart)
      // 绘制图表
      myChart.setOption({
        title: {
          text: id.title,
          x: "center",
          y: 0,
          textStyle: {
            color: "#FFF",
            fontSize: 32,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC"
            }
          }
        },
        legend: {
          data: ["头数", "客户数量"],
          textStyle: {
            color: "#FFF"
          },
          bottom: "1%"
        },
        grid: {
          x: "11%",
          width: "82%",
          y: "20%"
        },
        xAxis: {
          data: data.xAxis,
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            fontSize: 18
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,0.2)"
              },
              interval: 5
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFF"
              }
            },
            splitNumber: 5,
            axisLabel: {
              fontSize: 18,
              formatter: "{value} "
            }
          },
          {
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,0.2)"
              },
              interval: 5
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFF"
              }
            },
            splitNumber: 5,
            axisLabel: {
              fontSize: 18,
              formatter: "{value} "
            }
          }
        ],

        series: [
          {
            name: "头数",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#956FD4"
                  },
                  {
                    offset: 1,
                    color: "#3EACE5"
                  }
                ])
              }
            },
            data: data.yAxis1
          },
          {
            name: "客户数量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2"
              }
            },
            data: data.yAxis2
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.drawChart(this.ids.id, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.distribution-chart {
  //   padding-left: 15%;
  width: 100%;
  height: 410px;
}
</style>
