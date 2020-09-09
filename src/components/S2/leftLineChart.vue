<template>
  <div class="line-box" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData", "activeIndex"],
  mounted() {
    this.initColumnChart(
      this.ids,
      this.chartData,
      this.curPro,
      this.activeIndex
    );
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
    initColumnChart(id, data, curPro, activeIndex) {
      if (!data || JSON.stringify(data) == '"{}"') return;

      let tempX = [],
        tempY1 = [],
        tempY2 = [];
      for (let i = 0, item; (item = data.x[0].data[i++]); ) {
        if (item === this.curPro) {
          if (data.x[1].data[i - 1] === activeIndex) {
            tempX.push(data.x[2].data[i - 1]);
            tempY1.push(data.y[0].data[i - 1]);
            tempY2.push(data.y[1].data[i - 1]);
          }
        }
      }

      let tempData = {
        x: [{ name: data.x[2].name, data: tempX }],
        y: [
          {
            name: data.y[0].name,
            data: tempY1
          },
          {
            name: data.y[1].name,
            data: tempY2
          }
        ]
      };
      let colorArr = ["rgba(0,232,246,1)", "rgba(24,40,255,1)"],
        reg = /(率|值|额|数)$/g;

      // data = {};
      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
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
          itemHeight: 14,
          data: [
            {
              name: tempData.y ? tempData.y[0].name + "值" : "预算值",
              icon: "rect"
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: tempData.y ? tempData.y[1].name + "值" : "实际值",
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
            data: tempData.x
              ? tempData.x[0].data
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
            type: "value",
            name: "单位：（万元）",
            nameTextStyle: {
              fontSize: 40,
              color: "rgba(255, 255, 255, 0.6)",
              padding: [0, 0, 0, 79]
            },
            nameGap: 35,
            // min: 0,
            // max: 100,
            axisLabel: {
              color: "#a8aab0",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 52
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
              show: true,
              lineStyle: {
                type: "dashed",
                width: 4,
                color: "rgba(255,255,255,0.4)"
              }
            }
          }
        ],
        series: [
          {
            name: tempData.y ? tempData.y[0].name + "值" : "预算值",
            type: "line",
            data: tempData.y
              ? tempData.y[0].data
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
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
                color: "rgba(0,232,246,1)",
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: tempData.y ? tempData.y[1].name + "值" : "实际值",
            type: "line",
            data: tempData.y
              ? tempData.y[1].data
              : [2, 6, 45, 20, 15, 75, 52, 38, 25, 85, 10],
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
                color: "rgba(24,40,255,1)",
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

      //  线图点击较为麻烦
      myCharts.getZr().on("click", params => {
        if (curPro === "全省") {
          return;
        }
        let pointInPixel = [params.offsetX, params.offsetY];
        if (myCharts.containPixel("grid", pointInPixel)) {
          /*此处添加具体执行代码*/

          let pointInGrid = myCharts.convertFromPixel(
            { seriesIndex: 0 },
            pointInPixel
          );
          //X轴序号
          let xIndex = pointInGrid[0];

          //获取当前图表的option
          let op = myCharts.getOption();

          //获得图表中我们想要的数据
          let year = op.xAxis[0].data[xIndex];
          // let value = op.series[0].data[xIndex];
          let yusuan = op.series[1].data[xIndex];

          let data = this.$store.state.screenSecondData.left1Aux,
            trueData = {
              x: [{ name: data.x[3].name, data: [] }],
              y: [{ name: data.y[0].name, data: [] }]
            };
          for (let i = 0, item; (item = data.x[0].data[i++]); ) {
            if (item === this.curPro && data.x[2].data[i - 1] === year) {
              trueData.x[0].data.push(data.x[3].data[i - 1]);
              trueData.y[0].data.push(data.y[0].data[i - 1]);
            }
          }
          setTimeout(() => {
            this.modalData = {
              left1OneChart: {
                type: "type1",
                visible: true,
                keys: "left1OneChart",
                zIndex: 21,
                data: trueData,
                chartIds: "left1Chart1",
                tableJudge: true,
                filter: {
                  yusuan: yusuan,
                  year: year
                }
              }
            };
          }, 300);
        }
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal, this.curPro, this.activeIndex);
    },
    curPro: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal, this.activeIndex);
    },
    activeIndex: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, this.curPro, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
