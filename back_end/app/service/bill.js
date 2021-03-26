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

class BillService extends Service {
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
