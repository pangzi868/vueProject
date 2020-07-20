<template>
<div class="container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <v-card :card-data="getChartData" :ids="id" />
    <v-circle :ids="idB" :chartData="getChartDataB" />
    <axis-chart :ids="idC" :chartData="getChartDataC" />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import Card from "../../components/card";
import circle from '../../components/circleSecond.vue'
import AxisCharts from '../../components/axisChartsSecond.vue'
export default {
  mounted() {
  },
  data() {
    return {
      allData: [
        {
          chartName: "本年代发客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "本年代发总额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "上月代发客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "上月代发金额",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [
        { value: "echarts01" },
        { value: "echarts02" },
        { value: "echarts03" },
        { value: "echarts04" },
      ],
      allDataB: [
        {
          chartName: "信贷客户数(表内)",
          legend: [
            {
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "roundRect"
            },
            {
              name: "贷款客户数",
              icon: "roundRect"
            }
          ],
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "信贷客户数(表内)",
          legend: [
            {
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "roundRect"
            },
            {
              name: "贷款客户数",
              icon: "roundRect"
            }
          ],
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "信贷客户数(表内)",
          legend: [
            {
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "roundRect"
            },
            {
              name: "贷款客户数",
              icon: "roundRect"
            }
          ],
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "信贷资产余额(表内)",
          legend: [
            {
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "circle"
            },
            {
              name: "贷款客户数",
              icon: "circle"
            }
          ],
          money: Math.floor(Math.random() * 100000)
        }
      ],
      idB: ["echarts05", "echarts06","echarts07", "echarts08"],
      allDataC: [
        {
          chartName: "代发情况信息",
          yA: ['月累计代发总额','月累计代发客户数'],
          money: Math.floor(Math.random() * 100000)
        }
      ],
      idC: [ {id:"echarts09"}],
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
    };
  },
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index]);
        return pre;
      }, []);
    },
    getChartDataB() {
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index]);
        return pre;
      }, []);
    },
    getChartDataC() {
      return this.idC.reduce((pre, item, index) => {
        pre.push(this.allDataC[index]);
        return pre;
      }, []);
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
    "v-card": Card,
    "v-circle": circle,
    "axis-chart": AxisCharts
  }
};
</script>
