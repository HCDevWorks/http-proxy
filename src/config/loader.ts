import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import type { Config } from './schema';

export function loadConfigFromToml(filePath = 'config.toml'): Config {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `[ERROR] config.toml not found at ${absolutePath}` +
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

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('[ERROR] config.toml is empty or invalid.');
  }

  return parsed as Config;
}