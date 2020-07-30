<template>
  <div class="first-screen">
    <div class="top-title">
      <img :src="title" alt class="title-img" />
      <dv-decoration-5 />
    </div>
    <div class="main-content">
      <div class="management-field sidebar-field">
        <div class="sidebar-title">
          <img :src="manageTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box class="sidebar-first left-side-bar" :ids="boxIds['left1']">
          <div class="sidebar-content-title">审计项目计划情况执行分析</div>
          <indicator-box class="indicator-box" :ids="left1Ids" :chartData="left1ChartData" />
          <column-box
            class="left-in-column-box"
            :ids="left1ColumnIds"
            :chartData="left1ColumnData"
          />
        </hover-box>
        <hover-box class="sidebar-second left-side-bar" :ids="boxIds['left2']">
          <div class="sidebar-content-title">审计项目执行状态分析</div>
          <pie-and-column class="left-analysis" :ids="leftSecChart" :chartData="leftSecData" />
        </hover-box>
        <hover-box class="sidebar-third left-side-bar" :ids="boxIds['left3']">
          <div class="sidebar-content-title">项目审计费用预算分析</div>
          <column-box class="left-column-box" :ids="left2ColumnIds" :chartData="left2ColumnData" />
        </hover-box>
        <hover-box class="sidebar-forth left-side-bar" :ids="boxIds['left4']">
          <div class="sidebar-content-title">审计项目计划年度对比</div>
          <line-chart class="left-line-box" :ids="left1LineIds" :chartData="left1LineData" />
        </hover-box>
      </div>
      <div class="message-field">
        <div class="message-title">
          <img :src="messageTitle" alt class="message-title-img" />
        </div>
        <div class="message-cloud">
          <img :src="cloudleft" alt class="left-cloud-img" />
          <img
            :src="wholeJudge ? topCactive : topCnor"
            alt
            class="left-cloud-top"
            @click="wholeClickHander"
          />
          <img
            :src="middleJudge ? middleCactive : middleCnor"
            alt
            class="left-cloud-middle"
            @click="middleClickHander"
          />
          <img-rotation class="img-rotation" :autoMove="autoMove" :middleJudge="middleJudge" />
          <div class="control-div" @click="controlMove"></div>
          <img :src="moveCloud" alt class="cloud-img" />
          <span class="cloud-title">智慧审计</span>
          <cloud-span class="cloud-span" />
        </div>
        <middle-indicator class="message-indicator" />
        <div class="message-cut-off"></div>
        <decorate-1 class="decorate-1" />
        <div class="message-roll">
          <!-- <roll-box /> -->
          <dv-scroll-board :config="config" style="width:3400px;height:640px" />
        </div>
      </div>
      <div class="analysis-field sidebar-field">
        <div class="sidebar-title">
          <img :src="analysisTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box class="sidebar-first right-side-bar" :ids="boxIds['right1']">
          <div class="sidebar-content-title">各单位问题整改分析</div>
          <merge-column-box
            class="right-column-box"
            :ids="right1ColumnIds"
            :chartData="right1ColumnData"
          />
        </hover-box>
        <hover-box class="sidebar-second right-side-bar" :ids="boxIds['right2']">
          <div class="sidebar-content-title">审计问题类型分析</div>
          <huan-chart class="right-huan-chart" :ids="right2HuanIds" :chartData="right2HuanData" />
          <little-line-chart
            class="right-little-line"
            :ids="right2LineIds"
            :chartData="right2LineData"
          />
        </hover-box>
        <hover-box class="sidebar-third right-side-bar" :ids="boxIds['right3']">
          <div class="sidebar-content-title">高频多发问题分析</div>
          <bar-chart class="left-line-box" :ids="right3BarIds" :chartData="right3BarData" />
        </hover-box>
        <hover-box class="sidebar-forth right-side-bar" :ids="boxIds['right4']">
          <div class="sidebar-content-title">审计成果年度对比</div>
          <line-chart class="left-line-box" :ids="right4LineIds" :chartData="right4LineData" />
        </hover-box>
      </div>
    </div>
  </div>
</template>

