<template>
  <div class="bar-box" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initBarChart(this.ids, this.chartData, this.currentPro);
  },
  data() {
    return {};
  },
  computed: {
    // 切换部门
    currentPro: {
      get: function() {
        return this.$store.state.currentPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurrentPro", newVal);
      }
    }
  },
  methods: {
    initBarChart(id, data, cp) {
      if (!data || JSON.stringify(data) == '"{}"') return;

      let type = ["财务", "营销", "工程", "物资", "人资"];
      let proName = ["", "", "", "", ""];
      var dataLine = [0, 0, 0, 0, 0];
      data.x[0].data.forEach((item, index) => {
        if (item === cp) {
          let num = type.indexOf(data.x[1].data[index]);
          proName[num] = data.x[2].data[index];
          dataLine[num] = Number(data.y[0].data[index]);
          // dataLine[num] = 100;
        }
      });
      let positionLeft = 0,
        max = Math.max.apply(null, dataLine),
        lineMax = max,
        whiteMax = max,
        blackMax = max;
      debugger;
      let myCharts = this.$echarts.init(document.getElementById(id));
      var myColor = [
        "rgba(255,179,88,1)",
        "rgba(30,147,255,1)",
        "rgba(0,194,255,1)",
        "rgba(49,102,237,1)",
        "rgba(0,247,255,1)"
      ];
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",

          formatter: "{b1}<br />{a1}: {c1}",
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
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24]
        },
        grid: [
          {
            left: "5%",
            top: "2%",
            right: "12%",
            bottom: "2%",
            containLabel: true
          },
          {
            left: "5%",
            top: "2%",
            right: "12%",
            bottom: "2%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            max: lineMax,
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "27",
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: 56
              }
            },
            data: proName || [
              "财务资产",
              "工程项目",
              "合同管理",
              "物资招投标管理",
              "人资管理"
            ]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: 56
              }
            },
            data: [1, 1, 1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            //间距
            type: "bar",
            barWidth: 45,
            stack: "b",
            legendHoverLink: false,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)"
              }
            },

            data: [
              positionLeft,
              positionLeft,
              positionLeft,
              positionLeft,
              positionLeft
            ]
          },
          {
            name: "条数",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            barWidth: 40,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [whiteMax, whiteMax, whiteMax, whiteMax, whiteMax],
            barWidth: 51,
            itemStyle: {
              normal: {
                color: "#082c3a",
                barBorderRadius: 2
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [max, max, max, max, max],
            barWidth: 53,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 40,
                formatter: function(data) {
                  return dataLine[data.dataIndex] + "%";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: 56
                }
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: 0
              }
            },
            z: 0
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initBarChart(this.ids, newVal, this.currentPro);
    },
    currentPro: function(newVal) {
      this.initBarChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
