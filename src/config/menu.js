const menuList = [
  // {
  //   title: '交易银行',
  //   key: '/bank',
  //   icon: 'appstore',
  //   children: [ // 子菜单列表
  //     {
  //       title: '关键数据一览',
  //       key: '/mainView',
  //       icon: 'bars'
  //     },
  //     {
  //       title: '管理分析',
  //       key: '/manage',
  //       icon: 'bars',
  //       children:[
  //         {
  //           title: '负债分析',
  //           key: '/manage/debts',
  //           icon: 'bars'
  //         },
  //         {
  //           title: '资产分析',
  //           key: '/manage/money',
  //           icon: 'bars'
  //         },
  //         {
  //           title: '收入分析',
  //           key: '/manage/salary',
  //           icon: 'bars'
  //         },
  //         {
  //           title: '产品分析',
  //           key: '/manage/prd',
  //           icon: 'bars',
  //           children:[
  //             {
  //               title: '持有产品分析',
  //               key: '/manage/prd',
  //               icon: 'bars'
  //             },
  //             {
  //               title: '发生额分析',
  //               key: '/manage/prd/occur',
  //               icon: 'bars'
  //             },
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       title: '客户分析',
  //       key: '/analysis',
  //       icon: 'bars',
  //     },
  //   ]
  // },
  {
    title: '小企业',
    key: '/acrm',
    icon: 'area-chart',
    children: [
      {
        title: '管理分析',
        key: '/manageSmall',
        icon: 'bar-chart',
        children: [
          {
            title: 'P0',
            key: '/manage/P0',
            icon: 'bars'
          },
          {
            title: 'P1',
            key: '/manage/P1',
            icon: 'bars'
          },
          {
            title: 'P2',
            key: '/manage/P2',
            icon: 'bars'
          },
          {
            title: 'P3',
            key: '/manage/P3',
            icon: 'bars'
          },
          {
            title: 'P4',
            key: '/manage/P4',
            icon: 'bars'
          },
          {
            title: '默认首页',
            key: '/manageSmall/home',
            icon: 'bars'
          },
          {
            title: '负债分析',
            key: '/manageSmall/debts',
            icon: 'line-chart'
          },
          {
            title: '资产分析',
            key: '/manageSmall/assets',
            icon: 'line-chart'
          },
          {
            title: '其他分析',
            key: '/manageSmall/others',
            icon: 'line-chart'
          },
        ]
      },
      {
        title: '小企业概览',
        key: '/smallView',
        icon: 'line-chart',
        children: [
          
          {
            title: '客户概览',
            key: '/smallView/custom',
            icon: 'line-chart'
          },
          {
            title: '产品概览',
            key: '/smallView/product',
            icon: 'line-chart'
          },
        ]
      },
      {
        title: '考核工具',
        key: '/smallAssess',
        icon: 'pie-chart',
        children: [
          
          {
            title:'利率定价',
            key: '/smallAssess/interestRate',
            icon: 'line-chart'
          },
        ],
      }
    ]
  },
]

export default menuList