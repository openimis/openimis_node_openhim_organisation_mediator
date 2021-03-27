'use strict'
const dotenv = require("dotenv");
dotenv.config();
exports.getConfig = function () {
  return Object.freeze({
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL || 'info',
    enableLogging:true,
    openhim: Object.freeze({
      apiURL: process.env.OPENHIM_URL,
      trustSelfSigned:true,
      username: process.env.OPENHIM_USERNAME,
      password: process.env.OPENHIM_PASSWORD,
      register:process.env.OPENHIM_REGISTER,
      urn: process.env.MEDIATOR_URN
    })
  })
}