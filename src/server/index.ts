import { config } from '../config';
import { logger } from '../core/logger';
import { CustomProxyServer } from './customServer';

export const startServer = async () => {
  const server = new CustomProxyServer({
    port: config.server.port,
  });

  server.listen(() => {
    logger.info(`[PROXY] Proxy server is running on port ${config.server.port}`);
  });

  server.on('requestFailed', (context) => {
    if (context.request && context.request.url) {
      logger.error(`[PROXY] Request failed for URL: ${context.request.url}`);
    }
  });
};