<template>
  <div class="second-screen" @contextmenu.prevent>
    <div class="top-title">
      <img :src="title" alt class="title-img" />
      <dv-decoration-5 />
    </div>
    <div class="main-content">
      <div class="finance-field single-theme">
        <div class="sidebar-title">
          <img :src="financeTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box
          class="left-theme sidebar-first single-area bg-1"
          :ids="boxIds['left1']"
          theme="left"
        >
          <div class="sidebar-content-title">可控费用年度执行情况预警主题</div>
        </hover-box>
        <hover-box
          class="left-theme sidebar-second single-area bg-2"
          :ids="boxIds['left2']"
          theme="left"
        >
          <div class="sidebar-content-title">成本项目计划执行进度预警主题</div>
        </hover-box>
        <hover-box
          class="left-theme sidebar-third single-area bg-2"
          :ids="boxIds['left3']"
          theme="left"
        >
          <div class="sidebar-content-title">应收票据到期分布预警主题</div>
        </hover-box>
        <hover-box
          class="left-theme sidebar-forth single-area bg-2"
          :ids="boxIds['left4']"
          theme="left"
        >
          <div class="sidebar-content-title">增值税进项税额抵扣率预警主题</div>
        </hover-box>
      </div>
      <div class="marketing-field single-theme">
        <div class="sidebar-title sidebar-middle-title">
          <img :src="marketingTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box
          class="middle-theme middle-first single-area bg-1"
          :ids="boxIds['middle1']"
          theme="middle"
        >
          <div class="sidebar-content-title">业扩报装关键时长预警主题</div>
          <top-indicator />
          <sand-clock-chart ids="sandClock" />
        </hover-box>
        <hover-box
          class="middle-theme middle-second single-area bg-2"
          :ids="boxIds['middle2']"
          theme="middle"
        >
          <div class="sidebar-content-title">销户用户电费余额预警主题</div>
          <left-indicator />
          <middle-line-chart
            class="middle-line-chart"
            :ids="middleLineIds"
            :chartData="middleLineData"
          />
        </hover-box>
        <hover-box
          class="middle-theme middle-third single-area bg-3"
          :ids="boxIds['middle3']"
          theme="middle"
        >
          <div class="sidebar-content-title">电费突增预警主题</div>
          <middle-bubble-chart
            class="middle-bubble-chart"
            :ids="middleBubbleIds"
            :chartData="middleBubbleData"
          />
        </hover-box>
        <hover-box
          class="middle-theme middle-forth single-area bg-2"
          :ids="boxIds['middle4']"
          theme="middle"
        >
          <div class="sidebar-content-title">档案与电价用电类别不符预警主题</div>
          <middle-bar-chart class="middle-bar-box" :ids="middleBarIds" :chartData="middleBarData" />
        </hover-box>
      </div>
      <div class="project-field single-theme">
        <div class="sidebar-title">
          <img :src="projectTitle" alt class="sidebar-title-img" />
        </div>
        <hover-box
          class="right-theme sidebar-first single-area bg-1"
          :ids="boxIds['right1']"
          theme="right"
        >
          <div class="sidebar-content-title">技改工程转资及时性预警主题</div>
          <right-bubble-chart
            class="right-bubble-chart"
            :ids="rightBubbleIds"
            :chartData="rightBubbleData"
          />
          <right-form-chart
            class="right-form-chart"
            :ids="rightFormIds"
            :chartData="rightFormData"
          />
        </hover-box>
        <hover-box
          class="right-theme sidebar-second single-area bg-2"
          :ids="boxIds['right2']"
          theme="right"
        >
          <div class="sidebar-content-title">物资采购合同履约情况预警主题</div>
          <right-water-chart
            class="right-water-chart"
            :ids="rightWaterIds"
            :chartData="rightWaterData"
          />
          <right-huan-chart
            class="right-huan-chart"
            :ids="rightHuanIds"
            :chartData="rightHuanData"
          />
        </hover-box>
        <hover-box
          class="right-theme sidebar-third single-area bg-2"
          :ids="boxIds['right3']"
          theme="right"
        >
          <div class="sidebar-content-title">工程建设周期合理性预警主题</div>
        </hover-box>
        <hover-box
          class="right-theme sidebar-forth single-area bg-2"
          :ids="boxIds['right4']"
          theme="right"
        >
          <div class="sidebar-content-title">物资库龄风险预警主题</div>
        </hover-box>
      </div>
    </div>
  </div>
</template>

<script>
import HoverBox from "@/components/S2/hoverBox.vue";
import TopIndicator from "@/components/S2/topIndicator.vue";
import LeftIndicator from "@/components/S2/leftIndicator.vue";
import SandClockChart from "@/components/S2/sandClockChart.vue";
import MiddleLineChart from "@/components/S2/middleLineChart.vue";
import MiddleBubbleChart from "@/components/S2/middleBubbleChart.vue";
import MiddleBarChart from "@/components/S2/middleBarChart.vue";
import RightBubbleChart from "@/components/S2/rightBubbleChart.vue";
import RightFormChart from "@/components/S2/rightFormChart.vue";
import RightWaterChart from "@/components/S2/rightWaterChart.vue";
import RightHuanChart from "@/components/S2/rightHuanChart.vue";

