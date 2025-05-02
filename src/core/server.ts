import { PrepareRequestFunctionOpts, Server } from 'proxy-chain';
import { config } from '../config/';
import { logger } from './logger';

const getHostFromRawHeaders = (rawHeaders: string[] = []): string | null => {
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i].toLowerCase() === 'host') {
      return rawHeaders[i + 1].toLowerCase();
    }
  }
  return null;
};

const isHostAllowed = (host: string) => {
  return config.allowed_hosts?.hosts?.some(allowed => host.includes(allowed));
};

export const startServer = async () => {
  const server = new Server({
    port: config.server.port,

    prepareRequestFunction: ({ request }: PrepareRequestFunctionOpts) => {
      try {
        const rawHeaders = request.rawHeaders;
        const host = getHostFromRawHeaders(rawHeaders);
        const clientIp = request.socket?.remoteAddress || 'Unknown IP';

        const authorizationHeaderIndex = rawHeaders.findIndex(h => h.toLowerCase() === 'proxy-authorization');
        if (authorizationHeaderIndex === -1) {
          logger.error(`[PROXY] Unauthorized access attempt from ${clientIp} (missing credentials).`);
          return {
            failMsg: 'Proxy Authentication Required',
            statusCode: 407,
          };
        }

        const authValue = rawHeaders[authorizationHeaderIndex + 1];
        const encodedCredentials = authValue?.split(' ')[1];
        const decoded = Buffer.from(encodedCredentials || '', 'base64').toString();
        const [username, password] = decoded.split(':');

        if (username !== config.auth.username || password !== config.auth.password) {
          logger.error(`[PROXY] Unauthorized access attempt from ${clientIp} (invalid credentials).`);
          return {
            failMsg: 'Invalid Proxy Authentication',
            statusCode: 407,
          };
        }

        if (!host) {
          logger.error(`[PROXY] Client ${clientIp} tried to connect without a Host header.`);
          return {
            failMsg: 'Host header is missing in the request.',
          };
        }

        if (!isHostAllowed(host)) {
          logger.error(`[PROXY] Connection blocked: Client ${clientIp} ➔ Host ${host} is not allowed.`);
          request.socket.destroy();
          return {
            failMsg: `Connection to "${host}" is not permitted.`,
          };
        }

        logger.info(`[PROXY] Client ${clientIp} ➔ Destination Host ${host}`);
        return {};
      } catch (err) {
        logger.error(`[PROXY] Error while processing the request: ${(err as Error).message}`);
        return {
          failMsg: 'Internal error while processing the request.',
        };
      }
    },
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