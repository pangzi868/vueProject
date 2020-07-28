<template>
  <div class="container" :id="ids"></div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.initColumnChart(this.ids, this.chartData);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    initColumnChart(id, data) {
      let myCharts = this.$echarts.init(document.getElementById(id));
      myCharts.setOption({});
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      this.initColumnChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
