import { isHostAllowed } from '@/core/accessControl';
import { logger } from '@/core/logger';
import { getClientIp, getHostFromRawHeaders } from '@/core/requestUtils';
import { ProxyMiddleware } from '../middleware';

export const defaultCheckMiddleware: ProxyMiddleware = async (ctx, next) => {
  const rawHeaders = ctx.request.rawHeaders;
  const host = getHostFromRawHeaders(rawHeaders);
  const clientIp = getClientIp(ctx.request);

  if (!host) {
    logger.error(`[PROXY] Client ${clientIp} tried to connect without a Host header.`);
    return {
      failMsg: 'Host header is missing in the request.',
    };
  }

  if (!isHostAllowed(host)) {
    logger.error(`[PROXY] Connection blocked: Client ${clientIp} ➔ Host ${host} is not allowed.`);
    ctx.request.socket.destroy();
    return {
      failMsg: `Connection to "${host}" is not permitted.`,
    };
  }

  logger.info(`[PROXY] Client ${clientIp} ➔ Destination Host ${host}`);
  return next();
};