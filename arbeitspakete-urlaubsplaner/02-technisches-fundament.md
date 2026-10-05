# AP 02 – Technisches Fundament und Architektur-Gate

**Status:** Architektur-Gate offen; die lokale Abgabe ist verbindlich.  
**Verantwortung:** Technische Leitung entscheidet und dokumentiert; Entwicklung richtet ein; Qualitätssicherung prüft das Fundament.  
**Stories:** Grundlage für US-39 und US-42 bis US-47.  
**Abhängigkeiten:** AP 01 für fachliche Randbedingungen. AP 03 kann sein logisches Modell parallel erstellen, aber keine stackabhängige Migration abschließen.

## Auftrag und Abgrenzung

Dieses Paket legt die technische Basis für eine lokal vorführbare erste Ausbaustufe fest und macht die Stackentscheidung nachvollziehbar. Es liefert erst nach dem Architekturentscheid ein Projektfundament, das lokal reproduzierbar gebaut, getestet und wiederhergestellt werden kann.

Nicht Teil des Pakets sind Produktivhosting, Nutzerkonten, Buchungspartner, externe Analyseplattformen oder ein vorweggenommener Technologie-Stack. Bis zum separaten Stackentscheid werden keine technologieabhängigen Artefakte – Repository-Gerüst, Migrationen, Build-Skripte oder CI-Konfiguration – als erledigt markiert.

## Architekturprinzipien

- **A-01 — Lokale Abgabe**
  - Verbindliche Auswirkung: Die Anwendung ist auf einem definierten lokalen Rechner ohne Cloud-Dienst vorführbar.

- **A-02 — Getrennte Fachlogik**
  - Verbindliche Auswirkung: Validierung, Zeitabbildung, Matching, Sortierung und Vergleich sind unabhängig von Oberflächen testbar.

- **A-03 — Strukturierte Inhalte**
  - Verbindliche Auswirkung: Ziele, Referenzskalen, Alternativen, Ferien und Klimadaten sind maschinenlesbar und versionierbar.

- **A-04 — Reproduzierbarer Build**
  - Verbindliche Auswirkung: Eine dokumentierte Befehlsfolge erzeugt aus einem sauberen Checkout dieselbe lauffähige Anwendung.

- **A-05 — Keine Drittanbieter-Aufrufe**
  - Verbindliche Auswirkung: Bilder, Schriften, Skripte und sonstige Ressourcen werden lokal ausgeliefert; die Prüfung zeigt keine externen Requests.

- **A-06 — Lokale Zustände**
  - Verbindliche Auswirkung: Such- und Vergleichszustand liegen in der URL; eine Merkliste darf nur lokal im Browser liegen.

- **A-07 — Datenminimierung**
  - Verbindliche Auswirkung: Keine Freitextsuche und keine dauerhafte Personenkennung; Fehler- und Zugriffsprotokolle speichern keine Suchparameter.

- **A-08 — Wiederherstellbarkeit**
  - Verbindliche Auswirkung: Testdaten, Build und zuletzt funktionsfähiger Stand lassen sich anhand der Dokumentation wiederherstellen.

## Lieferobjekte

- **Architekturentscheid (ADR)**
  - Inhalt: Stack, Versionen, Inhaltsverwaltung, Persistenz, Rendering und Begründung gegen Alternativen
  - Status vor Stackentscheid: offen, verpflichtendes Gate

- **Repository-Konventionen**
  - Inhalt: Verzeichnisstruktur, Namensregeln, Branch-/Review-Regeln, Formatierung und Umgang mit Testdaten
  - Status vor Stackentscheid: nach ADR

- **Umgebungsmodell**
  - Inhalt: Voraussetzungen, Konfiguration, lokale Entwicklung, Test und Demo
  - Status vor Stackentscheid: nach ADR

- **Befehlsreferenz**
  - Inhalt: Installieren, Starten, Bauen, Linten, Testen und Zurücksetzen
  - Status vor Stackentscheid: nach ADR

- **Qualitätsbasis**
  - Inhalt: Prüftools, unterstützte Browser/Ansichten, Accessibility- und Leistungsnachweise
  - Status vor Stackentscheid: nach ADR

- **Betriebsnotiz**
  - Inhalt: Lokale Sicherung, Wiederherstellung und bekannte Einschränkungen
  - Status vor Stackentscheid: nach ADR

## Konkrete Arbeitsschritte

