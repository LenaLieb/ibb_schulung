# AP 08 – Sucheingabe und URL-Zustand

**Status:** Nach Architektur-Gate aus AP 02 und Matching-Vertrag aus AP 07 umsetzbar.  
**Verantwortung:** Entwicklung implementiert Eingabe, Zustand und Validierung; Fachkonzeption prüft die Kriteriensemantik; Qualitätssicherung prüft Navigation, Fehlerfälle und Datenschutz.  
**Stories:** US-08 bis US-14 und US-39.  
**Abhängigkeiten:** AP 01 für Reisezeitentscheidungen, AP 02 für die technische Umsetzung und AP 07 für die gültigen Suchkriterien.

## Auftrag und Abgrenzung

Dieses Paket stellt die vollständige Sucheingabe bereit und kodiert ihren Zustand so in der URL, dass eine gültige Suche ohne Konto kopiert, erneut geöffnet und per Browsernavigation wiederhergestellt werden kann. Jede Eingabe bleibt sichtbar, einzeln korrigierbar und wird vor dem Aufruf des Matchings validiert.

Nicht Teil dieses Pakets sind Themen- oder Ferien-Einstiege (AP 13), Ergebnislisten (AP 09), Lockerungen (AP 10), Merkliste oder Vergleich. Das Paket reserviert jedoch den URL-Parameter `relax` für die spätere sichtbare Lockerungssteuerung.

## Lieferobjekte

- **Eingabevertrag**
  - Inhalt: erlaubte Kriterien, Pflichtfelder, Abhängigkeiten und Fehlermeldungen
  - Abnahmeverantwortung: Fachkonzeption

- **URL-Spezifikation v1**
  - Inhalt: Parameter, Werte, Kodierung, Normalisierung und Fehlerverhalten
  - Abnahmeverantwortung: Technische Leitung

- **Zustandsadapter**
  - Inhalt: Abbildung Formular ↔ `SearchCriteria` ↔ URL ohne Informationsverlust
  - Abnahmeverantwortung: Qualitätssicherung

- **Kriterienzusammenfassung**
  - Inhalt: sichtbare Kriterien mit Einzeländerung bzw. -entfernung
  - Abnahmeverantwortung: Fachkonzeption

- **Navigationstestkatalog**
  - Inhalt: Neuladen, Zurück/Vorwärts, geteilte und manipulierte URLs
  - Abnahmeverantwortung: Qualitätssicherung

- **Datenschutznachweis**
  - Inhalt: keine serverseitige Sucheablage und minimierte Protokollierung
  - Abnahmeverantwortung: Qualitätssicherung

## Eingabe- und URL-Vertrag

### Eingaberegeln

- **S-01 — Reiseform**
  - Regel: Genau `single`, `paar` oder `familie`; Pflicht.
  - Fehlerverhalten: Suche startet nicht, fehlende Reiseform wird benannt.

- **S-02 — Kinderalter**
  - Regel: Bei `familie` mindestens eines aus `A0_5`, `A6_11`, `A12P`; bei Wechsel weg von Familie werden Werte nach sichtbarem Hinweis entfernt.
  - Fehlerverhalten: Suche startet nicht bzw. veraltete Alterswerte werden nicht weitergegeben.

- **S-03 — Reisezeit**
  - Regel: Einzelmonat, Monatsmenge oder Datumsspanne ergeben eine nicht leere Monatsmenge. Bei festen Datumsspannen zählt jeder berührte Kalendermonat inklusive An- und Abreisetag, auch bei Kurzreisen und bei weniger als sieben Tagen innerhalb eines Monats; Jahreswechsel ist zulässig. Flexible Reisezeiten enthalten nur die ausdrücklich ausgewählten Monate.
  - Fehlerverhalten: Ungültige oder leere Zeitangabe wird feldgenau erklärt.

- **S-04 — Interessen**
  - Regel: Mindestens eins aus genau acht Interessen; keine Obergrenze und Reihenfolge ohne Wirkung.
  - Fehlerverhalten: Suche startet nicht ohne Interesse.

- **S-05 — Länder**
  - Regel: null bis mehrere Länder aus dem freigegebenen Bestand; Filter ist optional.
  - Fehlerverhalten: Ungültige Werte werden sichtbar entfernt und nicht stillschweigend angewandt.

- **S-06 — Preisniveau**
  - Regel: null bis mehrere Werte `EUR`, `EUR_EUR`, `EUR_EUR_EUR`; relative Kostenklasse, keine Beträge.
  - Fehlerverhalten: Ungültige Werte werden sichtbar entfernt.

- **S-07 — Pflichtschutz**
  - Regel: Pflichtkriterien sind in der Zusammenfassung nicht entfernbar.
  - Fehlerverhalten: Entfernung wird mit Begründung abgelehnt.

### URL-Spezifikation v1

Der kanonische Suchpfad lautet `/suche`. Jeder gültige Zustand enthält `v=1`, `form`, `zeitart`, `monate` und `interessen`.

- **Parameter-Übersicht**
  - `v`: `1` — Versionskennung; unbekannte zukünftige Versionen werden nicht interpretiert.
  - `form`: `single`, `paar`, `familie` — entspricht S-01.
  - `alter`: kommagetrennt: `A0_5`, `A6_11`, `A12P` — nur bei `form=familie`; kanonisch sortiert und ohne Duplikate.
  - `zeitart`: `monat`, `monate`, `spanne` — bewahrt die ursprüngliche Eingabeart.
  - `monate`: kommagetrennte Werte `1` bis `12` — abgeleitete, aufsteigend sortierte Monatsmenge.
  - `von`, `bis`: `YYYY-MM-DD` — nur bei `zeitart=spanne`; Originalspanne zusätzlich zu `monate` erhalten.
  - `interessen`: kommagetrennte acht Interessen-IDs — mindestens ein Wert, kanonisch sortiert, ohne Duplikate.
  - `laender`: kommagetrennte Länder-IDs — optional, kanonisch sortiert.
  - `preis`: `EUR`, `EUR_EUR`, `EUR_EUR_EUR` — optional, kanonisch sortiert.
  - `relax`: `AUTO` oder `ORIGINAL` — optional und für AP 10 reserviert; ohne Wert gilt `ORIGINAL`.

