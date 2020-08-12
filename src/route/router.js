import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import loadable from './loadable'
import mainView from '../page/trans-bank/mainView.vue'


const ManageAnalysis = () => import('../page/manage-analysis')
const multiple = () => import('../page/small/multipleShow.vue')
const S1 = () => import('../page/small/S1.vue')
const S2 = () => import('../page/small/S2.vue')
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
        path: 'S1',
        component: loadable(S1)
      }, {
        path: 'S2',
        component: loadable(S2)
      }, {
        path: 'test',
        component: loadable(test)
      }
    ]
  }]
})
