import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import { Config } from '../types/config';

export function loadConfigFromToml(filePath = 'config.toml') {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`[ERROR] config.toml not found at ${absolutePath}`);
    process.exit(1);
  }

  const tomlContent = fs.readFileSync(absolutePath, 'utf-8');
  const parsed = parse(tomlContent) as Config;

  const missingFields: string[] = [];
  if (!parsed.server?.port) missingFields.push('server.port');
  if (!parsed.auth?.username) missingFields.push('auth.username');
  if (!parsed.auth?.password) missingFields.push('auth.password');

  if (missingFields.length > 0) {
    console.error(`[ERROR] Missing required field(s) in config.toml: ${missingFields.join(', ')}`);
    process.exit(1);
  }

  if (parsed.server?.port) process.env.PORT = String(parsed.server.port);
  if (parsed.logging?.enableLogs !== undefined) process.env.ENABLE_LOGS = String(parsed.logging.enableLogs);
  if (parsed.logging?.enableErrorLogs !== undefined) process.env.ENABLE_ERROR_LOGS = String(parsed.logging.enableErrorLogs);
  if (parsed.auth?.username) process.env.PROXY_USERNAME = parsed.auth.username;
  if (parsed.auth?.password) process.env.PROXY_PASSWORD = parsed.auth.password;
  if (parsed.allowed_hosts?.hosts) process.env.ALLOWED_HOSTS = parsed.allowed_hosts.hosts.join(',');
}