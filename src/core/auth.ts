import { config } from '../config';

export function authenticateProxyRequest(rawHeaders: string[]): { success: boolean; failMsg?: string; statusCode?: number } {
  const authorizationHeaderIndex = rawHeaders.findIndex(h => h.toLowerCase() === 'proxy-authorization');
  if (authorizationHeaderIndex === -1) {
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
    return {
      success: false,
      failMsg: 'Invalid Proxy Authentication',
      statusCode: 407,
    };
  }

  return { success: true };
}