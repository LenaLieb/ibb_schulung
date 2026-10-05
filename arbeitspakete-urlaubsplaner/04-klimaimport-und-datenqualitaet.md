# AP 04 – Klimaimport und Datenqualität

**Status:** Nach der physischen Schema-Implementierung aus AP 03 umsetzbar.  
**Verantwortung:** Entwicklung implementiert und betreibt den Import; Redaktion bewertet Saison und prüft die Plausibilität; Qualitätssicherung prüft Datenvollständigkeit und Wiederholbarkeit.  
**Stories:** US-02 und US-28.  
**Abhängigkeiten:** Freigegebenes logisches und physisches Datenmodell aus AP 03; Architekturentscheid aus AP 02 für die konkrete Importausführung.

## Auftrag und Abgrenzung

Dieses Paket überführt Klimadaten aus der festgelegten Quelle reproduzierbar in vollständige Monatswerte je Reiseziel. Es stellt sicher, dass ein Import entweder vollständig gültige Daten bereitstellt oder den bisherigen gültigen Stand unverändert lässt.

Nicht Teil dieses Pakets sind Wetterprognosen, manuell eingetragene Klimawerte, die redaktionelle Saisoneignung `saison_d(m)`, die Zielseitengestaltung oder die Auswahl der ersten Ziele. Die Daten beschreiben typische klimatische Verhältnisse, keine Zusage für einen konkreten Reisetag.

## Lieferobjekte

- **Importspezifikation**
  - Inhalt: Quelle, Referenzperiode, Variablen, räumliche Zuordnung, Aggregation und Datenlückenbehandlung
  - Abnahmeverantwortung: Technische Leitung und Redaktion

- **Variablen-Mapping**
  - Inhalt: Quellvariable → Zielfeld einschließlich Einheit, Tendenzskala und Umrechnungsregel
  - Abnahmeverantwortung: Redaktion

- **Importlaufprotokoll**
  - Inhalt: Ziel, Quelle, Datenversion, Parameter, Zeitpunkt, Ergebnis und Fehlergrund
  - Abnahmeverantwortung: Qualitätssicherung

- **Validierungsregeln**
  - Inhalt: Vollständigkeit der zwölf Monate, Wertebereiche und atomare Übernahme
  - Abnahmeverantwortung: Qualitätssicherung

- **Referenzdaten**
  - Inhalt: ein vollständig geprüfter Probelauf und fünf vollständige Beispielziel-Datensätze
  - Abnahmeverantwortung: Redaktion

- **Wiederholungsanleitung**
  - Inhalt: lokale Ausführung, erneuter Import und Rückkehr auf den letzten gültigen Stand
  - Abnahmeverantwortung: Entwicklung

## Verbindliche Importregeln und Entscheidungsprotokoll

- **K-01 — Quelle und Zeitraum**
  - Verbindlicher Stand: Verwendet wird Copernicus/E-OBS mit Klimanormalperiode 1991–2020. Quelle und Referenzperiode werden pro Ziel gespeichert und später ausgegeben.
  - Sperrwirkung: Kein Import ohne nachweisbare Quelle.

- **K-02 — Monatswerte**
  - Verbindlicher Stand: Je Ziel und Monat werden mittlere Tageshöchsttemperatur, mittlere Tagestiefsttemperatur, Niederschlagstendenz und Sonnentendenz bereitgestellt.
  - Sperrwirkung: Freigabe ist ohne zwölf vollständige Monate gesperrt.

- **K-03 — Sonnentendenz**
  - Verbindlicher Stand: E-OBS-Globalstrahlung ist nicht gleich Sonnenstunden. Die Produktverantwortung gibt vor dem ersten produktiven Import die zulässige, beschriftete Ableitungsregel oder ein alternatives Feld frei.
  - Sperrwirkung: Import und Zielseitenanzeige für die Sonnentendenz bleiben gesperrt.

- **K-04 — Räumliche Zuordnung**
  - Verbindlicher Stand: Die Zielkoordinate und die gewählte Zuordnungs-/Interpolationsmethode sind je Importlauf zu speichern.
  - Sperrwirkung: Werte ohne reproduzierbare Ortszuordnung sind ungültig.

- **K-05 — Atomarität**
  - Verbindlicher Stand: Ein Import wird erst nach vollständiger Validierung als neuer gültiger Stand aktiviert; Teilstände dürfen nie veröffentlicht werden.
  - Sperrwirkung: Fehlerhafter Lauf verändert keinen gültigen Stand.

