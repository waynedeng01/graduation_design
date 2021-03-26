'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      costs: 'number',
      costs_date: 'date',
      inout_type: 'string',
      costs_type: 'string',
    };
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.bill.show({
      id: ctx.params.id,
    });
  }
  // 创建收支记录
  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.bill.create(ctx.request.body);
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }
}

module.exports = BillController;
