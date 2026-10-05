# AP 01 – Fachliche Regeln und Abnahmebasis

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung entscheidet; Fachkonzeption dokumentiert; Qualitätssicherung prüft die Beispiele.  
**Quellen:** Entwicklungsplan, User Stories US-01 bis US-03, US-07, US-10, US-16 bis US-19, US-22 bis US-25, US-34 bis US-36 und US-39 sowie alle Haupt- und Grenzfall-Journeys.

## Auftrag und Abgrenzung

Dieses Paket erstellt den verbindlichen fachlichen Implementierungsvertrag für die nachfolgenden Pakete. Es übersetzt Aussagen aus Konzept, Stories und Entwicklungsplan in eindeutige Regeln, Eingabe-/Ausgabebeispiele und Testfälle.

Nicht Teil dieses Pakets sind Code, Datenbankmigrationen, Bildschirmgestaltung, Klimaimport oder die technische Auswahl des Stacks. Eine Regel darf nicht als „bei der Implementierung klären“ an ein Folgepaket weitergegeben werden.

## Lieferobjekte

- **Fachspezifikation**
  - Inhalt: Begriffe, Eingaben, Regeln, Ausgaben und Fehlerfälle
  - Abnahmeverantwortung: Produktverantwortung

- **Entscheidungsprotokoll**
  - Inhalt: Beschluss, Quelle, verantwortliche Rolle, Sperrwirkung und Status je Fachentscheidung
  - Abnahmeverantwortung: Produktverantwortung

- **Rückverfolgbarkeitsmatrix**
  - Inhalt: Zuordnung Story/Journey → Regel → Testfall
  - Abnahmeverantwortung: Qualitätssicherung

- **Referenzfallkatalog**
  - Inhalt: Durchgerechnete positive, negative und Grenzfälle mit erwarteter Ausgabe
  - Abnahmeverantwortung: Qualitätssicherung

- **Änderungsprotokoll**
  - Inhalt: Datum, Anlass und betroffene Regel bei jeder Änderung
  - Abnahmeverantwortung: Fachkonzeption

## Verbindliche Fachregeln und Entscheidungsprotokoll

- **F-01 — Suchmodell**
  - Verbindlicher Stand: Die Suche verwendet `(f, A, M, I, L, P)`: Reiseform, Kinderalter, Monatsmenge, Interessen, Länder und Preisniveau.
  - Sperrwirkung bei offenem Punkt: Suche und URL-Zustand

- **F-02 — Reisezeit**
  - Beschlossen: Ein fester Zeitraum wird anhand seiner exakten Datumsgrenzen in `M` überführt; jeder berührte Kalendermonat zählt, auch bei weniger als sieben Tagen innerhalb dieses Monats und auch bei Reisen unter sieben Tagen Gesamtdauer. An- und Abreisetag zählen als Reisetage. Jahreswechsel sind zulässig.
  - Beschlossen: Flexible Reisezeit wird ausschließlich aus den vom Nutzer ausdrücklich ausgewählten Monaten gebildet. Es werden keine Nachbarmonate automatisch ergänzt.
  - Sperrwirkung: Matching und Ferien-Einstieg

- **F-03 — Ferien**
  - Verbindlicher Stand: Der Ferien-Einstieg verlangt Bundesland und Schuljahr. Fehlen gültige Termine, wird er nicht angeboten; eine manuelle Reisezeit bleibt möglich.
  - Sperrwirkung: Ferien-Einstieg

- **F-04 — Interessen und Saison**
  - Verbindlicher Stand: Es gibt genau acht Interessen. Saison- und interessenbezogene Aussagen dürfen nur Daten behaupten, die das Zielmodell belegt. „Kultur geeignet, Baden ungeeignet“ ist ein Pflicht-Referenzfall.
  - Sperrwirkung: Datenmodell und Matching

- **F-05 — Matching**
  - Verbindlicher Stand: Es gelten Ausschlussfilter und `S = 0,50 × S_I + 0,30 × S_S + 0,20 × S_F`. Die Gewichte sind konfigurierbar, aber für die erste Ausbaustufe fest.
  - Sperrwirkung: Matching

- **F-06 — Sortierung**
  - Verbindlicher Stand: Nach `S` folgt die dokumentierte Gleichstandskaskade; eine stabile eindeutige Ziel-ID ist die letzte Stufe. Rechenwerte bleiben ungerundet.
  - Sperrwirkung: Matching und Ergebnisliste

- **F-07 — Lockerung**
  - Verbindlicher Stand: `R0/R1/R2` sind disjunkt und sichtbar. Der Saisonfilter wird nie gelockert. `relax=AUTO/ORIGINAL` erhält bzw. stellt Originalkriterien wieder her.
  - Sperrwirkung: Suche und Ergebnisliste

- **F-08 — Nulltreffer**
  - Verbindlicher Stand: Die Anwendung zeigt null bis zwei verifizierte Änderungsvorschläge. Gibt es keinen gültigen Vorschlag, nennt sie leeren Bestand bzw. kombinierte Einschränkungen.
  - Sperrwirkung: Suchdiagnose

- **F-09 — Wunschland**
  - Verbindlicher Stand: Länder außerhalb des Bestands bleiben als gewählte Einschränkung sichtbar. Der Filter wird nur bewusst entfernt; alte oder ungültige URL-Werte werden verständlich behandelt.
  - Sperrwirkung: Länderfilter und URL-Zustand

