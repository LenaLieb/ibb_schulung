import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../../src/content/repository.mjs';

const lines = readFileSync(join(ROOT, 'content', 'inventar-ap14.csv'), 'utf8').trim().split(/\r?\n/);
const [header, ...records] = lines;
const columns = header.split(',');
const inventory = records.map((line) => Object.fromEntries(line.split(',').map((value, index) => [columns[index], value])));
const sourceLines = readFileSync(join(ROOT, 'content', 'quellen-ap14.csv'), 'utf8').trim().split(/\r?\n/);
const [sourceHeader, ...sourceRecords] = sourceLines;
const sourceColumns = sourceHeader.split(',');
const sources = sourceRecords.map((line) => Object.fromEntries(line.split(',').map((value, index) => [sourceColumns[index], value])));

test('AP-14-Inventar hat 45 eindeutige Ziele mit mindestens zwölf Stadt- und Winter-Recherchekandidaten', () => {
  const ids = inventory.map((record) => record.id);
  const cities = inventory.filter((record) => record.typ === 'STADT');
  const winterPriorities = inventory.filter((record) => record.winter_rechercheprioritaet === 'ja');

  assert.equal(inventory.length, 45);
  assert.equal(new Set(ids).size, inventory.length);
  assert.ok(cities.length >= 12);
  assert.ok(winterPriorities.length >= 12);
  assert.equal(inventory.filter((record) => record.im_bestand === 'ja').length, 5);
  assert.ok(inventory.every((record) => record.quelle && record.status));
  assert.ok(winterPriorities.every((record) => record.status !== 'freigegeben'));
});

test('Jede AP-14-Inventar-ID hat genau eine markierte Recherchequelle', () => {
  const inventoryIds = inventory.map((record) => record.id).sort();
  const sourceIds = sources.map((record) => record.id).sort();

  assert.equal(sources.length, 45);
  assert.deepEqual(sourceIds, inventoryIds);
  assert.equal(new Set(sourceIds).size, sources.length);
  assert.ok(sources.every((source) => /^https:\/\//.test(source.quelle_url) && source.quellenstatus && source.recherchehinweis));
  assert.equal(sources.filter((source) => source.quellenstatus === 'portal_blockiert').length, 2);
});