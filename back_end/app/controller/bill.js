'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.bill.show({
      id: ctx.params.id,
    });
  }
}

module.exports = BillController;
