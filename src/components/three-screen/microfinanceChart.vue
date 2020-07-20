<template>
  <div>
    <span class="myspan"
      >风险模型策略&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
        class="sun"
        >欺诈损失率
      </span>
      <span class="fen">万万分之4.5</span></span
    >
    <div class="microfinance-chart">
      <div class="mc-header">
        <!-- 近一小时攻击数 -->
        <!-- <span>{{ 537 || attckTimes}}次/小时</span> -->
      </div>
      <div class="mc-content">
        <div class="mc-l">
          <span class="left-title"></span>
          <ul>
            <!-- 7月10日wk修改：删除右侧高亮及百分比展示 -->
            <li :style="moveLocaiton === 1 ? 'color: #fff' : 'color: #FFF'">
              <img src="../../assets/images/p3/frm-cricle1.png" alt />
              <div>
                <div class="title">{{ IDFdatas[0].flag }}</div>
              </div>
            </li>
            <li :style="moveLocaiton === 2 ? 'color: #fff' : 'color:  #FFF'">
              <img src="../../assets/images/p3/frm-cricle2.png" alt />
              <div>
                <div class="title">{{ IDFdatas[1].flag }}</div>
              </div>
            </li>
            <li :style="moveLocaiton === 3 ? 'color: #fff' : 'color:  #FFF'">
              <img src="../../assets/images/p3/frm-cricle1.png" alt />
              <div>
                <div class="title">{{ IDFdatas[2].flag }}</div>
              </div>
            </li>
            <li :style="moveLocaiton === 4 ? 'color: #fff' : 'color:  #FFF'">
              <img src="../../assets/images/p3/frm-cricle2.png" alt />
              <div>
                <div class="title">{{ IDFdatas[3].flag }}</div>
              </div>
            </li>
            <!-- end -->
            <!-- 7月10日wk修改：添加左侧条形图 -->
            <div class="frim-chart" id="frimChart"></div>
            <!-- end -->
          </ul>
        </div>
        <div
          class="mc-c"
          :style="
            'background:url(' +
              frm_cc +
              ');background-size: 100% 110%;background-position: center -22px'
          "
        ></div>
        <!-- <div class="mc-r">
        <div class="title">F.R.I.M命中次数</div>
        <ul>
          <li v-for="(item,index,) in IDFdatas" :key="index">{{item.callNum}}</li>
        </ul>
      </div> -->
      </div>
      <!-- <div class="mc-footer">
      欺诈损失率
      <span>{{footerData}}% ，行业平均水平为0.0001%</span>
    </div> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as base64 from "@/assets/base64.js";
