<template>
  <div class="second-screen">
    <!-- 头部 -->
    <div class="title-frame">
      <div class="title-left"></div>
      <div class="global-title">小微金融</div>
      <div class="right-time">
        <weather-com />
      </div>
    </div>

    <!-- 内容 -->
    <div class="frame-content">
      <div class="content-left">
        <titleOrNum :title="xtitle" :num="xnum" />
        <div class="left-center">
          <div class="single-distribution">
            <span class="single-graph-title">首贷占比</span>
            <cyclic-annular
              class="basic-chart"
              :ids="financeId"
              :chartData="opPeriodData"
            />
          </div>
          <div class="single-distribution">
            <span class="single-graph-title">经营年限</span>
            <whole-pie-chart
              class="basic-chart"
              :ids="financeNameId"
              :chartData="financeData"
            />
          </div>
        </div>
        <credit-properties-chart
          class="left-btm"
          :typeData="personLoans"
          :indicatorData="personData"
          :showCredit="showPropertyCredit"
        />
      </div>
      <div class="content-middle">
        <centerTitleOrNum :title="ctitle" :num="cnum" />
        <sec-map-chart v-if="mapJudge" class="sec-map-charts" />
      </div>
      <div class="content-right">
        <titleOrNum :title="dtitle" :num="dnum" />
        <div class="right-center">
          <cyclicAndPie class="item-pie" :ids="loanModelId" :title="loanModelTitle" :chartData="loanModelData" />
          <cyclicAndPie  class="item-pie" :ids="serveModelId" :title="serveModelTitle" :chartData="serveModelData" />
        </div>
        <createOrLoan
          class="right-btm"
          :typeData="averangeLoans"
          :indicatorData="personData"
          :showCredit="showPropertyCredit"
        />
        <distribution-chart :ids="distributionIds" v-if="showRight" :chartData="distributionData" />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCom from "../../components/weather.vue";
import CreditPropertiesChart from "../../components/second-screen/creditPropertiesChart.vue";
import SecMapChart from "../../components/second-screen/secondMapChart.vue";
import titleOrNum from "../../components/titleOrNum.vue"
import centerTitleOrNum from "../../components/centerTitleOrNum.vue"
import createOrLoan from "../../components/second-screen/createOrLoan.vue"
import cyclicAndPie from "../../components/second-screen/cyclicAndPie.vue"
import CyclicAnnular from "@/components/second-screen/cyclicAnnlar.vue";
import WholePieChart from "@/components/second-screen/wholePieChart.vue";

