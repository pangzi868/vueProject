<template>
  <div class="second-indicator">
    <div v-for="item in data" :key="item.key" class="single-in">
      <span class="name">{{item.name}}</span>
      <span class="special-value">{{item.value}}</span>
      <span class="huan">环比</span>
      <span class="special-huan">{{item.huan}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [],
  mounted() {
    // this.initColumnChart(this.ids, this.chartData);
  },
  data() {
    return {
      data: [
        {
          key: "zhixing",
          name: "执行额",
          value: 222,
          huan: "55.2%"
        },
        {
          key: "jihua",
          name: "计划额",
          value: 522,
          huan: "55.2%"
        },
        {
          key: "lv",
          name: "执行率",
          value: 822,
          huan: "55.2%"
        }
      ]
    };
  },
  computed: {},
  methods: {
    // initColumnChart(id, data) {
    //   let myCharts = this.$echarts.init(document.getElementById(id));
    //   myCharts.setOption({});
    // }
  },
  components: {},
  watch: {
    // chartData: function(newVal) {
    //   this.initColumnChart(this.ids, this.chartData);
    // }
  }
};
</script>

<style lang="less" scoped>
.single-in {
  width: 100%;
  height: 33%;
  color: #fff;
  font-size: 56px;
  padding: 25px 0;
  .name {
    display: block;
    font-size: 56px;
    line-height: 56px;
  }
  .special-value,
  .special-huan {
    color: rgba(0, 247, 255, 1);
    display: inline-block;
  }
  .special-value {
    margin-right: 32px;
    font-size: 96px;
  }
  .special-huan {
    font-size: 56px;
  }
  .huan {
    margin-right: 32px;
    display: inline-block;
    font-size: 40px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
