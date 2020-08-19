<template>
  <div class="loan-chart" :id="ids"></div>
</template>

<script>
import "echarts-liquidfill";
export default {
  props: ["ids", "chartData"],
  data() {
    return {};
  },
  mounted() {
    this.drawChart(this.ids, this.chartData);
  },
  methods: {
    drawChart(id, data) {
      let myChart = this.$echarts.init(document.getElementById(id));
      var value = 0.2;
      var tdata = [value, value, value];
      // 绘制图表
      myChart.setOption({
        // // title: {
        // //   text: (value * 100).toFixed(0) + "{a|%}",
        // //   textStyle: {
        // //     fontSize: 50,
        // //     fontFamily: "Microsoft Yahei",
        // //     fontWeight: "normal",
        // //     color: "#bcb8fb",
        // //     rich: {
        // //       a: {
        // //         fontSize: 28
        // //       }
        // //     }
        // //   },
        // //   x: "center",
        // //   y: "35%"
        // },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "25%",
            children: [
              {
                type: "text",
                z: 80,
                style: {
                  fill: "#FFF",
                  text: "协议库存\n履约总数",
                  font: "56px Microsoft YaHei"
                }
              }
            ]
          }
        ],
        series: [
          {
            type: "liquidFill",
            radius: "80%",
            center: ["50%", "50%"],
            //  shape: 'roundRect',
            data: tdata,
            backgroundStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(0,209,189,0.2)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(68, 145, 253, .25)"
                  },
                  {
                    offset: 0,
                    color: "rgba(2,159,236,0.5)"
                  }
                ],
                globalCoord: false
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 20,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(2,159,236,1)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(83,160,253,0)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,209,189,1)"
                    }
                  ],
                  globalCoord: false
                },
                shadowBlur: 10,
                shadowColor: "#000"
              }
            },
            label: {
              normal: {
                fontSize: 92,
                color: "rgba(255,221,101,1)",
                formatter: function() {
                  return data;
                }
              }
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(61,230,238,1)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(43,215,245,0.4)"
                  },
                  {
                    offset: 0,
                    color: "rgba(29,203,250,0.5)"
                  }
                ],
                globalCoord: false
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
      this.drawChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.loan-chart {
  width: 100%;
  height: 100%;
}
</style>
