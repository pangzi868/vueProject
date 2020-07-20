<template>
  <div class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <single-line :ids='id' :chartData='chartData' />
    <single-stack :ids='idB' :chartData='chartDataB' />
    <div class="echarts w100" id='echarts09'>
    </div>
  </div>
</template>
<script>
import Filter from "../../../components/filter/Filter.vue";
import SingleLine from "../../../components/singleLine.vue";
import Stack from "../../../components/stack.vue";
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
        "echarts08"
      ],
      chartData: [
        {
          chartName: "表内持有产品分析-余额",
          type: "line",
          legend: [
            {
              name: "折人名币余额",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "表外持有产品分析-余额",
          type: "line",
          legend: [
            {
              name: "折人名币余额",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "表内持有产品分析-笔数",
          type: "line",
          legend: [
            {
              name: "交易笔数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "表外持有产品分析-笔数",
          type: "line",
          legend: [
            {
              name: "交易笔数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "表内持有产品分析-客户数",
          type: "line",
          legend: [
            {
              name: "客户数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "表外持有产品分析-客户数",
          type: "line",
          legend: [
            {
              name: "客户数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "持有账户及存款类产品分析-客户数",
          type: "line",
          legend: [
            {
              name: "客户数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
        {
          chartName: "持有现金管理产品分析-客户数",
          type: "line",
          legend: [
            {
              name: "客户数",
              icon: "roundRect"
            },
            {
              name: "去年同期",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        }
      ],
      idB: ["echarts10"],
      chartDataB: [
        {
          chartName: "交易银行保证金存款产品结构分析",
          type: "line",
          DrillDown: true
        }
      ],
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
      }
    };
  },

  mounted() {
    this.drawLineG("echarts09", 
      {
          chartName: "交易银行手续费收入结构分析",
          type: "line",
          legend: [
            {
              name: "余额",
              icon: "roundRect"
            },
            {
              name: "去年同期金额",
              icon: "roundRect"
            }
          ],
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
          DrillDown: true
        },
    );
  },
  methods: {
    drawLineG(ele, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele));
      // 绘制图表
      var a = data.chartName || "信贷客户数——表内";
      var b = "2019年01月25日";
      myChart.setOption({
        title: {
          text: [`{a|${a}  }`, `{b|${b}}`].join(""),
          textStyle: {
            rich: {
              b: {
                color: "gray",
                fontSize: "14"
              }
            }
          },
          itemGap: 10,
          margin: 10
        },
        legend: {
          bottom: 0,
          itemHeight: 8,
          itemWidth : 8,
          data:  data.legend || [
            {
              name: "折人民币余额",
              icon: "circle"
            },
            {
              name: "去年同期",
              icon: "circle"
            }
          ]
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
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666",
            align: "center",
            formatter: '{value} 万'
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
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
          data: data.yAxis||  [
            "3000万以上",
            "1000-3000万以上(含)",
            "500-1000以上(含)",
            "0-500万(含)"
          ]
        },
        series: [
          {
            name: data.legend && data.legend[0].name ||"折人民币余额",
            label: {
              show: true,
              color: "#666",
              position: "right",
              formatter: "{c}万"
            },
            type: "bar",
            data: [1203, 2034, 1489, 4970,3535,3435,344,234]
          },
          {
            name: data.legend && data.legend[1].name || "去年同期",
            label: {
              show: true,
              color: "#666",
              position: "right",
              formatter: "{c}万"
            },
            type: "bar",
            data: [1203, 2034, 1489, 4970,3535,3435,344,234]
          }
        ]
      });
    },
    getMsgFormSon(data) {
      this.msgFormSon = data;
      console.log(this.msgFormSon);
    }
  },
  components: {
    "v-filter": Filter,
    "single-line": SingleLine,
    "single-stack": Stack
  }
};
</script>