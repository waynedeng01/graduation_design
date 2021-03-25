'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      name: 'string',
      phone: 'string',
      sex: 'string',
      age: 'string',
      idCard: 'string',
      address: 'string',
      // 床位号
      id: 'string',
      live_date: 'date',
      type: 'string',
      avartar: 'array', // fileList
    };
  }

  async getIdCard() {
    const { ctx } = this;
    ctx.body = await ctx.service.live.getIdCard();
  }

  async getCaredUser() {
    const { ctx } = this;
    ctx.body = await ctx.service.live.getCaredUser();
  }

  // 获取单个id
  async show() {
    const { ctx } = this;

    ctx.body = await ctx.service.live.show({
      id: ctx.params.id,
    });
  }

  // GET 床位相关信息
  async new() {
    const { ctx } = this;
    ctx.body = await ctx.service.live.new();
  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.live.create(ctx.request.body);
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.live.destroy({ id: ctx.params.id });
    ctx.status = 204;
  }

  async mockCreate() {
    const { ctx } = this;
    const id = await ctx.service.live.mock();
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }
}

module.exports = LiveController;
