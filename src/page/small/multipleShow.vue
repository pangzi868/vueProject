<template>
  <div class="multiple">
    <div class="multiple-left">
      <div
        :class="'test-div ' + (mouseOverJudge['left2'] ? 'transform-test-div' : '')"
        :id="ids['left2']"
        @mouseover="mouseOverHander($event)"
        @mouseout="mouseOutHander($event)"
      >
        <!-- <button @click="toggleModal()">111</button> -->
        <pie-and-column
          v-if="leftSecJudge"
          :ids="leftSecChart"
          :chartData="leftSecData"
          @mouseover.native="mouseOverChildHander($event)"
          @mouseout.native="mouseOutChildHander($event)"
        />
      </div>
      <div
        :class="'test-div1 ' + (mouseOverJudge['left3'] ? 'transform-test-div' : '')"
        :id="ids['left3']"
        @mouseover="mouseOverHander($event)"
        @mouseout="mouseOutHander($event)"
      ></div>
    </div>
    <div class="multiple-middle">
      <img-rotation class="img-rotation" :autoMove="autoMove" />
    </div>
    <move-modal />
    <button class="control-btn" @click="controlMove">control</button>
    <div v-html="currentPro" class="current-pro"></div>
    <div class="cover-div" v-if="dialogVisible"></div>
  </div>
</template>

<script>
import MoveModal from "@/components/moveModal.vue";
import PieAndColumn from "@/components/multiple/pieAndColumn.vue";
import ImgRotation from "@/components/multiple/imgRotation.vue";

import { setInterval, clearInterval } from "timers";
export default {
  name: "",
  props: [],
  mounted() {
    //   if (
    //     window.name !== "" ||
    //     window.name !== null ||
    //     widnow.name !== undefined
    //   ) {
    //     let data = JSON.parse(window.name);
    //     this.$store.commit("newFirstScreenData", data);
    //   }
  },
  data() {
    return {
      // 存放id
      ids: {
        left2: "left2",
        left3: "left3"
      },
      leftSecChart: [
        { id: "leftSecPie", name: "pie" },
        { id: "leftSecCol", name: "col" }
      ],
      leftSecData: {
        pie: [],
        col: []
      },
      leftSecJudge: true,

      mouseOverJudge: {
        left2: false,
        left3: false
      },
      modalJudge: false,
      autoMove: true
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.$store.state.dialogVisible;
      },
      set: function(newValue) {
        this.$store.commit("newDialogVisible", newValue);
      }
    },
    currentPro: {
      get: function() {
        return this.$store.state.currentPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurrentPro", newVal);
      }
    }
  },
  methods: {
    mouseOverHander(e) {
      // debugger
      let id = e.target.id;
      this.mouseOverJudge[id] = true;
    },
    mouseOverChildHander(e) {
      let id = e.currentTarget.parentElement.id;
      this.mouseOverJudge[id] = true;
    },
    mouseOutHander(e) {
      let id = e.target.id;
      this.mouseOverJudge[id] = false;
    },
    mouseOutChildHander(e) {
      let id = e.currentTarget.parentElement.id;
      this.mouseOverJudge[id] = false;
    },
    toggleModal() {
      this.modalJudge = !this.modalJudge;
    },
    controlMove() {
      debugger;
      this.autoMove = !this.autoMove;
    }
  },
  components: {
    "move-modal": MoveModal,
    "pie-and-column": PieAndColumn,
    "img-rotation": ImgRotation
  }
};
</script>

<style lang="less" scoped>
.multiple {
  width: 2560px;
  height: 1440px;
  // width: 7680px;
  // height: 4320px;
  color: #fff;
  background: url("../../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .multiple-middle {
    position: absolute;
    left: 800px;
    top: 100px;
    width: 1200px;
    height: 1300px;
    // background-color: #000;
    .img-rotation {
      position: absolute;
      left: 10px;
      top: 20px;
      width: 600px;
      height: 400px;
      // background-color: #D24545;
    }
  }
  .control-btn {
    position: absolute;
    left: 800px;
    top: 600px;
    height: 100px;
    width: 200px;
    color: #999;
    font-size: 48px;
  }
  .current-pro {
    position: absolute;
    left: 1100px;
    top: 600px;
    height: 100px;
    background-color: #fff;
    text-align: center;
    line-height: 100px;
    width: 200px;
    color: #999;
    font-size: 48px;
  }
  .multiple-left {
    position: absolute;
    left: 50px;
    top: 300px;
    width: 700px;
    height: 1000px;
    .test-div {
      background: url("../../assets/images/modal.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: rgba(0, 0, 0, 0.3) -10px -10px 1px;
      //   transform: scale(1.08, 1) skew(0deg, 1deg);
      position: absolute;
      top: 0%;
      left: 0%;
      height: 400px;
      width: 100%;
      transition: all 0.3s;
    }
    .test-div1 {
      background: url("../../assets/images/modal.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: rgba(0, 0, 0, 0.3) -10px -10px 1px;
      //   transform: scale(1.08, 1) skew(0deg, 1deg);
      position: absolute;
      top: 45%;
      left: 0%;
      height: 400px;
      width: 100%;
      transition: all 0.3s;
    }
    .transform-test-div {
      // 放大x， y
      transform: scale(1.05, 1.05);
      // 位移 x， y
      transform: translate(1.05, 1.05);
    }
  }
  .cover-div {
    position: absolute;
    left: 0;
    top: 0;
    width: 2560px;
    height: 1440px;
    // width: 7680px;
    // height: 4320px;
    z-index: 12;
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
