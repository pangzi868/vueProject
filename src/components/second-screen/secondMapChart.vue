<template>
  <!-- p1 -->
  <div class="sec-map-charts">
    <div id="secMiddleMap"></div>
  </div>
</template>

<script>
export default {
  name: "mapChart",
  // props: ["chartData"],
  mounted() {
    // this.initMap(this.chartData);
    this.getData();
  },
  data() {
    return {
      mapData: [],
    };
  },
  computed: {},
  methods: {
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
    getData(num = 0) {
      this.axios({
        url: "/api/p2/graphInfo",
        method: "get",
        data: "",
        type: "json",
      }).then((data) => {
        if (data.data.code === 100) {
          var mydata = data.data.data;
          var chartData = data.data.data
            .slice(num*5, (num * 5)+5)
            .map((item, index) => {
              return {
                company: item.companyname,
                province: item.province,
                credit: this.thousandFormat(item.credit, 2),
                value: [item.longitude, item.latitude],
                count: item.credit,
              };
            });
          let index = 0;
          let ind = num;
          this.initMap(chartData, index);
          this.timer = setInterval(() => {
            if (index >= chartData.length) {
              index = 0;
              num++;
              if (num * 5 >= mydata.length) {
                num = 0;
              }
              this.getData(num);
              clearInterval(this.timer);
            }
            index++;
            this.initMap(chartData, index);
          }, 5000);
        }
      });
    },
    initMap(chartData, index) {
      // if (!chartData || chartData.length === 0) return;
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

      let myEcharts = this.$echarts.init(
        document.getElementById("secMiddleMap")
      );
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
          // itemStyle: {
          //   normal: {
          //     borderColor: "rgba(28, 180, 0, 0)",
          //     borderWidth: 0.5,
          //     areaColor: {
          //       x: 1000,
          //       y: 1000,
          //       x2: 1000,
          //       y2: 0,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           // color: "#69c5d8" // 0% 处的颜色
          //           color: "rgba(170,170,170, 0.5)"
          //         },
          //         {
          //           offset: 1,
          //           // color: "#126caf" // 50% 处的颜色
          //           color: "rgba(170,170,170, 0.5)"
          //         }
          //       ],
          //       global: true // 缺省为 false
          //     },
          //     opacity: 1
          //   },
          //   emphasis: {
          //     show: false,
          //     // areaColor: "#69c5d8"
          //     areaColor: "rgba(170,170,170, 0.5)"
          //   }
          // },
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
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
                show: true,
              },
              emphasis: {
                show: true,
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
            // label: {
            //   emphasis: {
            //     show: false,
            //     color: "#fff"
            //   }
            // },
            top: "9.5%",
            // left: "12.5%",
            aspectScale: 0.75,
            roam: false,
            //地图的样式设计
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
                  global: true, // 缺省为 false
                },
              },
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
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            symbolSize: function(value, params) {
              const { count } = params.data;
              let num = parseInt(count);
              var max = Math.max.apply(
                null,
                chartData.map((item) => item.count)
              );
              let size = (32 / max) * num;
              let result = size > 5 ? size : 5;
              return result;
            },
            data: chartData,
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
            zlevel: 20,
            // symbolSize: 32,
            data:
              chartData[index] && chartData.length > 0
                ? [chartData[index]]
                : [
                    //   {
                    //     name: "王**",
                    //     age: "28岁",
                    //     sex: "男",
                    //     type: "授信申请",
                    //     sum: "3000000",
                    //     value: [116.4551, 40.2539, 48]
                    //   },
                    //   {
                    //     name: "王**",
                    //     age: "25岁",
                    //     sex: "女",
                    //     type: "授信申请",
                    //     sum: "7000000",
                    //     value: [103.9526, 30.7617, 48]
                    //   }
                  ],
            // symbolSize: 32,
            // showEffectOn: "render",

            // 涟漪的设置
            // rippleEffect: {
            //   color: "#7FFFAA",
            //   scale: 4,
            //   brushType: "stroke",
            // },

            // 标签 p1弹出的
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return `{a|公司名称:}{b|${params.data.company}}\n{a|省市:}{b|${params.data.province}}\n{a|授信金额:}{c|${params.data.credit}}`;
                },
                position: [-580, 105],
                distance: 0,
                // background: 'rgba(22, 28, 40, 0.32)',
                // boxShadow: '0px 16px 24px 0 #030C24',
                backgroundColor: {
                  image: require("@/assets/images/p2/mapmodelbg.png"),
                },
                // borderColor: "rgba(0,191,255,.9)",
                // borderWidth: 2,
                padding: [30, 40],
                borderRadius: 3,
                lineHeight: 45,
                width: 500,
                height: 130,
                verticalAlign: "middle",
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
                    padding: [0, 10],
                    fontSize: 20,
                    color: "#FFAF2B",
                  },
                },
                // rich: {
                // fline: {
                //   padding: [0, 10],
                //   color: "#ffffff",
                // },
                // },
              },
            },
            itemStyle: {
              normal: {
                color: "#F5B523",
                shadowBlur: 2,
              },
            },
          },
          {
            type: "lines",
            zlevel: 11,
            effect: {
              show: true,
              period: 5,
              color: "rgba(127,255,170, 1)",
            },
            lineStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(127,255,170, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(127,255,170, 0)",
                    },
                  ],
                  false
                ),
                width: 2,
                opacity: 0.5,
                curveness: 0,
              },
            },
            // data: chartData
            //   ? chartData.map((item) => {
            //       return {
            //         fromName: 1,
            //         toName: 1,
            //         coords: [
            //           [Number(item.value[0]), Number(item.value[1])],
            //           [Number(item.value[0]), Number(item.value[1]) + 3],
            //         ],
            //       };
            //     })
            //   : [],
            // data: Object.keys(geoCoordMap).map(item => {
            //   return {
            //     fromName: 1,
            //     toName: 1,
            //     coords: [
            //       geoCoordMap[item],
            //       [geoCoordMap[item][0], geoCoordMap[item][1] + 3]
            //     ]
            //   };
            // })
            // data: [
            //   {
            //     fromName: 1,
            //     toName: 1,
            //     coords: [
            //       [116.24, 39.55],
            //       [116.24, 42.55]
            //     ]
            //   }
            // ]
          },
        ],
      });
    },
  },
  components: {},
  // watch: {
  //   chartData: function(newVal) {
  //     this.initMap(newVal);
  //   },
  // },
};
</script>

<style lang="less" scoped>
.sec-map-charts {
  height: 100%;
  width: 100%;
}
#secMiddleMap {
  height: 85%;
  width: 100%;
}
</style>
