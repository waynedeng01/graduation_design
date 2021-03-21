'use strict';
const Mock = require('mockjs');
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

  mock() {
    Mock.Random.extend({
      phone() {
        const phonePrefixs = [ '132', '135', '189' ]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); // Number()
      },
    });
    const visit_msg = Mock.mock({
      'object|5': { // 模拟生成一个数组，数组长度为5，内容为5个对象，对象的具               体内容如下
        name: '@cname', // 生成中文姓名
        phone: '@phone',
        purpose: '@cparagraph(1)', // 生成一段中文段落
        visit_date: '@datetime("yyyy-MM-dd")', // 生成时间
        require_description: '@cparagraph',
      },
    });
    return this.create(visit_msg.object);
  }
}

module.exports = VisitService;
