<template>
  <div class="sand-clock-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initColumnChart(id, data) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      let temp = data.y,
        topVal = [],
        bottomVal = [];
      let myCharts = this.$echarts.init(document.getElementById(id));
      var os_age = [
        "供电答复方案",
        "设计审查",
        "中间检查",
        "竣工验收",
        "装表送电"
      ];
      for (var i = 0; i < temp.length; i++) {
        if ((i + 2) % 2 === 0) {
          topVal.push(parseFloat(temp[i].data[0]) / 1440);
        } else {
          bottomVal.push(-parseFloat(temp[i].data[0]) / 1440);
        }
      }
      var os_agevalue = [15, 12, 3, 18, 4];
      var os_agevalue1 = [0, -2, -7, -12, -4];
      myCharts.setOption({
        grid: {
          left: "7%",
          top: "5%",
          bottom: "10%",
          right: "0%"
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
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
          // formatter: "{b}<br />{a}: {c}"
          formatter: function(params) {
            return (
              params.name +
              "<br />" +
              params.seriesName +
              "：" +
              Math.abs(params.value)
            );
          }
        },
        xAxis: {
          data: os_age,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(45, 140, 240, 0.1)",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 56
            }
          }
        },
        yAxis: [
          {
            splitNumber: 4,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "rgba(45, 140, 240, 0.1)",
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: 56
              },
              formatter: function(params) {
                return Math.abs(params);
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(255,255,255,.5)"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.4)",
                width: 4,
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "天数",
            type: "pictorialBar",
            barCategoryGap: "0%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            label: {
              show: true,
              position: "top",
              distance: 15,
              color: "#2D8CF0",
              fontWeight: "bolder",
              fontSize: 56,
              formatter: function(params) {
                return params.value.toFixed(0);
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  //45, 140, 240  #2D8CF0   OTAS蓝
                  //232, 94, 106  #DB5E6A   暗红
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(65,200,253,1)" //  100%  处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(118,230,255,0)" //  0%  处的颜色
                    }
                  ],
                  global: false //  缺省为  false
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: topVal || os_agevalue,
            z: 10
          },
          {
            name: "天数",
            type: "pictorialBar",
            barCategoryGap: "0%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            label: {
              show: true,
              position: "bottom",
              distance: 15,
              color: "#2D8CF0",
              fontWeight: "bolder",
              fontSize: 56,
              formatter: function(params) {
                return Math.abs(params.value).toFixed(3);
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  //45, 140, 240  #2D8CF0   OTAS蓝
                  //232, 94, 106  #DB5E6A   暗红
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(234,229,152,1)" //  100%  处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(244,204,72,0)" //  0%  处的颜色
                    }
                  ],
                  global: false //  缺省为  false
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: bottomVal || os_agevalue1,
            z: 10
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.sand-clock-chart {
  position: absolute;
  left: 0%;
  top: 400px;
  width: 100%;
  height: 800px;
  padding: 0px 100px;
}
</style>
