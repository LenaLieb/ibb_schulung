# AP 13 – Geführte Einstiege und Entscheidungshilfen

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung entscheidet über die fachliche Einordnung der Einstiege; Fachkonzeption dokumentiert die Pflichtangaben, Auswahlregeln und Hilfetexte; Qualitätssicherung prüft die Konsistenz mit Familien-, Single- und Paar-Journeys.  
**Quellen:** Entwicklungsplan, User Stories US-07, US-15, US-16, US-25 und US-38, AP 01 F-02 bis F-05 und F-07 bis F-09, AP 08 bis AP 10, AP 12.

## Auftrag und Abgrenzung

Dieses Paket legt die fachlich verbindlichen Regeln für geführte Einstiege und Entscheidungshilfen fest. Es beschreibt, wie Nutzerinnen und Nutzer mit typischen Startpunkten wie Ferien, Themen, Familienkontext und überbestimmter Auswahl durch klare, korrigierbare Suchwege zu gültigen Kriterien gelangen, ohne versteckte Annahmen zu treffen.

Nicht Teil dieses Pakets sind die konkrete UI-Umsetzung oder die technische Auswahl einer Dialogstruktur, die Datenbankgröße oder die Herleitung des vollständigen Empfehlungsmodells. Eine fachliche Regel darf nicht als „später klären“ an ein Folgepaket weitergegeben werden; Startpunkt, Vorbelegung, Validierung und Korrektur müssen in der Spezifikation nachvollziehbar sein.

## Lieferobjekte

- Einstiegsmodell
  - Inhalt: Ferien-Einstieg, Themen-Einstieg, Familienkontext und Vorbelegungslogik.
  - Abnahmeverantwortung: Produktverantwortung.

- Pflichtangabenmodell
  - Inhalt: Bundesland, Schuljahr, Ferienart, Kinderalter, Interesse und andere erforderliche Kriterien.
  - Abnahmeverantwortung: Fachkonzeption.

- Hilfs- und Entscheidungsregeln
  - Inhalt: überbestimmte Auswahl, einschränkendstes Kriterium, Rahmen- und Vorschlagstexte.
  - Abnahmeverantwortung: Produktverantwortung.

- Zustands- und Korrekturlogik
  - Inhalt: sichtbarer Zustand, änderbare Voreinstellungen, URL-Verhalten und Abbruchpfad.
  - Abnahmeverantwortung: Qualitätssicherung.

- Referenzfallkatalog
  - Inhalt: Normalfälle, Grenzfälle und fehlende Pflichtangaben mit erwarteten Suchkriterien.
  - Abnahmeverantwortung: Qualitätssicherung.

## Verbindliche Fachregeln und Entscheidungsprotokoll

- E-01 — Ferien-Einstieg
  - Verbindlicher Stand: Der Ferien-Einstieg verlangt Bundesland und Schuljahr; fehlen gültige Termine, wird er nicht angeboten, und eine manuelle Reisezeit bleibt weiterhin möglich.
  - Sperrwirkung: Suche und Ferien-Einstieg.

- E-02 — Reisezeit-Übersetzung
  - Verbindlicher Stand: Die Auswahl von Ferienkalender, Spanne und Monatsmenge wird in die Standard-Reisezeit M übersetzt; die Logik muss für Ferienjahr, Monatsauswahl und Datumsspanne identisch mit AP 01 gelten.
  - Sperrwirkung: Matching und Reisezeit.

- E-03 — Themen-Einstieg
  - Verbindlicher Stand: Themen-Einstiege liefern nur vorbelegte Kriterien, die fachlich belegt, sichtbar und änderbar sind; Pflichtangaben wie Kinderalter müssen vor dem Ergebnis geklärt werden.
  - Sperrwirkung: Suche und Themen-Einstieg.

- E-04 — Familienkontext
  - Verbindlicher Stand: Für Familien muss der relevante Alterskontext in der Suche nachvollziehbar sein; fehlende Altersangaben sind kein stillschweigender Trefferbestand.
  - Sperrwirkung: Familien- und Suchlogik.

- E-05 — Entscheidungshilfe
  - Verbindlicher Stand: Hilfen für überbestimmte Interessen und das einschränkendste Kriterium sind nur dann anzuzeigen, wenn die definierte Regel dies explizit zulässt; sie dürfen die Kriterien nie ungefragt ändern.
  - Sperrwirkung: Suche und Suchdiagnose.

- E-06 — Korrekturmöglichkeit
  - Verbindlicher Stand: Jeder vorgesehene Einstieg und jede Hilfsentscheidung muss in der Suche vollständig eingesehen und geändert werden können, bevor oder nach dem Ergebnis.
  - Sperrwirkung: Suche und URL-Zustand.

- E-07 — Text- und Zustandslogik
  - Verbindlicher Stand: Texte, Hinweise und Zustandsübergänge müssen mit den Single-, Paar- und Familien-Journeys konsistent sein; keine versteckte Annahme darf der Suche zugrunde liegen.
  - Sperrwirkung: Nutzerführung und Abnahme.

