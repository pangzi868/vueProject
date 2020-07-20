<template>
  <div class="portrayal-exp">
    <div class="exp-title-frame">
      <span class="title-text">画像：经验年限，首贷占比</span>
    </div>
    <div class="exp-body">
      <div id="exp-years"></div>
      <div id="exp-down-payment"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableAuto",
  props: ["tableDatas"],

  data() {
    return {
      tableData: this.tableDatas
    };
  },
  computed: {},
  mounted() {
    this.drawFinance(
      "exp-years",
      this.tableData.finance,
      this.tableData.financeName
    );
    this.drawFinance(
      "exp-down-payment",
      this.tableData.op_period,
      this.tableData.opPeriodName
    );
  },
  methods: {
    drawFinance(id, chartData, titleName) {
      let data = chartData || [
        {
          name: "指标一",
          value: 754
        },
        {
          name: "硕士",
          value: 611
        },
        {
          name: "大专",
          value: 400
        },
        {
          name: "博士",
          value: 200
        }
      ];

      if (data.length === 0) return;
      let sumValue = 0;
      // let sortValue = data.sort((a, b) => {
      //   return b.value - a.value;
      // });
      let arr = Math.max(...data.map(x => x.value));
      // sumValue =
      //   data[0].value + Math.pow(10, data[0].value.toString().length - 1);
      sumValue = arr + Math.pow(10, parseInt(arr).toString().length - 1);
      let arrName = getArrayValue(data, "name"),
        // arrValue = getArrayValue(data, "value"),
        // objData = array2obj(data, "name"),
        optionData = getData(data);
      function getArrayValue(array, key) {
        // var key = key || "value";
        var res = [];
        if (array) {
          array.forEach(function(t) {
            res.push(t[key]);
          });
        }
        return res;
      }

      let realVal = {};
      data.forEach(item => {
        realVal[item.name] = item.value;
      });

      // function array2obj(array, key) {
      //   var resObj = {};
      //   for (var i = 0; i < array.length; i++) {
      //     resObj[array[i][key]] = array[i];
      //   }
      //   return resObj;
      // }

      function getData(data) {
        var res = {
          series: [
            // {
            //   name: "大环",
            //   type: "gauge",
            //   splitNumber: 15,
            //   radius: "95%",
            //   center: ["30%", "50%"],
            //   clockwise: false,
            //   label: {
            //     normal: {
            //       show: false,
            //       position: "center"
            //     }
            //   },
            //   axisLine: {
            //     show: false,
            //     lineStyle: {
            //       color: [[1, "#1f59a7"]]
            //     }
            //   },
            //   axisTick: {
            //     show: false
            //   },
            //   splitLine: {
            //     show: false
            //   },
            //   axisLabel: {
            //     show: false
            //   },
            //   detail: {
            //     show: false
            //   }
            // },
            // {
            //   name: "小环",
            //   type: "gauge",
            //   splitNumber: 15,
            //   radius: "84%",
            //   center: ["30%", "50%"],
            //   clockwise: false,
            //   axisLine: {
            //     show: false
            //   },
            //   axisTick: {
            //     show: false,
            //     lineStyle: {
            //       color: "#1f59a7",
            //       width: 3
            //     },
            //     length: 20,
            //     splitNumber: 5
            //   },
            //   splitLine: {
            //     show: false
            //   },
            //   axisLabel: {
            //     show: false
            //   },
            //   detail: {
            //     show: false
            //   }
            // }
          ],
          yAxis: []
        };
        for (let i = 0; i < data.length; i++) {
          res.series.push({
            name: "学历",
            type: "pie",
            clockWise: false,
            z: 2,
            hoverAnimation: false,
            radius: [84 - i * 15 + "%", 79 - i * 15 + "%"],
            center: ["30%", "50%"],
            label: {
              show: false,
              formatter: "{d}%",
              color: "RGB(246,175,101)",
              fontSize: 25,
              position: "inside"
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: data[i].value,
                name: data[i].name
              },
              {
                value: sumValue - data[i].value,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                label: {
                  show: false
                },
                hoverAnimation: false
              }
            ]
          });
          res.series.push({
            name: "背景线",
            type: "pie",
            silent: true,
            z: 1,
            clockWise: true,
            hoverAnimation: false,
            radius: [82 - i * 15 + "%", 80 - i * 15 + "%"],
            center: ["30%", "50%"],
            label: {
              show: false
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "RGB(12,64,128)",
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false
              }
            ]
          });
          res.series.push({
            type: "pie",
            radius: ["0", "20%"],
            center: ["30%", "50%"],
            z: 4,
            hoverAnimation: false,
            data: [
              {
                name: "",
                // value: "78%",
                label: {
                  show: false
                  // normal: {
                  //   rich: {
                  //     a: {
                  //       color: "#ccc",
                  //       align: "center",
                  //       fontSize: 16
                  //     },
                  //     b: {
                  //       color: "#7F97BC",
                  //       align: "center",
                  //       fontSize: 12
                  //     }
                  //   },
                  //   formatter: function(params) {
                  //     return params.marker !== ""
                  //       ? "{a|经营年限}"
                  //       : "{a|借款状态}";
                  //     // return (
                  //     //   "{a|" + params.value + "}\n\n" + "{b|" + "数据" + "}"
                  //     // );
                  //   },
                  //   position: "center"
                  // }
                },
                labelLine: {
                  show: false
                }
              }
            ]
          });
          res.yAxis.push(data[i].name);
        }
        return res;
      }

      let option = {
        title: {
          text: titleName,
          top: "45%",
          textAlign: "center",
          left: "30%",
          textStyle: {
            color: "#fff",
            fontSize: 22,
            fontWeight: "400"
          }
        },
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(37,178,73,1)"
              },
              {
                offset: 1,
                color: "rgba(81,253,140,1)"
              }
            ],
            global: false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(247,100,72,1)"
              },
              {
                offset: 1,
                color: "rgba(250,206,95,1)"
              }
            ],
            global: false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(98,39,255,1)"
              },
              {
                offset: 1,
                color: "rgba(242,69,255,1)"
              }
            ],
            global: false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(15,207,251,1)"
              },
              {
                offset: 1,
                color: "rgba(22,80,162,1)"
              }
            ],
            global: false
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(247,100,72,1)"
              },
              {
                offset: 1,
                color: "rgba(250,206,95,1)"
              }
            ],
            global: false
          }
        ],
        legend: {
          type: "scroll",
          orient: "vertical",
          data: arrName,
          itemHeight: 14,
          itemWidth: 14,
          itemGap: 20,
          textStyle: {
            color: "#6691CC",
            fontSize: 14,
            rich: {
              b: {
                color: "#FFF",
                align: "left",
                display: "inline-block",
                fontSize: 14
              },
              e: {
                color: "#00FFFF",
                align: "right",
                fontSize: 16,
                display: "inline-block",
                marginLeft: 6
              }
            }
          },
          align: "left",
          right: 30,
          icon: "circle",
          top: 100,
          formatter: function(params) {
            let a = (realVal[params]).toFixed(1) + "%";
            return `{b| ` + params + `}` + `    ` + `{e|` + a + `}`;
          }
        },
        // grid: {
        //   left: "20%",
        //   containLabel: true
        // },
        yAxis: [
          {
            type: "category",
            inverse: true,
            z: 3,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              inside: false,
              show: false
            },
            data: optionData.yAxis
          }
        ],
        xAxis: [
          {
            show: false
          }
        ],
        series: optionData.series
      };
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption(option);
    }
    // drawOp_period() {
    //   let myChart = this.$echarts.init(document.getElementById(id));
    //   // 绘制图表
    //   // myChart.setOption(option)
    // }
  },
  components: {},
  watch: {
    tableData: function(newVal) {
      this.drawFinance("exp-years", newVal.finance);
      this.drawFinance("exp-down-payment", newVal.op_period);
    }
  }
};
</script>

<style lang="less" scoped>
.portrayal-exp {
  padding-top: 2%;
  width: 100%;
  height: 32%;
  margin-bottom: 3%;
  background: url("../../assets/images/bg-7.png") no-repeat;
  background-size: 100% 100%;
  .exp-title-frame {
    width: 100%;
    height: 15.85%;
    // background: url("../../assets/images/title2.png") no-repeat;
    // background-size: 100% 100%;
    .title-text {
      display: inline-block;
      padding-top: 1.3%;
      margin-left: 3.5%;
    }
  }
  .exp-body {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-around;
    div {
      width: 50%;
      height: 100%;
    }
    #exp-years {
    }
    #exp-down-payment {
    }
  }
}
</style>
