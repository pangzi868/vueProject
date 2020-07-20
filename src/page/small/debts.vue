<template>
<div class="container">
  <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
  <v-card :card-data="getChartData" :ids="id" />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import Card from "../../components/card";
export default {
  name: "mainView",
  data() {
    return {
      allData: [
        {
          chartName: "存款时点",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "总存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "活期存款时点",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "活期存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "定期存款时点",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "定期存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "理财存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "理财存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "保证金存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "保证金存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "其他项活期存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "其他项活期存款年日均",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "担保公司保证金存款余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "担保公司保证金存款年日均",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [
        { width: "w50", value: "echarts01" },
        { width: "w50", value: "echarts02" },
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
      ],
      allDataB: [],
      idB: [],
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
    getChartDataB() {
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index]);
        pre[index].money = this.$options.filters["numFormat"](
          pre[index].money
        );
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
    "v-card": Card
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

    .num {
      font-size: 20px;
      // font-weight: bold;
    }
  }
}
