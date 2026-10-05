import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { ROOT } from '../src/content/repository.mjs';

const port = Number(process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] ?? 8080);
const fixturesEnabled = process.argv.includes('--fixtures');
const root = join(ROOT, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const resolvePath = (url) => { const clean = decodeURIComponent((url ?? '/').split('?')[0]); const relative = normalize(clean).replace(/^[/\\]+/, ''); const path = join(root, relative); return path === root || path.startsWith(root + sep) ? path : null; };
const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return response.writeHead(405).end();
  const pathname = (request.url ?? '/').split('?')[0];
  let path = resolvePath(request.url);
  if (path === root || (path && !existsSync(path) && (/^\/suche(?:\/)?$/.test(pathname) || (fixturesEnabled && /^\/test(?:\/)?$/.test(pathname))))) path = join(root, 'index.html');
  if (path && existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!path || !existsSync(path) || statSync(path).isDirectory()) return response.writeHead(404).end('Nicht gefunden');
  const body = readFileSync(path); response.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); response.end(request.method === 'HEAD' ? undefined : body);
});
server.listen(port, '127.0.0.1', () => console.log(`Server: http://127.0.0.1:${port}/`));
