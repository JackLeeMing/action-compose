import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // const logger = app.middleware.myLogger({
  //   allowedMethod: [ 'GET' ],
  // }, app)
  router.get('/', controller.home.home);
  router.get('/ping', controller.home.index);
  // router.get('/test/:id', controller.test.index)
  // router.post('/test/:id', controller.test.index)
  // router.get('/dog', logger, controller.test.getDog)
  const subRouter = app.router.namespace('/api');
  subRouter.post('/users/create', controller.user.createByEmail)
  subRouter.get('/users/getUserInfo', controller.user.show)
  subRouter.post('/users/loginByEmail', controller.user.loginByEmail)
  subRouter.post('/users/genVeriCode', controller.user.sendVeriCode)
  subRouter.post('/users/loginByPhoneNumber', controller.user.loginByCellphone)
  subRouter.get('/users/passport/gitee', controller.user.oauth)
  subRouter.get('/users/passport/gitee/callback', controller.user.oauthByGitee)

  subRouter.post('/works', controller.work.createWork)
  subRouter.post('/works/copy/:id', controller.work.copyWork)
  subRouter.get('/works', controller.work.myList)
  subRouter.get('/works/:id', controller.work.myWork)
  subRouter.get('/templates', controller.work.templateList)
  subRouter.get('/templates/:id', controller.work.template)
  subRouter.patch('/works/:id', controller.work.update)
  subRouter.delete('/works/:id', controller.work.delete)
  subRouter.post('/works/publish/:id', controller.work.publishWork)
  subRouter.post('/works/publish-template/:id', controller.work.publishTemplate)

  subRouter.post('/utils/upload-img', controller.utils.uploadMutipleFiles)
  subRouter.get('/pages/:idAndUuid', controller.utils.renderH5Page)
  subRouter.post('/channel', controller.work.createChannel)
  subRouter.get('/channel/getWorkChannels/:id', controller.work.getWorkChannel)
  subRouter.patch('/channel/updateName/:id', controller.work.updateChannelName)
  subRouter.delete('/channel/:id', controller.work.deleteChannel)
};
