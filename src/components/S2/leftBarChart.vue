<template>
  <div class="left-bar-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData", "curType"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData, this.curType);
  },
  data() {
    return {
      chartDom: null,
      interIndex: 0,
      animation: null
    };
  },
  computed: {
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
    initColumnChart(id, data, type) {
      let tempData = data.x,
        tempYData = data.y,
        trueData = {},
        trueL = [],
        colorArr = [
          "65,105,225",
          "0,128,128",
          "255,160,122",
          "255,165,0",
          "222,184,135",
          "0,102,255",
          "70,130,180",
          "238,130,238"
        ];
      for (let i = 0, item; (item = tempData[0].data[i++]); ) {
        if (item === type) {
          if (!trueData[tempData[1].data[i - 1]]) {
            trueData[tempData[1].data[i - 1]] = {};
          }
          if (!trueL.includes(tempData[2].data[i - 1])) {
            trueL.push(tempData[2].data[i - 1]);
          }
          trueData[tempData[1].data[i - 1]][tempData[2].data[i - 1]] =
            tempYData[0].data[i - 1];
        }
      }
      var spNum = 5;
      var _label = {
        normal: {
          show: false,
          position: "inside",
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        }
      };
      if (!id) return;
      if (this.animation !== null) {
        clearInterval(this.animation);
        this.animation = null;
      }
      let chart = this.$echarts.init(document.getElementById(id));
      this.chartDom = chart;
      let options = {
        legend: {
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
          left: "2%",
          right: "18%",
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
              "名称：" + p.seriesName + "<br>" + "完成：" + p.value
              // "<br>" +
              // "占比：" +
              // ((p.value / _max) * 100).toFixed(0) +
              // "%"
            );
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)"
        },
        xAxis: {
          splitNumber: spNum,
          axisLabel: {
            show: false
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
            axisLabel: {
              fontSize: 56,
              textAlign: "left",
              padding: [0, 40, 0, 0],
              color: "rgba(255, 255, 255, 0.6)",
              formatter: function(value) {
                if (value.length > 8) {
                  return value.substr(0, 9) + "...";
                } else {
                  return value;
                }
              }
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
            axisLine: {
              show: false
            }
          }
        ]
      };
      options.legend.data = trueL;

      // options.dataZoom =
      //   Object.keys(trueData).length > 6
      //     ? {
      //         type: "slider",
      //         show: true,
      //         height: 560,
      //         yAxisIndex: 0,
      //         left: "2%",
      //         start: 0,
      //         end: (5 / Object.keys(trueData).length) * 100,

      //         handleSize: "110%",
      //         handleStyle: {
      //           color: "rgba(0,0,0,0)"
      //         },
      //         textStyle: {
      //           color: "rgba(0,0,0,0)"
      //         },
      //         borderColor: "#90979c",
      //         orient: "vertical"
      //       }
      //     : { show: false };
      options.series = trueL.map((item, index) => {
        return {
          type: "bar",
          stack: "one",
          name: item,
          legendHoverLink: false,
          barWidth: 40,
          label: _label,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 1,
                    color: "rgba(" + colorArr[index] + ",1)" // 100% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "rgba(" + colorArr[index] + ",0.1)" // 0% 处的颜色
                  }
                ],
                false
              )
            }
          },
          data: Object.keys(trueData).map((items, indexs) => {
            return trueData[items][item] ? trueData[items][item] : 0;
          })
        };
      });

      if (Object.keys(trueData).length > 5) {
        // options.yAxis[0].data = Object.keys(trueData);
        // options.yAxis[1].data = Object.keys(trueData);
        let tempArr = [];
        for (let i = 0; i < 5; i++) {
          if (i < Object.keys(trueData).length) {
            tempArr.push(Object.keys(trueData)[i]);
          } else if (i >= Object.keys(trueData).length) {
            tempArr.push(Object.keys(trueData)[i % 5]);
          }
        }
        options.yAxis[0].data = tempArr;
        options.yAxis[1].data = tempArr;
        this.setInterFunc(trueData, options);
        chart.on("mouseover", params => {
          clearInterval(this.animation);
        });
        chart.on("mouseout", params => {
          this.setInterFunc(trueData, options);
        });
      } else {
        options.yAxis[0].data = Object.keys(trueData);
        options.yAxis[1].data = Object.keys(trueData);
      }

      chart.setOption(options);
      chart.on("click", params => {
        let temp = params.name;
        let tempSeries = params.seriesName;
        let data = this.$store.state.screenSecondData.left3Aux;
        let align = [];
        let xAxis = data.x.map(item => {
          align.push("center");
          return item.name;
        });
        let yAxis = [];
        let reg = /(率|值|额|数)$/g;
        data.x[0].data.forEach((item, index) => {
          if (item === temp) {
            if (data.x[1].data[index] === tempSeries) {
              let tempY = [];
              data.x.forEach(items => {
                let tempValue = null;
                tempValue =
                  reg.test(items.name) || items.data[index].indexOf(".") !== -1
                    ? parseFloat(items.data[index]).toFixed(2)
                    : items.data[index];
                tempY.push(items.data[index]);
              });
              yAxis.push(tempY);
            }
          }
        });
        setTimeout(() => {
          this.modalData = {
            left3Modal: {
              type: "type2",
              visible: true,
              keys: "left3Modal",
              zIndex: 21,
              data: {
                xAxis: xAxis,
                yAxis: yAxis,
                align: align
              }
            }
          };
        }, 300);
      });
    },

    // 设置柱状图轮播
    setInterFunc(trueData, options) {
      // this.interIndex;
      let that = this;
      this.animation = setInterval(
        (trueData, options, that) => {
          let tempArr = [];
          for (let i = this.interIndex; i < this.interIndex + 5; i++) {
            if (i < Object.keys(trueData).length) {
              tempArr.push(Object.keys(trueData)[i]);
            } else if (i >= Object.keys(trueData).length) {
              tempArr.push(Object.keys(trueData)[i % 5]);
            }
          }
          options.yAxis[0].data = tempArr;
          options.yAxis[1].data = tempArr;
          that.chartDom.setOption(options);
          this.interIndex++;
        },
        2000,
        trueData,
        options,
        that
      );
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal, this.curType);
    },
    curType: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
