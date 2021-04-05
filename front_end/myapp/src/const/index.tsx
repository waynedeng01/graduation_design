// 本文件用于存放常量
const date = new Date();
export const now =
  date.getFullYear() +
  '-' +
  (date.getMonth() + 1).toString().padStart(2, '0') +
  '-' +
  date.getDate().toString().padStart(2, '0');

export const careMap = {
  doctor: '医疗',
  fruit: '精品水果',
  gift: '礼物',
};

export const maleMap = {
  male: '男',
  female: '女',
};

export const typeMap = {
  advanced: '高级',
  normal: '普通',
};

export const steps = [
  {
    title: '查询',
  },
  {
    title: '明细',
  },
];

export const TOKEN = '4230ff8d73ba06f02b6bda9a0e7f63d7';
// 进货每一个的消费
export const STOCK_PRICE = 30;
// 库存允许的最大值
export const STOCK_MAX = 100;
// 员工工资
export const SALARY = 30;

// --types

export type care_record = {
  cared_project: string;
  cared_date: string;
  care_staff: string;
  id: string; // 护理记录id
  costs: number; // 单条记录金额
};

export type detailsObj = {
  payed_date: string;
  accoCosts: number;
  projectCosts: number;
  record: care_record[];
};

export type DetailProps = {
  waterId: string;
  details: detailsObj;
};

export interface liveRecord {
  name: string;
  phone: string;
  sex: 'male' | 'female';
  age: string;
  idCard: string;
  address: string;
  // 床位号
  id: string;
  live_date: string;
  type: 'normal' | 'advanced';
  avartar: string;
}

export type createRule = {
  name: string;
  phone: string;
  purpose: string;
  visit_date: Date;
  require_description: string;
};

export type createCare = {
  cared_user: string;
  cared_date: Date;
  cared_project: ('doctor' | 'fruit' | 'gift')[];
  care_staff: string;
};

export type createCosts = {
  costs: number;
  costs_date: string;
  inout_type: string;
  costs_type: string;
};

export type stockItem = {
  name: 'doctor' | 'fruit' | 'gift';
  number: number;
};

export type StockRecord = {
  name: string;
  number: number;
};

export type StaffDetail = {
  id: string;
  name: string;
  age: string;
  sex: string;
  advantage: string;
  phone: string;
};

export type StockPieProps = {
  giftNum: number;
  fruitNum: number;
  doctorNum: number;
};

export type PieChartsData = {
  type: string;
  value: number;
};

export type LineChartData = {
  month: string;
  value: number;
};

export type PieChartsProps = {
  dataList: PieChartsData[];
};

export type LineChartsProps = {
  height?: number;
  autoFit?: boolean;
  list: LineChartData[];
};

// 公司收支明细接口返回值
export type AllStatistics = {
  yesInCosts: number;
  yesOutCosts: number;
  dataList: PieChartsData[];
  lineChartList: LineChartData[];
};
