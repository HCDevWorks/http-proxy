import { z } from 'zod';

export const ConfigSchema = z.object({
  server: z.object({
    port: z.number(),
  }),
  logging: z.object({
    enableLogs: z.boolean().default(true),
    enableErrorLogs: z.boolean().default(false),
  }),
  auth: z.object({
    username: z.string(),
    password: z.string(),
  }),
  allowed_hosts: z.object({
    hosts: z.array(z.string().transform(h => h.trim().toLowerCase())).default([]),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;