import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadTargets, ROOT } from '../src/content/repository.mjs';
import { INTERESSEN } from '../src/config/constants.mjs';
import { buildTargetPage } from '../src/domain/target-page.mjs';

const DIST = join(ROOT, 'dist');
const targets = loadTargets();
const fixturesEnabled = process.argv.includes('--fixtures');
if (targets.length === 0 || targets.some((target) => target.status !== 'FREIGEGEBEN')) throw new Error('Build erwartet mindestens ein freigegebenes Ziel und darf keine nicht freigegebenen Ziele ausliefern.');
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'data'), { recursive: true });
cpSync(join(ROOT, 'src', 'ui', 'index.html'), join(DIST, 'index.html'));
cpSync(join(ROOT, 'src', 'ui', 'app.js'), join(DIST, 'app.js'));
cpSync(join(ROOT, 'src', 'ui', 'app.css'), join(DIST, 'app.css'));
cpSync(join(ROOT, 'src', 'domain'), join(DIST, 'app', 'domain'), { recursive: true });
cpSync(join(ROOT, 'src', 'config'), join(DIST, 'app', 'config'), { recursive: true });
cpSync(join(ROOT, 'src', 'url'), join(DIST, 'app', 'url'), { recursive: true });
writeFileSync(join(DIST, 'data', 'bestand.json'), JSON.stringify({ schemaVersion: '1.0.0', datenversion: '2026.10.01', interessen: INTERESSEN, ziele: targets }, null, 2) + '\n');
if (fixturesEnabled) {
  const { TEST_TARGETS } = await import('../tests/fixtures/targets.mjs');
  writeFileSync(join(DIST, 'data', 'test-bestand.json'), JSON.stringify({ schemaVersion: '1.0.0-test', datenversion: 'Testdaten', interessen: INTERESSEN, ziele: TEST_TARGETS }, null, 2) + '\n');
}
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
for (const target of targets) {
  const page = buildTargetPage(target);
  const pageDirectory = join(DIST, 'ziel', target.id);
  mkdirSync(pageDirectory, { recursive: true });
  const blocks = Object.entries(page.blocks).map(([id, text]) => `<section aria-labelledby="${escapeHtml(id)}"><h2 id="${escapeHtml(id)}">${escapeHtml(id[0].toUpperCase() + id.slice(1))}</h2><p>${escapeHtml(text)}</p></section>`).join('');
  const structuredData = JSON.stringify({ '@context': 'https://schema.org', '@type': 'TouristDestination', name: target.name, address: { '@type': 'PostalAddress', addressCountry: target.land, addressRegion: target.region } }).replaceAll('<', '\\u003c');
  writeFileSync(join(pageDirectory, 'index.html'), `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(page.seo.title)} | Urlaubsplaner</title><meta name="description" content="${escapeHtml(page.seo.description)}"><link rel="canonical" href="/ziel/${encodeURIComponent(target.id)}"><link rel="stylesheet" href="/app.css"><script type="application/ld+json">${structuredData}</script></head><body><main><header><p class="eyebrow">Urlaubsplaner · Zielprofil</p><h1>${escapeHtml(target.name)}</h1><p>${escapeHtml(page.seo.description)}</p><p><a class="target-link" href="/">Zur Suche</a></p></header>${blocks}</main></body></html>\n`);
}
console.log(`Build erfolgreich: ${targets.length} Ziele nach dist/ geschrieben.${fixturesEnabled ? ' Testdaten sind unter /test verfügbar.' : ''}`);
