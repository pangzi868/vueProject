<template>
  <div class="loan-monitor-chart" id='loanMonitorChart'>
   
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
    }, 60000)
  },
  methods: {
    getData () {
      this.axios.get('/api/p3/creditConditions')
      .then( (res)  => {
        const { data } = res.data       
        this.drawChart(data)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    drawChart(data) {
      if(!data || !data.length) return
      let myChart = this.$echarts.init(document.getElementById('loanMonitorChart'));
      // 绘制图表
      myChart.setOption({
        color: [ '#289EFF', '#FFAF2B', {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#24F1FF' // 0% 处的颜色
          }, {
              offset: 1, color: '#173E8A' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }],
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
        // legend: {
        //     itemGap: 50,
        //     data: ['放款量','户均额度' ,'批核率'],
        //     textStyle: {
        //         color: '#f9f9f9',
        //         borderColor: '#fff'
        //     },
        //     bottom: 0
        // },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#f9f9f9'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#d1e6eb',
                    margin: 15,
                },
            },
            axisTick: {
                show: false,
            },
            data: data.map(item=>item.eventhour)
        }],
        yAxis: [{
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: '#d1e6eb',

                },
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '户均额度',
            type: 'line',
            tooltip: {
                show: true
            },
            lineStyle: {
              width: 3
            },
            data: data.map(item=>item.avgval)
        }, 
        {
            name: '批核率',
            type: 'line',
            lineStyle: {
              width: 3
            },
            tooltip: {
                show: true
            },
            data: data.map(item=>item.applyrate)
        },
        {
            name: '放款量',
            type: 'bar',
            barWidth: 15,
            tooltip: {
                show: true
            },
            data: data.map(item=>item.cust)
        }]
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
.loan-monitor-chart{
  width: 100%;
  height: 18%;
}
</style>
