<template>
  <div class="container">
    <div :class="'brain-bgg'">
      <div class="header">
        <span class="header-bg">智能客服</span>
        <!--  智能服务 -->
        <div class="right-time">
          <weather-com />
        </div>
      </div>
      <div class="main-content" v-if="showMain">
        <div class="left">
          <card-num :tableDatas="tableDataTop" />
          <table-auto
            :tableDatas="tableDataAs"
            :ids="idA"
            :columns="columnA"
            :heights="clientHeight"
            @func="getPoint"
          />
          <pop-custom :tableDatas="tableDataB" :ids="idB" :heights="clientHeight" />
        </div>
        <div class="center">
          <!-- <div class="title">
            <span>机器人累计服务人数</span>
            <span>31,857</span>
          </div>-->
          <big-head
            :tableDatas="tableDataCs"
            :ids="idC"
            :heights="clientHeight"
            @func="fromHead"
            :bigPoint="bigPointt"
          />
        </div>
        <div class="right">
          <card-num :tableDatas="tableDataRights" />
          <table-autoB
            :tableDatas="tableDataC"
            :ids="idC"
            :columns="columnC"
            :heights="clientHeight"
            @func="getPoint"
          />
          <pop-custom :tableDatas="tableDataD" :ids="idD" :heights="clientHeight" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Yin from "../../assets/images/yin.png";
import Yu from "../../assets/images/yu.png";
import tableAuto from "../../components/p4/autoScroll-table.vue";
import tableAutoB from "../../components/p4/autoScroll-tableB.vue";
import lineToRight from "../../components/p4/line-toRight.vue";
import bigHeadVue from "../../components/p4/big-head.vue";
import popCustom from "../../components/p4/pop-custom.vue";
import WeatherCom from "../../components/weather.vue";
import cardNum from "../../components/p4/card-num.vue";
import * as base64 from "@/assets/base64.js";

