<template>
  <div class="container">

    <line-chart :ids="id" :chartData="getChartData" />
    <v-bar :ids="ids" :chartData="getChartDataB" />
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import LineChart from '../../components/line-chart/lineChart.vue'
import Bar from '../../components/barThird.vue'
export default {
  data() {
    return {
      allData: [{
          chartName: '对公存款时点余额趋势图',
          DrillDown: true,
          yAxis:['时点余额'],
          filterParams:['time'],
          legend:[{
              name: "活期存款时点余额",
              icon: "circle"
            },
            {
              name: "一般性存款时点余额",
              icon: "circle"
            }]
        },
        {
          chartName: '对公存款日均余额趋势图',
          DrillDown: true,
          yAxis:['日均余额'],
          filterParams:['time'],
          legend:[{
              name: "活期存款日均余额",
              icon: "circle"
            },
            {
              name: "一般性存款日均余额",
              icon: "circle"
            }]
        },
        {
          chartName: '有效结算客户存款趋势图',
          DrillDown: true,
          yAxis:['余额'],
          filterParams:['time'],
          legend:[{
              name: "活期日均存款余额",
              icon: "circle"
            },
            {
              name: "活期时点存款余额",
              icon: "circle"
            }]
        }
      ],
      allDataB: [
        {
          chartName: '交易银行外汇存款趋势分析',
          DrillDown: true,
          series: [
            { type : 'line' }
          ],
          yAxis: ['外汇存款时点余额']
        },
        {
          chartName: '交易银行保证金存款时点余额趋势',
          DrillDown: true,
          series: [
            { type : 'line' }
          ],
          yAxis: ['保证金_存款质押余额']
        }
      ],
      id: [ {id:'echarts01'}, {id: 'echarts02'}, {id:'echarts03'}],
      ids: [ { id:'echarts04'},{ id: 'echarts05'}],
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
  mounted() {

  },
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index])
        return pre
      }, [])
    },
    getChartDataB() {
      return this.ids.reduce((pre, item, index) => {
        pre.push(this.allDataB[index])
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
    "line-chart": LineChart,
    "v-bar": Bar
  }
}
</script>
