export type Config = {
  server?: {
    port?: number | string;
  };
  logging?: {
    enableLogs?: boolean | string;
    enableErrorLogs?: boolean | string;
  };
  auth?: {
    username?: string;
    password?: string;
  };
  allowed_hosts?: {
    hosts?: string[];
  };
};