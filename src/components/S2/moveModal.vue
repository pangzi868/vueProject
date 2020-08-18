<template>
  <div>
    <el-container
      :class="(visibility ? 'trans' : '')"
      v-bind:id="id"
      @mousedown.native.prevent="down($event)"
      @touchstart.native.prevent="down($event)"
      @mousemove.native.prevent="move($event)"
      @touchmove.native.prevent="move($event)"
      @mouseup.native.prevent="end($event)"
      @touchend.native.prevent="end($event)"
    >
      <el-main>
        <dv-scroll-board
          :config="bottomScrollConfig"
          style="width:100%; height:100%; font-size: 48px;"
        />
      </el-main>
    </el-container>
    <div class="cover-div" v-if="visibility"></div>
  </div>
</template>

<script>
export default {
  name: "Window",
  created() {
    this.initTable();
    // this.initColumn(this.dialogData, this.currentPro, this.leftSecAux);
  },
  props: {
    titlex: String,
    visible: Boolean,
    type: String,
    data: Object,
    keys: String
    // id: [String, Number]
  },
  data() {
    return {
      title: this.titlex,
      visibility: this.visible,
      selectElement: "",
      id: this.keys,
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
      styleArr: ["singlemove", "rotatemove"],
      currentData: [],
      bottomScrollConfig: {
        header: [],
        headerBGC: "rgba(15,67,97,0.4)",
        oddRowBGC: "rgba(50,218,255,0.1)",
        evenRowBGC: "rgba(15,67,97,0.4)",
        headerHeight: 128,
        carousel: "single",
        align: [],
        data: []
      }
    };
  },
  computed: {
    modalVisibility: {
      get: function() {
        return this.$store.state.modalVisibility;
      },
      set: function(newValue) {
        this.$store.commit("newModalVisibility", newValue);
      }
    },
    modalData: {
      get: function() {
        return this.$store.state.modalData;
      },
      set: function(newValue) {
        this.$store.commit("newModalData", newValue);
      }
    }
  },
  methods: {
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
        this.closeDialog();
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
    },
    testClick(e) {
      if (this.dragging) {
        this.dragging = !this.dragging;
        return;
      }
      alert("下钻");
    },

    closeDialog(e) {
      this.keys;
      let temp = {};
      temp[this.keys] = Object.assign({}, this.modalData[this.keys], {
        visible: false
      });
      this.modalData = temp;
    },
    initTable() {
      this.bottomScrollConfig.header = this.data.xAxis;
      this.bottomScrollConfig.data = this.data.yAxis;
      this.bottomScrollConfig.align = this.data.align;
    }
  },
  watch: {
    modalData: function(newValue) {
      this.selectElement = document.getElementById(this.id);
      this.selectElement.style.left = "24%";
      this.selectElement.style.top = "20%";
      this.visibility = newValue[this.keys].visible;
      if (this.visibility) {
        thsi.initTable();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  position: absolute;
  height: 0;
  width: 0;
  border: 1px;
  z-index: 20;
  top: 20%;
  left: 24%;
  border-radius: 2px;

  opacity: 0;
  transform: rotate(0.5turn);
  -webkit-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -moz-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -ms-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -o-transition: all 0.8s ease-in-out, left 0s, top 0s;
  transition: all 0.8s ease-in-out, left 0s, top 0s;
  border-radius: 34px;
  box-shadow: rgba(0, 0, 0, 1) 0px -30px 10px;
}
// .singlemove {
//   -webkit-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -moz-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -ms-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -o-transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
//     visibility 0.4s ease-in;
//   transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
//     visibility 0.4s ease-in;
// }
.trans {
  opacity: 1;
  height: 2500px;
  width: 3900px;
  transform: rotate(0);
}
.dialog-footer {
  text-align: right;
}

.el-main {
  font-size: 20px;
  color: #fff;
  border-radius: 34px;
  padding: 78px;
  background: rgba(45, 100, 121, 1);
}

.el-footer {
  background-color: white;
}

.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<style lang="less">
.el-table {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 54px;

  thead {
    color: rgba(255, 255, 255, 0.8);
  }
  .header-row {
    background-color: rgba(15, 67, 97, 0.4);
    height: 78px;
    line-height: 78px;
    .cell {
      text-align: center;
      line-height: 78px;
    }
    th.is-leaf {
      border-bottom: 0;
    }
  }
  .odd-row {
    background: rgba(50, 218, 255, 0.1);
  }
  .even-row {
    background: rgba(15, 67, 97, 0.4);
  }
  .el-table__row {
    height: 78px;
    line-height: 78px;
    .cell {
      text-align: center;
      line-height: 78px;
    }
  }
  td {
    border-bottom: 0;
  }
  &::before {
    background-color: rgba(0, 0, 0, 0);
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0);
}
.dv-scroll-board {
  .header {
    font-size: 48px;
  }
  .rows {
    .row-item {
      font-size: 56px;
    }
  }
}
.cover-div {
  position: absolute;
  left: 0;
  top: 0;
  width: 7680px;
  height: 4320px;
  z-index: 18;
  background: url("../../assets/images/masking.png") no-repeat;
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>