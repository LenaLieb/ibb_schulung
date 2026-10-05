# AP 15 – Messung, Gesamtabnahme und Veröffentlichung

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung entscheidet über die Freigabe zur Veröffentlichung; Fachkonzeption dokumentiert die Messlogik und die fachliche Abnahmebasis; Qualitätssicherung prüft End-to-End, Betriebsfähigkeit und Schutzanforderungen.  
**Quellen:** Entwicklungsplan, User Stories US-42 bis US-46, Abschluss aller zuvor gelieferten Stories, AP 01 bis AP 14.

## Auftrag und Abgrenzung

Dieses Paket bildet die fachliche, betriebliche und technische Abschlussbasis für die erste Ausbaustufe des Urlaubsplaners. Es definiert, wie die erste Ausbaustufe gemessen, fachlich abgenommen und kontrolliert veröffentlicht werden kann, ohne Kennzahlen, Datenschutz oder Betriebsvereinbarungen zu übergehen.

Nicht Teil dieses Pakets sind die jeweilige Auswahl einer vollständigen Produkt-Metrikplattform, die konkrete technische Implementierung eines Analytics-Stacks oder die Festlegung einer langfristigen Betriebs- und Monitoring-Architektur. Jede Messgröße, Prüfregel und Freigabeentscheidung muss jedoch fachlich nachvollziehbar und mit der Erstveröffentlichung verbindlich verknüpft sein.

## Lieferobjekte

- Messkonzept
  - Inhalt: Ereignisse, Kennzahlen und Gewichtsprüfung.
  - Abnahmeverantwortung: Produktverantwortung.

- Abnahmebasis
  - Inhalt: Must-have-Stories, End-to-End-Prüfung und Freigabeprotokoll.
  - Abnahmeverantwortung: Qualitätssicherung.

- Betriebsdokumentation
  - Inhalt: Bereitstellung, Backup, Wiederherstellung, Rollen und Routine.
  - Abnahmeverantwortung: Fachkonzeption.

- Sicherheits- und Compliance-Prüfung
  - Inhalt: Datenschutz, externe Einbindungen, personenbezogene Messung, Vorbeugung.
  - Abnahmeverantwortung: Produktverantwortung.

- Veröffentlichungsfreigabe
  - Inhalt: Freigabeentscheidungen, Rollback-Fähigkeit, letzte Verifikation.
  - Abnahmeverantwortung: Produktverantwortung.

## Verbindliche Fachregeln und Entscheidungsprotokoll

- M-01 — Messgrößen
  - Verbindlicher Stand: Die erste Ausbaustufe instrumentiert datensparsame Ereignisse für Suche, Zielseitenaufruf, Vergleich, Lesetiefe, Merken/Teilen, Lockerungsstufe und Kriterienänderungen.
  - Sperrwirkung: Messkonzept und Produktlogik.

- M-02 — Kennzahlen
  - Verbindlicher Stand: Die sechs Kennzahlen werden für Vertiefungs-, Vergleichs-, Lesetiefen-, Sicherungs-, Leerergebnis- und Verfeinerungsrate berechnet; die Gewichtsprüfung ist vorbereitet.
  - Sperrwirkung: Messkonzept.

- M-03 — Gesamtabnahme
  - Verbindlicher Stand: Alle Must-have-Stories werden fachlich gegen ihre Akzeptanzkriterien geprüft; offene Punkte sind ausdrücklich aus dem Lieferumfang entfernt oder terminiert.
  - Sperrwirkung: Gesamtabnahme.

- M-04 — End-to-End-Prüfung
  - Verbindlicher Stand: Matching, URL-Zustand, Freigabe, Klimaimport und zurückgezogene Ziele werden automatisiert und manuell gegen die Produktionskonfiguration geprüft.
  - Sperrwirkung: Qualitätsprüfung.

- M-05 — Qualitätsstandards
  - Verbindlicher Stand: WCAG-2.1-AA, responsive Darstellung, Leistung, Datenschutz und SEO sind Teil der fachlichen Abnahme und werden dokumentiert.
  - Sperrwirkung: Veröffentlichung.

- M-06 — Betriebsfähigkeit
  - Verbindlicher Stand: Bereitstellungs-, Backup- und Wiederherstellungsprobe sind abgeschlossen; Rollen, Routine und jährliche Datenprüfungen werden übergeben.
  - Sperrwirkung: Betrieb und Freigabe.

- M-07 — Veröffentlichung
  - Verbindlicher Stand: Veröffentlichung ist nur mit dokumentierter Freigabe und skalierbarer Rückrollfunktion möglich; externe Einbindungen und personenbezogene Messung sind ausgeschlossen.
  - Sperrwirkung: Veröffentlichungsfreigabe.

