<template>
  <div id="num-and-coin">
    <div class="top-left top-single">
      <div class="portrait">
        <img class="portrait-img" src="../../assets/images/icon3.png" alt />
      </div>
      <div class="server-num num-span">
        <span>{{tableData[0].name}}</span>
        <span>{{tableData[0].value}}</span>
      </div>
    </div>
    <div class="top-right top-single">
      <div class="portrait">
        <img class="portrait-img" src="../../assets/images/icon3.png" alt />
      </div>
      <div class="shouxin-num num-span">
        <span>{{tableData[1].name}}</span>
        <span>{{tableData[1].value}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card-num",
  props: ["tableDatas"],
  data() {
    return {
      tableData: this.tableDatas
    };
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
#num-and-coin {
  margin: 0 auto;
  background-size: 100% 100%;
  justify-content: space-around;
  align-items: center;
  padding: 2.8%;
  display: flex;
  .top-single {
    display: flex;
    align-items: center;
    height: 100%;
    padding-bottom: 3%;
    width: 50%;
    .portrait {
      .portrait-img {
        padding: 16%;
        width: 116px;
        height: 116px;
      }
    }
    .num-span {
      width: 88%;
      height: 88%;
      display: flex;
      align-items: left;
      flex-flow: column;
      margin-left: 4%;
      :nth-child(1) {
        font-size: 32px;
        font-weight: bold;
      }
      :nth-child(2) {
        display: inline-block;
        font-size: 64px;
        color: #6FFEFF;
        font-weight: bold;
      }
    }
    .middle-rec {
      background: url("../../assets/images/num-cut-off.png") no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 10%;
    }
    .num-span-data {
      font-size: 36px;
      height: 100%;
      color: #04bbff;
      display: inline-block;
      overflow: hidden;

      .total-money-span {
        height: 40%;
      }
    }
  }
}
</style>