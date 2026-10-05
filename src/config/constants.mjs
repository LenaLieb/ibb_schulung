export const REISEFORMEN = Object.freeze(['single', 'paar', 'familie']);
export const ALTERSGRUPPEN = Object.freeze(['A0_5', 'A6_11', 'A12P']);
export const INTERESSEN = Object.freeze([
  { id: 'STRAND', label: 'Strand' }, { id: 'STADT', label: 'Stadt' },
  { id: 'NATUR', label: 'Natur' }, { id: 'KULTUR', label: 'Kultur' },
  { id: 'AKTIVURLAUB', label: 'Aktivurlaub' }, { id: 'ERHOLUNG', label: 'Erholung' },
  { id: 'KULINARIK', label: 'Kulinarik' }, { id: 'AUSFLUEGE', label: 'Ausflüge' },
]);
export const INTERESSEN_IDS = Object.freeze(INTERESSEN.map((item) => item.id));
export const INTERESSEN_RANG = Object.freeze(Object.fromEntries(INTERESSEN_IDS.map((id, i) => [id, i + 1])));
export const PREISNIVEAUS = Object.freeze(['EUR', 'EUR_EUR', 'EUR_EUR_EUR', 'EUR_EUR_EUR_EUR']);
export const MONATE = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
export const STANDARD_GEWICHTE = Object.freeze({ interessen: 0.5, saison: 0.3, reiseform: 0.2 });
export const URL_VERSION = '1';
export const MAX_ERGEBNISSE = 12;
