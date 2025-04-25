import os from 'os';
import { Server } from 'proxy-chain';

const PROXY_PORT = 8888;

function getLocalIP(): string | undefined {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === 'IPv4' && !addr.internal) {
        return addr.address;
      }
    }
  }
  return undefined;
}

const proxyServer = new Server({
  port: PROXY_PORT,
  prepareRequestFunction: ({ request }) => {
    console.log(`[Proxy] ${new Date().toISOString()} - ${request.method} ${request.url}`);
    return {};
  },
});

proxyServer.listen().then(() => {
  const localIp = getLocalIP();
  console.log(`🚀 Proxy is listening on ${PROXY_PORT}`);
  console.log(`🌐 Local access: http://${localIp}:${PROXY_PORT}`);
});