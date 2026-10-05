function parseDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Datum muss im Format JJJJ-MM-TT angegeben werden.');
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`Datum ungueltig: ${value}`);
  }
  return parsed;
}

export function resolveTravelMonths({ mode, startDate, endDate, months = [] } = {}) {
  if (mode === 'flexible') {
    if (!Array.isArray(months) || months.length === 0 || months.some((month) => !Number.isInteger(month) || month < 1 || month > 12)) {
      throw new Error('Flexible Reisezeit benoetigt mindestens einen gueltigen, explizit ausgewaehlten Monat.');
    }
    return [...new Set(months)].sort((a, b) => a - b);
  }

  if (mode !== 'fixed') throw new Error('Reisezeitmodus muss fest oder flexibel sein.');

  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (start > end) throw new Error('Das Startdatum darf nicht nach dem Enddatum liegen.');

  const monthsInSpan = new Set();
  let year = start.getUTCFullYear();
  let month = start.getUTCMonth() + 1;
  const endYear = end.getUTCFullYear();
  const endMonth = end.getUTCMonth() + 1;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    monthsInSpan.add(month);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return [...monthsInSpan].sort((a, b) => a - b);
}