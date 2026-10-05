export function mergeSelection(local = [], remote = [], max = 3) {
  const merged = [...new Set([...(Array.isArray(local) ? local : []), ...(Array.isArray(remote) ? remote : [])].filter(Boolean).map((id) => String(id).trim()).filter(Boolean))];
  return merged.slice(0, max);
}

export function selectComparisonTargets(ids = [], targets = [], max = 3) {
  const valid = new Set(targets.map((target) => target.id));
  const unique = [...new Set(ids.filter((id) => valid.has(id)))].slice(0, max);
  return targets.filter((target) => unique.includes(target.id));
}

const ALL_MONTHS = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

function normalizedMonths(months) {
  return [...new Set((Array.isArray(months) ? months : []).filter((month) => Number.isInteger(month) && month >= 1 && month <= 12))].sort((a, b) => a - b);
}

export function resolveComparisonPeriod(criteria = {}, options = {}) {
  if (options.view === 'year') return { type: 'year', months: [...ALL_MONTHS], source: 'annual-overview' };

  const searchMonths = normalizedMonths(criteria.M);
  if (searchMonths.length > 0) {
    return { type: searchMonths.length === 1 ? 'month' : 'period', months: searchMonths, source: 'search' };
  }

  const selectedMonth = options.selectedMonth;
  if (Number.isInteger(selectedMonth) && selectedMonth >= 1 && selectedMonth <= 12) {
    return { type: 'month', months: [selectedMonth], source: 'selection' };
  }

  return { type: 'month-required', months: [], source: 'selection' };
}

export function compareMonth(criteria = {}, selectedMonth = null) {
  const period = resolveComparisonPeriod(criteria, { selectedMonth });
  return period.months.length === 1 ? period.months[0] : null;
}

export function visibleComparisonTargets(ids = [], targets = [], options = {}) {
  const maxVisible = Number.isFinite(options.maxVisible) ? options.maxVisible : 2;
  const narrow = Boolean(options.narrow);
  const validIds = new Set((Array.isArray(targets) ? targets : []).map((target) => String(target.id ?? '')).filter(Boolean));
  const unique = [...new Set((Array.isArray(ids) ? ids : []).filter((id) => validIds.has(String(id ?? '').trim())).map((id) => String(id).trim()))];
  const visible = narrow ? unique.slice(0, maxVisible) : unique.slice(0, Math.min(unique.length, 3));
  const hidden = unique.filter((id) => !visible.includes(id));
  return {
    visible: visible,
    hidden: hidden,
    narrow,
    maxVisible
  };
}

export function reconcileComparisonNavigation(compare = [], returnTo = [], targets = []) {
  const validIds = new Set((Array.isArray(targets) ? targets : []).map((target) => String(target.id ?? '')).filter(Boolean));
  const sanitizedCompare = [...new Set((Array.isArray(compare) ? compare : []).map((id) => String(id ?? '').trim()).filter(Boolean).filter((id) => validIds.has(id)))].slice(0, 3);
  const safeReturn = [...new Set((Array.isArray(returnTo) ? returnTo : []).map((id) => String(id ?? '').trim()).filter(Boolean).filter((id) => validIds.has(id)))].slice(0, 3);
  return {
    compare: sanitizedCompare,
    returnTo: safeReturn.length ? safeReturn : sanitizedCompare.slice(0, 1),
    validIds
  };
}

export function reconcileJourneyState(state = {}, targets = []) {
  const validIds = new Set((Array.isArray(targets) ? targets : []).map((target) => String(target.id ?? '')).filter(Boolean));
  const compare = [...new Set((Array.isArray(state.compare) ? state.compare : []).map((id) => String(id ?? '').trim()).filter(Boolean).filter((id) => validIds.has(id)))].slice(0, 3);
  const wishlist = [...new Set((Array.isArray(state.wishlist) ? state.wishlist : []).map((id) => String(id ?? '').trim()).filter(Boolean).filter((id) => validIds.has(id)))].slice(0, 10);
  const returnTo = [...new Set((Array.isArray(state.returnTo) ? state.returnTo : []).map((id) => String(id ?? '').trim()).filter(Boolean).filter((id) => validIds.has(id)))].slice(0, 3);

  return {
    compare,
    wishlist,
    returnTo: returnTo.length ? returnTo : compare.length ? compare.slice(0, 1) : wishlist.slice(0, 1),
    validIds
  };
}

export function buildComparisonSnapshot(targets = [], selection = [], options = {}) {
  const chosen = selectComparisonTargets(selection, targets, 3);
  const comparisonOptions = Number.isInteger(options) ? { selectedMonth: options } : options;
  const period = resolveComparisonPeriod(comparisonOptions.criteria ?? {}, comparisonOptions);
  return {
    month: period.months.length === 1 ? period.months[0] : null,
    period,
    targets: chosen.map((target) => ({
      id: target.id,
      name: target.name,
      land: target.land,
      region: target.region,
      preisniveau: target.preisniveau,
      saison: Object.fromEntries(period.months.map((month) => [month, Number.isFinite(Number(target.saison?.[month])) ? Number(target.saison[month]) : null])),
      interestFocus: Object.entries(target.interessen ?? {})
        .filter(([, score]) => Number(score) >= 1)
        .sort((a, b) => Number(b[1]) - Number(a[1]))
        .slice(0, 3)
        .map(([id]) => id)
    }))
  };
}
