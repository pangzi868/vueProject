<template>
  <div
    class="real-time-strategy"
    id="realTimeStrategy"
    :class="float === 'right' ? 'margin' : ''"
  >
    <div class="title">{{ title }}</div>
    <div class="num">
      {{ numArr }}
      <!-- <ul>
        <li v-for="(item, index) in numArr" :key="index">{{ item || "" }}</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import IndicatorChart from "../first-screen/indicator.vue";
export default {
  props: ["title", "num", "blank", "float"],
  data() {
    return {
      styleObj: {
        height: "45%",
        fontSize: "64px",
      },
      singleStyle: {
        width: "5%",
        marginLeft: "1%",
        lineHeight: "150%",
      },
    };
  },
  computed: {
    numArr: function() {
      if (this.num) {
        var arr = String(this.formatMoney(this.num)).split("");
        for (var i = 0; i < this.blank; i++) {
          arr.unshift("");
        }

        return arr.join("");
      }
      return [];
    },
  },
  methods: {
    formatMoney(num, bool = false) {
      if (!num && num !== 0) return 0;
      if (num == 0) return 0;
      num = parseFloat(num);
      // 如果是金额统一保留两位小数，bool为false，不是金额，整数不保留两位
      if (bool) {
        return num
          ? (num.toFixed(2) + "").replace(
              /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
              "$&,"
            )
          : "0";
      } else {
        const reg = /.*\..*/;
        if (reg.test(num)) {
          return num
            ? (num.toFixed(2) + "").replace(
                /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
                "$&,"
              )
            : "0";
        } else {
          return num
            ? (num + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
            : "0";
        }
      }
    },
  },
  components: {
    "indicator-chart": IndicatorChart,
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "UnidreamLED";
  src: url(../first-screen/font/UnidreamLED.eot); /***兼容ie9***/
  src: url(../first-screen/font/UnidreamLED.eot?#iefix)
      format("embedded-opentype"),
    /***兼容ie6-ie8***/ url("../first-screen/font/UnidreamLED.woff")
      format("woff"),
    local("UnidreamLED"), url("../first-screen/font/UnidreamLED.woff"); /***默认使用本地的***/
}
.real-time-strategy {
  .title {
    text-align: center;
    font-size: 32px;
    margin: 38px 48px 32px 48px;
    display: block;
    color: #ffffff;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 32px;
    line-height: normal;
    letter-spacing: 0px;
  }
  ul {
    display: flex;
    list-style: none;
    li {
      width: 72px;
      height: 140px;
      line-height: 140px;
      text-align: center;
      font-size: 64px;
      margin-right: 10px;
      font-family: "UnidreamLED";
      // background: url("../../assets/images/num-bg.png") no-repeat;
      // background-size: 100% 100%;
    }
  }
}
.num {
  color: #ffffff;
  font-family: DS-Digital;
  line-height: 72px;
  // font-family: UnidreamLED;
  font-size: 64px;
  line-height: normal;
  letter-spacing: 0px;
  padding: 0 48px 0 48px;
  text-align: center;
  letter-spacing: 20px;
  font-weight: 700;
}
.margin {
  margin-left: 100px;
}
@font-face {
  font-family: "DS-Digital";
  src: url(../font/DS-DIGI-1.ttf); /***兼容ie9***/
}
</style>
