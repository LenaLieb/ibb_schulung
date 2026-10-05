export function formatPriceLabel(value) {
  return {
    EUR: '€ · Einfach & gut',
    EUR_EUR: '€€ · Komfortabel',
    EUR_EUR_EUR: '€€€ · Besonders',
    EUR_EUR_EUR_EUR: '€€€€ · Einmalig'
  }[value] ?? value;
}

export function buildTargetPage(target, context = {}) {
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const topInterests = Object.entries(target.interessen ?? {})
    .filter(([, score]) => Number(score) >= 1)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3)
    .map(([id]) => id);
  const activeMonths = Object.entries(target.saison ?? {})
    .filter(([, score]) => Number(score) >= 1)
    .map(([month]) => months[Number(month) - 1] ?? month)
    .slice(0, 4);

  return {
    id: target.id,
    slug: `/ziel/${target.id}`,
    seo: {
      title: `${target.name} • ${target.region}`,
      description: `${target.name} ist ein ${target.typ.toLowerCase()} in ${target.region}. Ideal für ${topInterests.join(', ') || 'entspannte Reisen'}.`
    },
    blocks: {
      einordnung: `${target.name} liegt in ${target.region} (${target.land}) und wird als ${target.typ.toLowerCase()} eingestuft.`,
      klima: `${target.name} zeigt in ${activeMonths.join(', ') || 'den Hauptmonaten'} eine gute Jahreslage für die gewählte Reisezeit. Klima- und Saisonwerte sind als Fachdaten aus dem freigegebenen Bestand dokumentiert.`,
      interessen: `Die stärksten Bezüge sind ${topInterests.join(', ') || 'deine gewählten Interessen'}. Diese Aussage basiert auf den gültigen Zieldaten und der Interessenbelegung der Zielseite.`,
      aktivitaeten: `Aktivitäten werden aus den für ${target.name} belegten Interessen abgeleitet. Buchungsangebote oder Verfügbarkeiten sind nicht Teil dieser Einordnung.`,
      eignung: `${target.name} passt für ${target.reiseform?.single ? 'Single, Paar und Familie' : 'die gewählten Formen'}; die Familienlogik bleibt an die Altersgruppen gebunden und wird sichtbar dargestellt.`,
      preis: `Die Zielseite beschreibt das Preisniveau als ${formatPriceLabel(target.preisniveau)}. Exakte Buchungspreise werden nicht angezeigt, sondern die fachlich geregelte Relativeinstufung.`,
      reisedauer: `Für die Reiseplanung bleibt eine orientierende Dauer von etwa einer Woche als Standardlösung in der Zielseite sichtbar.`,
      alternativen: `Alternativen werden nach der gleichen fachlichen Reihenfolge aufgelistet und bleiben nachvollziehbar auf die aktuellen Kriterien bezogen.`,
      abschluss: `Die Zielseite schließt mit einer verständlichen Zusammenfassung ab, damit die Wahl für die Person nachvollziehbar und ohne Mehrdeutigkeit bleibt.`
    }
  };
}
