'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  // 获取单个id
  async show(params) {
    const user = await this.app.mysql.get('live_msg', { idCard: params.id });
    return { data: user };
  }

  // 获取床位相关信息
  async new() {
    // 假定15个房间
    const rooMap = {
      '01': false,
      '02': false,
      '03': false,
      '04': false,
      '05': false,
      '06': false,
      '07': false,
      '08': false,
      '09': false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
    };
    // data:[01,02]
    const list = await this.app.mysql.select('live_msg', { // 搜索 post 表
      columns: [ 'id' ], // 要查询的表字段
    });
    list.forEach(item => {
      rooMap[item.id] = true;
    });

    const res = [];
    Object.keys(rooMap).forEach(key => {
      // 未被入住
      if (!rooMap[key]) {
        res.push(key);
      }
    });
    return res;
  }

  async create(params) {
    const { name, phone, sex, age, idCard, address, id, live_date, type } = params;

    const result = await this.app.mysql.insert('live_msg', { name, phone, sex, age, idCard, address, id, live_date, type });
    const insertSuccess = result.affectedRows === 1;

    if (insertSuccess) return result.insertId;
  }
}

module.exports = LiveService;
