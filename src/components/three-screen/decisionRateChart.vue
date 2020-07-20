<template>
  <div :id="id.id" :style="id.style"></div>
</template>

<script>
export default {
  name: 'decisionRateA',
  props: ['tableDatas','ids'],
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
      let p = this.tableDatas.toFixed(2) || 0 + '%'
      let myChart = this.$echarts.init(document.getElementById(this.id.id));
      var dataArr = [
        {
          value: p,
          name: "噪音检测"
        }
      ];
      var colorSet = [[0.2, '#46FEFF'], [0.8, '#0864F3'], [1, '#E174F5']];
      var rich = {
        white: {
          fontSize: 50,
          color: "#fff",
          fontWeight: "500",
          padding: [-150, 0, 0, 0]
        },
        bule: {
          fontSize: 30,
          fontFamily: "DINBold",
          color: "#fff",
          fontWeight: "700",
          padding: [-120, 0, 0, 100]
        },
        radius: {
          width: 350,
          height: 80,
          // lineHeight:80,
          borderWidth: 1,
          borderColor: "#0092F2",
          fontSize: 50,
          color: "#fff",
          backgroundColor: "#1B215B",
          borderRadius: 20,
          textAlign: "center"
        },
        size: {
          height: 400,
          padding: [100, 0, 0, 0]
        }
      };
      let option = {
        tooltip: {
          show:false,
          formatter: "{a} <br/>{b} : {c}%"
        },
        grid: {
          top: '10%',
          left: '30%',
        },
        series: [
          {
            type: "gauge",
            name: "外层辅助",
            radius: "74%",
            startAngle: "225",
            endAngle: "-45",
            splitNumber: "120",
            color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0.4,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }, 'none'],
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            // data: [{value: 1, name: 90}],
            title: {
              show: true,
              offsetCenter: [0, 30],
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontWeight: "normal",
                fontFamily: "微软雅黑",
                fontSize: 20
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "#00FFFF"]],
                width: 2,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#051932",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "gauge",
            radius: "70%",
            startAngle: "225",
            endAngle: "-45",
            pointer: {
              show: true
            },
            detail: {
              formatter: function(value) {
                var num = Math.round(value);
                return `{bule|${p}%}{white|}" + "{size|" + "}`;
              },
              rich: rich,
              offsetCenter: ["0%", "55%"]
            },
            data: dataArr,
            title: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 20,
                // shadowBlur: 15,
                // shadowColor: '#B0C4DE',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: "#00377a",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            },
            animationDuration: 4000
          },
          {
            name: "灰色内圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "60%",
            startAngle: "225",
            endAngle: "-45",
            //center: ["50%", "75%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#018DFF"]],
                fontSize: 14,
                width: 2,
                opacity: 1 //刻度背景宽度
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            detail: {
              show: 0
            }
          },
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "60%",
            startAngle: 225, //刻度起始
            endAngle: -45, //刻度结束
            min: 0,
            max: 100,
            splitNumber: 5,
            z: 4,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 16, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "#018DFF"
              } //刻度节点线
            },
            axisLabel: {
              color: "rgba(255,255,255,8)",
              fontSize: 18
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ""
              }
            ]
          },
          {
            //内圆
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            z: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  0.8,
                  [
                    {
                      offset: 0,
                      color: "#4978EC"
                    },
                    {
                      offset: 0.5,
                      color: "#1E2B57"
                    },
                    {
                      offset: 1,
                      color: "#141F3D"
                    }
                  ],
                  false
                ),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            label: {
              show: false
            },
            tooltip: {
              show: false
            },
            data: [100],
            animationType: "scale"
          }
        ]
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
#echarts01 {
  height: 100%
}
</style>
