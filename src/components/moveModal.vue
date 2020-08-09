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
      <!-- <slot></slot> -->
      <!-- <button @mouseup="testClick($event)" @touchend.prevent="testClick($event)">dkjddjkj</button> -->
      <el-table
        :data="currentData"
        height="100%"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        header-row-class-name="header-row"
        :header-cell-style="rowClass"
      >
        <el-table-column prop="number" label="序号" width="300"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="1500"></el-table-column>
        <el-table-column prop="type" label="项目类型" width="600"></el-table-column>
        <el-table-column prop="status" label="项目状态" width="300"></el-table-column>
        <el-table-column prop="part" label="实施单位" width="300"></el-table-column>
        <el-table-column prop="date" label="实施时间"></el-table-column>
      </el-table>
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
    this.initColumn(this.dialogData, this.currentPro, this.leftSecAux);
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
      styleArr: ["singlemove", "rotatemove"],
      currentData: []
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
    },
    // 切换部门
    currentPro: {
      get: function() {
        return this.$store.state.currentPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurrentPro", newVal);
      }
    },
    leftSecAux: {
      get: function() {
        return this.$store.state.leftSecAux;
      },
      set: function(newVal) {
        this.$store.commit("newLeftSecAux", newVal);
      }
    }
  },
  methods: {
    // 初始化数据
    initColumn(type, pro, leftSecAux) {
      if (!leftSecAux || leftSecAux == undefined || leftSecAux.x == undefined)
        return;
      let temp = [];
      let tempAux = leftSecAux.x;
      let tempIndex = 1;
      leftSecAux.x[0].data.forEach((item, index) => {
        if (tempAux[3].data[index] === type && tempAux[4].data[index] === pro) {
          let tempItem = {
            number: tempIndex,
            // number: tempAux[0].data[index],
            name: tempAux[1].data[index],
            type: tempAux[2].data[index],
            status: tempAux[3].data[index],
            part: tempAux[4].data[index],
            date: tempAux[5].data[index]
          };
          temp.push(tempItem);
          tempIndex++;
        } else if (pro === "全省" && tempAux[3].data[index] === type) {
          let tempItem = {
            number: tempIndex,
            // number: tempAux[0].data[index],
            name: tempAux[1].data[index],
            type: tempAux[2].data[index],
            status: tempAux[3].data[index],
            part: tempAux[4].data[index],
            date: tempAux[5].data[index]
          };
          temp.push(tempItem);
          tempIndex++;
        }
      });
      this.currentData = [...temp];
    },

    closeDialog(e) {
      this.dialogVisible = false;
      // alert(this.dialogVisible)
      this.$store.commit("newDialogVisible", false);
    },
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 2) % 2 === 1) {
        return "even-row";
      } else if ((rowIndex + 2) % 2 === 0) {
        return "odd-row";
      }
      return "";
    },
    rowClass() {
      return "background: rgba(0,0,0,0);color: rgba(255, 255, 255, 0.8);font-weight: 600";
    },
    tableHeaderRowClassName() {
      return "header-row";
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
      this.selectElement.style.left = "24%";
      this.selectElement.style.top = "20%";
      if (this.selectElement.classList.length > 1) {
        this.selectElement.classList.remove;
      }
      this.selectElement.classList.add(
        this.styleArr[parseInt(Math.random() * 10) % this.styleArr.length]
      );
    },
    currentPro: function(newVal) {
      this.initColumn(this.dialogData, newVal, this.leftSecAux);
    },
    dialogData: function(newVal) {
      this.initColumn(newVal, this.currentPro, this.leftSecAux);
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
  z-index: 20;
  top: 20%;
  left: 24%;
  border-radius: 2px;

  // transition: all 0.4s ease-in-out;
  visibility: 0;
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
.singlemove {
  -webkit-transition: width 0.8s ease-out, height 0.8s ease-out,
    opacity 0.4s ease-in, visibility 0.4s ease-in;
  -moz-transition: width 0.8s ease-out, height 0.8s ease-out,
    opacity 0.4s ease-in, visibility 0.4s ease-in;
  -ms-transition: width 0.8s ease-out, height 0.8s ease-out,
    opacity 0.4s ease-in, visibility 0.4s ease-in;
  -o-transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
    visibility 0.4s ease-in;
  transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
    visibility 0.4s ease-in;
}
.trans {
  opacity: 1;
  visibility: 1;
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
</style>