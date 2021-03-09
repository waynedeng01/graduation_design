export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    // 接待管理
    path: '/reception',
    name: '接待管理',
    icon: 'smile',
    access: 'canAdmin',
    routes: [
      // 来访信息登记
      {
        path: '/reception/sub-page',
        name: '来访信息登记',
        icon: 'smile',
        component: './Reception/Visit/Regist',
      },
      // 入住申请登记
      {
        path: '/reception/sub-page1',
        name: '入住申请登记',
        icon: 'smile',
        component: './Welcome',
      },
      // 床位状态查询
      {
        path: '/reception/sub-page2',
        name: '床位状态查询',
        icon: 'smile',
        component: './Welcome',
      },
      // 来访信息查询
      {
        path: '/reception/sub-page3',
        name: '来访信息查询',
        icon: 'smile',
        component: './Reception/Visit/Search',
      },
    ],
  },
  {
    component: './404',
  },
];
