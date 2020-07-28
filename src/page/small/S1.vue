<template>
  <div class="first-screen">
    <div class="top-title">
      <img :src="title" alt class="title-img" />
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
          <img :src="moveCloud" alt class="cloud-img" />
        </div>
        <div class="message-indicator"></div>
        <div class="message-cut-off"></div>
        <div class="message-roll"></div>
      </div>
      <div class="analysis-field sidebar-field">
        <div class="sidebar-title">
          <img :src="analysisTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box class="sidebar-first right-side-bar" :ids="boxIds['right1']">
          <div class="sidebar-content-title">各单位问题整改分析</div>
        </hover-box>
        <hover-box class="sidebar-second right-side-bar" :ids="boxIds['right2']">
          <div class="sidebar-content-title">审计问题类型分析</div>
        </hover-box>
        <hover-box class="sidebar-third right-side-bar" :ids="boxIds['right3']">
          <div class="sidebar-content-title">高频多发问题分析</div>
        </hover-box>
        <hover-box class="sidebar-forth right-side-bar" :ids="boxIds['right4']">
          <div class="sidebar-content-title">审计成果年度对比</div>
        </hover-box>
      </div>
    </div>
  </div>
</template>

<script>
import HoverBox from "@/components/S1/hoverBox.vue";
import IndicatorBox from "@/components/S1/indicatorBox.vue";
import ColumnBox from "@/components/S1/columnBox.vue";
import LineChart from "@/components/S1/lineChart.vue";

import Title from "@/assets/images/first/title-main.png";
import ManageTitle from "@/assets/images/first/title-2.png";
import MoveCloud from "@/assets/images/first/Untitled.png";
import AnalysisTitle from "@/assets/images/first/title-1.png";
import MessageTitle from "@/assets/images/first/title-3.png";
import Bg1 from "@/assets/images/first/bg-1.png";
import Bg2 from "@/assets/images/first/bg-2.png";
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
      left1LineIds: "left1LineChart",
      left1LineData: []
    };
  },
  computed: {},
  methods: {},
  components: {
    HoverBox,
    IndicatorBox,
    ColumnBox,
    LineChart
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
        top: 3160px;
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
      }
      .right-side-bar {
        box-shadow: rgba(0, 0, 0, 0.3) 30px -30px 10px;
        transition: all 0.3s;
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
    }
  }
}
</style>
