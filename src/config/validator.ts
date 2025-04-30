import type { Config } from './schema';

export function validateConfig(config: Config): void {
  const missingFields: string[] = [];
  if (!config.server?.port) missingFields.push('server.port');
  if (!config.auth?.username) missingFields.push('auth.username');
  if (!config.auth?.password) missingFields.push('auth.password');

  if (missingFields.length > 0) {
    throw new Error(`[ERROR] Missing required field(s) in config.toml: ${missingFields.join(', ')}`);
  }
}