export default {
  mounted() {},
  data() {
    return {
      xtitle:'小微客户服务数',
      xnum: '',
      dtitle:'小微贷款累计投放金额',
      dnum: '',
      ctitle:'小微服务金额',
      cnum: '',
      loanModelId: 'loanModelId',
      loanModelData: [],
      loanModelTitle:'信用占比',
      serveModelId: 'serveModelId',
      serveModelData: [],
      serveModelTitle:'线上占比',
      personLoans: {
        littleTitle: ["服务行业", "企业规模"],
        type: 2
      },
      averangeLoans: {
        littleTitle: ["户均金额", "贷款期限"],
        type: 2
      },
      showPortrayal: false,
      showPropertyCredit: false,
      propertyData: {},
      personData: {},
      OpperiodAndFinance: {},
      financeId:'financeId',
      financeData:[],
      financeNameId:'financeNameId',
      opPeriodData:[],
      serverData: [],
      mapData: [],
      mapJudge: false,
      showRight: false,

      distributionIds: "distributionIds",
      distributionData: {},
      
      mapInterval: undefined,
      coinInterval: undefined,
    };
  },
  computed: {},
  created() {
    this.getOpperiodAndFinance();
    this.getPropertyCredit();
    // this.getProductHandler();
    this.getMapData();
    this.getLoanModelData()
    this.getServeModelData()
    this.rollData()
  },
  methods: {
    // 将数字进行千分位格式化
      toThousands(num,tofix) {
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
        }else {
          result += "." + '00';
        }
        if(tofix && tofix == '0') {
          result = result.split('.')[0]
        }
        return result;
      },
    // 信用占比
    getLoanModelData() {
      let _that = this;
      this.axios({
        url: "/api/p1/distributeInfo?category=xw_xydb&flag=xw",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        var indiData = data.data.data? 
        data.data.data.map(item => {
          return {
            name: item.key,
            value: item.perc
          };
        }): [];
        _that.loanModelData = indiData
      });
    },
    // 线上占比
    getServeModelData() {
      let _that = this;
      this.axios({
        url: "/api/p1/distributeInfo?category=xw_xsxx&flag=xw",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        var indiData = data.data.data? 
        data.data.data.map(item => {
          return {
            name: item.key,
            value: item.perc
          };
        }): [];
        _that.serveModelData = indiData
      });
    },
    // 首贷占比，经营年限
    getOpperiodAndFinance() {
      this.axios
        .all([
          this.axios.get("/api/p2/opperiodAndFinance?dcode=finance"),
          this.axios.get("/api/p2/opperiodAndFinance?dcode=op_period"),
          this.axios.get("/api/p2/area")
        ])
        .then(
          this.axios.spread((...obj) => {
            let financeData = [];
            let opPeriodData = [];
            let reg = /4年/g;
            financeData = obj[1].data.data
              ? obj[1].data.data.map(item => {
                  return {
                    name: item.xid.replace(reg, '3年+'),
                    value: item.perc
                  };
                })
              : [];
            function compare(property){
                return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value1 - value2;
                }
            }
            const data= obj[0].data.data.sort(compare('seq'))
            opPeriodData = data
              ? data.map(item => {
                  return {
                    name: item.xid,
                    value: item.perc
                  };
                })
              : [];
            this.financeData=financeData;
            this.opPeriodData=opPeriodData;
            this.OpperiodAndFinance = Object.assign(
              {},
              {
                finance: financeData,
                op_period: opPeriodData,
                financeName: "经营年限",
                opPeriodName: "借款状态"
              }
            );
            // this.OpperiodAndFinance["finance"] = obj[0].data.data;
            // this.OpperiodAndFinance["op_period"] = obj[1].data.data;
            this.serverData = obj[2].data.data;
            this.$nextTick(() => {
              this.showPortrayal = true;
            });
          })
        );
    },
    // 小微客户服务数/小微服务金额/小微贷款累计投放金额
    getTopData() {
      let _that = this;
      this.axios
        .all([
          this.axios.get("/api/p2/custnum"), //客服数
          this.axios.get("/api/p2/bal"), // 贷款投放
          this.axios.get("/api/p2/principal"), // 服务金额
        ])
        .then(
          this.axios.spread((...obj) => {
            // 客服数
            _that.xnum = this.thousandFormat(obj[0].data.data || 0, 0)
            // 贷款
            _that.dnum = this.thousandFormat(obj[2].data.data || 0, 2)
            // 服务金额
            _that.cnum = this.thousandFormat(obj[1].data.data || 0, 2)
          })
        );
    },
    // 5s请求一次数据
    rollData() {
      this.getTopData();
      var _that = this;
      var index = 0;
      // if (coinInterval) clearInterval(coinInterval);
      this.coinInterval = setInterval(
        () => {
          this.getTopData();
        },
        5000,
        _that,
        index
      );
    },
    getPropertyCredit() {
      let _that = this;
      this.axios({
        url: "/api/p2/xwBaseinfo",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        var indiData = data.data.data || {};
        _that.propertyData = Object.assign(
          {},
          {
            applyperson: (indiData.credit / 100000000).toFixed(2),
            applyvalue: indiData.custnum,
            applynum: (indiData.bal / 100000000).toFixed(2)
          }
        );
        _that.personData = Object.assign(
          {},
          {
            applyperson: indiData.bijun,
            applyvalue: indiData.hujun,
            applynum: indiData.avgnum
          }
        );
        _that.$nextTick(() => {
          _that.showPropertyCredit = true;
        });
      });
    },
    getMapData() {
      this.getMapDataHandler();
    },

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
    // 地图卡片数据
    getMapDataHandler() {
      var _that = this;
      // 获取地图数据
      this.axios({
        url: "/api/p2/graphInfo",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          let index = 0;
          _that.mapData = [];
          let firstTmpData = tData[index];
          _that.mapData.push({
            company: firstTmpData.companyname,
            province: firstTmpData.province,
            credit: _that.thousandFormat(firstTmpData.credit, 2),
            value: [firstTmpData.longitude, firstTmpData.latitude]
          });

          this.mapInterval = setInterval(
            () => {
              // _that.getMapDataHandler();
              if (index >= tData.length - 1) {
                _that.getMapDataHandler();
                clearInterval(this.mapInterval);
                return;
              }
              index++;
              _that.mapData = [];
              let tmpData = tData[index];
              _that.mapData.push({
                company: tmpData.companyname,
                province: tmpData.province,
                credit: _that.thousandFormat(tmpData.credit, 2),
                value: [tmpData.longitude, tmpData.latitude]
              });
            },
            5000,
            _that,
            index
          );
          this.$nextTick(() => {
            _that.mapJudge = true;
          });
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.coinInterval);
  },
  components: {
    "weather-com": WeatherCom,
    "credit-properties-chart": CreditPropertiesChart,
    "sec-map-chart": SecMapChart,
    "titleOrNum":titleOrNum,
    "centerTitleOrNum":centerTitleOrNum,
    "createOrLoan":createOrLoan,
    "cyclicAndPie":cyclicAndPie,
    "cyclic-annular": CyclicAnnular,
    "whole-pie-chart": WholePieChart,
  }
};
</script>

