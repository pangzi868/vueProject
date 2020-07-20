<template>
<div>
  <div v-for="(item) in ids" class="echarts w100" :id="item" :key="item">
  </div>
</div>
</template>

<script>
export default {
  name: "bar",
  props: ["chartData", "ids"],
  data() {
    return {
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  mounted() {
    for (let i in this.ids) {
      this.drawLineC(this.ids[i], this.chartData[i]);
      this.renderChartState(this.ids[i], this.chartData[i]);
    }
  },
  methods: {
    // 于bar.vue 差异： 不带 总计 数值
    drawLineC(id, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = data.filterParams.indexOf('time')?'':"2019年01月25日";
      // 柱状图
      var option = {
        title: {
          text: [ data.DrillDown?`{c|}`:'', `{a|${a}  }`, `{b|${b}}`].join(""),
          triggerEvent: true,
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
          margin: 10
        },
        color: ["#0078d7", "#e5b322"],
        legend: {
          top: 30,
          itemHeight: 8,
          itemWidth : 8,
          data: data.legend || [
            {
              name: "客户数1",
              icon: "circle"
            },
            {
              name: "客户数2",
              icon: "roundRect"
            }
          ]
        },
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            let company = data.noCompany ? '':"万"
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
                    company +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    `${company}</span>`;
            }
            return str + "</div>";
          }
        },
        grid: {
          top: 140,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666",
            rotate: 45,
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          data:  data.xAxis || [
            "2018年1月",
            "2018年2月",
            "2018年3月",
            "2018年4月",
            "2018年5月",
            "2018年6月",
            "2018年7月",
            "2018年8月",
            "2018年9月",
            "2018年10月",
            "2018年11月"
          ]
        },
        yAxis: {
          name: data.yAxis && data.yAxis[0] || "客户数",
          nameGap: "80",
          nameTextStyle: {
            width: "200",
            height: "200",
            backgroundColor: {
              image: "../assets/images/logo.png"
            }
          },
          splitLine: {
            show: false
          },

          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // formatter: "{value}万"
            formatter: function(value) {
                  let Company = data.noCompany ? '':'亿'
                  return value + Company
            }
          }
        },
        series: [
          {
            name: (data.legend && data.legend[0].name) || "客户数1",
            type: "bar",
            itemStyle: {
              color: "#0078d7"
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666",
                // formatter: "{c}万"
                formatter: function(value) {
                  let Company = data.noCompany ? '':'亿'
                  return value.data + Company
                }
              }
            },
            data: [
              "5",
              "20",
              "36",
              "10",
              "10",
              "20",
              "36",
              "10",
              "10",
              "20",
              "30"
            ]
          },
          {
            name: (data.legend && data.legend[1].name) || "客户数2",
            type: "bar",
            itemStyle: {
              color: "#e5b322"
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666"
              }
            },
            data: ["", "", "", "", "", "", "", "18", "45", "2", "15"]
          }
        ]
      }
      myChart.setOption(option);

      myChart.on("click", function(params) {
        if( !_this.echartState[id].chartData.DrillDown ) {
          return
        }
        if (params.componentType === "title" && _this.echartState[id].state) {
          _this.drawLineC(id, _this.echartState[id].chartData);
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
        chartData: data,
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
            "01月06日"
          ]
        };
        
        this.drawLineC(ele[0], data);
      });
    }
  }
};
</script>
