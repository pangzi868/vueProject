(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21af93"],{be93:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("v-filter",{attrs:{filterParams:e.filterParams},on:{func:e.getMsgFormSon}}),t("axis-chart",{attrs:{ids:e.id,chartData:e.getChartData}})],1)},n=[],i=t("7f7c"),l=t("63ee"),c={data:function(){return{allData:[{chartName:"表内资产余额及全行公司表内资产占比情况分析",DrillDown:!0,yAxis:["交易银行表内资产","交易银行表内资产占比"],legend:[{name:"交易银行表内资产余额",icon:"circle"},{name:"全行公司表内资产余额",icon:"circle"},{name:"交易银行表内资产占比",icon:"roundRect"}],filterParams:["org"],xAxis:[],series:[{type:"bar",data:[]},{type:"bar",data:[]},{type:"line",data:[]}]},{chartName:"表外资产余额及全行公司表内资产占比情况分析",DrillDown:!0,yAxis:["交易银行表外资产余额","交易银行表外资产占比"],legend:[{name:"交易银行表内资产余额",icon:"circle"},{name:"全行公司表内资产余额",icon:"circle"},{name:"交易银行表内资产占比",icon:"roundRect"}],filterParams:["org"],xAxis:[]}],id:["echarts01","echarts02"],filterParams:{org:[{key:"1",value:"鼓楼支行"},{key:"2",value:"江宁区支行"},{key:"3",value:"建邺区支行"},{key:"4",value:"浦口区支行"},{key:"5",value:"六合区支行"},{key:"6",value:"雨花台支行"}],time:[{key:"01",value:"2019年01月25日"},{key:"02",value:"2019年02月25日"},{key:"03",value:"2019年03月25日"},{key:"04",value:"2019年04月25日"},{key:"05",value:"2019年05月25日"},{key:"06",value:"2019年06月25日"}]}}},computed:{getChartData:function(){var e=this;return this.id.reduce((function(a,t,r){return a.push(e.allData[r]),a}),[])}},methods:{getMsgFormSon:function(e){this.msgFormSon=e,console.log(this.msgFormSon)}},components:{"v-filter":i["a"],"axis-chart":l["a"]}},o=c,s=t("2877"),u=Object(s["a"])(o,r,n,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21af93.9d2b82e5.js.map