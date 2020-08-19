<template>
  <div class="loan-chart" :id="ids"></div>
</template>

<script>
export default {
  props: ["ids", "chartData"],
  data() {
    return {};
  },
  mounted() {
    this.drawChart(this.ids, this.chartData);
  },
  methods: {
    drawChart(id, data) {
      if (!data) return;
      let tempData = data.x[0].data.map((item, index) => {
        return {
          name: item,
          value: data.y[0].data[index],
          symbolSize: 243,
          symbol:
            item === this.curPro
              ? `image://${require("@/assets/images/second/loan2.svg")}`
              : `image://${require("@/assets/images/second/loan1.svg")}`,
          draggable: false
        };
      });
      let myChart = this.$echarts.init(document.getElementById(id));
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
          top: "10%",
          bottom: "20%",
          // bottom: 0,
          containLabel: false
        },
        tooltip: {},
        // animationDurationUpdate: function(idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 100;
        // },
        // animationEasingUpdate: "bounceIn",
        color: ["#fff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 550,
              edgeLength: 200
            },
            roam: true,
            label: {
              show: true,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 8,
              formatter: "{value|{c}}",
              rich: {
                value: {
                  fontSize: "56",
                  align: "center"
                }
              }
            },
            data: tempData || [
              {
                name: "刘雨昕长发",
                value: 205,
                symbolSize: 243,
                symbol: `image://${require("@/assets/images/second/loan1.svg")}`,
                draggable: true
              },
              {
                name: "fdsafsf",
                value: 102,
                symbolSize: 221,
                symbol: `image://${require("@/assets/images/second/loan2.svg")}`,
                draggable: true
              },
              {
                name: "既地方",
                value: 102,
                symbolSize: 250,
                symbol: `image://${require("@/assets/images/second/loan3.svg")}`,
                draggable: true
              },
              {
                name: "v家哦附件",
                value: 102,
                symbolSize: 230,
                symbol: `image://${require("@/assets/images/second/loan4.svg")}`,
                draggable: true
              },
              {
                name: "附件都放假",
                value: 102,
                symbolSize: 240,
                symbol: `image://${require("@/assets/images/second/loan5.svg")}`,
                draggable: true
              }
            ]
          }
        ]
      });
    }
  },
  computed: {
    // 切换部门
    curPro: {
      get: function() {
        return this.$store.state.curPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurPro", newVal);
      }
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.drawChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.loan-chart {
  width: 100%;
  height: 360px;
}
</style>
