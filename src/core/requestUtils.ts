import { IncomingMessage } from 'http';

/**
 * Extrai o host dos rawHeaders da requisição.
 */
export function getHostFromRawHeaders(rawHeaders: string[]): string | undefined {
  const hostHeaderIndex = rawHeaders.findIndex(h => h.toLowerCase() === 'host');
  if (hostHeaderIndex !== -1) {
    return rawHeaders[hostHeaderIndex + 1];
  }
  return undefined;
}

/**
 * Obtém o IP do cliente a partir do socket da requisição.
 */
export function getClientIp(request: IncomingMessage): string {
  return request.socket?.remoteAddress || 'Unknown IP';
}