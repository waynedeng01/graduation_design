'use strict';

const Service = require('egg').Service;

class VisitService extends Service {
  // 获取单个id
  async show(params) {
    const user = await this.app.mysql.get('visit_msg', { phone: params.id });
    return { user };
  }

  // 获取整个列表
  async list() {
    const results = await this.app.mysql.select('visit_msg');
    return results;
  }

  async create(params) {
    const { name, phone, purpose, visit_date, require_description } = params;

    const result = await this.app.mysql.insert('visit_msg', { name, phone, purpose: purpose || '', visit_date: visit_date || '', require_description: require_description || '' });
    const insertSuccess = result.affectedRows === 1;

    if (insertSuccess) return result.insertId;
  }
}

module.exports = VisitService;
