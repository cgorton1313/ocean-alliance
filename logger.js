const SimpleNodeLogger = require('simple-node-logger');

const opts = {
  logFilePath: 'snotbot.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};

const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports = log;