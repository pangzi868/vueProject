<template>
<div class="circle-line">
  <div class="echarts w50" v-for="(item) in ids" :key="item" :id="item"></div>
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
      this.drawLineB(this.ids[i], this.chartData[i]);
    }
  },
  methods: {
    // 数组排序或 对象数组排序
    sortByValue(arr, value) {
      arr.sort(function(x, y) {
        const m = (value && x[value]) || x,
          n = (value && y[value]) || y;
        return n - m;
      });
      return arr;
    },
    drawLineB(id,data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "贷款余额五级分类-余额";
      var b = "2019年01月25日 五级客户";
      var c = [
        { value: 335, name: "正常类余额" },
        { value: 310, name: "关注类余额" },
        { value: 1548, name: "损失类余额" },
        { value: 234, name: "次级类余额" },
        { value: 135, name: "可疑类余额" }
      ];
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
        color: ["#0078d7", "#e5b322"],
        legend: {
          orient: "vertical",
          x: "right",
          icon: "circle",
          data: [
            "正常类余额",
            "关注类余额",
            "次级类余额",
            "可疑类余额",
            "损失类余额"
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
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },

        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                formatter: ["{bt|{b}}", "{num|{d}%}"].join("\n"),
                rich: {
                  bt: {
                    fontSize: "12",
                    lineHeight: "25"
                  },
                  num: {
                    fontSize: "18",
                    color: "gray"
                  }
                },
                textStyle: {
                  fontSize: "18",
                  fontWeight: "bold"
                }
              }
            },
            data: this.sortByValue(c, "value")
          }
        ]
      });
      // 高亮当前图形
      myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: 0
      });
      myChart.on("mouseover", function(a) {
        if (a.dataIndex != 0) {
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: 0
          });
        }
      });
      myChart.on("mouseout", function() {
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: 0
        });
      });
    },
  }
};
</script>
<style lang="less">
.circle-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .w50 {
  height: 400px;
}
}

.ts-mc {
  padding: 10px;
}

.w70 {
  width: 70%;
  height: 300px;
}

.w50 {
  margin: 2px 6px;
  width: 50%;
  height: 400px;
}

.w100 {
  height: 400px;
}
</style>

