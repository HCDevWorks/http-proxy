import { loadConfigFromToml } from './loader';
import { mapConfig } from './mapper';
import type { Config } from './schema';
import { validateConfig } from './validator';

const rawConfig = loadConfigFromToml();
validateConfig(rawConfig);

export const config: Config = mapConfig(rawConfig);