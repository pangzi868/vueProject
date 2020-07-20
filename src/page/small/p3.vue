<template>
  <div class="p3-container">
    <!-- 头部 -->
    <div class="title-frame">
      <div class="global-title">智能反欺诈</div>
      <div class="right-time">
        <weather-com />
      </div>
    </div>

    <!-- 内容 -->
    <div class="frame-content">
      <div class="left-box">
        <div class="content-title">
          <span class="title1">风险交易金额趋势</span>
          <span class="wei">单位：元</span>
        </div>
        <amount-trends-chart />
        <div class="content-title">
          <span>风险交易拦截金额类型</span>
          <span class="wei1">单位：元</span>
        </div>
        <amount-type-chart />
        <microfinance-chart />
      </div>
      <div class="center-box">
        <!-- 地图 -->
        <div class="strategy-box">
          <real-time-strategy
            v-if="showUses"
            title="当日累计拦截金额"
            :num="usesTime.year"
            :blank="1"
            :float="'left'"
          />
          <real-time-strategy
            v-if="showUses"
            title="当日累计拦截笔数"
            :num="usesTime.day"
            :blank="2"
            :float="'right'"
          />
        </div>
        <map-chart class="map-charts" />
        <!-- <div class="map-panel"></div> -->
      </div>
      <div class="right-box">
        <div class="box">
          <div>
            <div class="content-title content-title2">
              <span>实时反欺诈模型决策占比</span>
            </div>
            <div class="decisionRate">
              <AntiFraudChart
                :ids="idsAntiFraud"
                :antiFraudDatas="antiFraudDatas"
              />
              <!-- <decisionRate-chart v-if="showRight" :ids="idsDecision" :tableDatas="decisionData" />
          <decisionRateB-chart v-if="showRight" :ids="idsDecisionB" :tableDatas="decisionDataB"  /> -->
            </div>
          </div>
          <div>
            <div class="content-title  content-title2">
              <span class='yz'>实时加强验证</span>
            </div>
            <verification-chart v-if="showRight" :tableDatas="tableDataV" />
          </div>
        </div>

        <div class="content-title">
          <span>实时欺诈风险画像</span>
        </div>
        <RiskPortraitChart
          v-if="showRight"
          :ids="idRisk"
          :tableDatas="tableDataR"
          :isShowPercent="true"
        />
        <RiskPortraitChart
          v-if="showRight"
          :ids="idRiskM"
          :tableDatas="tableDataRM"
          :isShowPercent="true"
        />
        <RiskPortraitChart
          v-if="showRight"
          :ids="idRiskR"
          :tableDatas="tableDataRR"
          :isShowPercent="true"
        />
        <!-- <div class="content-title">
          <span>Top5拒绝原因</span>
        </div>
        <top5-refuse-chart />-->
      </div>
    </div>
  </div>
</template>

