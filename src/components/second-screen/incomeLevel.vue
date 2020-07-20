<template>
  <div class="income-level">
    <div class="span-title">{{chartTitle}}</div>
    <div :id="this.ids" class="right-level-chart"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData", "chartTitle"],
  mounted() {
    this.initRightChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initRightChart(ids, chartData) {
    chartData.yAxis= chartData.yAxis.map(item=>{
       return  Number(item).toFixed(1)
      })
      
      let myEchart = this.$echarts.init(document.getElementById(ids));
      myEchart.setOption({
        grid: {
          left: "5%",
          // right: "5%",
          // bottom: "5%",
          // top: "10%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              "占比" +
              " : " +
              // Number(
              //   (params[0].value.toFixed(4) / 10000).toFixed(2)
              // ).toLocaleString() +
              // " 万元<br/>"
              params[0].value.toLocaleString() +
              "%"
            );
          }
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: chartData.xAxis || ["大米", "玉米", "蔬菜", "鸡蛋", "坚果"]
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              },
              formatter: function(value) {
                return value.toLocaleString() + "%";
              }
            },
            data: chartData.yAxis || [50000000, 22000000, 10000000, 5000000, 1]
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)"
                  }
                ])
              }
            },
            barWidth: 20,
            data: chartData.yAxis || [50000000, 22000000, 10000000, 5000000, 1]
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: chartData.yAxis || [
              50000000,
              50000000,
              50000000,
              50000000,
              1
            ],
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                barBorderRadius: 30
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
      this.initRightChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.income-level {
  width: 100%;
  height: 100%;
  height: 400px;
  position: relative;
  padding-top: 30px;
  .span-title {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    text-align: center;
    font-size: 32px;
  }
  .right-level-chart {
    height: 400px;
    width: 100%;
  }
}
</style>