- **F-10 — Vergleich ohne Suche**
  - Beschlossen: Ohne aktive Suche ist kein Monat vorausgewählt; ein Vergleichsmonat muss ausdrücklich gewählt werden. Zusätzlich kann eine Jahresübersicht geöffnet werden, die alle zwölf Monatswerte einzeln zeigt.
  - Beschlossen: Bei aktiver Suche übernimmt der Vergleich die ausgewählten Monate als Vergleichszeitraum und zeigt diesen Zeitraum ausdrücklich an. Die Vergleichsauswahl ändert den Suchzustand nicht.
  - Sperrwirkung: Vergleich

- **F-11 — Freigabe und Rückzug**
  - Verbindlicher Stand: Entwurf, Prüfung, Freigabe, Rückgabe zur Bearbeitung und Rückzug werden unterschieden. Zurückgezogene Ziele sind keine Ergebnisse, Alternativen oder Vergleichskandidaten.
  - Sperrwirkung: Datenmodell, Redaktion und Vergleich

- **F-12 — Datenherkunft**
  - Verbindlicher Stand: Klima: Copernicus/E-OBS, Referenzperiode 1991–2020. Bilder: ausschließlich `UNSPLASH`. Ortskennung, Koordinaten und IATA-Code gehören zum Stammsatz.
  - Sperrwirkung: Datenmodell, Import und Redaktion

## Beschlussvermerk

- 2026-10-01: Die Produktentscheidungen zu F-02 und F-10 wurden getroffen und in den Regeln oben festgehalten. F-02 verwendet inklusive Kalenderdaten und zählt jeden berührten Monat; flexible Monate werden nicht automatisch erweitert. F-10 verwendet ohne Suche eine explizite Monatswahl mit optionaler Monatsübersicht und übernimmt bei aktiver Suche deren sichtbare Monatsmenge.

## Konkrete Arbeitsschritte

1. Begriffe und Quellstellen vereinheitlichen; Widersprüche in Konzept, Stories und Plan in das Änderungsprotokoll aufnehmen.
2. F-01 bis F-12 in eine fortlaufend versionierte Fachspezifikation überführen; jede Regel enthält Eingabe, Verarbeitung, Ausgabe und Fehlerverhalten.
3. Je Regel mindestens einen Normalfall, einen Grenzfall und – falls möglich – einen ungültigen Fall in den Referenzfallkatalog aufnehmen.
4. Die drei Haupt-Journeys und vier Grenzfälle vollständig durchrechnen und erwartete Scores, Rangfolgen, Kennzeichnungen und Hinweise festhalten.
5. Die Rückverfolgbarkeitsmatrix erstellen und prüfen, dass jede Must-Story mindestens eine Regel und einen Testfall besitzt.
6. Offene Beschlüsse durch die Produktverantwortung abnehmen lassen; erst danach die Version für Folgepakete freigeben.

## Teststrategie

- **Regeltest**
  - Prüfobjekt: Filter, Formel, Sortierung und Rundung
  - Mindestnachweis: Rechenblatt bzw. maschinenlesbarer Referenzfall mit erwartetem Wert

- **Journey-Test**
  - Prüfobjekt: Single, Paar und Familie
  - Mindestnachweis: Vollständiger Ablauf von Eingabe bis Entscheidung mit erwarteter Rangfolge

- **Grenzfalltest**
  - Prüfobjekt: Januar/Strand, fehlendes Wunschland, keine Entscheidung, überbestimmte Suche
  - Mindestnachweis: Sichtbarer Zustand, erlaubte Handlung und erwartete Diagnose

- **Konsistenztest**
  - Prüfobjekt: Konzept, Stories, Entwicklungsplan und Paket
  - Mindestnachweis: Keine Regel hat widersprüchliche Quelle oder ungeklärte Abhängigkeit

- **Abnahmetest**
  - Prüfobjekt: Fachspezifikation
  - Mindestnachweis: Produktverantwortung bestätigt jede verbindliche Regel

## Risiken

Skala: Eintrittswahrscheinlichkeit (EW) und Auswirkung (AW) von 1 = niedrig bis 3 = hoch.

- **R-01 — Konzept und Stories widersprechen sich.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: Quellabgleich und Änderungsprotokoll vor jeder Freigabe.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die maßgebliche Fassung.

- **R-02 — Eine Produktregel bleibt offen.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Jede offene Regel erhält Sperrwirkung und verantwortliche Rolle.
  - Eskalation/Abnahme: Kein Start des betroffenen Folgepakets.

- **R-03 — Scores oder Rangfolge sind nicht reproduzierbar.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Rechenfälle mit Rohwerten, Datenbasis und Sortierschlüssel pflegen.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- **R-04 — Freigabe- und Rückzugsregeln decken Zielseiten nicht ab.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Pflichtinhalte mit AP 03 und US-26 abgleichen.
  - Eskalation/Abnahme: AP 03 darf nicht freigegeben werden.

## Definition of Done

- Alle fünf Lieferobjekte liegen versioniert vor.
- F-01 bis F-12 sind verbindlich beschlossen oder mit sichtbarer Sperrwirkung versehen; kein offener Punkt ist verborgen.
- Die Rückverfolgbarkeitsmatrix deckt alle betroffenen Must-Storys und Journeys ab.
- Alle Testfälle aus der Teststrategie sind dokumentiert bestanden.
- Produktverantwortung und Qualitätssicherung haben die Fachspezifikation freigegeben.

**Voraussetzung:** keine. **Nachfolger:** AP 03, AP 07, AP 08, AP 10, AP 12 und AP 13.
