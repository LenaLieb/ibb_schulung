# Statusbericht Urlaubsplaner und Inbetriebnahme

**Prüfdatum:** 2026-10-02  
**Prüfumfang:** Projektunterlagen, Arbeitspakete, Bestandsdaten, lokale Tests und Release-Audit  
**Gesamtstatus:** Lokaler Prototyp funktionsfähig; keine Freigabe für Produktivbetrieb.

**Grundlagen:** [Implementierungsauftrag](projektauftrag-implementierung.md), [AP-14-Recherche](datenrecherche-ap14.md), [Pilot-Feldbelege](ap14-pilot-feldbelege.md), [DoD-Gate](../reports/dod-gate.json), [Testlauf-Protokoll](../reports/testlauf-protokoll.json).

## Kurzstatus

Der Urlaubsplaner ist als lokal baubare und vorführbare Anwendung vorhanden. Der aktuelle DoD-Check (`npm run check`) war bei der Prüfung erfolgreich: Inhaltsvalidierung, Build, Unit- und HTTP-E2E-Prüfungen bestanden, insgesamt 30 Tests. Damit ist die erste technische Implementierungslieferung verifiziert.

Die Inbetriebnahme ist dennoch gesperrt. `npm run release:check` meldet `ready: false` und 18 offene Nachweise: vier Bestands-/Qualitätsblocker aus AP 14 sowie 14 Freigabe- und Betriebsnachweise aus AP 15. Der Projektauftrag grenzt das korrekt ab: Der erfolgreiche lokale Check ist kein Veröffentlichungsnachweis.

## Umsetzungsstand

| Bereich | Befund |
|---|---|
| Lokale Anwendung | Statische Anwendung mit Node.js-Build und lokalem HTTP-Server vorhanden. Der Server bindet standardmäßig an `127.0.0.1:8080`; ein Produktivhosting ist damit nicht nachgewiesen. |
| Fachfunktionen | Suchvertrag, Matching, URL-Zustand, Lockerungen, Ergebnisbegründungen, Zielseiten, geführte Einstiege, Vergleich, Merkliste und Kennzahlenberechnung sind teilweise implementiert und durch Tests abgedeckt. Das belegt keine formale Abnahme aller Stories/Journeys. |
| Datenbestand | Fünf JSON-Ziele werden validiert und ausgeliefert. Der Release-Audit zählt zwei Städte und vier vorläufige Winterprofil-Kandidaten; beides liegt unter den AP-14-Zielen von mindestens zwölf. Die Winterzahl ist eine maschinelle Heuristik, keine fachliche Freigabe. |
| Bestandsausbau | Das Arbeitsinventar enthält 45 Einträge, davon fünf vorhandene Datensätze und 40 Kandidaten. Kandidaten und Quellenpfade sind Recherchematerial, keine geprüften oder freigegebenen Zielinhalte. |
| Fachliche Entscheidungen | F-02 (Reisezeitabbildung) und F-10 (Vergleich ohne Suche) sind dokumentiert beschlossen. AP 01 verlangt darüber hinaus vollständige Spezifikation, Rückverfolgbarkeit, Referenzfälle und formelle Abnahmen. |
| Architektur und Betrieb | Ein lokaler Stack ist implementiert, AP 02 führt das Architektur-Gate aber weiterhin als offen. ADR-Freigabe, sauberer Neuaufbau auf einem zweiten Umfeld sowie dokumentierte Sicherungs-/Wiederherstellungsprobe sind nicht nachgewiesen. |

## Verifikation

- `npm run check`: erfolgreich am 2026-10-02; 30 Tests bestanden, keine fehlgeschlagenen Tests. Build erzeugte fünf Ziele.
- `npm run release:check`: nicht erfolgreich, wie für den aktuellen Stand vorgesehen; Veröffentlichung gesperrt.
- Gespeicherte Gate-Dateien sind vom 2026-10-01. Der erneute Lauf am Prüfdatum bestätigt den erfolgreichen lokalen Check und präzisiert den aktuellen Release-Audit.

### Release-Blocker im Detail

**AP 14 – Bestand und Inhalte**

