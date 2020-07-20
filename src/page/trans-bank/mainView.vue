<template>
<div class="container">
1
  <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
  <v-card :card-data="getChartData" :ids="id" />
  <axis-chart :ids="idB" :chartData="getChartDatasB" />
  <axis-chartB :ids="idC" :chartData="getChartDatasC" />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import Card from "../../components/card.vue";
import AxisCharts from "../../components/axis-charts.vue";
import AxisChartsB from "../../components/axisChartsSecond.vue";
export default {
  name: "mainView",
  data() {
    return {
      allData: [
        {
          chartName: "全行公司客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "有效结算客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行有效客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行考核客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "对公一般性存款日均余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "对公一般性存款时点余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "对公活期日均存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "对公活期存款时点余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "有效结算客户活期存款日均余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "有效结算客户活期存款时点余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "保证金存款余额（含存单质押）",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "外汇存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "全行公司业务表内资产余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行业务员表内资产余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "全行公司业务表外余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行业务表外资产余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "外汇贷款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行手续费净收入",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "外汇汇兑收入",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "交易银行利息收入",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [
        { value: "echarts01" },
        { value: "echarts02" },
        { value: "echarts03" },
        { value: "echarts04" },
        { value: "echarts05" },
        { value: "echarts06" },
        { value: "echarts07" },
        { value: "echarts08" },
        { value: "echarts09" },
        { value: "echarts10" },
        { value: "echarts11" },
        { value: "echarts12" },
        { value: "echarts13" },
        { value: "echarts14" },
        { value: "echarts15" },
        { value: "echarts16" },
        { value: "echarts17" },
        { value: "echarts18" },
        { value: "echarts19" },
        { value: "echarts20" }
      ],
      idB: ["echarts1", "echarts2", "echarts3", "echarts4"],
      allDataB: [
        {
          chartName: "各分行有效结算客户任务完成情况",
          DrillDown: false,
          filterParams:['org','time'],
          money: Math.floor(Math.random() * 100000),
          legend:[{
              name: "目标任务数",
              icon: "roundRect"
            },
            {
              name: "有效结算客户完成数",
              icon: "roundRect"
            },
            {
              name: "全年完成率",
              icon: "circle"
            }]
        },
        {
          chartName: "各分行交易银行考核客户任务完成情况",
          DrillDown: false,
          filterParams:['org','time'],
          money: Math.floor(Math.random() * 100000),
          legend:[{
              name: "目标任务数",
              icon: "roundRect"
            },
            {
              name: "任务完成数",
              icon: "roundRect"
            },
            {
              name: "全年完成率",
              icon: "circle"
            }]
        },
        {
          chartName: "各分行交易银行有效客户任务完成情况",
          DrillDown: false,
          filterParams:['org','time'],
          money: Math.floor(Math.random() * 100000),
          legend:[{
              name: "目标任务数",
              icon: "roundRect"
            },
            {
              name: "月末客户数",
              icon: "roundRect"
            },
            {
              name: "全年完成率",
              icon: "circle"
            }]
        },
        {
          chartName: "各分行国际结算量完成情况",
          DrillDown: false,
          filterParams:['org','time'],
          money: Math.floor(Math.random() * 100000),
          series:[
            { type: 'bar'},
            { type: 'line'},
            { type: 'line'},
          ],
          legend:[{
              name: "月末结算量",
              icon: "roundRect"
            },
            {
              name: "全年完成率",
              icon: "circle"
            },
            {
              name: "序时完成率",
              icon: "circle"
            }]
        }
      ],
      idC: [{id:'echarts5'}],
      allDataC:[
        {
          chartName: "各分行中收任务完成情况",
          DrillDown: false,
          money: Math.floor(Math.random() * 100000),
          filterParams:['org','time'],
          yA:['全年任务指标','全年完成率'],
          series:[
            { type: 'bar'},
            { type: 'line'},
          ],
          legend:[{
              name: "全年任务指标",
              icon: "roundRect"
            },
            {
              name: "全年完成率",
              icon: "circle"
            }]
        },
      ],
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
        pre[index].money = this.$options.filters["numFormat"](
          pre[index].money
        );
        return pre;
      }, []);
    },
    getChartDatasB() {
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index]);
        return pre;
      }, []);
    },
    getChartDatasC() {
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
    "axis-chart": AxisCharts,
    "axis-chartB": AxisChartsB
  }
};
</script>

<style lang="less">
.content {
  .card {
    display: inline-block;
    margin: 2px;
    // border: 1px solid red;
    width: 240px;
    cursor: pointer;

    &:hover {
      -webkit-box-shadow: 0 10px 6px -6px #777;
      -moz-box-shadow: 0 10px 6px -6px #777;
      box-shadow: 0 10px 6px -6px #777;
    }
    .card {
      width: 300px;
    }

    .num {
      font-size: 20px;
      // font-weight: bold;
    }
  }
}
