<template>
  <div class="credit-properties">
    <!-- <div class="content-title">
      <span class="first-title-span">{{typeData.first}}</span>
    </div>-->

    <!-- 底部的标题 -->
    <div class="middle-title" v-if="showCredit">
      <div class="middle-left middle-single">{{typeData.littleTitle[0]}}</div>
      <div class="middle-right middle-single">{{typeData.littleTitle[1]}}</div>
    </div>

    <div class="bottom-graph" v-if="showCredit">
      <div v-if="typeData.type === 1" class="top-graph-div">
        <classification-account
          class="company-columnar"
          idsLeft="account-chart"
          idsRight="account-columnar-chart"
          v-if="classificationData"
          :chartData="classificationData"
        />
        <income-level
          class="company-columnar"
          ids="company-columnar-chart"
          :chartData="levelData"
          v-if="levelData"
        />
      </div>
      <div v-else-if="typeData.type === 2" class="bottom-graph-div">
        <person-columnar
          class="person-columnar"
          :ids="industryColumnarId"
          :chartData="industryColumnarData"
          v-if="industryJudge"
        />
        <person-columnar
          class="person-columnar"
          :ids="enterpriseColumnarId"
          v-if="enterpriseJudge"
          :chartData="enterpriseColumnarData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonColumnar from "./personColumnar.vue";
import ClassificationAccount from "./classificationAccount.vue";
import IncomeLevel from "./incomeLevel.vue";

import ScrollSpan from "../../components/scrollSpan.vue";
export default {
  name: "",
  props: ["typeData", "indicatorData", "showCredit"],
  created() {
    this.getClassificationData();
    this.getLevelData();
    this.getEnterpriseData();
  },
  mounted() {},
  data() {
    return {
      enterpriseJudge: false,
      industryJudge: false,
      industryColumnarData: {},
      industryColumnarId: "industryColumnar",
      enterpriseColumnarData: {},
      enterpriseColumnarId: "enterpriseColumnar",
      classificationData: undefined,
      levelData: {}
    };
  },
  computed: {},
  methods: {
    // 格式化千分位
    thousandFormat(value, fixed) {
      fixed = fixed !== undefined ? fixed : 2;
      if (value === null || value === undefined || isNaN(parseFloat(value))) {
        return;
      }
      // 将数字进行千分位格式化
      function toThousands(num) {
        num = (num || 0).toString();
        var parts = num.split(".");
        var bigZeroPart = parts[0];
        var result = "";
        while (bigZeroPart.length > 3) {
          result = "," + bigZeroPart.slice(-3) + result;
          bigZeroPart = bigZeroPart.slice(0, bigZeroPart.length - 3);
        }
        if (bigZeroPart) {
          result = bigZeroPart + result;
        }
        if (parts.length > 1) {
          result += "." + parts[1].toString();
        }
        return result;
      }

      value = parseFloat(value).toFixed(fixed);
      value = toThousands(value);
      return value;
    },
    getClassificationData() {
      let that = this;
      this.axios({
        url: "/api/p2/category",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          that.classificationData = tData.map(item => {
            return {
              name: item.description,
              value: parseFloat(item.percent)
            };
          });
        }
      });
    },
    getLevelData() {
      let that = this;
      this.axios({
        url: "/api/p2/incomeLevel",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.description);
            yAxis.push(parseFloat(item.percent));
          });

          that.levelData = Object.assign({}, { xAxis: xAxis, yAxis: yAxis });
        }
      });
    },
    getEnterpriseData() {
      let that = this;
      this.axios({
        url: "/api/p2/cmpScale",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.description);
            yAxis.push(parseFloat(item.percent));
          });
          xAxis = xAxis.reverse();
          yAxis = yAxis.reverse();

          that.enterpriseColumnarData = Object.assign(
            {},
            { xAxis: xAxis, yAxis: yAxis, chartType: "percent" }
          );
          this.$nextTick(() => {
            this.enterpriseJudge = true;
          });
        }
      });
      this.axios({
        url: "/api/p2/industry",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.industryname);
            yAxis.push(parseFloat(item.percent));
          });
          // 客户要求写死数据
          // xAxis = ["零售批发", "金融业", "农业", "交通运输", "服务业"];
          // yAxis = [46.4, 18.6, 13.7, 6.5, 2.4];
          xAxis = xAxis.reverse();
          yAxis = yAxis.reverse();

          that.industryColumnarData = Object.assign(
            {},
            { xAxis: xAxis, yAxis: yAxis, chartType: "percent" }
          );
          this.$nextTick(() => {
            this.industryJudge = true;
          });
        }
      });
    }
  },
  components: {
    "person-columnar": PersonColumnar,
    "classification-account": ClassificationAccount,
    "income-level": IncomeLevel,
    "scroll-span": ScrollSpan
  }
};
</script>

<style lang="less" scoped>
.credit-properties {
  // padding: 1.97% 3.47%;
  .content-title {
    width: 100%;
    height: 9.55%;
    // background: url("../../assets/images/bg-content-title.png") no-repeat;
    // background-size: 100% 100%;
    margin-bottom: 2%;
    .first-title-span {
      display: block;
      smargin-left: 5%;
    }
  }
  .num-and-coin {
    width: 100%;
    // height: 17.36%;
    height: 70%;
    background: url("../../assets/images/group-7.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 2%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-single {
      display: flex;
      align-items: center;
      width: 49%;
      height: 100%;
      padding: 0.5% 6%;
      .portrait {
        height: 70%;
        width: 22%;
        background: url("../../assets/images/portrait-left.svg") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        .portrait-img {
          padding-top: 16%;
        }
      }
      .num-span {
        width: 88%;
        height: 88%;
        .num-span-title {
          font-size: 21px;
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
    .top-middle {
      width: 0.3%;
      height: 66%;
      background: url("../../assets/images/rectangle.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .middle-title {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .middle-single {
      width: 44.18%;
      height: 100%;

      color: #FFFFFF;
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
  .bottom-graph {
    padding-left: 40px;
    height: 95%;
    width: 100%;
    .top-graph-div {
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;

      .company-columnar {
        height: 100%;
        width: 45%;
        &:first-child {
          margin-right: 5%;
        }
      }
    }
    .bottom-graph-div {
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      .person-columnar {
        height: 100%;
        width: 45%;
        &:first-child {
          margin-right: 5%;
        }
      }
      .company-columnar {
        height: 100%;
        width: 45%;
        &:first-child {
          margin-right: 5%;
        }
      }
    }
  }
}
</style>
