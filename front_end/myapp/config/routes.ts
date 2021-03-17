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
    name: 'WHY USE THIS?',
    icon: 'QuestionOutlined',
    component: './Welcome',
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
        component: './Reception/Visit/Live',
      },
      {
        path: '/reception/sub-page3',
        name: '来访信息查询',
        icon: 'smile',
        component: './Reception/Visit/Search',
      },
    ],
  },
  {
    path: '/bill',
    name: '收费管理',
    icon: 'TransactionOutlined',
    access: 'canAdmin',
    component: './Bill',
  },
  {
    path: '/person_msg',
    name: '老人档案',
    icon: 'UnorderedListOutlined',
    access: 'canAdmin',
    component: './Detail',
  },
  {
    path: '/care_management',
    name: '护理管理',
    icon: 'HeartOutlined',
    access: 'canAdmin',
    routes: [
      {
        path: '/care_management/sub-page',
        name: '护理排班',
        component: './Care',
      },
      {
        path: '/care_management/sub-page1',
        name: '排班记录',
        component: './Care/Search',
      },
    ],
  },
  {
    component: './404',
  },
];
