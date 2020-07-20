import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import loadable from './loadable'
import mainView from '../page/trans-bank/mainView.vue'

// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')

const ManageAnalysis = () => import('../page/manage-analysis')
const Debt = () => import('../page/manage-analysis/debt.vue')
const Assect = ()=> import('../page/manage-analysis/assets.vue')
const Income = ()=> import('../page/manage-analysis/income.vue')

// 交易银行 管理分析
const Product = ()=> import('../page/manage-analysis/product.vue')
const Hold = ()=> import('../page/manage-analysis/product/hold.vue')
const Occur = ()=> import('../page/manage-analysis/product/occur.vue')
const CusAnaly = ()=> import('../page/customer-analysis/index.vue')

// 小企业 管理分析
const Small = ()=> import('../page/small')
const ManageHome = ()=> import('../page/small/manageHome.vue')
const ManageDebts = ()=> import('../page/small/debts.vue')
const ManageAssets = ()=> import('../page/small/assets.vue')
const ManageOthers = ()=> import('../page/small/others.vue')
const CustomView = ()=> import('../page/small/custome.vue')
const ProductView = ()=> import('../page/small/product.vue')
const interestRateView = ()=> import('../page/small/interestRate.vue')


const p0 = ()=> import('../page/small/p0.vue')
const p1 = ()=> import('../page/small/p1.vue')
const p2 = ()=> import('../page/small/p2.vue')
const p3 = ()=> import('../page/small/p3.vue')
const p4 = ()=> import('../page/small/p4.vue')
const test = ()=> import('../page/small/test.vue')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/test',
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
          path: '/',
          redirect:"debts"
        },

        // 客户要求 先访问p2，调转路由
        {
          path: 'p0',
          component: loadable(p0),
        },
        {
          path: 'p1',
          component: loadable(p1),
        },
        {
          path: 'p2',
          component: loadable(p2),
        },
        {
          path: 'p3',
          component: loadable(p3),
        },
        {
          path: 'p4',
          component: loadable(p4),
        },
        {
          path: 'test',
          component: loadable(test),
        },
        {
          path: 'debts',
          component: loadable(Debt),
        },
        {
          path: 'money',
          component: loadable(Assect),
        },
        {
          path: 'salary',
          component: loadable(Income),
        },
        {
          path: 'prd',
          component: loadable(Product),
          children:[
            {
              path: '/',
              redirect:'hold'
            },
            {
              path: 'hold',
              component: loadable(Hold),
            },
            {
              path: 'occur',
              component: loadable(Occur),
            },
          ]
        },
      ]
    },
    {
      path: '/analysis',
      component: loadable(CusAnaly),
    },
    {
      path: '/small',
      component: loadable(Small),
      children: [
        {
          path: '/manageSmall',
          component: loadable(Small),
          children: [
            {
              path: '/',
              redirect: 'home'
            },
            {
              path: 'home',
              component: loadable(ManageHome),
            },
            {
              path: 'debts',
              component: loadable(ManageDebts),
            },
            {
              path: 'assets',
              component: loadable(ManageAssets),
            },
            {
              path: 'others',
              component: loadable(ManageOthers),
            }

          ]
        },
        {
          path: '/smallView',
          component: loadable(Small),
          children: [
            {
              path: '/',
              redirect: 'home'
            },
            {
              path: 'custom',
              component: loadable(CustomView),
            },
            {
              path: 'product',
              component: loadable(ProductView),
            }

          ]
        },
        {
          path: '/smallAssess',
          component: loadable(Small),
          children: [
            {
              path: '/',
              redirect: 'interestRate'
            },
            {
              path: 'interestRate',
              component: loadable(interestRateView),
            },
          ]
        }
      ]
    }
  ]
})