1. Architektur-Gate vorbereiten: Anforderungen aus A-01 bis A-08, lokale Zielumgebung und Bewertungsmaßstab in das ADR übernehmen.
2. Stackentscheid separat treffen. Das ADR muss mindestens Frontend/Rendering, Programmiersprache, Testwerkzeuge, Inhaltsverwaltung, Persistenz und Bildauslieferung benennen.
3. ADR gegen A-01 bis A-08 prüfen und von technischer Leitung und Produktverantwortung freigeben lassen.
4. Erst danach Repository-Konventionen, Projektgerüst, Konfigurationsvorlage und lokale Befehlsreferenz anlegen.
5. Build-, Lint-, Unit- und Smoke-Test in einem sauberen lokalen Umfeld ausführen; Ergebnisse dokumentieren.
6. Wiederherstellungsprobe aus einer Sicherung durchführen und den Ablauf samt Ergebnis in der Betriebsnotiz festhalten.

## Teststrategie

- **Architekturprüfung**
  - Prüfobjekt: ADR gegen A-01 bis A-08
  - Mindestnachweis: Abgehakte Kriterien und Freigabe

- **Build-Test**
  - Prüfobjekt: Saubere lokale Installation und Build
  - Mindestnachweis: dokumentierte Befehlsausgabe ohne Fehler

- **Lint-/Format-Test**
  - Prüfobjekt: Vereinbarte statische Qualitätsregeln
  - Mindestnachweis: automatisierter erfolgreicher Lauf

- **Unit-Test**
  - Prüfobjekt: isolierte Fachlogik und Datenvalidierung
  - Mindestnachweis: automatisierter erfolgreicher Lauf

- **Smoke-Test**
  - Prüfobjekt: Starten, Startseite, Beispielsuche und Zielseite
  - Mindestnachweis: manueller kurzer Test in lokaler Demo

- **Datenschutztest**
  - Prüfobjekt: Netzwerk- und Protokollprüfung
  - Mindestnachweis: keine Drittanbieter-Requests, keine Suchparameter im Log

- **Bedienbarkeitstest**
  - Prüfobjekt: Tastatur, Fokus und schmale Ansicht
  - Mindestnachweis: dokumentierte manuelle Prüfung

- **Wiederherstellungstest**
  - Prüfobjekt: Sicherung und Rückkehr zum funktionsfähigen Stand
  - Mindestnachweis: erfolgreich wiederhergestellte lokale Demo

## Risiken

Skala: Eintrittswahrscheinlichkeit (EW) und Auswirkung (AW) von 1 = niedrig bis 3 = hoch.

- **R-01 — Die Stackentscheidung verzögert den Start.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: ADR als explizites Gate führen; keine Scheinfortschritte nach dem Gate zulassen.
  - Eskalation/Abnahme: Technische Leitung entscheidet vor Projektgerüst.

- **R-02 — Die Toolchain ist lokal nicht reproduzierbar.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Versionsvorgaben und Clean-Setup-Test dokumentieren.
  - Eskalation/Abnahme: Build-Test muss vor Abnahme auf einem zweiten lokalen Umfeld gelingen.

- **R-03 — Die Inhaltsverwaltung erfüllt den Freigabeprozess nicht.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: ADR gegen AP 03 und AP 05 prüfen.
  - Eskalation/Abnahme: Architekturentscheid zurückweisen.

- **R-04 — Externe Ressourcen verletzen Datenschutzvorgaben.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Netzwerkprüfung und lokale Assets als Release-Kriterium.
  - Eskalation/Abnahme: Keine Demo-Freigabe bei externem Request.

- **R-05 — Lokale Daten oder Build sind nicht wiederherstellbar.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: Sicherungs- und Restore-Probe verpflichtend durchführen.
  - Eskalation/Abnahme: Betriebsnotiz ist ohne Nachweis unvollständig.

## Definition of Done

- Das ADR ist beschlossen und erfüllt A-01 bis A-08.
- Alle sechs Lieferobjekte liegen versioniert vor; „nach ADR“ ist nicht mehr offen.
- Ein sauberer lokaler Start, Build, Lint-, Unit- und Smoke-Test ist nachweislich erfolgreich.
- Datenschutz-, Bedienbarkeits- und Wiederherstellungsprüfung sind dokumentiert bestanden.
- Die technische Leitung hat bekannte Einschränkungen der lokalen Abgabe dokumentiert und freigegeben.

**Voraussetzung:** AP 01 für fachliche Randbedingungen. **Parallel möglich:** mit dem logischen Modell aus AP 03. **Nachfolger:** AP 03 (technische Umsetzung), AP 08, AP 11 und AP 15.
