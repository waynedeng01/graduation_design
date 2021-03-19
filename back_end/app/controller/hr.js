'use strict';

const Controller = require('egg').Controller;

class HrController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      id: 'string',
      name: 'string',
      age: 'string',
      sex: 'string',
      advantage: 'string',
      phone: 'string',
    };
  }

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.hr.list();
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.hr.show({
      paramStr: ctx.params.id,
    });
  }

  // 编辑更新
  async update() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.hr.update(ctx.request.body);
    // success
    if (id === 0) {
      ctx.status = 204;
    }
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.hr.destroy({ id: ctx.params.id });
    ctx.status = 204;
  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.hr.create(ctx.request.body);
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }
}

module.exports = HrController;
