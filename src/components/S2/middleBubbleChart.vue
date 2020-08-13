<template>
  <div class="middle-pupple-chart" :id="ids"></div>
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
      var tempChartData = [
        { name: "2020.1", value: 16758 },
        { name: "2020.2", value: 15001 },
        { name: "2020.3", value: 28932 },
        { name: "2020.4", value: 36245 },
        { name: "2020.5", value: 31563 },
        { name: "2020.6", value: 36389 },
        { name: "2020.7", value: 38000 }
      ];
      myCharts.setOption({
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "rgba(0,15,78,0.6)",
          borderColor: "#00afff",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#fff",
            fontSize: 36,
            align: "left"
          },
          axisPointer: {
            type: "line", //'line' | 'cross' | 'shadow' | 'none
            lineStyle: {
              width: 1,
              type: "dotted",
              color: "rgba(46,149,230,.9)"
            }
          }
        },
        grid: {
          top: "15%",
          right: "3%",
          bottom: "10%",
          left: "8%"
        },
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: "#fff",
              fontSize: 36
            },
            formatter: "{value}"
          },
          axisLine: {
            lineStyle: {
              color: "rgba(15,45,134,.9)"
            }
          },
          axisTick: {
            show: false //坐标轴小标记
          },
          data: (function(data) {
            var arr = [];
            data.forEach(function(items) {
              arr.push(items.name); //name
            });
            return arr;
          })(tempChartData) //载入横坐标数据
        },
        yAxis: {
          type: "value",
          name: "（次）",
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 40,
            align: "right",
            padding: 25
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 40
            },
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            margin: 10
            //formatter: '{value}'
          },
          splitNumber: 5, //y轴刻度设置(值越大刻度越小)
          axisLine: {
            //y轴线
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)", //横向网格线颜色
              width: 4
            }
          },
          axisTick: {
            show: false //坐标轴小标记
          }
        },
        series: [
          {
            name: "检查",
            type: "scatter",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "bottom",
                textStyle: {
                  color: "#9bc8ff",
                  fontSize: 40
                },
                formatter: "{c}" //图形上显示数字
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(108,146,255,1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(58,236,253,1)'
                    }
                  ],
                  false
                )
              }
            },
            symbol: "circle", //circle, rect, roundRect, triangle,  pin, diamond, arrow
            symbolPosition: "end",
            symbolSize: 30,
            symbolOffset: [0, "-120%"],
            data: (function(data) {
              var arr = [];
              data.forEach(function(items) {
                var itemName = items.name,
                  itemValue = items.value,
                  itemStyle = itemValue / 900; //console.log(itemStyle)
                arr.push({
                  name: itemName,
                  value: itemValue,
                  symbolSize: itemStyle
                });
              });
              return arr;
            })(tempChartData) //载入数据并设置图形尺寸
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




