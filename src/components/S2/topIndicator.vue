<template>
  <div class="top-indicator" :id="ids">
    <div
      :class="'single-indicator ' + (index === 0 ? 'first-ind' : '')"
      v-for="(item, index) in theme"
      :key="index"
      @click="checkout(item.name)"
    >
      <div class="img-left" />
      <img :src="item.imgUrl" alt class="img-span" />
      <div class="img-right" />
      <div class="indicator-right">
        <span v-html="item.name" class="single-name"></span>
        <span v-html="item.desc" class="single-desc"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Scene from "@/assets/images/second/Frame-34@4x.png";
import Response from "@/assets/images/second/Frame-35@4x.png";
import Middle from "@/assets/images/second/Frame-36@4x.png";
import Check from "@/assets/images/second/Frame-37@4x.png";
import Power from "@/assets/images/second/Frame-38@4x.png";
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    // this.initColumnChart(this.ids, this.chartData);
  },
  data() {
    return {
      theme: [
        {
          name: "供电答复方案",
          imgUrl: Scene,
          desc: "单≤9  双≤17"
        },
        {
          name: "设计审查",
          imgUrl: Response,
          desc: "≤3"
        },
        {
          name: "中间检查",
          imgUrl: Middle,
          desc: "≤3"
        },
        {
          name: "竣工验收",
          imgUrl: Check,
          desc: "≤3"
        },
        {
          name: "装表送电",
          imgUrl: Power,
          desc: "≤6"
        }
      ]
    };
  },
  computed: {
    topIndex: {
      get: function() {
        return this.$store.state.topIndex;
      },
      set: function(val) {
        this.$store.commit("newTopIndex", val);
      }
    }
  },
  methods: {
    initColumnChart(id, data) {
      //   let myCharts = this.$echarts.init(document.getElementById(id));
      //   myCharts.setOption({});
    },
    checkout(name) {
      if (this.topIndex === name) return;
      this.topIndex = name;
    }
  },
  components: {},
  watch: {
    chartData: function(newVal) {
      //   this.initColumnChart(this.ids, this.chartData);
    }
  }
};
</script>

<style lang="less" scoped>
.top-indicator {
  position: absolute;
  display: flex;
  top: 160px;
  left: 0;
  width: 100%;
  height: 266px;
  padding: 52px 50px;
  .single-indicator {
    display: flex;
    width: 20%;
    height: 100%;
    padding: 0 40px 0 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .img-left {
      display: inline-block;
      width: 32px;
      height: 100%;
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-right: 0px;
    }
    .img-right {
      display: inline-block;
      width: 32px;
      height: 100%;
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-left: 0px;
      margin-right: 32px;
    }
    .img-span {
      display: inline-block;
      height: 50%;
    }
    .indicator-right {
      display: inline-block;
      height: 100%;
      color: rgba(255, 255, 255, 1);
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 56px;
      line-height: 104px;
      letter-spacing: 0px;
      text-align: left;
      .single-name {
        line-height: 74px;
        vertical-align: top;
      }
      .single-desc {
        line-height: 74px;
        vertical-align: top;
        color: #00ffff;
      }
    }
  }

  .first-ind {
    width: 23%;
  }
}
</style>
