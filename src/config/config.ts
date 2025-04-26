export const config = {
  port: Number(process.env.PORT) || 8888,
  verbose: process.env.VERBOSE === 'true',
  enableLogs: process.env.ENABLE_LOGS === 'true',
  enableErrorLogs: process.env.ENABLE_ERROR_LOGS === 'true',
  proxyUsername: process.env.PROXY_USERNAME || 'proxyuser',
  proxyPassword: process.env.PROXY_PASSWORD || 'proxypass',
};