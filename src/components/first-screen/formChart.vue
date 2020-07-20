<template>
  <div class="form-chart">
    <div class="single-form-chart" v-for="(item) in ids" :key="item.id">
      <!-- <div class="form-chart-title">{{item.title}}</div> -->
      <table>
        <thead v-if="tableTitle">
          <tr class="table-head">
            <th colspan="4" style="text-align: center;">{{tableTitle}}</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <th>图标</th>
            <th>指标</th>
            <th>数值</th>
            <th>单位</th>
          </tr>-->
          <tr v-for="(items, index) in chartData[item.id]" :key="index">
            <th>
              <img class="img-span" :src="items.icon" :alt="items.icon" />
            </th>
            <!-- <th class="ranking">Top{{index + 1}}</th> -->
            <th>{{items.indicator}}</th>
            <th class="ranking">{{items.value}}</th>
            <th>{{items.unit}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData", "tableTitle"],
  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
.form-chart {
  display: flex;
  .single-form-chart {
    width: 100%;
    table {
      width: 100%;
      .table-head {
        font-size: 32px;
      }
      tr {
        height: 60px;
        line-height: 60px;
        .img-span {
          width: 30px;
        }
      }
    }
    .ranking {
      color: #00ffff;
    }
  }
}
</style>
