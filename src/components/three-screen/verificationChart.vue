<template>
  <div class="verification">
    <ul>
      <li v-for="item in tableData" :key="item.title">
        <img :src="item.img" alt="" />
        <div class="item-title">{{ item.title }}</div>
        <!-- <div><i>{{item.times}}</i>次</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "verification",
  props: ["tableDatas"],
  data() {
    return {
      id: this.ids,
      tableData: this.tableDatas,
    };
  },
  mounted() {
    // console.log(this.tableData)
  },
  methods: {},
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  components: {},
};
</script>

<style lang="less" scoped>
.verification {
  height: 16%;
  margin-top: 90px;
  ul {
    width: 80%;
    margin: 0 auto;
    display: flex;
    color: #ccc;
    justify-content: space-around;
    li {
      list-style: normal;
      display: inline-block;
      width: 24%;
      text-align: center;
      padding-top: 20px;
      margin-right: 32px;
      i {
        font-style: normal;
        color: #587d5d;
      }
      img {
        width: 122px;
      }
      .item-title {
        color: #ffffff;
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 24px;
        line-height: 40px;
        letter-spacing: 0px;
        margin-top: 18px;
      }
    }
  }
}
</style>
