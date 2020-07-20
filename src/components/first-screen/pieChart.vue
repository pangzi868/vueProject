<template>
  <div class="pie-echarts" :id="ids"></div>
</template>
<script>
export default {
  name: "education",
  props: ["ids", "chartData", "chartTitle"],
  mounted() {
    this.initPieChart(this.ids, this.chartData, this.chartTitle);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initPieChart(id, data, chartTitle) {
      const colorList = [
        "#47A2FF",
        "#53C8D1",
        "#59CB74",
        "#FBD444",
        "#7F6AAD",
        "#585247"
      ];
      let myCharts = this.$echarts.init(document.getElementById(id));
      let _that = this;
      myCharts.setOption({
        title: {
          text: chartTitle,
          // text: id === 'echarts07' ? '年龄分布' : "学历分布",
          textStyle: {
            fontSize: 38,
            color: "#FFF",
            lineHeight: 20
          },
          textAlign: "center",
          left: "30%",
          top: "48%"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: "10%",
          top: "center",
          itemGap: 30,
          selectedMode: false,
          icon: "pin",
          data: data.map(item => {
            return item.name;
          }),

          formatter(name) {
            if (data && data.length) {
              for (var i = 0; i < data.length; i++) {
                if (name === data[i].name) {
                  if (_that.chartTitle === "地域分布") {
                    return (
                      `{uname|${name}}{unum|` +
                      (data[i].value.toFixed(1) + "%") +
                      `}`
                    );
                  } else {
                    return (
                      `{uname|${name}}{unum|` +
                      (((data[i].value / data[i].total) * 100).toFixed(1) +
                        "%") +
                      `}`
                    );
                  }
                }
              }
            }
          },

          // formatter: "{uname|{b}}{unum|{d}}%",
          textStyle: {
            color: "#FFF",
            rich: {
              uname: {
                width: 100
              },
              unum: {
                color: "#4ed139",
                width: 40,
                align: "right"
              }
            }
          }
        },
        color: colorList,
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: [100, 140],
            center: ["30%", "50%"],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initPieChart(this.ids, newVal, this.chartTitle);
    }
  }
};
</script>

<style lang="less">
</style>
