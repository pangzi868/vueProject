<template>
<div class="container">
  <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
  <axis-chart :ids="id" :chartData="getChartData" />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import AxisCharts from '../../components/axis-charts.vue'
export default {
  data() {
    return {
      allData: [{
          chartName: '表内资产余额及全行公司表内资产占比情况分析',
          DrillDown: true,
          yAxis:['交易银行表内资产',"交易银行表内资产占比"],
          legend:[{
              name: "交易银行表内资产余额",
              icon: "circle"
            },
            {
              name: "全行公司表内资产余额",
              icon: "circle"
            },
            {
              name: "交易银行表内资产占比",
              icon: "roundRect"
            }],
          filterParams:['org'],
          xAxis:[],
          series: [
            {
              type: 'bar',
              data: []
            },
            {
              type: 'bar',
              data: []
            },
            {
              type: 'line',
              data: []
            }
          ]
        },
        {
          chartName: '表外资产余额及全行公司表内资产占比情况分析',
          DrillDown: true,
          yAxis:['交易银行表外资产余额',"交易银行表外资产占比"],
          legend:[{
              name: "交易银行表内资产余额",
              icon: "circle"
            },
            {
              name: "全行公司表内资产余额",
              icon: "circle"
            },
            {
              name: "交易银行表内资产占比",
              icon: "roundRect"
            }],
          filterParams:['org'],
          xAxis:[],
        }
      ],
      id: ['echarts01', 'echarts02'],
      filterParams: {
        org: [
          { key: "1", value: "鼓楼支行" },
          { key: "2", value: "江宁区支行" },
          { key: "3", value: "建邺区支行" },
          { key: "4", value: "浦口区支行" },
          { key: "5", value: "六合区支行" },
          { key: "6", value: "雨花台支行" }
        ],
        time: [
          { key: "01", value: "2019年01月25日" },
          { key: "02", value: "2019年02月25日" },
          { key: "03", value: "2019年03月25日" },
          { key: "04", value: "2019年04月25日" },
          { key: "05", value: "2019年05月25日" },
          { key: "06", value: "2019年06月25日" }
        ]
      }
    }
  },
 
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index])
        return pre
      }, [])
    }
  },
  methods: {
    getMsgFormSon(data) {
      this.msgFormSon = data;
      console.log(this.msgFormSon);
    }
  },
  components: {
    "v-filter": Filter,
    "axis-chart": AxisCharts
  }
}
</script>
