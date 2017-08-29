'use strict';

const nconf = require('nconf');

nconf.use('memory')
  .overrides({
    PLUGIN: {
      FETCH: {
        QUEUE: 'https://sqs.us-west-2.amazonaws.com/328286347281/guanyu-PluginFetchQueue-17377Z28CPFQ8',
      },
      REKOGNITION: {
        QUEUE: 'https://sqs.us-west-2.amazonaws.com/328286347281/guanyu-PluginRekognitionQueue-H3MNGDGANI4E',
      },
      SOPHOSAV: {
        QUEUE: 'https://sqs.us-west-2.amazonaws.com/328286347281/guanyu-PluginSophosQueue-11UGLC8R2Z7Q5',
      }
    },
    STACK: {
      CACHE_TABLE: 'guanyu-CacheTable-Z07H35ELN8CC',
      SELF_ENDPOINT: 'http://localhost:3000/',
      SAMPLE_BUCKET: 'guanyu-samplebucket-1ei8320uyuze3',
    },
  })
  .env({
    separator: '__',
    whitelist: [
      'CONN__HWM_DELAY',
      'CONN__MAX',
      'LOG_LEVEL',
      'MAX_SIZE',
      'PLUGIN__FETCH__QUEUE',
      'PLUGIN__REKOGNITION__QUEUE',
      'PLUGIN__SOPHOSAV__QUEUE',
      'STACK__CACHE_TABLE',
      'STACK__SELF_ENDPOINT',
      'STACK__SAMPLE_BUCKET',
    ],
  }).defaults({
    CONN: {
      HWM_DELAY: 200, // delay before closing hitting high-watermark, in ms
      MAX: 32, // max concurrent connections for a container
    },
    DOOM_SLEEP: 60 * 1000, // Sleep on unexpected errors, in ms
    LOG_LEVEL: 'info',
    MAX_SIZE: 33554432, // Max file size for fetch and upload
    PLUGIN: {
      FETCH: {
        WAIT_SECONDS: 3,
        EMPTY_SLEEP: 3, // Sleep duration between receMsg calls, in seconds
      }
    },
  });

if (!nconf.get('STACK:SELF_ENDPOINT')) {
  console.log(`Required parameter "ENDPOINT" missing, now quit`)
  process.exit(1)
}

module.exports = nconf;