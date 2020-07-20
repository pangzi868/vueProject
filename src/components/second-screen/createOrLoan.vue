<template>
  <div class="credit-properties">
    <!-- 底部的标题 -->
    <div class="middle-title" v-if="showCredit">
      <div class="middle-left middle-single">
        {{typeData.littleTitle[0]}}
        <span class="middle-titlea">
          平均值
          <span class="middle-num">{{bjAverange.perc}}</span>
        </span>
      </div>
      <div class="middle-right middle-single">
        {{typeData.littleTitle[1]}}
        <span class="middle-titlea">
          平均月数
          <span class="middle-num">{{qxAverange.perc}}月</span>
        </span>
      </div>
    </div>
    <div></div>
    <div class="bottom-graph" v-if="showCredit">
      <div v-if="typeData.type === 2" class="bottom-graph-div">
        <person-columnar
          class="person-columnar"
          :ids="createId"
          :chartData="industryColumnarData"
          v-if="industryJudge"
        />
        <person-columnar
          class="person-columnar sperial"
          :ids="loanId"
          v-if="enterpriseJudge"
          :chartData="enterpriseColumnarData"
        />
        <!-- <div class="line"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import PersonColumnar from "./personColumnar.vue";

export default {
  name: "",
  props: ["typeData", "indicatorData", "showCredit"],
  created() {
    this.getEnterpriseData();
  },
  mounted() {},
  data() {
    return {
      enterpriseJudge: false,
      industryJudge: false,
      industryColumnarData: {},
      createId: "createId",
      enterpriseColumnarData: {},
      loanId: "loanId",
      bjAverange: [],
      qxAverange: [],
      averangeMonth: '',
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
    getEnterpriseData() {
      let that = this;
      this.axios({
        url: "/api/p1/distributeInfo?category=xw_qx&flag=xw",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          this.qxAverange = tData.shift();
          this.qxAverange.perc = this.thousandFormat(this.qxAverange.perc, 1);
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.key);
            yAxis.push(parseFloat(item.perc));
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
        url: "/api/p1/distributeInfo?category=xw_ed&flag=xw",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          this.bjAverange = tData.shift();
          this.bjAverange.perc = this.thousandFormat(this.bjAverange.perc, 2);
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.key);
            yAxis.push(parseFloat(item.perc));
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
    "person-columnar": PersonColumnar
  }
};
</script>

<style lang="less" scoped>
.credit-properties {
  // padding: 1.97% 3.47%;
  .middle-title {
    width: 100%;
    // height: 6.36%;
    display: flex;
    justify-content: space-around;
    .middle-single {
      width: 44.18%;
      height: 100%;

      color: #ffffff;
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      letter-spacing: 0px;
      text-align: left;
      .middle-titlea {
        color: rgba(255, 255, 255, 0.5);
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 24px;
        line-height: 40px;
        letter-spacing: 0px;
        text-align: left;
        display: inline-block;
        padding-left: 24px;
        .middle-num {
          color: #49e5fa;
          font-family: Microsoft YaHei;
          font-weight: bold;
          font-size: 24px;
          line-height: 40px;
          letter-spacing: 0px;
          text-align: left;
          padding-left: 15px;
        }
      }
      // background: url("../../assets/images/title4.png") no-repeat;
      // background-size: 100% 100%;
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
      position: relative;
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
      .line {
        position: absolute;
        left: 641px;
        top: 11%;
        height: 85%;
        width: 1px;
        background: #00f7ff;
        opacity: 0.5;
        // border: 0.5px solid #00F7FF;
      }
      .sperial {
        height: 82%;
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
