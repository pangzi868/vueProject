<template>
  <div class="container">
    <!-- 头部 -->
    <div class="title-frame">
      <div class="title-left"></div>
      <div class="global-title">消费金融</div>
      <div class="right-time">
        <weather-com />
      </div>
    </div>

    <!-- 内容 -->
    <div class="frame-content">
      <div class="accruing-person">
        <indicator-div
          :titleContent="littleTitle[0]"
          :titleStyle="littleTitleStyle[1]"
          :digital="threeMoneyArr.third"
          :digitalStyle="digitalStyle[1]"
        />
        <columnar-chart
          :ids="columnarId"
          v-if="currentPersonJudge"
          :chartData="columnarData"
          class="columnar-chart"
          :lineIds="repeatPurchaseId"
        />
        <div class="distribution middle-distirbution">
          <div class="single-distribution">
            <span class="single-graph-title">年龄</span>
            <cyclic-annular
              class="basic-chart"
              :ids="funnelId"
              v-if="educationJudge"
              :chartData="ageData"
            />
          </div>
          <div class="single-distribution">
            <span class="single-graph-title">学历</span>
            <whole-pie-chart
              class="basic-chart"
              :ids="pieId"
              v-if="educationJudge"
              :chartData="educationData"
            />
          </div>
        </div>
        <div class="distribution bottom-distribution">
          <div class="single-distribution" style="width: 46%; margin-right: 4%">
            <span class="single-graph-title">地域</span>
            <simple-column
              class="basic-chart"
              :ids="cityId"
              v-if="cityJudge"
              :chartData="cityData"
            />
          </div>
          <div class="single-distribution">
            <span class="single-graph-title">收入</span>
            <simple-column
              class="basic-chart"
              :ids="incomeId"
              v-if="incomeJudge"
              :chartData="income"
            />
          </div>
        </div>
      </div>
      <div class="current-amounts">
        <indicator-div
          :titleContent="littleTitle[1]"
          :titleStyle="littleTitleStyle[1]"
          :digital="threeMoneyArr.second"
          :digitalStyle="digitalStyle[1]"
          class="middle-digital-span"
        />

        <!-- 地图 -->
        <map-chart
          v-if="mapJudge"
          :mapPopData="mapPopData"
          :chartData="mapData"
          class="map-charts"
        />
      </div>
      <div class="accruing-amounts">
        <indicator-div
          :titleContent="littleTitle[2]"
          :titleStyle="littleTitleStyle[1]"
          :digital="threeMoneyArr.first"
          :digitalStyle="digitalStyle[1]"
        />
        <div class="single-distribution right-top-distribution">
          <span class="single-graph-title">当日实时放款</span>
          <line-chart
            :ids="id"
            v-if="leftLineJudge"
            :chartData="getChartData"
            :trueData="leftLineData"
            class="line-chart"
          />
        </div>
        <div class="right-middle-div" style="height:374px">
          <div class="single-distribution half-middle-distribution">
            <span class="single-graph-title">授信时长</span>
            <sec-chart v-if="extensionDateJudge" :chartData="extensionDate" ids="extension" />
          </div>
          <div class="single-distribution half-middle-distribution">
            <span class="single-graph-title">贷款时长</span>
            <sec-chart v-if="loanDateJudge" :chartData="loanDate" ids="loan" />
          </div>
        </div>
        <div class="right-bottom-div">
          <div
            class="single-distribution half-bottom-distribution"
            style="width: 46%; margin-right: 4%"
          >
            <span class="single-graph-title">
              户均金额
              <span class="avg-title">平均值</span>
              <span class="avg-num">{{avgNumberAvg}}</span>
            </span>
            <simple-column
              class="basic-chart"
              :ids="avgNumberId"
              v-if="avgNumberJudge"
              :chartData="avgNumber"
            />
          </div>
          <div class="single-distribution half-bottom-distribution">
            <span class="single-graph-title">
              用信天数
              <span class="avg-title">平均月数</span>
              <span class="avg-num">{{creditDateAvg}}</span>
            </span>
            <simple-column
              class="basic-chart"
              :ids="creditDateId"
              v-if="creditDateJudge"
              :chartData="creditDate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LineChart from "../../components/first-screen/lineChart.vue";
