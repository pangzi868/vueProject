<template>
  <div class="person-columnar">
    <div :id="ids" class="graph-div"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  props: ["ids","title","chartData"],
  mounted() {
    this.initChart(this.ids, this.title,this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initChart(ids,title ,chartData) {
      var myCharts = this.$echarts.init(document.getElementById(ids));
      myCharts.setOption({
        color: ['#005AD9','#00F7FF'],
        title: {
          text: title,
          subtext: '',
          left: '40px',
          textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '32'
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          clockwise: false,
          center: ['50%', '50%'],
          data: chartData,
          label: {
            normal: {
              formatter: params => {
                // console.log(params);
                return (
                  "{b| " +
                  params.name +
                  "} \n" +
                  "{c|" +
                  Number(params.value).toFixed(1)+
                  "%}"
                );
              },
              borderWidth: 0,
              borderRadius: 4,
              padding: [0, -86],
              height: 70,
              fontSize: 13,
              align: "center",
              color: "#3494BD",
              rich: {
                b: {
                  fontSize: 16,
                  lineHeight: 20,
                  color: "rgba(255,255,255,.5)",
                  padding: [15, 0, 5, 0]
                },
                c: {
                  fontSize: 20,
                  lineHeight: 20,
                  color: "#fff",
                  padding: [15, 0, 3, 0]
                }
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 40,
              length2:80,
              itemStyle: {
                color: "#FFF"
              },
              lineStyle: {
                // color: '#005AD9',
                width: 1
              }
            }
          },
        },{
          color: '#005AD9',
          type: 'pie',
          radius: ['60%', '63%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 6,
            name: ''
          }]
        }]
      });
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initChart(this.ids, this.title,newVal);
    }
  }
};
</script>

<style lang="less">
.person-columnar {
  .graph-div {
    height: 100%;
    width: 100%;
  }
}
</style>
