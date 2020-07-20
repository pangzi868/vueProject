<template>
  <div>
  <div class="echarts w100" v-for="(item) in ids" :key="item.id" :id='item.id'></div>
  </div>
</template>

<script>
export default {
  name: "debt",
  props: ["chartData", "ids"],
  data() {
    return {
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  mounted() {
    for (let i in this.ids) {
      this.drawLineH(this.ids[i].id, this.chartData[i]);
      this.renderChartState(this.ids[i].id, this.chartData[i]);
    }
  },
  methods: {
    drawLineH(id, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "";
      var b = data.filterParams.indexOf('time')?'':"2019年01月25日";
      myChart.setOption({
        title: {
          text: [data.DrillDown?`{c|}`:'', `{a|${a} }`, `{b|${b}}`].join(""),
          triggerEvent: true,
          textStyle: {
            rich: {
              c: {
                backgroundColor: {
                  image: require("../../assets/images/DrillDown.svg")
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
          margin: 10
        },
        color: ["#0078d7", "#e5b322"],
        legend: {
          data: data.legend || [
            { name: "活期存款时余额" },
            { name: "一般性存款时点余额" }
          ],
          orient: "vertical",
          align: "left",
          top: 60,
          height: 4,
          width: 4,
          itemHeight: 8,
          itemWidth : 8,
        },
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0
                  ? '<span style="color:#000">' +
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
                    "亿" +
                    "</span>";
            }
            return str + "</div>";
          }
        },
        grid: {
          top: 100,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666"
          },
          axisLine: {
            lineStyle: {
              color: "#666"
            }
          },
          data: data.xAxis || [
            "2018年01月",
            "2018年02月",
            "2018年03月",
            "2018年04月",
            "2018年05月",
            "2018年06月",
            "2018年07月",
            "2018年08月",
            "2018年09月",
            "2018年10月",
            "2018年11月"
          ]
        },
        yAxis: {
          name: data.yAxis&& data.yAxis[0] || "时点余额",
          // nameRotate: 90,
          // nameLocation: "middle",
          // nameGap: "80",
          // nameTextStyle: {
          //   width: "200",
          //   height: "200",
          //   backgroundColor: {
          //     image: "../assets/images/logo.png"
          //   }
          // },
          // min: "10",
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
            formatter: "{value}亿"
          }
        },
        series: [
          {
            name: (data.legend && data.legend[0].name) || "活期存款时余额",
            type: "line",
            label: {
              normal: {
                show: true,
                color: "#666",
                formatter: "{c}亿"
              }
            },
            data: [
              "50",
              "25",
              "36",
              "20",
              "100",
              "60",
              "55",
              "77",
              "10",
              "20",
              "30"
            ]
          },
          {
            name: (data.legend && data.legend[1].name) || "一般性存款时点余额",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#666",
                formatter: "{c}亿"
              }
            },
            data: [
              "5",
              "20",
              "36",
              "10",
              "10",
              "22",
              "36",
              "79",
              "233",
              "54",
              "200"
            ]
          }
        ]
      });

      myChart.on("click", function(params) {
        if( !_this.echartState[id].chartData.DrillDown ) {
          return
        }
        if (params.componentType === "title" && _this.echartState[id].state) {
          _this.drawLineH(id, _this.echartState[id].chartData);
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
          ],
          filterParams:['time']
        };
        this.drawLineH(ele[0], data);
      });
    }
  }
};
</script>
<style lang="less">
.w100 {
  height: 400px;
}
</style>

