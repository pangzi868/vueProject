<template>
  <div class="card-group">
    <!-- <div class="echarts w100 axis"></div> -->
    <div class="single-card"
        v-for="(item) in indicatorData"
        :key="item.index"
        :id="item.index">
      <div>{{item.name}}</div>
      <div class="single-data">{{item.data}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "axis",
  props: ["chartData"],
  mounted() {
    this.getData(this.chartData);
  },
  data() {
    return {
      todos: [],
      echartState: {}, // 标识 图表是否已经下钻
      indicatorData: []
    };
  },
  methods: {
    getData(chartData) {
      this.indicatorData = [...chartData];
    }
  }
};
</script>

<style lang="less">
.card-group {
  min-width: 100%;
  height: 2%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 3%;
  flex-wrap: wrap;
  .single-card {
    width: 33%;
    text-align: center;
    padding-bottom: 4%;
    .single-data {
        color: #00DDDD
    }
  }
}
</style>
