import { ALTERSGRUPPEN, INTERESSEN_RANG, MONATE, PREISNIVEAUS, REISEFORMEN, STANDARD_GEWICHTE } from '../config/constants.mjs';

export class MatchingFehler extends Error {
  constructor(regel, nachricht) { super(`[${regel}] ${nachricht}`); this.regel = regel; }
}

export function normalisiereSuchkriterien(input) {
  if (!input || typeof input !== 'object') throw new MatchingFehler('VERTRAG', 'Suchkriterien fehlen.');
  if (!REISEFORMEN.includes(input.f)) throw new MatchingFehler('F-01', 'Reiseform ist ungueltig.');
  if (!Array.isArray(input.M) || input.M.length === 0 || input.M.some((m) => !Number.isInteger(m) || !MONATE.includes(m))) throw new MatchingFehler('F-01', 'Mindestens ein gueltiger Monat ist erforderlich.');
  if (!Array.isArray(input.I) || input.I.length === 0 || input.I.some((id) => !INTERESSEN_RANG[id])) throw new MatchingFehler('F-01', 'Mindestens ein kanonisches Interesse ist erforderlich.');
  const A = [...new Set(input.A ?? [])].sort();
  if (A.some((value) => !ALTERSGRUPPEN.includes(value))) throw new MatchingFehler('F-01', 'Altersgruppe ist ungueltig.');
  const L = [...new Set(input.L ?? [])].sort();
  if (L.some((value) => !/^[A-Z]{2}$/.test(value))) throw new MatchingFehler('F-09', 'Laenderkennung ist ungueltig.');
  const P = [...new Set(input.P ?? [])].sort();
  if (P.some((value) => !PREISNIVEAUS.includes(value))) throw new MatchingFehler('F-01', 'Preisniveau ist ungueltig.');
  const relax = input.relax === 'AUTO' || input.relax === 'ORIGINAL' ? input.relax : 'ORIGINAL';
  return Object.freeze({ f: input.f, A, M: [...new Set(input.M)].sort((a, b) => a - b), I: [...new Set(input.I)].sort((a, b) => INTERESSEN_RANG[a] - INTERESSEN_RANG[b]), L, P, relax });
}

export function pruefeGewichte(weights = STANDARD_GEWICHTE) {
  const sum = weights.interessen + weights.saison + weights.reiseform;
  if (![weights.interessen, weights.saison, weights.reiseform].every((value) => Number.isFinite(value) && value >= 0) || Math.abs(sum - 1) > 1e-9) throw new MatchingFehler('F-05', 'Gewichte muessen nichtnegativ sein und 1 ergeben.');
  return { ...weights };
}

export function bewerteZiel(criteria, target, weights = STANDARD_GEWICHTE) {
  if (target.status !== 'FREIGEGEBEN') return { bestanden: false, regel: 'F-11', text: 'Ziel ist nicht freigegeben.' };
  if (criteria.M.every((month) => (target.saison[month] ?? 0) < 1)) return { bestanden: false, regel: 'F-04', text: 'Ziel ist in keinem gewaehlten Monat geeignet.' };
  const interests = criteria.I.filter((id) => (target.interessen[id] ?? 0) >= 1);
  if (interests.length === 0) return { bestanden: false, regel: 'F-04', text: 'Kein gewaehltes Interesse wird belegt.' };
  if ((target.reiseform[criteria.f] ?? 0) < 1) return { bestanden: false, regel: 'F-05', text: 'Reiseform wird nicht belegt.' };
  if (criteria.f === 'familie' && criteria.A.some((age) => (target.kinder[age] ?? 0) < 1)) return { bestanden: false, regel: 'F-05', text: 'Mindestens eine Altersgruppe wird nicht belegt.' };
  if (criteria.L.length && !criteria.L.includes(target.land)) return { bestanden: false, regel: 'F-09', text: 'Land liegt ausserhalb des Filters.' };
  if (criteria.P.length && !criteria.P.includes(target.preisniveau)) return { bestanden: false, regel: 'F-05', text: 'Preisniveau liegt ausserhalb des Filters.' };
  const sI = criteria.I.reduce((sum, id) => sum + (target.interessen[id] ?? 0), 0) / (2 * criteria.I.length);
  const sS = Math.max(...criteria.M.map((month) => target.saison[month] ?? 0)) / 2;
  const familyAge = criteria.A.length ? Math.min(...criteria.A.map((age) => target.kinder[age] ?? 0)) : 2;
  const sF = criteria.f === 'familie' ? ((target.reiseform.familie ?? 0) + familyAge) / 4 : (target.reiseform[criteria.f] ?? 0) / 2;
  const w = pruefeGewichte(weights);
  const s = w.interessen * sI + w.saison * sS + w.reiseform * sF;
  return { bestanden: true, id: target.id, name: target.name, land: target.land, region: target.region, typ: target.typ, preisniveau: target.preisniveau, sI, sS, sF, s, interests };
}

export function matching(criteriaInput, targets, options = {}) {
  const criteria = normalisiereSuchkriterien(criteriaInput);
  const results = [];
  const ausgeschlossen = [];
  for (const target of targets) {
    const result = bewerteZiel(criteria, target, options.weights);
    if (result.bestanden) results.push(result);
    else if (options.diagnose) ausgeschlossen.push({ id: target.id, regel: result.regel, text: result.text });
  }
  results.sort((a, b) => b.s - a.s || a.name.localeCompare(b.name, 'de') || a.id.localeCompare(b.id));
  return { criteria, results: results.slice(0, 12), ausgeschlossen };
}

export function prozent(wert) { return `${Math.round(wert * 100)} %`; }
