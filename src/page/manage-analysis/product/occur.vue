<template>
  <div class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <single-line :ids='id' :chartData='chartData' />
    <div class="echarts w100" id='echarts11'>
    </div>
  </div>
</template>
<script>
import Filter from "../../../components/filter/Filter.vue";
import SingleLine from "../../../components/singleLineSecond.vue";
export default {
  data() {
    return {
      id: [
        "echarts01",
        "echarts02",
        "echarts03",
        "echarts04",
        "echarts05",
        "echarts06",
        "echarts07",
        "echarts08",
        "echarts09",
        "echarts10"
      ],
      chartData: [
        {
          chartName: "表内产品发生额",
          type: "line",
          xAxisName: "发生额",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "表外产品发生额",
          type: "line",
          xAxisName: "发生额",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "表内产品发生笔数",
          type: "line",
          xAxisName: "笔数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "表外产品发生笔数",
          type: "line",
          xAxisName: "笔数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "表内产品发生额客户数",
          type: "line",
          xAxisName: "客户数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "表外产品发生额客户数",
          type: "line",
          xAxisName: "客户数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "中间业务产品发生客户数",
          type: "line",
          xAxisName: "客户数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "中间业务产品发生笔数",
          type: "line",
          xAxisName: "笔数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "账户及存款产品开户客户数",
          type: "line",
          xAxisName: "客户数",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        },
        {
          chartName: "现金管理产品签约客户数",
          type: "line",
          xAxisName: "发生额",
          DrillDown: true,
          yAxis: [
            "进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"
          ],
        }
      ],
      chartDataB: [{ chartName: "中间业务产品发生额", type: "line", DrillDown: true }],
      filterParams: {
        org: [
          { key: "1", value: "鼓楼支行" },
          { key: "2", value: "江宁区支行" },
          { key: "3", value: "建邺区支行" },
          { key: "4", value: "浦口区支行" },
          { key: "5", value: "六合区支行" },
          { key: "6", value: "雨花台支行" }
        ],
        time: [
          { key: "01", value: "2019年01月25日" },
          { key: "02", value: "2019年02月25日" },
          { key: "03", value: "2019年03月25日" },
          { key: "04", value: "2019年04月25日" },
          { key: "05", value: "2019年05月25日" },
          { key: "06", value: "2019年06月25日" }
        ]
      },
      echartState: {} // 标识 图表是否已经下钻
    };
  },
  mounted() {
    this.drawLineG("echarts11", {
      chartName: "中间业务产品发生额",
      type: "line",
      DrillDown: true,
      yAxis: ["进口代付",
            "流动资金贷款外币",
            "国内保健",
            "国内订单融资",
            "进口汇押",
            "出口汇押",
            "国际订单融资",
            "打包贷款"]
    });
    this.renderChartState('echarts11', this.chartDataB[0]);
  },
  methods: {
    drawLineG(ele, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele));
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
                  image: require("../../../assets/images/DrillDown.svg")
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
          name: "客户数",
          nameLocation: "center",
          nameTextStyle: {
            color: "#000"
          },
          nameGap: 25,
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#000",
            align: "center",
            formatter: '{value} 万'
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
          data: data.yAxis ||  [
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
            data: [1203, 2034, 1489, 4970,1203, 2034, 1489, 4970]
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
    getMsgFormSon(data) {
      this.msgFormSon = data;
      console.log(this.msgFormSon);
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
        
        this.drawLineG(ele[0], data);
      });
    }
  },
  components: {
    "v-filter": Filter,
    "single-line": SingleLine
  }
};
</script>