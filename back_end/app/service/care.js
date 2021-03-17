'use strict';

const Service = require('egg').Service;

class CareService extends Service {

  async list() {
    const results = await this.app.mysql.select('care_record');

    for (const item of results) {
      const user = await this.app.mysql.get('live_msg', { idCard: item.cared_user });
      if (user) { item.cared_user = user.name; }
      item.cared_project = item.cared_project.split(',');
    }
    return { data: results };
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
