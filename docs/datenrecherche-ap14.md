# Recherche- und Inventarstand AP 14

**Stand:** 2026-10-01  
**Status:** Arbeitsinventar, keine redaktionelle oder rechtliche Freigabe.  
**Inventar:** [content/inventar-ap14.csv](../content/inventar-ap14.csv)  
**Zielbezogene Quellpfade:** [content/quellen-ap14.csv](../content/quellen-ap14.csv)
**Feldbezogener Fünfer-Pilot:** [docs/ap14-pilot-feldbelege.md](ap14-pilot-feldbelege.md)

## Umfang und Status

Das Inventar enthält 45 Datensätze: fünf Ziele aus dem vorhandenen JSON-Bestand zur Nachprüfung und 40 neue Zielkandidaten. Die Planung umfasst 34 Stadt-Kandidaten beziehungsweise Bestandsziele. `winter_rechercheprioritaet=ja` markiert nur eine Recherchepriorität; es ist **kein Nachweis** der AP-14-Quote von zwölf winterfähigen Zielen.

Alle neuen Kandidaten bleiben unveröffentlicht. Die Quellpfadliste ordnet jeder Inventar-ID eine offizielle Zielseite, einen regionalen Rechercheeinstieg oder einen ausdrücklich blockierten beziehungsweise nicht geprüften Abruf zu. Eine erreichbare Tourismus-Zielseite ist ein Recherchepfad, noch kein belastbarer Feldbeleg: Typ, Region, Schreibweise, Koordinaten, Fakten, Eignungswerte, Preise, Klima, Bilder und Alternativen müssen je Zielfeld quellenbasiert geprüft werden. Bestandsziele tragen trotz ihres aktuellen technischen Status keine AP-03/AP-04/AP-05-Vollständigkeitsfreigabe.

Der feldbezogene Fünfer-Pilot umfasst Berlin, Salzburg, Tromsø, Bornholm und das deutsche Bodenseeufer. Er ergänzt die Quellpfadliste um konkrete Aussagen und offene Prüfpunkte pro Feld. Er liefert noch keine vollständigen, unabhängig bestätigten Stammsätze: insbesondere Regionsgeometrien, amtliche Koordinaten, mehrere IATA-Codes, Klimanormalwerte, redaktionelle Bewertungen und Nutzungsrechte sind offen.

## Recherchequellen

