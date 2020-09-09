<template>
  <div>
    <el-container
      :class="(visibility ? 'trans' : '')"
      v-bind:id="id"
      @mousedown.native.prevent="down($event)"
      @touchstart.native.prevent="down($event)"
      @mousemove.native.prevent="move($event)"
      @touchmove.native.prevent="move($event)"
      @mouseup.native.prevent="end($event)"
      @touchend.native.prevent="end($event)"
      :style="{zIndex: zIndex}"
    >
      <el-main>
        <dv-scroll-board
          v-if="!tableJudge"
          :config="bottomScrollConfig"
          style="width:100%; height:100%; font-size: 48px;"
        />

        <div v-if="tableJudge" :id="chartIds" class="chart-div"></div>
      </el-main>
    </el-container>
    <div class="cover-div" v-if="visibility"></div>
  </div>
</template>

<script>
export default {
  name: "Window",
  created() {
    // this.initColumn(this.dialogData, this.currentPro, this.leftSecAux);
  },
  mounted() {
    this.initTable();
  },
  props: {
    titlex: String,
    visible: Boolean,
    type: String,
    data: Object,
    keys: String,
    chartIds: String,
    tableJudge: Boolean,
    dime: String,
    zIndex: Number,
    filter: Object
    // id: [String, Number]
  },
  data() {
    return {
      title: this.titlex,
      visibility: this.visible,
      selectElement: "",
      id: this.keys,
      dragging: false,
      downDrag: false,
      dragObj: {
        moveX: 0,
        moveY: 0,
        dragTime: 0,
        startTime: 0,
        endTime: 0,
        distanceX: 0,
        distanceY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        touchstartX: 0,
        touchstartY: 0
      },
      styleArr: ["singlemove", "rotatemove"],
      currentData: [],
      bottomScrollConfig: {
        header: [],
        rowNum: 15,
        headerBGC: "rgba(15,67,97,0.4)",
        oddRowBGC: "rgba(50,218,255,0.1)",
        evenRowBGC: "rgba(15,67,97,0.4)",
        headerHeight: 128,
        carousel: "single",
        align: [],
        data: [],
        columnWidth: [440, 440]
      }
    };
  },
  computed: {
    modalVisibility: {
      get: function() {
        return this.$store.state.modalVisibility;
      },
      set: function(newValue) {
        this.$store.commit("newModalVisibility", newValue);
      }
    },
    modalData: {
      get: function() {
        return this.$store.state.modalData;
      },
      set: function(newValue) {
        this.$store.commit("newModalData", newValue);
      }
    }, // 切换部门
    curPro: {
      get: function() {
        return this.$store.state.curPro;
      },
      set: function(newVal) {
        this.$store.commit("newCurPro", newVal);
      }
    }
  },
  methods: {
    down(e) {
      e.prevent;
      this.downDrag = true;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      if (!mouseType) {
        this.dragObj.touchstartX = clientX;
        this.dragObj.touchstartY = clientY;
      }
      this.selectElement = document.getElementById(this.id);
      this.selectElement.style.cursor = "move";
      this.distanceX = clientX - this.selectElement.offsetLeft;
      this.distanceY = clientY - this.selectElement.offsetTop;
      this.dragObj.startTime = e.timeStamp;
    },
    move(e) {
      if (!this.downDrag) return;
      let mouseType = e.type.indexOf("mouse") !== -1 ? true : false;
      let clientX = mouseType ? e.clientX : e.touches[0].clientX;
      let clientY = mouseType ? e.clientY : e.touches[0].clientY;
      this.selectElement.style.left = clientX - this.distanceX + "px";
      this.selectElement.style.top = clientY - this.distanceY + "px";
      this.dragObj.moveX += e.movementX;
      this.dragObj.moveY += e.movementY;
      if (!mouseType) {
        this.dragObj.moveX = clientX - this.dragObj.touchstartX;
        this.dragObj.moveY = clientY - this.dragObj.touchstartY;
      }
      // 这里的数据越小，越精确
      if (Math.abs(this.dragObj.moveX) + Math.abs(this.dragObj.moveY) > 5) {
        this.dragging = true;
      }
    },
    end(e) {
      let dragDis = 0;
      this.downDrag = false;
      this.dragObj.endTime = e.timeStamp;
      this.dragObj.dragTime =
        parseInt(this.dragObj.endTime) - parseInt(this.dragObj.startTime);
      dragDis = Math.abs(this.dragObj.moveX) + Math.abs(this.dragObj.moveY);
      // 如果（拖动距离）大于5且小于200 且（拖动时长）小于200ms
      if (dragDis > 5 && dragDis < 1000 && this.dragObj.dragTime < 200) {
        this.closeDialog();
      }
      this.dragging = false;
      this.dragObj = {
        moveX: 0,
        moveY: 0,
        dragTime: 0,
        startTime: 0,
        endTime: 0,
        distanceX: 0,
        distanceY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        touchstartX: 0,
        touchstartY: 0
      };
      this.selectElement.style.cursor = "default";
    },
    testClick(e) {
      if (this.dragging) {
        this.dragging = !this.dragging;
        return;
      }
      alert("下钻");
    },

    closeDialog(e) {
      // this.keys;
      let temp = {};
      temp[this.keys] = Object.assign({}, this.modalData[this.keys], {
        visible: false
      });
      this.modalData = temp;
    },
    initTable() {
      if (this.chartIds !== undefined) {
        if (this.chartIds === "left1Chart1") {
          this.initFirstChart(this.chartIds, this.data, this.curPro);
        } else if (this.chartIds === "left2Chart1") {
          this.initSecondChart(this.chartIds, this.data, this.curPro);
        } else {
          this.initColumnChart(this.chartIds, this.data, this.curPro);
        }
        return;
      }

      this.bottomScrollConfig.header = this.data.xAxis;
      this.bottomScrollConfig.data = this.data.yAxis;
      this.bottomScrollConfig.align = this.data.align;
      this.bottomScrollConfig = JSON.parse(
        JSON.stringify(this.bottomScrollConfig)
      );
    },
    // 左四的实例化
    initColumnChart(id, data, curPro) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      // data = {};
      let myCharts = this.$echarts.init(document.getElementById(id));
      let colorArr = [
          "rgba(0,150,255,1)",
          "rgba(24,40,255,1)",
          "rgba(222,159,100,1)"
        ],
        reg = /(率|值|额|数)$/g,
        that = this;
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2} %",
          formatter: function(params) {
            let tempStr = params.map((item, index) => {
              return (
                "</br><span style='display:inline-block;margin-right:25px;border-radius:25px;width:40px;height:40px;background-color:" +
                colorArr[index] +
                "'></span>" +
                item.seriesName +
                "：" +
                (item.value
                  ? reg.test(item.seriesName) || item.value.indexOf(".") !== -1
                    ? parseFloat(item.value).toFixed(2)
                    : item.value
                  : "0")
              );
            });
            return params[0].name + tempStr.join(" ");
          },
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          top: "10%",
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: {
          //图例组件，颜色和名字
          right: "3%",
          top: "3%",
          itemGap: 64,
          itemWidth: 44,
          itemHeight: 44,
          data: [
            {
              name: data.y ? data.y[0].name : "计划数"
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: data.y ? data.y[1].name : "实际数"
            },
            {
              name: data.y ? data.y[2].name : "执行比例",
              icon: "rect"
            }
          ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: data.x
              ? data.x[0].data.map(item => {
                  if (item === "直属单位") {
                    return "直属";
                  } else {
                    return item;
                  }
                })
              : [
                  "22:18",
                  "22:23",
                  "22:25",
                  "22:28",
                  "22:30",
                  "22:33",
                  "22:35",
                  "22:40",
                  "22:18",
                  "22:23",
                  "22:25"
                ],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              },
              formatter: function(value) {
                if (that.chartIds === "left4Chart1") {
                  return parseInt(value) + "月";
                } else {
                  return value;
                }
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,1)",
                width: 4,
                opacity: 0.2
              }
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 100,
            axisLabel: {
              show: false,
              formatter: "{value}",
              textStyle: {
                color: "#FFF",
                fontSize: 12
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFF"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                width: 4,
                color: "rgba(255,255,255,0.2)"
              }
            }
          }
        ],
        series: [
          {
            name: data.y ? data.y[0].name : "计划数",
            type: "bar",
            data: data.y
              ? data.y[0].data.map((item, index) => {
                  if (
                    data.x[0].data[index] === curPro ||
                    (data.x[0].data[index] === "直属" && curPro === "直属单位")
                  ) {
                    return {
                      value: item,
                      itemStyle: {
                        normal: {
                          show: true,
                          color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                              {
                                offset: 0,
                                color: "rgba(255,165,0,1)"
                              },
                              {
                                offset: 1,
                                color: "rgba(255,140,0,1)"
                              }
                            ]
                          ),
                          barBorderRadius: [30, 30, 0, 0],
                          borderWidth: 0
                        }
                      }
                    };
                  } else {
                    return item;
                  }
                })
              : [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60],
            barWidth: 26,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(13,139,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(24,40,255,1)"
                  }
                ]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: data.y ? data.y[1].name : "实际数",
            type: "bar",
            data: data.y
              ? data.y[1].data.map((item, index) => {
                  if (
                    data.x[0].data[index] === curPro ||
                    (data.x[0].data[index] === "直属" && curPro === "直属单位")
                  ) {
                    return {
                      value: item,
                      itemStyle: {
                        normal: {
                          show: true,
                          color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                              {
                                offset: 0,
                                color: "rgba(255,228,181,1)"
                              },
                              {
                                offset: 1,
                                color: "rgba(255,222,173,1)"
                              }
                            ]
                          ),
                          barBorderRadius: [30, 30, 0, 0],
                          borderWidth: 0
                        }
                      }
                    };
                  } else {
                    return item;
                  }
                })
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            barWidth: 26,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(21,255,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,150,255,1)"
                  }
                ]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: data.y ? data.y[2].name : "执行比例",
            type: "line",
            data: data.y
              ? data.y[2].data.map((item, index) => {
                  if (
                    data.x[0].data[index] === curPro ||
                    (data.x[0].data[index] === "直属" && curPro === "直属单位")
                  ) {
                    return {
                      value: item * 100,
                      itemStyle: {
                        normal: {
                          show: true,
                          color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                              {
                                offset: 0,
                                color: "rgba(255,228,181,1)"
                              },
                              {
                                offset: 1,
                                color: "rgba(255,222,173,1)"
                              }
                            ]
                          ),
                          barBorderRadius: [30, 30, 0, 0],
                          borderWidth: 0
                        }
                      }
                    };
                  } else {
                    return item * 100;
                  }
                })
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            yAxisIndex: 1,
            smooth: 0.5,
            symbolSize: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                width: 12
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(222,159,100,1)",
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      });
      myCharts.on("click", params => {
        if (this.chartIds === "left4Chart1") {
          let seriesName = params.name,
            name = this.dime,
            data = this.$store.state.screenSecondData.left4three,
            trueData = {
              x: [{ name: data.x[2].name, data: [] }],
              y: [
                { name: data.y[0].name, data: [] },
                { name: data.y[1].name, data: [] },
                { name: data.y[2].name, data: [] }
              ]
            };
          for (let i = 0, item; (item = data.x[0].data[i++]); ) {
            if (item === name && data.x[1].data[i - 1] === seriesName) {
              trueData.x[0].data.push(data.x[2].data[i - 1]);
              trueData.y[0].data.push(data.y[0].data[i - 1]);
              trueData.y[1].data.push(data.y[1].data[i - 1]);
              trueData.y[2].data.push(data.y[2].data[i - 1]);
            }
          }
          setTimeout(() => {
            this.modalData = {
              left4TwoModal: {
                type: "type1",
                visible: true,
                keys: "left4TwoModal",
                zIndex: 22,
                data: trueData,
                chartIds: "left4Chart2",
                tableJudge: true
              }
            };
          }, 300);
        }
      });
    },
    // 左一的实例化
    initFirstChart(id, data, curPro) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      // data = {};
      let myCharts = this.$echarts.init(document.getElementById(id));
      let that = this;
      let showAxis = ["0.2", "0.5", "0.7", "1.0"];
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}",
          formatter: function(params, value) {
            return (
              "预算值：" +
              ((that.filter.yusuan / 12) * parseInt(params[0].name)).toFixed(
                2
              ) +
              "</br> 完成值： " +
              parseFloat(params[0].value).toFixed(2) +
              "</br> 完成比率： " +
              (
                (((that.filter.yusuan / 12) * parseInt(params[0].name)) /
                  params[0].value) *
                100
              ).toFixed(2) +
              "%"
            );
          },
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          top: "10%",
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: {
          //图例组件，颜色和名字
          right: "3%",
          top: "3%",
          itemGap: 64,
          itemWidth: 44,
          itemHeight: 14,
          data: [
            {
              name: data.y ? data.y[0].name : "预算值",
              icon: "rect"
              //icon:'image://../wwwroot/js/url2.png', //路径
            }
          ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: data.x
              ? data.x[0].data
              : [
                  "22:18",
                  "22:23",
                  "22:25",
                  "22:28",
                  "22:30",
                  "22:33",
                  "22:35",
                  "22:40",
                  "22:18",
                  "22:23",
                  "22:25"
                ],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              },
              formatter: function(value) {
                return parseInt(value) + "月";
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            // min: 0,
            // max: this.filter.yusuan,
            splitNumber: 5,
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 52
              // formatter: function(value) {
              //   if (
              //     showAxis.includes((value / that.filter.yusuan).toFixed(1))
              //   ) {
              //     return ((value / that.filter.yusuan) * 100).toFixed(0) + "%";
              //   } else {
              //     return "";
              //   }
              // }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFF"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                width: 4,
                color: "rgba(255,255,255,0.4)"
              }
            }
          }
        ],
        series: [
          {
            name: data.y ? data.y[0].name : "预算值",
            type: "line",
            data: data.y
              ? data.y[0].data
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            smooth: 0.5,
            symbolSize: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                width: 12
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(255,140,0,1)",
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,244,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,77,167,1)" // 100% 处的颜色
                    }
                  ],
                  false
                ),

                shadowColor: "rgba(0,160,221,1)"
              }
            },
            markLine: {
              symbol: "none",
              silent: true,
              lineStyle: {
                normal: {
                  type: "dashed"
                }
              },
              label: {
                position: "start"
              },
              data: [
                {
                  yAxis: this.filter.yusuan,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "red"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "100%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.7,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,127,80,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "70%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.5,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,215,0,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "50%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.2,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,228,181,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "20%";
                    }
                  }
                }
              ]
            }
          }
        ]
      });

      //  线图点击较为麻烦
      myCharts.getZr().on("click", params => {
        let pointInPixel = [params.offsetX, params.offsetY];
        if (myCharts.containPixel("grid", pointInPixel)) {
          /*此处添加具体执行代码*/

          let pointInGrid = myCharts.convertFromPixel(
            { seriesIndex: 0 },
            pointInPixel
          );
          //X轴序号
          let xIndex = pointInGrid[0];

          //获取当前图表的option
          let op = myCharts.getOption();

          //获得图表中我们想要的数据
          let month = op.xAxis[0].data[xIndex];
          let year = that.filter.year;

          let data = this.$store.state.screenSecondData.left1Aux2;

          let align = [];
          for (var i in 7) {
            align.push("center");
          }
          let xAxis = [
            "序号",
            "费用名称",
            "年度预算额",
            "实际完成额",
            "未完成值",
            "执行进度",
            "未完成值占可控费用"
          ];
          let yAxis = [];
          let tempData = data.x;
          let index = 1;

          let yusuanData = this.$store.state.screenSecondData.left1Aux3,
            tempArr = {},
            totalYu = 0;
          for (let i = 0, item; (item = yusuanData.x[0].data[i++]); ) {
            if (item === this.curPro && yusuanData.x[1].data[i - 1] === year) {
              tempArr[yusuanData.x[2].data[i - 1]] = parseFloat(
                yusuanData.y[0].data[i - 1]
              ).toFixed(2);
              totalYu += parseFloat(yusuanData.y[0].data[i - 1]);
            }
          }

          for (let i = 0, item; (item = tempData[0].data[i++]); ) {
            if (
              item === this.curPro &&
              tempData[1].data[i - 1] === year &&
              tempData[2].data[i - 1] === month
            ) {
              let perBedget = tempArr[tempData[3].data[i - 1]],
                finish = parseFloat(data.y[0].data[i - 1]).toFixed(2),
                unfinish = (perBedget - finish).toFixed(2),
                schedule = ((finish / perBedget) * 100).toFixed(2) + "%",
                unfinishPerc =
                  (((perBedget - finish) / totalYu) * 100).toFixed(2) + "%";
              let tempY = [
                index,
                tempData[3].data[i - 1],
                perBedget,
                finish,
                unfinish,
                schedule,
                unfinishPerc
              ];
              index++;
              yAxis.push(tempY);
            }
          }
          setTimeout(() => {
            this.modalData = {
              left1Modal2: {
                type: "type1",
                visible: true,
                keys: "left1Modal2",
                zIndex: 21,
                data: {
                  xAxis: xAxis,
                  yAxis: yAxis,
                  align: align
                }
              }
            };
          }, 300);
        }
      });
    },
    // 左二的实例化
    initSecondChart(id, data, curPro) {
      if (!data || JSON.stringify(data) == '"{}"') return;
      // data = {};
      let myCharts = this.$echarts.init(document.getElementById(id));
      let that = this;
      // let showAxis = ["0.2", "0.5", "0.7", "1.0"];
      myCharts.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
          // formatter: "{b}<br />{a0}: {c0}",
          formatter: function(params, value) {
            return (
              "预算值：" +
              ((that.filter.yusuan / 12) * parseInt(params[0].name)).toFixed(
                2
              ) +
              "</br> 完成值： " +
              parseFloat(params[0].value).toFixed(2) +
              "</br> 完成比率： " +
              (
                (((that.filter.yusuan / 12) * parseInt(params[0].name)) /
                  params[0].value) *
                100
              ).toFixed(2) +
              "%"
            );
          },
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          backgroundColor: "rgba(70,130,180,0.8)",
          borderColor: "rgba(47,79,79,1)",
          borderWidth: 1,
          padding: [12, 24],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 52
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          top: "10%",
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: {
          //图例组件，颜色和名字
          right: "3%",
          top: "3%",
          itemGap: 64,
          itemWidth: 44,
          itemHeight: 14,
          data: [
            {
              name: data.y ? data.y[0].name : "预算值",
              icon: "rect"
              //icon:'image://../wwwroot/js/url2.png', //路径
            }
          ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 56
          }
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: data.x
              ? data.x[0].data
              : [
                  "22:18",
                  "22:23",
                  "22:25",
                  "22:28",
                  "22:30",
                  "22:33",
                  "22:35",
                  "22:40",
                  "22:18",
                  "22:23",
                  "22:25"
                ],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 52
              },
              formatter: function(value) {
                return value;
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            // min: 0,
            // max: this.filter.yusuan,
            splitNumber: 5,
            // interval: this.filter.yusuan / 10,
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 52
              // formatter: function(value) {
              //   if (
              //     showAxis.includes((value / that.filter.yusuan).toFixed(1))
              //   ) {
              //     return ((value / that.filter.yusuan) * 100).toFixed(0) + "%";
              //   } else {
              //     return "";
              //   }
              // }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFF"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                width: 4,
                color: "rgba(255,255,255,0.4)"
              }
            }
          }
        ],
        series: [
          {
            name: data.y ? data.y[0].name : "预算值",
            type: "line",
            data: data.y
              ? data.y[0].data
              : [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60],
            smooth: 0.5,
            symbolSize: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                width: 12
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(24,40,255,1)",
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,244,255,1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,77,167,1)" // 100% 处的颜色
                    }
                  ],
                  false
                ),

                shadowColor: "rgba(0,160,221,1)"
              }
            },
            markLine: {
              symbol: "none",
              silent: true,
              lineStyle: {
                normal: {
                  type: "dashed"
                }
              },
              label: {
                position: "start"
              },
              data: [
                {
                  yAxis: this.filter.yusuan,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "red"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "100%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.7,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,127,80,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "70%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.5,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,215,0,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "50%";
                    }
                  }
                },
                {
                  yAxis: this.filter.yusuan * 0.2,
                  lineStyle: {
                    width: 6.6560000000000001,
                    color: "rgba(255,228,181,1)"
                  },
                  label: {
                    show: true,
                    position: "",
                    textStyle: {
                      fontSize: 58
                    },
                    formatter: function(value) {
                      return "20%";
                    }
                  }
                }
              ]
            }
          }
        ]
      });

      //  线图点击较为麻烦
      myCharts.getZr().on("click", params => {
        let pointInPixel = [params.offsetX, params.offsetY];
        if (myCharts.containPixel("grid", pointInPixel)) {
          /*此处添加具体执行代码*/

          let pointInGrid = myCharts.convertFromPixel(
            { seriesIndex: 0 },
            pointInPixel
          );
          //X轴序号
          let xIndex = pointInGrid[0];

          //获取当前图表的option
          let op = myCharts.getOption();

          //获得图表中我们想要的数据
          let month = op.xAxis[0].data[xIndex];
          let type = that.filter.type;

          let data = this.$store.state.screenSecondData.left2Aux2;

          let align = [];
          for (var i in 8) {
            align.push("center");
          }
          let xAxis = [
            "序号",
            "项目单位名称",
            "项目编码",
            "项目名称",
            "年度计划额",
            "年度执行额",
            "执行进度",
            "计划与执行偏差额"
          ];
          let yAxis = [];
          let tempData = data.x;
          let index = 1;
          for (let i = 0, item; (item = tempData[0].data[i++]); ) {
            if (
              item === this.curPro &&
              tempData[1].data[i - 1] === type &&
              tempData[2].data[i - 1] === month
            ) {
              let perBedget = parseFloat(that.filter.yusuan).toFixed(2),
                finish = parseFloat(data.y[0].data[i - 1]).toFixed(2),
                unfinish = (perBedget - finish).toFixed(2),
                schedule = ((finish / perBedget) * 100).toFixed(2) + "%";
              let tempY = [
                index,
                this.curPro,
                tempData[3].data[i - 1],
                tempData[4].data[i - 1],
                perBedget,
                finish,
                schedule,
                unfinish
              ];
              index++;
              yAxis.push(tempY);
            }
          }
          setTimeout(() => {
            this.modalData = {
              left1Modal2: {
                type: "type1",
                visible: true,
                keys: "left1Modal2",
                zIndex: 21,
                data: {
                  xAxis: xAxis,
                  yAxis: yAxis,
                  align: align
                }
              }
            };
          }, 300);
        }
      });
    }
  },
  watch: {
    modalData: function(newValue) {
      this.selectElement = document.getElementById(this.id);
      this.selectElement.style.left = "10%";
      this.selectElement.style.top = "20%";
      this.visibility = newValue[this.keys].visible;
      if (this.visibility) {
        this.initTable();
      }
    },
    data: function(newVal) {
      this.initTable();
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  position: absolute;
  height: 0;
  width: 0;
  border: 1px;
  // z-index: 20;
  top: 20%;
  left: 10%;
  border-radius: 2px;

  opacity: 0;
  transform: rotate(0.5turn);
  -webkit-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -moz-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -ms-transition: all 0.8s ease-in-out, left 0s, top 0s;
  -o-transition: all 0.8s ease-in-out, left 0s, top 0s;
  transition: all 0.8s ease-in-out, left 0s, top 0s;
  border-radius: 34px;
  box-shadow: rgba(0, 0, 0, 1) 0px -30px 10px;
}
// .singlemove {
//   -webkit-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -moz-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -ms-transition: width 0.8s ease-out, height 0.8s ease-out,
//     opacity 0.4s ease-in, visibility 0.4s ease-in;
//   -o-transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
//     visibility 0.4s ease-in;
//   transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.4s ease-in,
//     visibility 0.4s ease-in;
// }
.trans {
  opacity: 1;
  height: 2500px;
  width: 6000px;
  transform: rotate(0);
}
.dialog-footer {
  text-align: right;
}

.el-main {
  font-size: 20px;
  color: #fff;
  border-radius: 34px;
  padding: 78px;
  background: rgba(45, 100, 121, 1);
}

.el-footer {
  background-color: white;
}

.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<style lang="less">
.chart-div {
  height: 100%;
  width: 100%;
}
.el-table {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 54px;

  thead {
    color: rgba(255, 255, 255, 0.8);
  }
  .header-row {
    background-color: rgba(15, 67, 97, 0.4);
    height: 78px;
    line-height: 78px;
    .cell {
      text-align: center;
      line-height: 78px;
    }
    th.is-leaf {
      border-bottom: 0;
    }
  }
  .odd-row {
    background: rgba(50, 218, 255, 0.1);
  }
  .even-row {
    background: rgba(15, 67, 97, 0.4);
  }
  .el-table__row {
    height: 78px;
    line-height: 78px;
    .cell {
      text-align: center;
      line-height: 78px;
    }
  }
  td {
    border-bottom: 0;
  }
  &::before {
    background-color: rgba(0, 0, 0, 0);
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0);
}
.dv-scroll-board {
  .header {
    font-size: 48px;
  }
  .header-item {
    font-size: 54px;
    font-weight: bold;
  }
  .rows {
    .row-item {
      height: 150px !important;
      line-height: 150px !important;
      font-size: 56px;
    }
  }
}
.cover-div {
  position: absolute;
  left: 0;
  top: 0;
  width: 7680px;
  height: 4320px;
  z-index: 18;
  background: url("../../assets/images/masking.png") no-repeat;
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>