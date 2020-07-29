<template>
  <div class="pie-and-col">
    <div v-for="(item, index) in ids" :key="index" :id="item.id" class="inline-chart"></div>
  </div>
</template>

<script>
import MoveModal from "@/components/moveModal.vue";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    let curId1 = this.ids[0];
    let curId2 = this.ids[1];
    this.initPie(curId1.id, this.chartData[curId1.name]);
    this.initCol(curId2.id, this.chartData[curId2.name]);
  },
  data() {
    return {
      dialogData: "",
      modalJudge: false
    };
  },
  computed: {},
  methods: {
    initPie(curId, curData) {
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
          trigger: "item"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "10%",
          itemGap: 64,
          itemWidth: 22,
          itemHeight: 40,
          data: [
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
            fontSize: 44
          }
        },
        color: colorList,
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: [160, 190],
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
            data: [
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

    initCol(curId, curData) {
      var spNum = 5,
        _max = 100;
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
          backgroundColor: "#fff",
          borderColor: "#ddd",
          borderWidth: 1,
          textStyle: {
            color: "#3c3c3c",
            fontSize: 16
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
            data: y_data,
            axisLabel: {
              fontSize: 32,
              textAlign: "left",
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
            data: y_data,
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: "常住人口",
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
            data: _data1
          },
          {
            type: "bar",
            name: "户籍人口",
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
            data: _data2
          },
          {
            type: "bar",
            stack: "2",
            name: "农村人口",
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
            data: _data3
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
      let curId1 = this.ids[0];
      let curId2 = this.ids[1];
      this.initPie(curId1.id, this.chartData[curId1.name]);
      this.initCol(curId2.id, this.chartData[curId2.name]);
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