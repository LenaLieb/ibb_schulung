# AP 09 – Ergebnisliste und datenbasierte Begründungen

**Status:** Nach Matching-Kern (AP 07) und gültigem Suchzustand (AP 08) umsetzbar.  
**Verantwortung:** Entwicklung implementiert Ergebnisvertrag und Darstellung; Fachkonzeption prüft die Begründungslogik; Qualitätssicherung prüft Vollständigkeit, Bedienbarkeit und Rückverfolgbarkeit.  
**Stories:** US-20 und US-21.  
**Abhängigkeiten:** AP 07 liefert die sortierten Originaltreffer und Rohwerte; AP 08 liefert validierte Kriterien. Lockerungen und Diagnosen werden erst in AP 10 ergänzt.

## Auftrag und Abgrenzung

Dieses Paket stellt Originaltreffer als begrenzte, barrierefrei bedienbare Ergebnisliste dar. Jede Karte erklärt anhand der ausgewählten Kriterien und gespeicherten Zieldaten, warum das Ziel passt. Die Ergebnisliste ergänzt oder verändert weder die Matching-Reihenfolge noch fachliche Daten.

Nicht Teil dieses Pakets sind gelockerte Treffer, Nulltrefferdiagnosen, Themen- und Ferien-Einstiege, Vergleich oder Merkliste. Diese Funktionen dürfen den Ergebnisvertrag verwenden, aber keine unbelegten Begründungen ergänzen.

## Lieferobjekte

- **Ergebnisvertrag**
  - Inhalt: Eingabe aus AP 07/08, Begrenzung, Kennzeichnung und sichtbare Felder
  - Abnahmeverantwortung: Fachkonzeption

- **Kartenvertrag**
  - Inhalt: feste Datenfelder, Bild- und Lizenzangaben, Fokusreihenfolge und Ziel-Link
  - Abnahmeverantwortung: Qualitätssicherung

- **Begründungsgenerator**
  - Inhalt: deterministische Textbausteine ausschließlich aus erfüllten Daten
  - Abnahmeverantwortung: Fachkonzeption

- **Rückverfolgbarkeitsnachweis**
  - Inhalt: Zuordnung jeder Kartenaussage zu Suchkriterium und Zielattribut
  - Abnahmeverantwortung: Qualitätssicherung

- **Bedienbarkeitstestkatalog**
  - Inhalt: Tastatur, Fokus, Screenreader-Ansagen und schmale Ansicht
  - Abnahmeverantwortung: Qualitätssicherung

- **Journey-Screenshots/Protokoll**
  - Inhalt: dokumentierte Ergebnislisten der drei Haupt-Journeys
  - Abnahmeverantwortung: Produktverantwortung

## Ergebnis- und Begründungsvertrag

- **E-01 — Quelle**
  - Verbindlicher Stand: Die Liste nutzt ausschließlich die bereits sortierten `MatchResult` aus AP 07 und den validierten Suchzustand aus AP 08.
  - Sperrwirkung: Keine eigene Neuberechnung oder abweichende Sortierung.

- **E-02 — Begrenzung**
  - Verbindlicher Stand: Es erscheinen höchstens zwölf eindeutige Ziele. Gibt es mehr, wird die Anzahl benannt und zur Verfeinerung hingewiesen.
  - Sperrwirkung: Stilles Abschneiden ist unzulässig.

- **E-03 — Hervorhebung**
  - Verbindlicher Stand: Die ersten bis zu drei Originaltreffer erhalten die Kennzeichnung „beste Übereinstimmung”.
  - Sperrwirkung: Kennzeichnung folgt exakt der AP-07-Reihenfolge.

- **E-04 — Kartenfelder**
  - Verbindlicher Stand: Jede Karte zeigt Bild mit Lizenzhinweis, Name, Region, Land, Begründung, bis zu drei prägende Interessen und Preisniveau.
  - Sperrwirkung: Karte ohne Pflichtfeld ist nicht ausgabefähig.

- **E-05 — Begründungsdaten**
  - Verbindlicher Stand: Genannt werden nur gewählte Interessen mit `interesse_d(i) >= 1` und eine durch `saison_d` belegte Saisonaussage.
  - Sperrwirkung: Kein Satz darf nicht belegte Merkmale nennen.

- **E-06 — Textform**
  - Verbindlicher Stand: Ein einzelnes erfülltes Interesse ergibt einen sprachlich vollständigen Satz; mehrere Werte sind deterministisch und in der Reihenfolge der kanonischen Interessenliste formuliert.
  - Sperrwirkung: Keine leeren, widersprüchlichen oder zufallsabhängigen Texte.

- **E-07 — Fehlende Daten**
  - Verbindlicher Stand: Ein fehlendes Pflichtfeld ist bei freigegebenen Zielen ein Datenfehler und wird nicht durch Platzhalter oder Behauptungen ersetzt.
  - Sperrwirkung: Fehler wird protokolliert; Zielkarte wird nicht als vollständig ausgegeben.

