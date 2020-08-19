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

      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        color: ["RGB(1,255,152)", "RGB(244,191,70)", "pink"],
        animation: false,
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
