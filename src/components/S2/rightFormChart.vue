<template>
  <div class="form-chart">
    <div class="single-form-chart">
      <table>
        <tbody>
          <tr v-for="(items, index) in ranking" :key="index">
            <th class="ranking">{{index + 1 < 10 ? '0' + (index + 1) : index + 1}}</th>
            <th class="name">{{items.name}}</th>
            <th>{{items.value}}</th>
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
    return {
      ranking: [
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 },
        { name: "长春", value: 132 }
      ]
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
.form-chart {
  display: flex;
  color: #fff;
  font-size: 56px;
  .single-form-chart {
    width: 100%;
    tbody {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      width: 100%;
      height: 658px;
    }
    table {
      width: 100%;
      height: 658px;
      tr {
        width: 50%;
        height: 68px;
        line-height: 60px;
        margin-bottom: 60px;
        .img-span {
          width: 30px;
        }
      }
    }
    .ranking {
      color: #00ffff;
      padding-right: 22px;
      width: 100px;
    }
    .name {
      width: 250px;
    }
  }
}
</style>
