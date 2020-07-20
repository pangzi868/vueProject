<template>
  <div :id="id.id" :style="id.style"></div>
</template>

<script>
import * as basebox from "@/assets/base64.js";
export default {
  name: "decisionRateB",
  props: ["tableDatas", "ids"],
  data() {
    return {
      id: this.ids,
      data: [
        {
          label: "反欺诈模型决策占比",
          value: 0
        },
        {
          label: "反欺诈策略决策占比",
          value: 0
        },
        {
          label: "反欺诈人工审核占比",
          value: 0
        }
      ]
    };
  },
  mounted() {
    this.drawGraph();
  },
  methods: {
    drawGraph() {
      let myChart = this.$echarts.init(document.getElementById(this.id.id));
      var dataArr = [
        {
          value: 40,
          name: "噪音检测"
        }
      ];
      var img = basebox.decisionRate.value
        
      var trafficWay = this.tableDatas || [
        {
          name: "无监督模型",
          value: 20
        },
        {
          name: "有监督模型",
          value: 10
        },
        {
          name: "半监督模型",
          value: 30
        },
        {
          name: "深度学习模型",
          value: 40
        }
      ];

      var data = [];
      var color = [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000"
      ];
      for (var i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          },
          {
            value: 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0
              }
            }
          }
        );
      }
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [70, 72],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                fontSize: 16,
                formatter: function(params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < trafficWay.length; i++) {
                    total += trafficWay[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return (
                      params.name +
                      "\n" +
                      "\n" +
                      "占百分比：" +
                      percent +
                      "%"
                    );
                  } else {
                    return "";
                  }
                }
              },
              labelLine: {
                length: 10,
                length2: 50,
                show: true,
                color: "#00ffff"
              }
            }
          },
          data: data
        }
      ];
      let option = {
        color: color,
        title: {
          text: "模型分布",
          top: "48%",
          textAlign: "center",
          left: "49%",
          textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "400"
          }
        },
        grid: {
          top: '10%',
          bottom: '40%'
        },
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: img,
                width: 120,
                height: 120
              },
              left: "center",
              top: "center",
              position: [100, 100]
            }
          ]
        },
        tooltip: {
          show: false
        },
        legend: {
          icon: "circle",
          orient: "horizontal",
          data: ["无监督模型", "有监督模型", "半监督模型", "深度学习模型"],
          bottom: 0,
          align: "left",
          textStyle: {
            color: "#fff"
          },
          itemWidth: 20,
          itemGap: 20
        },
        toolbox: {
          show: false
        },
        series: seriesOption
      };
      // 绘制图表
      myChart.setOption(option);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  components: {}
};
</script>

<style lang="less" scoped>
#echarts02 {
  height: 100%;
}
</style>
