import { URL_VERSION } from '../config/constants.mjs';
import { normalisiereSuchkriterien } from '../domain/matching.mjs';
import { normalizeRelax } from '../domain/relaxation.mjs';
import { mergeSelection } from '../domain/comparison.mjs';
import { resolveTravelMonths } from '../domain/travel-period.mjs';

const list = (params, key) => (params.get(key) ? params.get(key).split(',').filter(Boolean) : []);
const normalizeSharedIds = (entries = [], validIds = new Set(), max = 3) => {
  const seen = new Set();
  const result = [];
  for (const entry of Array.isArray(entries) ? entries : []) {
    const value = String(entry ?? '').trim();
    if (!value || seen.has(value) || (validIds.size > 0 && !validIds.has(value))) continue;
    seen.add(value);
    result.push(value);
    if (result.length >= max) break;
  }
  return result;
};
export function serializeSharedState(state = {}, targets = [], max = 3) {
  const validIds = new Set((Array.isArray(targets) ? targets : []).map((target) => String(target.id ?? '')).filter(Boolean));
  const params = new URLSearchParams();
  const compare = normalizeSharedIds(state.compare ?? state.cmp ?? [], validIds, max);
  const wishlist = normalizeSharedIds(state.wishlist ?? state.wish ?? [], validIds, max);
  if (compare.length) params.set('cmp', compare.join(','));
  if (wishlist.length) params.set('wish', wishlist.join(','));
  return params.toString();
}
export function parseSharedState(query) {
  const params = query instanceof URLSearchParams ? query : new URLSearchParams(query);
  return {
    compare: normalizeSharedIds(list(params, 'cmp'), new Set(), 3),
    wishlist: normalizeSharedIds(list(params, 'wish'), new Set(), 10),
  };
}
export function serialize(criteria, sharedState = {}) {
  const value = normalisiereSuchkriterien(criteria);
  const params = new URLSearchParams({ v: URL_VERSION, f: value.f, M: value.M.join(','), I: value.I.join(',') });
  if (criteria?.zeitart === 'spanne') {
    const months = resolveTravelMonths({ mode: 'fixed', startDate: criteria.von, endDate: criteria.bis });
    if (months.join(',') !== value.M.join(',')) throw new Error('[URL] Datumsbereich und Monatsmenge widersprechen sich.');
    params.set('zeitart', 'spanne');
    params.set('von', criteria.von);
    params.set('bis', criteria.bis);
  } else if (criteria?.zeitart === 'monate') {
    params.set('zeitart', 'monate');
  }
  if (value.A.length) params.set('A', value.A.join(','));
  if (value.L.length) params.set('L', value.L.join(','));
  if (value.P.length) params.set('P', value.P.join(','));
  if (Object.prototype.hasOwnProperty.call(criteria ?? {}, 'relax')) params.set('relax', normalizeRelax(criteria.relax));
  const shareQuery = serializeSharedState(sharedState, []);
  if (shareQuery) for (const [key, valueEntry] of new URLSearchParams(shareQuery).entries()) params.set(key, valueEntry);
  return params.toString();
}
export function parse(query) {
  const params = query instanceof URLSearchParams ? query : new URLSearchParams(query);
  if ((params.get('v') ?? URL_VERSION) !== URL_VERSION) throw new Error('[URL] Unbekannte URL-Version.');
  const parsed = { ...normalisiereSuchkriterien({
    f: params.get('f'),
    M: list(params, 'M').map(Number),
    I: list(params, 'I'),
    A: list(params, 'A'),
    L: list(params, 'L'),
    P: list(params, 'P'),
    relax: normalizeRelax(params.get('relax')),
  }) };
  const zeitart = params.get('zeitart');
  if (zeitart === 'spanne') {
    if (!params.has('von') || !params.has('bis')) throw new Error('[URL] Feste Reisezeit benoetigt Start- und Enddatum.');
    const months = resolveTravelMonths({ mode: 'fixed', startDate: params.get('von'), endDate: params.get('bis') });
    if (months.join(',') !== parsed.M.join(',')) throw new Error('[URL] Datumsbereich und Monatsmenge widersprechen sich.');
    parsed.zeitart = 'spanne';
    parsed.von = params.get('von');
    parsed.bis = params.get('bis');
  } else if (zeitart === 'monate' || zeitart === 'monat') {
    if (params.has('von') || params.has('bis')) throw new Error('[URL] Datumswerte sind nur bei zeitart=spanne erlaubt.');
    if (zeitart === 'monat' && parsed.M.length !== 1) throw new Error('[URL] zeitart=monat benoetigt genau einen Monat.');
    parsed.zeitart = zeitart;
  } else if (zeitart || params.has('von') || params.has('bis')) {
    throw new Error('[URL] Reisezeitparameter sind ungueltig oder unvollstaendig.');
  }
  if (params.has('cmp')) parsed.compare = normalizeSharedIds(list(params, 'cmp'), new Set(), 3);
  if (params.has('wish')) parsed.wishlist = normalizeSharedIds(list(params, 'wish'), new Set(), 10);
  return parsed;
}
