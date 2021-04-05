'use strict';
const Service = require('egg').Service;

const NORMAL = 50;
const ADVANCED = 100;
const PROJECT = 50;

// ms转 days
function transUnix(start, now) {
  const date1 = new Date(start);
  const date2 = new Date(now);
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}

// 获取住宿费用
function getAccPrice(days, type) {
  const d = Math.floor(days);
  const price = type === 'normal' ? NORMAL * d : ADVANCED * d;
  return price;
}

// 计算累加值
function computedAdd(arr) {
  if (!arr.length) return 0;
  return arr.map(item => item.costs).reduce((acc, cur) => acc + cur);
}

function getSql(type, value) {
  if (type === 'line') {
    return `
    SELECT
    SUM(costs) as costs,
    CONCAT(YEAR(costs_date),'-',MONTH(costs_date)) AS releaseYearMonth
    FROM inout_msg
    where inout_type = '${value}'
    GROUP BY releaseYearMonth`;
  }
  if (type === 'yes') {
    return `select costs from inout_msg
    where date(costs_date) = date_sub(curdate(),interval 1 day)
    and inout_type = '${value}'`;
  }
}

// 计算利润
function getProfitList(lineMonthInArr, lineMonthOutArr) {
  const res = [];
  if (lineMonthOutArr.length > lineMonthInArr.length) {
    lineMonthOutArr.forEach(outItem => {
      const i = lineMonthInArr.find(inItem => inItem.releaseYearMonth === outItem.releaseYearMonth);
      if (!i) {
        res.push({
          month: outItem.releaseYearMonth,
          value: 0 - outItem.costs,
        });
        return;
      }
      const profit = i.costs - outItem.costs;
      res.push({
        month: i.releaseYearMonth,
        value: profit,
      });
    });
  } else {
    lineMonthInArr.forEach(inItem => {
      const i = lineMonthOutArr.find(outItem => inItem.releaseYearMonth === outItem.releaseYearMonth);
      if (!i) {
        // 支出为0
        // 最后res的长度应该保持为两者中大的那一个数组长度
        res.push({
          month: inItem.releaseYearMonth,
          value: inItem.costs,
        });
        return;
      }
      const profit = inItem.costs - i.costs;
      res.push({
        month: inItem.releaseYearMonth,
        value: profit,
      });
    });
  }
  return res;
}

class BillService extends Service {
  async getStatisticData() {
    const yesInStr = getSql('yes', 'in');
    const yesOutStr = getSql('yes', 'out');
    // 聚合全年利润
    const lineMonthInArr = await this.app.mysql.query(getSql('line', 'in'));
    const lineMonthOutArr = await this.app.mysql.query(getSql('line', 'out'));
    const stockOut = computedAdd(await this.app.mysql.select('inout_msg', { where: { inout_type: 'out', costs_type: 'stock' } }));
    const salaryOut = computedAdd(await this.app.mysql.select('inout_msg', { where: { inout_type: 'out', costs_type: 'salary' } }));
    const yesInCosts = computedAdd(await this.app.mysql.query(`${yesInStr}`));
    const yesOutCosts = computedAdd(await this.app.mysql.query(`${yesOutStr}`));
    return {
      data: { yesInCosts, yesOutCosts, dataList: [{ type: 'stock', value: stockOut }, { type: 'salary', value: salaryOut }], lineChartList: getProfitList(lineMonthInArr, lineMonthOutArr) },
    };
  }

  // 通过身份证查询
  async show(params) {
    const user = await this.app.mysql.get('live_msg', { idCard: params.id });
    // 用户没有入住
    if (!user) return { data: null };
    const { payed_date, type, live_date } = user;
    const str = `
    SELECT cared_project, cared_date, care_staff, id FROM care_record
    WHERE cared_user = ${params.id}
    AND (cared_date
    BETWEEN ('${(payed_date ? payed_date : live_date).toISOString()}')
    AND '${new Date().toISOString()}')
    ORDER BY cared_date DESC
    `;

    const recordList = await this.app.mysql.query(`${str}`);

    let projectCosts = 0;

    if (recordList.length) {
      recordList.forEach(item => {
        item.costs = item.cared_project.split(',').length * PROJECT;
      });
      projectCosts = recordList.reduce((acc, cur) => {
        return acc + cur.costs;
      }, 0);
    }

    // 住宿费用
    const accoCosts = getAccPrice(transUnix(payed_date ? payed_date : live_date, Date.now()), type);
    return { data: { payed_date, accoCosts: accoCosts < 0 ? 0 : accoCosts, projectCosts, record: recordList } };
  }

  // 创建消费记录
  async create(params) {
    const { costs, costs_date, inout_type, costs_type } = params;
    const id = Date.now().toString();
    const result = await this.app.mysql.insert('inout_msg', { id, costs, costs_date, inout_type, costs_type });
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) return result.insertId;
  }
}

module.exports = BillService;
