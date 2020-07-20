<template>
  <div class="container">
    <!-- <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter> -->
    <line-chart :ids="id" :chartData="getChartData" />
    <v-cicle :ids='idB' :chartData='getChartDataB' />
    <v-bar :ids="idC" :chartData="getChartDataC" />
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import LineChart from '../../components/line-chart/lineChart.vue'
import Cicle from "../../components/circle.vue";
import barSecond from '../../components/barSecond.vue'
export default {
  data() {
    return {
      allData: [{
          chartName: '投放利率',
          yAxis:['平均月利率'],
          filterParams:[],
          legend: [
            {
              name: "平均月利率",
              icon: "circle"
            },
            {
              name: "平均累放利率",
              icon: "circle"
            }
          ]
        },
      ],
      id: [{id:'echarts01'}],
      allDataB: [
        {
          chartName: '累放金额',
          filterParams:[],
        }
      ],
      idB: [{id:'echarts02'}],
      allDataC: [
        {
          chartName: '累放投放利率',
          yAxis:['累放利率'],
          noCompany: true,
          filterParams:[],
          legend: [
            {
              name: "平均累放利率",
              icon: "circle"
            },
            {
              name: "平均单月利率",
              icon: "circle"
            }
          ]
        }
      ],
      idC: [ 'echarts03'],
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
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index])
        return pre
      }, [])
    },
    getChartDataC() {
      return this.idC.reduce((pre, item, index) => {
        pre.push(this.allDataC[index])
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
    "v-cicle": Cicle,
    "v-bar": barSecond
  }
}
</script>
