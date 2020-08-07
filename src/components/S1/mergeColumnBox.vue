<template>
  <div class="merge-column-box" :id="ids"></div>
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
          padding: [12, 24],
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
          itemWidth: 44,
          itemHeight: 44,
          data: [
            {
              name: "整改数"
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: "未整改数"
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
            data: [
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
                color: 'rgba(255,255,255,1)',
                opacity: 0.2
              }
            }
          }
        ],
        series: [
          {
            name: "整改数",
            stack: "总量",
            type: "bar",
            data: [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60],
            barWidth: 48,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: "rgba(9,117,217,1)",
                // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "rgba(21,255,255,1)"
                //   },
                //   {
                //     offset: 1,
                //     color: "rgba(0,79,255,1)"
                //   }
                // ]),
                barBorderRadius: 0,
                borderWidth: 0
              }
            }
          },
          {
            name: "未整改数",
            stack: "总量",
            type: "bar",
            data: [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            barWidth: 48,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: "rgba(120,231,255,1)",
                // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "rgba(21,177,255,1)"
                //   },
                //   {
                //     offset: 1,
                //     color: "rgba(43,40,219,1)"
                //   }
                // ]),
                barBorderRadius: 0,
                borderWidth: 0
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
      this.initColumnChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
