<template>
<div>
  <div class="echarts w100 axis" v-for="(item) in ids" :key="item" :id='item'></div>
</div>
</template>

<script>
import GD from '../assets/images/GD.svg'
import { setTimeout } from 'timers';
export default {
  name: "axis",
  props: ['chartData', 'ids'],
  mounted() {
    for (let i in this.ids) {
      this.drawLineA(this.ids[i], this.chartData[i])
      this.renderChartState(this.ids[i], this.chartData[i]);
    }
  },
  data() {
    return {
      todos: [],
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  methods: {
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
    calculateMax(e, type) {
      var arr = [];
      e.forEach(el => {
        arr.push(el[type]);
      });
      return arr.indexOf(Math.max.apply(null, arr)) || 0;
    },
   
    // 针对三种图例 legend.length = 3
    drawLineA(id, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "贷款客户数和余额趋势";
      var b = data.filterParams.indexOf('time') > -1 ?"2019年01月25日":'';
      myChart.setOption({
        title: {
          text: [data.DrillDown?`{c|}`:'',`{a|${a}  }`, `{b|${b}}`].join(""),
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
                fontSize: "14",
              }
            }
          }
        },
        color: ["#5182E4", "#F7CB4A", "#F27B7A"],
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          data: data.legend ||  [{
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "roundRect"
            },
            {
              name: "贷款客户数",
              icon: "roundRect"
            }
          ],
          itemHeight: 8,
          itemWidth : 8,
          align: "left",
          top: 30,
          
        },
        tooltip: {
          trigger: "axis",
          formatter: function (option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0 ?
                '<span style="color:#000">' +
                option[i].name +
                "</span>" +
                "<br/>" +
                `<span style="color: ${option[i].color}" >` +
                option[i].seriesName +
                ": " +
                option[i].value +
                "亿" +
                "</span>" +
                "<br/>" :
                `<span style="color: ${option[i].color}" >` +
                option[i].seriesName +
                ": " +
                option[i].value +
                "亿</span>" +
                "<br/>";
            }
            return str + "</div>";
          }
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          top: 60,
          bottom: 20,
          left: "10%",
          right: "10%",
          borderWidth: 1,
        },
        xAxis: {
          axisLabel:{ //刻度标签文字的颜色
            show: true,
            color:'#666'
          },
          axisLine: {
            lineStyle: {
              color: '#666',
            }
          },
          data: data.xAxis || [
            "2018年1月",
            "2018年2月",
            "2018年3月",
            "2018年4月",
            "2018年5月",
            "2018年6月"
          ]
        },
        yAxis: [{
            name: data.legend &&data.legend[0].name||"贷款余额",
            // nameRotate: 90,
            // nameLocation: "middle",
            // nameGap: "40",
            nameTextStyle: {
              label: {
                formatter: function (value) {
                  return '{a|}'+'{' + value + '| }';
                },
                rich: {
                  a: {
                    width: 20,
                    height: 20,
                    display: 'inline-block',
                    backgroundColor: {
                      image: require('../assets/images/GD.svg')
                    }
                  }
                }
              },
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
              formatter: "{value}亿"
            }
          },
          {
            name: data.legend &&data.legend[2].name|| "贷款客户数",
            // nameRotate: 270,
            // nameLocation: "middle",
            // nameGap: "40",
            
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
              formatter: "{value}k"
            }
          }
        ],
        series: [{
            name: data.legend &&data.legend[0].name|| "贷款余额",
            type: data.series&&data.series[0].type||"bar",
            label: {
              normal: {
                show: true,
                color: "#fff",
                formatter: "{c}亿"
              }
            },
            data: data.series && data.series[0].data || ["5", "20", "36", "10", "10", "20"]
          },
          {
            name: data.legend &&data.legend[1].name||"全行贷款余额",
            type: data.series&&data.series[1].type||"bar",
            label: {
              show: true,
              color: "#666",
              formatter: "{c}亿"
            },
            data: data.series && data.series[1].data || ["7", "22", "46", "40", "20", "30"]
          },
          {
            name: data.legend &&data.legend[2].name||"贷款客户数",
            type: data.series&&data.series[2].type||"line",
            label: {
              show: true,
              color: "#666",
              formatter: "{c}亿"
            },
            yAxisIndex: 1,
            data: data.series && data.series[2].data || ["50", "200", "360", "100", "100", "200"]
          }
        ]
      });
      myChart.on("click", function(params) {
          if( !_this.echartState[id].chartData.DrillDown ) {
            return
          }
          if (params.componentType === "title" && _this.echartState[id].state) {
            _this.drawLineA(id, _this.echartState[id].chartData);
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
        this.drawLineA(ele[0], data);
      });
    },
    // 数组排序或 对象数组排序
    sortByValue(arr, value) {
      arr.sort(function (x, y) {
        const m = (value && x[value]) || x,
          n = (value && y[value]) || y;
        return n - m;
      });
      return arr;
    },
  }
};
</script>

<style>

</style>
