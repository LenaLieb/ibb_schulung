import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMetrics } from '../../src/domain/metrics.mjs';

test('AP-15-Kennzahlen werden aus aggregierten Zählern nach den Fachdefinitionen berechnet', () => {
  const metrics = calculateMetrics({
    searches: 10,
    searchesWithTargetPage: 6,
    searchesWithComparison: 2,
    targetPageViews: 8,
    targetPagesWithTravelFormSectionVisible: 4,
    sessionsWithSaveOrShare: 2,
    sessions: 10,
    searchesReachingRelaxation2Or3: 1,
    criteriaChanges: 20,
    openedTargetsOutsideTopThree: 3,
    openedTargets: 10
  });

  assert.equal(metrics.vertiefungsquote.value, 0.6);
  assert.equal(metrics.vergleichsquote.value, 0.2);
  assert.equal(metrics.lesetiefe.value, 0.5);
  assert.equal(metrics.sicherungsquote.value, 0.2);
  assert.equal(metrics.leeresuchergebnisquote.value, 0.1);
  assert.equal(metrics.verfeinerungsrate.value, 2);
  assert.equal(metrics.geoeffnetAusserhalbTopDrei.value, 0.3);
});

test('AP-15-Kennzahlen bleiben bei fehlender Basis undefiniert und lehnen ungültige Zähler ab', () => {
  const metrics = calculateMetrics({
    searches: 0,
    searchesWithTargetPage: 0,
    searchesWithComparison: 0,
    targetPageViews: 0,
    targetPagesWithTravelFormSectionVisible: 0,
    sessionsWithSaveOrShare: 0,
    sessions: 0,
    searchesReachingRelaxation2Or3: 0,
    criteriaChanges: 0,
    openedTargetsOutsideTopThree: 0,
    openedTargets: 0
  });

  assert.equal(metrics.vertiefungsquote.value, null);
  assert.equal(metrics.geoeffnetAusserhalbTopDrei.value, null);
  assert.throws(() => calculateMetrics({ searches: -1 }), /Messwert ungueltig/);
  assert.throws(() => calculateMetrics({ searches: 1 }), /Messwert ungueltig: searchesWithTargetPage/);
});