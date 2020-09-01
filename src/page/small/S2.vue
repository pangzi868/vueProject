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
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="rgba(255,255,255,0.7)"
            active-text-color="rgba(255,255,255,1)"
          >
            <el-menu-item
              v-for="item in left1Menu"
              :key="item.key"
              :index="item.index"
            >{{item.name}}</el-menu-item>
          </el-menu>
          <left-line class="line-chart" :ids="lineIds" :chartData="lineData" />
        </hover-box>
        <hover-box
          class="left-theme sidebar-second single-area bg-2"
          :ids="boxIds['left2']"
          theme="left"
        >
          <div class="sidebar-content-title">成本项目计划执行进度预警主题</div>
          <second-indicator class="second-indicator" />
          <line-and-column
            class="little-left-line-chart"
            :ids="littleLineAndColumnIds"
            :chartData="littleLineAndColumnData"
          />
        </hover-box>
        <hover-box
          class="left-theme sidebar-third single-area bg-2"
          :ids="boxIds['left3']"
          theme="left"
        >
          <div class="sidebar-content-title">应收票据到期分布预警主题</div>
          <el-select v-model="selectValue" size="medium" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <left-bar
            v-if="draw"
            :curType="selectValue"
            class="left-bar-chart"
            :ids="leftBarIds"
            :chartData="leftBarData"
          />
        </hover-box>
        <hover-box
          class="left-theme sidebar-forth single-area bg-2"
          :ids="boxIds['left4']"
          theme="left"
        >
          <div class="sidebar-content-title">增值税进项税额抵扣率预警主题</div>
          <line-and-column
            v-if="draw"
            class="left-line-chart"
            :ids="leftLineAndColumnIds"
            :chartData="leftLineAndColumnData"
          />
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
          <sand-clock-chart
            v-if="draw && (curPro === '全省')"
            :ids="middleSandIds"
            :chartData="middleSandData"
          />
          <mid-top-line-chart
            v-if="draw && (curPro !== '全省')"
            :ids="midTopLineIds"
            :chartData="midTopLineData"
          />
        </hover-box>
        <hover-box
          class="middle-theme middle-second single-area bg-2"
          :ids="boxIds['middle2']"
          theme="middle"
        >
          <div class="sidebar-content-title">销户用户电费余额预警主题</div>
          <left-indicator :chartData="middleLeftIndi" v-if="draw" />
          <middle-line-chart
            class="middle-line-chart"
            :ids="middleLineIds"
            :chartData="middleLineData"
            v-if="draw"
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
            v-if="draw"
          />
        </hover-box>
        <hover-box
          class="middle-theme middle-forth single-area bg-2"
          :ids="boxIds['middle4']"
          theme="middle"
        >
          <div class="sidebar-content-title">档案与电价用电类别不符预警主题</div>
          <middle-bar-chart
            class="middle-bar-box"
            :ids="middleBarIds"
            :chartData="middleBarData"
            v-if="draw"
          />
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
            v-if="draw"
          />
          <right-form-chart
            class="right-form-chart"
            :ids="rightFormIds"
            :chartData="rightFormData"
            v-if="draw"
          />
        </hover-box>
        <hover-box
          class="right-theme sidebar-third single-area bg-2"
          :ids="boxIds['right2']"
          theme="right"
        >
          <div class="sidebar-content-title">物资采购合同履约情况预警主题</div>
          <right-water-chart
            class="right-water-chart"
            :ids="rightWaterIds"
            :chartData="rightWaterData"
            v-if="draw"
          />
          <right-huan-chart
            class="right-huan-chart"
            :ids="rightHuanIds"
            :chartData="rightHuanData"
            v-if="draw"
          />
        </hover-box>
        <hover-box
          class="right-theme sidebar-second single-area bg-2"
          :ids="boxIds['right3']"
          theme="right"
        >
          <div class="sidebar-content-title">工程建设周期合理性预警主题</div>
          <right-column-chart
            class="right-column-chart"
            :ids="rightColumnIds"
            :chartData="rightColumnData"
            v-if="draw"
          />
          <right-radar-chart
            class="right-radar-chart"
            :ids="rightRadarIds"
            :chartData="rightRadarData"
            v-if="draw"
          />
        </hover-box>
        <hover-box
          class="right-theme sidebar-forth single-area bg-2"
          :ids="boxIds['right4']"
          theme="right"
        >
          <div class="sidebar-content-title">物资库龄风险预警主题</div>
          <right-bar-chart
            class="right-bar-chart"
            :ids="rightBarIds"
            :chartData="rightBarData"
            v-if="draw"
          />
        </hover-box>
      </div>
    </div>
    <vue-fab
      mainBtnColor="rgba(150,211,255,0.58)"
      :globalOptions="globalOptions"
      @mousedown.native.prevent="down($event)"
      @touchstart.native.prevent="down($event)"
      @mousemove.native.prevent="move($event)"
      @touchmove.native.prevent="move($event)"
      @mouseup.native.prevent="end($event)"
      @touchend.native.prevent="end($event)"
      id="fab"
    >
      <!-- <img
        :src="operationImg"
        style="width: 80%;height: 70%;top: 180px;left: 20px;position: absolute;"
      />-->
      <fab-item
        v-for="item in fabItem"
        :key="item.ids"
        @clickItem="clickItem"
        :idx="item.ids"
        :title="item.name"
      >
        <img :src="companyImg" style="width: 100%;height: 70%;top: 20px;position: absolute;" />
      </fab-item>
    </vue-fab>
    <move-modal
      v-for="item in modalData"
      :key="item.keys"
      :visible="item.visible"
      :type="item.type"
      :data="item.data"
      :keys="item.keys"
      :chartIds="item.chartIds"
      :tableJudge="item.tableJudge"
      :dime="item.name"
      :zIndex="item.zIndex"
    />
    <!-- <move-modal /> -->
  </div>
