<template>
  <div class="loan-chart" id="loanChart"></div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {};
  },
  mounted() {
    this.drawChart(this.chartData);
  },
  methods: {
    drawChart(data) {
      let myChart = this.$echarts.init(document.getElementById("loanChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          x: "center", // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: "bottom", // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ccc", // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 12,
            fontWeight: "bolder",
            color: "#eee" // 主标题文字颜色
          },
          subtextStyle: {
            color: "#aaa" // 副标题文字颜色
          }
        },
        grid: {
          // left: "3%",
          // right: 200,
          top: '10%',
          bottom: '20%',
          // bottom: 0,
          containLabel: false
        },
        tooltip: {},
        // animationDurationUpdate: function(idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 100;
        // },
        // animationEasingUpdate: "bounceIn",
        color: ["#fff", "#fff", "#fff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 250,
              edgeLength: 100
            },
            roam: true,
            label: {
              show: true,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 8,
              formatter: "{b}\n\n{value|{c}}",
              rich: {
                value: {
                  fontSize: "12",
                  align: "center"
                }
              }
            },
            data: data || [
              {
                name: "刘雨昕长发",
                value: 2058124,
                symbolSize: 143,
                symbol: `image://${require("@/assets/images/p2/loan1.svg")}`,
                draggable: true
              },
              {
                name: "fdsafsf",
                value: 10231231,
                symbolSize: 121,
                symbol: `image://${require("@/assets/images/p2/loan2.svg")}`,
                draggable: true
              },
              {
                name: "既地方",
                value: 10231231,
                symbolSize: 150,
                symbol: `image://${require("@/assets/images/p2/loan3.svg")}`,
                draggable: true
              },
              {
                name: "v家哦附件",
                value: 10231231,
                symbolSize: 130,
                symbol: `image://${require("@/assets/images/p2/loan4.svg")}`,
                draggable: true
              },
              {
                name: "附件都放假",
                value: 10231231,
                symbolSize: 140,
                symbol: `image://${require("@/assets/images/p2/loan5.svg")}`,
                draggable: true
              }
            ]
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.drawChart(newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.loan-chart {
  width: 100%;
  height: 360px;
  padding-right: 6%;
}
</style>
