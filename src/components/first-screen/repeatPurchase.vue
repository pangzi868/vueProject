<template>
  <div class="repeat-purchase">
    <div class="single-purchase">
      <!-- <div class="single-purchase" v-for="(item) in ids" :key="item.id"> -->
      <!-- <div class="purchase-title">{{item.title}}</div> -->
      <!-- <div class="purchase-indicator">
        <div class="left-indicator">
          <div v-for="(item, index) in chartData.linkRelativeRatio[item.id]" :key="index">
            <div>{{item.title}}</div>
            <div :class="item.type === 'positive' ? 'positive-data': 'indicator-data'">{{item.data}}</div>
          </div>
        </div>
        <div :id="item.id + '-indicator'" class="right-indicator"></div>
      </div>-->
      <div :id="ids.id + '-line'" class="line-charts"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "debt",
  props: ["ids", "chartData"],
  mounted() {
    // for (let i in this.ids) {
    //   this.drawLineH(this.ids[i], this.chartData[i]);
    //   this.renderChartState(this.ids[i].id, this.chartData[i]);
    // this.drawDialPlate(
    //   this.ids[i].id + "-indicator",
    //   this.chartData.dialPlate[i]
    // );
    this.drawLineChart(this.ids.id + "-line", this.chartData.lineData);
    // }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 画表盘图
    drawDialPlate(id, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "",
            type: "gauge",
            startAngle: 220,
            endAngle: -40,
            detail: { formatter: "{value}" },
            data: [{ value: data, name: "" }],
            axisLine: {
              lineStyle: {
                color: [
                  [0.2, "#33FFFF"],
                  [0.8, "#0066FF"],
                  [1, "#FF77FF"]
                ],
                width: 10
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "50%"],
              color: "#FFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 24
              }
            }
          },
          {
            startAngle: 220,
            endAngle: -40,
            type: "gauge",
            radius: "63%",
            // min: 0,
            // max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [[1, "#3E789F"]],
                width: 2
              }
            },
            axisTick: {
              show: true,
              length: 3,
              lineStyle: {
                color: "#3E789F"
              }
            },
            detail: {
              show: false
            },
            splitLine: {
              show: true,
              length: 8,
              lineStyle: {
                color: "#3E789F"
              }
            },
            axisLabel: {
              show: true,
              color: "#FFF",
              fontSize: 12
            }
          }
        ]
      });
    },

    // 折线图
    drawLineChart(id, data) {
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0)" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255,255,255,1)" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        },
        grid: {
          top: "18%",
          left: "5%",
          right: "5%"
          // bottom: "25%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "rgba(255, 255,255,0.4)"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#FFF",
                margin: 15,
                fontSize: 18
              },
              formatter: function(data) {
                return data + "时";
              }
            },
            axisTick: {
              show: false
            },
            data: data ? data.xAxis : []
          }
        ],
        yAxis: [
          {
            name: "单位：人",
            // nameRotate: 90,
            // nameLocation: "middle",
            // nameGap: "80",

            nameTextStyle: {
              // width: "200",
              // height: "200",
              color: "#FFF",
              fontSize: 18,
              padding:[0,0,10,0]
              // backgroundColor: {
              //   image: "../assets/images/logo.png"
              // }
            },
            // min: 0,
            // max: 100,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255,255,0.4)"
              }
            },
            splitNumber: 3,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255,255,0.4)"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 18,
                color: "rgba(255, 255,255,0.4)"
              },
              formatter: function(value) {
                if (value === 0) {
                  return value;
                }
                return value;
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            // showAllSymbol: false,
            showSymbol: false,
            // smooth: 0.5,
            lineStyle: {
              normal: {
                color: "#00FFFF" // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)"
            },
            itemStyle: {
              color: "rgba(0,255,255,1)",
              borderColor: "#FFF",
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: [" {a|{c}}"].join(","),
                rich: {
                  a: {
                    color: "#fff",
                    align: "center"
                  }
                }
              }
            },
            tooltip: {
              show: true
            },
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
            },
            data: data ? data.yAxis : []
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      // for (let i in this.ids) {
      //   this.drawLineH(this.ids[i], this.chartData[i]);
      //   this.renderChartState(this.ids[i].id, this.chartData[i]);
      // this.drawDialPlate(this.ids[i].id + "-indicator", newVal.dialPlate[i]);
      this.drawLineChart(this.ids.id + "-line", newVal.lineData);
      // }
    }
  }
};
</script>

<style lang="less">
.repeat-purchase {
  display: flex;
  width: 100%;
  height: 20%;
  .single-purchase {
    width: 100%;
    height: 100%;
    text-align: center;
    .purchase-indicator {
      height: 50%;
      width: 100%;
      display: flex;
      .left-indicator {
        width: 30%;
        height: 100%;
        .indicator-data {
          color: #dc143c;
        }
        .positive-data {
          color: #00ff00;
        }
      }
      .right-indicator {
        height: 250px;
        width: 70%;
      }
    }
  }
  .line-charts {
    width: 100%;
    height: 270px;
    padding-top: 2%;
  }
}
</style>
