<template>
  <div
    class="img-rotation-div"
    id="imgRotation"
    @mousedown="down($event)"
    @touchstart="down($event)"
    @mousemove="move($event)"
    @touchmove="move($event)"
    @mouseup="end($event)"
    @touchend="end($event)"
  >
    <img
      v-for="(item, index) in productGrp"
      :key="index"
      :src="(item.type === 'normal' ? TestPic: '')"
      alt
      class="pro-img"
      :style="item.style"
    />
  </div>
</template>

<script>
import Test from "@/assets/images/test.png";
import testVue from "../../page/small/test.vue";
export default {
  name: "",
  props: ["autoMove"],
  mounted() {
    this.initArc();
  },
  data() {
    return {
      productGrp: [
        { name: "长春", type: "normal", style: {} },
        { name: "吉林", type: "normal", style: {} },
        { name: "四平", type: "normal", style: {} },
        { name: "辽原", type: "normal", style: {} },
        { name: "通化", type: "normal", style: {} },
        { name: "白山", type: "normal", style: {} },
        { name: "松原", type: "normal", style: {} },
        { name: "白城", type: "normal", style: {} },
        { name: "延边", type: "normal", style: {} },
        { name: "直属", type: "normal", style: {} }
      ],
      TestPic: Test,
      setAnimate: null,
      speed: 0,
      fun_animat: undefined,
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
      }
    };
  },
  computed: {},
  methods: {
    initArc() {
      let container = document.getElementById("imgRotation");
      let imgDiv = container.getElementsByTagName("img");
      //中心点横坐标
      let dotLeft = container.clientWidth / 2 - 100;
      //中心点纵坐标
      let dotTop = container.clientHeight / 2 - 100;
      //椭圆长边
      let a = 200;
      //椭圆短边
      let b = 90;
      //起始角度
      let stard = 0;

      //每一个BOX对应的角度;
      let avd = 360 / imgDiv.length;
      //每一个BOX对应的弧度;
      let ahd = (avd * Math.PI) / 180;
      //运动的速度
      let speed = 2;
      //图片的宽高
      let wid = imgDiv[0].clientWidth;
      let hei = imgDiv[0].clientHeight;
      //总的TOP值
      let totTop = dotTop + 100;

      //设置圆的中心点的位置
      //   $(".dot").css({ left: dotLeft, top: dotTop });

      let that = this;
      //运动函数
      this.fun_animat = function(speed) {
        // speed = speed < 360 ? speed : 2;
        //运运的速度
        // speed += 360;
        //运动距离，即运动的弧度数;
        let ainhd = (speed * Math.PI) / 180;

        //按速度来定位DIV元素
        that.productGrp.forEach(function(item, index) {
          let allpers = (Math.cos(ahd * index + ainhd) * b + dotTop) / totTop;
          let wpers = Math.max(0.1, allpers);
          let hpers = Math.max(0.1, allpers);
          item.style = {
            left: Math.sin(ahd * index + ainhd) * a + dotLeft + "px",
            top: Math.cos(ahd * index + ainhd) * b + dotTop + "px",
            zIndex: Math.ceil(allpers * 10),
            width: wpers * wid + "px",
            height: hpers * hei + "px",
            opacity: allpers
          };
        });
      };
      this.setAnimate = setInterval(
        (func, that) => {
          that.speed = that.speed <= 0 ? that.speed - 2 : 360;
          func(that.speed);
        },
        100,
        this.fun_animat,
        that
      );

      //定时调用运动函数
      // this.setAnimate = setInterval(fun_animat, 100);
      // fun_animat();
    },

    down(e) {
      if (this.autoMove) return;
      this.downDrag = true;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      this.dragObj.touchstartX = clientX;
      this.dragObj.touchstartY = clientY;
      // this.distanceX = clientX - this.selectElement.offsetLeft;
      // this.distanceY = clientY - this.selectElement.offsetTop;
    },
    move(e) {
      if (this.autoMove) return;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      // this.selectElement.style.left = clientX - this.distanceX + "px";
      // this.selectElement.style.top = clientY - this.distanceY + "px";
      this.dragObj.moveX += e.movementX;
      this.dragObj.moveY += e.movementY;
      if (!mouseType) {
        this.dragObj.moveX = clientX - this.dragObj.touchstartX;
        this.dragObj.moveY = clientY - this.dragObj.touchstartY;
      }
      this.speed =
        this.speed <= 360
          ? this.speed + this.dragObj.moveX / 100
          : this.dragObj.moveX / 100;
      this.fun_animat(this.speed);

      // 这里的数据越小，越精确
      if (Math.abs(this.dragObj.moveX) + Math.abs(this.dragObj.moveY) > 5) {
        this.dragging = true;
      }
    },
    end(e) {
      return;
      if (this.autoMove) return;
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

    animateInt() {
      let that = this;
      this.setAnimate = setInterval(
        (func, that) => {
          that.speed = that.speed <= 360 ? that.speed + 2 : 2;
          func(that.speed);
        },
        100,
        this.fun_animat,
        that
      );
    },
    clearAnimateInt() {
      clearInterval(this.setAnimate);
    }
  },
  components: {},
  watch: {
    autoMove: function(newVal) {
      if (newVal) {
        this.animateInt();
      } else {
        clearInterval(this.setAnimate);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.setAnimate);
    this.setAnimate = null;
  }
};
</script>

<style lang="less" scoped>
.img-rotation-div {
  .pro-img {
    position: absolute;
    width: 65px;
    height: 100px;
    cursor: pointer;
  }
}
</style>
