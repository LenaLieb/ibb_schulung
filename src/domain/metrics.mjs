const COUNT_KEYS = [
  'searches',
  'searchesWithTargetPage',
  'searchesWithComparison',
  'targetPageViews',
  'targetPagesWithTravelFormSectionVisible',
  'sessionsWithSaveOrShare',
  'sessions',
  'searchesReachingRelaxation2Or3',
  'criteriaChanges',
  'openedTargetsOutsideTopThree',
  'openedTargets'
];

function rate(numerator, denominator) {
  return denominator === 0 ? null : numerator / denominator;
}

export function calculateMetrics(counts) {
  for (const name of COUNT_KEYS) {
    const value = counts[name];
    if (!Number.isFinite(value) || value < 0) throw new Error(`Aggregierter Messwert ungueltig: ${name}`);
  }

  return {
    vertiefungsquote: { value: rate(counts.searchesWithTargetPage, counts.searches), target: 0.6 },
    vergleichsquote: { value: rate(counts.searchesWithComparison, counts.searches), target: 0.2 },
    lesetiefe: { value: rate(counts.targetPagesWithTravelFormSectionVisible, counts.targetPageViews), target: 0.5 },
    sicherungsquote: { value: rate(counts.sessionsWithSaveOrShare, counts.sessions), target: 0.15 },
    leeresuchergebnisquote: { value: rate(counts.searchesReachingRelaxation2Or3, counts.searches), maximum: 0.05 },
    verfeinerungsrate: { value: rate(counts.criteriaChanges, counts.searches), targetRange: [1, 3] },
    geoeffnetAusserhalbTopDrei: { value: rate(counts.openedTargetsOutsideTopThree, counts.openedTargets) }
  };
}