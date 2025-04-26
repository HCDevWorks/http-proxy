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

const activeTransports = [];

if (config.enableLogs) {
  activeTransports.push(
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'info' })
  );
} else if (config.enableErrorLogs) {
  activeTransports.push(
    new transports.Console({ level: 'error' }),
    new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'error' })
  );
}

export const logger: Logger = activeTransports.length > 0
  ? createLogger({
    level: 'silly',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    transports: activeTransports,
  })
  : createLogger({
    silent: true,
    transports: [],
  });