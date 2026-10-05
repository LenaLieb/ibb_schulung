# AP 11 – Zielseiten und organische Auffindbarkeit

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung definiert inhaltliche Priorität und fachliche Aussagen; Fachkonzeption dokumentiert Pflichtblöcke und SEO-Anforderungen; Qualitätssicherung prüft Inhalt, Rendering und Barrierefreiheit.  
**Quellen:** Entwicklungsplan, User Stories US-26 bis US-33, US-37 und US-42, AP 01 F-11 und F-12, AP 04 bis AP 06, AP 08 und AP 09.

## Auftrag und Abgrenzung

Dieses Paket legt die fachlich verbindlichen Anforderungen für vollständige und verständliche Zielseiten fest. Ziel ist es, jede freigegebene Zielseite fachlich sauber, inhaltlich vollständig und technisch suchmaschinenfreundlich darzustellen – mit und ohne vorherige Suche.

Nicht Teil dieses Pakets sind die visuelle Gestaltung über den fachlichen Inhalt hinaus, die Auswahl eines CMS oder Frameworks, die Umsetzung von Buchungs- oder Kontaktfunktionen sowie die Erstellung einer generischen Landingpage-Architektur. Eine fachliche Aussage darf nicht als „später klären“ an ein Folgepaket weitergegeben werden; die Zielseite muss in ihrer fachlichen Struktur und inhaltlichen Reihenfolge dokumentiert und testbar sein.

## Lieferobjekte

- **Zielseiten-Layout**
  - Inhalt: Pflichtblöcke, Reihenfolge, Inhalt und Grenzfälle
  - Abnahmeverantwortung: Produktverantwortung

- **Datengrundlagen**
  - Inhalt: Klima, Preis, Reiseform, Familienkontext und Referenzbasis
  - Abnahmeverantwortung: Fachkonzeption

- **SEO-/Rendering-Vertrag**
  - Inhalt: URL, Metadaten, strukturiertes Datenmodell und Server-Rendering-Option
  - Abnahmeverantwortung: Qualitätssicherung

- **Fallback- und Fehlerfallkatalog**
  - Inhalt: unbekannte Ziel-ID, Rückzug, leere Suche, fehlende Daten
  - Abnahmeverantwortung: Fachkonzeption

- **Referenzfallkatalog**
  - Inhalt: Zielseiten für Normal-, Grenz- und Fehlerfälle mit erwarteter Ausgabe
  - Abnahmeverantwortung: Qualitätssicherung

## Verbindliche Fachregeln und Entscheidungsprotokoll

- **S-01 — Pflichtblockreihenfolge**
  - Verbindlicher Stand: Zielseiten verwenden die definierte Reihenfolge: Einordnung, Klima, Interessen, Aktivitäten, Eignung, Preis, Reisedauer, Alternativen und Abschluss. Abweichungen sind nur mit fachlichem Beschluss zulässig.
  - Sperrwirkung: Zielseiteninhalt

- **S-02 — Suchkontext**
  - Verbindlicher Stand: Wenn keine Suche vorausgeht, darf keine unverständliche Leerstelle entstehen. Der Inhalt muss den Zielkontext auch ohne Vorfilter verständlich erklären.
  - Sperrwirkung: Zielseiteninhalt

- **S-03 — Klima**
  - Verbindlicher Stand: Klima wird mit Quelle, Referenzperiode und monatlicher Einordnung dargestellt. Wetterprognosen, Vorhersagen und Buchungsversprechen sind nicht Teil der Zielseite.
  - Sperrwirkung: Datenmodell und Zielseite

- **S-04 — Preis**
  - Verbindlicher Stand: Der Preis wird als relative Klasse statt als exakte Buchungsbeträge dargestellt; die fachlich definierte Klassenlogik ist verbindlich.
  - Sperrwirkung: Zielseiteninhalt und Matching

- **S-05 — Reiseform und Familienkontext**
  - Verbindlicher Stand: Reiseform und bei Familien jede relevante Altersgruppe werden anhand der Datenbasis konkret und nachvollziehbar erklärt.
  - Sperrwirkung: Datenmodell und Zielseite

- **S-06 — URL und Assets**
  - Verbindlicher Stand: Stabile sprechende URLs, serverseitiges Rendering oder statische Generierung, eindeutige Metadaten und strukturierte Daten sind Teil der fachlichen Abnahmebasis.
  - Sperrwirkung: SEO und Rendering

- **S-07 — Rückzug und unbekannte Ziele**
  - Verbindlicher Stand: Rückgezogene Ziele, unbekannte Ziel-IDs und fehlende Suchkontexte werden als eigene Zustände behandelt; ein Gesamtabbruch ist nicht zulässig.
  - Sperrwirkung: Zielseiten- und Suchzustand

