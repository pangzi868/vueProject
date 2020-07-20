<template>
  <!-- p4 -->
  <div class="brain-content" @keyup.enter="keyEnter">
    <div class="brain-main">
      <div id="ChinaMap" v-if="showAudio"></div>
      <div class="light-spot">
        <!-- <canvas ></canvas> -->
        <img
          id="audio-art"
          :src="require('../../assets/images/voice-view.png')"
          alt
        />
      </div>
      <div class="chat-box demo" id="list-demo">
        <div id="dialogue-box">
          <!-- <vue-seamless-scroll :data="scrollList" :class-option="optionHover" class="seamless-warp"> -->
          <div v-if="showDialogue">
            <div
              :class="index % 2 === 0 ? 'server ' + index : 'user ' + index"
              v-for="(item, index) in scrollList"
              :key="Math.random() + index"
              class="list-complete-item"
            >
              <span class="title" v-if="index % 2 === 0"></span>
              <span v-if="index % 2 === 0">{{ item.value }}</span>

              <span v-if="index % 2 !== 0">{{ item.value }}</span>
              <span class="title" v-if="index % 2 !== 0"></span>
            </div>
          </div>
          <!-- </vue-seamless-scroll> -->
        </div>
      </div>
    </div>
    <div class="brain-foot">
      <audio
        id="audio"
        ref="audio"
        :src="require('../../assets/video/chongqing.wav')"
      ></audio>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import a from "../../assets/images/brain-a.png";
