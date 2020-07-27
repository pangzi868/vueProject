<template>
  <el-container
    :class="(dialogVisible ? 'trans' : '')"
    v-bind:id="id"
    @mousedown.native.prevent="down($event)"
    @touchstart.native.prevent="down($event)"
    @mousemove.native.prevent="move($event)"
    @touchmove.native.prevent="move($event)"
    @mouseup.native.prevent="end($event)"
    @touchend.native.prevent="end($event)"
  >
    <!-- @mousedown.native="mousedown" -->
    <!-- <el-header>
      <div >
        <h2 v-html="title"></h2>
        <div style="position: absolute;top: 0px; right: 0px; width: 100%; height: 100%">
          <span>
            <svg class="icon" aria-hidden="false">
              <use xlink:href="#el-icon-ext-close" />
            </svg>
          </span>
        </div>
      </div>
    </el-header>-->
    <el-main>
      <slot>这里是内容：{{dialogData}}</slot>
      <button @mouseup="testClick($event)" @touchend.prevent="testClick($event)">dkjddjkj</button>
    </el-main>
    <!-- <el-footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </span>
    </el-footer>-->
  </el-container>
</template>

<script>
export default {
  name: "Window",
  created() {
    // this.dialogJudge ? this.optenDialog() : this.closeDialog();
  },
  props: {
    titlex: String
    // id: [String, Number]
  },
  data() {
    return {
      title: this.titlex,
      selectElement: "",
      id: "moveableBox",
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
      styleArr: ["singlemove", "rotatemove"]
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
    dialogData: {
      get: function() {
        return this.$store.state.dialogData;
      },
      set: function(newVal) {
        this.$store.commit("newDialogData", newVal);
      }
    }
  },
  methods: {
    closeDialog(e) {
      this.dialogVisible = false;
      // alert(this.dialogVisible)
      this.$store.commit("newDialogVisible", false);
    },

    // optenDialog(e) {
    //   this.dialogVisible = true;
    //   // alert(this.dialogVisible)
    //   this.$store.commit("newDialogVisible", true);
    // },
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
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.selectElement = document.getElementById(this.id);
      this.selectElement.style.left = "35%";
      this.selectElement.style.top = "20%";
      debugger;
      if (this.selectElement.classList.length > 1) {
        this.selectElement.classList.remove;
      }
      this.selectElement.classList.add(
        this.styleArr[parseInt(Math.random() * 10) % this.styleArr.length]
      );
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  position: absolute;
  // height: 500px;
  // width: 500px;
  height: 0;
  width: 0;
  border: 1px;
  z-index: 14;
  top: 20%;
  left: 35%;
  border-radius: 2px;

  // transition: all 0.4s ease-in-out;
  visibility: 0;
  opacity: 0;
  transform: rotate(0.5turn);
  -webkit-transition: all 0.4s ease-in-out, left 0s, top 0s;
  -moz-transition: all 0.4s ease-in-out, left 0s, top 0s;
  -ms-transition: all 0.4s ease-in-out, left 0s, top 0s;
  -o-transition: all 0.4s ease-in-out, left 0s, top 0s;
  transition: all 0.4s ease-in-out, left 0s, top 0s;
}
.singlemove {
  -webkit-transition: width 0.4s ease-out, height 0.4s ease-out,
    opacity 0.2s ease-in, visibility 0.2s ease-in;
  -moz-transition: width 0.4s ease-out, height 0.4s ease-out,
    opacity 0.2s ease-in, visibility 0.2s ease-in;
  -ms-transition: width 0.4s ease-out, height 0.4s ease-out,
    opacity 0.2s ease-in, visibility 0.2s ease-in;
  -o-transition: width 0.4s ease-out, height 0.4s ease-out, opacity 0.2s ease-in,
    visibility 0.2s ease-in;
  transition: width 0.4s ease-out, height 0.4s ease-out, opacity 0.2s ease-in,
    visibility 0.2s ease-in;
}
.rotatemove {
}
.trans {
  opacity: 1;
  visibility: 1;
  height: 500px;
  width: 500px;
  transform: rotate(0);
}
.dialog-footer {
  text-align: right;
}

.el-main {
  background-color: white;
  font-size: 20px;
  color: #000;
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