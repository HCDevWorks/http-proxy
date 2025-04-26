export const config = {
  port: Number(process.env.PORT) || 8888,
  verbose: process.env.VERBOSE === 'true',
  enableLogs: process.env.ENABLE_LOGS !== 'false',
  enableErrorLogs: process.env.ENABLE_ERROR_LOGS !== 'false',
};
