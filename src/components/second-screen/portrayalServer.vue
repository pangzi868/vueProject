<template>
  <div class="portrayal-server">
    <div class="exp-title-frame">
      <span class="title-text">画像：服务地域TOP10</span>
    </div>
    <div class="area-body">
      <div id="area"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableAuto",
  props: ["tableDatas"],
  data() {
    return {
      tableData: this.tableDatas
    };
  },
  computed: {},
  mounted() {
    this.drawArea("area", this.tableData);
  },

  methods: {
    transtionData(arr) {
      let data = {
        type: [],
        value: []
      };
      arr.forEach(el => {
        data.type.push(el.regionname);
        data.value.push(el.percent);
      });
      return data;
    },
    culTotal(arr) {
      let num = 0
      arr.forEach( it => {
        num +=  parseInt(it)
      })
      return num
    },
    drawArea(id, arr) {
      let data = this.transtionData(arr);
      let myChart = this.$echarts.init(document.getElementById(id));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return params[0].name + ": " + params[0].value;
          }
        },
        grid: {
          bottom: '30%'
        },
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(219,204,39,1)"
              },
              {
                offset: 0.3,
                color: "rgba(29,62,112,1)"
              },
              {
                offset: 1,
                color: "rgba(37,178,73,1)"
              }
            ],
            global: false
          }
        ],
        xAxis: {
          data: data.type,
          axisTick: { show: false },
          axisLine: { 
            lineStyle: {
              color: "#ccc"
            },
          },
          offset: 20,
          nameGap: 100,
          axisLabel: {
            textStyle: {
              color: "#ccc"
            },
            fontSize: 24,
            rotate: 20
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: false
          }
        },

        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "40%",
            symbol: "triangle",
            itemStyle: {
              normal: {
                opacity: 0.5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D0C22B" },
                  { offset: 0.5, color: "#D0C22B" },
                  { offset: 1, color: "#002E7C" }
                ])
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              show: true,
              fontSize: 18,
              color: '#ccc',
              position: 'insideBottom',
              formatter: '{c}%'
            },
            data: data.value,
            z: 10,
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z"
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    }
  },
  components: {}
};
</script>

<style lang="less">
.portrayal-server {
  padding-top: 2%;
  .exp-title-frame {
    width: 100%;
    height: 15.85%;
    background: url("../../assets/images/title2.png") no-repeat;
    background-size: 100% 100%;
    .title-text {
      display: inline-block;
      padding-top: 1.3%;
      margin-left: 3.5%;
    }
  }
  .area-body {
    width: 100%;
    height: 80%;
    #area {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
