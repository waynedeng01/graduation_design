'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CareService extends Service {

  async list() {
    const results = await this.app.mysql.select('care_record');

    // todo 做代码优化
    for (const item of results) {
      const user = await this.app.mysql.get('live_msg', { idCard: item.cared_user });
      if (user) { item.cared_user = user.name; }
      item.cared_project = item.cared_project.split(',');
    }
    return { data: results };
  }

  async getStaff(params) {
    // 已经排班的护理人员
    const busyStaffs = await this.app.mysql.select('care_record', { where: { cared_date: params.cared_date } });
    const cloneArr = [].concat(Array.isArray(busyStaffs) ? busyStaffs : [ busyStaffs ]).map(item => item.care_staff);
    // 所有人员
    const results = await this.app.mysql.select('care_record');
    const mapArr = results.map(item => item.care_staff);
    // 此处得到的是id列表
    const resIdList = _.without(mapArr, ...cloneArr);
    return { data: resIdList };
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
