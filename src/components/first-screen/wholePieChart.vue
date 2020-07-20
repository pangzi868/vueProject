<template>
  <div class="whole-pie-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  created() {},
  mounted() {
    this.initChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initChart(chartId, chartData) {
      let myChart = this.$echarts.init(document.getElementById(chartId));
      myChart.setOption({
        color: [
          "#5B4CFF",
          "#00F7FF",
          "#1D9DFA",
          "#0048F1",
          "#70ad47",
          "#ff0000"
        ],
        grid: {
          top: "10%",
          right: "10%"
        },
        series: [
          {
            type: "pie",
            center: ["52%", "50%"],
            radius: "62%",
            labelLine: {
              normal: {
                length: 15,
                length2: 60,
                lineStyle: {
                  type: "solid"
                }
              }
            },
            z: 99,
            label: {
              normal: {
                formatter: params => {
                  return (
                    "{b| " +
                    params.name +
                    "}  \n " +
                    "{c|" +
                    params.percent.toFixed(1) +
                    "%}"
                  );
                },
                borderWidth: 0,
                borderRadius: 4,
                padding: [0, -46],
                height: 70,
                fontSize: 13,
                align: "left",
                color: "#fff",
                rich: {
                  b: {
                    fontSize: 14,
                    lineHeight: 20,
                    color: "rgba(255,255,255,.7)",
                    padding: [15, 0, 5, 0]
                  },
                  c: {
                    fontSize: 16,
                    lineHeight: 20,
                    color: "#fff",
                    padding: [15, 0, 5, 0]
                  }
                },
                // position: "outer",
                // alignTo: "edge",
                // margin: 50
              }
            },
            // label: {
            //   position: "inside",
            //   formatter: "{b}{c}%",
            //   color: "#FFF",
            //   fontSize: 14
            // },
            data: chartData
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChart(this.ids, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
