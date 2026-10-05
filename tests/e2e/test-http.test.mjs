import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { once } from 'node:events';
const port = 8098; let server;
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
test.before(async () => {
	server = spawn(process.execPath, [join(root, 'scripts', 'serve.mjs'), `--port=${port}`], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
	const output = once(server.stdout, 'data');
	const [line] = await Promise.race([output, once(server, 'error').then(([error]) => { throw error; })]);
	if (!line.toString().includes(`127.0.0.1:${port}`)) throw new Error(`Serverstart unerwartet: ${line}`);
	await wait(20);
});
test.after(() => server?.kill());
test('Startseite, Suche, Datenbestand und statische Zielseite werden ausgeliefert', async () => { const home = await fetch(`http://127.0.0.1:${port}/`); assert.equal(home.status, 200); assert.match(await home.text(), /id="suche"/); const page = await fetch(`http://127.0.0.1:${port}/suche?v=1&f=single&M=7&I=STRAND`); assert.equal(page.status, 200); const html = await page.text(); assert.match(html, /id="suche"/); assert.match(html, /id="altersgruppen"/); assert.match(html, /id="vergleich-bereich"/); assert.match(html, /id="merkliste-bereich"/); assert.match(html, /id="von"/); assert.match(html, /id="bis"/); const module = await fetch(`http://127.0.0.1:${port}/app/domain/matching.mjs`); assert.equal(module.status, 200); assert.match(module.headers.get('content-type') ?? '', /^text\/javascript/); const data = await fetch(`http://127.0.0.1:${port}/data/bestand.json`); const json = await data.json(); assert.equal(json.ziele.length, 5); assert.ok(json.interessen.some((interest) => interest.id === 'STRAND')); const target = await fetch(`http://127.0.0.1:${port}/ziel/mallorca`); assert.equal(target.status, 200); const targetHtml = await target.text(); assert.match(targetHtml, /<h1>Mallorca<\/h1>/); assert.match(targetHtml, /application\/ld\+json/); assert.match(targetHtml, /name="description"/); const unknown = await fetch(`http://127.0.0.1:${port}/ziel/unbekannt`); assert.equal(unknown.status, 404); });
