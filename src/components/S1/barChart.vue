<template>
  <div class="bar-box" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initBarChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initBarChart(id, data) {
      let myCharts = this.$echarts.init(document.getElementById(id));
      var myColor = [
        "rgba(255,179,88,1)",
        "rgba(30,147,255,1)",
        "rgba(0,194,255,1)",
        "rgba(49,102,237,1)",
        "rgba(0,247,255,1)"
      ];
      var dataLine = [88, 66, 33, 25, 12];
      let positionLeft = 0.4,
        max = 100 + 2 * positionLeft;
      myCharts.setOption({
        grid: [
          {
            left: "5%",
            top: "2%",
            right: "12%",
            bottom: "2%",
            containLabel: true
          },
          {
            left: "5%",
            top: "2%",
            right: "12%",
            bottom: "2%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            max: max,
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "27",
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: 56
              }
            },
            data: [
              "财务资产",
              "工程项目",
              "合同管理",
              "物资招投标管理",
              "人资管理"
            ]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: 56
              }
            },
            data: [1, 1, 1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            //间距
            type: "bar",
            barWidth: 45,
            stack: "b",
            legendHoverLink: false,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)"
              }
            },

            data: [
              positionLeft,
              positionLeft,
              positionLeft,
              positionLeft,
              positionLeft
            ]
          },
          {
            name: "条",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            barWidth: 40,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9, 99.9, 99.9],
            barWidth: 51,
            itemStyle: {
              normal: {
                color: "#082c3a",
                barBorderRadius: 2
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            barWidth: 53,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 40,
                formatter: function(data) {
                  return dataLine[data.dataIndex] + "%";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: 56
                }
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: 0
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
      this.initBarChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
