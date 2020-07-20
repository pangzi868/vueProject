<template>
  <div class="amount-trends-chart" id='amountTrendsChart'>
 
     
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
    }, 3000)
    
  },
  methods: {
    getData () {
      this.axios.get('/api/p3/interceptAmountTrend')
      .then( (res)  => {
          let arr = res.data.data   
          this.drawChart(arr)

      })
      .catch(function (error) {
          console.log(error);
      });
    },
    translateData( arr ) {
      let obj = {
        time:[],
        mount:[]
      }
      arr.forEach(el => {
        obj.time.push(el.avt_eventoccurtime)
        obj.mount.push(el.payamount)
      });
      return obj
    },
    drawChart(arr) {
      let obj = this.translateData(arr)
      let myChart = this.$echarts.init(document.getElementById('amountTrendsChart'));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          padding: 20,
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
          },
          formatter: "风险金额<br /><br /> {b}点：{c}元"
        },
        grid: {
          top: '22%',
          left: 73,
          right: 72,
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.7)'
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                margin: 15
              },
              formatter: function(data) {
                return data + ":00";
              }
            },
            axisTick: {
              show: false
            },
            data: obj.time || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
          }
        ],
        yAxis: [
          {
            // name:'单位：元',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.31)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.31)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                fontSize:18,
                fontWeight:'bold'
              }
            }
          }
        ],
        series: [
          {
            name: "风险金额",
            type: "line",
            symbol: "circle",
            showSymbol: false,
            // smooth: 0.5,
            lineStyle: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: '#00FFEE' 
                }, {
                    offset: 0.25, color: '#00FFEE ' 
                }, {
                    offset: 0.5, color: '#00FFEE' 
                }, {
                    offset: 0.75, color: '#00FFEE ' 
                }, {
                    offset: 1, color: '#00FFEE'
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: {
              color: "rgba(0,255,255,1)",
              borderColor: "#FFF",
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: [" {a|{c}元}"].join(","),
                rich: {
                  a: {
                    color: "#fff",
                    align: "center"
                  }
                }
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,74,255,.6)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,74,255, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0,74,255, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: obj.mount || [12, 40, 50, 80, 90, 30, 20, 12, 40, 50, 80, 90, 30 ]
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
.amount-trends-chart{
  width: 100%;
  height: 24%;
}

</style>
