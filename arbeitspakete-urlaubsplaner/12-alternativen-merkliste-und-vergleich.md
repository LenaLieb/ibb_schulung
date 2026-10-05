# AP 12 – Alternativen, Merkliste und Vergleich

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung entscheidet Auswahl- und Freigabegrenzen; Fachkonzeption dokumentiert Vergleichslogik, Merkliste und Link-Integrationsregeln; Qualitätssicherung prüft Datenkonsistenz und Zustandsintegrität.  
**Quellen:** Entwicklungsplan, User Stories US-34 bis US-36, US-40 und US-41, Integration von US-06 und US-33, AP 01 F-10 und F-11, AP 05, AP 08 und AP 11.

## Auftrag und Abgrenzung

Dieses Paket schafft die fachlich verbindliche Grundlage für Auswahl, Merkliste, Vergleich und gemeinsame Teilbarkeit über mehrere Ziele hinweg. Es definiert, welche Ziele in den Vergleich gelangen, wie der Vergleichsmonat bestimmt wird, wie Auswahl- und Linkzustände zusammengeführt werden und wie zurückgezogene oder unbekannte Ziele behandelt werden.

Nicht Teil dieses Pakets sind die technische Speicherung im Browser über einen spezifischen Mechanismus hinaus, die visuelle Implementierung des Vergleichslayouts und die Datenimportprozesse. Eine fachliche Entscheidung über Auswahllogik, Vergleichsmonat oder Linkzusammenführung darf nicht im Folgepaket offen bleiben; sie muss dokumentiert, testbar und abnahmefähig sein.

## Lieferobjekte

- Vergleichsmodell
  - Inhalt: Auswahl, Vergleichsmonat, Zielmenge und Rangfolge der Vergleichsbasis.
  - Abnahmeverantwortung: Produktverantwortung.

- Merklistenmodell
  - Inhalt: Begrenzung, Persistenz, Entfernen und Wiederaufnahme.
  - Abnahmeverantwortung: Fachkonzeption.

- Link-/Zustandsvertrag
  - Inhalt: geteilter Link, lokale Auswahl, Merkliste und Zusammenführung.
  - Abnahmeverantwortung: Qualitätssicherung.

- Datenbegründungsmodell
  - Inhalt: Vergleichsdaten, Profilwerte und Gleichrangigkeit.
  - Abnahmeverantwortung: Fachkonzeption.

- Referenzfallkatalog
  - Inhalt: Auswahl-, Merklisten- und Vergleichsjourneys mit erwarteter Ausgabe.
  - Abnahmeverantwortung: Qualitätssicherung.

## Verbindliche Fachregeln und Entscheidungsprotokoll

- V-01 — Vergleichsziele
  - Verbindlicher Stand: Ziele aus Ergebnisliste, Zielseite und Merkliste können für den Vergleich ausgewählt werden; die erste Ausbaustufe unterstützt zwei bis drei Ziele.
  - Sperrwirkung: Vergleich und Auswahl.

- V-02 — Vergleichsmonat
  - Beschlossen: Ohne aktive Suche ist kein Monat vorausgewählt; vor dem Monatsvergleich muss ein Monat gewählt werden. Eine Jahresübersicht mit allen zwölf Monatswerten kann zusätzlich geöffnet werden.
  - Beschlossen: Bei aktiver Suche übernimmt der Vergleich die ausgewählten Monate als sichtbaren Vergleichszeitraum, ohne die Suchkriterien zu ändern.
  - Sperrwirkung: Vergleich und Jahresübersicht.

- V-03 — Vergleichsdaten
  - Verbindlicher Stand: Vergleichsaussagen zu Ruhe, Kultur, Natur, Preis und weiteren Profilwerten werden aus den hinterlegten Profilwerten abgeleitet. Gleichrangigkeit darf nicht widersprüchlich dargestellt werden.
  - Sperrwirkung: Datenmodell und Vergleich.

- V-04 — Merkliste
  - Verbindlicher Stand: Die Merkliste hält maximal zehn Ziele im lokalen Speicher; Entfernen, Blockade und Wiederaufnahme sind explizit dokumentiert.
  - Sperrwirkung: Merkliste.

- V-05 — Teilbarkeit
  - Verbindlicher Stand: Suche, Vergleich und Merkliste können als Link geteilt werden; lokale und per Link gelieferte Auswahl werden nach definierter Regel zusammengeführt.
  - Sperrwirkung: URL-Zustand und Vergleich.

- V-06 — Unbekannte oder zurückgezogene Ziele
  - Verbindlicher Stand: Unbekannte oder zurückgezogene Ziele werden in der Auswahl und im Vergleich als separater Zustand behandelt; gültige restliche Auswahl bleibt nutzbar.
  - Sperrwirkung: Vergleich und Merkliste.

- V-07 — Mobilbetrieb
  - Verbindlicher Stand: Die mobile Ansicht muss Auswahl, Vergleich und Rückkehr zur Suche auf schmalen Bildschirmen bedienbar halten; ein drittes Ziel muss zuverlässig erreichbar bleiben.
  - Sperrwirkung: Vergleich und Mobilansicht.

