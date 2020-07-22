<template>
  <el-container
    :class="(dialogVisible ? 'trans' : '')"
    v-bind:id="id"
    @mousedown.native="mousedown"
  >
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
      <button @mouseup="testClick($event)">dkjddjkj</button>
    </el-main>
    <el-footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <!-- <el-button type="primary" @click="closeDialog()">确 定</el-button> -->
      </span>
    </el-footer>
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
      dragable: false
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
    mousedown(event) {
      this.selectElement = document.getElementById(this.id);
      var div1 = this.selectElement;
      this.selectElement.style.cursor = "move";
      this.isDowm = true;
      var distanceX = event.clientX - this.selectElement.offsetLeft;
      var distanceY = event.clientY - this.selectElement.offsetTop;
      let moveX = 0,
        moveY = 0,
        that = this;
      document.onmousemove = function(ev) {
        var oevent = ev || event;
        div1.style.left = oevent.clientX - distanceX + "px";
        div1.style.top = oevent.clientY - distanceY + "px";
        moveX += oevent.movementX;
        moveY += oevent.movementY;
        // 这里的数据越小，越精确
        if (Math.abs(moveX) + Math.abs(moveY) > 5) {
          that.dragable = true;
        }
      };
      document.onmouseup = function() {
        that.dragable = false;
        document.onmousemove = null;
        document.onmouseup = null;
        div1.style.cursor = "default";
      };
    },
    testClick(e) {
      if (this.dragable) {
        this.dragable = !this.dragable;
        return;
      }
      alert("下钻");
    }
  },
  watch: {
    // dialogVisible: function(newValue) {}
  }
};
</script>

<style lang="less" scoped>
.el-container {
  position: absolute;
  // height: 500px;
  // width: 500px;
  height: 500px;
  width: 0;
  border: 1px;
  z-index: 10;
  top: 20%;
  left: 35%;
  border-radius: 2px;

  -webkit-transition: width 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
  -moz-transition: width 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
  -ms-transition: width 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
  -o-transition: width 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
  transition: width 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
  visibility: 0;
  opacity: 0;
}
.trans {
  opacity: 1;
  visibility: 1;
  height: 500px;
  width: 500px;
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