import SecChart from "../../components/first-screen/secChart.vue";
import ColumnarChart from "../../components/first-screen/columnarChart.vue";
import MapChart from "../../components/first-screen/mapChart.vue";
import WeatherCom from "../../components/weather.vue";
import IndicatorDiv from "@/components/first-screen/indicatorDiv.vue";
import CyclicAnnular from "@/components/first-screen/cyclicAnnular.vue";
import WholePieChart from "@/components/first-screen/wholePieChart.vue";
import SimpleColumn from "@/components/first-screen/simpleColumn.vue";

import { setInterval, clearInterval } from "timers";
export default {
  created() {
    this.getMapData();
    this.rollData();
    this.rollTimelyData();
  },
  mounted() {},
  data() {
    return {
      littleTitle: ["信贷服务客户数", "当日信贷投放金额", "累计信贷投放金额"],
      littleTitleStyle: [
        {
          textAlign: "left"
        },
        {
          textAlign: "center"
        },
        {}
      ],
      digitalStyle: [
        {
          marginTop: "34px",
          textAlign: "left"
        },
        {
          marginTop: "34px",
          textAlign: "center"
        }
      ],
      rollMapInterval: undefined,
      coinInterval: undefined,

      // 三个数字栏目
      threeMoneyArr: {
        first: "",
        second: "",
        third: ""
      },

      // mapData
      mapData: [],
      mapPopData: [],
      mapJudge: false,

      // 当日人数
      currentPersonJudge: false,

      // 左侧实时放款数据
      allData: [
        {
          chartName: "当日实时放款",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      leftLineData: undefined,
      leftLineJudge: false,
      id: ["echarts01"],

      //授信时长 贷款时长
      extensionDate: undefined,
      extensionDateJudge: false,
      loanDate: undefined,
      loanDateJudge: false,

      repeatPurchaseId: [
        {
          id: "lineCharts01",
          title: ""
        },
        {
          id: "lineCharts02",
          title: ""
        }
      ],

      // 右侧柱状图数据
      columnarData: {
        totalData: [0, 0],
        columnAllData: []
      },
      columnarId: [
        {
          id: "echarts05",
          title: "当日用信人数"
        }
      ],

      pieId: "echarts06",
      funnelId: "echarts07",

      cityId: "echarts09",
      cityJudge: false,
      cityData: [],

      elite: [{ id: "elite", title: "精英扶贫文字稿" }],

      eliteData: [],
      eliteJudge: false,
      scale: undefined,

      // 年龄/学历
      ageData: undefined,
      ageJudge: false,
      educationJudge: false,
      educationData: undefined,

      // 收入、笔均金额、用信天数
      income: undefined,
      incomeJudge: false,
      incomeId: "echarts10",

      avgNumberAvg: "",
      avgNumber: undefined,
      avgNumberJudge: false,
      avgNumberId: "echarts11",
      creditDateAvg: "",
      creditDate: undefined,
      creditDateJudge: false,
      creditDateId: "echarts12"
    };
  },
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index]);
        return pre;
      }, []);
    }
  },
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

    // 5s请求一次数据
    rollData() {
      this.getRollDataHandler();
      var _that = this;
      var index = 0;
      // if (coinInterval) clearInterval(coinInterval);
      this.coinInterval = setInterval(
        () => {
          this.getRollDataHandler();
        },
        5000,
        _that,
        index
      );
    },

    // 30s一次请求数据
    rollTimelyData() {
      this.getTimelyData();
      var _that = this;
      var index = 0;
      // if (coinInterval) clearInterval(coinInterval);
      this.coinInterval = setInterval(
        () => {
          this.getTimelyData();
        },
        30000,
        _that,
        index
      );
    },

    getLineData() {
      var _that = this;
      this.axios({
        url: "/api/p1/loanTrend",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var cdata = data.data.data;
          _that.leftLineData = {};
          _that.leftLineData.amt_cur = cdata.map(item => {
            return item.amt_cur;
          });
          _that.leftLineData.data_dt = cdata.map(item => {
            return item.event_hour + "时";
          });
          this.$nextTick(() => {
            this.leftLineJudge = true;
          });
        }
      });
    },

    getRollDataHandler() {
      var _that = this;
      this.getLineData();
      this.axios
        .all([
          this.axios.get("/api/p1/accCredAmt"),
          this.axios.get("/api/p1/currCredAmt"),
          this.axios.get("/api/p1/accCredNum")
        ])
        .then(
          this.axios.spread((...obj) => {
            _that.threeMoneyArr = Object.assign({}, _that.threeMoneyArr, {
              first: _that.thousandFormat(obj[0].data.data, 2) || 0,
              second: _that.thousandFormat(obj[1].data.data, 2) || 0,
              third: _that.thousandFormat(obj[2].data.data, 0) || 0
            });
          })
        )
        .catch(err => {
          console.log(err);
        });

      // 获取当日授信人数
      this.axios({
        url: "/api/p1/currCustNum",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          var tmpTotal = 0;
          _that.columnarData.columnAllData[0] = {
            xAxis: tData
              ? tData.map(item => {
                  return item.event_hour;
                })
              : [],
            yAxis: tData
              ? tData.map(item => {
                  tmpTotal += parseInt(item.shouxin);
                  return item.shouxin;
                })
              : []
          };
          var tmpArr = [tmpTotal, _that.columnarData.totalData[1]];
          _that.columnarData.totalData = [].concat(tmpArr);
        }
      });
      // 获取当日用信人数
      this.axios({
        url: "/api/p1/currCustNum",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          var tmpTotal = 0;
          _that.columnarData.columnAllData[1] = {
            xAxis: tData
              ? tData.map(item => {
                  return item.event_hour;
                })
              : [],
            yAxis: tData
              ? tData.map(item => {
                  tmpTotal += parseInt(item.yongxin);
                  return item.yongxin;
                })
              : []
          };
          var tmpArr = [_that.columnarData.totalData[0], tmpTotal];
          _that.columnarData.totalData = [].concat(tmpArr);
          this.$nextTick(() => {
            _that.currentPersonJudge = true;
          });
        }
      });
    },

    // 时间较久数据
    getTimelyData() {
      var _that = this;
      // 获取年龄数据
      this.axios({
        url: "/api/p1/distribution?dcode=age",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          _that.ageData = tData.map(item => {
            return { name: item.xid, value: item.val };
          });
        }
        this.$nextTick(() => {
          _that.ageJudge = true;
        });
      });

      // 获取学历数据
      this.axios({
        url: "/api/p1/education",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          _that.educationData = tData.map(item => {
            return { name: item.education, value: item.percent };
          });
        }
        this.$nextTick(() => {
          _that.educationJudge = true;
        });
      });

      // 地域分布
      this.axios({
        url: "/api/p1/area",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100 || data.data.data !== null) {
          var tData = Vue.filter("sortByValue")(
            data.data.data,
            "seq"
          ).reverse();
          let xAxis = [];
          let yAxis = [];
          tData.forEach(item => {
            xAxis.push(item.regionname);
            yAxis.push(item.percent);
          });
          xAxis = xAxis.slice(0, 5);
          yAxis = yAxis.slice(0, 5);

          _that.cityData = Object.assign({}, { xAxis: xAxis, yAxis: yAxis });

          this.$nextTick(() => {
            _that.cityJudge = true;
          });
        }
      });

      // 收入、笔均金额、用信天数
      this.axios
        .all([
          this.axios.get("/api/p1/distributeInfo?category=ph_sr&flag=ph"),
          this.axios.get("/api/p1/distributeInfo?category=ph_fkje&flag=ph"),
          this.axios.get("/api/p1/distributeInfo?category=ph_yxts&flag=ph")
        ])
        .then(
          this.axios.spread((...obj) => {
            // 收入
            let data1 = obj[0].data.data;
            let xAxis1 = [],
              yAxis1 = [];
            // let reg1 = /客群/g;
            data1.forEach(item => {
              xAxis1.push(item.key);
              yAxis1.push(item.perc);
            });
            _that.income = Object.assign({}, { xAxis: xAxis1, yAxis: yAxis1 });

            // 户均金额
            let data2 = obj[1].data.data;
            let xAxis2 = [],
              yAxis2 = [];
            data2.forEach(item => {
              xAxis2.push(item.key);
              yAxis2.push(item.perc);
            });
            let avgNumberAvg = "";
            if (xAxis2[0] == "均值") {
              xAxis2.shift();
              avgNumberAvg = this.thousandFormat(yAxis2.shift(), 2);
            }
            _that.avgNumberAvg = avgNumberAvg;
            _that.avgNumber = Object.assign(
              {},
              { xAxis: xAxis2, yAxis: yAxis2 }
            );

            // 户均金额
            let data3 = obj[2].data.data;
            let xAxis3 = [],
              yAxis3 = [];
            let reg = /天/g;
            data3.forEach(item => {
              xAxis3.push(item.key.replace(reg, ""));
              yAxis3.push(item.perc);
            });
            let creditDateAvg = "";
            if (xAxis3[0] == "均值") {
              xAxis3.shift();
              creditDateAvg = this.thousandFormat(yAxis3.shift(), 1) + "月";
            }
            _that.creditDateAvg = creditDateAvg;
            _that.creditDate = Object.assign(
              {},
              { xAxis: xAxis3, yAxis: yAxis3 }
            );

            this.$nextTick(() => {
              this.incomeJudge = true;
              this.avgNumberJudge = true;
              this.creditDateJudge = true;
            });
          })
        )
        .catch(function(error) {
          console.log(error);
        });

      // 授信、用信时长
      this.axios
        .all([
          this.axios.get("/api/p1/randValue?flag=sxsc"),
          this.axios.get("/api/p1/randValue?flag=dksc")
        ])
        .then(
          this.axios.spread((...obj) => {
            // 授信时长
            this.extensionDate = obj[0].data.data;

            // 贷款时长
            this.loanDate = obj[1].data.data;

            this.$nextTick(() => {
              this.extensionDateJudge = true;
              this.loanDateJudge = true;
            });
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },

    getMapData() {
      this.getMapDataHandler();
    },

    getMapDataHandler() {
      var _that = this;
      // 获取地图数据
      this.axios({
        url: "/api/p1/mapinfo?count=6",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          _that.mapData = [
            ...tData.map(item => {
              return {
                name: item.name,
                age: item.age + "岁",
                sex: item.sex,
                type: item.trade_type,
                sum: item.trade_amount,
                inbusshopaddress: item.inbusshopaddress,
                // value: [116.4551, 40.2539, item.trade_amount]
                value: [item.longitude, item.latitude, item.trade_amount]
              };
            })
          ];
          let mapIndex = 0;
          // _that.mapData = [
          //   {
          //     name: "王**",
          //     age: "28岁",
          //     sex: "男",
          //     type: "授信申请",
          //     sum: "3000000",
          //     value: [116.4551, 40.2539, 3000000]
          //   },
          //   {
          //     name: "王**",
          //     age: "25岁",
          //     sex: "女",
          //     type: "授信申请",
          //     sum: "7000000",
          //     value: [103.9526, 30.7617, 7000000]
          //   },
          //   {
          //     name: "王**",
          //     age: "28岁",
          //     sex: "男",
          //     type: "授信申请",
          //     sum: "3000000",
          //     value: [119.1803, 31.2891, 3000000]
          //   },
          //   {
          //     name: "王**",
          //     age: "25岁",
          //     sex: "女",
          //     type: "授信申请",
          //     sum: "7000000",
          //     value: [108.384366, 30.439702, 7000000]
          //   },
          //   {
          //     name: "王**",
          //     age: "28岁",
          //     sex: "男",
          //     type: "授信申请",
          //     sum: "3000000",
          //     value: [87.9236, 43.5883, 3000000]
          //   },
          //   {
          //     name: "王**",
          //     age: "25岁",
          //     sex: "女",
          //     type: "授信申请",
          //     sum: "7000000",
          //     value: [117.29, 32.0581, 7000000]
          //   }
          // ];
          _that.mapPopData = [_that.mapData[mapIndex]] || [];
          this.rollMapInterval = setInterval(
            () => {
              if (mapIndex >= _that.mapData.length - 1) {
                mapIndex = 0;
                clearInterval(this.rollMapInterval);
                _that.getMapDataHandler();
                return;
              }
              mapIndex++;
              _that.mapPopData = [_that.mapData[mapIndex]] || [];
            },
            5000,
            _that
          );
          this.$nextTick(() => {
            _that.mapJudge = true;
          });
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.rollMapInterval);
    clearInterval(this.coinInterval);
  },
  components: {
    "line-chart": LineChart,
    "sec-chart": SecChart,
    "columnar-chart": ColumnarChart,
    "map-chart": MapChart,
    "weather-com": WeatherCom,
    "indicator-div": IndicatorDiv,
    "cyclic-annular": CyclicAnnular,
    "whole-pie-chart": WholePieChart,
    "simple-column": SimpleColumn
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 4224px;
  height: 1536px;
  background: url("../../assets/images/material/exports/background.png")
    no-repeat;
  background-size: 100% 100%;
  font-size: 28px;
  color: #fff;
  overflow: hidden;
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
      text-align: center;
      font-size: 64px;
      font-weight: bold;
      font-family: FZZhengHeiS-B-GB;
    }
    .right-time {
      width: 33%;
      text-align: right;
    }
  }

  // 内容样式
  .frame-content {
    display: flex;
    justify-content: space-between;
    .accruing-amounts,
    .accruing-person {
      width: 28%;
      height: 92.96%;
      padding: 40px;
      background: rgba(22, 28, 40, 0.32);
      .single-distribution {
        width: 50%;
        height: 100%;
        text-align: left;
        position: relative;
        .single-graph-title {
          font-weight: bold;
          font-size: 32px;
          line-height: 40px;
          letter-spacing: 0px;
          .avg-title {
            display: inline-block;
            margin-left: 24px;
            color: rgba(255, 255, 255, 0.7);
            font-family: Microsoft YaHei;
            font-weight: bold;
            font-size: 24px;
            line-height: 40px;
            letter-spacing: 0px;
            text-align: left;
          }
          .avg-num {
            display: inline-block;
            margin-left: 24px;
            color: #49e5fa;
            font-family: Microsoft YaHei;
            font-weight: bold;
            font-size: 24px;
            line-height: 40px;
            letter-spacing: 0px;
            text-align: left;
          }
        }
        .basic-chart {
          height: 87%;
          width: 100%;
        }
      }
    }
    .current-amounts {
      width: 44%;
      height: 100%;
      .map-charts {
        width: 100%;
        height: 1200px;
      }
      .middle-digital-span {
        margin-top: 38px;
      }
    }
    .content-title {
      background: url("../../assets/images/fs-title-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 40%;
      height: 15%;
      margin: 0 auto;
      text-align: center;
    }
    .accruing-amounts {
      .line-chart {
        height: 90%;
        padding-top: 2%;
      }
      .bottom-title-div {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        .bottom-title {
          padding-left: 40px;
          width: 50%;
          height: 20px;
        }
      }
      .person-columnar {
        height: 530px;
        padding-left: 30px;
        display: inline-block;
        width: 50%;
        &:first-child {
          margin-right: 5%;
        }
      }
      .right-top-distribution {
        width: 100%;
        height: 320px;
        margin-top: 48px;
      }
      .right-middle-div,
      .right-bottom-div {
        display: flex;
      }
      .half-middle-distribution {
        width: 50%;
        height: 332px;
        margin-top: 40px;
      }
      .half-bottom-distribution {
        height: 426px;
        width: 50%;
        margin-top: 40px;
      }
    }
    .accruing-person {
      .columnar-chart {
        margin-top: 48px;
        height: 40%;
        margin-top: 48px;
      }
      .distribution {
        display: flex;
        height: 40%;
        padding-bottom: 20px;

        .left-distribution {
          height: 400px;
        }
        .right-distribution {
          height: 400px;
        }

        &:first-child {
          padding-bottom: 40px;
        }
      }
      .middle-distirbution {
        height: 394px;
        margin-top: 48px;
      }
      .bottom-distribution {
        height: 440px;
      }
      .form-charts {
        width: 50%;
        height: 400px;
      }
    }
  }
}
</style>