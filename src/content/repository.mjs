import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));
export function loadTargets() {
  return readdirSync(join(ROOT, 'content', 'targets')).filter((name) => name.endsWith('.json')).sort().map((name) => JSON.parse(readFileSync(join(ROOT, 'content', 'targets', name), 'utf8')));
}
