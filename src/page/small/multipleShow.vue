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
    <move-modal />
    <div class="cover-div" v-if="dialogVisible"></div>
  </div>
</template>

<script>
import MoveModal from "@/components/moveModal.vue";
import PieAndColumn from "@/components/multiple/pieAndColumn.vue";
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
      modalJudge: false
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
    }
  },
  components: {
    "move-modal": MoveModal,
    "pie-and-column": PieAndColumn
  }
};
</script>

<style lang="less" scoped>
.multiple {
  width: 2560px;
  height: 1440px;
  color: #fff;
  background: url("../../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: hidden;
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
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