</template>

<script>
import MoveModal from "@/components/S2/moveModal.vue";

import HoverBox from "@/components/S2/hoverBox.vue";
import LeftLine from "@/components/S2/leftLineChart.vue";
import LineAndColumn from "@/components/S2/leftLineAndColumnChart.vue";
import LeftBar from "@/components/S2/leftBarChart.vue";
import SecondIndicator from "@/components/S2/secondIndicator.vue";

import TopIndicator from "@/components/S2/topIndicator.vue";
import LeftIndicator from "@/components/S2/leftIndicator.vue";
import SandClockChart from "@/components/S2/sandClockChart.vue";
import MidTopLineChart from "@/components/S2/midTopLineChart.vue";
import MiddleLineChart from "@/components/S2/middleLineChart.vue";
import MiddleBubbleChart from "@/components/S2/middleBubbleChart.vue";
import MiddleBarChart from "@/components/S2/middleBarChart.vue";

import RightBubbleChart from "@/components/S2/rightBubbleChart.vue";
import RightFormChart from "@/components/S2/rightFormChart.vue";
import RightWaterChart from "@/components/S2/rightWaterChart.vue";
import RightHuanChart from "@/components/S2/rightHuanChart.vue";
import RightColumnChart from "@/components/S2/rightColumnChart.vue";
import RightRadarChart from "@/components/S2/rightRadarChart.vue";
import RightBarChart from "@/components/S2/rightBarChart.vue";

import Title from "@/assets/images/second/title-3.png";
import FinanceTitle from "@/assets/images/second/title-1.png";
import MarketingTitle from "@/assets/images/second/title-4.png";
import ProjectTitle from "@/assets/images/second/title-2.png";
import Company from "@/assets/images/second/company.svg";
import Operation from "@/assets/images/second/Frame@4x.png";

