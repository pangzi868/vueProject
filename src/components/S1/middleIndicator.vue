<template>
  <div class="middle-indicator">
    <div class="indicator-left indicator-div">
      <div v-for="(item ,index) in leftIn" :key="index" class="single-indicator">
        <div class="in-name">{{item.name}}</div>
        <div class="in-bottom">
          <div :id="item.id" class="in-chart"></div>
          <div class="in-bottom-right">
            <div v-for="(items, indexs) in item.inName" :key="indexs" class="single-bottom-right">
              <span class="single-title">{{items}}</span>
              <span class="single-value">
                {{ item.id === 'excutive' ?
                projectCondition&&item.inNameEng[index] ? projectCondition[item.inNameEng[indexs]] : 0
                : projectPerson&&item.inNameEng[index] ? projectPerson[item.inNameEng[indexs]] : 0}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-span">
      <div class="middle-title">增收节支金额</div>
      <div
        class="middle-value middle-interval"
      >{{projectMiddle['increment'] ? projectMiddle['increment'] + '万元' : '0万元'}}</div>
      <div class="middle-title">减少损失浪费</div>
      <div class="middle-value">{{projectMiddle['reduce'] ? projectMiddle['reduce'] + '万元' : '0万元'}}</div>
    </div>
    <div class="indicator-right indicator-div">
      <div v-for="(item ,index) in rightIn" :key="index" class="single-indicator">
        <div class="in-name">{{item.name}}</div>
        <div class="in-bottom">
          <div :id="item.id" class="in-chart"></div>
          <div class="in-bottom-right">
            <div v-for="(items, indexs) in item.inName" :key="indexs" class="single-bottom-right">
              <span class="single-title">{{items}}</span>
              <span
                class="single-value"
              >{{projectIssue&&item.inNameEng[index] ? projectIssue[item.inNameEng[indexs]] : 0}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {
    this.init();
  },
  data() {
    return {
      leftIn: [
        {
          id: "excutive",
          name: "审计项目执行情况",
          inName: ["已结", "实施", "未启"],
          inNameEng: ["done", "doing", "beDoing"]
        },
        {
          id: "putIn",
          name: "审计人员投入情况",
          inName: ["专职人", "兼职人", "其他人"],
          inNameEng: ["all", "part", "else"]
        }
      ],
      rightIn: [
        {
          id: "budget",
          name: "审计费用预算分析",
          inName: ["费用发生", "年度预算"],
          inNameEng: ["happen", "budget"]
        },
        {
          id: "change",
          name: "审计问题整改情况",
          inName: ["整改完", "未整改"],
          inNameEng: ["done", "beDoing"]
        }
      ]
    };
  },
  computed: {
    // 审计项目
    projectCondition: {
      get: function() {
        return this.$store.state.projectCondition;
      },
      set: function(newVal) {
        this.$store.commit("newProjectCondition", newVal);
      }
    },
    // 审计问题
    projectIssue: {
      get: function() {
        return this.$store.state.projectIssue;
      },
      set: function(newVal) {
        this.$store.commit("newProjectIssue", newVal);
      }
    },
    // 审计人员
    projectPerson: {
      get: function() {
        return this.$store.state.projectPerson;
      },
      set: function(newVal) {
        this.$store.commit("newProjectPerson", newVal);
      }
    },
    // 增收减少
    projectMiddle: {
      get: function() {
        return this.$store.state.projectMiddle;
      },
      set: function(newVal) {
        this.$store.commit("newProjectMiddle", newVal);
      }
    }
  },
  methods: {
    init() {
      let temp = this.leftIn.concat(this.rightIn);
      for (var i in temp) {
        if (temp[i].id === "excutive") {
          this.initChart(
            temp[i].id,
            (
              (Number(this.projectCondition.doing) /
                Number(this.projectCondition.total || 1)) *
              100
            ).toFixed(0)
          );
        } else if (temp[i].id === "change") {
          this.initChart(
            temp[i].id,
            (
              (Number(this.projectIssue.done) /
                Number(this.projectIssue.total || 1)) *
              100
            ).toFixed(0)
          );
        } else if (temp[i].id === "putIn") {
          this.initChart(
            temp[i].id,
            (
              (Number(this.projectPerson.all) /
                Number(this.projectPerson.total || 1)) *
              100
            ).toFixed(0)
          );
        } else {
          this.initChart(temp[i].id, 40);
        }
        // this.initChart(temp[i].id, this.chartData[temp[i].id]);
      }
    },
    initChart(id, value) {
      let myEcharts = this.$echarts.init(document.getElementById(id));
      var maxValue = 100;
      var colorReMain = "rgba(255, 255, 255, 0.3)";
      var color = "rgba(235,117,26,1)";

      var percent = (value * 100) / maxValue;
      myEcharts.setOption({
        series: [
          {
            type: "pie",
            radius: [90, 114],
            center: ["50%", "50%"],
            hoverAnimation: false,
            clockwise: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                name: "remainCircle", // 开始的圆角
                value: 0,
                itemStyle: {
                  color: color
                },
                label: {
                  show: true,
                  position: "inside",
                  padding: [6, 0, 0, 0],
                  borderRadius: 30,
                  rich: {
                    name: {
                      // 宽度为14
                      width: 24,
                      height: 24,
                      borderRadius: 10,
                      backgroundColor: color
                    }
                  },
                  formatter() {
                    return `{name|}`;
                  }
                }
              },
              {
                name: "remain",
                value: 100 - value,
                itemStyle: {
                  borderColor: colorReMain,
                  borderWidth: 0,
                  color: colorReMain
                },
                label: {
                  show: false
                },
                emphasis: {
                  itemStyle: {
                    borderColor: colorReMain,
                    borderWidth: 0,
                    color: colorReMain
                  }
                }
              },
              {
                name: "remainCircle", // 结束的圆角
                value: 0,
                curVal: value,
                label: {
                  show: true,
                  rotate: true,
                  position: "inside",
                  borderRadius: 30,
                  rich: {
                    margin: {
                      width: 6
                    },
                    name: {
                      width: 24,
                      height: 24,
                      borderRadius: 10,
                      backgroundColor: color
                    }
                  },
                  formatter: percent
                    ? percent < 50
                      ? "{name|}{margin|}"
                      : "{margin|}{name|}"
                    : ""
                }
              },
              {
                name: "情况",
                value: value,
                itemStyle: {
                  color: color
                },
                label: {
                  show: true,
                  position: "center",
                  rich: {
                    num: {
                      fontSize: 60,
                      color: "#FFF",
                      padding: [5, 0, 0, 0]
                    }
                  },
                  formatter(params) {
                    return `{num|${params.value + "%"}}`;
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },
  components: {},
  watch: {
    projectCondition: function(newVal) {
      this.init();
    },
    projectIssue: function(newVal) {
      this.init();
    },
    projectPerson: function(newVal) {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.middle-span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 440px;
  height: 388px;
  text-align: center;
  background: rgba(15, 67, 97, 0.6);
  padding: 28px 52px;
  .middle-title {
    color: rgba(255, 255, 255, 1);
    font-family: Microsoft YaHei;
    font-weight: regular;
    font-size: 56px;
    line-height: 44px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }
  .middle-value {
    color: rgba(0, 255, 163, 1);
    font-family: Google Sans;
    font-weight: bold;
    font-size: 56px;
    line-height: 80px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }

  .middle-interval {
    margin-bottom: 40px;
  }
}
.indicator-div {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 44%;
  height: 100%;
  padding: 58px 68px;
  font-size: 56px;
  color: rgba(255, 255, 255, 1);
  .single-indicator {
    width: 46%;
    height: 100%;
    padding-left: 1%;
    .in-bottom {
      display: flex;
    }
    .in-chart {
      display: inline-block;
      width: 300px;
      height: 270px;
    }
    .in-bottom-right {
      display: flex;
      height: 270px;
      width: 430px;
      flex-direction: column;
      justify-content: space-around;
      .single-bottom-right {
        width: 430px;
        text-align: center;
        .single-title {
          display: inline-block;
        }
        .single-value {
          display: inline-block;
        }
      }
    }
  }
}
.single-title {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 30px;
}
.indicator-right {
  left: 56%;
}
</style>
