'use strict';
const Service = require('egg').Service;

class StockService extends Service {
  // 处理收支记录更新
  async createInOut(params) {
    const { costs, costs_date, inout_type, costs_type } = params;
    const id = Date.now().toString();
    const result = await this.app.mysql.insert('inout_msg', { id, costs, costs_date, inout_type, costs_type });
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) return result.insertId;
  }

  // 处理库存表更新
  async _updateStock(params) {
    const { values } = params;
    if (!Object.keys(values).length) return -1;
    const updateRows = Object.keys(values);
    let flag = true;
    for (const i of updateRows) {
      const default_stock = await this.app.mysql.get('stock_msg', { name: i });
      const options = {
        where: {
          name: i,
        },
      };
      const row = {
        number: values[i] + default_stock.number,
      };
      const result = await this.app.mysql.update('stock_msg', row, options);
      const updateSuccess = result.affectedRows === 1;
      // 有一个没成功就返回false
      if (!updateSuccess) {
        flag = false;
        return -1;
      }
    }
    if (flag) return 0;
  }


  async list() {
    const results = await this.app.mysql.select('stock_msg');
    return results;
  }

  async updateStock(params) {
    const res = await this.app.mysql.beginTransactionScope(async () => {
      this.createInOut(params);
      this._updateStock(params);
    }, this.ctx);
    if (!res) return 0;
  }
}

module.exports = StockService;
