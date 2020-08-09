<template>
  <div class="pie-and-col">
    <div v-for="(item, index) in ids" :key="index" :id="item.id" class="inline-chart"></div>
    <move-modal
      v-if="modalJudge"
      id="1111"
      titlex="1111"
      :dialogJudge="modalJudge"
      :dialogData="dialogData"
    />
  </div>
</template>

<script>
import MoveModal from "@/components/moveModal.vue";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initChartData();
    let curId1 = this.ids[0];
    let curId2 = this.ids[1];
    this.initPie(curId1.id);
    this.initCol(curId2.id);
  },
  data() {
    return {
      dialogData: "",
      modalJudge: false,

      dataIndex: 0,
      xAxis: null,
      yAxis1: null,
      yAxis2: null,
      yAxis3: null,
      type: null,
      leftData: null,
      total: null
    };
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
    },

    // 审计项目
    projectCondition: {
      get: function() {
        return this.$store.state.projectCondition;
      },
      set: function(newVal) {
        this.$store.commit("newProjectCondition", newVal);
      }
    }
  },
  methods: {
    // 处理数据
    initChartData() {
      if (!this.chartData || JSON.stringify(this.chartData) == '"{}"') return;
      this.type = Array.from(new Set(this.chartData.x[1].data));
      this.xAxis = this.chartData.y.map((item, index) => {
        return item.name;
      });
      this.yAxis1 = [];
      this.yAxis2 = [];
      this.yAxis3 = [];
      this.chartData.x[0].data.map((item, index) => {
        if (item === this.currentPro) {
          this.chartData.y.map((items, indexs) => {
            let num = this.type.indexOf(this.chartData.x[1].data[index]);
            switch (num) {
              case 0:
                this.yAxis1.push(items.data[index]);
                break;
              case 1:
                this.yAxis2.push(items.data[index]);
                break;
              case 2:
                this.yAxis3.push(items.data[index]);
                break;
              default:
                break;
            }
          });
        }
      });

      this.leftData = [];
      let temp1 = this.yAxis1.reduce((pre, cur) => {
        return Number(pre) + Number(cur);
      });
      let temp2 = this.yAxis2.reduce((pre, cur) => {
        return Number(pre) + Number(cur);
      });
      let temp3 = this.yAxis3.reduce((pre, cur) => {
        return Number(pre) + Number(cur);
      });
      this.leftData = [temp1, temp2, temp3];
      this.total = temp1 + temp2 + temp3;
      this.projectCondition = Object.assign({}, this.projectCondition, {
        done: temp2,
        doing: temp1,
        beDoing: temp3,
        total: this.total
      });
    },

    initPie(curId) {
      const colorList = [
        "rgba(0,87,248,1)",
        "rgba(255,179,88,1)",
        "rgba(0,247,255,1)",
        "#FBD444",
        "#7F6AAD",
        "#585247"
      ];

      if (!curId) return;
      let chart = this.$echarts.init(document.getElementById(curId));
      chart.setOption({
        tooltip: {
          trigger: "item",
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
          formatter: "{b}<br />{a}: {c}"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "10%",
          itemGap: 64,
          itemWidth: 22,
          itemHeight: 40,
          data: this.type
            ? this.type.map((item, index) => {
                return {
                  name: item,
                  icon: "roundRect"
                };
              })
            : [
                {
                  name: "南京a",
                  icon: "roundRect"
                },
                {
                  name: "南京b",
                  icon: "roundRect"
                },
                {
                  name: "南京c",
                  icon: "roundRect"
                }
              ],
          textStyle: {
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 48
          }
        },
        color: colorList,
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: [120, 190],
            center: ["45%", "45%"],
            label: {
              show: false,
              formatter: "{b}",
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                lineHeight: 64,
                fontWeight: "bold",
                formatter: function(params) {
                  return (
                    "{type| " +
                    params.name +
                    "}  " +
                    "\n" +
                    "{value|" +
                    params.value +
                    "}"
                  );
                },
                rich: {
                  type: {
                    fontSize: 64,
                    color: "rgba(255,255,255,.7)",
                    padding: [15, 0, 5, 0]
                  },
                  value: {
                    fontSize: 66,
                    color: "#fff",
                    padding: [15, 0, 5, 0]
                  }
                }
              }
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "#082b3a"
            },
            data: this.leftData
              ? this.leftData.map((item, index) => {
                  return {
                    name: this.type[index],
                    value: item
                  };
                })
              : [
                  { name: "南京a", value: 100 },
                  { name: "南京b", value: 100 },
                  { name: "南京c", value: 100 }
                ]
          }
        ]
      });
      chart.on("click", params => {
        this.$store.commit("newDialogData", params.name);
        this.$store.commit("newDialogVisible", true);
      });
    },

    initCol(curId) {
      var spNum = 5,
        _max = this.total;
      var legendData = ["常住人口", "户籍人口", "农村人口", "城镇居民"];
      var y_data = ["经济责任", "工程", "财务收支", "营销管理", "人资管理"];
      var _data1 = [10, 15, 10, 13, 15],
        _data2 = [19, 5, 40, 33, 12],
        _data3 = [21, 55, 10, 13, 35];
      var fomatter_fn = function(v) {
        return ((v.value / _max) * 100).toFixed(0);
      };
      var _label = {
        normal: {
          show: false,
          position: "inside",
          formatter: fomatter_fn,
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        }
      };
      if (!curId) return;
      let chart = this.$echarts.init(document.getElementById(curId));
      chart.setOption({
        // legend: {
        //   data: legendData,
        //   textStyle: {
        //     color: "#ccc"
        //   }
        // },
        grid: {
          containLabel: true,
          top: "5%",
          left: 0,
          right: 15,
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
              "名称：" +
              p.seriesName +
              "<br>" +
              "完成：" +
              p.value +
              "<br>" +
              "占比：" +
              ((p.value / _max) * 100).toFixed(0) +
              "%"
            );
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)"
        },
        xAxis: {
          splitNumber: spNum,
          // interval: _max / spNum,
          // max: _max,
          axisLabel: {
            show: false
            // formatter: function(v) {
            //   var _v = ((v / _max) * 100).toFixed(0);
            //   return _v == 0 ? _v : _v + "%";
            // }
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
            data: this.xAxis ? this.xAxis : y_data,
            axisLabel: {
              fontSize: 56,
              textAlign: "left",
              padding: [0, 40, 0, 0],
              color: "rgba(255, 255, 255, 0.6)"
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
            data: this.xAxis ? this.xAxis : y_data,
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: this.type ? this.type[0] : "常住人口",
            stack: "2",
            label: _label,
            legendHoverLink: false,
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "rgba(0,87,248,1)"
              },
              emphasis: {
                color: "rgba(0,87,248,1)"
              }
            },
            data: this.yAxis1 ? this.yAxis1 : _data1
          },
          {
            type: "bar",
            name: this.type ? this.type[1] : "户籍人口",
            stack: "2",
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
              normal: {
                color: "rgba(255,179,88,1)"
              },
              emphasis: {
                color: "rgba(255,179,88,1)"
              }
            },
            data: this.yAxis2 ? this.yAxis2 : _data2
          },
          {
            type: "bar",
            stack: "2",
            name: this.type ? this.type[2] : "农村人口",
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
              normal: {
                color: "rgba(0,247,255,1)"
              },
              emphasis: {
                color: "rgba(0,247,255,1)"
              }
            },
            data: this.yAxis3 ? this.yAxis3 : _data3
          }
        ]
      });
    }
  },
  components: {
    "move-modal": MoveModal
  },
  watch: {
    chartData: function(newVal) {
      this.initChartData();
      let curId1 = this.ids[0];
      let curId2 = this.ids[1];
      this.initPie(curId1.id);
      this.initCol(curId2.id);
    },
    currentPro: function(newVal) {
      this.initChartData();
      let curId1 = this.ids[0];
      let curId2 = this.ids[1];
      this.initPie(curId1.id);
      this.initCol(curId2.id);
    }
  }
};
</script>

<style lang="less" scoped>
.pie-and-col {
  width: 100%;
  height: 100%;
  .inline-chart {
    display: inline-block;
    width: 50%;
    height: 100%;
  }
}
</style>