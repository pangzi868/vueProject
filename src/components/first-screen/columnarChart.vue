<template>
  <div class="right-columnar">
    <div v-for="(item, index) in ids" :key="item.id" class="single-columnar">
      <div class="single-columnar-title">{{item.title}}</div>
      <!-- <div class="current-data">
        {{chartData.totalData[index]}}
        <scroll-span :number="chartData.totalData[index]" class="total-money-span" ids="current" />
        <indicator-chart
          v-if="chartData.totalData[index]"
          :chartData="chartData.totalData[index]"
          chartId="current-money"
          :styleData="styleObj"
          :styleSingle="singleStyle"
          type="person"
        />
      </div>-->
      <!-- <div :id="item.id" class="single-columnar-echarts"></div> -->
      <repeat-purchase
        :ids="lineIds[index]"
        v-if="chartData.columnAllData"
        :chartData="{lineData: chartData.columnAllData[index]}"
        class="repeat-purchase-chart"
      />
    </div>
  </div>
</template>

<script>
import IndicatorChart from "../../components/first-screen/indicator.vue";
// import ScrollSpan from "../../components/scrollSpan.vue";
import RepeatPurchase from "../../components/first-screen/repeatPurchase.vue";
export default {
  name: "columnar",
  props: ["ids", "chartData", "lineIds"],
  mounted() {
    // this.initColumnarChart(this.ids[i].id, this.chartData.columnAllData[i]);
    // for (let i in this.ids) {
    //   this.initColumnarChart(this.ids[i].id, this.chartData.columnAllData[i]);
    // }
  },
  data() {
    return {
      styleObj: {
        // height: "90px",
        // fontSize: "64px"
      },
      singleStyle: {
        width: "4%",
        fontFamily: "inherit"
        // marginLeft: "1%",
        // lineHeight: "150%"
      },
      repeatPurchaseId: [
        {
          id: "lineChart01",
          title: ""
        },
        {
          id: "lineChart02",
          title: ""
        }
      ],
      lineData: []
    };
  },
  computed: {},
  methods: {
    initColumnarChart(id, data) {
      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: "15%",
          right: "3%",
          left: "5%",
          bottom: "12%"
        },
        xAxis: [
          {
            type: "category",
            data: data ? data.xAxis : [],
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            },
            axisLabel: {
              show: false,
              margin: 10,
              color: "#e2e9ff",
              textStyle: {
                fontSize: 14
              }
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              show: false,
              formatter: "{value}",
              color: "#e2e9ff"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: data ? data.yAxis : [],
            barWidth: "20px",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,244,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,77,167,1)" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: "rgba(0,160,221,1)",
                shadowBlur: 4
              }
            }
          }
        ]
      });
    }
  },
  components: {
    // "scroll-span": ScrollSpan,
    "indicator-chart": IndicatorChart,
    "repeat-purchase": RepeatPurchase
  },
  watch: {
    chartData: function(newVal) {
      for (let i in this.ids) {
        this.initColumnarChart(this.ids[i].id, newVal.columnAllData[i]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.right-columnar {
  width: 100%;
  display: flex;
  .single-columnar {
    height: 100%;
    width: 100%;
    .single-columnar-title {
      color: #ffffff;
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      letter-spacing: 0px;
      text-align: left;
    }
    .current-data {
      font-weight: bold;
      color: #ff0088;
      font-size: 30px;
      height: 56px;
    }
    .single-columnar-echarts {
      width: 80%;
      height: 500px;
    }
  }
}
.total-money-span {
  margin-bottom: -2px;
}
</style>
