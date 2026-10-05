import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTravelMonths } from '../../src/domain/travel-period.mjs';

test('Feste Reisezeit zählt alle berührten Monate inklusive kurzer Reisen und Jahreswechsel', () => {
  assert.deepEqual(resolveTravelMonths({ mode: 'fixed', startDate: '2026-12-30', endDate: '2027-01-02' }), [1, 12]);
  assert.deepEqual(resolveTravelMonths({ mode: 'fixed', startDate: '2026-04-02', endDate: '2026-04-03' }), [4]);
});

test('Flexible Reisezeit verwendet nur explizit ausgewählte Monate', () => {
  assert.deepEqual(resolveTravelMonths({ mode: 'flexible', months: [8, 6, 8] }), [6, 8]);
  assert.throws(() => resolveTravelMonths({ mode: 'flexible', months: [] }), /Monat/);
});

test('Ungültige und rückwärts laufende Datumsspannen werden abgewiesen', () => {
  assert.throws(() => resolveTravelMonths({ mode: 'fixed', startDate: '2026-02-30', endDate: '2026-03-01' }), /Datum/);
  assert.throws(() => resolveTravelMonths({ mode: 'fixed', startDate: '2026-05-02', endDate: '2026-05-01' }), /nicht nach/);
});