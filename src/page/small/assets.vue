<template>
<div class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <v-card :card-data="getChartData" :ids="id" />
    <div style="padding:2px 0">
      <div class="echarts w100 axis" v-for="(item) in idB" :key="item" :id='item'></div>
    </div>
    <single-line :ids='idC' :chartData='allDataC' />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import SingleLine from "../../components/singleLineSecond.vue";
import Card from "../../components/card";
export default {
  mounted() {
    for (let i in this.idB) {
      this.drawLineD(this.idB[i], this.allDataB[i]);
    }
  },
  data() {
    return {
      allData: [
        {
          chartName: "贷款时点",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "贷款客户数",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [
        { width: "w50", value: "echarts01" },
        { width: "w50", value: "echarts02" }
      ],
      allDataB: [
        {
          chartName: "信贷客户数(表内)",
          yAxis:[ '信贷客户数'] ,
          legend:[{
              name: "个经贷款客户数",
              icon: "roundRect"
            },
            {
              name: "鑫伙伴客户数",
              icon: "roundRect"
            },
            {
              name: "非鑫伙伴客户数",
              icon: "circle"
            }],
          money: Math.floor(Math.random() * 100000),
          xAxis: [
            '2019年01月',
            '2019年02月',
            '2019年03月',
            '2019年04月',
            '2019年05月',
            '2019年06月',
          ]
        },
        {
          chartName: "信贷资产余额(表内)",
          yAxis:[ '信贷资产余额'] ,
          legend:[{
              name: "个经贷款客户数",
              icon: "roundRect"
            },
            {
              name: "鑫伙伴客户数",
              icon: "roundRect"
            },
            {
              name: "非鑫伙伴客户数",
              icon: "circle"
            }],
          xAxis: [
            '2019年01月',
            '2019年02月',
            '2019年03月',
            '2019年04月',
            '2019年05月',
            '2019年06月',
          ],
          money: Math.floor(Math.random() * 100000)
        }
      ],
      idB: ["echarts03", "echarts04"],
      allDataC: [
        {
          chartName: "信贷客户数(表内)",
          legend:[{
              name: "个经贷款客户数",
              icon: "roundRect"
            },
            {
              name: "鑫伙伴客户数",
              icon: "roundRect"
            },
            {
              name: "非鑫伙伴客户数",
              icon: "circle"
            }],
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "信贷资产余额(表内)",
          money: Math.floor(Math.random() * 100000),
          legend:[{
              name: "个经贷款客户数",
              icon: "roundRect"
            },
            {
              name: "鑫伙伴客户数",
              icon: "roundRect"
            },
            {
              name: "非鑫伙伴客户数",
              icon: "circle"
            }],
        }
      ],
      idC: ["echarts05", "echarts06"],
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
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index]);
        return pre;
      }, []);
    }
  },
  methods: {
    drawLineD(id, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = data.filterType || "2019年01月25日 ";
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
        color: ["#2F8156", "#BFAA3F", "#3B63AB"],
        legend: {
          data: data.legend,
          align: "left",
          top: 30,
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
          top: 160,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: data.xAxis ||  [
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
          name: data.yAxis && data.yAxis[0] ||"保证金存款产品",
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
            name: data.legend&&data.legend[0].name || "贷款余额",
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
            name: data.legend&&data.legend[1].name || "全行贷款余额",
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
          },
          {
            name: data.legend&&data.legend[2].name ||"贷款客户数",
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
    getMsgFormSon(data) {
      this.msgFormSon = data;
      console.log(this.msgFormSon);
    }
  },
  components: {
    "v-filter": Filter,
    "single-line": SingleLine,
    "v-card": Card
  }
};
</script>
