<template>
  <div class="enterprise-loan">
    <div class="cloud-content enterprise-div">
      <div class="content-title">
        <span class="first-text-span">小微企业贷款</span>
        <loan-chart v-if="bubbleJudge" :chartData="currentBubbleData" />
      </div>
    </div>
    <div class="enterprise-atlas enterprise-div enterprise-content">
      <div class="second-title">
        <span class="text-span">企业信用</span>
        <credit-chart :chartData="creditData" v-if="creditJudge" />
      </div>
    </div>
    <div class="enterprise-credit enterprise-div enterprise-content">
      <div class="second-title">
        <span class="text-span">企业图谱</span>
      </div>
      <div id="graph"></div>
    </div>
  </div>
</template>

<script>
import LoanChart from "@/components/second-screen/loanChart";
import CreditChart from "@/components/second-screen/creditChart";
import * as basebox from "@/assets/base64.js";
export default {
  name: "",
  props: [],
  data() {
    return {
      bubbleInterval: undefined,
      bubbleData: [],
      currentBubbleData: [],
      bubbleJudge: false,
      creditJudge: false,
      creditData: [],
      bubbleIndex: 0
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getBubbleData();
    },
    getGraphData(name) {
      var that = this;
      let url = "/api/p2/cmpGraph?company=" + name;
      this.axios({
        url: url,
        method: "get",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var graphData = data.data.data.graph;
          var root = data.data.data.company;
          if (graphData == null) return;

          // 数组去重，否则会报错
          let hash = {};
          graphData.vertices = graphData.vertices.reduce((preVal, curVal) => {
            hash[curVal.name]
              ? ""
              : (hash[curVal.name] = true && preVal.push(curVal));
            return preVal;
          }, []);
          let hash2 = {};
          graphData.edges = graphData.edges.reduce((preVal, curVal) => {
            hash2[curVal.from + "-" + curVal.to]
              ? ""
              : (hash2[curVal.from + "-" + curVal.to] =
                  true && preVal.push(curVal));
            return preVal;
          }, []);

          this.drawGraph(root, graphData);
          this.drawThree(data.data.data);
        }
      });
    },
    getY(x) {
      let y = Math.sqrt((1 - Math.pow(x / 38, 2)) * Math.pow(30, 2));
      return y;
    },
    getOutY(x) {
      let y = Math.sqrt((1 - Math.pow(x / 50, 2)) * Math.pow(42, 2));
      return y;
    },
    translate(root, list) {
      let randomData = [],
        randomDataY = [];
      for (var i = -200; i <= 200; i++) {
        randomData.push(i);
      }
      for (var j = -50; j <= 50; j++) {
        randomDataY.push(j);
      }

      let arr = [],
        length = list.vertices.length;
      list.vertices.forEach((it, i) => {
        arr.push({
          name: it.name,
          type: it.type,
          itemStyle: {
            normal: {
              color: it.type === "person" ? "#ccc" : "#67375C"
            }
          },
          x: it.root
            ? 0
            : this.getRondan("x", randomData, randomDataY, i, list.vertices),
          y: it.root
            ? 0
            : this.getRondan("y", randomData, randomDataY, i, list.vertices)
        });
      });
      return arr;
    },
    getRondan(type, randomData, randomDataY, i, list) {
      if (i === 1) {
        return type === "x" ? -200 : -50;
      } else if (i === list.length - 1) {
        return type === "x" ? 200 : 50;
      }
      // let n = 0
      // var num =  () => {
      //   n  = Math.round(-200 * (Math.random() / 1.5)) + 200;
      // }
      // if(type === 'x' && Math.abs(n-50) < 100) {
      //   num()
      // }else if (type === 'y' && Math.abs(n-100) < 400) {
      //   num()
      // }
      return type === "x"
        ? randomData[Math.floor(Math.random() * randomData.length)]
        : randomDataY[Math.floor(Math.random() * randomDataY.length)];
    },
    dataLink(list) {
      let arr = [];
      list.edges.forEach((it, i) => {
        arr.push({
          source: it.from,
          value: it.type,
          target: it.to,
          itemStyle: {
            normal: {
              color: "#fff"
            }
          }
        });
      });
      return arr;
    },
    drawGraph(root, graphData) {
      let a = this.translate(root, graphData);
      let b = this.dataLink(graphData);
      let myChart = this.$echarts.init(document.getElementById("graph"));
      let option = {
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          show: false,
          type: "value"
        },
        grid: {
          left: "50%",
          right: "50%"
        },
        tooltip: {
          formatter: "{b}"
        },
        series: [
          {
            type: "graph",
            layout: "none",
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [0, 20],
            draggable: true,
            edgeLabel: {
              normal: {
                show: true,
                position: "middle",
                textStyle: {
                  fontSize: 14
                },
                formatter: "{c}"
              }
            },
            toam: true,
            zoom: 0.9,
            focusNodeAdjacency: true, // 指定的节点以及其所有邻接节点高亮
            roam: false, // 是否可拖拽

            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none",
                color: "#fff",
                curveness: 0.1
              }
            },
            symbolSize: [30, 30],
            // symbol: "circle",
            label: {
              show: true,
              position: "bottom",
              color: "#ccc",
              formatter: function(params) {
                let c = params.data.username || "";
                let b =
                  params.data.type === "person"
                    ? params.data.name.slice(0, 1) + "**"
                    : params.data.name;
                var str = "";
                if (c === "") {
                  str = "{p|" + b + "}";
                } else {
                  str = "{n|" + c + "}\n{p|" + b + "}";
                }
                return str;
              },
              rich: {
                p: {
                  fontSize: 14,
                  color: "#ccc",
                  align: "center"
                },
                n: {
                  height: 25,
                  fontSize: 16,
                  color: "#ccc",
                  align: "center"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#F2F2F2",
                borderColor: "#707070",
                borderWidth: 2
              }
            },
            data: a,
            links: b
          }
        ]
      };
      myChart.setOption(option);
    },
    drawThree(list) {
      var graphData = list;
      var sxjeData = graphData.sxje;
      let tmpData = [];
      tmpData.push({
        value: [
          sxjeData.basicinfo,
          sxjeData.jyfx,
          sxjeData.nsxy,
          sxjeData.rzqk,
          sxjeData.ylnl,
          sxjeData.zczj
        ],
        name: sxjeData.companyname
      });
      this.creditData = [...tmpData];
      this.$nextTick(() => {
        this.creditJudge = true;
      });
    },
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
    getBubbleData() {
      var that = this;
      this.axios({
        url: "/api/p2/creditAmount",
        method: "get",
        data: "",
        type: "json"
      }).then(data => {
        if (data.data.code === 100) {
          var tmpData = data.data.data;
          if (tmpData == null) return;
          that.bubbleData = tmpData.map(item => {
            return {
              name: item.companyname,
              value: that.thousandFormat(item.credit, 2),
              symbolSize: Math.floor(Math.random() * 100) + 80,
              // symbol: `image://${require("@/assets/images/p2/loan" +
              //   (Math.floor(Math.random() * 5) + 1) +
              //   ".svg")}`,
              symbol: `image://${require("@/assets/images/p2/loan5.svg")}`,
              draggable: true
            };
          });
          // that.bubbleData = tmpData
          that.$nextTick(() => {
            // that.bubbleJudge = true;
            that.rollBubbleHandler();
          });
        }
      });
    },
    rollBubbleHandler() {
      var that = this;
      // var index = 0;
      // if (bubbleInterval) clearInterval(bubbleInterval);
      this.rollBubble(this, this.bubbleIndex);
      this.bubbleInterval = setInterval(
        () => {
          //   if (index === that.bubbleData.length) index = 0;
          //   that.currentBubbleData = [];
          //   that.currentBubbleData.push(that.bubbleData[index]);
          //   let company = that.currentBubbleData[0].name;
          //   this.getGraphData(company);
          //   index++;
          //   that.$nextTick(() => {
          //     that.bubbleJudge = true;
          //   });
          this.rollBubble(that);
        },
        5000,
        that
      );
      // this.bubbleData;
    },
    rollBubble(that) {
      if (that.bubbleIndex === that.bubbleData.length) {
        that.bubbleIndex = 0;
        that.currentBubbleData = [];
      }
      that.currentBubbleData = [...that.bubbleData];
      that.currentBubbleData.forEach((item, index) => {
        that.currentBubbleData[
          index
        ].symbol = `image://${require("@/assets/images/p2/loan5.svg")}`;
      });
      that.currentBubbleData[
        this.bubbleIndex
      ].symbol = `image://${require("@/assets/images/p2/loan4.svg")}`;
      // that.currentBubbleData.push(that.bubbleData[that.bubbleIndex]);
      let company = that.currentBubbleData[this.bubbleIndex].name;
      this.getGraphData(company);
      that.bubbleIndex++;
      that.$nextTick(() => {
        that.bubbleJudge = true;
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.bubbleInterval);
  },
  components: {
    LoanChart,
    CreditChart
  }
};
</script>

<style lang="less">
.enterprise-loan {
  .enterprise-div {
    width: 100%;
    height: 32%;
    margin-bottom: 1%;
    padding: 1.7% 1.97%;
    .second-title {
      width: 100%;
      height: 9.22%;
      font-size: 24px;
      background: url("../../assets/images/title4-backup.png") no-repeat;
      background-size: 20% 100%;
    }
  }
  .cloud-content {
    .content-title {
      width: 100%;
      height: 12.96%;
      background: url("../../assets/images/bg-content-title.png") no-repeat;
      background-size: 100% 100%;
      padding-left: 4.64%;
      margin-bottom: 2%;
      line-height: 220%;
    }
  }
  .enterprise-content {
    padding: 0 4%;
  }
  .text-span {
    display: inline-block;
    margin-left: 4%;
  }
  #graph {
    height: 80%;
  }
}
</style>
