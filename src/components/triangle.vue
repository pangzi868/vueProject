<template>
    <div class="echarts w100" id="echarts-f"></div>
</template>

<script>
export default {
  name: "home",
  components: {},
  mounted() {
    this.drawLineF();
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
    drawLineF() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("echarts-f"));
      // 绘制图表
      var a = "公司客户结构";
      var b = "2019年10月";
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
          }
        },
        color: ["#B03F13", "#BC7718", "#C8B72C", "#70932F"],
        legend: {
          orient: "vertical",
          right: 100,
          top: 40,
          data: [
            "交易银行考核客户",
            "交易银行有效客户",
            "优先结算客户",
            "公司客户"
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: function(option) {
            var str =
              "<div class='echart-shadow tool-tip'>" +
              `<span style="color: ${option.color}" >` +
              option.name +
              ": " +
              option.value +
              "</span><br/>" +
              `<span style="color:gray"> 占比: ` +
              option.percent +
              "%" +
              "</span>";
            return str + "</div>";
          }
        },
        grid: {
          top: "200",
          bottom: "200",
          left: "100",
          right: "100",
          borderWidth: 1
        },
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "25%",
            rotate: 180,
            top: 60,
            bottom: 60,
            width: "40%",
            height: "70%",
            sort: "ascending",
            gap: 4,
            label: {
              show: true,
              position: "inside",
              fontSize: 10,
              formatter: "{c}"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 60, name: "交易银行考核客户" },
              { value: 40, name: "交易银行有效客户" },
              { value: 20, name: "优先结算客户" },
              { value: 80, name: "公司客户" }
            ]
          }
        ]
      });
    },
  }
};
</script>

<style>

</style>
