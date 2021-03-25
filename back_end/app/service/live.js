'use strict';
const Mock = require('mockjs');
const Service = require('egg').Service;
const computed = require('../utils/index');

class LiveService extends Service {
  // 获取单个id
  async show(params) {
    const user = await this.app.mysql.get('live_msg', { idCard: params.id });
    return { data: user };
  }

  // 获取身份证号用于补全
  async getIdCard() {
    const list = await this.app.mysql.select('live_msg', {
      columns: [ 'idCard' ], // 要查询的表字段
    });
    return list;
  }

  // 获取入住客户的基础信息用于护理管理护理对象排班
  async getCaredUser() {
    const list = await this.app.mysql.select('live_msg', {
      columns: [ 'idCard', 'name' ],
    });
    return list;
  }

  // 获取床位相关信息
  async new() {
    // 假定15个房间
    const rooMap = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
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
    const { avartar, name, phone, sex, age, idCard, address, id, live_date, type } = params;
    const result = await this.app.mysql.insert('live_msg', { avartar: computed(avartar), name, phone, sex, age, idCard, address, id, live_date, type });
    const insertSuccess = result.affectedRows === 1;

    if (insertSuccess) return result.insertId;
  }

  async destroy(params) {
    const result = await this.app.mysql.delete('live_msg', {
      idCard: params.id,
    });
    const deleteSuccess = result.affectedRows === 1;
    if (deleteSuccess) return result.insertId;
  }

  mock() {
    Mock.Random.extend({
      phone() {
        const phonePrefixs = [ '132', '135', '189' ];
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); // Number()
      },
      bed_id() {
        const { number } = Mock.mock({ 'number|1-15': 100 });
        return number;
      },
      age() {
        const { number } = Mock.mock({ 'number|65-95': 100 });
        return number;
      },
      address() {
        return Mock.Random.county(true);
      },
      id_card() {
        return Mock.Random.id();
      },
    });
    const live_msg = Mock.mock({
      'object|10': {
        id: '@bed_id',
        name: '@cname',
        phone: '@phone',
        age: '@age',
        'sex|1': [ 'male', 'female' ],
        'type|1': [ 'normal', 'advanced' ],
        idCard: '@id_card',
        address: '@address',
        live_date: '@datetime("yyyy-MM-dd")',
        avartar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      },
    });
    return this.create(live_msg.object);
  }
}

module.exports = LiveService;