export default {
  data() {
    return {
      footerdata: "0.000045",
      attcktimes: "",
      showAttack: false,
      /*  7月10日wk修改：删除右侧高亮  */
      // moveLocaitons: 1,
      moveLocaitons: 0,
      /* end */
      IDFdata: [
        { flag: "关系层", callNum: 300, percent: 30 },
        { flag: "名单层", callNum: 300, percent: 30 },
        { flag: "场景层", callNum: 200, percent: 20 },
        { flag: "行为层", callNum: 200, percent: 100.00 },
      ],
      frm_cc: base64.frm_cc.value,
    };
  },
  computed: {
    footerData() {
      return this.footerdata;
    },
    attckTimes() {
      return this.attcktimes;
    },
    moveLocaiton: {
      get() {
        return this.moveLocaitons;
      },
    },
    IDFdatas() {
      return this.IDFdata;
    },
  },
  mounted() {
    this.getLossRate();
    this.getAttackRecent();
    /*  7月10日wk修改：整体刷新间隔调整为3s  */
    this.timer = setInterval(() => {
      setTimeout(this.getAttackRecent(), 0);
    }, 30000);
    this.getIDF();
    this.timerIDF = setInterval(() => {
      this.getIDF();
    }, 30000);
    /* end */
    /* 7月10wk修改：取消高亮 */
    // this.timeTomove();
    /* end */
  },
  methods: {
    getIDF() {
      this.axios
        .get("/api/p3/riskIdfMatrix")
        .then((response) => {
          this.IDFdata = response.data.data;
          var arr = [];
          this.IDFdata.map((item) => {
            if (item.flag == "名单层") {
              arr[0] = item;
            }
            if (item.flag == "关系层") {
              arr[1] = item;
            }
            if (item.flag == "场景层") {
              arr[2] = item;
            }
            if (item.flag == "行为层") {
              arr[3] = item;
            }
          });
          this.IDFdata = arr;
          // this.IDFdata.map((item) => {
          //   return {
          //     ...item,
          //     percent: Number(item.percent).toFixed(2),
          //   };
          // });
          this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getLossRate() {
      //欺诈损失率
      this.axios
        .get("/api/p3/lossRate", {
          params: {
            indexname: "qzssl",
          },
        })
        .then((response) => {
          this.footerdata = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    timeTomove() {
      setTimeout(() => {
        this.timeinterval = setInterval(() => {
          if (this.moveLocaitons === 4) {
            this.moveLocaitons = 1;
          } else {
            this.moveLocaitons += 1;
          }
        }, 2000);
      }, 50);
    },
    getAttackRecent() {
      //近一小时攻击数P3-4
      this.axios
        .get("/api/p3/attackRecent")
        .then((response) => {
          this.attcktimes = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("frimChart"));
      let percentData = [];
      /* 7月10日wk修改：注释右侧条形图 */
      // this.IDFdata.forEach(el => {
      //   percentData.push(el.callNum);
      // });
      // let max = Vue.filter("sortByValue")(this.IDFdata, "callNum")[0].callNum;
      /* 7月10日wk修改：修改左侧条形图 */
      this.IDFdata.forEach((el) => {
        percentData.push(el.percent);
      });
      let max = Vue.filter("sortByValue")(this.IDFdata, "percent")[0].percent;
      // console.log(percentData);
      /* end */
      // 绘制图表
      myChart.setOption({
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#1F7CFF", // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: "#2BF1FF",
              },
              {
                offset: 1,
                color: "#FFFFFF ", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function(params) {
            console.log(params, "ssssssssssss");
            return (
              params[0].name +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              " : " +
              Number(
                (params[0].value.toFixed(4) / 10000).toFixed(2)
              ).toLocaleString() +
              " 万元<br/>"
            );
          },
        },
        grid: {
          top: "-15",
          left: "20%",
          right: "15%",
          bottom: "-3%",
          width:235,
          containLabel: false,
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: "rgba(255,255,255)",
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "category",
            show: false,
          },
        ],
        series: [
          {
            name: "拦截金融",
            type: "bar",
            zlevel: 1,
            label: {
              show: true,
              position: "right",
              fontSize: 16,
              color: "rgba(255,255,255)",
              formatter: function(data) {
                /* 7月10日wk修改：添加左侧条形图 */
                // return data.callNum;
                return data.value.toFixed(2) + "%";
                /* end */
              },
            },
            barWidth: 14,
            data: percentData || [15, 10, 60, 5],
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 18,
            barGap: "-115%",
            data: [100, 100, 100, 100],
            itemStyle: {
              color: "rgba(255,255,255,0)",
              // barBorderRadius: 30,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.4)",
            },
          },
        ],
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timeinterval);
    clearInterval(this.timer);
    clearInterval(this.timerIDF);
  },
  components: {},
};
</script>

<style lang="less" scoped>
.myspan {
  color: #ffffff;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 32px;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
  display: block;
  margin-left: 40px;
  margin-top: -18px;
}
.microfinance-chart {
  width: 100%;
  margin: 5px auto;
  padding: 0 0 0 144px;
  height: 30%;
  .mc-header,
  .mc-footer {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.72);
    text-align: center;
  }
  .mc-content {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    .mc-l {
      /* 7月10日wk修改：添加左侧条形图 */
      // position: relative;
      /* end */
      margin-top: 25px;
      color: gray;
      .left-title {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
        display: block;
        height: 38px;
      }
      ul {
        position: relative;
        list-style: none;
        width: 420px;
        li {
          width: 100%;
          height: 68px;
          background: url("../../assets/images/p3/frm-l.png") no-repeat;
          overflow: hidden;
          margin-bottom: 28px;
          background-size: cover;
          img {
            float: left;
            width: 38px;
            height: 38px;
            margin: 15px;
          }
          .title {
            font-size: 20px;
            line-height: 30px;
            margin-top: 20px;
            font-family: Microsoft YaHei;
            font-weight: bold;
          }
          .desc {
            font-size: 14px;
            line-height: 1;
            & > span {
              font-size: 24px;
              margin-left: 7px;
            }
          }
        }
      }
      /* 7月10日wk修改：添加左侧条形图 */
      .frim-chart {
        position: absolute;
        top: 0;
        right: -52px;
        width: 400px;
        height: 100%;
        // background: url("../../assets/images/p3/frm-r.png") no-repeat;
        // background-size: 100% 100%;
      }
      /* end */
    }
    .mc-c {
      width: 450px;
      height: 420px;
      // background: url('../../assets/images/p3/frm-cc.png') no-repeat;
      background-size: 100% 100%;
      margin: 30px 55px 0 0px;
    }
    .mc-r {
      margin-top: 40px;
      width: 20%;
      height: 410px;
      background: url("../../assets/images/p3/frm-r.png") no-repeat;
      background-size: 100% 93%;
      padding: 12px 0;
      text-align: center;
      position: relative;
      .title {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 10px;
      }
      /* 7月10日wk修改：注释右侧条形图 */
      /* .frim-chart {
        position: absolute;
        top: -25px;
        left: 15px;
        width: 140px;
        height: 480px;
       } */
      /* end */
      ul > li {
        /* 7月10日wk修改：修改右侧命中次数展示 */
        border: 1px solid #fff;
        margin: 0 auto;
        margin-bottom: 60px;
        list-style: none;
        width: 80px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        &:last-child {
          margin-bottom: 0;
        }
        /* end */
      }
    }
  }
}
.sun {
  color: rgba(255, 255, 255, 0.8);
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 32px;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
}
.fen {
  color: #43f3ff;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 32px;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
}
</style>
