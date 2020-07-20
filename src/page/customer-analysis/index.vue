<template>
<div class="container">
  <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
  <triangle />
  <v-bar :ids='id' :chartData='chartData' />
  <line-chart :ids='idB' :chartData='chartDataB' />
  <div class="echarts w100" id="echarts10"></div>
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import Bar from '../../components/barThird.vue';
import LineChart from '../../components/line-chart/lineChart.vue';
import Triangle from '../../components/triangle.vue'
export default {
  data() {
    return {
      filterParams: {
        org: [
          { key: "1", value: "鼓楼支行" },
          { key: "2", value: "江宁区支行" },
          { key: "3", value: "建邺区支行" },
          { key: "4", value: "浦口区支行" },
          { key: "5", value: "六合区支行" },
          { key: "6", value: "雨花台支行" }
        ],
        time: [
          { key: "01", value: "2019年01月25日" },
          { key: "02", value: "2019年02月25日" },
          { key: "03", value: "2019年03月25日" },
          { key: "04", value: "2019年04月25日" },
          { key: "05", value: "2019年05月25日" },
          { key: "06", value: "2019年06月25日" }
        ],
        customType: [
          { key: "01", value: "有效结算客户" },
          { key: "02", value: "考核客户" },
          { key: "03", value: "已准入无贷户客户" },
        ],
        industry: [
          { key: "01", value: "金融业" },
          { key: "02", value: "服装制造业" },
          { key: "03", value: "房地产开发业" },
        ],
        scale: [
          { key: "01", value: "大中型企业" },
          { key: "02", value: "小型企业" },
        ],
      },
      id: [ {id:'echarts01'}, {id:'echarts02'}, {id:'echarts03'} ],
      idB: [ {id:'echarts04'}, {id:'echarts05'}],
      // 单轴图数据
       chartData: [{
          chartName: '客户活跃度分布情况',
          type: 'line',
          legend: [],
          noCompany: true,
          DrillDown: true
        },
        {
          chartName: '客户活期日均分布情况',
          type: 'line',
          legend: [],
          noCompany: true,
          DrillDown: true
        },
        {
          chartName: '客户行业分布情况',
          type: 'line',
          legend: [],
          noCompany: true,
          DrillDown: true
        },
      ],
      // 折线数据
      chartDataB: [{
          chartName: '公司客户变动趋势',
          type: 'line',
          DrillDown: true,
          filterParams:['time'],
          legend:[{
              name: "公司客户",
              icon: "circle"
            },{
              name: "有效结算客户",
              icon: "circle"
            },
          ]
        },
        {
          chartName: '交易银行有效客户数、考核客户变动趋势图',
          type: 'line',
          DrillDown: true,
          filterParams:['time'],
          legend:[{
              name: "交易银行有效客户",
              icon: "circle"
            },{
              name: "交易银行考核客户",
              icon: "circle"
            },
          ]
        }
      ]
    }
  },
  mounted() {
    let a = {
      chartName: "有效结算客户新增流失客户分析",
      DrillDown: true,
      filterParams:['time'],
      legend: [{
              name: "净增客户数",
              icon: "roundRect"
            },{
              name: "新增客户数",
              icon: "roundRect"
            },
            {
              name: "流失客户数",
              icon: "roundRect"
            }]
    }
    this.drawLineA('echarts10',a)
  },
  methods: {
    getMsgFormSon(data) {
      this.msgFormSon = data;
    },
    // 针对三种图例 legend.length = 3
    drawLineA(id, data) {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "贷款客户数和余额趋势";
      var b = data.filterParams.indexOf('time') > -1 ?"2019年01月25日":'';
      myChart.setOption({
        title: {
          text: [data.DrillDown?`{c|}`:'',`{a|${a}  }`, `{b|${b}}`].join(""),
          triggerEvent: true,
          textStyle: {
            rich: {
              c: {
                backgroundColor: {
                  image: require("../../assets/images/DrillDown.svg")
                },
                height: 20,
                width: 20
              },
              b: {
                color: "gray",
                fontSize: "14",
              }
            }
          }
        },
        color: ["#0078d7", "#e5b322", "#85bc22"],
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          data: data.legend ||  [{
              name: "贷款余额",
              icon: "circle"
            },
            {
              name: "全行贷款余额",
              icon: "roundRect"
            },
            {
              name: "贷款客户数",
              icon: "roundRect"
            }
          ],
          itemHeight: 8,
          itemWidth : 8,
          align: "left",
          top: 30,
          
        },
        tooltip: {
          trigger: "axis",
          formatter: function (option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0 ?
                '<span style="color:#000">' +
                option[i].name +
                "</span>" +
                "<br/>" +
                `<span style="color: ${option[i].color}" >` +
                option[i].seriesName +
                ": " +
                option[i].value +
                "亿" +
                "</span>" +
                "<br/>" :
                `<span style="color: ${option[i].color}" >` +
                option[i].seriesName +
                ": " +
                option[i].value +
                "亿</span>" +
                "<br/>";
            }
            return str + "</div>";
          }
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          top: 60,
          bottom: 20,
          left: "10%",
          right: "10%",
          borderWidth: 1,
        },
        xAxis: {
          axisLabel:{ //刻度标签文字的颜色
            show: true,
            color:'#666'
          },
          axisLine: {
            lineStyle: {
              color: '#666',
            }
          },
          data: data.xAxis || [
            "2018年1月",
            "2018年2月",
            "2018年3月",
            "2018年4月",
            "2018年5月",
            "2018年6月"
          ]
        },
        yAxis: [{
            name: data.legend &&data.legend[0].name||"贷款余额",
            // nameRotate: 90,
            // nameLocation: "middle",
            // nameGap: "40",
            nameTextStyle: {
              label: {
                formatter: function (value) {
                  return '{a|}'+'{' + value + '| }';
                },
                rich: {
                  a: {
                    width: 20,
                    height: 20,
                    display: 'inline-block',
                    backgroundColor: {
                      image: require('../../assets/images/GD.svg')
                    }
                  }
                }
              },
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value}亿"
            }
          },
          {
            name: data.legend &&data.legend[2].name|| "贷款客户数",
            // nameRotate: 270,
            // nameLocation: "middle",
            // nameGap: "40",
            
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value}k"
            }
          }
        ],
        series: [{
            name: data.legend &&data.legend[0].name|| "贷款余额",
            type: "bar",
            label: {
              normal: {
                show: true,
                color: "#fff",
                formatter: "{c}亿"
              }
            },
            data: ["5", "20", "36", "10", "10", "20"]
          },
          {
            name: data.legend &&data.legend[1].name||"全行贷款余额",
            type: "line",
            label: {
              show: true,
              color: "#666",
              formatter: "{c}亿"
            },
            data: ["7", "22", "46", "40", "20", "30"]
          },
          {
            name: data.legend &&data.legend[2].name||"贷款客户数",
            type: "line",
            label: {
              show: true,
              color: "#666",
              formatter: "{c}亿"
            },
            yAxisIndex: 1,
            data: ["50", "200", "360", "100", "100", "200"]
          }
        ]
      });
      myChart.on("click", function(params) {
          if( !_this.echartState[id].chartData.DrillDown ) {
            return
          }
          if (params.componentType === "title" && _this.echartState[id].state) {
            _this.drawLineA(id, _this.echartState[id].chartData);
            _this.changeEchartState(id);
            return;
          } else if (_this.echartState[id].state) {
            // 阻止重复下钻
            return;
          } else if (
            params.componentType !== "title" &&
            !_this.echartState[id].state
          ) {
            // 下钻
            _this.getNextData(id, params, data);
            _this.changeEchartState(id);
          }
      });
    },
  },
  components: {
    "v-filter": Filter,
    'v-bar': Bar,
    'triangle': Triangle,
    'line-chart': LineChart,
  }
}
</script>
