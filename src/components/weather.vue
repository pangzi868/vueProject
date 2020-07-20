<template>
  <div class="weather-module">
    <!-- <img :src="currentImg" alt class="weather-img" /> -->
    <!-- <span class="weather-span">{{currentWeather.high}} ℃ ~ {{currentWeather.low}} ℃</span> -->
    <span class="time-span">{{currentTime.date}}</span>
    <span class="time-span">{{currentTime.time}}</span>
  </div>
</template>

<script>
import Yin from "../assets/images/yin.png";
import Yu from "../assets/images/yu.png";

export default {
  name: "",
  props: [],
  mounted() {
    this.getTime();
  },
  data() {
    return {
      // 天气
      localweather: [
        { high: "26", low: "24" },
        { high: "30", low: "25" },
        { high: "31", low: "25" },
        { high: "31", low: "26" },
        { high: "27", low: "25" },

        { high: "32", low: "27" },
        { high: "33", low: "28" }
      ],
      weatherImg: [Yu, Yu, Yu, Yu, Yu, Yin, Yin],

      currentWeather: {},
      currentImg: "",

      // 时间
      currentTime: {},
      currentDate: undefined,
      timeInterval: undefined
    };
  },
  computed: {},
  methods: {
    // 获取右上角当前时间
    getTime() {
      // if (timeInterval) clearInterval(timeInterval);
      this.timeInterval = setInterval(this.nowTime, 1000);
    },

    nowTime() {
      var myDate = new Date();
      var y = myDate.getFullYear();
      var M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var d = myDate.getDate(); //获取当前日(1-31)
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var m = myDate.getMinutes(); //获取当前分钟数(0-59)
      var s = myDate.getSeconds(); //获取当前秒数(0-59)

      //检查是否小于10
      M = this.check(M);
      d = this.check(d);
      h = this.check(h);
      m = this.check(m);
      s = this.check(s);
      var dateStr = y + "/" + M + "/" + d;
      var timeStr = h + ":" + m + ":" + s;
      this.currentTime = Object.assign({}, { date: dateStr, time: timeStr });
      // 获取当前天气
      this.getCurrentWeather(myDate.getDate());
      // document.getElementById("nowtime").innerHTML = "当前时间：" + timestr;
    },

    //时间数字小于10，则在之前加个“0”补位。
    check(i) {
      var num = i < 10 ? "0" + i : i;
      return num;
    },

    // 写死天气
    getCurrentWeather(d) {
      if (this.currentDate === d) {
        return;
      }
      var index = 0;
      if (d > 12) {
        this.currentWeather = this.localweather[index];
        this.currentImg = this.weatherImg[index];
      } else {
        this.currentWeather = this.localweather[d - 6];
        this.currentImg = this.weatherImg[d - 6];
      }
    },

    // 获取当前天气
    getWeather() {
      var _this = this;
      this.axios
        .get(
          "https://tianqiapi.com/api?version=v6&appid=71549884&appsecret=XH6bWw5A"
        )
        .then(function(response) {
          //   _this.localweather = response.data;
          //   _this.weatherImg =
          //     "http://tq.daodaoim.com//tianqiapi/skin/pitaya/" +
          //     response.data.wea_img +
          //     ".png";
        })
        .catch(() => {});

      // this.axios({
      //   url: "https://www.tianqiapi.com/api/?version=v1&cityid=101280601",
      //   method: "get",
      //   data: {
      //     results: 10
      //   },
      //   type: "json"
      // })
      //   .then(res => {
      //     // let datas = res.data.data[0];//下标为0即表示当天天气数据
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  components: {}
};
</script>

<style lang="less">
@font-face {
  font-family: "DS-Digital";
  src: url(./font/DS-DIGIB-2.ttf); /***兼容ie9***/
}
.weather-img {
  margin-right: 1%;
  width: 3%;
}
.weather-span {
  color: rgba(255, 255, 255, 0.6);
}
.time-span {
  display: inline-block;
  margin-left: 5%;
  opacity: 0.800000011920929;
  color: #FFFFFF;
  font-family: 'DS-Digital';
  font-weight: bold;
  font-size: 34px;
  line-height: normal;
  letter-spacing: 2px;
  // text-align: center;
}
.weather-span {
  opacity: 0.6399999856948853;
  color: #FFFFFF;
  font-family: PingFang SC;
  font-weight: semibold;
  font-size: 32px;
  line-height: normal;
  letter-spacing: 0px;
  text-align: center;
}
.weather-module {
  margin-top: 1%;
  font-family: "DS-Digital";
  margin-right: 20px;
}
</style>
