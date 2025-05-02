import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import { Config, ConfigSchema } from './schema';

export function loadConfigFromToml(filePath = 'config.toml'): Config {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `[ERROR] config.toml not found at ${absolutePath}. ` +
      'Please create the file based on config.example.toml.'
    );
  }

  const tomlContent = fs.readFileSync(absolutePath, 'utf-8');
  let parsed: unknown;
  try {
    parsed = parse(tomlContent);
  } catch (error) {
    throw new Error(`[ERROR] Failed to parse config.toml: ${(error as Error).message}`);
  }

  const result = ConfigSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      '[ERROR] config.toml validation failed:\n' +
      result.error.errors.map(e => `- ${e.path.join('.')}: ${e.message}`).join('\n')
    );
  }

  return result.data;
}