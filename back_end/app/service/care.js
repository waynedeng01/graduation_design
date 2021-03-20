'use strict';

const Service = require('egg').Service;
// const _ = require('lodash');

class CareService extends Service {

  async list() {
    const results = await this.app.mysql.select('care_record');

    // todo 做代码优化
    for (const item of results) {
      const user = await this.app.mysql.get('live_msg', { idCard: item.cared_user });
      if (user) { item.cared_user = user.name; }
      item.cared_project = item.cared_project.split(',');
      item.care_staff = `${item.care_staff.split('_')[0]}（${item.care_staff.split('_')[1]}）`;
    }
    return { data: results };
  }

  async getStaff(params) {
    // 已经排班的护理人员
    const busyStaffs = await this.app.mysql.select('care_record', { where: { cared_date: params.cared_date } });
    // care_staff -- name_id 的格式
    const cloneArr = [].concat(Array.isArray(busyStaffs) ? busyStaffs : [ busyStaffs ]).map(item => item.care_staff);
    // 所有人员
    const results = await this.app.mysql.select('staff_msg');
    const mapArr = results.map(item => `${item.name}_${item.id}`);
    const resList = mapArr.filter(item => { return !cloneArr.includes(item); });
    return { data: resList.map(item => ({
      name: item.split('_')[0],
      id: item.split('_')[1],
    })) };
  }

  async getdefaultStaffList() {
    const results = await this.app.mysql.select('staff_msg');
    return { data: results.map(item => item.id) };
  }

  async create(params) {
    const { cared_user, cared_date, cared_project, care_staff } = params;
    // 直接作为排班的时间
    const id = Date.now().toString();
    const result = await this.app.mysql.insert('care_record', { id, cared_user, cared_date, cared_project: cared_project.join(), care_staff });
    const insertSuccess = result.affectedRows === 1;

    if (insertSuccess) return result.insertId;
  }
}

module.exports = CareService;
