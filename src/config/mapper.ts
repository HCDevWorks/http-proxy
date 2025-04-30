import type { Config } from './schema';

export function mapConfig(rawConfig: Config): Config {
  return {
    ...rawConfig,
    logging: {
      enableLogs: rawConfig.logging?.enableLogs ?? true,
      enableErrorLogs: rawConfig.logging?.enableErrorLogs ?? true,
    },
    allowed_hosts: {
      hosts: rawConfig.allowed_hosts?.hosts?.map(h => h.trim().toLowerCase()) || [],
    },
  };
}