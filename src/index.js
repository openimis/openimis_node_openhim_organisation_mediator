'use strict'
const koa = require('koa')
const koaRouter = require('koa-router')
const {DateTime} = require('luxon')
const dotenv = require("dotenv");
dotenv.config();
const config = require('./config').getConfig();
const logger = require('./logger')
const openhim = require('./openhim')
var request = require('request');
var dataProcessor = require('./process');
var deactivate = require('./deactivate');
var bodyParser = require('koa-bodyparser');
const superagent = require('superagent');
const app = new koa();
const router = new koaRouter();
app.use(bodyParser());
  router.get('/',async (ctx, next) => {
    await superagent.get(process.env.SOSYS_URL)
    .then(res => {
      deactivate.companyDeactivate(res.body.results);
      dataProcessor.processData(res.body.results);
      ctx.body = res.body;
    })
    .catch(err => {
      ctx.body =err;
    });
    next()
  })
app.use(router.routes())
app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}...`)
    if (config.openhim.register) {
      openhim.mediatorSetup()
    }
  })