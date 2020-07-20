<template>
  <div class="classification-account">
    <div :id="this.idsLeft" class="left-account-charts"></div>
    <div :id="this.idsRight" class="right-columnar-charts"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["idsLeft", "idsRight", "chartData"],
  mounted() {
    this.initLeftOneChart(this.idsLeft, this.chartData);
    this.initLeftTwoChart(this.idsRight, this.chartData);
  },
  data() {
    return {
      color: ["#0E7CE2", "#FF8352", "#E271DE", "#F8456B", "#00FFFF", "#4AEAB0"]
    };
  },
  computed: {},
  methods: {
    initLeftOneChart(idsleft, chartData) {
      let myEchart = this.$echarts.init(document.getElementById(idsleft));

      let title = "总量";
      let echartData = [
        {
          name: "A类",
          value: "3720"
        },
        {
          name: "B类",
          value: "2920"
        },
        {
          name: "C类",
          value: "2200"
        },
        {
          name: "D类",
          value: "1420"
        }
      ];

      let formatNumber = function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = chartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      myEchart.setOption({
        color: this.color,
        // tooltip: {
        //     trigger: 'item'
        // },
        title: [
          {
            show: false,
            text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
            top: "center",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#FFF",
                  padding: [10, 0]
                },
                val: {
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#FFF"
                }
              }
            }
          },
          {
            text: "",
            top: 20,
            left: 20,
            textStyle: {
              fontSize: 14,
              color: "#FFF",
              fontWeight: 400
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            center: ["50%", "50%"],
            data: chartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "rgba(4, 50, 117, 1)",
                borderWidth: 2
              }
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 120,
                lineStyle: {
                  color: "#e6e6e6"
                }
              }
            },
            label: { show: false }
          }
        ]
      });
    },

    initLeftTwoChart(idsright, chartData) {
      let myEchart = this.$echarts.init(document.getElementById(idsright));
      let data = [];
      let total = chartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      chartData &&
        chartData.forEach(item => {
          data.push({
            name: item.name,
            value: item.value,
            sum: total
          });
        });
      let getArrByKey = (data, k) => {
        let key = k || "value";
        let res = [];
        if (data) {
          data.forEach(function(t) {
            res.push(t[key]);
          });
        }
        return res;
      };
      let opt = {
        index: 0
      };
      data = data.sort((a, b) => {
        return b.value - a.value;
      });
      myEchart.setOption({
        // grid: {
        //   top: "2%",
        //   bottom: -15,
        //   right: 30,
        //   left: 30,
        //   containLabel: true
        // },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, "name"),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              interval: 0,
              color: "#FFF",
              align: "left",
              margin: 80,
              fontSize: 13,
              formatter: function(value, index) {
                if (opt.index === 0 && index < 3) {
                  return (
                    "{idx" +
                    index +
                    "|" +
                    (1 + index) +
                    "} {title|" +
                    value +
                    "}"
                  );
                } else if (opt.index !== 0 && index + opt.index < 9) {
                  return (
                    "{idx|0" +
                    (1 + index + opt.index) +
                    "} {title|" +
                    value +
                    "}"
                  );
                } else {
                  return (
                    "{idx|" +
                    (1 + index + opt.index) +
                    "} {title|" +
                    value +
                    "}"
                  );
                }
              },
              rich: {
                idx0: {
                  color: "#FFF",
                  backgroundColor: "#FFF",
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx1: {
                  color: "#FFF",
                  backgroundColor: "#FFF",
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx2: {
                  color: "#FFF",
                  backgroundColor: "#FFF",
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx: {
                  color: "#FFF",
                  borderRadius: 100,
                  padding: [5, 8]
                },
                title: {
                  width: 165
                }
              }
            }
          },
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, "name"),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              shadowOffsetX: "-20px",
              textStyle: {
                color: "#FFF",
                fontSize: "14",
                fontFamily: "PingFangSC-Regular"
              },
              align: "right",
              verticalAlign: "bottom",
              lineHeight: 30,
              fontSize: 13,
              formatter: function(value, index) {
                return (
                  ((data[index].value / data[index].sum) * 100).toFixed(2) + "%"
                );
              }
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            showBackground: true,
            barBorderRadius: 30,
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            // align: left,
            itemStyle: {
              color: val => {
                if (val === undefined) {
                  return "#1990FF";
                }
                return this.color[val.dataIndex];
              },
              barBorderRadius: 30
            },
            label: {
              normal: {
                color: "#FFF",
                show: true,
                position: [0, "-20px"],
                textStyle: {
                  fontSize: 16
                },
                formatter: function(a) {
                  return a.name;
                }
              }
            }
          }
        ]
      });
    }
  },
  components: {}
};
</script>

<style lang="less">
.classification-account {
  width: 100%;
  display: flex;
}
.left-account-charts,
.right-columnar-charts {
  width: 50%;
  height: 370px;
}
</style>
