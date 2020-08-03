<template>
  <div class="cloud-span">
    <div class="span-box-top">
      <div v-for="(item ,index) in top" :key="index" class="top-box">
        <img :src="item.icon" alt />
        <span class="span-name">{{item.name}}</span>
      </div>
    </div>
    <div class="span-box">
      <div v-for="(item ,index) in bottom" :key="index" class="bottom-box">
        <img :src="item.icon" alt />
        <span class="span-name">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Caiwu from "@/assets/images/first/iconcaiwu@4x.png";
import Yingxiao from "@/assets/images/first/iconyingxiao@4x.png";
import Renzi from "@/assets/images/first/iconrenzi@4x.png";
import Gongcheng from "@/assets/images/first/icongongcheng@4x.png";
import Wuzi from "@/assets/images/first/iconwuzi@4x.png";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {},
  data() {
    return {
      top: [
        {
          name: "财务",
          icon: Caiwu
        },
        {
          name: "营销",
          icon: Yingxiao
        }
      ],
      bottom: [
        {
          name: "人资",
          icon: Renzi
        },
        {
          name: "工程",
          icon: Gongcheng
        },
        {
          name: "物资",
          icon: Wuzi
        }
      ]
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.span-name {
  display: block;
  margin-top: 80px;
  color: rgba(255, 255, 255, 1);
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 56px;
  line-height: 38.01px;
  letter-spacing: 0px;
}
.span-box-top {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  .top-box {
    width: 35%;
    text-align: center;
    &:last-child {
      position: relative;
      left: 50px;
    }
  }
}
.span-box {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .bottom-box {
    width: 30%;
    text-align: center;
  }
}
</style>
