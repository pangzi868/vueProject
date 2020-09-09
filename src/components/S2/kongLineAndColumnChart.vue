<template>
  <div class="kong-line-column-box" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData, this.curPro);
  },
  data() {
    return {};
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
    },
    modalData: {
      get: function() {
        return this.$store.state.modalData;
      },
      set: function(newValue) {
        this.$store.commit("newModalData", newValue);
      }
    }
  },
  methods: {
    initColumnChart(id, data, curPro) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      // data = {};
      let trueData = {
        x: [{ name: data.x[1].name, data: [] }],
        y: [
          { name: data.y[0].name, data: [] },
          { name: data.y[1].name, data: [] },
          { name: data.y[2].name, data: [] }
        ]
      };
      for (let i = 0, item; (item = data.x[0].data[i++]); ) {
        if (item === curPro) {
          trueData.x[0].data.push(data.x[1].data[i - 1]);
          trueData.y[0].data.push(data.y[0].data[i - 1]);
          trueData.y[1].data.push(data.y[1].data[i - 1]);
          trueData.y[2].data.push(data.y[2].data[i - 1]);
        }
      }

      let myCharts = this.$echarts.init(document.getElementById(id));
      let colorArr = [
          "rgba(0,150,255,1)",
          "rgba(24,40,255,1)",
          "rgba(222,159,100,1)"
        ],
        reg = /(率|值|额|数)$/g;
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2} %",
          formatter: function(params) {
            let tempStr = params.map((item, index) => {
              return (
                "</br><span style='display:inline-block;margin-right:25px;border-radius:25px;width:40px;height:40px;background-color:" +
                colorArr[index] +
                "'></span>" +
                item.seriesName +
                "：" +
                (item.value
                  ? reg.test(item.seriesName) || item.value.indexOf(".") !== -1
                    ? parseFloat(item.value).toFixed(2)
                    : item.value
                  : "0")
              );
            });
            return params[0].name + tempStr.join(" ");
          },
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "1%",
          top: "20%",
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: {
          //图例组件，颜色和名字
          right: "3%",
          top: "3%",
          itemGap: 64,
          itemWidth: 44,
          itemHeight: 44,
          data: [
            {
              name: trueData.y ? trueData.y[1].name : "实际数"
            },
            {
              name: trueData.y ? trueData.y[0].name : "计划数"
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: trueData.y ? trueData.y[2].name : "执行比例",
              icon: "rect"
            }
          ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: trueData.x
              ? trueData.x[0].data.map(item => {
                  if (item === "直属单位") {
                    return "直属";
                  } else {
                    return item;
                  }
                })
              : [
                  "22:18",
                  "22:23",
                  "22:25",
                  "22:28",
                  "22:30",
                  "22:33",
                  "22:35",
                  "22:40",
                  "22:18",
                  "22:23",
                  "22:25"
                ],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            name: "单位：（万元）",
            nameTextStyle: {
              fontSize: 40,
              color: "rgba(255, 255, 255, 0.6)",
              padding: [0, 0, 0, 79]
            },
            nameGap: 35,
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,1)",
                width: 4,
                opacity: 0.2
              }
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 100,
            axisLabel: {
              show: false,
              formatter: "{value}",
              textStyle: {
                color: "#FFF",
                fontSize: 12
              }
            },
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
                type: "dashed",
                width: 4,
                color: "rgba(255,255,255,0.2)"
              }
            }
          }
        ],
        series: [
          {
            name: trueData.y ? trueData.y[1].name : "实际数",
            type: "bar",
            data: trueData.y
              ? trueData.y[1].data
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            barWidth: 26,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(21,255,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,150,255,1)"
                  }
                ]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: trueData.y ? trueData.y[0].name : "计划数",
            type: "bar",
            data: trueData.y
              ? trueData.y[0].data
              : [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60],
            barWidth: 26,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(13,139,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(24,40,255,1)"
                  }
                ]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: trueData.y ? trueData.y[2].name : "执行比例",
            type: "line",
            data: trueData.y
              ? trueData.y[2].data.map((item, index) => {
                  return item * 100;
                })
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            yAxisIndex: 1,
            smooth: 0.5,
            symbolSize: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                width: 12
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(222,159,100,1)",
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      });
      myCharts.on("click", params => {
        let op = myCharts.getOption();
        let data = this.$store.state.screenSecondData.left2Aux,
          trueData = {
            x: [{ name: data.x[2].name, data: [] }],
            y: [{ name: data.y[0].name, data: [] }]
          },
          name = params.name;
        let yusuan = op.series[1].data[params.seriesIndex];
        let type = op.xAxis[0].data[params.seriesIndex];
        for (let i = 0, item; (item = data.x[0].data[i++]); ) {
          if (item === this.curPro && data.x[1].data[i - 1] === name) {
            trueData.x[0].data.push(data.x[2].data[i - 1]);
            trueData.y[0].data.push(data.y[0].data[i - 1]);
          }
        }
        setTimeout(() => {
          this.modalData = {
            left2OneChart: {
              type: "type1",
              visible: true,
              keys: "left2OneChart",
              zIndex: 21,
              data: trueData,
              chartIds: "left2Chart1",
              tableJudge: true,
              filter: {
                yusuan: yusuan,
                type: type
              }
            }
          };
        }, 300);
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal, this.curPro);
    },
    curPro: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
