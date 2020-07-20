<template>
  <div class="anti-echarts" :id="ids"></div>
</template>

<script>
export default {
  name: "education",
  props: ["ids", "antiFraudDatas"],
  mounted() {
    // this.initPieChart(this.ids, this.antiFraudDatas);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initPieChart(id, antiFraudDatas) {
      antiFraudDatas= antiFraudDatas.map(item=>{
        return {
          ...item,
          value:item.value.toFixed(2)
        }
      })
      // [{
      //     "value": "60",
      //     "name": "mxjczb"
      // },
      // {
      //     "value": "20",
      //     "name": "rgsh"
      // },
      // {
      //     "value": "20",
      //     "name": "cljc"
      // }]
      const colorList = ["#1f71ff", "#1d9dfa", "#00f7ff"];
      let myCharts = this.$echarts.init(document.getElementById(id));
      // let _that = this;
      myCharts.setOption({
        title: {
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: "5%",
        //   top: 130,
        //   icon: "pin",
        //   textStyle: {
        //     fontSize: 18,
        //     color: "#CCC",
        //     lineHeight: 24,
        //   },
        //   data: antiFraudDatas.map((item) => {
        //     return item.name;
        //   }),
        // },
        color: colorList,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["45%", "50%"],
            roseType: "radius",

            label: {
              normal: {
                borderWidth: 20,
                borderRadius: 4,
                padding: [0,-70,60,-70],
                formatter: function(data) {
                  /* 7月10日wk修改：添加左侧条形图 */
                  // return data.callNum;
                  // return data.data.name+'111111'+'\n'+''+Number(data.data.value).toFixed(0) + '%'
                  return (
                    `{uname|${name}}{uname|` +
                    data.name +
                    `}` +
                    "\n" +
                    `{uvalue|${name}}{uvalue|` +
                    (Number(data.value).toFixed(2) + "%") +
                    `}`
                  );
                  /* end */
                },
                rich: {
                  uname: {
                    position: "insideTopLeft",
                    color: "#CCC",
                    lineHeight: 30,
                    align: "right",
                    fontSize: 16,
                  },
                  uvalue: {
                    position: "insideTopLeft",
                    color: "#FFF",
                    lineHeight: 30,
                    align: "right",
                    fontSize: 20,
                  },
                },
              },
              show: true,
              fontSize: 20,
            },
            data: antiFraudDatas,
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 70,
              },
            },
          },
        ],
      });
    },
  },
  components: {},
  watch: {
    antiFraudDatas: function(newVal) {
      this.initPieChart(this.ids, newVal);
    },
  },
};
</script>

<style lang="less">
.anti-echarts {
  width: 130%;
  height: 360px;
}
</style>
