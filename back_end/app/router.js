'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;
  // 直接注册 restful 风格的API
  // 来访
  app.router.resources('visit', '/capi/v2/visit', controller.visit);
  // 入住
  app.router.resources('live', '/capi/v2/live', controller.live);
  // 避免冲突
  app.router.get('/capi/v2/idCard', controller.live.getIdCard);
};