| Ref. | Quelle und Verwendungszweck | Prüfung / Einschränkung |
|---|---|---|
| DE | [Deutsche Zentrale für Tourismus: Städte und Kultur](https://www.germany.travel/en/cities-culture/overview.html), [Bundesländer](https://www.germany.travel/en/inspiring-germany/federal-states.html) | Offizielle Städte-Seiten für Berlin, Hamburg und Dresden; ergänzende Landes- und Inselquellen je Ziel in der Quellpfadliste. |
| AT | [Austria Tourism](https://www.austria.info/en-gb/), [Städte](https://www.austria.info/en-gb/inspiration/cities-winter/), [Salzkammergut Tourismus](https://www.salzkammergut.at/en/) | Zielseiten für Wien, Salzburg und Innsbruck gefunden. Wintertexte bleiben Recherchehinweise, kein Klimanormal oder unabhängiger Eignungsnachweis. |
| DK | [VisitDenmark: Ziele](https://www.visitdenmark.com/denmark/destinations) | Zielseiten für Kopenhagen, Aarhus, Odense, Aalborg und Bornholm ermittelt. |
| NO | [Visit Norway: Ziele und Regionen](https://www.visitnorway.com/places-to-go/) | Zielseiten für Oslo, Bergen, Trondheim und Tromsø ermittelt; Lofoten-Direktabruf offen. Saisonmarketing nicht als Saisonwert übernehmen. |
| FI | [Visit Finland: Destinationen](https://www.visitfinland.com/en/places-to-go/) | Zielseiten für Helsinki, Tampere, Rovaniemi und Turku; Oulu lokale Tourismusorganisation; Seenland-Regionseinstieg ermittelt. |
| ES | [Turespaña / Spain.info: Destinationen](https://www.spain.info/en/destinations/) | Zielseiten für Barcelona, Madrid, Sevilla, Valencia und Granada ermittelt. |
| IT | [Ministero del Turismo / Italia.it: Italien](https://www.italia.it/en/italy) | Zielseiten für Rom, Mailand, Florenz, Neapel und Sizilien ermittelt; Abruf von Mailand lieferte zeitweise HTTP 429. |
| CH | [Switzerland Tourism / MySwitzerland](https://www.myswitzerland.com/en/) | Zielseiten für Zürich, Genf, Luzern und Interlaken ermittelt. |
| PT | [VisitPortugal](https://www.visitportugal.com/en) | Abruf bei dieser Recherche durch Bot-Schutz blockiert. Für Algarve und Lissabon ist eine konkrete Zielseite manuell zu prüfen; der Portalverweis ist noch kein verifizierter Beleg. |
| HOL | [KMK-Ferienregelung](https://www.kmk.org/service/ferienregelung.html) | Offizielle Kalender nach Schuljahr, teils als PDF und ICS. Schulferien gelten nur für den geführten Ferien-Einstieg, nicht als allgemeiner Reiseverkehrsbeleg. |
| CLIM | [Copernicus ERA5 Single Levels](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels) | Globales Raster mit 0,25° Auflösung und stündlichen Daten seit 1940; Monatsmittel sind verfügbar. Datensatzseite nennt CC-BY. Variablenmapping, Referenzperiode 1991–2020 und räumliche Zuordnung vor Import spezifizieren. |
| EOBS | [E-OBS bei ECA&D](https://www.ecad.eu/download/ensembles/download.php) | Europäische tägliche Temperatur-, Niederschlags- und Globalstrahlungsdaten. Die Nutzungsbedingungen beschränken die Verwendung auf nicht-kommerzielle Forschung und Bildung; Einsatz in einem späteren kommerziellen Produkt ist daher **nicht freigegeben**. |
| IMG | [Unsplash-Lizenz](https://unsplash.com/license) | Die Lizenz erlaubt Nutzung, schließt aber das Zusammenstellen von Bildern zur Nachbildung eines ähnlichen oder konkurrierenden Dienstes aus. Vor Auswahl oder Download ist zu klären, ob der Urlaubsplaner darunter fällt. Keine Bilder wurden übernommen. |

## Offene Beschaffungsregeln

1. **Klimadaten:** AP 04 nennt Copernicus/E-OBS mit Referenzperiode 1991-2020. Die offizielle [ERA5-Datensatzseite](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels) weist globale stündliche Daten ab 1940, ein 0,25°-Raster, vorab berechnete Monatsmittel und CC BY aus. Das ist ein belastbarer Quellenkandidat, aber noch keine Produktfreigabe; Produktverantwortung und Recht müssen Einsatz, Attribution und konkrete Produktlizenz bestaetigen. Die offizielle [E-OBS-Seite](https://www.ecad.eu/download/ensembles/download.php) listet taegliche Mittel-, Minimum- und Maximumtemperatur, Niederschlagssumme und Globalstrahlung, beschraenkt die Nutzung jedoch strikt auf nicht-kommerzielle Forschung und nicht-kommerzielle Bildung. E-OBS ist damit fuer einen kommerziellen Produkteinsatz nicht freigegeben. Fuer ERA5 muessen K-02-Mapping und Aggregation (einschliesslich Tagesgrenze/Zeitzone fuer Tageshoechst- und -tiefstwerte) sowie Niederschlagstendenz noch festgelegt werden. Die Sonnentendenz bleibt gemaess AP 04 K-03 gesperrt; Globalstrahlung ist nicht automatisch Sonnenstunden.
2. **Unsplash:** Bildbeschaffung pausiert bis zur dokumentierten Lizenzprüfung gegen die Einschränkung für konkurrierende Dienste. Technische Abrufbarkeit oder kostenlose Nutzung ersetzt diese Prüfung nicht.
3. **Identifikatoren:** Wikidata kann als Rechercheindex dienen. Koordinaten, Ortskennung und nächster IATA-Code müssen gegen konkrete Primärquellen geprüft werden; Quelle, Prüftag und Lizenz je Feld notieren.
4. **Bewertungen:** Interessen, Reiseform, Kinderalter, Saison, Charakterprofil und Preisniveau sind redaktionelle Bewertungen, keine automatisch ableitbaren Fakten. Erst nach Referenzankern und Bewertungsrichtlinie eintragen.
5. **Zieltexte:** Tourismusportale sind Recherchequellen, keine Textvorlagen. Texte eigenständig verfassen, Tatsachen mit Quelle belegen und Bildrechte separat dokumentieren.

## Nächste Erfassungsschritte

- Die fünf Pilotdatensätze an den offenen Feldern nachrecherchieren: amtliche Ortskennung/Koordinate beziehungsweise Regionsgeometrie, IATA-Code und Flughafenbezug sowie noch fehlende Primärbelege für Fakten.
- Danach die Belegstruktur auf die übrigen 40 Kandidaten anwenden; keine Werte oder Freigaben aus der Kandidatenliste in den öffentlichen Bestand kopieren.
- Klimadatenlizenz und Sonnentendenzregel vor produktivem Import beschließen.
- Inventarstatus pro Feld von „Recherche offen“ zu „Belegt“, „geprüft“ und erst danach „freigegeben“ führen.