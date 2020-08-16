<template>
  <div class="left-bar-chart" :id="ids"></div>
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
      var spNum = 5,
        _max = this.total;
      var legendData = ["常住人口", "户籍人口", "农村人口", "城镇居民"];
      var y_data = ["经济责任", "工程", "财务收支", "营销管理", "人资管理"];
      var _data1 = [10, 15, 10, 13, 15],
        _data2 = [19, 5, 40, 33, 12],
        _data3 = [21, 55, 10, 13, 35];
      var fomatter_fn = function(v) {
        return ((v.value / _max) * 100).toFixed(0);
      };
      var _label = {
        normal: {
          show: false,
          position: "inside",
          formatter: fomatter_fn,
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        }
      };
      if (!id) return;
      let chart = this.$echarts.init(document.getElementById(id));
      chart.setOption({
        legend: {
          data: legendData,
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 48
          },
          x: "85%", //用百分比 处理块与文字位置
          y: "center",
          orient: "vertical",
          itemGap: 24,
          itemHeight: 44,
          itemWidth: 44
        },
        grid: {
          containLabel: true,
          top: "5%",
          left: 0,
          right: '18%',
          bottom: 30
        },
        tooltip: {
          show: true,
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
          formatter: function(p) {
            var _arr = p.seriesName.split("/"),
              idx = p.seriesIndex; //1，2，3
            return (
              "名称：" +
              p.seriesName +
              "<br>" +
              "完成：" +
              p.value +
              "<br>" +
              "占比：" +
              ((p.value / _max) * 100).toFixed(0) +
              "%"
            );
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)"
        },
        xAxis: {
          splitNumber: spNum,
          // interval: _max / spNum,
          // max: _max,
          axisLabel: {
            show: false
            // formatter: function(v) {
            //   var _v = ((v / _max) * 100).toFixed(0);
            //   return _v == 0 ? _v : _v + "%";
            // }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            data: this.xAxis ? this.xAxis : y_data,
            axisLabel: {
              fontSize: 56,
              textAlign: "left",
              padding: [0, 40, 0, 0],
              color: "rgba(255, 255, 255, 0.6)"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            show: false,
            data: this.xAxis ? this.xAxis : y_data,
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: this.type ? this.type[0] : "常住人口",
            stack: "2",
            label: _label,
            legendHoverLink: false,
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "rgba(0,87,248,1)"
              },
              emphasis: {
                color: "rgba(0,87,248,1)"
              }
            },
            data: this.yAxis1 ? this.yAxis1 : _data1
          },
          {
            type: "bar",
            name: this.type ? this.type[1] : "户籍人口",
            stack: "2",
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
              normal: {
                color: "rgba(255,179,88,1)"
              },
              emphasis: {
                color: "rgba(255,179,88,1)"
              }
            },
            data: this.yAxis2 ? this.yAxis2 : _data2
          },
          {
            type: "bar",
            stack: "2",
            name: this.type ? this.type[2] : "农村人口",
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
              normal: {
                color: "rgba(0,247,255,1)"
              },
              emphasis: {
                color: "rgba(0,247,255,1)"
              }
            },
            data: this.yAxis3 ? this.yAxis3 : _data3
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
