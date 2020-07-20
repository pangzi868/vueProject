<template>
<div  class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <v-bar :ids='id' :chartData='getChartData' />
    <div class="box">
      <div class="echarts w50 axis" id='echarts03'></div>
      <div class="echarts w50 axis" id='echarts04'></div>
    </div>
    <v-axis :ids='idB' :chartData='getChartDataB' />
    <single-line :ids='idC' :chartData='getChartDataC' />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import AxisCharts from "../../components/axisChartsSecond.vue";
import Bar from "../../components/barThird.vue";
import SingleLine from "../../components/singleLineSecond";
export default {
  mounted() {
    this.drawLineC("echarts03", { chartName: "客户类型细分" });
    this.drawLineD("echarts04", { chartName: "五级分类-贷款余额",yAxis: ['贷款余额'] });
  },
  data() {
    return {
      allData: [
        {
          chartName: "行业分布",
          noCompany: true,
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "所属行业分布",
          noCompany: true,
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [{ id: "echarts01" }, { id: "echarts02" }],
      allDataB: [
        {
          chartName: "活期存款日均区间",
          legend: [
            {
              name: "活期年日均存款余额",
              icon: "circle"
            },
            {
              name: "客户数",
              icon: "circle"
            }
          ],
          yA: ["活期年日均存款余额", "客户数"],
        },
        {
          chartName: "贷款余额区间",
          legend: [
            {
              name: "总贷款余额",
              icon: "circle"
            },
            {
              name: "客户数",
              icon: "circle"
            }
          ],
          yA: ["总贷款余额", "客户数"],
        }
      ],
      idB: [{ width: "w50", id: "echarts05" },
        { width: "w50", id: "echarts06" }],
      allDataC: [
        {
          chartName: "注册资金区间",
          type: "line",
          xAxisName: "客户数"
        },
        {
          chartName: "上年度缴税收入区间",
          type: "line",
          xAxisName: "客户数"
        },
      ],
      idC: ["echarts07", "echarts09"],
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
        ],
        customType: [
          { key: "01", value: "有效结算客户" },
          { key: "02", value: "考核客户" },
          { key: "03", value: "已准入无贷户客户" },
        ],
        industry: [
          { key: "01", value: "金融业" },
          { key: "02", value: "服装制造业" },
          { key: "03", value: "房地产开发业" },
        ],
        scale: [
          { key: "01", value: "大中型企业" },
          { key: "02", value: "小型企业" },
        ],

      }
    };
  },
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index]);
        return pre;
      }, []);
    },
    getChartDataB() {
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index]);
        return pre;
      }, []);
    },
    getChartDataC() {
      return this.idC.reduce((pre, item, index) => {
        pre.push(this.allDataC[index]);
        return pre;
      }, []);
    }
  },
  methods: {
    drawLineC(ele, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = "2019年01月25日";
      // 柱状图 无legend
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
          margin: 10,
          subtext: ["{b|8,676}", "{c|总计}"].join("\n"),
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
        color: ["#0078d7", "#e5b322"],
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
                    "k" +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "k</span>";
            }
            return str + "</div>";
          }
        },
        grid: {
          top: 160,
          bottom: 60,
          left: "18%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666",
            rotate: 45
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          data: [
            "2018年1月",
            "2018年2月",
            "2018年3月",
            "2018年4月",
            "2018年5月",
            "2018年6月",
            "2018年7月",
          ]
        },
        yAxis: {
          name: "客户数",
          nameRotate: 90,
          nameLocation: "middle",
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
            formatter: "{value}k"
          }
        },
        series: [
          {
            name: "客户数1",
            type: "bar",
            itemStyle: {
              color: "#0078d7"
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666"
                // formatter: "{c}亿"
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
            ]
          }
        ]
      });
    },
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
        color: ["#0078d7", "#BFAA3F", "#3B63AB"],
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
          top: 140,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: ["正常", "关注", "次级", "可疑类", "损失类"]
        },
        yAxis: {
          name: data.yAxis && data.yAxis[0] || "保证金存款产品",
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
            name: "贷款余额",
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
    "v-bar": Bar,
    "v-axis": AxisCharts,
    "single-line": SingleLine
  }
};
</script>
<style lang="less">
.box {
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-between; /* Safari 6.1+ */
  justify-content: space-between;
}
</style>
