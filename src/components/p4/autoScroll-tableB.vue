<template>
  <div class="table-auto">
    <div class="p4-table-title">
      <span style="font-size: 32px;font-weight:bold">{{id.title}}</span>
    </div>
    <div class="scroll-box">
      <ul>
        <li v-for="item in columns" :key="item.key" :class="item.class">{{item.title}}</li>
      </ul>
      <table>
        <vue-seamless-scroll :data="tableData" :class-option="optionHover" class="seamless-warp">
          <tbody>
            <tr v-for="it in tableData" :key="it.key">
              <td
                v-for="item in columns"
                :key="item.key"
                :class="item.class"
              >{{it[item.key] || '--'}}</td>
            </tr>
          </tbody>
        </vue-seamless-scroll>
      </table>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "tableAuto",
  props: ["tableDatas", "ids", "columns", "heights", "needPoint"],
  data() {
    return {
      tableData: this.tableDatas,
      id: this.ids,
      animate: false,
      spreed: 2.5
    };
  },
  components: {
    vueSeamlessScroll
  },
  created() {
    setTimeout(() => {
      this.animate = true;
    }, 2000);
  },
  computed: {
    optionHover() {
      return {
        autoPlay: this.animate,
        hoverStop: false, // 鼠标悬停停止滚动
        // direction: 1, // 向下/上滚动
        limitMoveNum: 10, // 开启无缝滚动的数据量
        step: 2.5 // 滚动速度
        // singleHeight: 78, // 滚动单行
        // waitTime: 0 // 单行停顿时间
      };
    }
  },
  methods: {
  },
  beforeDestroy() {
    clearInterval(this.timerA);
    clearInterval(this.timerB);
  }
};
</script>
<style lang="less" scoped>
.table-auto {
  overflow: hidden;
  padding: 0 4%;
  height: 32%;
  .scroll-box {
    background-size: 94% 98%;
    padding: 0 4%;
    ul {
      width: 100%;
      padding: 3%;
      li {
        list-style: none;
        display: inline-block;
        width: 24%;
        text-align: center;
        color: #85befc;
        font-weight: bold;
        font-size: 22px;
      }
      :nth-child(2) {
        padding-left: 4%;
      }
      :nth-child(3) {
        padding-right: 1%;
      }
      :nth-child(4) {
        padding-right: 1%;
      }
    }
    table {
      tbody {
        tr {
          border-bottom: 1px solid rgba(140, 141, 142, 0.38);
          height: 78px;
        }
      }
      tr {
        text-align: center;
        padding: 10px;
        width: 100%;
      }
      td {
        color: #fff;
        text-align: center;
        padding: 2% 0;
        background: transparent;
        border: none;
        font-size: 20px;
      }
      .table-mobile {
        min-width: 280px;
      }
      .table-accent {
        min-width: 220px;
      }
      .table-product {
        min-width: 180px;
      }
      .table-want {
        min-width: 260px;
      }
    }
  }
}
.p4-table-title {
  text-align: left;
  padding-left: 2%;
}
.seamless-warp {
  height: 40%;
  overflow: hidden;
}
</style>