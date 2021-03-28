'use strict';

const Controller = require('egg').Controller;

class StockController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.stock.list();
  }

  async create() {
    const { ctx } = this;
    const id = await ctx.service.stock.updateStock(ctx.request.body);
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }
}

module.exports = StockController;
