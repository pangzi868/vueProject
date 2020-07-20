<template>
  <div class="cust-distribute-chart" id='custDistributeChart'>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  mounted () {
    this.getData()
    this.timer = setInterval(() => {
      setTimeout(this.getData, 0)
    }, 3600000)
  },
  methods: {
    getData () {
      this.axios.get('/api/p3/massDistrib')
      .then( (res)  => {
        const { data } = res.data       
        this.drawChart(data)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    drawChart(data) {
      let myChart = this.$echarts.init(document.getElementById('custDistributeChart'));
      // 绘制图表
      myChart.setOption({
        color: ['rgba(255,196,32)','rgba(95,234,215)','rgba(40,158,255)'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0)" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255,255,255,1)" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "5%",
          containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: 'rgba(255,255,255)'
            },
            splitLine: {
              show: false
            },
            data: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              color: 'rgba(255,255,255)',
              formatter: '{value} %'
            },
            splitLine: {
              show: false
            }
        },
        series: [
            {
                name: '历史进件客群分布',
                type: 'line',
                symbol: "circle",
                showSymbol: false,
                stack: '总量',
                lineStyle: {
                  width: 0
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(95,234,215)'
                  }, {
                      offset: 1,
                      color: 'rgba(95,234,215,0.5)'
                  }]),
                  shadowColor: "rgba(95,234,215,0.2)", //阴影颜色
                  shadowBlur: 20
                },
                data: data.map(item=>item.hist_percent)
            },
            {
                name: '近一个月批核客群',
                type: 'line',
                symbol: "circle",
                showSymbol: false,
                stack: '总量',
                lineStyle: {
                  width: 0
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(255,196,32)'
                  }, {
                      offset: 1,
                      color: 'rgba(255,196,32,0.5)'
                  }]),
                  shadowColor: "rgba(255,196,32,0.2)", //阴影颜色
                  shadowBlur: 20
                },
                data: data.map(item=>item.mon_percent)
            },
            {
                name: '今日批核客群',
                type: 'line',
                symbol: "circle",
                showSymbol: false,
                stack: '总量',
                lineStyle: {
                  width: 0
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(40,158,255)'
                  }, {
                      offset: 1,
                      color: 'rgba(40,158,255,0.5)'
                  }]),
                  shadowColor: "rgba(40,158,255,0.2)", //阴影颜色
                  shadowBlur: 20
                },
                data: data.map(item=>item.day_percent)
            }
        ]
      });
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)  
    this.timer = null
  },
  components: {}
};
</script>

<style lang="less" scoped>
.cust-distribute-chart{
  width: 100%;
  height: 18%;
}
</style>