- **S-08 — Inhaltliche Korrektheit**
  - Verbindlicher Stand: Eine Zielseite darf keine Angaben enthalten, die aus dem Zielmodell, der Datengrundlage oder der Fachregeln nicht herleitbar sind.
  - Sperrwirkung: Zielseite und Datenmodell

Die in AP 01 definierten Regeln zu Datenherkunft, Freigabe und Rückzug bilden die fachliche Grundlage für dieses Paket. Die unmittelbaren Inhalte auf der Zielseite müssen auf diese Regeln zurückführbar sein.

## Konkrete Arbeitsschritte

1. Die Pflichtblockreihenfolge und den Inhalt jedes Blocks mit fachlichem Mindestumfang aus AP 01 und den Stories verknüpfen; jeder Block erhält eine eindeutige fachliche Begründung.
2. Den Zielseitenkontext ohne Suche definieren; Leerbereiche, fehlende Daten und ungeklärte Suchzusammenhänge in den Fallback- und Fehlerfallkatalog aufnehmen.
3. Die Datengrundlagen für Klima, Preis, Reiseform und Familienkontext mit Quellen, Referenzperioden und zulässigen Aussageformen festhalten; jede Aussage muss belegt sein.
4. Die Regeln für URL, Meta-Angaben und strukturiertes Datenmodell dokumentieren; sie gelten unabhängig davon, ob Rendering serverseitig oder statisch geschieht.
5. Die Fallback-Fälle unbekannte Ziel-ID, Rückzug und fehlende Suche mit erwarteter Ausgabe und sichtbarer Meldung komplett durchrechnen.
6. Die Rückverfolgbarkeitsmatrix mit Zielseitenfällen, Datenbegründungen und SEO-Elementen prüfen und entscheiden, welche Inhalte als Pflichtbestand in der Abnahme gelten.

## Teststrategie

- **Regeltest**
  - Prüfobjekt: Pflichtblöcke, Reihenfolge, Datengrundlage, URL- und Meta-Regeln
  - Mindestnachweis: Fachlich dokumentierte Erwartung je Zielseite und je Inhaltselement

- **Render-/Inhalts-Test**
  - Prüfobjekt: Zielseite ohne Suche, mit Suche, mit Rückzug und mit unbekannter Ziel-ID
  - Mindestnachweis: HTML-Inhalt vollständig, keine Lücken im fachlichen Inhalt

- **SEO-Test**
  - Prüfobjekt: Metadaten, statische URL, strukturierte Daten, mobile Darstellung
  - Mindestnachweis: Ergebnisse sind im ausgelieferten HTML vorhanden und logisch verknüpft

- **Barrierefreiheitstest**
  - Prüfobjekt: Semantische Struktur, Lesbarkeit, Überschriften, alternative Inhalte
  - Mindestnachweis: Grundanforderungen für mobile und barrierefreie Darstellung erfüllt

- **Abnahmetest**
  - Prüfobjekt: Zielseiten- und SEO-Fachbasis
  - Mindestnachweis: Produktverantwortung bestätigt Pflichtbestand und gewünschte Abgrenzung

## Risiken

- **R-11-01 — Zielseiten werden fachlich unvollständig dargestellt.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: Pflichtblöcke und Datenbegründungen in der Spezifikation verankern.
  - Eskalation/Abnahme: Produktverantwortung verweist auf unvollständige Fassung.

- **R-11-02 — URL, Meta-Angaben und ausgeliefertes HTML gehen auseinander.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Rendering- und SEO-Vertrag als fachliche Abnahmebasis festlegen.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- **R-11-03 — Klima- oder Preisangaben sind nicht datengestützt.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Jede Aussage muss auf Quelle, Referenzperiode oder Modellbasis zurückführbar sein.
  - Eskalation/Abnahme: Kein Freigeben der Zielseite.

- **R-11-04 — Rückzug oder unbekannte Ziel-ID führen zu Seitenfehlern.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: Fallback- und Fehlerzustände als eigene Fälle dokumentieren.
  - Eskalation/Abnahme: AP 15 darf nicht starten.

## Definition of Done

- Alle Lieferobjekte liegen versioniert vor.
- Pflichtblöcke, Reihenfolge, Datenanforderungen, SEO-/Rendering-Vertrag und Fehlerzustände sind verbindlich dokumentiert.
- Jede freigegebene Zielseite ist ohne Suche vollständig lesbar und in der ausgelieferten HTML-Ausgabe vorhanden.
- Keine Aussage auf der Zielseite ist ohne Daten- oder fachliche Grundlage.
- Produktverantwortung und Qualitätssicherung haben das Paket freigegeben.

**Voraussetzung:** AP 04 bis AP 06 sowie AP 08. **Nachfolger:** AP 12, AP 14 und AP 15.
