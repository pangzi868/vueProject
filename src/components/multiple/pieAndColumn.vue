<template>
  <div class="pie-and-col">
    <div class="span-top"></div>
    <div v-for="(item, index) in ids" :key="index" :id="item.id" class="inline-chart"></div>

    <!-- <move-modal
      v-if="modalJudge"
      id="1111"
      titlex="1111"
      :dialogJudge="modalJudge"
      :dialogData="dialogData"
    />-->
  </div>
</template>

<script>
import MoveModal from "@/components/moveModal.vue";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    // for (var i in this.ids) {
    let curId1 = this.ids[0];
    let curId2 = this.ids[1];
    this.initPie(curId1.id, this.chartData[curId1.name]);
    this.initCol(curId2.id, this.chartData[curId2.name]);
    // }
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
        "#47A2FF ",
        "#53C8D1",
        "#59CB74",
        "#FBD444",
        "#7F6AAD",
        "#585247"
      ];

      if (!curId) return;
      let chart = this.$echarts.init(document.getElementById(curId));
      chart.setOption({
        // title: {
        //   text: "Cluster",
        //   subtext: "3",
        //   textStyle: {
        //     fontSize: 16,
        //     color: "#FFF",
        //     lineHeight: 20
        //   },
        //   subtextStyle: {
        //     fontSize: 28,
        //     color: "#FFF"
        //   },
        //   textAlign: "center",
        //   left: "39.8%",
        //   top: "45%"
        // },
        tooltip: {
          trigger: "item"
        },
        legend: {
          //   type: "scroll",
          orient: "horizontal",
          right: "10%",
          top: "80%",
          //   itemGap: 30,
          //   selectedMode: false,
          //   icon: "pin",
          data: ["南京a", "南京b", "南京c", "南京d", "南京e"],
          textStyle: {
            color: "#FFF"
            // rich: {
            //   uname: {
            //     width: 100
            //   },
            //   unum: {
            //     color: "#4ed139",
            //     width: 40,
            //     align: "right"
            //   }
            // }
          }
          //   formatter(name) {
          //     return `{uname|${name}}{unum|1132}`;
          //   }
        },
        color: colorList,
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: [60, 90],
            center: ["45%", "40%"],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "#fff"
            },
            data: [
              { name: "南京a", value: 100 },
              { name: "南京b", value: 100 },
              { name: "南京c", value: 100 },
              { name: "南京d", value: 100 },
              { name: "南京e", value: 100 }
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
      var y_data = [
        "成都市",
        "绵阳市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市"
      ];
      var _datamax = [100, 100, 100, 100, 100, 100],
        _data1 = [10, 15, 10, 13, 15, 11],
        _data2 = [19, 5, 40, 33, 15, 51],
        _data3 = [21, 55, 10, 13, 35, 11],
        _data4 = [21, 55, 10, 13, 35, 11];
      var fomatter_fn = function(v) {
        return ((v.value / _max) * 100).toFixed(0);
      };
      var _label = {
        normal: {
          show: true,
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
          top: 0,
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
            // console.log(p);
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
          interval: _max / spNum,
          max: _max,
          axisLabel: {
            show: false,
            formatter: function(v) {
              var _v = ((v / _max) * 100).toFixed(0);
              return _v == 0 ? _v : _v + "%";
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
        yAxis: [
          {
            data: y_data,
            axisLabel: {
              fontSize: 16,
              color: "#fff"
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
                color: "#7E47FF"
              },
              emphasis: {
                color: "#7E47FF"
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
                color: "#FD5916"
              },
              emphasis: {
                color: "#FD5916"
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
                color: "#01A4F7"
              },
              emphasis: {
                color: "#01A4F7"
              }
            },
            data: _data3
          },
          {
            type: "bar",
            stack: "2",
            name: "城镇居民",
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
              normal: {
                color: "#2EDDCD"
              },
              emphasis: {
                color: "#2EDDCD"
              }
            },
            data: _data4
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
  .span-top {
    height: 15%;
    width: 100%;
  }
  .inline-chart {
    display: inline-block;
    width: 50%;
    height: 85%;
  }
}
</style>