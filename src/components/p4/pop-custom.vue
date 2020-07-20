<template>
  <div class="common-box popToRight">
    <div class="p4-table-title">
      <span>{{id.title}}</span>
    </div>
    <div class="pop-content">
      <div :id="id.id" class="pop"></div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  name: "tableAuto",
  props: ["tableDatas", "ids", "columns", "heights"],
  data() {
    return {
      tableData: this.tableDatas,
      id: this.ids,
      height: this.heights,
      lineData: []
    };
  },
  computed: {},
  mounted() {
    // this.drawChart();
    this.drawCloudChart();
  },
  watch: {
    tableDatas(newValue, oldValue) {
      // this.drawChart()
      this.drawCloudChart();
    }
  },
  methods: {
    translate(arr) {
      let a = [];
      let maxItem = Vue.filter("sortByValue")(arr, "val")[0];
      arr.forEach(it => {
        a.push({
          name: it.key,
          // value: it.num + "人",
          value: it.val,
          symbolSize: getSize(it.val),
          symbol: getSymbol(it.val),
          draggable: true,
          label: {
            align: "center"
          }
        });
      });
      return a;

      function getSize(num) {
        let a = Math.floor((num / maxItem.val) * 280);
        if (a < 150) {
          a = 150;
        }
        return a;
      }
      function getSymbol(num) {
        let rate = num / maxItem.num;
        if (rate < 1 / 4) {
          return `image://${require("@/assets/images/p2/loan1.svg")}`;
        } else if (rate < 2 / 4) {
          return `image://${require("@/assets/images/p2/loan4.svg")}`;
        } else if (rate < 3 / 4) {
          return `image://${require("@/assets/images/p2/loan5.svg")}`;
        } else {
          return `image://${require("@/assets/images/p2/loan3.svg")}`;
        }
      }
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById(this.id.id));
      let seriesData = this.translate(this._.cloneDeep(this.tableDatas));
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
            fontSize: 18,
            fontWeight: "bolder",
            color: "#eee" // 主标题文字颜色
          },
          subtextStyle: {
            color: "#aaa" // 副标题文字颜色
          }
        },
        tooltip: {
          show: false
        },
        animationDurationUpdate: function(idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        animationEasingUpdate: "bounceIn",
        color: ["#fff", "#fff", "#fff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 400
            },
            roam: true,
            label: {
              show: true,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              formatter: "{b}\n\n{value|{c}}",
              rich: {
                value: {
                  fontSize: "24",
                  align: "center"
                }
              }
            },
            data: seriesData
          }
        ]
      });
    },

    //  词云
    drawCloudChart() {
      let myChart = this.$echarts.init(document.getElementById(this.id.id));
      let seriesData = this.translate(this._.cloneDeep(this.tableDatas));
      let randcolor = () => {
        let r = 100 + ~~(Math.random() * 100);
        let g = 135 + ~~(Math.random() * 100);
        let b = 100 + ~~(Math.random() * 100)
        return `rgb(${r}, ${g}, ${b})`;
      };
      myChart.setOption({
        // backgroundColor: "rgba(0,0,0,.5)",
        tooltip: {
          trigger: "item",
          padding: [10, 15],
          textStyle: {
            fontSize: 20
          },
          formatter: params => {
            const { name, value } = params;
            return `
                    异常问题：${name} <br/>
                    数量：${value}
                `;
          }
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 20,
            sizeRange: [24, 50],
            rotationRange: [0, 0],
            rotationStep: 90,
            // textRotation: [0, 90],
            shape: "circle",
            gridSize: 20,
            textStyle: {
              normal: {
                color: params => {
                  return randcolor();
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: seriesData
          }
        ]
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.popToRight {
  font-size: 16px;
  position: relative;
  overflow: hidden;
  height: 50%;
  background-size: 96% 98%;
  padding: 1% 6%;
  .p4-table-title {
    font-size: 32px;
    font-weight: bold;
  }
  .pop-content {
    text-align: center;
    padding: 30px 0;
    height: 100%;
    .pop {
      height: 100%;
    }
  }
}
</style>