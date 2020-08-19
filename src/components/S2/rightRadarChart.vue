<template>
  <div class="right-radar-chart" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData, this.curPro);
  },
  data() {
    return {};
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
  methods: {
    initColumnChart(id, data, cp) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      let curData = [],
        yAxis = [],
        colorList = [
          "rgba(255,179,88,1)",
          "rgba(0,247,255,1)",
          "rgba(30,147,255,1)",
          "rgba(255,179,88,1)",
          "rgba(0,247,255,1)",
          "rgba(30,147,255,1)"
        ];
      data.x[0].data.forEach((item, index) => {
        if (item === cp) {
          curData.push({
            text: data.x[1].data[index]
          });
          yAxis.push(data.y[0].data[index]);
        }
      });
      if (curData.length < 1) return;
      let max = Math.max.apply(null, yAxis);
      curData.forEach((item, index) => {
        curData[index]["max"] = max;
      });
      yAxis = [yAxis];

      let myCharts = this.$echarts.init(document.getElementById(id));
      var tdata = [
        {
          text: "一星",
          max: 100
        },
        {
          text: "五星",
          max: 100
        },
        {
          text: "四星",
          max: 100
        }
      ];
      myCharts.setOption({
        //鼠标效果
        // tooltip: {},
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%"
        },
        radar: [
          {
            center: ["55%", "60%"],
            indicator: curData || tdata,
            //大小
            radius: 250,
            //角度
            startAngle: 90,
            //层
            splitNumber: 4,
            //圆形
            // shape: 'circle',
            name: {
              formatter: "{value}",
              textStyle: {
                color: "rgba(255, 255, 255, 0.7)"
              },
              fontSize: 56
            },
            axisLine: {
              lineStyle: {
                color: "#37a9ff"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#37a9ff"
              }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(255, 255, 255, 0)"
              }
            }
          }
        ],

        tooltip: {
          show: true,
          trigger: "item"
        },
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbol: "circle", // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 8, // 拐点的大小
            itemStyle: {
              normal: {
                color: "rgba(255, 255, 255, 0)"
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#dbbeff",
                      opacity: 1
                    },
                    {
                      offset: 1,
                      color: "#00b4ef",
                      opacity: 1
                    }
                  ],
                  false
                ),
                opacity: 0.8
              }
            },
            data: yAxis || [[54, 58, 66]]
            // data: [[80, 50, 90, 80],[20,30,40,20]],
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, newVal, this.curPro);
    },
    curPro: function(newVal) {
      this.initColumnChart(this.ids, this.chartData, newVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
