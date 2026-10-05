import { MONATE } from '../config/constants.mjs';
import { matching } from './matching.mjs';

export const RELAXATION_LEVELS = Object.freeze(['R0', 'R1', 'R2']);

const monthLabel = (month) => {
  const labels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return labels[Number(month) - 1] ?? String(month);
};

export function normalizeRelax(value) {
  if (value == null) return 'ORIGINAL';
  if (value === 'AUTO' || value === 'ORIGINAL') return value;
  throw new Error('[URL] Relaxationswert ist ungueltig.');
}

export function expandMonthSet(months = []) {
  const expanded = new Set(months.map((month) => Number(month)).filter((month) => MONATE.includes(month))); 
  for (const month of [...expanded]) {
    if (month > 1) expanded.add(month - 1);
    if (month < 12) expanded.add(month + 1);
  }
  return [...expanded].sort((a, b) => a - b);
}

export function diagnoseNoResults(criteria, targets) {
  const suggestions = [];
  if (Array.isArray(criteria.L) && criteria.L.length > 0) {
    suggestions.push({
      type: 'land',
      text: `Für ${criteria.L.join(', ')} gibt es im freigegebenen Bestand keine Treffer. Entferne das Land oder wähle ein anderes Wunschland.`
    });
  }
  if (Array.isArray(criteria.M) && criteria.M.length > 0) {
    const expanded = expandMonthSet(criteria.M);
    suggestions.push({
      type: 'monat',
      text: `Für ${criteria.M.map((month) => monthLabel(month)).join(', ')} gibt es keine Treffer. Prüfe angrenzende Monate wie ${expanded.map((month) => monthLabel(month)).join(', ')}.`
    });
  }
  return suggestions.slice(0, 2);
}

export function chooseRelaxation(criteria, targets) {
  const answer = matching(criteria, targets);
  if (answer.results.length >= 3) return { level: 'R0', label: 'keine Lockerung', relaxedCriteria: criteria, suggestions: [] };
  if (Array.isArray(criteria.I) && criteria.I.length > 1) {
    const relaxedCriteria = { ...criteria, I: [...criteria.I].slice(1) };
    return { level: 'R1', label: 'Interessenfilter lockern', relaxedCriteria, suggestions: [{ type: 'interesse', text: 'Mindestens ein Interesse wird gelockert, damit die Suche wieder mehr passende Ziele zeigt.' }] };
  }
  if (Array.isArray(criteria.M) && criteria.M.length > 0) {
    const relaxedCriteria = { ...criteria, M: expandMonthSet(criteria.M) };
    return { level: 'R2', label: 'Monatsfilter lockern', relaxedCriteria, suggestions: [{ type: 'monat', text: 'Die angrenzenden Monate werden für die Suche ergänzt, ohne den Saisonfilter aufzuheben.' }] };
  }
  return { level: 'DIAGNOSE', label: 'Diagnose', relaxedCriteria: criteria, suggestions: diagnoseNoResults(criteria, targets) };
}
