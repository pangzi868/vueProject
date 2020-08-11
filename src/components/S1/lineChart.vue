<template>
  <div class="container" :id="ids"></div>
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
      type: null,
      yAxis: null
      /**
       * xAxis: ['2019', '2020]
       * yAxis1: [15,15]
       * yAxis2: [20,20]
       * yAxis: {'实际数': [15, 15], '计划数': [20, 20]}
       * type: ['实际数', '计划数']
       */
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
      // this.xAxis = Array.from(new Set(this.chartData.x[1].data));
      this.xAxis = [];
      this.type = this.chartData.y.map((item, index) => {
        return item.name;
      });
      this.yAxis = {};
      let indexArr = [];
      this.chartData.x[0].data.forEach((item, index) => {
        if (
          item === this.currentPro ||
          (this.currentPro === "全省" && item === "合计")
        ) {
          this.chartData.x[1].data.forEach((items, indexs) => {
            if (indexs === index) {
              if (this.xAxis.indexOf(this.chartData.x[1].data[indexs]) === -1) {
                this.xAxis.push(this.chartData.x[1].data[indexs]);
              }
              indexArr.push(indexs);
            }
          });
        } else {
          indexArr = [];
        }
      });
      // console.log(this.xAxis, "a");
      if (indexArr.length !== 0) {
        this.chartData.y.forEach((item, index) => {
          indexArr.forEach((items, indexs) => {
            if (this.yAxis[item.name] === undefined) {
              this.yAxis[item.name] = [];
            }
            this.yAxis[item.name].push(item.data[items] || "0");
          });
        });
      }
    },

    initColumnChart(id, data, cp) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      let lineColor = [
        "rgba(0,129,248,1)",
        "rgba(0,247,255,1)",
        "rgba(255,136,0,1)"
      ];
      let shadowColor = [
        ["rgba(0,129,248,0.3)", "rgba(0,129,248,0)", "rgba(108,80,243, 0.9)"],
        ["rgba(0,247,255,0.3)", "rgba(0,247,255,0)", "rgba(108,80,243, 0.9)"],
        ["rgba(255,136,0,0.3)", "rgba(255,136,0,0)", "rgba(108,80,243, 0.9)"]
      ];

      let myCharts = this.$echarts.init(document.getElementById(id));
      let Option = {
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
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
          itemWidth: 64,
          itemHeight: 12,
          data: this.type
            ? this.type.map((item, index) => {
                if (item === "整改状态") {
                  return {
                    name: "整改数",
                    icon: "rect"
                  };
                } else {
                  return {
                    name: item,
                    icon: "rect"
                  };
                }
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
            data: this.xAxis && this.xAxis.length > 0 ? this.xAxis : ["2020"],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
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
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
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
        series: []
      };
      // [
      //   ,
      //   {
      //     name: "实际数",
      //     type: "line",
      //     showAllSymbol: true,
      //     symbol: "circle",
      //     symbolSize: 25,
      //     lineStyle: {
      //       normal: {
      //         width: 10,
      //         color: "rgba(0,247,255,1)"
      //       }
      //     },
      //     label: {
      //       show: true,
      //       position: "top",
      //       textStyle: {
      //         color: "#6c50f3"
      //       }
      //     },
      //     itemStyle: {
      //       color: "rgba(0,247,255,1)",
      //       borderColor: "#fff",
      //       borderWidth: 3
      //     },
      //     tooltip: {
      //       show: true
      //     },
      //     areaStyle: {
      //       normal: {
      //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           {
      //             offset: 0,
      //             color: "rgba(0,247,255,0.3)"
      //           },
      //           {
      //             offset: 1,
      //             color: "rgba(0,247,255,0)"
      //           }
      //         ]),
      //         shadowColor: "rgba(108,80,243, 0.9)",
      //         shadowBlur: 20
      //       }
      //     },
      //     data: this.yAxis2
      //       ? this.yAxis2
      //       : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60]
      //   }
      // ];
      if (Object.keys(this.yAxis).length === 0) {
        Option.series = [];
      }
      Option.series = Object.keys(this.yAxis).map((item, index) => {
        return {
          name: this.type
            ? this.type[index] === "整改状态"
              ? "整改数"
              : this.type[index]
            : "计划数",
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 25,
          lineStyle: {
            normal: {
              width: 10,
              color: lineColor[index]
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
            color: lineColor[index],
            borderColor: "#fff",
            borderWidth: 3
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
                    color: shadowColor[index][0]
                  },
                  {
                    offset: 1,
                    color: shadowColor[index][1]
                  }
                ],
                false
              ),
              shadowColor: shadowColor[index][2],
              shadowBlur: 20
            }
          },
          data: this.yAxis[item] ? this.yAxis[item] : [0, 0, 0]
        };
      });

      myCharts.setOption(Option, {notMerge: true});
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
