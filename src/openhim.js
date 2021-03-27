'use strict'

const fs = require('fs')
const path = require('path')

const logger = require('./logger')
const config = require('./config')

const mediatorUtils = require('openhim-mediator-utils')

let mediatorConfigJson, readError

try {
  const mediatorConfigFile = fs.readFileSync(
    path.resolve(__dirname, '.', 'mediatorConfig.json')
  )
  mediatorConfigJson = JSON.parse(mediatorConfigFile)
} catch (err) {
  readError = err.message
  logger.error(`Mediator config file could not be retrieved: ${err.message}`)
}

const configOptions = config.getConfig()
const openhimConfig = Object.assign(
  {urn: mediatorConfigJson.urn},
  configOptions.openhim
)
mediatorConfigJson = Object.assign({}, mediatorConfigJson, {
  urn: configOptions.openhim.urn
})
const mediatorSetup = () => {
  mediatorUtils.registerMediator(openhimConfig, mediatorConfigJson, error => {
    if (error) {
      logger.error(`Failed to register mediator. Caused by: ${error.message}`)
      throw error
    }

    logger.info('Successfully registered mediator!')

    const emitter = mediatorUtils.activateHeartbeat(openhimConfig)

    emitter.on('error', openhimError => {
      logger.error('Heartbeat failed: ', openhimError)
    })
  })
}


exports.mediatorSetup = mediatorSetup
