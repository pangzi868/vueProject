<template>
  <div class="server-money">
    <div class="total-money">
      <span>累计服务金额</span>
      <!-- <indicator-chart :chartData="totalMoney" :styleData="styleObj" :styleSingle="singleStyle" /> -->
      <indicator-chart
        v-if="totalMoney"
        :chartData="totalMoney"
        :styleData="styleObj"
        marginTop="-120px"
        :styleSingle="singleStyle"
        chartId="total-server-money"
      />
    </div>
    <!-- <div class="current-money">
      <span>当日小微信贷服务金额</span>
      <span class="current-money-span">
        ¥ {{currentMoney}}
        <scroll-span
          :number="'¥' + thousandFormat(dailyMoney, 0)"
          class="daily-money-span"
          ids="daily"
        />
      </span>
    </div>-->
  </div>
</template>

<script>
import IndicatorChart from "../../components/first-screen/indicator.vue";
import ScrollSpan from "../../components/scrollSpan.vue";
export default {
  name: "",
  props: [],
  mounted() {
    this.rollTimelyData();
  },
  data() {
    return {
      coinInterval: undefined,
      totalMoney: "",
      dailyMoney: "",
      currentMoney: "19,289,386,378.97",
      styleObj: {
        height: "45%",
        fontSize: "64px"
      },
      singleStyle: {
        width: "5%",
        marginLeft: "1%",
        lineHeight: "150%"
      }
    };
  },
  computed: {},
  methods: {
    // 格式化千分位
    thousandFormat(value, fixed) {
      fixed = fixed !== undefined ? fixed : 2;
      if (value === null || value === undefined || isNaN(parseFloat(value))) {
        return;
      }
      // 将数字进行千分位格式化
      function toThousands(num) {
        num = (num || 0).toString();
        var parts = num.split(".");
        var bigZeroPart = parts[0];
        var result = "";
        while (bigZeroPart.length > 3) {
          result = "," + bigZeroPart.slice(-3) + result;
          bigZeroPart = bigZeroPart.slice(0, bigZeroPart.length - 3);
        }
        if (bigZeroPart) {
          result = bigZeroPart + result;
        }
        if (parts.length > 1) {
          result += "." + parts[1].toString();
        }
        return result;
      }

      value = parseFloat(value).toFixed(fixed);
      value = toThousands(value);
      return value;
    },
    rollTimelyData() {
      this.getTotalMoney();
      this.getDailyMoney();
      var _that = this;
      var index = 0;
      // clearInterval(this.coinInterval);
      this.coinInterval = setInterval(
        () => {
          this.getTotalMoney();
          this.getDailyMoney();
        },
        3000,
        _that,
        index
      );
    },

    // getTotalMoney() {
    //   let that = this;
    //   this.axios({
    //     url: "/api/p2/accServiceAmount",
    //     method: "get",
    //     data: "",
    //     type: "json"
    //   }).then(data => {
    //     if (data.data.code === 100) {
    //       var tData = data.data.data;
    //       that.totalMoney = that.thousandFormat(tData, 0);
    //     }
    //   });
    // },
    getTotalMoney() {
      let that = this;
      this.axios({
        url: "/api/p2/xwBaseinfo",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          that.totalMoney = that.thousandFormat(tData.principal || 0, 0);
        }
      });
    },
    getDailyMoney() {
      let that = this;
      this.axios({
        url: "/api/p2/accDayServiceAmount",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tData = data.data.data;
          that.dailyMoney = that.thousandFormat(tData, 2);
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.coinInterval);
  },
  components: {
    "indicator-chart": IndicatorChart,
    "scroll-span": ScrollSpan
  }
};
</script>

<style lang="less" scoped>
.server-money {
  padding: 2.74%;
}
.total-money {
  height: 100%;
  font-weight: bold;
}
.current-money {
  height: 40%;
  width: 100%;
  .daily-money-span {
    display: block;
    font-size: 64px;
    letter-spacing: 16px;
    font-weight: bold;
    height: 48%;
    margin-top: 2%;
  }
}
</style>
