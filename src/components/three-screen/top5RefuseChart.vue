<template>
  <div class="top5-refuse-chart" id='top5RefuseChart'>
   
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
      this.axios.get('/api/p3/refuseReasonSummary')
      .then( (res)  => {
        const { data } = res.data       
        this.drawChart(data)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    drawChart(data) {
      let myChart = this.$echarts.init(document.getElementById('top5RefuseChart'));
      // 绘制图表
      myChart.setOption({
        color: [
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: '#151CE8 ' // 0% 处的颜色
                }, {
                    offset: 1, color: '#24F2FF ' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
           show: false
        },
        yAxis: {
            type: 'category',
            axisLabel: {
              color: 'rgba(255,255,255)'
            },
            data: data.map(item=>item.finalreasoncode_tag)
        },
        series: [
            {
                name: '拦截金融',
                type: 'bar',
                barWidth: 15,
                label: {
                  show: true,
                  position: 'right',
                  color: 'rgba(255,255,255,0.7)'
                },
                data: data.map(item=>item.num)
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
.top5-refuse-chart{
  width: 100%;
  height: 18%;
}
</style>
