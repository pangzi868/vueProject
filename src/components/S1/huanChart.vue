<template>
  <div class="huan-chart" :id="ids"></div>
</template>

<script>
// import ringBg from "../../assets/images/material/circle.png";
export default {
  name: "",
  props: ["ids", "chartData"],
  created() {},
  mounted() {
    let temp = [
      { name: "财务", value: 12.66 },
      { name: "人资", value: 9.23 },
      { name: "营销", value: 17.41 },
      { name: "物资", value: 30.34 },
      { name: "工程", value: 30.34 }
    ];
    this.initChart(this.ids, temp);
    // this.initChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initChart(chartId, chartData) {
      let myChart = this.$echarts.init(document.getElementById(chartId));
      myChart.setOption({
        color: [
          "#5B4CFF",
          "#00F7FF",
          "#1D9DFA",
          "#0048F1",
          "#48B188",
          "#4A5D73"
        ],
        series: [
          {
            color: [
              "#5B4CFF",
              "#00F7FF",
              "#1D9DFA",
              "#0048F1",
              "#48B188",
              "#4A5D73"
            ],
            type: "pie",
            center: ["48%", "50%"],
            radius: ["105", "220"],
            labelLine: {
              normal: {
                length: 15,
                length2: 80,
                lineStyle: {
                  type: "solid",
                  width: 6
                }
              }
            },
            label: {
              normal: {
                alignTo: "edge", // label两端对称布局
                //  ECharts v4.6.0 版本起，提供了 'labelLine' 与 'edge' 两种新的布局方式
                margin: 90, // 布局为两端对称时候需要外边距防止图表变形 数值随意不要太大
                distanceToLabelLine: 0, // label距离引导线距离
                formatter: params => {
                  // console.log(params);
                  return (
                    "{b| " +
                    params.name +
                    "}  " +
                    "\n" +
                    "{c|" +
                    params.percent.toFixed(1) +
                    "%}"
                  );
                },
                borderWidth: 0,
                borderRadius: 4,
                padding: [0, -60],
                height: 160,
                fontSize: 12,
                align: "left",
                color: "#3494BD",
                rich: {
                  b: {
                    fontSize: 44,
                    lineHeight: 44,
                    color: "rgba(255,255,255,.7)",
                    padding: [15, 0, 5, 0]
                  },
                  c: {
                    fontSize: 46,
                    lineHeight: 44,
                    color: "#fff",
                    padding: [15, 0, 25, 0]
                  }
                }
              }
            },
            data: chartData
          },
          {
            type: "pie",

            center: ["48%", "50%"],
            radius: ["235", "239"],
            data: [100],
            color: "rgba(0,187,194,0.5)",
            label: {
              show: false
            }
          },
          {
            type: "pie",
            center: ["48%", "50%"],
            color: "rgba(0,187,194,0.5)",
            radius: ["71", "75"],
            data: [100],
            label: {
              show: false
            }
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