Die expliziten Regeln aus AP 01 zu Reisezeit, Interessen, Saison und Lockerung sind die fachliche Grundlage; dieses Paket verbindlich konkretisiert die Benutzerführung, Vorbelegung, Validierung und Hilfslogik für den Einstieg.

## Konkrete Arbeitsschritte

1. Ferienkalender, Bundesland, Jahr, Ferienart, Quelle und Prüfdatum nach fachlicher Übernahmebasis definieren; die Ausgabe in eindeutige Reisezeitwerte M und den manuellen Alternativpfad übersetzen.
2. Themen-Einstiege mit Vorbelegungen und Pflichtangaben modellieren; jede Voreinstellung erhält eine fachliche Begründung und eine Änderungsoption.
3. Familienkontext und Alterslogik samt erforderlicher Validierung mit den Must-Storys und Grenzfall-Journeys durchrechnen; Fehlzustände in den Referenzfallkatalog aufnehmen.
4. Überbestimmte Interessenauswahl und das einschränkendste Kriterium als Entscheidungshilfe festlegen; jede Vorschlagslogik muss belegt und transparent erklärbar sein.
5. Zustandsübergänge zwischen Einstieg, Suchergebnis und Korrektur vollständig dokumentieren; Abbruch- und Rücknavigationspfade mit den Journeys prüfen.
6. Die Rückverfolgbarkeitsmatrix mit User Stories, Grenzfall-Journeys und Entscheidungshilfen vervollständigen und fachlich gegen AP 01 bis AP 12 abgleichen.

## Teststrategie

### Regeltest
- Prüfobjekt: Ferien-Einstieg, Reisezeit-Übersetzung, Vorbelegung, Familienpflichtangaben, Entscheidungshilfe.
- Mindestnachweis: Erwarteter Suchzustand und Parameter je Fall.

### Journey-Test
- Prüfobjekt: Familien-, Single- und Paar-Journey mit Ferien- und Themen-Einstieg.
- Mindestnachweis: Vollständiger Ablauf von Auswahl bis Ergebnis mit verständlicher Korrektur.

### Grenzfalltest
- Prüfobjekt: fehlende Bundesland-/Schuljahrsdaten, fehlendes Kinderalter, überbestimmte Interessen, Abbruch nach Hilfetext.
- Mindestnachweis: kein unfreiwilliger Trefferbestand, keine stillschweigende Korrektur.

### Konsistenztest
- Prüfobjekt: AP 01, AP 08 bis AP 12 und Paket 13.
- Mindestnachweis: keine widersprüchliche Regel; Pflichtangaben und Hilfen bleiben sachlich konsistent.

### Abnahmetest
- Prüfobjekt: Fachspezifikation und Journeys.
- Mindestnachweis: Produktverantwortung bestätigt Einstiegs- und Hilfslogik.

## Risiken

Skala: Eintrittswahrscheinlichkeit (EW) und Auswirkung (AW) von 1 = niedrig bis 3 = hoch.

- R-13-01 — Ferien-Einstieg trifft implizite Annahmen.
  - EW: 3
  - AW: 3
  - Gegenmaßnahme: Bundesland, Schuljahr und manuelle Alternative verbindlich dokumentieren.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die zulässige Fassung.

- R-13-02 — Vorbelegungen ändern die Kriterien stillschweigend.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Nichts kann als Vorbelegung gelten, ohne sichtbar und änderbar zu sein.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- R-13-03 — Familienkontext bleibt bei fehlenden Altersangaben unklar.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Pflichtangaben und Grenzfälle fachlich im Referenzfallkatalog festhalten.
  - Eskalation/Abnahme: AP 15 darf nicht starten.

- R-13-04 — Entscheidungshilfen wirken wie ein verdeckter Suchschritt.
  - EW: 2
  - AW: 2
  - Gegenmaßnahme: Vorschläge nur auf Grundlage definierter Regeln und mit Änderungsoption anzeigen.
  - Eskalation/Abnahme: Produktverantwortung entscheidet den zulässigen Hinweis.

## Definition of Done

- Alle Lieferobjekte liegen versioniert vor.
- Ferien-Einstieg, Themen-Einstieg, Familienkontext, Pflichtangaben und Entscheidungshilfen sind verbindlich dokumentiert oder mit sichtbarer Sperrwirkung versehen.
- Jeder relevante Normal- und Grenzfall ist mit erwartetem Suchzustand und korrigierbarer Anzeige belegt.
- Keine Eingangslogik ändert Kriterien stillschweigend oder ohne Sichtbarkeit.
- Produktverantwortung und Qualitätssicherung haben das Paket freigegeben.

**Voraussetzung:** AP 08 bis AP 10 sowie AP 12. **Nachfolger:** AP 15.
