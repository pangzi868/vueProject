<template>
  <div class="container" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initChartData();
    this.initColumnChart(this.ids, this.chartData, this.curPro);
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
    curPro: {
      get: function() {
        return this.$store.state.curPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurPro", newVal);
      }
    },

    topIndex: {
      get: function() {
        return this.$store.state.topIndex;
      },
      set: function(val) {
        this.$store.commit("newTopIndex", val);
      }
    }
  },
  methods: {
    // 处理数据
    initChartData() {
      if (!this.chartData || JSON.stringify(this.chartData) == '"{}"') return;
      // this.xAxis = Array.from(new Set(this.chartData.x[1].data));
      this.xAxis = [];
      this.type = [];
      this.chartData.y.forEach((item, index) => {
        if (item.name.indexOf(this.topIndex) !== -1) {
          this.type.push(item.name);
        }
      });
      this.yAxis = {};
      let indexArr = [];

      //   let tempData = data.x;
      //   for (let i = 0, item; (item = tempData[0].data[i++]); ) {
      //     if (item === this.curPro) {
      //       let tempY = [];
      //       //   for (let j = 0, singleItem; (singleItem = tempData[j++]); ) {
      //       //     if (singleItem === "总投资") {
      //       //       tempY.push(parseFloat(singleItem.data[i - 1]).toFixed(2));
      //       //     } else {
      //       //       tempY.push(singleItem.data[i - 1]);
      //       //     }
      //       //   }
      //       //   yAxis.push(tempY);
      //     }
      //   }
      this.chartData.x[0].data.forEach((item, index) => {
        if (item === this.curPro) {
          // this.chartData.x[1].data.forEach((items, indexs) => {
          //   if (indexs === index) {
          if (this.xAxis.indexOf(this.chartData.x[1].data[index]) === -1) {
            this.xAxis.push(this.chartData.x[1].data[index]);
          }
          indexArr.push(index);
          //   }
          // });
        }
      });
      /**
       * xAxis: ['2019', '2020]
       * yAxis1: [15,15]
       * yAxis2: [20,20]
       * yAxis: {'实际数': [15, 15], '计划数': [20, 20]}
       * type: ['实际数', '计划数']
       */
      // if (indexArr.length !== 0) {
      this.chartData.y.forEach((item, index) => {
        indexArr.forEach((items, indexs) => {
          if (this.type.includes(item.name)) {
            if (this.yAxis[item.name] === undefined) {
              this.yAxis[item.name] = [];
            }

            if (item.name.indexOf("大") !== -1) {
              this.yAxis[item.name].push(item.data[items] || "0");
            } else {
              this.yAxis[item.name].push(-parseInt(item.data[items]) || "0");
            }
          }
        });
      });
      // }
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

      let max = 0;
      for (var i in this.yAxis) {
        let temp = Math.max.apply(null, this.yAxis[i]);
        if (temp > max) {
          max = temp;
        }
      }

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
          padding: [12, 24],
          formatter: function(params) {
            let tempStr = params.map((item, index) => {
              return (
                "</br><span style='display:inline-block;margin-right:25px;border-radius:25px;width:40px;height:40px;background-color:" +
                lineColor[index] +
                "'></span>" +
                item.seriesName +
                "：" +
                Math.abs(item.data)
              );
            });
            return params[0].name + tempStr.join(" ");
          }
        },
        grid: {
          left: "4%",
          top: "5%",
          bottom: "10%",
          right: "0%"
        },
        // legend: {
        //   //图例组件，颜色和名字
        //   right: "3%",
        //   top: "3%",
        //   itemGap: 64,
        //   itemWidth: 64,
        //   itemHeight: 12,
        //   data: this.type
        //     ? this.type.map((item, index) => {
        //         if (item === "整改状态") {
        //           return {
        //             name: "整改数",
        //             icon: "rect"
        //           };
        //         } else {
        //           return {
        //             name: item,
        //             icon: "rect"
        //           };
        //         }
        //       })
        //     : [
        //         {
        //           name: "计划数",
        //           icon: "rect"
        //         },
        //         {
        //           name: "实际数",
        //           icon: "rect"
        //         }
        //       ],
        //   textStyle: {
        //     color: "#a8aab0",
        //     fontStyle: "normal",
        //     fontFamily: "微软雅黑",
        //     fontSize: 56
        //   }
        // },
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
            min: -max,
            max: max,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              },

              formatter: function(params) {
                return Math.abs(params);
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
                type: "dashed",
                color: "rgba(255,255,255,1)",
                width: 4,
                opacity: 0.2
              }
            }
          }
        ],
        series: []
      };
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
            show: false,
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
      // myCharts.setOption(Option, { notMerge: true });
      myCharts.clear();
      myCharts.setOption(Option);
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, newVal, this.curPro);
    },
    curPro: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, this.chartData, newVal);
    },
    topIndex: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, this.chartData, this.curPro);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  left: 0%;
  top: 400px;
  width: 100%;
  height: 800px;
  padding: 0px 100px;
}
</style>
