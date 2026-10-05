import { INTERESSEN, MAX_ERGEBNISSE } from '../config/constants.mjs';

const formatList = (entries) => {
  if (entries.length === 0) return '';
  if (entries.length === 1) return entries[0];
  if (entries.length === 2) return `${entries[0]} und ${entries[1]}`;
  return `${entries.slice(0, -1).join(', ')}, und ${entries.at(-1)}`;
};

const monthLabel = (month) => {
  const labels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return labels[Number(month) - 1] ?? String(month);
};

const formLabel = (form) => ({ single: 'Single', paar: 'Paar', familie: 'Familie' }[form] ?? form);

export function trimResults(results, limit = MAX_ERGEBNISSE) {
  const max = Number.isFinite(Number(limit)) ? Number(limit) : MAX_ERGEBNISSE;
  return results.slice(0, Math.max(0, max));
}

export function summarizeResult(result, criteria = {}) {
  const selectedInterests = (criteria.I ?? []).filter((id) => result?.interests?.includes(id));
  const interestLabels = selectedInterests.map((id) => INTERESSEN.find((item) => item.id === id)?.label ?? id);
  const monthLabels = (criteria.M ?? []).map((month) => monthLabel(month));
  const parts = [];

  if (interestLabels.length > 0) parts.push(`passt zu ${formatList(interestLabels)}`);
  if (monthLabels.length > 0) parts.push(`in ${formatList(monthLabels)} gut geeignet`);
  if (criteria.f) parts.push(`für ${formLabel(criteria.f)} passend`);

  return parts.join('; ') || `${result?.name ?? 'Ziel'} ist passend.`;
}
