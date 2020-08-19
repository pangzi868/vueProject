<template>
  <div class="right-bar-chart" :id="ids"></div>
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
      if (!data || JSON.stringify(data) == '"{}"') return;
      console.info(data, "s");
      let xAxis1 = [],
        xAxis2 = [],
        yAxis1 = [],
        yAxis2 = [],
        yAxis3 = [];

      xAxis1 = Array.from(new Set(data.x[0].data));
      xAxis2 = Array.from(new Set(data.x[1].data));
      xAxis1.forEach((item, index) => {
        yAxis1.push(0);
        yAxis2.push(0);
        yAxis3.push(0);
      });

      data.y[0].data.forEach((item, index) => {
        let tempPro = data.x[0].data[index],
          tempMonth = data.x[1].data[index],
          tempProIndex = xAxis1.indexOf(tempPro),
          tempMonthIndex = xAxis2.indexOf(tempMonth);

        switch (tempMonthIndex) {
          case 0:
            yAxis1[tempProIndex] = item;
            break;
          case 1:
            yAxis2[tempProIndex] = item;
            break;
          case 2:
            yAxis3[tempProIndex] = item;
            break;
          default:
            break;
        }
      });
      let colorArr = [
        "rgba(21,177,255,1)",
        "rgba(21,255,255,1)",
        "rgba(255,188,87,1)"
      ];

      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        color: ["RGB(1,255,152)", "RGB(244,191,70)", "pink"],
        animation: false,
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
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          },
          formatter: function(params) {
            let tempStr = params.map((item, index) => {
              return (
                "</br><span style='display:inline-block;margin-right:25px;border-radius:25px;width:40px;height:40px;background-color:" +
                colorArr[index] +
                "'></span>" +
                item.seriesName +
                "：" +
                (item.value
                  ? item.seriesName.indexOf("数") !== -1 ||
                    item.value.indexOf(".") === -1
                    ? item.value
                    : parseFloat(item.value).toFixed(2)
                  : "0")
              );
            });
            return params[0].name + tempStr.join(" ");
          }
        },
        grid: {
          top: "18%",
          left: "3%",
          bottom: "5%",
          right: "5%",
          containLabel: true
        },
        legend: {
          show: true,
          top: 15,
          right: 26,
          itemGap: 64,
          itemWidth: 40,
          itemHeight: 40,
          data: xAxis2 || ["2018年", "2019年", "2020年"],
          textStyle: {
            color: "RGB(193,223,255)",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            data: xAxis1 || [
              "三角函数",
              "数列",
              "平面向量",
              "不等式",
              "立体几何"
            ],
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "#fff"
            },
            axisLine: {
              lineStyle: {
                color: "RGB(47,68,114)"
              }
            },
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: 56
              },
              fontSize: 56,
              margin: 20
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 56
              },
              fontSize: 56,
              formatter: "{value}"
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "RGB(47,68,114)"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "RGB(47,68,114)"
              }
            }
          }
        ],
        series: [
          {
            name: xAxis2 ? xAxis2[0] : "2018年",
            type: "bar",
            //silent: true,
            barWidth: "24",
            //barGap: '-100%', // Make series be overlap
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
                      color: "rgba(21,177,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(43,40,219,1)" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            data: yAxis1 || [
              {
                value: 3
              },
              {
                value: 6
              },
              {
                value: 10
              },
              {
                value: 6
              },
              {
                value: 1
              },
              {
                value: 6
              }
            ]
          },
          {
            name: xAxis2 ? xAxis2[1] : "2019年",
            type: "bar",
            //silent: true,
            barWidth: "24",
            //barGap: '-100%', // Make series be overlap
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
                      color: "rgba(21,255,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(21,255,255,1)" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            data: yAxis2 || [
              {
                value: 8
              },
              {
                value: 4
              },
              {
                value: 8
              },
              {
                value: 4
              },
              {
                value: 8
              },
              {
                value: 4
              }
            ]
          },
          {
            name: xAxis2 ? xAxis2[2] : "2020年",
            type: "bar",
            //silent: true,
            barWidth: "24",
            //barGap: '-100%', // Make series be overlap
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
                      color: "rgba(255,188,87,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(111,92,0,1)" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            data: yAxis3 || [
              {
                value: 5
              },
              {
                value: 2
              },
              {
                value: 2
              },
              {
                value: 1
              },
              {
                value: 6
              },
              {
                value: 3
              }
            ]
          }
        ]
      });
      myCharts.on("click", params => {
        console.log(params, "p");
        let data = this.$store.state.screenSecondData.right4Aux;
        let align = [];
        let xAxis = data.x.map(item => {
          align.push("center");
          return item.name;
        });
        let yAxis = [];
        data.x[0].data.forEach((item, index) => {
          if (item === params.name) {
            let tempY = [];
            data.x.forEach(items => {
              tempY.push(items.data[index]);
            });
            yAxis.push(tempY);
          }
        });

        this.modalData = {
          right4Modal: {
            type: "type1",
            visible: true,
            keys: "right4Modal",
            zIndex: 21,
            data: {
              xAxis: xAxis,
              yAxis: yAxis,
              align: align
            }
          }
        };
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
