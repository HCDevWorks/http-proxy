import { PrepareRequestFunctionOpts, Server } from 'proxy-chain';
import { config } from '../config/config';
import { logger } from './logger';

const allowedHosts = [
  'discord.com',
  'youtube.com',
  'googlevideo.com',
];

const getHostFromRawHeaders = (rawHeaders: string[] = []): string | null => {
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i].toLowerCase() === 'host') {
      return rawHeaders[i + 1];
    }
  }
  return null;
};

const isHostAllowed = (host: string) => {
  return allowedHosts.some(allowed => host.includes(allowed));
};

export const startServer = async () => {
  const server = new Server({
    port: config.port,
    verbose: config.verbose,

    prepareRequestFunction: ({ request }: PrepareRequestFunctionOpts) => {
      try {
        const rawHeaders = request.rawHeaders;
        const host = getHostFromRawHeaders(rawHeaders);

        if (!host) {
          logger.error(`Host header not found in the request headers.`);
          return {
            failMsg: 'Host header is missing in the request.',
          };
        }

        logger.info(`Attempting to connect to host: ${host}`);

        if (!isHostAllowed(host)) {
          logger.error(`Connection blocked: Host "${host}" is not in the allowed list.`);
          return {
            failMsg: `Connection to "${host}" is not permitted.`,
          };
        }

        return {};
      } catch (err) {
        logger.error(`Error while processing the request: ${(err as Error).message}`);
        return {
          failMsg: 'Internal error while processing the request.',
        };
      }
    },
  });

  server.listen(() => {
    logger.info(`Proxy server is running on port ${config.port}`);
  });

  server.on('requestFailed', (context) => {
    if (context.request && context.request.url) {
      logger.error(`Request failed for URL: ${context.request.url}`);
    }
  });

};