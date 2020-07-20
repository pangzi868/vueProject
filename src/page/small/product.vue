<template>
<div class="small-product container">
    <v-filter :filterParams="filterParams" @func="getMsgFormSon"></v-filter>
    <v-bar :ids='id' :chartData='getChartData' />
    <div class="table echarts w100">
      <div class="table-title">
        <span style="font-size: 18px;color: #333;fontWeight:600">产品定价</span>
        <span style="color: gray;padding: 0 10px">{{filterData}}</span>
      </div>
      <a-table
        :bordered="true"
        :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :loading="loading"
        @change="handleTableChange"
      >
      </a-table>
    </div>
    <v-cicle :ids='idB' :chartData='getChartDataB' />
</div>
</template>

<script>
import Filter from "../../components/filter/Filter.vue";
import Bar from "../../components/barThird.vue";
import Cicle from "../../components/circle.vue";
const columns = [
  {
    title: "分行机构号",
    dataIndex: "number",
    sorter: true,
    class: "tab-head",
    align: "center",
    width: "20%"
  },
  {
    title: "分行机构名称",
    align: "center",
    dataIndex: "name",
    width: "20%"
  },
  {
    title: "平均累放利率",
    align: "center",
    dataIndex: "total"
  },
  {
    title: "平均投放利率",
    align: "center",
    dataIndex: "send"
  }
];
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      allData: [
        {
          chartName: "累放额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "累放客户数",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "余额",
          money: Math.floor(Math.random() * 100000)
        },
        {
          chartName: "有余客户数",
          money: Math.floor(Math.random() * 100000)
        }
      ],
      id: [
        { id: "echarts01" },
        { id: "echarts02" },
        { id: "echarts03" },
        { id: "echarts04" }
      ],
      allDataB: [
        {
          chartName: "五级分类投放余额",
          filterParams:['time'],
          legend: [
            {
              name: "正常",
              icon: "circle"
            },
            {
              name: "次级",
              icon: "circle"
            },
            {
              name: "损失",
              icon: "circle"
            },
            {
              name: "关注",
              icon: "circle"
            },
            {
              name: "可疑",
              icon: "circle"
            },
          ],
        },
        {
          chartName: "五级分类累放余额",
          filterParams:['time'],
          legend: [
            {
              name: "正常",
              icon: "circle"
            },
            {
              name: "次级",
              icon: "circle"
            },
            {
              name: "损失",
              icon: "circle"
            },
            {
              name: "关注",
              icon: "circle"
            },
            {
              name: "可疑",
              icon: "circle"
            },
          ],
        }
      ],
      idB: [{ width: "w50", id: "echarts05" },
        { width: "w50", id: "echarts06" }],
      filterData: "2019年01月25日",
      data: [],
      loading: false,
      columns,
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
        product:[
          { key: "1", value: "建筑类" },
          { key: "2", value: "可食用类" },
          { key: "3", value: "能源类" },
        ]
      }
    };
  },
  computed: {
    getChartData() {
      return this.id.reduce((pre, item, index) => {
        pre.push(this.allData[index]);
        return pre;
      }, []);
    },
    getChartDataB() {
      return this.idB.reduce((pre, item, index) => {
        pre.push(this.allDataB[index]);
        return pre;
      }, []);
    },
    getChartDataC() {
      return this.idC.reduce((pre, item, index) => {
        pre.push(this.allDataC[index]);
        return pre;
      }, []);
    }
  },
  methods: {
    drawLineC(ele, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(ele));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = "2019年01月25日";
      // 柱状图 无legend
      myChart.setOption({
        title: {
          text: [`{a|${a}  }`, `{b|${b}}`].join(""),
          textStyle: {
            rich: {
              b: {
                color: "gray",
                fontSize: "14"
              }
            }
          },
          itemGap: 10,
          margin: 10,
          subtext: ["{b|8,676}", "{c|总计}"].join("\n"),
          subtextStyle: {
            rich: {
              b: {
                color: "gray",
                fontSize: "34",
                fontFamily: "",
                fontWeight: "100"
              },
              c: {
                color: "gray",
                fontSize: "14"
              }
            }
          }
        },
        color: ["#0078d7", "#e5b322"],
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0
                  ? '<span style="color:#000">' +
                    option[i].name +
                    "</span>" +
                    "<br/>" +
                    `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "k" +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "k</span>";
            }
            return str + "</div>";
          }
        },
        grid: {
          top: 160,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          axisLabel: {
            //刻度标签文字的颜色
            show: true,
            color: "#666",
            rotate: 45
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          data: [
            "2018年1月",
            "2018年2月",
            "2018年3月",
            "2018年4月",
            "2018年5月",
            "2018年6月",
            "2018年7月",
            "2018年8月",
            "2018年9月",
            "2018年10月",
            "2018年11月"
          ]
        },
        yAxis: {
          name: "客户数",
          nameGap: "80",
          nameTextStyle: {
            width: "200",
            height: "200",
            backgroundColor: {
              image: "../assets/images/logo.png"
            }
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
            formatter: "{value}k"
          }
        },
        series: [
          {
            name: "客户数1",
            type: "bar",
            itemStyle: {
              color: "#0078d7"
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666"
                // formatter: "{c}亿"
              }
            },
            data: [
              "5",
              "20",
              "36",
              "10",
              "10",
              "20",
              "36",
              "10",
              "10",
              "20",
              "30"
            ]
          }
        ]
      });
    },
    drawLineD(id, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var a = data.chartName || "交易银行保证金存款产品结构分析";
      var b = data.filterType || "2019年01月25日 ";
      myChart.setOption({
        title: {
          text: [`{a|${a}  }`, `{b|${b}}`].join(""),
          textStyle: {
            rich: {
              b: {
                color: "gray",
                fontSize: "14"
              }
            }
          },
          itemGap: 10,
          margin: 10
        },
        color: ["#0078d7", "#BFAA3F", "#3B63AB"],
        tooltip: {
          trigger: "axis",
          formatter: function(option) {
            var str = "<div class='echart-shadow tool-tip'>";
            for (var i = 0, l = option.length; i < l; i++) {
              str +=
                i % 2 == 0
                  ? '<span style="color:#000">' +
                    option[i].name +
                    "</span>" +
                    "<br/>" +
                    `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "亿" +
                    "</span>" +
                    "<br/>"
                  : `<span style="color: ${option[i].color}" >` +
                    option[i].seriesName +
                    ": " +
                    option[i].value +
                    "亿" +
                    "</span>";
            }
            return str + "</div>";
          }
        },
        grid: {
          top: 160,
          bottom: 60,
          left: "10%",
          right: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: ["正常", "关注", "次级", "可疑类", "损失类"]
        },
        yAxis: {
          name: "保证金存款产品",
          nameGap: "80",
          nameTextStyle: {
            width: "200",
            height: "200",
            backgroundColor: {
              image: "../assets/images/logo.png"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            formatter: "{value}亿"
          }
        },
        series: [
          {
            name: "贷款余额",
            type: "bar",
            stack: "余额",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#000",
                formatter: "{c}亿"
              }
            },
            data: ["5", "20", "36", "10", "10", "20", "36", "20"]
          }
        ]
      });
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      this.loading = true;
      this.axios({
        url: "https://randomuser.me/api",
        method: "get",
        data: {
          results: 10,
          ...params
        },
        type: "json"
      }).then(data => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    },
    getMsgFormSon(data) {
      this.msgFormSon = data;
      console.log(this.msgFormSon);
    }
  },
  components: {
    "v-filter": Filter,
    "v-bar": Bar,
    "v-cicle": Cicle
  }
};
</script>
<style lang="less">
.table {
  .table-title {
    text-align: left;
    margin: 6px;
  }
  span.table-filter {
    color: "gray";
    font-size: "14px";
  }
}
.small-product {
  #echarts05 {
    display: inline-block;
  }
  #echarts06 {
    float: right;
  }
}
</style>
