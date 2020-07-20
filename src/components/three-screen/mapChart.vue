<template>
  <!-- p3 -->
  <div class="map-charts">
    <div id="threeMapChart"></div>
  </div>
</template>

<script>
export default {
  name: "mapChart",
  data() {
    return {
      timer: null,
      relationRes: [],
      currentTime: "",
      city: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/api/p3/relationmapData?count=10").then((relaRes) => {
        // let relaData = relaRes.data.data;
        let relaData = [
          {
            abnormal_related: "3",
            age: 52,
            appname: "百度闪付App",
            currentTime: "2020/07/14 16:51:32",
            dealtypename: "账户冻结",
            id: 7,
            latitude: 43.83,
            location: "乌鲁木齐市",
            longitude: 87.62,
            payamount: 19926.89,
            relate_factor: "安卓设备",
            relate_flag: "7",
            relationInfoList: [
              {
                dealtypename: "账户冻结",
                id: 23,
                latitude: 23.13,
                longitude: 113.28,
                relate_age: 30,
                relate_flag: "7",
                relate_location: "广东省",
                relate_name: "洪锐",
              },
              {
                dealtypename: "账户冻结",
                id: 23,
                latitude: 23.13,
                longitude: 113.28,
                relate_age: 30,
                relate_flag: "7",
                relate_location: "广东省",
                relate_name: "洪锐",
              },
              {
                dealtypename: "账户冻结",
                id: 23,
                latitude: 23.13,
                longitude: 113.28,
                relate_age: 30,
                relate_flag: "7",
                relate_location: "广东省",
                relate_name: "洪锐",
              },
            ],
            residence: "四川省",
            risk: "提现风险异常",
            risktype: "伪冒开户",
            username: "王云生",
            value: [
              {
                0: 87.62,
                1: 43.83,
              },
            ],
          },
        ];
        this.relationRes = relaData ? relaData : [];
        // this.axios
        //   .get("/api/p3/mapData")
        //   .then(res => {
        //     const { data } = res.data;
        //     let index = 0;
        //     this.timer = setInterval(() => {
        //       if (index >= data.length) {
        //         this.getData();
        //         clearInterval(this.timer);
        //       }
        //       index++;
        //       this.initMap(data, index);
        //     }, 15000);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
        // const { data } = res.data;
        let index = 0;
        this.initMap(this.relationRes, index);
        this.timer = setInterval(() => {
          if (index >= this.relationRes.length) {
            this.getData();
            clearInterval(this.timer);
          }
          index++;
          this.initMap(this.relationRes, index);
        }, 15000);
      });
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
      this.currentTime = dateStr + " " + timeStr;
      // this.currentTime = Object.assign({}, { date: dateStr, time: timeStr });
      // // 获取当前天气
      // this.getCurrentWeather(myDate.getDate());
      // document.getElementById("nowtime").innerHTML = "当前时间：" + timestr;
    },
    //时间数字小于10，则在之前加个“0”补位。
    check(i) {
      var num = i < 10 ? "0" + i : i;
      return num;
    },
    initMap(data, index) {
      var sum = data;
      function locat(city, ch) {
        var leftlocation = ["新疆维吾尔自治区",'乌鲁木齐市', "西藏", "青海", "云南", "甘肃"];
        if (leftlocation.indexOf(city) != -1) {
          return [-560, -230];
        } else {
          return [-760, -230];
        }
      }
      //     this.relationRes[index].location == "新疆维吾尔自治区"
      // ? [340, -210]
      // : [20, -210],
      function locat2(city, ch) {
        var leftlocation = ["新疆维吾尔自治区", '乌鲁木齐市',"西藏", "青海", "云南", "甘肃"];
        if (leftlocation.indexOf(city) != -1) {
          // if (ch.length > 4) {
          //   return [340, -210];
          // } else {
          //   return [295, -210];
          // }
          if (city.length >= 5) {
            if (ch.length > 4) {
              return [340, -210];
            } else {
              return [310, -210];
            }
          } else {
            if (ch.length > 4) {
              return [240, -210];
            } else {
              return [210, -210];
            }
          }
        } else if (leftlocation.indexOf(city) == -1) {
          if (city.length >= 5) {
            if (ch.length > 4) {
              return [140, -210];
            } else {
              return [110, -210];
            }
          } else {
            if (ch.length > 4) {
              return [40, -210];
            } else {
              return [10, -210];
            }
          }
        }
        // else if (city.length > 2 && city !== "新疆维吾尔自治区") {
        //   return [20, -210];
        // }
      }
      function width(city, ch, mone) {
        mone = parseInt(mone);
        if (city.length > 5) {
          if (ch.length > 4) {
            return 810;
          } else {
            return 780;
          }
        } else {
          if (ch.length > 4) {
            return 710;
          } else {
            return 680;
          }
        }
      }
      //       function size() {
      // 2
      // 3 return  Math.round(Math.random() * 10 + 32)
      // 4
      // 5 }
      // console.log((data = data.slice(8, 9)), "datadata");
      data =
        // let relationMesg = {};
        // this.relationRes.forEach(item => {
        //   if (item.location === data[index].location) {
        //     relationMesg =
        //       item.relationInfoList && item.relationInfoList.length > 0
        //         ? Object.assign({}, item)
        //         : {};
        //   }
        // });
        // console.log([relationMesg], "rsm");
        // console.log([data[index]], "di");
        this.nowTime();
      // data = data.map(item => {
      //   return {
      //     ...item,
      //     value: [item.longitude, item.latitude]
      //   };
      // });
      // data = [];
      this.relationRes = this.relationRes.map((item) => {
        return {
          ...item,
          currentTime: this.currentTime,
          value: [item.longitude, item.latitude],
        };
      });

      let myEcharts = this.$echarts.init(
        document.getElementById("threeMapChart")
      );
      var geoCoordMap = {
        上海: [119.1803, 31.2891],
        福建: [119.4543, 25.9222],
        重庆: [108.384366, 30.439702],
        北京: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        吉林: [125.8154, 44.2584],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        内蒙古: [110.3467, 41.4899],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        黑龙江: [127.9688, 45.368],
        台湾: [121.4648, 25.563],
      };
      var colorData = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 139 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 18 },
        { name: "广东", value: 183 },
        { name: "香港", value: 203 },
        { name: "澳门", value: 199 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
        { name: "台湾", value: 15 },
        { name: "南海诸岛", value: 16 },
      ];

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
      myEcharts.setOption({
        legend: {
          show: false,
        },
        tooltip: {
          show: true,
        },
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
          map: "china",
          aspectScale: 0.75,
          label: {
            emphasis: {
              show: false,
            },
          },
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                  },
                },
              },
            },
          ],
          itemStyle: {
            normal: {
              borderColor: "rgba(0,255,255, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,255,255, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,255,255, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: "#389BB7",
              borderWidth: 0,
            },
          },
          z: 2,
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(colorData),
            symbolSize: 0,
            zlevel: -1,
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
                color: "#fff",
              },
            },
          },
          {
            type: "map",
            map: "china",
            tooltip: {
              show: false,
            },
            showLegendSymbol: false,
            top: "9.5%",
            aspectScale: 0.75,
            roam: false,
            itemStyle: {
              normal: {
                borderColor: "#2cb3dd",
                borderWidth: 0.8,
                areaColor: {
                  type: "linear-gradient",
                  x: 1000,
                  y: 600,
                  x2: 1000,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#274d68", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#09132c", // 50% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              //这里
              emphasis: {
                show: false,
                areaColor: "#467bc0",
              },
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            // label: {
            //   normal: {
            //     show: false
            //   },
            //   emphasis: {
            //     show: false,
            //     textStyle: {
            //       color: "#fff"
            //     }
            //   }
            // },
            // roam: false,
            // itemStyle: {
            //   normal: {
            //     // areaColor: "rgba(0, 187, 255, .3)",
            //     // borderColor: "#00FFFF",
            //     areaColor: "rgba(0, 187, 255, .0)",
            //     borderColor: "rgba(0, 187, 255, .0)",
            //     borderWidth: 1
            //   },
            //   emphasis: {
            //     // areaColor: "#00FFFF"
            //     areaColor: "rgba(0, 187, 255, .0)"
            //   }
            // },
            animation: false,
            zlevel: 1,
            data: colorData,
          },
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 10,
          //   data: data,
          //   symbolSize: function(value, params) {
          //     const { rejamt } = params.data;
          //     let num = parseInt(rejamt.replace(/','/g, ""));
          //     var max = Math.max.apply(
          //       null,
          //       data.map(item => parseInt(item.rejamt.replace(/','/g, "")))
          //     );
          //     let size = (20 / max) * num;
          //     let result = size > 5 ? size : 5;
          //     return result;
          //   },
          //   showEffectOn: "render",
          //   // 涟漪的设置
          //   rippleEffect: {
          //     color: "#F5B523",
          //     scale: 4,
          //     brushType: "stroke"
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#F5B523",
          //       shadowBlur: 2
          //     }
          //   }
          // },
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 10,
          //   data: [data[index]],
          //   itemStyle: {
          //     normal: {
          //       color: "#F5B523",
          //       shadowBlur: 2
          //     }
          //   },
          //   // 标签
          //   label: {
          //     normal: {
          //       show: false,
          //       formatter: function(params) {
          //         const {
          //           location,
          //           eventid,
          //           appname,
          //           risktype,
          //           rejamt
          //         } = params.data;
          //         return `{a|区域名称}{b|${location}}{a|交易类型}{b|${eventid}}\n{a|渠道类型}{b|${appname}}{a|事件类型}{b|${risktype}}\n{c|实时拦截金额}{d|${rejamt}万}`;
          //       },
          //       position: [-400, -150],
          //       distance: 0,
          //       width: 340,
          //       height: 120,
          //       backgroundColor: {
          //         image: require("@/assets/images/p3/map-modal.png")
          //       },
          //       padding: [30, 40],
          //       lineHeight: 40,
          //       // verticalAlign: "middle",
          //       color: "#fff",
          //       z: 11,
          //       rich: {
          //         a: {
          //           color: "rgba(255,255,255,.7)",
          //           fontSize: 16
          //         },
          //         b: {
          //           padding: [0, 10],
          //           color: "#ffffff",
          //           fontSize: 16,
          //           fontWeight: "bold"
          //         },
          //         c: {
          //           margin: 20,
          //           fontSize: 16,
          //           color: "rgba(255,255,255,.9)"
          //         },
          //         d: {
          //           padding: [0, 10],
          //           fontSize: 20,
          //           color: "#FFAF2B"
          //         }
          //       }
          //     }
          //   }
          // },
          {
            // 关联关系
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            symbolSize: function(value, params) {
              const { payamount } = params.data;
              let num = parseInt(payamount);
              var max = Math.max.apply(
                null,
                sum.map((item) => item.payamount)
              );
              let size = (32 / max) * num;
              let result = size > 5 ? size : 5;
              return result;
            },
            data: this.relationRes,
            itemStyle: {
              normal: {
                color: "#F5B523",
                shadowBlur: 2,
              },
            },
          },
          {
            // 关联关系
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            // symbolSize: 32,
            data: this.relationRes[index] ? [this.relationRes[index]] : [],
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
                formatter: function(params) {
                  var {
                    location,
                    appname,
                    payamount,
                    risktype,
                    dealtypename,
                    username,
                    age,
                    residence,
                    risk,
                    relate_factor,
                    relationInfoList,
                    currentTime,
                  } = params.data;

                  var reg = /(?<=.)./g;
                  if (username.length < 3) {
                    username = username.replace(reg, "*");
                  } else {
                    username = username.replace(reg, "*");
                  }
                  function sum(num) {
                    var str = "";
                    for (var i = 0; i < num; i++) {
                      str += " ";
                    }
                    return str;
                  }
                  function price(pic) {
                    if (String(pic).split(".").length === 2) {
                      return pic;
                    } else {
                      return pic + ".00";
                    }
                  }

                  return `{a|时间}{b|${currentTime}}{a|          省市}{b|${location}}{a|                 场景}{b|${appname}}\n{a|金额}{b|${price(
                    payamount
                  )}元}{a|${sum(
                    String(payamount).length + (22 - String(payamount).length)
                  )}风险类型}{e|${risktype}}{a|        处置方式}{e|${dealtypename}}\n{f|${username}}{f|   ${age}岁}{f|   ${residence}}{e|   ${risk}}\n{a|异常关联}{b|${
                    relationInfoList.length
                  }}{a|               关联要素}{d|${relate_factor}}`;
                  // return `aaaaaa`;
                },
                position: locat(
                  this.relationRes[index].location,
                  this.relationRes[index].appname
                ),
                distance: 0,
                width: width(
                  this.relationRes[index].location,
                  this.relationRes[index].appname,
                  this.relationRes[index].payamount
                ),
                height: 180,
                backgroundColor: {
                  image: require("@/assets/images/p3/map-alert.png"),
                },
                padding: [30, 40],
                lineHeight: 40,
                // verticalAlign: "middle",
                color: "#fff",
                z: 11,
                textStyle: {
                  fontSize: 20,
                },
                rich: {
                  a: {
                    color: "rgba(255,255,255,.7)",
                    fontSize: 20,
                  },
                  b: {
                    padding: [0, 10],
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  c: {
                    margin: 20,
                    fontSize: 20,
                    color: "rgba(255,255,255,.9)",
                  },
                  d: {
                    padding: [0, 10],
                    fontSize: 20,
                    color: "#FFAF2B",
                  },
                  e: {
                    padding: [0, 10],
                    fontSize: 20,
                    color: "#FF475D",
                    fontWeight: "bold",
                  },
                  f: {
                    padding: [0, 10, 0, 0],
                    color: "#ffffff",
                    fontSize: 20,
                  },
                },
              },
            },
          },
          {
            // 关联关系
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            data:
              this.relationRes[index] &&
              this.relationRes[index].relationInfoList.length > 0
                ? [this.relationRes[index]]
                : [],
            itemStyle: {
              normal: {
                color: "#F5B523",
                shadowBlur: 0,
                width: 32,
                height: 32,
              },
            },
            // 标签
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  let { relationInfoList } = params.data;
                  // console.log(relationInfoList);
                  var reg = /(?<=.)./g;
                  relationInfoList = relationInfoList.map((item) => {
                    if (item.relate_name.length < 3) {
                      return {
                        ...item,
                        relate_name: item.relate_name.replace(reg, "*  "),
                      };
                    } else {
                      return {
                        ...item,
                        relate_name: item.relate_name.replace(reg, "*"),
                      };
                    }

                    // item.relate_name.replace(reg, "*");
                  });
                  // return `{a|区域名称}{b|${location}}{a|交易类型}{b|${eventid}}\n{a|渠道类型}{b|${appname}}{a|事件类型}{b|${risktype}}\n{c|实时拦截金额}{d|${rejamt}万}`;
                  let tmp = relationInfoList.map((item, index) => {
                    return (
                      item.relate_name +
                      "    " +
                      item.relate_age +
                      "岁    " +
                      item.relate_location +
                      "  " +
                      item.dealtypename +
                      (index < relationInfoList.length - 1 ? "\n" : "")
                    );
                  });
                  let returnStr = tmp.join("").replace(/','/g, "");
                  return returnStr;
                  // return `aaaaaa`;
                },
                position: locat2(
                  this.relationRes[index].location,
                  this.relationRes[index].appname
                ),
                distance: 0,
                width: 340,
                height: 120,
                backgroundColor: {
                  image: require("@/assets/images/p3/map-alert.png"),
                },
                padding: [30, 40],
                lineHeight: 40,
                // verticalAlign: "middle",
                color: "#fff",
                z: 11,
                textStyle: {
                  fontSize: 20,
                },
                // rich: {
                //   a: {
                //     color: "rgba(255,255,255,.7)",
                //     fontSize: 16
                //   },
                //   b: {
                //     padding: [0, 10],
                //     color: "#ffffff",
                //     fontSize: 16,
                //     fontWeight: "bold"
                //   },
                //   c: {
                //     margin: 20,
                //     fontSize: 16,
                //     color: "rgba(255,255,255,.9)"
                //   },
                //   d: {
                //     padding: [0, 10],
                //     fontSize: 20,
                //     color: "#FFAF2B"
                //   }
                // }
              },
            },
          },
        ],
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {},
};
</script>

<style lang="less">
.map-charts,
#threeMapChart {
  height: 100%;
  width: 100%;
}
</style>