import * as dataJson from "@/assets/dataJson.js";
export default {
  name: "",
  props: [],
  mounted() {
    let data = null;
    if (window.name) {
      data = JSON.parse(window.name);
      // data = window.name;
    } else {
      data = JSON.parse(dataJson.S2);
    }
    this.screenSecondData = data;
    this.initData();
  },
  data() {
    return {
      selectElement: "",
      id: "fab",
      dragging: false,
      downDrag: false,
      dragObj: {
        moveX: 0,
        moveY: 0,
        dragTime: 0,
        startTime: 0,
        endTime: 0,
        distanceX: 0,
        distanceY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        touchstartX: 0,
        touchstartY: 0
      },

      draw: false,
      activeIndex: "1",
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
      // options: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   },
      //   {
      //     value: "选项3",
      //     label: "蚵仔煎"
      //   },
      //   {
      //     value: "选项4",
      //     label: "龙须面"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北京烤鸭"
      //   }
      // ],
      options: [],
      left1Menu: [
        {
          index: "1",
          key: "menu1",
          name: "总览"
        },
        {
          index: "2",
          key: "menu2",
          name: "办公费"
        },
        {
          index: "3",
          key: "menu3",
          name: "差旅费"
        },
        {
          index: "4",
          key: "menu4",
          name: "会议费"
        },
        {
          index: "5",
          key: "menu5",
          name: "公务用车"
        },
        {
          index: "6",
          key: "menu6",
          name: "生产用车"
        },
        {
          index: "7",
          key: "menu7",
          name: "安全费"
        },
        {
          index: "8",
          key: "menu8",
          name: "党建工作"
        }
      ],
      selectValue: "",
      lineIds: "lineChart",
      lineData: null,
      littleLineAndColumnIds: "littleLineAndColumnChart",
      littleLineAndColumnData: null,
      leftBarIds: "leftBarChart",
      leftBarData: null,
      leftLineAndColumnIds: "leftLineAndColumnChart",
      leftLineAndColumnData: null,
      middleSandIds: "middleSandIds",
      middleSandData: null,
      middleLeftIndi: null,
      middleLineIds: "middleLineChart",
      middleLineData: null,
      midTopLineIds: "midTopLineChart",
      MidTopLineData: null,
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
      rightHuanData: null,
      rightColumnIds: "rightColumnChart",
      rightColumnData: null,
      rightRadarIds: "rightRadarChart",
      rightRadarData: null,
      rightBarIds: "rightBarChart",
      rightBarData: null,
      fabItem: [
        { name: "全省", ids: 10 },
        // { name: "本部", ids: 10 },
        { name: "长春", ids: 9 },
        { name: "吉林", ids: 8 },
        { name: "四平", ids: 7 },
        { name: "通化", ids: 6 },
        { name: "延边", ids: 5 },
        { name: "白城", ids: 4 },
        { name: "辽源", ids: 3 },
        { name: "白山", ids: 2 },
        { name: "松原", ids: 1 },
        { name: "直属单位", ids: 0 }
      ],
      globalOptions: { spacing: 200, delay: 0.05 },
      companyImg: Company,
      operationImg: Operation
    };
  },
  computed: {
    screenSecondData: {
      get: function() {
        return this.$store.state.screenSecondData;
      },
      set: function(newValue) {
        this.$store.commit("newScreenSecondData", newValue);
      }
    },
    curPro: {
      get: function() {
        return this.$store.state.curPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurPro", newVal);
      }
    },

    modalData: {
      get: function() {
        return this.$store.state.modalData;
      },
      set: function(newValue) {
        this.$store.commit("newModalData", newValue);
      }
    },
    modalVisibility: {
      get: function() {
        return this.$store.state.modalVisibility;
      },
      set: function(newValue) {
        this.$store.commit("newModalVisibility", newValue);
      }
    },
    topIndex: {
      get: function() {
        return this.$store.state.topIndex;
      },
      set: function(val) {
        this.$store.commit("newTopIndex", val);
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initData() {
      this.initButton();
      this.leftBarData = this.screenSecondData.left3;
      this.leftLineAndColumnData = this.screenSecondData.left4one;
      this.middleSandData = this.screenSecondData.middle1;
      this.midTopLineData = this.screenSecondData.middle1Branch;
      this.middleLineData = this.screenSecondData.middle2;
      this.middleLeftIndi = this.screenSecondData.middle2Indicator;
      this.middleBubbleData = this.screenSecondData.middle3;
      this.middleBarData = this.screenSecondData.middle4;
      this.rightBubbleData = this.screenSecondData.right1;
      this.rightFormData = this.screenSecondData.right1;
      this.rightWaterData = this.screenSecondData.right4
        ? this.screenSecondData.right4.y[0].data[0]
        : 0;
      this.rightHuanData = this.screenSecondData.right2Huan;
      this.rightColumnData = this.screenSecondData.right3;
      this.rightRadarData = this.screenSecondData.right3;
      this.rightBarData = this.screenSecondData.right2;
      this.$nextTick(() => {
        this.draw = true;
      });
    },

    initButton() {
      this.options = this.screenSecondData.left3Type.x[0].data.map(item => {
        return {
          label: item,
          value: item
        };
      });
      this.selectValue = this.screenSecondData.left3Type.x[0].data[0];
    },
    clickItem(item) {
      let tempCur = this.fabItem.filter((items, index) => {
        return items.ids === item.idx;
      });
      this.curPro = tempCur[0].name;
    },
    down(e) {
      e.prevent;
      this.downDrag = true;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      if (!mouseType) {
        this.dragObj.touchstartX = clientX;
        this.dragObj.touchstartY = clientY;
      }
      this.selectElement = document.getElementById(this.id);
      this.selectElement.style.cursor = "move";
      this.distanceX = clientX - this.selectElement.offsetLeft;
      this.distanceY = clientY - this.selectElement.offsetTop;
      this.dragObj.startTime = e.timeStamp;
    },
    move(e) {
      if (!this.downDrag) return;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      this.selectElement.style.left = clientX - this.distanceX + "px";
      this.selectElement.style.top = clientY - this.distanceY + "px";
      this.dragObj.moveX += e.movementX;
      this.dragObj.moveY += e.movementY;
      if (!mouseType) {
        this.dragObj.moveX = clientX - this.dragObj.touchstartX;
        this.dragObj.moveY = clientY - this.dragObj.touchstartY;
      }
      // 这里的数据越小，越精确
      if (Math.abs(this.dragObj.moveX) + Math.abs(this.dragObj.moveY) > 5) {
        this.dragging = true;
      }
    },
    end(e) {
      let dragDis = 0;
      this.downDrag = false;
      this.dragObj.endTime = e.timeStamp;
      this.dragObj.dragTime =
        parseInt(this.dragObj.endTime) - parseInt(this.dragObj.startTime);
      dragDis = Math.abs(this.dragObj.moveX) + Math.abs(this.dragObj.moveY);
      // 如果（拖动距离）大于5且小于200 且（拖动时长）小于200ms
      if (dragDis > 5 && dragDis < 1000 && this.dragObj.dragTime < 200) {
        // this.closeDialog();
      }
      this.dragging = false;
      this.dragObj = {
        moveX: 0,
        moveY: 0,
        dragTime: 0,
        startTime: 0,
        endTime: 0,
        distanceX: 0,
        distanceY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        touchstartX: 0,
        touchstartY: 0
      };
      this.selectElement.style.cursor = "default";
    }
  },
  components: {
    MoveModal,
    HoverBox,
    LineAndColumn,
    LeftLine,
    LeftBar,
    SecondIndicator,

    TopIndicator,
    LeftIndicator,
    SandClockChart,
    MiddleLineChart,
    MidTopLineChart,
    MiddleBubbleChart,
    MiddleBarChart,

    RightBubbleChart,
    RightFormChart,
    RightWaterChart,
    RightHuanChart,
    RightColumnChart,
    RightRadarChart,
    RightBarChart
  },
  watch: {
    modalData: function() {}
  }
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
      .second-indicator {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 540px;
        height: 686px;
      }
      .line-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
        height: 65%;
      }
      .little-left-line-chart {
        position: absolute;
        left: 600px;
        top: 200px;
        width: 1632px;
        height: 75%;
      }
      .left-bar-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
        height: 75%;
      }
      .left-line-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
        height: 70%;
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
      .right-column-chart {
        position: absolute;
        left: 56px;
        top: 240px;
        width: 45%;
        height: 70%;
      }
      .right-radar-chart {
        position: absolute;
        left: 50%;
        top: 240px;
        width: 45%;
        height: 70%;
      }
      .right-bar-chart {
        position: absolute;
        left: 56px;
        top: 200px;
        width: 95%;
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
// 下拉框
.el-select {
  display: inline-block;
  position: absolute;
  right: 4%;
  top: 3%;

  .el-input--medium {
    font-size: 48px;
    .el-input__inner {
      background-color: rgba(0, 104, 226, 0.25);
      border: 2px solid rgba(131, 188, 255, 0.32);
      color: rgba(255, 255, 255, 0.7);
      height: 110px;
      line-height: 110px;
    }
    .el-input__icon {
      line-height: 110px;
    }
    .el-input__suffix {
      right: 25px;
    }
  }
}
.el-select-dropdown {
  background-color: rgba(8, 45, 60, 0.9);
  border: 2px solid rgba(131, 188, 255, 0.32);
  color: rgba(255, 255, 255, 0.7);
}
.el-select-dropdown__wrap {
  max-height: unset;
}
.el-select-dropdown__item {
  font-size: 46px;
  height: 110px;
  line-height: 110px;
  color: rgba(255, 255, 255, 0.7);
  &.hover {
    color: rgba(0, 0, 0, 0.8);
  }
}
.el-select .el-input .el-select__caret {
  font-size: 46px;
}

// 导航栏
.el-menu.el-menu--horizontal {
  position: absolute;
  width: 100%;
  height: 8%;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 172, 226, 0) 0%,
    rgba(56, 145, 250, 1) 100%
  );
  border-bottom: 0px;
  .el-menu-item {
    width: 12.5%;
    font-size: 50px;
    height: 100%;
    line-height: 150%;
    text-align: center;
    cursor: pointer;
    &:not(.is-disabled) {
      &:focus,
      &:hover {
        background-color: unset;
      }
    }
  }
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: unset;
}
// .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
// .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
// }

// 切换菜单栏
.fab-main-container {
  -webkit-tap-highlight-color: transparent;
  height: 200px;
  width: 200px;
  .fab-size-normal {
    height: 200px !important;
    width: 200px !important;
  }
  .fab {
    border: 20px solid rgba(255, 255, 255, 0.24);
  }
  .fab-item-container {
    top: -150px !important;
  }
  .fab-shadow {
    .vue-fab-material-icons {
      height: 160px !important;
      width: 160px !important;
    }
  }
  .fab-cantainer {
    height: 200px;
    width: 200px;
    .fabMask {
      height: 200px;
      width: 200px;
    }
    .touchStyle {
      opacity: 0 !important;
    }
    .vue-fab-material-icons {
      height: 200px;
      width: 200px;
    }
    .material-icons {
      font-size: 100px;
    }
    .fab-item-image {
      height: 200px;
      width: 200px;
    }
    .fab-item-title {
      right: 200px;
      padding: 30px 50px;
      border-radius: 25px;
      font-size: 56px;
    }
  }
}
</style>