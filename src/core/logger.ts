import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { config } from '../config/config';

const logsDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const baseLogger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [],
});

if (config.enableLogs) {
  baseLogger.add(new transports.Console({ level: 'info' }));
  baseLogger.add(new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'info' }));
} else if (config.enableErrorLogs) {
  baseLogger.add(new transports.Console({ level: 'error' }));
  baseLogger.add(new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'error' }));
}

export const logger = {
  info: (message: string) => {
    if (config.enableLogs) {
      baseLogger.info(message);
    }
  },
  error: (message: string) => {
    if (config.enableErrorLogs) {
      baseLogger.error(message);
    }
  },
};