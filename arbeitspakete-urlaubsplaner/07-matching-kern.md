# AP 07 – Matching-Kern

**Status:** Nach freigegebenen Regeln (AP 01), veröffentlichungsfähigem Datenmodell (AP 03) und Beispiel-/Testdaten (AP 06) umsetzbar.  
**Verantwortung:** Entwicklung implementiert die Fachlogik; Fachkonzeption bestätigt die Rechenregeln; Qualitätssicherung verantwortet die automatisierten Referenztests.  
**Stories:** US-17 bis US-19.  
**Abhängigkeiten:** AP 01, AP 03 und AP 06. Die Benutzeroberfläche, URL-Verarbeitung und Lockerungen gehören nicht zu diesem Paket.

## Auftrag und Abgrenzung

Dieses Paket implementiert eine reine, deterministische Matching-Funktion: Sie erhält gültige Suchkriterien und freigegebene Ziele, filtert ungeeignete Ziele aus, berechnet Teilwerte und erzeugt eine vollständig sortierte Ergebnisfolge.

Nicht Teil dieses Pakets sind Formulare, URL-Parameter, Karten, Texte auf Ergebnislisten, Lockerungsstufen oder Nulltrefferhilfen. Diese Funktionen verwenden das Ergebnis dieses Pakets in AP 08 bis AP 10, dürfen die Berechnung aber nicht duplizieren oder verändern.

## Lieferobjekte

- **Matching-Vertrag**
  - Inhalt: Eingabe, gültige Werte, Ausgabestruktur und Fehlerverhalten
  - Abnahmeverantwortung: Fachkonzeption

- **Filtermodul**
  - Inhalt: die sechs harten Ausschlussbedingungen einschließlich Freigabestatus
  - Abnahmeverantwortung: Qualitätssicherung

- **Scoringmodul**
  - Inhalt: Berechnung von `S_I`, `S_S`, `S_F` und `S` mit konfigurierbaren Gewichten
  - Abnahmeverantwortung: Qualitätssicherung

- **Sortiermodul**
  - Inhalt: totaler, stabiler Sortierschlüssel und Rundungsregel
  - Abnahmeverantwortung: Qualitätssicherung

- **Referenztests**
  - Inhalt: Journey-, Grenz- und Reihungsfälle mit festen Rohwerten
  - Abnahmeverantwortung: Fachkonzeption und Qualitätssicherung

- **Ergebnisobjekt**
  - Inhalt: pro Ziel Kriterien, Teilwerte, Gesamtwert und Sortierentscheidung für Folgepakete
  - Abnahmeverantwortung: Entwicklung

## Matching-Vertrag und verbindliche Regeln

### Eingabe und Ausgabe

Die Eingabe lautet `SearchCriteria(f, A, M, I, L, P)` mit genau einer Reiseform `f`, optionalen Altersgruppen `A`, nicht leerer Monatsmenge `M`, nicht leerer Interessenmenge `I` sowie optionalen Länder- `L` und Preisfiltern `P`.

Die Ausgabe ist eine nach dem Sortierschlüssel geordnete Liste von `MatchResult`. Jeder Eintrag enthält mindestens Ziel-ID, erfüllte Interessen, `S_I`, `S_S`, `S_F`, ungerundetes `S`, ausgewählten Saisonmonat, angewandte Sortierstufe und die Datenversion. Ziele außerhalb der Ergebnismenge erhalten nur in Test-/Diagnoseausgaben einen dokumentierten Ausschlussgrund.

- **M-01 — Freigabe**
  - Verbindlicher Stand: Nur Ziele mit Status `FREIGEGEBEN` sind Kandidaten.
  - Sperrwirkung: Entwürfe und zurückgezogene Ziele erscheinen nie im Ergebnis.

- **M-02 — Saisonfilter**
  - Verbindlicher Stand: `max(saison_d(m) für m in M) >= 1`.
  - Sperrwirkung: Ein in allen gewählten Monaten ungeeignetes Ziel wird ausgeschlossen.

- **M-03 — Interessenfilter**
  - Verbindlicher Stand: Mindestens ein gewähltes Interesse hat `interesse_d(i) >= 1`.
  - Sperrwirkung: Ziel ohne Interessenbezug wird ausgeschlossen.

- **M-04 — Reiseform/Kinder**
  - Verbindlicher Stand: `form_d(f) >= 1`; für Familie zusätzlich `min(kind_d(a) für a in A) >= 1`.
  - Sperrwirkung: Ein ungeeignetes Ziel für eine Altersgruppe wird ausgeschlossen.

- **M-05 — Länder/Preis**
  - Verbindlicher Stand: Leere Filter schränken nicht ein; sonst müssen `land_d in L` und `preis_d in P` gelten.
  - Sperrwirkung: Ziel außerhalb aktiver Filter wird ausgeschlossen.

- **M-06 — Interessenwert**
  - Verbindlicher Stand: `S_I = sum(interesse_d(i) für i in I) / (2 × |I|)`.
  - Sperrwirkung: Rechenwert außerhalb `0..1` ist ein Fehler.

- **M-07 — Saisonwert**
  - Verbindlicher Stand: `S_S = max(saison_d(m) für m in M) / 2`.
  - Sperrwirkung: Rechenwert außerhalb `0..1` ist ein Fehler.

- **M-08 — Reiseformwert**
  - Verbindlicher Stand: Für Single/Paar: `S_F = form_d(f) / 2`; für Familie: `(form_d(Familie) + min(kind_d(a))) / 4`.
  - Sperrwirkung: Rechenwert außerhalb `0..1` ist ein Fehler.

