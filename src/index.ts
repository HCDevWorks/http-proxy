import http from 'http';
import os from 'os';
import { Server } from 'proxy-chain';

const HTTP_PORT = Number(process.env.PORT || 80);
const PROXY_PORT = 8000;

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

const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`Proxy running at port ${PROXY_PORT}`);
});
httpServer.listen(HTTP_PORT);

proxyServer.listen().then(() => {
  const localIp = getLocalIP();
  console.log(`🚀 Proxy is listening on ${PROXY_PORT}`);
  console.log(`🌐 Local access: http://${localIp}:${PROXY_PORT}`);
});