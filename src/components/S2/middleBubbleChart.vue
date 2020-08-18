<template>
  <div class="middle-pupple-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initChartData();
    this.initColumnChart(this.ids, this.chartData, this.curPro);
  },
  data() {
    return {
      bubbleData: []
    };
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
    // 处理数据
    initChartData() {
      if (!this.chartData || JSON.stringify(this.chartData) == '"{}"') return;
      this.bubbleData = [];
      this.bubbleData = this.chartData.x[0].data.map((item, index) => {
        return {
          name: item,
          value: this.chartData.y[0].data[index]
        };
      });
    },
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
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
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
          formatter: function(params) {
            let tempStr = params.map((item, index) => {
              return (
                "</br><span style='display:inline-block;margin-right:25px;border-radius:25px;width:40px;height:40px;background-color:rgba(108,146,255,1)'></span>" +
                item.seriesName +
                "：" +
                item.value
              );
            });
            return params[0].name + tempStr.join(" ");
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
          })(this.bubbleData || tempChartData) //载入横坐标数据
        },
        yAxis: {
          type: "value",
          name: "（单位/次）",
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 40,
            align: "right",
            padding: [0, 0, 25, 0]
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
          splitNumber: 3, //y轴刻度设置(值越大刻度越小)
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
                      color: "rgba(108,146,255,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(58,236,253,1)"
                    }
                  ],
                  false
                )
              }
            },
            symbol: "circle", //circle, rect, roundRect, triangle,  pin, diamond, arrow
            symbolPosition: "start",
            symbolSize: 30,
            symbolOffset: [0, "0%"],
            data: (function(data) {
              var arr = [];
              data.forEach(function(items) {
                var itemName = items.name,
                  itemValue = items.value,
                  // itemStyle = itemValue / 900; //console.log(itemStyle)
                  itemStyle = 80; //console.log(itemStyle)
                arr.push({
                  name: itemName,
                  value: itemValue,
                  symbolSize: itemStyle
                });
              });
              return arr;
            })(this.bubbleData || tempChartData) //载入数据并设置图形尺寸
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, newVal, this.curPro);
    },
    curPro: function(newVal) {
      this.initChartData();
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>




