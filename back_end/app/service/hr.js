'use strict';

const Service = require('egg').Service;

class HrService extends Service {

  async list() {
    const results = await this.app.mysql.select('staff_msg');
    return { data: results };
  }

  async show(params) {
    const { paramStr } = params;
    const arr = paramStr.split('&');
    let str = '';
    const res = {
      id: '',
      name: '',
      phone: '',
    };
    for (let i = 0; i < arr.length; i++) {
      str = arr[i].substr(arr[i].indexOf('=') + 1, arr[i].length);
      if (i === 0) {
        res.id = str;
      }
      if (i === 1) {
        res.name = str;
      }
      if (i === 2) {
        res.phone = str;
      }
    }
    Object.keys(res).forEach(item => {
      if (!res[item]) {
        delete res[item];
      }
    });
    const user = await this.app.mysql.select('staff_msg', { where: { ...res } });
    if (user && !Array.isArray(user)) {
      return { data: [ user ] };
    }
    return { data: user };
  }

  async update(params) {
    const { id, name, age, sex, advantage, phone } = params;
    const row = {
      id,
      name, age, sex,
      advantage, phone,
    };
    const result = await this.app.mysql.update('staff_msg', row); // 更新 posts 表中的记录
    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;
    if (updateSuccess) return result.insertId;
  }

  async destroy(params) {
    const result = await this.app.mysql.delete('staff_msg', {
      id: params.id,
    });
    const deleteSuccess = result.affectedRows === 1;
    if (deleteSuccess) return result.insertId;
  }

  async create(params) {
    const { id, name, age, sex, advantage, phone } = params;
    const result = await this.app.mysql.insert('staff_msg', { id, name, age, sex, advantage, phone });
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) return result.insertId;
  }
}

module.exports = HrService;