<style lang="less" scoped>
.second-screen {
  width: 4224px;
  height: 1536px;
  overflow: hidden;
  background: url("../../assets/images/background-second.png") no-repeat;
  background-size: 100% 100%;
  // padding-top: 1%;
  font-size: 28px;
  color: #fff;
  font-family: Microsoft YaHei;

  // 标题样式
  .title-frame {
    width: 100%;
    height: 7%;
    background: url("../../assets/images/header.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1%;
    .title-left {
      width: 33%;
    }
    .global-title {
      width: 33%;
      letter-spacing: 1px;
      text-align: center;
      font-size: 64px;
      font-weight: bold;
      font-family: FZZhengHeiS-B-GB;
    }
    .right-time {
      width: 33%;
      text-align: right;
    }
    .time-span {
      display: inline-block;
      margin-left: 5%;
    }
  }

  // 内容样式
  .frame-content {
    display: flex;
    height: 94%;
    width: 100%;
    .content-left,
    .content-right {
      width: 29.5%;
      height: 100%;
    }

    // 中部
    .content-middle {
      width: 45%;
      height: 100%;
      padding: 0.6% 1%;
    }

    // 左侧
    .content-left {
      background: rgba(22, 28, 40, 0.32);
      // background: url("../../assets/images/bg-8.png") no-repeat;
      // background-size: 100% 100%;
      .left-center {
        width: 100%;
        height: 38%;
        display: flex;
        .single-distribution {
          width: 50%;
          height: 100%;
          .single-graph-title {
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            letter-spacing: 0px;
            margin-left: 40px;
          }
          .basic-chart {
            height: 87%;
            width: 100%;
          }
        }
      }
      .left-btm {
        width: 100%;
        height: 40%;
        margin-bottom: 1.6%;
      }
    }

    // 右侧
    .content-right {
      // width: 100%;
      height: 100%;
      background: rgba(22, 28, 40, 0.32);
      // background: url("../../assets/images/bg-8.png") no-repeat;
      // background-size: 100% 100%;
      .right-center {
        width: 100%;
        height: 38%;
        display: flex;
        flex-wrap: nowrap;

        .item-pie {
          height: 100%;
          width: 45%;
          &:first-child {
            margin-right: 5%;
          }
        }
      }
      .right-btm{
        width: 100%;
        height: 40%;
      }
    }
  }
}
</style>
