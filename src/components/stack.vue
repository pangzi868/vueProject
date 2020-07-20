<template>
    <div>
      <div class="echarts w100" v-for="(item) in ids" :key="item" :id="item"></div>
    </div>
</template>

<script>
export default {
  name: "stack",
  props: ["chartData", "ids"],
  mounted() {
    for (let i in this.ids ) {
      this.drawLineD(this.ids[i],this.chartData[i]);
      this.renderChartState(this.ids[i], this.chartData[i]);
    }
  },
  data() {
    return {
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  methods: {
    calculateMax(e, type) {
      var arr = [];
      e.forEach(el => {
        arr.push(el[type]);
      });
      return arr.indexOf(Math.max.apply(null, arr)) || 0;
    },
    // 数组排序或 对象数组排序
    sortByValue(arr, value) {
      arr.sort(function(x, y) {
        const m = (value && x[value]) || x,
          n = (value && y[value]) || y;
        return n - m;
      });
      return arr;
    },
    drawLineD( id, data ) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = "交易银行保证金存款产品结构分析";
      var b = "2019年01月25日 ";
      myChart.setOption({
        title: {
          text: [ data.DrillDown?`{c|}`:'',`{a|${a}  }`, `{b|${b}}`].join(""),
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
          data: [
            { name: "存单质压余额", icon: "circle" },
            { name: "保证金余额", icon: "circle" }
          ],
          align: "left",
          bottom: 10
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
          top: 160,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: [
            "进出口代付",
            "进口信用证",
            "口信用余额",
            "保兑仓",
            "进口押汇",
            "出口押汇",
            "融资性保函",
            "非融资性保函"
          ]
        },
        yAxis: {
          name: "保证金存款产品",
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
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            formatter: "{value}亿"
          }
        },
        series: [
          {
            name: "存单质压余额",
            type: "bar",
            stack: "余额",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#000",
                formatter: "{c}亿"
              }
            },
            data: ["5", "20", "36", "10", "10", "20", "36", "20"]
          },
          {
            name: "保证金余额",
            type: "bar",
            stack: "余额",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#000",
                formatter: "{c}亿"
              }
            },
            data: ["5", "20", "36", "10", "10", "20", "36", "79"]
          }
        ]
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
        
        this.drawLineD(ele[0], data);
      });
    }
  }
};
</script>

<style>


</style>