- V-08 — Freigabe und Rückzug
  - Verbindlicher Stand: Vergleichs-, Merklisten- und Linkzustände berücksichtigen freigegebene und zurückgezogene Ziele; zurückgezogene Ziele sind keine Vergleichs- oder Merklistenkandidaten.
  - Sperrwirkung: Vergleich, Merkliste und Datenmodell.

AP 01 F-10 beschließt die fachliche Entscheidungsgrundlage für Vergleichsmonat und Jahresübersicht; AP 01 F-11 legt die Freigabe- und Rückzugslogik fest. Dieses Paket konkretisiert die Nutzung dieser Regeln für Auswahl, Vergleich und Linkzustand.

## Konkrete Arbeitsschritte

1. Auswahl- und Vergleichsmenge definieren: zulässige Quellen, maximale Zielanzahl, Mindestvoraussetzungen und Zustandsänderungen bei Auswahl/Ausschluss feststellen.
2. Die Vergleichsmonatslogik mit den in AP 01 festgelegten Varianten und der Produktentscheidung verknüpfen; offen gebliebene Produktentscheidungen in das Änderungsprotokoll aufnehmen.
3. Die Datenbasis für Vergleichsaussagen und Gleichrangigkeit prüfen; jeder Vergleichsblock muss aus dokumentierten Profilwerten abgeleitet sein.
4. Merkliste mit Lokalspeichergrenze, Wiederaufnahme, Blockade und Fehlerfall vollständig spezifizieren; unbekannte oder nicht verfügbare Ziele müssen dabei sichtbar verarbeitet werden.
5. Die Link-logik mit lokaler Auswahl, gespeicherten Zuständen und zusammengeführten Ergebnissen dokumentieren; Kollisionen, Duplikate und ungültige IDs müssen behandelt werden.
6. Die Mobilansicht mit Schmalbildschirm- und Bedienbarkeitserwartungen fachlich abnehmen; die Rückkehr zur Suche darf nicht verschwinden oder unverständlich werden.

## Teststrategie

### Regeltest
- Prüfobjekt: Auswahl, Vergleichsmonat, Merklistenlimit, Linkzusammenführung.
- Mindestnachweis: Erwartete Auswahlmenge, URL- und Zustandswerte je Fall.

### Daten- und Vergleichstest
- Prüfobjekt: Profilwerte, Gleichrangigkeit und Vergleichsaussagen.
- Mindestnachweis: Vergleich zeigt nur fachlich belegte Aussagen.

### Journey-Test
- Prüfobjekt: Ziel aus Ergebnisliste wählen, Zielseite vergleichen, Merkliste teilen, zurückgezogene Ziele verarbeiten.
- Mindestnachweis: Durchlauf von Auswahl bis Vergleich und Rückkehr.

### Mobilitätstest
- Prüfobjekt: schmaler Bildschirm, Auswahl, Vergleich und Rückkehr.
- Mindestnachweis: Bedienbare Zustände auf zwei bis drei Zielen und sichtbare Rückkehr.

### Abnahmetest
- Prüfobjekt: Produktverantwortung und Qualitätssicherung.
- Mindestnachweis: Auswahl-, Link- und Merklistenlogik freigegeben.

## Risiken

Skala: Eintrittswahrscheinlichkeit (EW) und Auswirkung (AW) von 1 = niedrig bis 3 = hoch.

- R-12-01 — Vergleichslogik ist nicht reproduzierbar.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Vergleichsmonat, Profilwerte und Gleichrangigkeit aus einem dokumentierten Modell ableiten.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- R-12-02 — Linkzustand und lokaler Zustand widersprechen sich.
  - EW: 2
  - AW: 3
  - Gegenmaßnahme: Merge-Regel und gültige Zustände als fachliche Regel festlegen.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die gültige Fassung.

- R-12-03 — Merkliste verliert oder blockiert Ziele unverständlich.
  - EW: 2
  - AW: 2
  - Gegenmaßnahme: Grenzfälle mit Speicherlimit, Blockade und wiederaufgenommenen Zielen dokumentieren.
  - Eskalation/Abnahme: AP 15 darf nicht starten.

- R-12-04 — Vergleich ist auf schmalen Bildschirmen nicht nutzbar.
  - EW: 2
  - AW: 2
  - Gegenmaßnahme: Mobilitätsanforderungen vor Abnahme verbindlich festlegen.
  - Eskalation/Abnahme: Produktverantwortung entscheidet zulässige Ausnahme.

## Definition of Done

- Alle Lieferobjekte liegen versioniert vor.
- Vergleichslogik, Merklistenlogik, Link-/Zustandsregeln und Freigabe-/Rückzugsregeln sind verbindlich entschieden oder sichtbar gesperrt.
- Zwei bis drei Ziele können fachlich sauber verglichen werden; Merkliste, Auswahl und Rückkehr funktionieren konsistent.
- Vergleich, Merkliste und Linkzustand verarbeiten unbekannte, ungültige und zurückgezogene Ziele ohne Totalverlust der Auswahl.
- Produktverantwortung und Qualitätssicherung haben das Paket freigegeben.

**Voraussetzung:** AP 05, AP 08 und AP 11. **Nachfolger:** AP 13 und AP 15.