- **M-09 — Gesamtwert**
  - Verbindlicher Stand: `S = 0,50 × S_I + 0,30 × S_S + 0,20 × S_F`; Gewichte liegen zentral als Konfiguration vor und summieren sich auf 1.
  - Sperrwirkung: Ungültige Gewichtung verhindert die Berechnung.

- **M-10 — Sortierung**
  - Verbindlicher Stand: Absteigend nach `S`; bei Differenz unter `0,01`: Anzahl prägender Interessen, dann `S_S`, dann `prio_d`, dann normalisierter Zielname, zuletzt Ziel-ID.
  - Sperrwirkung: Für zwei unterschiedliche Ziele darf keine unbestimmte Reihenfolge bleiben.

- **M-11 — Rundung**
  - Verbindlicher Stand: Es wird nur für die Anzeige gerundet; Filter, Gleichstände und Sortierung verwenden Rohwerte.
  - Sperrwirkung: Anzeige darf die Reihenfolge nicht verändern.

## Konkrete Arbeitsschritte

1. Den Matching-Vertrag als eigenständige, oberflächenunabhängige Schnittstelle anlegen und Eingabewerte gegen AP 03 validieren.
2. M-01 bis M-05 als nachvollziehbare Filter implementieren; Testausgaben enthalten Ausschlussgründe, die Produktionsausgabe nicht.
3. M-06 bis M-09 implementieren; Gewichte an einer zentralen Konfiguration hinterlegen und gegen Summe 1 prüfen.
4. M-10 und M-11 implementieren; Namensnormalisierung und Ziel-ID als letzten deterministischen Abschluss dokumentieren.
5. Journey- und künstliche Testdaten aus AP 06 als automatisierte Referenztests hinterlegen.
6. Ergebnisobjekt für AP 09 bereitstellen und prüfen, dass die Liste bei gleicher Eingabe und Datenversion byte-identisch geordnet ist.

## Teststrategie

- **Filtertests**
  - Prüfobjekt: je ein Ziel scheitert ausschließlich an M-01 bis M-05
  - Mindestnachweis: Ziel fehlt mit korrektem Ausschlussgrund in der Testausgabe

- **Formeltests**
  - Prüfobjekt: Randwerte 0, 0,5 und 1 für `S_I`, `S_S`, `S_F` und `S`
  - Mindestnachweis: Werte entsprechen M-06 bis M-09 und liegen stets in `0..1`

- **Familientest**
  - Prüfobjekt: mehrere Altersgruppen, eine davon ungeeignet
  - Mindestnachweis: Ziel fällt heraus bzw. erhält den Wert der schwächsten Gruppe

- **Journey-Tests**
  - Prüfobjekt: Single, Paar und Familie aus AP 06
  - Mindestnachweis: Scores und Reihenfolgen entsprechen den versionierten Referenzfällen

- **Gleichstandstest**
  - Prüfobjekt: unter, auf und über der `0,01`-Schwelle sowie identische Namen
  - Mindestnachweis: Kaskade und Ziel-ID liefern eine totale Reihenfolge

- **Reihenfolgetest**
  - Prüfobjekt: identischer Zielbestand in wechselnder Eingabereihenfolge
  - Mindestnachweis: byte-identische Ergebnisfolge

- **Konfigurationstest**
  - Prüfobjekt: ungültige Gewichtssumme
  - Mindestnachweis: Berechnung wird mit verständlichem Fehler abgewiesen

## Risiken

- **R-01 — Formeln werden in Oberfläche und Fachlogik unterschiedlich umgesetzt.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Ausschließlich AP-07-Ergebnisobjekt als Datenquelle für Folgepakete.
  - Eskalation/Abnahme: Architekturprüfung verweigert doppelte Berechnung.

- **R-02 — Rundung oder Datenreihenfolge verändert die Rangfolge.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Rohwerte und deterministischer Schlüssel; Reihenfolgetest verpflichtend.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- **R-03 — Familienalter wird nur angezeigt, aber nicht gefiltert.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: eigener M-04- und Familientest.
  - Eskalation/Abnahme: Keine Freigabe ohne Ausschlusstest.

- **R-04 — Konfigurierbare Gewichte werden ungültig.**
  - EW: 1, AW: 3
  - Gegenmaßnahme: zentrale Validierung der Gewichtssumme.
  - Eskalation/Abnahme: Berechnung stoppen und Konfiguration korrigieren.

- **R-05 — Testdaten und erwartete Scores laufen auseinander.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Datenversion im `MatchResult` und in jedem Referenztest.
  - Eskalation/Abnahme: Abweichung blockiert Folgepakete.

## Definition of Done

- Matching-Vertrag, Filter-, Scoring- und Sortiermodul sowie Ergebnisobjekt liegen versioniert vor.
- M-01 bis M-11 sind implementiert und durch automatisierte Tests nachgewiesen.
- Alle Journey-Referenzfälle aus AP 06 liefern die festgelegten Rohwerte, Scores und Rangfolgen.
- Bei identischer Eingabe und Datenversion ist die Reihenfolge vollständig deterministisch und unabhängig von Datenreihenfolge oder Anzeige-Rundung.
- Die Fachkonzeption und Qualitätssicherung haben die Testnachweise freigegeben.

**Nachfolger:** AP 08 bis AP 10 und AP 13.
