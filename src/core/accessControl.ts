import { config } from "@/config";

export function isHostAllowed(host: string) {
  const allowed = config.allowed_hosts?.hosts;
  if (allowed === '*') return true;
  if (Array.isArray(allowed)) {
    return allowed.some(allowedHost => host.includes(allowedHost));
  }
  return false;
}