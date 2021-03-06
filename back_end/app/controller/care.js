'use strict';

const Controller = require('egg').Controller;

class CareController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      cared_user: 'string',
      cared_date: 'date',
      cared_project: 'array',
      care_staff: 'string',
      costs: 'number',
      costs_date: 'date',
      inout_type: 'string',
      costs_type: 'string',
    };
  }

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.care.list();
  }

  async getStaff() {
    const { ctx } = this;
    ctx.body = await ctx.service.care.getStaff({
      cared_date: ctx.params.cared_date,
    });
  }

  async getdefaultStaffList() {
    const { ctx } = this;
    ctx.body = await ctx.service.care.getdefaultStaffList();
  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.care.create(ctx.request.body);
    ctx.body = {
      insertId: id,
    };
    ctx.status = 201;
  }
}

module.exports = CareController;