<script>
import HoverBox from "@/components/S1/hoverBox.vue";
import IndicatorBox from "@/components/S1/indicatorBox.vue";
import ColumnBox from "@/components/S1/columnBox.vue";
import MergeColumnBox from "@/components/S1/mergeColumnBox.vue";
import LineChart from "@/components/S1/lineChart.vue";
import ImgRotation from "@/components/S1/imgRotation.vue";
import BarChart from "@/components/S1/barChart.vue";
import HuanChart from "@/components/S1/huanChart.vue";
import LittleLineChart from "@/components/S1/littleLineChart.vue";
import PieAndColumn from "@/components/S1/pieAndColumn.vue";
import CloudSpan from "@/components/S1/cloudSpan.vue";
import MiddleIndicator from "@/components/S1/middleIndicator.vue";
import RollBox from "@/components/S1/rollBox.vue";

import Decorate1 from "@/components/multiple/decorate-1.vue";

import Title from "@/assets/images/first/title-main.png";
import ManageTitle from "@/assets/images/first/title-2.png";
import MoveCloud from "@/assets/images/first/Untitled.png";
import AnalysisTitle from "@/assets/images/first/title-1.png";
import CloudLeft from "@/assets/images/first/cloud-left-ar.png";
import MessageTitle from "@/assets/images/first/title-3.png";
import Bg1 from "@/assets/images/first/bg-1.png";
import Bg2 from "@/assets/images/first/bg-2.png";
import topCactive from "@/assets/images/first/topCactive.png";
import topCnor from "@/assets/images/first/topCnor.png";
import middleCactive from "@/assets/images/first/middleCactive.png";
import middleCnor from "@/assets/images/first/middleCnor.png";

