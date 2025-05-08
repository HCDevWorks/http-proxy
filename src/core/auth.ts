import { config } from '../config';
import { logger } from './logger';

export function authenticateProxyRequest(rawHeaders: string[], clientIp: string): { success: boolean; failMsg?: string; statusCode?: number } {
  const authorizationHeaderIndex = rawHeaders.findIndex(h => h.toLowerCase() === 'proxy-authorization');
  if (authorizationHeaderIndex === -1) {
    logger.error(`[PROXY] Unauthorized access attempt from ${clientIp} (missing credentials).`);
    return {
      success: false,
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
      success: false,
      failMsg: 'Invalid Proxy Authentication',
      statusCode: 407,
    };
  }

  return { success: true };
}