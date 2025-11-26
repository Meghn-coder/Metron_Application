// Winston logger setup with rotation
const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const logDir = path.join(__dirname, '../../logs');
const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    transport
  ]
});
module.exports = logger;
