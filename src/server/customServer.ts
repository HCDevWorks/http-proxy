import { getHostFromRawHeaders } from '@/core/utils';
import { PrepareRequestFunctionOpts, Server } from 'proxy-chain';
import { config } from '../config';
import { logger } from '../core/logger';

type ServerOptions = ConstructorParameters<typeof Server>[0];

export class CustomProxyServer extends Server {
  constructor(options: ServerOptions) {
    super({
      ...options,
      prepareRequestFunction: CustomProxyServer.prepareRequestFunction,
    });
  }

  static prepareRequestFunction({ request }: PrepareRequestFunctionOpts) {
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

      if (!CustomProxyServer.isHostAllowed(host)) {
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
  }

  static isHostAllowed(host: string) {
    const allowed = config.allowed_hosts?.hosts;
    if (allowed === '*') return true;
    if (Array.isArray(allowed)) {
      return allowed.some(allowedHost => host.includes(allowedHost));
    }
    return false;
  }
}