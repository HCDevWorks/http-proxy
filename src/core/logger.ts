import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { config } from '../config/config';

const logsDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

const allTransports = [];

if (config.enableLogs) {
  allTransports.push(new transports.Console({ level: 'info' }));
  allTransports.push(new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'info' }));
} else if (config.enableErrorLogs) {
  allTransports.push(new transports.Console({ level: 'error' }));
  allTransports.push(new transports.File({ filename: path.join(logsDir, 'proxy.log'), level: 'error' }));
}

export const logger = createLogger({
  level: config.enableLogs ? 'info' : (config.enableErrorLogs ? 'error' : 'silent'),
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: allTransports,
});