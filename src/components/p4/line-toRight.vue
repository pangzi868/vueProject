<template>
  <div class="common-box" :style="id.style">
    <div :id="id.id"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "tableAuto",
  props: ["tableDatas", "ids", "columns", "heights", "isShowPercent"],
  data() {
    return {
      tableData: this.tableDatas,
      id: this.ids,
      height: this.heights,
      lineData: [],
    };
  },
  computed: {},
  mounted() {
    this.transLateData();
  },
  methods: {
    transLateData() {
      let obj = {
        type: "bar",
        yAxis: [],
        series: [],
      };
      let arr = Vue.filter("sortByValue")(this.tableData, "percent");
      arr.forEach((el) => {
        obj.series.push(el.percent.toFixed(2));
        obj.yAxis.push(el.indexname);
      });
      this.drawLineG(this.id, obj);
    },
    drawLineG(ele, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele.id));
      // 每一个
    
      // 总的
        var payAmounts = data.series.map((item) => item).reverse();
      var totalAmount = payAmounts.reduce((x, y) => x * 1 + y * 1);
      //总的截取到小数后两位
      var totalArr = new Array(data.series).fill(
        parseFloat(totalAmount).toFixed(2)
      );
      totalArr = data.series.map(() => {
        return 100
      });
      // 绘制图表

      myChart.setOption({
        title: {
          text: [`{b|${ele.title}}`].join(""),
          triggerEvent: true,
          textStyle: {
            rich: {
              b: {
                color: "#fff",
                fontSize: 22,
                fontWeight:'bold',
                // padding:[-15,0,0,0]
                margin:[100,60,40]
              },
            },
          },
          itemGap: 10,
          margin: 0,
          left: "5%",
          top: 0,
        },
        color: ["#C98531", "#0177a9"],
        grid: {
          top: "15%",
          left: "15%",
          right: "0%",
          bottom: "5%",
          width:1070,
          // containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: "rgba(255,255,255)",
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "category",
            axisLabel: {
              color: "rgba(255,255,255,.7)",
              fontSize: 20,
              fontWeight: 'bold',
            },
            axisLine: {
              show: false,
            },
            data: data.yAxis.map((item) => item).reverse(),
          },
        ],
        series: [
          {
            name: "拦截金融",
            type: "bar",
            zlevel: 1,
            label: {
              show: true,
              position: "right",
              color: "rgba(255,255,255)",
              formatter: "{@score}%",
              fontSize:20,
              alignment:1,
              padding: [2,0,0,0],
            },
            itemStyle: {
              barBorderRadius: 2,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#1F7CFF", // 0% 处的颜色
                  },
                  {
                    offset: 0.9,
                    color: "#2BF1FF",
                  },
                  {
                    offset: 1,
                    color: "#FFFFFF ", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            barWidth: 14,
            data: payAmounts,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-115%",
            label: {
              show: false,
              position: "right",
              color: "rgba(255,255,255)",
            },
            data: totalArr,
            itemStyle: {
              color: "rgba(255,255,255,0)",
              barBorderRadius: 2,
              borderWidth: 2,
              borderColor: "rgba(255,255,255,.4)",
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
#echarts03,
#echarts04,
#echarts05 {
  width: 100%;
  height: 100%;
  color: #fff;
  margin-top: 15px;
  margin-left: -18px;
}
.line-body {
  display: flex;
  .line-data {
    padding: 0px;
    text-align: right;
    span {
      display: inline-block;
      color: #0298e2;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 30%;
    }
  }
}
</style>
