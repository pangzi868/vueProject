<template>
  <vue-seamless-scroll :data="items" :class-option="optionHover" class="seamless-warp">
    <ul class="item">
      <li v-for="item in items" :key="item.title">
        <span class="title" v-text="item.title"></span>
        <span class="date" v-text="item.date"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>
import Vue from "vue";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    vueSeamlessScroll
  },
  computed: {
    optionHover() {
      return {
        hoverStop: true, // 鼠标悬停停止滚动
        direction: [0][0,1], // 向下/上滚动
        step: 0.8, // 滚动速度
        singleHeight: 20, // 滚动单行
        waitTime: 1000 // 单行停顿时间
      };
    }
  },
  data() {
    return {
      items: [
        {
          title: "无缝滚动第一行无缝滚动第一行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第二行无缝滚动第二行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第三行无缝滚动第三行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第四行无缝滚动第四行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第五行无缝滚动第五行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第六行无缝滚动第六行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第七行无缝滚动第七行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第八行无缝滚动第八行",
          date: "2017-12-16"
        },
        {
          title: "无缝滚动第九行无缝滚动第九行",
          date: "2017-12-16"
        }
      ]
    };
  }
};
</script>
 
<style lang="scss" scoped>
.seamless-warp {
  height: 229px;
  overflow: hidden;
}
</style>
