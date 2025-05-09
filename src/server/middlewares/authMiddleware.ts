import { authenticateProxyRequest } from "@/core/auth";
import { logger } from "@/core/logger";
import { ProxyMiddleware } from "@/server/middleware";

export const authMiddleware: ProxyMiddleware = async (ctx, next) => {
  const rawHeaders = ctx.request.rawHeaders;
  const clientIp = ctx.request.socket?.remoteAddress || 'Unknown IP';
  const authResult = authenticateProxyRequest(rawHeaders);

  if (!authResult.success) {
    logger.error(`[PROXY] Unauthorized access attempt from ${clientIp} (invalid credentials).`);
    return { failMsg: authResult.failMsg, statusCode: authResult.statusCode };
  }

  return next();
}