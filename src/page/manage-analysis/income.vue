<template>
  <div class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <v-bar :ids="id" :chartData="getChartData" />
    <v-circle :ids="ids" :chartData="getChartDatas" />
  </div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import barSecond from '../../components/barSecond.vue'
import circle from '../../components/circle.vue'
export default {
  data() {
    return {
      allData: [{
          chartName: '单月交易银行手续费净收入统计',
          DrillDown: true, // 控制是否下钻
          yAxis:['去年同期手续费净收入'],
          filterParams:['time'],
          legend:[{
              name: "去年同期",
              icon: "circle"
            },
            {
              name: "手续费净收入",
              icon: "circle"
            }]
        },
        {
          chartName: '全年交易银行手续费净收入统计',
          DrillDown: false,
          yAxis:['去年同期手续费净收入'],
          filterParams:['time'],
          legend:[{
              name: "去年同期",
              icon: "circle"
            },
            {
              name: "手续费净收入",
              icon: "circle"
            }]
        },
        {
          chartName: '交易银行全年外汇汇兑收入统计（按月统计）',
          DrillDown: true,
          yAxis:['去年同期外汇会总收入'],
          filterParams:['time'],
          legend:[{
              name: "去年同期",
              icon: "circle"
            },
            {
              name: "外汇会总收入",
              icon: "circle"
            }]
        },
        {
          chartName: '交易银行全年外汇汇兑收入统计（年初至当月）',
          DrillDown: false,
          yAxis:['去年同期外汇会总收入'],
          filterParams:['time'],
          legend:[{
              name: "去年同期",
              icon: "circle"
            },
            {
              name: "外汇会总收入",
              icon: "circle"
            }]
        },
        
      ],
      id: ['echarts01', 'echarts02', 'echarts03', 'echarts04'],
      allDataB: [
        {
          chartName: '交易银行利息收入分析',
          color: [ "#0078d7", "#e5b322"],
          filterParams:['time'],
          legend:[{
              name: "交易银行利息收入",
            },
            {
              name: "其他利息收入",
            }],
          series: [{
                value: 335,
                name: "交易银行利息收入"
              },
              {
                value: 310,
                name: "其他利息收入"
              }
          ],
        }
      ],
      ids: [{id:'echarts05'}],
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
    getChartDatas() {
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
    "v-bar": barSecond,
    "v-circle": circle
  }
}
</script>
