<template>
  <div class="little-line-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initChartData();
    this.initColumnChart(this.ids, this.chartData, this.currentPro);
  },
  data() {
    return {
      dataIndex: 0,
      xAxis: null,
      yAxis1: null,
      yAxis2: null,
      type: null
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
    // 处理数据
    initChartData() {
      if (!this.chartData || JSON.stringify(this.chartData) == '"{}"') return;
      // this.type = Array.from(new Set(this.chartData.x[1].data));
      this.type = ["人资", "工程", "物资", "营销", "财务"];
      // this.xAxis = this.chartData.y.map((item, index) => {
      //   return item.name;
      // });
      this.yAxis1 = [0, 0, 0, 0, 0];
      this.yAxis2 = [0, 0, 0, 0, 0];
      this.chartData.x[0].data.forEach((item, index) => {
        if (item === this.currentPro) {
          this.chartData.x[1].data.forEach((items, indexs) => {
            if (index === indexs) {
              let num = this.type.indexOf(items);
              this.yAxis1[num] = this.chartData.y[1].data[indexs] || 0;
              this.yAxis2[num] = this.chartData.y[2].data[indexs] || 0;
            }
          });
        }
      });
    },
    initColumnChart(id, data, cp) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          },
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "1%",
          top: "20%",
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: {
          //图例组件，颜色和名字
          right: "3%",
          top: "3%",
          itemGap: 64,
          itemWidth: 34,
          itemHeight: 34,
          data: this.type
            ? this.type.map((item, index) => {
                return {
                  name: item,
                  icon: "rect"
                };
              })
            : [
                {
                  name: "计划数",
                  icon: "rect"
                },
                {
                  name: "实际数",
                  icon: "rect"
                }
              ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: this.type
              ? this.type
              : [
                  "22:18",
                  "22:23",
                  "22:25",
                  "22:28",
                  "22:30",
                  "22:33",
                  "22:35",
                  "22:40",
                  "22:18",
                  "22:23",
                  "22:25"
                ],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.4)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 44
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.4)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 44
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,1)",
                opacity: 0.2
              }
            }
          }
        ],
        series: [
          {
            name: "整改数",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                width: 10,
                color: "rgba(0,232,246,1)"
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#6c50f3"
              }
            },
            itemStyle: {
              color: "rgba(0,232,246,1)"
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,247,255,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,247,255,0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(108,80,243, 0.9)",
                shadowBlur: 20
              }
            },
            data: this.yAxis1
              ? this.yAxis1
              : [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60]
          },
          {
            name: "实际数",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                width: 10,
                color: "rgba(255,179,88,1)"
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#6c50f3"
              }
            },
            itemStyle: {
              color: "rgba(255,179,88,1)"
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255,179,88,0.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255,179,88,0)"
                  }
                ]),
                shadowColor: "rgba(108,80,243, 0.9)",
                shadowBlur: 20
              }
            },
            data: this.yAxis2
              ? this.yAxis2
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60]
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, newVal, this.currentPro);
    },
    currentPro: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