import Title from "@/assets/images/second/title-3.png";
import FinanceTitle from "@/assets/images/second/title-1.png";
import MarketingTitle from "@/assets/images/second/title-4.png";
import ProjectTitle from "@/assets/images/second/title-2.png";
export default {
  name: "",
  props: [],
  mounted() {
    let data = null;
    if (window.name) {
      data = JSON.parse(window.name);
      // data = window.name;
    } else {
      // data = JSON.parse(dataJson.S2);
    }
    this.screenSecondData = data;
    this.initData();
  },
  data() {
    return {
      title: Title,
      financeTitle: FinanceTitle,
      marketingTitle: MarketingTitle,
      projectTitle: ProjectTitle,
      boxIds: {
        left1: "left1",
        left2: "left2",
        left3: "left3",
        left4: "left4",
        middle1: "middle1",
        middle2: "middle2",
        middle3: "middle3",
        middle4: "middle4",
        right1: "right1",
        right2: "right2",
        right3: "right3",
        right4: "right4"
      },
      middleLineIds: "middleLineChart",
      middleLineData: null,
      middleBubbleIds: "middleBubbleChart",
      middleBubbleData: null,
      middleBarIds: "middleBarChart",
      middleBarData: null,
      rightBubbleIds: "rightBubbleChart",
      rightBubbleData: null,
      rightFormIds: "rightFormChart",
      rightFormData: null,
      rightWaterIds: "rightWaterChart",
      rightWaterData: null,
      rightHuanIds: "rightHuanChart",
      rightHuanData: null
    };
  },
  computed: {},
  methods: {
    initData() {}
  },
  components: {
    HoverBox,
    TopIndicator,
    LeftIndicator,
    SandClockChart,
    MiddleLineChart,
    MiddleBubbleChart,
    MiddleBarChart,
    RightBubbleChart,
    RightFormChart,
    RightWaterChart,
    RightHuanChart,
  },
  watch: {}
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "ShiShangZhongHeiJianTi";
  src: url(../../components/font/shishangzhongheijianti.ttf); /***兼容ie9***/
}
.second-screen {
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
    top: 270px;
    left: 0;
    width: 100%;
    height: 4044px;
    .single-theme {
      position: absolute;
      height: 100%;
      top: 0;
      .sidebar-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 160px;
        background: url("../../assets/images/second/Frame-674@4x.png") no-repeat;
        background-size: 100% 100%;
        .sidebar-title-img {
          width: 557px;
          height: 80px;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          margin-top: 42px;
        }
      }
      .sidebar-middle-title {
        background: url("../../assets/images/second/Frame-730@4x.png") no-repeat;
      }
      .single-area {
        position: absolute;
        left: 0;
        width: 100%;
        transition: all 0.3s;
        z-index: 10;
      }
      .bg-1 {
        background: url("../../assets/images/first/bg-1.png") no-repeat;
        background-size: 100% 100%;
      }
      .bg-2 {
        background: url("../../assets/images/first/bg-2.png") no-repeat;
        background-size: 100% 100%;
      }
      .bg-3 {
        background: url("../../assets/images/second/Frame-748@4x.png") no-repeat;
        background-size: 100% 100%;
      }
      .left-theme {
        box-shadow: rgba(0, 0, 0, 0.3) -30px -30px 10px;
      }
      .middle-theme {
        box-shadow: rgba(0, 0, 0, 0.3) 0px -30px 10px;
      }
      .right-theme {
        box-shadow: rgba(0, 0, 0, 0.3) 30px -30px 10px;
      }
      .sidebar-first {
        top: 224px;
        height: 940px;
      }
      .sidebar-second {
        top: 1220px;
        height: 920px;
      }
      .sidebar-third {
        top: 2196px;
        height: 860px;
      }
      .sidebar-forth {
        top: 3112px;
        height: 860px;
      }
      .middle-first {
        top: 224px;
        height: 1212px;
      }
      .middle-second {
        top: 1492px;
        height: 784px;
      }
      .middle-third {
        top: 2332px;
        height: 784px;
      }
      .middle-forth {
        top: 3172px;
        height: 800px;
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
      .middle-line-chart {
        position: absolute;
        left: 950px;
        top: 200px;
        width: 1632px;
        height: 70%;
      }
      .middle-bubble-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
        height: 70%;
      }
      .middle-bar-box {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
        height: 70%;
      }
      .right-bubble-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 50%;
        height: 75%;
      }
      .right-form-chart {
        position: absolute;
        left: 50%;
        top: 240px;
        width: 45%;
        height: 70%;
      }
      .right-water-chart {
        position: absolute;
        left: 56px;
        top: 240px;
        width: 45%;
        height: 70%;
      }
      .right-huan-chart {
        position: absolute;
        left: 50%;
        top: 240px;
        width: 45%;
        height: 70%;
      }
    }
    .finance-field {
      left: 96px;
      width: 2312px;
    }
    .marketing-field {
      left: 2520px;
      width: 2640px;
    }
    .project-field {
      left: 5272px;
      width: 2312px;
      .sidebar-title {
        .sidebar-title-img {
          width: 677px;
        }
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
}
</style>

<style lang="less">
</style>