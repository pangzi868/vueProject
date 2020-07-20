<template>
<div class="content">
  <div v-for="(item) in ids" :key="item.value" :class="[item.width?'echarts card '+item.width:'echarts card']" :id="item.value">
  </div>
</div>
</template>

<script>
export default {
  name: 'card',
  props: ['cardData', 'ids'],
  mounted() {
    for (let i in this.ids) {
      this.draw(this.ids[i].value, this.cardData[i])
    }

  },
  methods: {
    draw(ele, data) {
      // 创建 echarts 实例。
      var dom = document.getElementById(ele);
      var chart = this.$echarts.init(dom);

      // 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
      // option 是个大的 JavaScript 对象。
      var option = {
        grid: {
          top: 6,
          bottom: 6,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        graphic: [{
            type: 'text',
            z: 750,
            top: 'top',
            left: 'center',
            // position:[0,0,10],
            style: {
              fill: '#000',
              text: [
                `${data.chartName}`,
              ].join('\n'),
              font: '12px "STHeiti", sans-serif'
            }
          },
          {
            type: 'text',
            // z: 100,
            top: 'middle',
            left: 'center',
            style: {
              fill: '#000',
              text: [
                `${data.money}亿`,
              ].join('\n'),
              font: '20px "STHeiti", sans-serif'
            }
          },
        ],
        toolbox: {
          show: false,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            // dataView: {
            //   readOnly: false
            // },
            // magicType: {
            //   type: ['line', 'bar']
            // },
            // restore: {},
            // saveAsImage: {}
          }
        },
        // xAxis: {
        //   type: 'category',
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        // },
        // yAxis: {
        //   type: 'value'
        // },
        // series: [{
        //   data: [820, 932, 901, 934, 1290, 1330, 1320],
        //   type: 'line'
        // }]
      };

      // 调用 setOption 将 option 输入 echarts，然后 echarts 渲染图表。
      chart.setOption(option);
    }
  }
}
</script>

<style lang="less">
.content {
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-between; /* Safari 6.1+ */
  justify-content: space-between;
  .card {
    margin: 2px 0;
    width: 300px;
    height: 100px;
    .num {
      font-size: 20px;
      // font-weight: bold;
    }
  }
  .w50 {
    width: 49%;
    margin: 2px 0
  }
}
</style>
