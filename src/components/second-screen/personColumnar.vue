<template>
  <div class="person-columnar">
    <div :id="ids" class="graph-div"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initChart(ids, chartData) {
      // console.log(ids,chartData)
      var chartType = chartData ? chartData.chartType : "percent";
      var xAxisText = [
        "S03_214",
        "S03_215",
        "S03_216",
        "S03_217",
        "S03_218",
        "S03_219",
        "S03_210"
      ];
      var yAxisValue = [
        5059145.78,
        5034135.78,
        5059235.78,
        5059145.78,
        5059565.78,
        5059875.78,
        5059875.78
      ];
      var myCharts = this.$echarts.init(document.getElementById(ids));
      myCharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          left: "3%",
          // right: "9%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFF",
              fontSize: 14
            },
          },

          interval: 0,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0)" //更改坐标轴颜色
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: chartData ? chartData.xAxis : xAxisText,
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: 18
            }
          },
          axisTick: {
            show: false
          },
          interval: 0,
          axisLine: {
            lineStyle: {
              color: "rgba(64,185,230,1)" //更改坐标轴颜色
            }
          }
        },
        series: [
          {
            name: "用户数",
            type: "bar",
            data: chartData ? chartData.yAxis : yAxisValue,
            barWidth: 22,
            itemStyle: {
              normal: {
                //柱状图颜色
                // color: 'rgba(64,185,230,1)',
                label: {
                  show: true, //显示文本
                  position: "right", //数据值位置
                  textStyle: {
                    color: "#FFF",
                    fontSize: "14"
                  },
                  formatter: function(params) {
                    if (chartType === "percent") {
                      return (params.value).toFixed(1) + "%";
                    } else {
                      return params.value;
                    }
                  }
                },
                color: function(params) {
                  // build a color map as your need.
                  return {
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(21,28,232,1)" // 100% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(0,191,255,1)" // 0% 处的颜色
                      }
                    ]
                  };
                }
              }
            }
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less">
.person-columnar {
  .graph-div {
    height: 100%;
    width: 100%;
  }
}
</style>
