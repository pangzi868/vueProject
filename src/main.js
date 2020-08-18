import Vue from 'vue';
import App from './App.vue';
import router from './route/router';
import echarts from 'echarts';
// import china from './assets/json/china.json'
import Antd from 'ant-design-vue';
import DataV from '@jiaminghi/data-view'
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';
import Mock from 'mockjs'
import _ from 'loadsh'
import * as filters from './api/filter.js'
import 'ant-design-vue/dist/antd.css';
import './assets/styles/common/index.less';
import 'moment/locale/zh-cn'

import store from '@/store/index'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

import VueFab from 'vue-float-action-button'

moment.locale('zh-cn');


// echarts.registerMap('china', china)
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.prototype.$mock = Mock;
Vue.prototype._ = _;
Vue.use(VueAxios, axios);
Vue.use(Antd);
Vue.use(DataV);
Vue.use(ElementUI) //使用elementUI
Vue.use(VueFab, {
  // opitons 可选iconfont图标或MaterialIcons
  // iconType: 'MaterialDesign'
  iconType: 'iconfont'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
    //do something => getUserInfo
    next()
  } else {

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')