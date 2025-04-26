import fs from 'fs';
import path from 'path';
import { createLogger, format, Logger, transports } from 'winston';
import { config } from '../config/config';

const logsDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

const customFilter = format((info) => {
  const { level } = info;

  if (config.enableLogs && !config.enableErrorLogs && level === 'error') {
    return false;
  }

  if (!config.enableLogs && config.enableErrorLogs && level !== 'error') {
    return false;
  }

  if (!config.enableLogs && !config.enableErrorLogs) {
    return false;
  }

  return info;
});

const allTransports = [];

if (config.enableLogs || config.enableErrorLogs) {
  allTransports.push(
    new transports.Console(),
    new transports.File({ filename: path.join(logsDir, 'proxy.log') })
  );
} else {
  allTransports.push(
    new transports.Stream({ stream: fs.createWriteStream('/dev/null') })
  );
}

export const logger: Logger = createLogger({
  level: 'silly',
  format: format.combine(
    customFilter(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: allTransports,
});