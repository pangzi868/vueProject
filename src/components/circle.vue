<template>
<div>
  <div v-for="(item) in ids" :class="[item.width?'echarts w100 '+item.width:'echarts w100']" :key="item.id" :id="item.id">
  </div>
</div>
</template>

<script>
export default {
  name: "bar",
  props: ["chartData", "ids"],
  data() {
    return {};
  },
  mounted() {
    for (let i in this.ids) {
      this.drawLineC(this.ids[i].id, this.chartData[i]);
    }
  },
  methods: {
    drawLineC(ele, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = data.filterParams.indexOf('time')?'': "2019年01月25日";
      // 圆

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
        color: data.color ||["#0078d7", "#92A956", "#367F55", "#C49C2B"],
        legend: {
          orient: "vertical",
          x: "right",
          icon: "circle",
          data: data.legend || [
            "小企业D类客户",
            "小企业C类客户",
            "小企业B类客户",
            "小企业A类客户"
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
          top: 60,
          bottom: "18%",
          left: "10%",
          right: "10%",
          borderWidth: 1
        },

        series: [
          {
            type: "pie",
            avoidLabelOverlap: false,
            radius: "60%",
            center: ["50%", "60%"],
            labelLine: {
              show: true,
              length: 10,
              length2: 50,
              position: "outside",
              formatter: "{a}%"
            },
            itemStyle: {
              c: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data:  data.series&& data.series || [
              {
                value: 335,
                name: data.legend && data.legend[0].name || "小企业D类客户"
              },
              {
                value: 310,
                name: data.legend && data.legend[1].name || "小企业C类客户"
              },
              {
                value: 234,
                name: data.legend && data.legend[2].name || "小企业B类客户"
              },
              {
                value: 135,
                name: data.legend && data.legend[3].name || "小企业A类客户"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