<script>
import amountTrendsChart from "@/components/three-screen/amountTrendsChart";
import amountTypeChart from "@/components/three-screen/amountTypeChart";
import realTimeStrategy from "@/components/three-screen/realTimeStrategy";
import MapChart from "@/components/three-screen/mapChart.vue";
import PieChart from "@/components/three-screen/pieChart.vue";
import LoanMonitorChart from "@/components/three-screen/loanMonitorChart.vue";
import CustDistributeChart from "@/components/three-screen/custDistributeChart.vue";
import Top5RefuseChart from "@/components/three-screen/top5RefuseChart.vue";
import WeatherCom from "@/components/weather.vue";
import MicrofinanceChart from "@/components/three-screen/microfinanceChart.vue";
import RuleChart from "@/components/three-screen/ruleChart.vue";
import decisionRateChart from "@/components/three-screen/decisionRateChart.vue";
import decisionRateBChart from "@/components/three-screen/decisionRateBChart.vue";
import verificationChart from "@/components/three-screen/verificationChart.vue";
import * as base64 from "@/assets/base64.js";
import RiskPortraitChart from "@/components/p4/line-toRight.vue";
import moment, { max } from "moment";
import AntiFraudChart from "@/components/three-screen/antiFraudChart";
export default {
  data() {
    return {
      timer: null,
      amount: 0,
      showUses: false,
      showRight: false,
      usesTime: {
        year: 0,
        day: 0,
      },
      variableNum: 0,
      ruleNum: 0,
      idsDecision: {
        id: "echarts01",
        style: "width:44%",
      },
      idsDecisionB: {
        id: "echarts02",
        style: "width:55%",
      },
      decisionData: [],
      decisionDataB: [],
      idsAntiFraud: "idsAntiFraud",
      antiFraudDatas: [],
      verificationData: [],
      tableDataV: [
        {
          title: "生物识别",
          img: base64.confirm_d.value,
          times: "234",
        },
        {
          title: "密码加验",
          img: base64.confirm_f.value,
          times: "345",
        },
        {
          title: "短信加验",
          img: base64.confirm_a.value,
          times: "45",
        },
        {
          title: "人工外呼",
          img: base64.confirm_e.value,
          times: "23",
        },
      ],
      tableDataR: [
        {
          area: "南京",
          percent: 0.4,
        },
        {
          area: "福州",
          percent: 0.3,
        },
        {
          area: "杭州",
          percent: 0.2,
        },
        {
          area: "贵阳",
          percent: 0.08,
        },
        {
          area: "厦门",
          percent: 0.02,
        },
      ],
      tableDataRM: [
        {
          indexname: "华为荣耀",
          percent: 0.4,
        },
        {
          indexname: "华为mate",
          percent: 0.3,
        },
        {
          indexname: "小米米3",
          percent: 0.2,
        },
        {
          indexname: "Oppo11",
          percent: 0.08,
        },
        {
          indexname: "Apple8 ",
          percent: 0.02,
        },
      ],
      tableDataRR: [
        {
          indexname: "刷单",
          percent: 40,
        },
        {
          indexname: "卡片被盗",
          percent: 30,
        },
        {
          indexname: "账户接管",
          percent:20,
        },
        {
          indexname: "电信诈骗",
          percent: 8,
        },
        {
          indexname: "羊毛党",
          percent: 2
        },
      ],
      idRisk: {
        id: "echarts03",
        style: "height: 300px",
        title: "风险城市占比",
      },
      idRiskM: {
        id: "echarts04",
        style: "height: 300px",
        title: "风险设备占比",
      },
      idRiskR: {
        id: "echarts05",
        style: "height: 300px",
        title: "欺诈类型占比",
      },
    };
  },
  mounted() {
    // this.getAccRiskAll();
    this.timer = setInterval(() => {
      setTimeout(this.getAccRiskAll, 0);
    }, 3000);
    // this.getVariable();
    this.getRight = setInterval(() => {
      this.getRightData();
    }, 3000);
  },
  methods: {
    getAccRiskAll() {
      this.axios
        .all([
          this.axios.get("/api/p3/accRiskAll", {
            params: {
              type: "y",
            },
          }),
          this.axios.get("/api/p3/accRiskAll", {
            params: {
              type: "h",
            },
          }),
        ])
        .then(
          this.axios.spread((...obj) => {
            // this.usesTime = {
            //   year: obj[0].data.data,
            //   day: obj[1].data.data
            // }
            let year = this.usesTime.year;
            let day = this.usesTime.day;
            this.numFun(year, obj[0].data.data.amt, "year");
            this.numFun(day, obj[1].data.data.cnt, "day", 1000);
            this.$nextTick(() => {
              this.showUses = true;
            });
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    numFun(startNum, maxNum, name, speed = 5000) {
      var that = this;
      let numText = startNum;
      let dis = parseInt(maxNum) - parseInt(startNum);
      let golb; // 为了清除requestAnimationFrame
      function numSlideFun() {
        // 数字动画
        numText += parseInt(dis / (speed / 1000)); // 速度的计算可以为小数 。数字越大，滚动越快
        if (numText >= maxNum) {
          numText = maxNum;
          cancelAnimationFrame(golb);
        } else {
          golb = requestAnimationFrame(numSlideFun);
        }
        // debugger
        that.usesTime = { ...that.usesTime, [name]: numText };
        that.amount = numText;
      }
      numSlideFun(); // 调用数字动画
    },
    getRightData() {
      this.axios
        .all([
          this.axios.get("/api/p3/ratio"),
          this.axios.get("/api/p3/modelRatio"),
          this.axios.get("/api/p3/validSummary"),
          this.axios.get("/api/p3/riskGraph", {
            params: {
              type: "city",
            },
          }),
          this.axios.get("/api/p3/riskGraph", {
            params: {
              type: "device",
            },
          }),
          this.axios.get("/api/p3/riskGraph", {
            params: {
              type: "risktype",
            },
          }),
          this.axios.get("/api/p3/counterFake"),
        ])
        .then(
          this.axios.spread((...obj) => {
            this.decisionData = obj[0].data.data;
            this.transB(obj[1].data.data);
            this.transV(obj[2].data.data);
            this.tableDataR = obj[3].data.data;
            this.tableDataRM = obj[4].data.data;
            this.tableDataRR = obj[5].data.data;
            this.antiFraudDatas = obj[6].data.data.map((item) => {
              return { name: item.name, value: Number(item.value) };
            });
            this.$nextTick(() => {
              this.showRight = true;
            });
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    transB(arr) {
      let obj = [];
      arr.forEach((el) => {
        obj.push({
          name: el.model,
          value: el.percent,
        });
      });
      this.decisionDataB = obj;
    },
    transV(arr) {
      arr.forEach((el) => {
        this.tableDataV.forEach((it) => {
          if (it.title == el.type) {
            it.times = el.cnt;
          }
        });
      });
    },
    getVariable() {
      this.axios
        .get("/api/p3/variable", {
          params: {
            indexname: "bldy",
          },
        })
        .then((res) => {
          const { data } = res.data;
          this.variableNum = data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.axios
        .get("/api/p3/variable", {
          params: {
            indexname: "gzdy",
          },
        })
        .then((res) => {
          const { data } = res.data;
          this.ruleNum = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  components: {
    amountTrendsChart,
    amountTypeChart,
    realTimeStrategy,
    PieChart,
    MapChart,
    LoanMonitorChart,
    CustDistributeChart,
    Top5RefuseChart,
    WeatherCom,
    MicrofinanceChart,
    decisionRateChart,
    decisionRateBChart,
    verificationChart,
    RuleChart,
    RiskPortraitChart,
    AntiFraudChart,
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.getRight);
    this.timer = null;
  },
};
</script>

<style lang="less">
// @font-face {
//   font-family: "FZZhengHeiS-B-GB";
//   src: url(../../components/font/FZZDHJW.TTF); /***兼容ie9***/
// }
.p3-container {
  width: 4224px;
  height: 1536px;
  // width: 100%;
  // height: 100%;
  background: url("../../assets/images/p3/bg-three.png") no-repeat;
  background-size: 100% 100%;
  font-size: 28px;
  color: #fff;
  overflow-x: hidden;
  overflow-y: hidden;
  // overflow: hidden;
  // 标题样式
  .title-frame {
    width: 100%;
    height: 7%;
    background: url("../../assets/images/header.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-end;
    padding-bottom:1%;
    .global-title {
      width: 1366px;
      text-align: center;
      font-size: 64px;
      font-weight: bold;
      font-family: FZZhengHeiS-B-GB;
      // line-height: 1;
      padding: 0 184px 0 0;
    }
    .right-time {
      width: 1300px;
      text-align: right;
      margin-right: 20px;
    }
    .time-span {
      display: inline-block;
      margin-left: 5%;
    }
  }

  // 内容样式
  .frame-content {
    display: flex;
    justify-content: space-between;
    // height: 80%;
    padding: 0 40px;
    .left-box,
    .right-box {
      width: 27.2%;
      height: 1406px;
      background: rgba(22, 28, 40, 0.32);
      // opacity: 0.32;

      background-size: 100% 97%;
      .decisionRate {
        height: 18%;
        div {
          display: inline-block;
        }
      }
    }
    .center-box {
      position: relative;
      width: 45.4%;
      height: 100%;
      .strategy-box {
        display: flex;
        height: 210px;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
      .map-charts {
        width: 100%;
        height: 1160px;
      }
      .map-panel {
        position: absolute;
        right: 0;
        bottom: 50px;
        width: 140px;
        height: 140px;
        background: url("../../assets/images/p3/panel.png") no-repeat;
      }
    }
    .content-title {
      position: relative;
      width: 88%;
      height: 60px;
      // background: url("../../assets/images/p3/title-three.png") no-repeat;
      background-size: 100% 100%;
      // margin: 16px auto 0;
      span {
        display: inline-block;
        font-size: 30px;
        padding: 17px 0 0 40px;
        color: #ffffff;
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        letter-spacing: 0px;
        text-align: left;
      }
    }
  }
}
.title1 {
  margin-top: 18px;
}
.box {
  width: 100%;
  display: flex;
  &:nth-child(1) {
    flex: 1;
  }
  &:nth-child(2) {
    flex: 1;
  }
}
.wei {
  position: absolute;
  top: 65px;
  right: 830px;
  color: rgba(255, 255, 255, 0.7) !important;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 20px !important;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: left;
}
.wei1 {
  position: absolute;
  top: 45px;
  right: 840px;
  color: rgba(255, 255, 255, 0.7) !important;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 20px !important;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: left;
}
.content-title2 span{
  margin-top: 23px;
}
.yz{
   padding:17px 0  0 10px !important;
}
</style>
