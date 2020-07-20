<template>
  <div class="num-group" :style="styleData" :id="chartId">
    <!-- <div class="echarts w100 axis"></div> -->
    <!-- <div
      class="single-num"
      v-for="(item, index) in indicatorData"
      :key="index"
      :id="index"
      :style="styleSingle"
      :ref="chartId + index"
      :class="{anim:animate==true}"
    >{{item}}</div>-->

    <div
      class="single-num"
      v-for="(item, index) in indicatorData"
      :key="index"
      :id="index"
      :style="styleSingle"
    >
      <span
        v-for="(items, indexs) in item"
        :key="indexs"
        :ref="chartId + index"
        class="singleSpan"
        :class="{ anim: animate == true }"
        >{{ items }}</span
      >
    </div>

    <!-- <div class="nwwest-roll" id="nwwest-roll">
      <ul id="roll-ul" class="roll-ul">
        <li v-for="item in list" ref="rollul" :class="{anim:animate==true}">
          <span class="name">{{item}}</span>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "axis",
  props: [
    "chartData",
    "styleData",
    "styleSingle",
    "type",
    "chartId",
    "marginTop",
  ],
  created() {
    this.getData(this.chartData, this.chartId, this.type, this.$refs);
  },
  mounted() {
    // let that = this; //模拟数字增长(也可以是数据库定时查的或ws中接收的)
    // setInterval(function() {
    //   that.num = ++that.num; //数字变化后调用滚动事件
    //   that.scroll(that.num, this.$refs);
    // }, 3000);
  },
  data() {
    return {
      animate: true,
      list: [0, 0],
      num: 0,
      todos: [],
      echartState: {}, // 标识 图表是否已经下钻
      // 存放上一次数据
      preData: [],
      indicatorData: [],
    };
  },
  methods: {
    getData(chartData, chartId, type, refs) {
      if (chartData !== undefined) {
        if (type === "person") {
          this.indicatorData = [...chartData.toString().split("")];
        } else {
          this.indicatorData = [
            ...["¥"].concat(chartData.toString().split("")),
          ];
        }

        this.indicatorData = this.indicatorData.map((item) => {
          return [item, item];
        });
        this.indicatorData.forEach((item, index) => {
          if (item[0] !== "¥" || refs === undefined) {
            if (this.preData[index] && item[0] !== this.preData[index][0]) {
              this.scrollNum(item[0], index, chartId, refs);
            }
          }
        });
        this.preData = [...this.indicatorData];
      }
      this.indicatorData.forEach((item, index) => {
        if (item[0] === ".") {
          this.indicatorData = this.indicatorData.slice(0, index);
        }
      });
    },
    scroll(num, refs) {
      let con1 = refs.rollul;
      con1[0].style.marginTop = "-30px";
      this.animate = !this.animate;

      var that = this;
      setTimeout(function() {
        that.list = [num, num];
        con1[0].style.marginTop = "0px";
        that.animate = !that.animate;
      }, 10);
    },

    scrollNum(num, index, chartId, refs) {
      if (Object.keys(refs).length === 0) return;
      let refId = chartId + index;
      let con1 = refs[refId];
      if (con1 === undefined) return;
      con1[0].style.marginTop = this.marginTop || "-120px";
      this.animate = !this.animate;

      var that = this;
      setTimeout(function() {
        // that.list = [num, num];
        // that.list = [num, num];
        con1[0].style.marginTop = "0px";
        that.animate = !this.animate;
      }, 10);
    },
  },
  watch: {
    chartData: function(newVal) {
      this.getData(newVal, this.chartId, this.type, this.$refs);
    },
  },
};
</script>

<style lang="less">
@font-face {
  font-family: "UnidreamLED";
  src: url(./font/UnidreamLED.eot); /***兼容ie9***/
  src: url(./font/UnidreamLED.eot?#iefix) format("embedded-opentype"),
    /***兼容ie6-ie8***/ url("./font/UnidreamLED.woff") format("woff"),
    local("UnidreamLED"), url("./font/UnidreamLED.woff"); /***默认使用本地的***/
}
.num-group {
  min-width: 50%;
  height: 26px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 2%;
  overflow: hidden;
  .single-num {
    font-family: "UnidreamLED";
    margin-left: 1%;
    width: 2%;
    height: 100%;
    line-height: 100%;
    overflow: hidden;
    // background: url("../../assets/images/text-no-white.png") no-repeat;
    // background: url("../../assets/images/text-bg.png") no-repeat;
    // background-size: 100% 100%;
    text-align: center;
    &:first-child {
      margin-left: 0px;
    }
    .singleSpan {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .nwwest-roll {
    height: 40px;
    overflow: hidden;
  }

  .roll-ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nwwest-roll li {
    height: 35px;
    line-height: 35px;
  }

  .anim {
    transition: all 1s;
  }
}
</style>
