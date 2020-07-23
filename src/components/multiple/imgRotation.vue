<template>
  <div class="img-rotation-div" id="imgRotation">
    <img
      v-for="(item, index) in productGrp"
      :key="index"
      :src="(item.type === 'normal' ? TestPic: '')"
      alt
      class="pro-img"
      :style="item.style"
      @click="clickImg(item.name)"
    />
  </div>
</template>

<script>
import Test from "@/assets/images/test.png";
import testVue from "../../page/small/test.vue";
export default {
  name: "",
  props: [],
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
      setAnimate: null
    };
  },
  computed: {},
  methods: {
    initArc() {
      let container = document.getElementById("imgRotation");
      let imgDiv = container.getElementsByTagName("img");
      //中心点横坐标
      var dotLeft = container.clientWidth / 2 - 100;
      //中心点纵坐标
      var dotTop = container.clientHeight / 2 - 100;
      //椭圆长边
      var a = 260;
      //椭圆短边
      var b = 120;
      //起始角度
      var stard = 0;

      //每一个BOX对应的角度;
      var avd = 360 / imgDiv.length;
      //每一个BOX对应的弧度;
      var ahd = (avd * Math.PI) / 180;
      //运动的速度
      var speed = 2;
      //图片的宽高
      var wid = imgDiv[0].clientWidth;
      var hei = imgDiv[0].clientHeight;
      //总的TOP值
      var totTop = dotTop + 100;

      //设置圆的中心点的位置
      //   $(".dot").css({ left: dotLeft, top: dotTop });

      let that = this;
      //运动函数
      var fun_animat = function() {
        speed = speed < 360 ? speed : 2;

        //运运的速度
        speed += 2;
        //运动距离，即运动的弧度数;
        var ainhd = (speed * Math.PI) / 180;

        //按速度来定位DIV元素
        that.productGrp.forEach(function(item, index) {
          var allpers = (Math.cos(ahd * index + ainhd) * b + dotTop) / totTop;
          var wpers = Math.max(0.1, allpers);
          var hpers = Math.max(0.1, allpers);
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

      //定时调用运动函数
      this.setAnimate = setInterval(fun_animat, 100);
    }
  },
  components: {},
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