const columnA = [
  {
    dataIndex: "mobile",
    key: "mobile",
    class: "table-mobile",
    title: "手机号",
    align: "center",
    width: "20%"
  },
  {
    dataIndex: "action",
    key: "action",
    class: "table-action",
    title: "行为",
    align: "center",
    width: "20%"
  },
  {
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
    class: "table-status",
    title: "状态",
    align: "center",
    width: "16%"
  },
  {
    dataIndex: "problem",
    key: "problem",
    class: "table-problem",
    title: "问题定位",
    align: "center",
    width: "24%"
  },
  {
    dataIndex: "handle",
    key: "handle",
    class: "table-handle",
    title: "智能处理",
    align: "center",
    width: "20%"
  }
];
const columnC = [
  {
    dataIndex: "mobile",
    key: "mobile",
    class: "table-mobile",
    title: "手机号",
    align: "center",
    width: "20%"
  },
  {
    dataIndex: "accent",
    key: "accent",
    class: "table-accent",
    title: "口音识别",
    align: "center",
    width: "20%"
  },
  {
    dataIndex: "product",
    key: "product",
    class: "table-product",
    title: "产品",
    align: "center",
    width: "20%"
  },
  {
    dataIndex: "want",
    key: "want",
    class: "table-want",
    title: "客户意图",
    align: "center",
    width: "24%"
  }
];
export default {
  data() {
    return {
      headValue: true,
      showMain: false,
      // 时间
      tableDataTop: [
        {
          name: "客服智能处置率",
          value: "91%"
        },
        {
          name: "事中客服处置率",
          value: "30%"
        }
      ],
      tableDataRight: [
        {
          name: "智能外呼数量",
          value: 150
        },
        {
          name: "人机交互轮次",
          value: "6"
        }
      ],

      tableDataA: [],
      idA: {
        id: "echarts01",
        title: "机器人客服"
      },
      columnA: columnA,
      tableDataB: [],
      tableDataBB: [],
      idB: {
        id: "echarts02",
        title: "客户问题解决",
        action: "活动：信贷MGM"
      },
      tableDataC: [],
      idC: {
        id: "echarts03",
        title: "机器人催收"
      },
      columnC: columnC,
      idD: {
        id: "echarts04",
        title: "客户意愿理解"
      },
      tableDataD: [],
      clientHeight: document.body.clientHeight,
      bigPoints: {}
    };
  },
  created() {},
  computed: {
    tableDataAs() {
      return this.tableDataA;
    },
    tableDataCs() {
      return this.tableDataC;
    },
    tableDataDs() {
      return this.tableDataD;
    },
    bigPointt() {
      return this.bigPoints;
    },
    tableDataRights() {
      return this.tableDataRight;
    }
  },
  mounted() {
    this.init();
    this.timer = setInterval(() => {
      this.init();
    }, 60000);
    this.tA();
    this.tB();
    this.tD();
  },
  methods: {
    init() {
      this.axios
        .all([
          this.axios.get("/api/p4/smartCall"),
          this.axios.get("/api/p4/smartOperation"),
          this.axios.get("/api/p4/outboundNum"), //外呼数量
          this.axios.get("/api/p4/procRatio", {
            params: {
              indexname: "kfzn"
            }
          }),
          this.axios.get("/api/p4/procRatio", {
            params: {
              indexname: "zxzn"
            }
          }),
          this.axios.get("/api/p4/procRatio", {
            params: {
              indexname: "dtsc"
            }
          })
        ])
        .then(
          this.axios.spread((...obj) => {
            obj.forEach((it, i) => {
              let data = it.data.data;
              if (i == 0) {
                this.tableDataC = data;
              } else if (i == 1) {
                let arr = data;
                this.tableDataA = arr;
                // this.transTableDataB(arr);
              } else if (i == 2) {
                // this.tableDataRight[0].value = data || 150;
              } else if (i == 3) {
                this.tableDataTop[0].value = (data || "30") + '%';
              } else if (i == 4) {
                this.tableDataTop[1].value = (data || "91") + '%';
              } else if (i == 5) {
                this.tableDataRight[1].value = data || 6;
              }
            });
            this.$nextTick(() => {
              this.showMain = true;
            });
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    transTableDataB(arr) {
      let a = [],
        b = [];
      arr[0] &&
        arr.forEach(it => {
          if (a.indexOf(it.problem) == -1) {
            a.push(it.problem);
          }
        });
      // console.log(a)
      // a.forEach( it => {
      //   b.push( {
      //     key: it,
      //     val: Math.floor(Math.random()*50) + 50
      //   })
      // })
      this.tableDataBB.forEach(it => {});
      this.tableDataB = this._.cloneDeep(this.tableDataBB);
      // console.log(this.tableDataB)
    },

    tA() {
      this.getTableDataA();
      this.timerB = setInterval(() => {
        console.log('tA')
        this.getTableDataA();
      }, 15000);
    },
    tB() {
      this.getTableDataB();
      this.timerD = setInterval(() => {
        this.getTableDataB();
      }, 6000);
    },
    tD() {
      this.getTableDataD();
      this.timerD = setInterval(() => {
        this.getTableDataD();
      }, 6000);
    },
    getTableDataA() {
      this.axios({
        url: "/api/p4/smartOperation",
        method: "get",
        params: {
          count: 6
        },
        type: "json"
      }).then(data => {
        let arr = data.data.data;
        this.bigPoints = arr;
      });
    },
    getTableDataB() {
      this.axios({
        url: "/api/p3/wordCloud",
        params: {
          category: "khwtjj"
        },
        method: "get",
        type: "json"
      }).then(data => {
        this.tableDataB = data.data.data;
        this.tableDataBB = data.data.data;
      });
    },
    getTableDataD() {
      this.axios({
        url: "/api/p3/wordCloud",
        params: {
          category: "khyylj"
        },
        method: "get",
        type: "json"
      }).then(data => {
        this.tableDataD = data.data.data;
      });
    },

    fromHead(obj) {
      this.headValue = obj.value;
    },
    getPoint(par) {
      this.bigPoints = par;
      if (par.accent) {
        this.tableDataRight[0].value += 1;
        let cc = this._.cloneDeep(this.tableDataD);
        cc.forEach(it => {
          if (it.want === par.want) {
            it.num += 1;
          }
        });
        this.tableDataD = cc;
      } else if (par.problem) {
        let cc = this._.cloneDeep(this.tableDataB);
        cc.forEach(it => {
          if (it.problem === par.problem) {
            it.num += 1;
          }
        });
        this.tableDataB = cc;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timerB);
    clearInterval(this.timerD);
  },
  components: {
    "card-num": cardNum,
    "table-auto": tableAuto,
    "table-autoB": tableAutoB,
    "line-right": lineToRight,
    "big-head": bigHeadVue,
    "pop-custom": popCustom,
    "weather-com": WeatherCom
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 4224px;
  height: 1536px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: #fff;
  font-family: Microsoft YaHei;
  background: url("../../assets/images/p4-background.png") no-repeat 100% 100%;
  background-size: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .brain-bgg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    background-size: 70%;
  }
  .time-span {
    margin-left: 5%;
  }
  .header {
    height: 7%;
    text-align: center;
    background: url("../../assets/images/header.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    position: relative;
    .header-bg {
      // display: inline-block;
      // // background: url("../../assets/images/p4-title.png") no-repeat center;
      // background-size: 18%;
      // font-size: 40px;
      // font-weight: bold;
      // width: 30%;
      // height: 100%;
      color: #ffffff;
      text-shadow: 0px 6px 8px 0 #000000;
      font-family: FZZhengHeiS-B-GB;;
      font-weight: bold;
      font-size: 64px;
      line-height: normal;
      letter-spacing: 8px;
      text-align: center;
    }
    .right-time {
      width: 23%;
      text-align: right;
      position: absolute;
      top: 1%;
      right: 1%;
    }
  }
  .main-content {
    height: 93%;
    display: flex;
    div {
      display: inline-block;
      width: 100%;
    }
    .left {
      width: 1232px;
      height: 1400px;
      vertical-align: top;
      background: rgba(22, 28, 40, 0.2);
    }
    .center {
      width: 45.4%;
      position: relative;
      height: 97%;
      font-family: Microsoft YaHei;
      .title {
        text-align: center;
        font-weight: bold;
        color: #fff;
        width: 100%;
        height: 20%;
        font-size: 38px;
        padding: 2%;
        :nth-child(1) {
          font-size: 32px;
        }
        :nth-child(2) {
          display: block;
          padding-top: 20px;
          font-size: 80px;
        }
      }
    }
    .right {
      width: 1232px;
      height: 1400px;
      vertical-align: top;
      background: rgba(22, 28, 40, 0.2);
    }
  }
}
</style>
