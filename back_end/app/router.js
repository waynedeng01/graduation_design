'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;
  // 来访
  app.router.resources('visit', '/capi/v2/visit', controller.visit);
  // 入住
  app.router.resources('live', '/capi/v2/live', controller.live);
  // 护理管理
  app.router.resources('care', '/capi/v2/care', controller.care);
  // 人事管理
  app.router.resources('hr', '/capi/v2/hr', controller.hr);
  // 收费管理
  app.router.resources('bill', '/capi/v2/bill', controller.bill);

  // 单独隔离的出来的路由
  app.router.get('/capi/v2/idCard', controller.live.getIdCard);
  app.router.get('/capi/v2/caredUser', controller.live.getCaredUser);
  app.router.get('/capi/v2/staff/:cared_date', controller.care.getStaff);
  app.router.get('/capi/v2/staff', controller.care.getdefaultStaffList);

  // mock路由
  app.router.get('/capi/v2/mock/visit', controller.visit.mockCreate);
  app.router.get('/capi/v2/mock/hr', controller.hr.mockCreate);
  app.router.get('/capi/v2/mock/live', controller.live.mockCreate);
};
