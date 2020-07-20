<template>
<div class="single-line">
  <div class="echarts w50" v-for="(item) in ids" :key="item" :id="item"></div>
</div>
</template>

<script>
export default {
  name: "singleLine",
  props: {
    ids: {
      type: Array,
      default() {
        return ["echarts-g"];
      }
    },
    chartData: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  mounted() {
    for (let i in this.ids) {
      this.drawLineG(this.ids[i], this.chartData[i]);
      this.renderChartState(this.ids[i], this.chartData[i]);
    }
  },
  methods: {
    calculateMax(e, type) {
      var arr = [];
      e.forEach(el => {
        arr.push(el[type]);
      });
      return arr.indexOf(Math.max.apply(null, arr)) || 0;
    },
    sortByValue(arr, value) {
      arr.sort(function(x, y) {
        const m = (value && x[value]) || x,
          n = (value && y[value]) || y;
        return n - m;
      });
      return arr;
    },
    drawLineG(id, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "信贷客户数——表内";
      var b = "2018年12月31日";
      myChart.setOption({
        title: {
          text: [data.DrillDown?`{c|}`:'',`{a|${a}  }`, `{b|${b}}`].join(""),
          textStyle: {
            rich: {
              c: {
                backgroundColor: {
                  image: require("../assets/images/DrillDown.svg")
                },
                height: 20,
                width: 20
              },
              b: {
                color: "gray",
                fontSize: "14"
              }
            }
          },
          itemGap: 10,
          margin: 10,
          subtext: ["{b|9,205万}", "{c|总计}"].join("\n"),
          subtextStyle: {
            rich: {
              b: {
                color: "gray",
                fontSize: "34",
                fontFamily: "",
                fontWeight: "100"
              },
              c: {
                color: "gray",
                fontSize: "14"
              }
            }
          }
        },
        color: ["#C98531", "#0177a9"],
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0
                  ? '<span style="color:#666">' +
                    option[i].name +
                    "</span>" +
                    "<br/>" +
                    `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "亿" +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "亿</span>" +
                    "<br/>";
            }
            return str + "</div>";
          }
        },
        grid: {
          left: "30%"
        },
        xAxis: {
          type: "value",
          name: data.xAxisName || '',
          nameLocation:'center',
          nameTextStyle: {
            color: '#000',
          },
          nameGap: 25,
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#000",
            align: "center"
            // formatter: '{value} 万'
          },
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          },
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666"
          },
          axisLine: {
            show: true,
            color: "#ccc" //刻度线的颜色
          },
          data:  data.yAxis || [
            "3000万以上",
            "1000-3000万以上(含)",
            "500-1000以上(含)",
            "0-500万(含)"
          ]
        },
        series: [
          {
            name: "折人民币余额",
            label: {
              show: true,
              color: "#666",
              position: "right",
              formatter: "{c}万"
            },
            type: "bar",
            data: [1203, 2034, 1489, 4970, 1203, 2034, 1489, 4970]
          }
        ]
      });
      myChart.on("click", function(params) {
        if( !_this.echartState[id].chartData.DrillDown ) {
          return
        }
        if (params.componentType === "title" && _this.echartState[id].state) {
          _this.drawLineG(id, _this.echartState[id].chartData);
          _this.changeEchartState(id);
          return;
        } else if (_this.echartState[id].state) {
          // 阻止重复下钻
          return;
        } else if (
          params.componentType !== "title" &&
          !_this.echartState[id].state
        ) {
          // 下钻
          _this.getNextData(id, params, data);
          _this.changeEchartState(id);
        }
      });
    },
    renderChartState(el, data) {
      // 保存第一次渲染的图表下钻状态和chartData
      var self = this,
        b_tmp = self.echartState;
      b_tmp[el] = {
        state: false,
        chartData: data
      };
      self.echartState = b_tmp;
    },
    changeEchartState(id) {
      var self = this,
        b_tmp = self.echartState;
      b_tmp[id].state = !this.echartState[id].state;
      self.echartState = b_tmp;
    },
    getNextData(...ele) {
      this.axios({
        url: "",
        method: "get",
        data: {
          results: 10
        },
        type: "json"
      }).then(data => {
        var data = {
          chartName: ele[2].chartName,
          xAxis: [
            "01月01日",
            "01月02日",
            "01月03日",
            "01月04日",
            "01月05日",
            "01月06日",
            "01月07日",
            "01月08日",
            "01月09日",
            "01月10日",
            "01月11日"
          ]
        };
        
        this.drawLineC(ele[0], data);
      });
    }
  }
};
</script>

<style lang="less">
.single-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
}

.ts-mc {
  padding: 10px;
}

.w70 {
  width: 70%;
  height: 300px;
}

.w50 {
  margin: 2px -2px;
  width: 50%;
  height: 400px;
}

.w100 {
  height: 400px;
}
</style>