- **K-06 — Redaktionelle Hoheit**
  - Verbindlicher Stand: Import verändert weder `saison_d(m)` noch Charakter-, Interessen-, Reiseform- oder Kinderbewertungen.
  - Sperrwirkung: Jeder solche Seiteneffekt ist ein Importfehler.

- **K-07 — Wiederholung**
  - Verbindlicher Stand: Ein erfolgreicher Reimport ersetzt nur Klimadaten, protokolliert Quelle und Zeitpunkt und lässt redaktionelle Daten unverändert.
  - Sperrwirkung: Keine Freigabe ohne Vergleich zum vorherigen Stand.

## Vorläufiger Quellenabgleich ERA5

**Status:** Rechercheentwurf vom 2026-10-01; weder Quellenbeschluss noch freigegebenes Variablen-Mapping. Es wurden keine Daten heruntergeladen oder importiert.

| Zielfeld | ERA5-Kandidat | Quellenbefund | Noch zu entscheiden |
|---|---|---|---|
| Mittlere Tageshöchst- und Tagestiefsttemperatur | `2m_temperature` (`2t`), stündliche Analysen, Einheit K | ECMWF empfiehlt, die stündliche analysierte 2-m-Temperatur zur Konstruktion von Tagesminima und -maxima über längere Zeiträume zu verwenden. Celsius-Umrechnung: K minus 273,15. | Zeitzone/Tagesgrenze, Umgang mit fehlenden Stunden und genaue Aggregation über die Referenzjahre 1991-2020. Ein vorgefertigtes Monatsmittel von `2t` ersetzt keine Tagesextreme. |
| Niederschlag | `total_precipitation` (`tp`), Einheit m Wasseräquivalent, akkumuliert | `tp` umfasst flüssigen und gefrorenen Niederschlag und ist die Summe aus großskaligem und konvektivem Niederschlag. Für Millimeter gilt die Einheitenumrechnung m × 1000. | Abrufprodukt und Akkumulationszeitraum festlegen; daraus Tages-/Monatsmenge reproduzierbar bilden. Danach Bezugsgröße, Schwellen und Skala für „Niederschlagstendenz“ fachlich definieren. |
| Sonnentendenz | `surface_solar_radiation_downwards` (`ssrd`) und `total_sky_direct_solar_radiation_at_surface` (`fdir`), Einheit J/m², akkumuliert | `ssrd` umfasst direkte und diffuse Strahlung auf einer horizontalen Fläche; `fdir` ist direkte Strahlung auf einer horizontalen Fläche. In den konsultierten ERA5/CDS-Variablenlisten wurde kein Feld für Sonnenscheindauer gefunden. Beide Felder messen Energie, keine Zeitdauer. | K-03: Produktverantwortung muss eine fachlich gültige, klar benannte Ableitung samt Schwelle, Aggregation und Beschriftung freigeben oder ein alternatives Zielfeld beschließen. Bis dahin kein Import/Anzeige. |
| Räumliche Zuordnung | ERA5 HRES auf regelmäßigem Breiten-/Längengrad-Raster, CDS-Produkt 0,25° | Die CDS beschreibt ein globales Stundenprodukt; ECMWF dokumentiert Analysen und die Raster-/Zeitsemantik. | Zielpunkt/Regionsgeometrie und Raster-/Interpolationsregel gemäß K-04 festlegen und pro Lauf speichern. |