- **E-08 — Lockerungsgrenze**
  - Verbindlicher Stand: Diese Fassung zeigt nur Originaltreffer. Ergänzte Treffer erhalten erst in AP 10 eine eigene Kennzeichnung und Formulierung.
  - Sperrwirkung: Lockerungslogik nicht vorziehen.

- **E-09 — Bedienbarkeit**
  - Verbindlicher Stand: Jede Karte ist einzeln fokussierbar, mit Tastatur erreichbar und besitzt einen verständlichen Ziel-Link.
  - Sperrwirkung: Nicht bedienbare Karte verhindert Abnahme.

## Konkrete Arbeitsschritte

1. Ergebnisvertrag erstellen und den Datenfluss aus `SearchCriteria` und `MatchResult` ohne erneute Fachberechnung verbinden.
2. Die Begrenzung nach E-02 sowie Hervorhebung nach E-03 implementieren; Anzahl oberhalb von zwölf sichtbar erklären.
3. Kartenvertrag nach E-04 und E-09 umsetzen; Bildattribution, Preisniveau und prägende Interessen aus freigegebenen Daten übernehmen.
4. Begründungsgenerator nach E-05 und E-06 implementieren; jeden Textbaustein auf ein konkretes Suchkriterium und Zielfeld zurückführen.
5. Fehlerfall E-07 behandeln und einen Nachweis erzeugen, dass unvollständige Daten weder verschleiert noch als Empfehlung behauptet werden.
6. Die drei Journey-Listen mit den Referenzdaten aus AP 06 prüfen; Tastatur-, Screenreader- und schmale-Ansicht-Tests durchführen.

## Teststrategie

- **Begrenzungstest**
  - Prüfobjekt: 0, 1, 3, 12 und 13+ Originaltreffer
  - Mindestnachweis: nie mehr als zwölf Karten; bei 13+ sichtbarer Verfeinerungshinweis

- **Reihenfolgetest**
  - Prüfobjekt: sortierte Referenzliste aus AP 07
  - Mindestnachweis: Karten- und Hervorhebungsreihenfolge entspricht exakt dem Input

- **Feldtest**
  - Prüfobjekt: vollständige Kartenfelder und fehlendes Pflichtfeld
  - Mindestnachweis: vollständige Karte enthält E-04; fehlendes Feld wird nicht verschleiert

- **Begründungstest**
  - Prüfobjekt: ein, mehrere und nicht erfüllte Interessen
  - Mindestnachweis: jedes genannte Merkmal ist im Such- und Zielmodell belegt; Satz bleibt sprachlich korrekt

- **Negativtest**
  - Prüfobjekt: Ziel ohne gewähltes Interesse oder ohne Saisonbeleg
  - Mindestnachweis: dieses Merkmal erscheint nie im Begründungssatz

- **Journey-Test**
  - Prüfobjekt: Single, Paar und Familie
  - Mindestnachweis: vereinbarte Originaltreffer, Begründungen und Ziel-Links sind vorhanden

- **Bedienbarkeitstest**
  - Prüfobjekt: Tastatur, Fokus, Screenreader, schmale Ansicht
  - Mindestnachweis: alle Karten sind erreichbar, verständlich und ohne horizontale Fehlbedienung nutzbar

## Risiken

- **R-01 — Darstellung berechnet eine andere Rangfolge als AP 07.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: E-01 und automatischer Reihenfolgetest.
  - Eskalation/Abnahme: Ergebnisliste nicht freigeben.

- **R-02 — Ein Text behauptet ein nicht belegtes Merkmal.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Begründungsgenerator nur aus typisierten Daten; Negativtests.
  - Eskalation/Abnahme: Fachkonzeption verweigert Abnahme.

- **R-03 — Die Zwölf-Ziele-Grenze verbirgt Treffer stillschweigend.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: E-02 und Begrenzungstest.
  - Eskalation/Abnahme: Sichtbarer Hinweis ist Pflicht.

- **R-04 — Unvollständige Daten werden durch Platzhalter kaschiert.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: E-07, Freigabekette aus AP 05 und Feldtest.
  - Eskalation/Abnahme: Datenfehler an Redaktion zurückgeben.

- **R-05 — Ergebnislisten sind auf Mobilgeräten oder mit Tastatur nicht nutzbar.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Bedienbarkeitstest vor Abnahme.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Freigabe.

## Definition of Done

- Ergebnisvertrag, Kartenvertrag, Begründungsgenerator, Rückverfolgbarkeitsnachweis und Bedienbarkeitstestkatalog liegen versioniert vor.
- E-01 bis E-09 sind implementiert und durch die Teststrategie nachgewiesen.
- Jede sichtbare Begründung ist auf konkrete Kriterien und Zieldaten zurückführbar; kein unbelegtes Merkmal wird ausgegeben.
- Die drei Haupt-Journeys zeigen die vereinbarten Originaltreffer, Karten und Ziel-Links.
- Die Ergebnisliste zeigt höchstens zwölf Ziele, kennzeichnet die ersten drei und ist mit Tastatur sowie auf schmalen Ansichten bedienbar.

**Nachfolger:** AP 10 bis AP 13.
