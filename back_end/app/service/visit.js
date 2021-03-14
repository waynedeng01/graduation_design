'use strict';

const Service = require('egg').Service;

class VisitService extends Service {
  // 获取单个id
  async show(params) {
    const user = await this.app.mysql.get('visit_msg', { phone: params.id });
    return { data: [ user ] };
  }

  // 获取整个列表
  async list() {
    const results = await this.app.mysql.select('visit_msg');
    return { data: results };
  }

  async create(params) {
    const { name, phone, purpose, visit_date, require_description } = params;

    const avartar = 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg';

    const result = await this.app.mysql.insert('visit_msg', { name, phone, purpose, visit_date, require_description, avartar });
    const insertSuccess = result.affectedRows === 1;

    if (insertSuccess) return result.insertId;
  }
}

module.exports = VisitService;
