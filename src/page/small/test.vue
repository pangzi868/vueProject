<template>
  <div>
    <!-- 轮播
   <vue-seamless-scroll :data="items" :class-option="optionHover" class="seamless-warp">
    <ul class="item">
      <li v-for="item in items" :key="item.title">
        <span class="title" v-text="item.title"></span>
        <span class="date" v-text="item.date"></span>
      </li>
    </ul>
    </vue-seamless-scroll>-->
    <!-- 3D效果 -->
    <!-- <ul class="grid">
    <li class="ot-letter-left">
      <span data-letter="C">C</span>
    </li>
    <li class="ot-letter-top">
      <span data-letter="J">J</span>
    </li>
    <li class="ot-letter-right">
      <span data-letter="8">8</span>
    </li>
    <li class="ot-letter-bottom">
      <span data-letter="A">A</span>
    </li>
    </ul>-->
    <!-- <button @click="toggleModal()">aaa</button> -->
    <move-modal id='111' titlex='1111' />
  </div>
</template>

<script>
import Vue from "vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import MoveModal from "@/components/moveModal.vue";
export default {
  components: {
    vueSeamlessScroll,
    "move-modal": MoveModal
  },
  computed: {
    optionHover() {
      return {
        hoverStop: true, // 鼠标悬停停止滚动
        direction: [0][(0, 1)], // 向下/上滚动
        step: 0.8, // 滚动速度
        singleHeight: 20, // 滚动单行
        waitTime: 1000 // 单行停顿时间
      };
    }
  },
  data() {
    return {
      modalJudge: false,
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
  },
  methods: {
    toggleModal() {
      this.modalJudge = !this.modalJudge;
    }
  }
};
</script>
 
<style lang="scss" scoped>
.seamless-warp {
  height: 229px;
  overflow: hidden;
}
.grid {
  font-size: 180px;
  margin-left: 200px;
}
.grid li span {
  display: inline-block;
  font-weight: 900;
  line-height: 1;
  position: relative;
  color: hsla(0, 0%, 0%, 0.6);
  transform-style: preserve-3d;
  perspective: 550px;
  z-index: 1;
}
.grid li span:before,
.grid li span:after {
  position: absolute;
  content: attr(data-letter);
  line-height: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  transition: all 0.3s;
}

.grid li span:before {
  text-shadow: none;
  color: hsla(0, 0%, 0%, 0.12);
}
.ot-letter-bottom span:before,
.ot-letter-bottom span:after {
  transform-origin: 0 50%;
}
.ot-letter-bottom span:before {
  transform: scale(1.08, 1) skew(0deg, 1deg);
}

.ot-letter-bottom span:after {
  text-shadow: -1px 0px 0px hsla(360, 100%, 100%, 0.1),
    3px 0px 1px hsla(0, 0%, 0%, 0.4);
  transform: rotateY(-15deg);
}
.ot-letter-bottom {
  background: #e74d3c;
}

.ot-letter-bottom span {
  text-shadow: 1px 4px 6px #e74d3c, 0 0 0 hsla(0, 0%, 0%, 0.3),
    1px 4px 6px #e74d3c;
}

.ot-letter-bottom span:after {
  color: #e74d3c;
}

.ot-letter-bottom:hover span:after {
  color: #ea6253;
}
.ot-letter-bottom span:before,
.ot-letter-bottom span:after {
  transform-origin: 50% 0;
}

.ot-letter-bottom span:before {
  transform: scale(1, 1.05) skew(4deg, 0deg);
}

.ot-letter-bottom span:after {
  text-shadow: 0px -1px 0px hsla(360, 100%, 100%, 0.1),
    0px 3px 1px hsla(0, 0%, 0%, 0.4);
  transform: rotateX(15deg);
}

.ot-letter-bottom:hover span:before {
  transform: translateY(-0.035em) scale(1, 1.2) skew(10deg, 0deg);
}

.ot-letter-bottom:hover span:after {
  transform: translateY(0.045em) rotateX(40deg);
}
</style>
