import { compose, ProxyMiddleware } from '@/server/middleware';
import { authMiddleware } from '@/server/middlewares/authMiddleware';
import { defaultCheckMiddleware } from '@/server/middlewares/defaultCheckMiddleware';
import { Server } from 'proxy-chain';


type ServerOptions = ConstructorParameters<typeof Server>[0];

const middlewares: ProxyMiddleware[] = [
  defaultCheckMiddleware,
  authMiddleware,
];

const composed = compose(middlewares);

/**
 * Custom proxy server class that extends the proxy-chain Server class.
 * It allows for custom middleware to be applied to the request handling process.
 */

export class CustomProxyServer extends Server {
  constructor(options: ServerOptions) {
    super({
      ...options,
      prepareRequestFunction: composed,
    });
  }
}