Unbekannte, doppelte oder syntaktisch ungültige optionale Werte werden nicht angewandt und in einer sichtbaren Korrekturmeldung aufgelistet. Fehlt ein Pflichtparameter oder ist ein Pflichtwert ungültig, wird keine Suche ausgeführt; die Eingabemaske zeigt die notwendigen Korrekturen. Eine URL wird nach erfolgreicher Validierung kanonisch serialisiert.

## Konkrete Arbeitsschritte

1. Eingabevertrag S-01 bis S-07 als Validierung vor dem Matching implementieren; die Familienabhängigkeit besonders absichern.
2. Die drei Reisezeitarten in Monatsmengen überführen und Originalspanne sowie abgeleitete Monate sichtbar darstellen.
3. URL-Spezifikation v1 implementieren: parse, validiere, normalisiere und serialisiere den Suchzustand ohne Verlust gültiger Informationen.
4. Kriterienzusammenfassung mit Einzeländerung, optionaler Entfernung und Schutz von Pflichtkriterien umsetzen.
5. Für jede gültige Änderung einen Browser-Verlaufseintrag erzeugen; Neuladen, Zurück und Vorwärts stellen die passende URL und Eingabe wieder her.
6. Ungültige, veraltete und manuell geänderte URLs gegen den Navigationstestkatalog prüfen; Suchparameter weder serverseitig speichern noch in Logs übernehmen.

## Teststrategie

- **Pflichtfeldtest**
  - Prüfobjekt: fehlende Reiseform, Interesse, Reisezeit oder Familienalter
  - Mindestnachweis: Suche startet nicht und nennt genau den fehlenden Grund

- **Abhängigkeitstest**
  - Prüfobjekt: Wechsel Familie ↔ Single/Paar
  - Mindestnachweis: Altersgruppen werden korrekt verlangt bzw. sichtbar verworfen

- **Zeitabbildungstest**
  - Prüfobjekt: Monat, Monatsmenge, Kurzreise, Monats- und Jahreswechsel
  - Mindestnachweis: erwartete Monatsmenge und Originalspanne entsprechen S-03

- **URL-Rundreise**
  - Prüfobjekt: Formular → URL → Neuladen → Formular
  - Mindestnachweis: kanonischer Zustand bleibt semantisch identisch

- **URL-Fehlertest**
  - Prüfobjekt: unbekanntes `v`, ungültige IDs, Duplikate, fehlende Pflichtparameter
  - Mindestnachweis: keine falsche Suche; sichtbare Korrekturhilfe

- **Navigationstest**
  - Prüfobjekt: Kriterium ändern, Zurück, Vorwärts, Link kopieren
  - Mindestnachweis: vorheriger bzw. geteilter Zustand wird vollständig wiederhergestellt

- **Interaktionstest**
  - Prüfobjekt: Tastatur, Fokus, kleine Ansicht, Einzelentfernung
  - Mindestnachweis: alle Kriterien sind bedienbar, Pflichtschutz ist verständlich

- **Datenschutztest**
  - Prüfobjekt: URL, Speicher und Protokolle
  - Mindestnachweis: keine serverseitige Profilspeicherung und keine Suchparameter im Log

## Risiken

- **R-01 — Formular und URL erzeugen unterschiedliche Suchzustände.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Ein gemeinsamer Zustandsadapter und URL-Rundreisetest.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- **R-02 — Manipulierte URLs werden stillschweigend falsch ausgeführt.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: strikte Validierung, sichtbare Korrektur und kanonische Serialisierung.
  - Eskalation/Abnahme: Keine Ergebnisanzeige bei ungültigen Pflichtdaten.

- **R-03 — Wechsel der Reiseform verliert unbemerkt relevante Daten.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: sichtbarer Hinweis und Abhängigkeitstest.
  - Eskalation/Abnahme: Fachkonzeption prüft das Verhalten.

- **R-04 — Suchparameter gelangen in Logs oder externe Requests.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Log-Minimierung aus AP 02 und Datenschutztest.
  - Eskalation/Abnahme: Bereitstellung sperren, bis Nachweis vorliegt.

- **R-05 — URL-Versionen werden später unlesbar.**
  - EW: 1, AW: 2
  - Gegenmaßnahme: `v` als Pflichtparameter; unbekannte Versionen klar ablehnen.
  - Eskalation/Abnahme: Migrationsregel vor einer v2 ergänzen.

## Definition of Done

- Eingabevertrag, URL-Spezifikation v1, Zustandsadapter, Kriterienzusammenfassung und Navigationstestkatalog liegen versioniert vor.
- S-01 bis S-07 sowie alle Parameter der URL-Spezifikation sind implementiert und getestet.
- Jede gültige Suche ist kanonisch teilbar, nach Neuladen identisch und per Browsernavigation wiederherstellbar.
- Ungültige Eingaben und URLs erzeugen keine falsche Suche und geben konkrete Korrekturhinweise.
- Tastatur-, schmale-Ansicht- und Datenschutztests sind dokumentiert bestanden.

**Nachfolger:** AP 09 bis AP 13.
