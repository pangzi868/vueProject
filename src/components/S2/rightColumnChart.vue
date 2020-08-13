<template>
  <div class="right-column-chart" :id="ids"></div>
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
            data: ["10月", "11月", "12月"],
            inverse: true
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: [555, 444, 333],
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
            data: [555, 444, 333],
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
                      color: "#49bdff" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#54ffd5" // 100% 处的颜色
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
            data: [1000, 1000, 1000],
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
