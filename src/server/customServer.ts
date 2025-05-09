import { compose, ProxyMiddleware } from '@/server/middleware';
import { getHostFromRawHeaders } from '@/core/utils';
import { defaultCheckMiddleware } from '@/server/middlewares/defaultCheckMiddleware';
import { Server } from 'proxy-chain';


type ServerOptions = ConstructorParameters<typeof Server>[0];

const middlewares: ProxyMiddleware[] = [
  defaultCheckMiddleware,
];

const composed = compose(middlewares);

export class CustomProxyServer extends Server {
  constructor(options: ServerOptions) {
    super({
      ...options,
      prepareRequestFunction: composed,
    });
  }
}