export default {
  name: "",
  props: [],
  mounted() {},
  data() {
    return {
      title: Title,
      manageTitle: ManageTitle,
      messageTitle: MessageTitle,
      analysisTitle: AnalysisTitle,
      moveCloud: MoveCloud,
      cloudleft: CloudLeft,
      middleCnor: middleCnor,
      topCnor: topCnor,
      middleCactive: middleCactive,
      topCactive: topCactive,
      boxIds: {
        left1: "left1",
        left2: "left2",
        left3: "left3",
        left4: "left4",
        right1: "right1",
        right2: "right2",
        right3: "right3",
        right4: "right4",
        bottom1: "bottom1"
      },

      autoMove: false,

      //审计项目计划情况执行分析
      left1Ids: [
        { id: "leftIndicator1", name: "项目计划数" },
        { id: "leftIndicator2", name: "年度实际数" }
      ],
      left1ChartData: [],
      left1ColumnIds: "left1ColumnChart",
      left1ColumnData: [],
      left2ColumnIds: "left2ColumnChart",
      left2ColumnData: [],
      leftSecChart: [
        { id: "leftSecPie", name: "pie" },
        { id: "leftSecCol", name: "col" }
      ],
      leftSecData: {
        pie: [],
        col: []
      },
      left1LineIds: "left1LineChart",
      left1LineData: [],
      right1ColumnIds: "right1ColumnChart",
      right1ColumnData: [],
      right2HuanIds: "right2HuanChart",
      right2HuanData: [],
      right2LineIds: "right2LineChart",
      right2LineData: [],
      right3BarIds: "right3BarChart",
      right3BarData: [],
      right4LineIds: "right4LineChart",
      right4LineData: [],
      config: {
        header: [
          "序号",
          "单位",
          "问题类型",
          "疑点工单",
          "疑点核实",
          "审计底稿",
          "问题整改",
          "整改率",
          "问题资金（万元）"
        ],
        data: [
          [
            "1",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "2",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "3",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "4",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "5",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "6",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "7",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "8",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "9",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ],
          [
            "10",
            "国网白山供电公司",
            "问题类型",
            "45",
            "233",
            "341",
            "75",
            "13.21%",
            "32"
          ]
        ],
        headerBGC: "rgba(15,67,97,0.4)",
        oddRowBGC: "rgba(50,218,255,0.1)",
        evenRowBGC: "rgba(15,67,97,0.4)",
        headerHeight: 128,
        columnWidth: [250, 550, 350, 350, 350, 350, 350, 350],
        carousel: "single",
        align: [
          "center",
          "center",
          "center",
          "center",
          "center",
          "center",
          "center",
          "center",
          "center"
        ]
      }
    };
  },
  computed: {
    shiJudge: {
      get: function() {
        return this.$store.state.shiJudge;
      },
      set: function(newval) {
        this.$store.commit("newShiJudge", newval);
      }
    },
    wholeJudge: {
      get: function() {
        return this.$store.state.wholeJudge;
      },
      set: function(newval) {
        this.$store.commit("newWholeJudge", newval);
      }
    },
    middleJudge: {
      get: function() {
        return this.$store.state.middleJudge;
      },
      set: function(newval) {
        this.$store.commit("newMiddleJudge", newval);
      }
    }
  },
  methods: {
    controlMove() {
      if (!this.shiJudge) return;
      this.autoMove = !this.autoMove;
    },
    wholeClickHander() {
      if (this.wholeJudge) return;
      this.shiJudge = false;
      this.middleJudge = false;
      this.wholeJudge = true;
    },
    middleClickHander() {
      if (this.middleJudge) return;
      this.shiJudge = false;
      this.wholeJudge = false;
      this.middleJudge = true;
    }
  },
  components: {
    HoverBox,
    IndicatorBox,
    PieAndColumn,
    CloudSpan,
    MiddleIndicator,
    RollBox,
    ColumnBox,
    MergeColumnBox,
    LineChart,
    ImgRotation,
    BarChart,
    HuanChart,
    LittleLineChart,
    "decorate-1": Decorate1
  }
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "ShiShangZhongHeiJianTi";
  src: url(../../components/font/shishangzhongheijianti.ttf); /***兼容ie9***/
}
.first-screen {
  position: relative;
  width: 7680px;
  height: 4320px;
  background: url("../../assets/images/first/background-s.png") no-repeat;
  background-size: 100% 100%;
  .top-title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 306px;
    background: url("../../assets/images/first/header@4x.png") no-repeat;
    background-size: 100% 100%;
    .title-img {
      width: 1296px;
      height: 224px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      margin-top: 56px;
    }
  }
  .main-content {
    position: absolute;
    top: 306px;
    left: 0;
    width: 100%;
    height: 4014px;
    .management-field,
    .message-field,
    .analysis-field {
      position: absolute;
      height: 100%;
      top: 0;
    }
    .management-field {
      left: 96px;
      width: 1880px;
    }
    .message-field {
      width: 3600px;
      left: 2040px;
      .message-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 160px;
        background: url("../../assets/images/first/Frame-730@4x.png") no-repeat;
        background-size: 100% 100%;
        .message-title-img {
          width: 677px;
          height: 80px;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          margin-top: 42px;
        }
      }
      .message-cloud {
        position: absolute;
        left: 0;
        top: 160px;
        width: 100%;
        height: 2500px;
        .cloud-img {
          position: absolute;
          left: 1976px;
          top: 450px;
          width: 1620px;
          height: 1740px;
        }
        .cloud-title {
          position: absolute;
          left: 2583px;
          top: 920px;
          color: rgba(0, 73, 136, 1);
          font-family: PingFang SC;
          font-size: 96px;
          line-height: normal;
          letter-spacing: 0px;
          text-align: left;
        }
        .cloud-span {
          position: absolute;
          left: 2083px;
          top: 1450px;
          width: 1400px;
          height: 600px;
        }
        .left-cloud-img {
          position: absolute;
          left: -200px;
          top: 100px;
          height: 2260px;
          width: 2407px;
        }
        .left-cloud-top {
          position: absolute;
          left: 500px;
          top: 560px;
          height: 612px;
          width: 970px;
        }
        .left-cloud-middle {
          position: absolute;
          left: 670px;
          top: 1300px;
          height: 412px;
          width: 670px;
          z-index: 5;
        }
        .img-rotation {
          position: absolute;
          left: 300px;
          top: 1400px;
          width: 1500px;
          height: 600px;
          // background-color: #D24545;
        }
        .control-div {
          position: absolute;
          left: 2336px;
          top: 720px;
          width: 900px;
          height: 500px;
          z-index: 10;
          cursor: pointer;
        }
      }
      .message-indicator {
        position: absolute;
        left: 0;
        top: 2660px;
        width: 100%;
        height: 436px;
        background: url("../../assets/images/first/bg-3.png") no-repeat;
        background-size: 100% 100%;
      }
      .message-cut-off {
        position: absolute;
        left: 0;
        top: 3144px;
        width: 100%;
        height: 16px;
        background: url("../../assets/images/first/Frame-735@4x.png") no-repeat;
        background-size: 100% 100%;
      }
      .message-roll {
        position: absolute;
        left: 0;
        top: 3248px;
        width: 100%;
        height: 704px;
        background: url("../../assets/images/first/bg-2.png") no-repeat;
        background-size: 100% 100%;
        padding: 32px 78px;
        transition: all 0.3s;
        box-shadow: rgba(0, 0, 0, 0.3) 0px -30px 10px;
      }
    }
    .analysis-field {
      width: 1880px;
      left: 5704px;
    }
    .sidebar-field {
      .sidebar-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 160px;
        background: url("../../assets/images/first/Frame-24@4x.png") no-repeat;
        background-size: 100% 100%;
        .sidebar-title-img {
          width: 677px;
          height: 80px;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          margin-top: 42px;
        }
      }
      .left-side-bar {
        box-shadow: rgba(0, 0, 0, 0.3) -30px -30px 10px;
        transition: all 0.3s;
        z-index: 10;
      }
      .right-side-bar {
        box-shadow: rgba(0, 0, 0, 0.3) 30px -30px 10px;
        transition: all 0.3s;
        z-index: 10;
      }
      .transform-side-bar {
        // 放大x， y
        transform: scale(1.05, 1.05);
        // 位移 x， y
        transform: translate(1.05, 1.05);
      }
      .sidebar-first {
        position: absolute;
        top: 224px;
        left: 0;
        width: 100%;
        height: 1160px;
        background: url("../../assets/images/first/bg-1.png") no-repeat;
        background-size: 100% 100%;
      }
      .sidebar-second {
        position: absolute;
        top: 1440px;
        left: 0;
        height: 800px;
        width: 100%;
        background: url("../../assets/images/first/bg-2.png") no-repeat;
        background-size: 100% 100%;
      }
      .sidebar-third {
        position: absolute;
        top: 2296px;
        left: 0;
        height: 800px;
        width: 100%;
        background: url("../../assets/images/first/bg-2.png") no-repeat;
        background-size: 100% 100%;
      }
      .sidebar-forth {
        position: absolute;
        top: 3152px;
        left: 0;
        height: 800px;
        width: 100%;
        background: url("../../assets/images/first/bg-2.png") no-repeat;
        background-size: 100% 100%;
      }
      .sidebar-content-title {
        position: absolute;
        height: 160px;
        width: 100%;
        background: url("../../assets/images/first/title-bg.png") no-repeat;
        background-size: 100% 100%;
        line-height: 160px;
        font-size: 80px;
        padding-left: 60px;
        font-family: "ShiShangZhongHeiJianTi";
        color: rgba(255, 255, 255, 0.7);
      }
      .indicator-box {
        display: flex;
        position: absolute;
        top: 192px;
        left: 0;
        width: 100%;
        height: 316px;
      }
      .left-analysis {
        position: absolute;
        top: 182px;
        left: 0;
        width: 100%;
        height: 600px;
      }
      .left-in-column-box {
        position: absolute;
        top: 540px;
        width: 100%;
        height: 590px;
      }
      .left-column-box {
        position: absolute;
        top: 180px;
        width: 100%;
        height: 600px;
      }
      .left-line-box {
        position: absolute;
        top: 180px;
        width: 100%;
        height: 600px;
      }
      .right-column-box {
        position: absolute;
        top: 180px;
        width: 100%;
        height: 960px;
      }
      .right-huan-chart {
        position: absolute;
        top: 180px;
        width: 50%;
        height: 600px;
        left: 0;
      }
      .right-little-line {
        position: absolute;
        top: 180px;
        width: 50%;
        height: 600px;
        left: 50%;
      }
    }
  }

  // 装饰
  .decorate-1 {
    position: absolute;
    left: 0;
    top: 3150px;
    width: 3600px;
    height: 32px;
  }
  .dv-decoration-5 {
    width: 1996px;
    height: 194px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 135px;
  }
  .dv-scroll-board {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