**Quellen:** [ERA5-Datensatz im Climate Data Store](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels), [ECMWF ERA5-Datendokumentation](https://confluence.ecmwf.int/spaces/CKB/pages/76414402/ERA5+data+documentation), [ECMWF-Parameter `2t`](https://codes.ecmwf.int/grib/param-db/167), [ECMWF-Parameter `tp`](https://codes.ecmwf.int/grib/param-db/228), [ECMWF-Parameter `ssrd`](https://codes.ecmwf.int/grib/param-db/169), [ECMWF-Parameter `fdir`](https://codes.ecmwf.int/grib/param-db/228021), [E-OBS-Nutzungsbedingungen](https://www.ecad.eu/download/ensembles/download.php).

**Folgerung:** ERA5 ist aufgrund des globalen Umfangs, der stündlichen Variablen und der auf der CDS-Seite genannten CC-BY-Lizenz ein zu prüfender Kandidat für kommerzielle Nutzung, aber noch nicht rechtlich oder fachlich freigegeben. E-OBS ist laut Anbieter auf nicht-kommerzielle Forschung und Bildung beschränkt. K-01 bleibt bis zum dokumentierten Produkt-/Rechtsentscheid gesperrt; K-02-Mapping und K-03-Sonnentendenz sind ebenfalls offen.

### Quellenvergleich E-OBS und ERA5

| Kriterium | E-OBS | ERA5 | Folge für den Entscheid |
|---|---|---|---|
| Räumliche Abdeckung | Europa, laut ECA&D 25°N-71,5°N und 25°W-45°E | Global | Beide decken die fünf Pilotziele ab; konkrete Rasterzellen/Ortszuordnung bleiben gemäß K-04 nachzuweisen. |
| Temperatur | Tagesfelder `TX` (Maximum), `TN` (Minimum) und `TG` (Mittel) verfügbar | Stündliches `2t`; ECMWF empfiehlt stündliche Analysen zur Konstruktion von Tagesextremen | E-OBS passt näher an die Tagesextremfelder; ERA5 braucht definierte Tagesgrenzen und Stundenaggregation. |
| Niederschlag | Tagesniederschlagssumme `RR` | Akkumuliertes `tp` in Metern Wasseräquivalent | Bei beiden Quelleinheit, Tages-/Monatsaggregation und Tendenzskala dokumentieren. |
| Sonne | `QQ` bezeichnet Globalstrahlung | `ssrd`/`fdir` bezeichnen Strahlungsenergie | Keiner der hier belegten Variablenbezeichner ist Sonnenscheindauer; K-03 bleibt unabhängig von der Quellwahl offen. |
| Raster und Zeit | Ensemble-Raster mit 0,1° und 0,25°; tägliche Daten | HRES-Stundenprodukt im CDS mit 0,25°; historische Abdeckung ab 1940 | Version, Raster und Aggregationsmethode je Importlauf fixieren und protokollieren. |
| Nutzung | ECA&D beschränkt Nutzung strikt auf nicht-kommerzielle Forschung und nicht-kommerzielle Bildung | CDS-Datensatzseite weist CC BY aus; Zitation und sichtbare Copernicus-/Produktattribution sind zu beachten | Produktmodell und konkrete Lizenz-/Attributionsprüfung durch Produktverantwortung und Recht vor Quellenfreigabe. |

**E-OBS-Felder laut Quelle:** `TG`, `TN`, `TX`, `RR`, `PP`, `FG`, `HU` und `QQ`. `QQ` ist Globalstrahlung und daher kein direkter Sonnenstundenwert. Die ECA&D-Seite fordert Versionsangabe, Zitierung und Anerkennung von Datensatz/Beiträgern; die engere Nichtkommerzielleinschränkung bleibt maßgeblich.

### Beschlussvorlage K-03 (nicht beschlossen)

- **Option A — Strahlung statt Sonnenscheindauer:** Die Redaktion bewertet eine klar benannte monatliche Solarstrahlungskennzahl aus `ssrd` (z. B. Energie je Fläche und Tag); UI und Datenmodell sprechen dann ausdrücklich von Strahlung/Einstrahlung, nicht von Sonnenstunden. Schwellen für die Tendenzskala bleiben festzulegen.
- **Option B — echte Sonnenscheindauer:** Erst nach Prüfung einer geeigneten Quelle und wissenschaftlich nachvollziehbaren Ableitungsregel in Stunden; `ssrd` oder `fdir` darf nicht ohne freigegebenes Verfahren als Dauer interpretiert werden.
- **Option C — Feld entfernen oder Versprechen ändern:** AP 01/F-12, Datenmodell und Nutzertexte entsprechend ändern.

**Vorschlag der Fachkonzeption:** Option A ist mit dem belegten ERA5-Feld am unmittelbarsten prüfbar und vermeidet eine unbelegte Stundenangabe. Die Produktverantwortung muss Option, Beschriftung und Tendenzschwellen freigeben; bis dahin bleibt K-03 gesperrt.

## Konkrete Arbeitsschritte

1. Importspezifikation und Variablen-Mapping erstellen; K-03 durch Produktverantwortung und Redaktion entscheiden lassen.
2. Quellzugriff, Datenversion, Lizenz- und Referenzperiodennachweis dokumentieren.
3. Die Zuordnung von Zielkoordinaten zu Quelldaten sowie die Aggregation auf Monatswerte implementieren und mit einem Ziel erproben.
4. Vor Aktivierung eines Laufs Vollständigkeit, Wertebereiche, Einheiten und Metadaten prüfen; bei Fehlern den gesamten Lauf verwerfen.
5. Einen erfolgreichen Probelauf durch Redaktion plausibilisieren lassen und das Ergebnis als Referenz speichern.
6. Den Import auf fünf Beispielziele ausführen, jeden Lauf protokollieren und einen Reimport mit unveränderten redaktionellen Daten nachweisen.
7. Fehler- und Wiederherstellungsfälle aus der Teststrategie durchführen; erst danach den Import für AP 06 freigeben.

## Teststrategie

- **Mapping-Test**
  - Prüfobjekt: jede Quellvariable, Einheit und Tendenzskala
  - Mindestnachweis: dokumentierte Quell-zu-Zielfeld-Zuordnung

- **Vollständigkeitstest**
  - Prüfobjekt: zwölf Monate je Ziel
  - Mindestnachweis: Import mit fehlendem Monat wird vollständig abgewiesen

- **Ortszuordnungstest**
  - Prüfobjekt: gültige und ungültige Zielkoordinate
  - Mindestnachweis: korrekte Zuordnung bzw. verständlicher Abbruch ohne Teilstand

- **Atomaritätstest**
  - Prüfobjekt: Abbruch während Verarbeitung oder Validierungsfehler
  - Mindestnachweis: vorheriger gültiger Klimastand bleibt byte- bzw. inhaltsgleich

- **Reimport-Test**
  - Prüfobjekt: zweiter vollständiger Lauf
  - Mindestnachweis: nur Klimadaten ändern sich; Redaktion und Status bleiben unverändert

- **Plausibilitätstest**
  - Prüfobjekt: Temperatur-, Niederschlags- und Sonnentendenzen eines Ziels
  - Mindestnachweis: Redaktion bestätigt nachvollziehbare typische Monatswerte

- **Anzeigevertragstest**
  - Prüfobjekt: Quelle, Referenzperiode und typische Einordnung
  - Mindestnachweis: AP 11 kann die Metadaten ohne Wetterprognose ausgeben

## Risiken

- **R-01 — Globalstrahlung wird irreführend als Sonnenstunden dargestellt.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: K-03 vor Implementierung verbindlich beschließen und Anzeige korrekt benennen.
  - Eskalation/Abnahme: Kein Freigabeimport ohne Entscheidung.

- **R-02 — Quell- oder Monatsdaten sind unvollständig.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Vollständigkeitsvalidierung vor Aktivierung.
  - Eskalation/Abnahme: Lauf verwerfen, Ursache im Protokoll ausweisen.

- **R-03 — Falsche Ortszuordnung erzeugt plausible, aber falsche Werte.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Koordinaten, Methode und Probelauf je Ziel dokumentieren.
  - Eskalation/Abnahme: Redaktion bestätigt Referenzziel, sonst Mapping zurückweisen.

- **R-04 — Fehlgeschlagener Import beschädigt gültige Daten.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Atomare Stände und Wiederherstellungsprobe.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Freigabe ohne Nachweis.

- **R-05 — Import überschreibt redaktionelle Saisoneignung.**
  - EW: 1, AW: 3
  - Gegenmaßnahme: Feldweise Schreibberechtigung und Reimport-Test.
  - Eskalation/Abnahme: Import als fehlerhaft behandeln und gültigen Stand wiederherstellen.

## Definition of Done

- Importspezifikation, Variablen-Mapping, Validierungsregeln, Laufprotokoll und Wiederholungsanleitung liegen versioniert vor.
- K-03 ist verbindlich entschieden; alle übrigen Importregeln K-01 bis K-07 sind nachweislich erfüllt.
- Ein Ziel und fünf Beispielziele haben jeweils zwölf vollständige, plausible Monatswerte samt Quelle und Referenzperiode.
- Fehlender Monat, ungültige Ortszuordnung, Abbruch und Reimport sind gemäß Teststrategie dokumentiert geprüft.
- Ein fehlerhafter Import lässt den vorherigen gültigen Stand unverändert; ein Reimport verändert keine redaktionellen Daten.

**Nachfolger:** AP 06, AP 11 und AP 14.
