'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;
  // 直接注册 restful 风格的API
  app.router.resources('visit', '/capi/v2/visit', controller.visit);
};