- Es werden fünf statt 45 freigegebener Ziele ausgeliefert.
- Zwei statt mindestens zwölf Stadtziele.
- Vier statt mindestens zwölf Ziele mit einem maschinell erkannten Winterprofil; die fachliche Definition und Prüfung fehlt zusätzlich.
- Bei allen fünf ausgelieferten Zielen fehlen laut Audit die Pflichtgruppen `ortkennung`, `koordinaten`, `iata`, `prio`, `texte`, `charakterprofil`, `klima`, `bilder`, `sehenswuerdigkeiten`, `aktivitaeten`, `alternativen` und `pruefung`.
- Die Bestandsbasis ist zwischen Dokumenten inkonsistent: Inventar und Produktdaten führen Algarve, Barcelona, Gardasee, Lissabon und Mallorca. Die Feldbelege des Fünfer-Piloten behandeln Berlin, Salzburg, Tromsø, Bornholm und Bodensee. Vor weiterer Redaktion muss verbindlich entschieden werden, welche fünf Ziele den Pilot bilden, und Daten, Inventar und Belege müssen synchronisiert werden.
- Klimadaten sind nicht importiert. E-OBS ist laut Recherche nicht für kommerzielle Nutzung freigegeben; ERA5 ist nur ein Kandidat und benötigt eine fachliche/rechtliche Freigabe, ein Variablen- und Aggregationsmapping sowie eine räumliche Zuordnungsregel. Für Sonnenstunden ist Globalstrahlung kein gleichwertiger Ersatz.
- Es wurden keine Bilder übernommen. Die Unsplash-Lizenzfrage ist im Recherchebericht als offen markiert; Bildrechte, Alternativtexte und Herkunftsnachweise fehlen.

**AP 15 – Abnahme, Datenschutz und Betrieb**

Der Audit verlangt folgende 14 explizite Nachweise, die derzeit fehlen:

- genehmigte Definition der Winterfähigkeit;
- Produkt- und Qualitätsfreigabe für AP 14;
- fachliche Abnahme aller Must-have-Stories und Produktions-End-to-End-Abnahme;
- Freigabe von Messkonzept und Datenschutz;
- dokumentierte Abnahme von Barrierefreiheit, Responsivität, Leistung und SEO;
- getestete Sicherung/Wiederherstellung und Rollback;
- Produkt- und Qualitätsfreigabe für AP 15.

Die Kennzahlenlogik ist implementiert, verarbeitet laut Projektauftrag aber nur aggregierte Zähler. Es gibt keine Ereigniserhebung oder Analytics-Integration. Produktverantwortung muss vor der Inbetriebnahme entscheiden, welche Messung tatsächlich erforderlich und datenschutzrechtlich zulässig ist; anschließend sind Konzept, Umsetzung und Nachweis aufeinander abzustimmen.

## Was für die Inbetriebnahme fehlt

1. **Pilot und fachliche Basis verbindlich machen:** Pilot-Zielauswahl und Bestandsdaten abgleichen; offene Regeln, Winterfähigkeit und Veröffentlichungskriterien beschließen; ADR/Architektur-Gate sowie Story- und Journey-Rückverfolgbarkeit formal abnehmen.
2. **Bestand veröffentlichungsfähig erstellen:** 45 Ziele einzeln recherchieren, belegen, bewerten und redaktionell freigeben. Mindestens zwölf Städte und zwölf fachlich bestätigte winterfähige Ziele nachweisen. Klima-, Bild- und sonstige Nutzungsrechte sowie Quellen/Prüfdatum dokumentieren.
3. **Gesamtabnahme durchführen:** Must-have-Akzeptanzkriterien und Haupt-/Grenzfall-Journeys gegen den finalen Bestand prüfen. WCAG 2.1 AA, mobile Darstellung, vereinbarte Leistungsziele, SEO, Datenschutz, externe Netzwerkanfragen und Protokollierung manuell bzw. automatisiert nachweisen.
4. **Produktivbetrieb vorbereiten:** Hosting und Produktionskonfiguration festlegen, reproduzierbaren Build aus sauberem Checkout belegen, Zuständigkeiten und Veröffentlichungsablauf definieren sowie Backup/Restore und Rollback praktisch testen. Der vorhandene lokale Server ersetzt diese Schritte nicht.
5. **Freigabe und Gate:** Alle AP-14-/AP-15-Nachweise versionieren, Produkt- und Qualitätsfreigaben dokumentieren und `npm run release:check` erneut ausführen. Inbetriebnahme erst bei `ready: true`.

## Empfehlung

Den aktuellen Stand als **vorführbaren Prototyp**, nicht als Beta oder produktionsreife Anwendung kommunizieren. Der unmittelbar nächste Schritt sollte die Klärung des Pilot-Datenbruchs samt Daten-/Quellenstrategie sein; andernfalls drohen Recherche- und Redaktionsarbeit auf einer falschen Bestandsbasis. Danach sind die 45 Inhalte und die AP-15-Abnahmen die entscheidenden Freigabepfade. Ein belastbarer Inbetriebnahmetermin lässt sich aus den vorhandenen Unterlagen noch nicht ableiten, da Redaktionskapazität, Hostingziel und Abnahmeverantwortliche nicht vollständig festgelegt sind.