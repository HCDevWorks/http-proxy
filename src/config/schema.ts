export type Config = {
  server: {
    port: number;
  };
  logging?: {
    enableLogs?: boolean;
    enableErrorLogs?: boolean;
  };
  auth: {
    username: string;
    password: string;
  };
  allowed_hosts?: {
    hosts?: string[];
  };
}