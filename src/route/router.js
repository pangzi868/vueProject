import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import loadable from './loadable'
import mainView from '../page/trans-bank/mainView.vue'


const ManageAnalysis = () => import('../page/manage-analysis')
const multiple = () => import('../page/small/multipleShow.vue')
const test = () => import('../page/small/test.vue')
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/mainView',
    component: mainView,
  },
  {
    path: '/manage',
    component: loadable(ManageAnalysis),
    children: [
      {
        path: 'multiple',
        component: loadable(multiple)
      }, {
        path: 'test',
        component: loadable(test)
      }
    ]
  }]
})
