const THEME_EINSTIEGE = [
  {
    id: 'strand-im-fruehjahr',
    label: 'Strand im Frühjahr',
    criteria: { f: 'single', M: [4, 5, 6], I: ['STRAND', 'ERHOLUNG'], A: [] },
    description: 'Voreingestellte Strandreise mit ruhiger Reisesaison und sichtbarer Auswahl.'
  },
  {
    id: 'staedtereise-zu-zweit',
    label: 'Städtereise zu zweit',
    criteria: { f: 'paar', M: [5, 6, 7], I: ['STADT', 'KULTUR'], A: [] },
    description: 'Kultureller Kurztrip mit sichtbarer Monatsvorbelegung und änderbarer Reisesaison.'
  },
  {
    id: 'familienurlaub-sommerferien',
    label: 'Familienurlaub in den Sommerferien',
    criteria: { f: 'familie', M: [7, 8], I: ['STRAND', 'NATUR', 'AUSFLUEGE'], A: ['A6_11', 'A12P'] },
    description: 'Familienreise mit klarer Altersvorbelegung und Ferienzeit in den Sommermonaten.'
  }
];

export function getThemenEinstiege() {
  return THEME_EINSTIEGE.map((preset) => ({
    ...preset,
    visible: true,
    editable: true,
    required: ['f', 'M', 'I']
  }));
}

export function deriveHolidayPreset({ f = 'familie', bundesland = 'BY', ferienart = 'sommer', jahr = 2026, M, I, A } = {}) {
  const monthsByType = {
    sommer: [7, 8],
    herbst: [9, 10],
    winter: [1, 2],
    weihnachten: [12, 1],
    ostern: [3, 4]
  };

  const resolved = {
    f,
    bundesland,
    ferienart,
    jahr,
    M: Array.isArray(M) && M.length > 0 ? [...new Set(M.map(Number))] : (monthsByType[ferienart] ?? [7, 8]),
    I: Array.isArray(I) && I.length > 0 ? [...new Set(I)] : ['STRAND', 'NATUR'],
    A: Array.isArray(A) && A.length > 0 ? [...new Set(A)] : (f === 'familie' ? ['A6_11', 'A12P'] : [])
  };

  if (f === 'familie' && resolved.A.length === 0) {
    resolved.A = ['A6_11', 'A12P'];
  }

  return resolved;
}

export function resolvePresetSelection(presetId, overrides = {}) {
  const presets = getThemenEinstiege();
  const preset = presets.find((entry) => entry.id === presetId) ?? presets[0];
  const resolved = {
    ...preset.criteria,
    ...overrides,
    M: Array.isArray(overrides.M) && overrides.M.length > 0
      ? [...new Set(overrides.M.map(Number).filter((month) => Number.isInteger(month) && month >= 1 && month <= 12))]
      : [...new Set((preset.criteria.M ?? []).map(Number))],
    I: Array.isArray(overrides.I) && overrides.I.length > 0
      ? [...new Set(overrides.I)]
      : [...new Set(preset.criteria.I ?? [])],
    A: Array.isArray(overrides.A) && overrides.A.length > 0
      ? [...new Set(overrides.A)]
      : [...new Set(preset.criteria.A ?? [])]
  };

  if (resolved.f === 'familie' && (!Array.isArray(resolved.A) || resolved.A.length === 0)) {
    resolved.A = ['A6_11', 'A12P'];
  }

  return { preset, criteria: resolved };
}

export function deriveGuidance(criteria = {}, targets = []) {
  const issues = [];
  const suggestions = [];

  if (criteria.f === 'familie' && (!Array.isArray(criteria.A) || criteria.A.length === 0)) {
    issues.push('Fehlendes Kinderalter: Für Familien muss die Altersgruppe sichtbar und gültig sein.');
    suggestions.push({
      type: 'familie',
      text: 'Bitte Kinderalter ergänzen, damit die Familienlogik für die Suche gültig bleibt.'
    });
  }

  if (!Array.isArray(criteria.M) || criteria.M.length === 0) {
    issues.push('Fehlende Reisezeit: Mindestens ein gültiger Monat ist erforderlich.');
    suggestions.push({
      type: 'zeit',
      text: 'Wähle mindestens einen Monat aus, damit die Reisezeit an den Bestand gebunden bleibt.'
    });
  }

  if (!Array.isArray(criteria.I) || criteria.I.length === 0) {
    issues.push('Fehlende Interessen: Eine Suche braucht mindestens ein Interesse.');
    suggestions.push({
      type: 'interesse',
      text: 'Wähle ein oder mehrere Interessen, damit die Empfehlung belegt und nachvollziehbar bleibt.'
    });
  }

  if (Array.isArray(criteria.I) && criteria.I.length > 4) {
    issues.push('Überbestimmte Auswahl: Die Suche ist fachlich sehr eng und sollte auf wenige Schwerpunkte reduziert werden.');
    suggestions.push({
      type: 'interesse',
      text: 'Reduziere die Interessen auf die zwei bis drei wichtigsten Themen, damit die Auswahl nicht unnötig einschränkt.'
    });
  }

  if (targets.length && Array.isArray(criteria.L) && criteria.L.length > 0) {
    const known = new Set(targets.map((target) => target.land));
    const invalid = criteria.L.filter((country) => !known.has(country));
    if (invalid.length > 0) {
      issues.push(`Unbekannte Wunschländer: ${invalid.join(', ')} sind nicht im freigegebenen Bestand vorhanden.`);
      suggestions.push({
        type: 'land',
        text: 'Entferne die nicht vorhandenen Wunschländer, damit die Länderfilterlogik im gültigen Bestand bleibt.'
      });
    }
  }

  const themeSuggestions = getThemenEinstiege().map((theme) => ({
    type: 'preset',
    text: `${theme.label} ist als sichtbare, änderbare Voreinstellung fachlich belegt.`
  }));

  return { issues, suggestions: [...suggestions, ...themeSuggestions].slice(0, 4) };
}
