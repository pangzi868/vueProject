<template>
  <div class="right-column-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData, this.curPro);
  },
  data() {
    return {};
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
    modalData: {
      get: function() {
        return this.$store.state.modalData;
      },
      set: function(newValue) {
        this.$store.commit("newModalData", newValue);
      }
    }
  },
  methods: {
    initColumnChart(id, data, cp) {
      // console.info(data, "data");
      if (!data || JSON.stringify(data) == '"{}"') return;
      let xAxis = [],
        yAxis = [],
        colorList = [
          "rgba(255,179,88,1)",
          "rgba(0,247,255,1)",
          "rgba(30,147,255,1)",
          "rgba(255,179,88,1)",
          "rgba(0,247,255,1)",
          "rgba(30,147,255,1)"
        ];
      let tempIndex = 0;
      data.x[0].data.forEach((item, index) => {
        if (item === cp) {
          xAxis.push(data.x[1].data[index]);
          yAxis.push({
            value: data.y[0].data[index],
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: colorList[tempIndex] || "rgba(255,179,88,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: colorList[tempIndex] || "rgba(255,179,88,1)" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            }
          });
          tempIndex++;
        }
      });
      let max = Math.max.apply(null, yAxis);
      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        grid: {
          left: "15%",
          top: "5%",
          right: "0",
          bottom: "5%"
        },
        xAxis: [
          {
            //左侧柱状图的X轴
            gridIndex: 0, //x 轴所在的 grid 的索引
            show: false
          },
          {
            //右侧柱状图的X轴
            gridIndex: 1, //x 轴所在的 grid 的索引
            show: false
          }
        ],
        yAxis: [
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              verticalAlign: "bottom",
              align: "left",
              padding: [0, 0, 35, 15],
              textStyle: {
                color: "rgba(255,255,255,0.6)",
                fontSize: "64"
              }
            },
            data: xAxis || ["10月", "11月", "12月"],
            inverse: true
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: yAxis || [555, 444, 333],
            inverse: true,
            axisLabel: {
              show: true,
              verticalAlign: "bottom",
              align: "right",
              padding: [0, 20, 35, 0],
              textStyle: {
                color: "#fff",
                fontSize: "64"
              },
              formatter: function(value) {
                return "{x|" + value + "}";
              },
              rich: {
                x: {
                  color: "rgba(255,255,255,1)",
                  fontSize: 64
                }
              }
            }
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: []
          }
        ],
        series: [
          {
            name: "值",
            type: "bar",
            xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: yAxis || [555, 444, 333],
            barWidth: 25,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(255,179,88,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,179,88,1)" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: 10
              }
            },
            z: 2
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            yAxisIndex: 2, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            barGap: "-100%",
            data: yAxis
              ? yAxis.map(item => {
                  return max;
                })
              : [1000, 1000, 1000],
            barWidth: 25,
            itemStyle: {
              normal: {
                color: "#2d5271",
                barBorderRadius: 10
              }
            },
            z: 0
          }
        ]
      });
      myCharts.on("click", params => {
        let temp = params.name;
        let data = this.$store.state.screenSecondData.right3Aux;
        let align = [];
        let xAxis = data.x.map(item => {
          align.push("center");
          return item.name;
        });
        let yAxis = [];
        let tempData = data.x;
        for (let i = 0, item; (item = tempData[0].data[i++]); ) {
          if (item === this.curPro) {
            // for (let j = 0, items; (items = tempData[1].data[j++]); ) {
            if (tempData[1].data[i - 1] === temp) {
              let tempY = [];
              for (let j = 0, singleItem; (singleItem = tempData[j++]); ) {
                tempY.push(singleItem.data[i - 1]);
              }
              yAxis.push(tempY);
            }
            // if (items === temp) {
            //   let tempY = [];
            //   for (let j = 0, singleItem; (singleItem = tempData[j++]); ) {
            //     tempY.push(singleItem.data[i - 1]);
            //   }
            //   yAxis.push(tempY);
            // }
            // }
          }
        }

        // data.x[0].data.forEach((item, index) => {
        //   if (item === this.curPro) {
        //     data.x[1].data.forEach((items, indexs) => {
        //       if (items === temp) {
        //         let tempY = [];
        //         data.x.forEach(singleItem => {
        //           tempY.push(singleItem.data[indexs]);
        //         });
        //         yAxis1.push(tempY);
        //       }
        //     });
        //   }
        // });
        setTimeout(() => {
          this.modalData = {
            right2Modal: {
              type: "type1",
              visible: true,
              keys: "right2Modal",
              zIndex: 21,
              data: {
                xAxis: xAxis,
                yAxis: yAxis,
                align: align
              }
            }
          };
        }, 300);
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal, this.curPro);
    },
    curPro: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
