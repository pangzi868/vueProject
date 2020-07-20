<template>
  <div class>
    <div class="line-chart-div" v-for="(item) in ids" :key="item" :id="item"></div>
  </div>
</template>

<script>
export default {
  name: "lineChart",
  props: ["chartData", "ids", "trueData"],
  data() {
    return {
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  mounted() {
    for (let i in this.ids) {
      this.drawLineH(this.ids[i], this.chartData[i], this.trueData);
      // this.renderChartState(this.ids[i].id, this.chartData[i]);
    }
  },
  methods: {
    drawLineH(id, data, trueData) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      // var a = data.chartName || "";
      myChart.setOption({
        // title: {
        //   text: [data.DrillDown ? `{c|}` : "", `{a|${a} }`].join(""),
        //   triggerEvent: true,
        //   textStyle: {
        //     fontSize: 14,
        //     color: "#FFF",
        //     rich: {
        //       c: {
        //         backgroundColor: {
        //           image: require("../../assets/images/DrillDown.svg")
        //         },
        //         height: 20,
        //         width: 20
        //       }
        //     }
        //   },

        //   itemGap: 10,
        //   margin: 10,
        //   left: "center"
        // },
        color: ["#0078d7", "#e5b322"],
        // legend: {
        //   data: data.legend || [
        //     { name: "当日实时放款" }
        //     // { name: "七日均值" }
        //   ],
        //   orient: "vertical",
        //   align: "left",
        //   top: 50,
        //   left: 120,
        //   height: 4,
        //   width: 4,
        //   itemHeight: 8,
        //   itemWidth: 8,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 12
        //   }
        // },
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0
                  ? '<span style="color:#000">' +
                    option[i].name +
                    "</span>" +
                    "<br/>" +
                    `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "" +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "" +
                    "</span>";
            }
            return str + "</div>";
          }
        },
        // grid: {
        //   top: 140,
        //   bottom: 60,
        //   left: "10%",
        //   right: "10%",
        //   borderWidth: 1
        // },
        grid: {
          right: "3%"
        },
        xAxis: {
          type: "category",
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#FFF",
            fontSize: 18
          },
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#FFF"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255,255,0.2)"
            }
          },
          data: trueData.data_dt || [
            "2018年01月",
            "2018年02月",
            "2018年03月",
            "2018年04月",
            "2018年05月",
            "2018年06月",
            "2018年07月",
            "2018年08月",
            "2018年09月",
            "2018年10月",
            "2018年11月"
          ]
        },
        yAxis: {
          name: (data.yAxis && data.yAxis[0]) || "单位：元",
          // nameRotate: 90,
          // nameLocation: "middle",
          // nameGap: "80",

          nameTextStyle: {
            // width: "200",
            // height: "200",
            color: "#FFF",
            fontSize: 18,
            padding: [0, 0, 10, 0]
            // backgroundColor: {
            //   image: "../assets/images/logo.png"
            // }
          },
          splitNumber: 3,
          // min: "10",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255,255,0.4)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255,255,0.2)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            fontSize: 18,
            color: "rgba(255, 255,255,0.4)",
            formatter: "{value}"
          }
        },
        series: [
          {
            name: (data.legend && data.legend[0].name) || "当日实时放款",
            type: "line",
            // smooth: 0.5,
            showSymbol: false,
            label: {
              normal: {
                show: true,
                color: "#FFF",
                formatter: "{c}"
              }
            },
            itemStyle: {
              color: "rgba(0,255,255,1)",
              borderColor: "#FFF",
              borderWidth: 2
            },
            data: trueData.amt_cur || [
              "5",
              "20",
              "36",
              "10",
              "10",
              "22",
              "36",
              "79",
              "233",
              "54",
              "200"
            ],
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(3, 71, 191,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(3, 71, 191,0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less">
.line-chart-div {
  // height: 100%;
  height: 270px;
  width: 100%;
}
</style>