import b from "../../assets/images/brain-b.png";
import c from "../../assets/images/brain-c.png";
import d from "../../assets/images/brain-d.png";
import e from "../../assets/images/brain-e.png";
import f from "../../assets/images/brain-f.png";
import g from "../../assets/images/brain-g.png";
import RiskPortraitChart from "@/components/p4/line-toRight.vue";
import * as baseBox from "@/assets/base64.js";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "tableAuto",
  props: ["tableDatas", "ids", "heights", "bigPoint"],
  data() {
    return {
      tableData: [],
      id: this.ids,
      height: this.heights,
      lineData: [],
      showAudio: true,
      animate: false,
      showDialogue: false,
      analyser: {},
      xy: "",
      robot: baseBox.robot.value,
      list: [
        {
          value: "您好，请问是王先生吗",
        },
      ],
      scrollList: [
        {
          value: "您好，请问是王先生吗",
        },
      ],
      msgList: [
        {
          value: "嗯，我是",
        },
        {
          value:
            "这里是百信银行的客服，我们看到您的贷款已经到期，金额是2500，您是忘了，还是什么情况",
        },
        {
          value: "嗯，我查一下，可能是忘了，前段时间没得钱",
        },
        {
          value: "您看今天六点前可以处理吗",
        },
        {
          value: "嗯，要的要的，可以，我晚上还",
        },
        {
          value:
            "我们会关注您的还款，如未收到款项，后续会有工作人员再次与您联系，感谢您的接听，再见 ",
        },
      ],
    };
  },
  components: {
    RiskPortraitChart,
    vueSeamlessScroll,
  },
  computed: {
    optionHover() {
      return {
        autoPlay: this.animate,
        hoverStop: false, // 鼠标悬停停止滚动
        direction: 1, // 向下/上滚动
        step: 0.8, // 滚动速度
        singleHeight: 130, // 滚动单行
        waitTime: 2800, // 单行停顿时间
      };
    },
  },
  mounted() {
    this.init();
    document.addEventListener("keydown", (event) => {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      let l = this._.split(window.location.href, "manage/P", 2),
        targetUrl = 0;
      if (e && e.keyCode == 13 && window.location.href.indexOf("P4") > 0) {
        if (!this.showAudio) {
          return;
        }
        this.showAudio = false;
        setTimeout(() => {
          this.showDialogue = true;
          document.getElementById("dialogue-box").style.display = "block";
          document.getElementById("audio-art").style.display = "block";
        }, 800);
        this.culTimeScroll();
        this.DrawVideo("audio-art");
      }
    });
  },
  watch: {
    bigPoint: function(a, b) {
      this.tableData = a;
      if (!this.showAudio) {
        return;
      }
      clearInterval(this.timera)
      this.drawMapCircle();
    },
    scrollList: function() {
      return this.scrollList;
    },
  },
  methods: {
    init() {
      this.drawMapCircle();
    },
    drawMapCircle() {
      let mapIndex = 0, currentPoint = {};
      this.drawMap(this.bigPoint[mapIndex])
      this.timera = setInterval( () => {
        mapIndex += 1;
        if(mapIndex > 5) {
          mapIndex = 0
        }
        currentPoint = this.bigPoint[mapIndex]
        this.drawMap(currentPoint)
      },3000)
    },
    drawMap(currentPoint) {
      
      let myChart = this.$echarts.init(document.getElementById("ChinaMap"));
      let mapName = "china",mapSymbolSize = {}
      let curruntArea =
        obj &&
        ((obj.province && obj.province.split("省")[0]) ||
          (obj.accent && obj.accent.split("省")[0]));
      var data = [
        { name: "北京", value: 34 },
        { name: "天津", value: 30 },
        { name: "河北", value: 10 },
        { name: "山西", value: 10 },
        { name: "内蒙古", value: 10 },
        { name: "辽宁", value: 10 },
        { name: "吉林", value: 16 },
        { name: "黑龙江", value: 12 },
        { name: "上海", value: 23 },
        { name: "江苏", value: 23 },
        { name: "浙江", value: 36 },
        { name: "安徽", value: 14 },
        { name: "福建", value: 32 },
        { name: "江西", value: 33 },
        { name: "山东", value: 23 },
        { name: "河南", value: 23 },
        { name: "湖北", value: 32 },
        { name: "湖南", value: 15 },
        { name: "重庆", value: 15 },
        { name: "四川", value: 14 },
        { name: "贵州", value: 14 },
        { name: "云南", value: 12 },
        { name: "西藏", value: 3 },
        { name: "陕西", value: 10 },
        { name: "甘肃", value: 30 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 20 },
        { name: "新疆", value: 10 },
        { name: "广东", value: 33 },
        { name: "香港", value: 34 },
        { name: "澳门", value: 32 },
        { name: "广西", value: 20 },
        { name: "海南", value: 23 },
        { name: "台湾", value: 12 },
      ];
      data.forEach((item) => {
        mapSymbolSize[item.name] = item.value
        if (item.name === curruntArea) {
          item.value = item.value + 150;
        } else {
          item.value = 0;
        }
      });
      let obj = this.bigPoint,seriesData = [],
      mapPopData = [{
        ...currentPoint,
        value: [currentPoint.longitude, currentPoint.latitude],
        symbolSize: 30
      }]
      obj.forEach( it => {;
        seriesData.push({
          ...it,
          value: [it.longitude, it.latitude],
          symbolSize: Math.random()*10 + 10
        })
      })
      var geoCoordMap = {};

      /*获取地图数据*/
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      var option = {
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          left: "10%",
          top: "bottom",
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#467bc0", "#467bc0"], // 蓝绿
          },
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              borderColor: "rgba(0,255,255, 1)",

              areaColor: "#023677",
            },
            emphasis: {
              areaColor: "#4499d0",
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: 0,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#fff",
              },
            },
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                borderColor: "#2cb3dd",
                borderWidth: 0.8,
                areaColor: "#031525",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 8,
            symbolSize: function (item,params) {
              return params.data.symbolSize
            },
            showEffectOn: "render",
            data: seriesData,
            itemStyle: {
              normal: {
                color: "#F5B523",
                shadowBlur: 2,
              },
            },
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            symbolSize: 32,
            data: mapPopData && mapPopData.length > 0
                ? mapPopData
                : [],
            itemStyle: {
              normal: {
                color: "#F5B523",
                shadowBlur: 2,
              },
            },
            // 标签
            label: {
              normal: {
                show: true,
                align: "left",
                formatter: function(params) {
                  const {
                    accent,
                    mobile,
                    product,
                    want,
                    status,
                    action,
                    province,
                    handle,
                    problem,
                  } = params.data;
                  let a = "";
                  if (accent) {
                    a = `{a|口音识别}{b|${accent}}{a|产品}{b|${product}}\n{a|客户意图}{b|${want}}\n{a|手机号码}{b|${mobile}}`;
                  } else {
                    a =
                      status === "正常"
                        ? `{a|行为}{b|${action}}{zc|${status}}\n{a|问题定位}{b|${problem ||
                            "--"}}\n{a|手机号码}{b|${mobile}}\n{a|省市}{b|${province}}`
                        : `{a|行为}{b|${action}}{yc|${status}}\n{a|问题定位}{b|${problem ||
                            "--"}}\n{a|手机号码}{b|${mobile}}\n{a|省市}{b|${province}}`;
                  }
                  return a;
                },
                position: [20, 20],
                distance: 0,
                width: 340,
                height: 170,
                backgroundColor: {
                  image: require("@/assets/images/map-modal.png"),
                },
                padding: [30, 50],
                lineHeight: 40,
                // verticalAlign: "middle",
                color: "#fff",
                z: 11,
                textStyle: {
                  fontSize: 20,
                },
                rich: {
                  a: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 20,
                    align: "left",
                    fontWeight: "bold",
                  },
                  b: {
                    padding: [0, 10],
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  c: {
                    align: "left",
                    fontSize: 16,
                  },
                  d: {
                    color: "#FF9431",
                    fontSize: 16,
                  },
                  zc: {
                    color: "#0088DC",
                    fontSize: 26,
                    padding: 4,
                    bold: "1px solid #0088DC",
                  },
                  yc: {
                    color: "#FF9431",
                    fontSize: 26,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "#FF9431",
                    borderRadius: 8,
                  },
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    DrawVideo(id) {
      this.$emit("func", { value: false });
      var atx = new (window.AudioContext || webkitAudioContext)();
      var audio = document.getElementById("audio");
      // let audio = new Audio();
      // audio.src = require("../../assets/video/chongqing.wav");
      // var canvas = document.getElementById(id);
      // var ctx = canvas.getContext("2d");

      audio.play();
      let audioTime = audio.duration;
      setTimeout(() => {
        this.$emit("func", { value: true });
        this.$nextTick(() => {
          this.showAudio = true;
          this.showDialogue = false;
        });
        // document.getElementById("dialogue-box").style.display = "none";
        document.getElementById("audio-art").style.display = "none";
        this.scrollList = this.list;
      }, audioTime * 1000);
      this.changeProgress();
      return;
      var source = atx.createMediaElementSource(audio);
      var analyser = atx.createAnalyser();
      source.connect(analyser);
      analyser.connect(atx.destination);

      analyser.fftSize = 2048;
      var draw = () => {
        var cWidth = canvas.width,
          cHeight = canvas.height * 1.2,
          // frequencyBinCount的值固定为fftSize的一半
          audioArray = new Uint8Array(analyser.frequencyBinCount);
        // 解析频率数据，放入audioArray数组中
        analyser.getByteFrequencyData(audioArray);
        // 填充为柱状图
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.fillStyle = "#4CD1FF";
        for (var i = 0; i < audioArray.length; i++) {
          ctx.fillRect(i * 3, cHeight - audioArray[i] / 2, 1, cHeight);
        }
        // drawShadow();
        // 刷新
        requestAnimationFrame(draw);
      };
      //制造半透明投影
      function drawShadow() {
        ctx.drawImage(outcanvas, 0, 0);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI);
        ctx.scale(-1, 1);
        ctx.drawImage(outcanvas, -canvas.width / 2, -canvas.height / 2);
        ctx.restore();
        ctx.fillStyle = "rgba(54, 114, 206, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
      }
      draw();
    },
    changeProgress: function() {
      const musicMp3 = document.getElementById("audio");
      const timer = setInterval(() => {
        const numbers = musicMp3.currentTime / musicMp3.duration;
        let perNumber = (numbers * 100).toFixed(2);
        if (perNumber >= 100) {
          this.isStore = true;
          this.progress = 0;
          clearInterval(timer);
        }
        this.progress = perNumber;
        let t = Number(perNumber);
        // if(52 < t && t <= 57) {
        //   this.scrollList.shift()
        // }
        if (52 < t && t <= 58) {
          this.scrollList = this.scrollList.slice(2);
        }
        if (68 < t && t <= 75) {
          this.scrollList = this.scrollList.slice(2);
        }
        //   document.getElementsByClassName('1')[0].style.display = 'none'
        // }else if( 35 <  t && t <= 44 ) {
        //   document.getElementsByClassName('2')[0].style.display = 'none'
        // }else if( 46 <  t && t <= 49 ) {
        //   document.getElementsByClassName('3')[0].style.display = 'none'
        // }else if( 59 <  t && t <= 64 ) {
        //   document.getElementsByClassName('4')[0].style.display = 'none'
        // }
      }, 2000);
    },
    culTimeScroll() {
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[0]);
      }, 2800);
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[1]);
      }, 5400);
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[2]);
      }, 15000);
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[3]);
      }, 18000);
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[4]);
      }, 22000);
      setTimeout(() => {
        this.scrollList = this.scrollList.concat(this.msgList[5]);
      }, 26000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timera);
  },
};
</script>
<style lang="less" scoped>
.brain-content {
  font-size: 12px;
  background-size: 40%;
  position: relative;
  height: 100%;
  font-family: Microsoft YaHei;
  .brain-main {
    height: 100%;
    position: relative;
    #ChinaMap {
      height: 100%;
    }
  }
  #robot-img {
    width: 100px;
    position: absolute;
    bottom: 17%;
    left: 9%;
  }
  .light-spot {
    width: 92%;
    margin: 0 auto;
    left: 100px;
    right: 100px;
    margin-left: auto;
    margin-right: auto;
    min-height: 400px;
    height: 50%;
    position: absolute;
    top: 4%;
    text-align: center;
    audio {
      // display: none;
      visibility: hidden;
    }
  }
  #dialogue-box {
    width: 82%;
    margin: 0 auto;
    left: 100px;
    right: 100px;
    margin-left: auto;
    margin-right: auto;
    height: 36%;
    position: absolute;
    overflow: hidden;
    top: 50%;
    display: none;
    .server {
      height: 28%;
      span:nth-child(1) {
        width: 124px;
        height: 124px;
        margin-bottom: -20px;
        display: inline-block;
        background: url("../../assets/images/server-a.png") no-repeat center;
        background-size: 90%;
      }
      span:nth-child(2) {
        font-size: 32px;
        padding: 20px;
        font-weight: bold;
        border-radius: 0px 64px 64px 64px;
        background: rgba(22, 28, 40, 0.3);
      }
    }
    .user {
      height: 26%;
      text-align: right;
      span:nth-child(2) {
        width: 124px;
        height: 124px;
        margin-bottom: -20px;
        display: inline-block;
        background: url("../../assets/images/user-a.png") no-repeat center;
        background-size: 90%;
      }
      span:nth-child(1) {
        font-size: 32px;
        padding: 20px;
        font-weight: bold;
        border-radius: 64px 0px 64px 64px;
        background: rgba(22, 28, 40, 0.3);
      }
    }
    .seamless-warp {
      height: 100%;
      overflow: hidden;
    }
  }
  .brain-foot {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }
  .video {
    display: none;
  }
  #audio-art {
    width: 60%;
    height: 60%;
    margin: 0 auto;
    z-index: 1;
    display: none;
  }
  #audio-art-shadow {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    z-index: 1;
  }
}
.topCity {
  position: absolute;
  height: 30%;
  bottom: -18%;
  width: 30%;
  .person-columnar {
    height: 100%;
  }
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