Dieses Paket bündelt die fachlichen Abschlussbedingungen der vorausgehenden Pakete. Erst wenn die Abnahmebasis aus AP 01 bis AP 14 erfüllt ist, kann die erste Ausbaustufe als veröffentlichungsreif gelten.

## Konkrete Arbeitsschritte

1. Das Messkonzept mit Ereignissen, Mindestkennzahlen und Gewichtsprüfung festlegen; als datensparsam und ohne personenbezogene Messung definieren.
2. Die fachliche End-to-End-Prüfung aller Journeys und Grenzfälle gegen die Produktionskonfiguration durchführen, inklusive Matching, URL, Freigabe und Rückzug.
3. Automatisierte Prüfungen und Protokolldokumentation des Gesamtbestands auf 45 freigegebene Ziele sichern; ebenfalls offene Punkte und Ausnahmen nachweisen.
4. Barrierefreiheits-, Responsive-, SEO-, Datenschutz- und Leistungsprüfung dokumentieren und die Ergebnisse für die Freigabe aufbereiten.
5. Bereitstellungs-, Backup- und Wiederherstellungsprozeduren mit Rollen und Betriebsroutine dokumentieren; die Übergabe an den Betrieb mit jährlichen Datenprüfungen festlegen.
6. Veröffentlichungsentscheidungen und Rollback-Maßnahmen formal dokumentieren; eine reale Freigabe erfolgt erst mit vollständiger Abnahme und nachvollziehbarem Protokoll.

## Teststrategie

### Mess- und Kennzahlentest
- Prüfobjekt: Ereignislogik, Berechnung der sechs Kennzahlen, Gewichtsprüfung.
- Mindestnachweis: Dokumentierte Berechnung und fachlich gültiger Messweg.

### End-to-End-Abnahme
- Prüfobjekt: Must-have-Stories, Journeys, Grenzfälle, Produktionskonfiguration.
- Mindestnachweis: Jedes relevante Muster mit erwarteter Ausgangsbasis durchlaufen.

### Betriebsprüfung
- Prüfobjekt: Bereitstellung, Backup, Wiederherstellung, Rollen, Betrieb.
- Mindestnachweis: Definierte Routine und Rückrollfähigkeit vor Freigabe.

### Qualitätsprüfung
- Prüfobjekt: WCAG-2.1-AA, responsive Darstellung, Leistung, Datenschutz, SEO.
- Mindestnachweis: Geprüfte und dokumentierte Ergebnisse.

### Freigabeprüfung
- Prüfobjekt: Veröffentlichungsvoraussetzungen und Ausnahmen.
- Mindestnachweis: Produktverantwortung und Qualitätssicherung stimmen Freigabe zu.

## Risiken

Skala: Eintrittswahrscheinlichkeit (EW) und Auswirkung (AW) von 1 = niedrig bis 3 = hoch.

- R-15-01 — Veröffentlicht wird trotz unvollständiger Abnahme.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Freigabe nur mit dokumentierter Abschlussprüfung und Ausnahmenregeln.
  - Eskalation/Abnahme: Produktverantwortung verweigert Freigabe.

- R-15-02 — Messkonzept ist nicht fachlich belastbar.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Ereignisse und Kennzahlen auf sorgfältig definierte Lernziele und Produktentscheidungen beziehen.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- R-15-03 — Betrieb und Wiederherstellung sind nicht vorbereitet.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Backup, Rollback und Rollen dokumentiert und geprüft.
  - Eskalation/Abnahme: AP 15 darf nicht in Produktion gehen.

- R-15-04 — Datenschutz oder externe Messung bleiben trotz Zielzustand unkontrolliert.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: personenbezogene Messung und Einbindungen als unzulässig definieren.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die Freigabe.

## Definition of Done

- Das Messkonzept, die Abschlussprüfung und die Freigabebasis liegen versioniert vor.
- Alle Must-have-Stories sind fachlich abgenommen; offene Punkte sind ausdrücklich entfernt oder terminiert.
- 45 freigegebene Ziele, Messkonzept, Betriebsdokumentation und Veröffentlichungsvoraussetzungen sind bereit für die erste Ausbaustufe.
- Datenschutz, externe Einbindungen und personenbezogene Messung sind ausgeschlossen oder neutralisiert.
- Produktverantwortung und Qualitätssicherung haben die Veröffentlichung freigegeben.

**Voraussetzung:** AP 01 bis AP 14. **Ergebnis:** veröffentlichungsreife erste Ausbaustufe des Urlaubsplaners.
