<template>
  <div class="right-bar-chart" :id="ids"></div>
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
          data: ["2018年", "2019年", "2020年"],
          textStyle: {
            color: "RGB(193,223,255)",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            data: ["三角函数", "数列", "平面向量", "不等式", "立体几何"],
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
                color: "white",
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
            name: "2018年",
            type: "bar",
            //silent: true,
            barWidth: "12",
            //barGap: '-100%', // Make series be overlap
            data: [
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
            name: "2019年",
            type: "bar",
            //silent: true,
            barWidth: "12",
            //barGap: '-100%', // Make series be overlap
            data: [
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
            name: "2020年",
            type: "bar",
            //silent: true,
            barWidth: "12",
            //barGap: '-100%', // Make series be overlap
            data: [
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
      this.initColumnChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
