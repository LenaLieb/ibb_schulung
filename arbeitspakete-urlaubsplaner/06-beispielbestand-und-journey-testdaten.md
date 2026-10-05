# AP 06 – Beispielbestand und Journey-Testdaten

**Status:** Nach erfolgreich abgenommenem Klimaimport (AP 04) und Freigabeprozess (AP 05) umsetzbar.  
**Verantwortung:** Redaktion wählt und pflegt Ziele; Produktverantwortung bestätigt die Abdeckung; Qualitätssicherung prüft Daten, Journeys und die Trennung von Test- und Veröffentlichungsbestand.  
**Stories und Journeys:** US-01 bis US-05; Single-, Paar- und Familien-Journey sowie alle Grenzfälle.  
**Abhängigkeiten:** Vollständige Klimaimporte aus AP 04 und durchgesetzte Freigaberegeln aus AP 05.

## Auftrag und Abgrenzung

Dieses Paket baut den kleinsten öffentlich freigabefähigen Beispielbestand für den durchgängigen Prototyp auf und stellt einen davon getrennten, durchgerechneten Testbestand bereit. Der öffentliche Bestand enthält fünf vollständige Ziele; Journey- und Grenzfalltests dürfen zusätzliche, ausdrücklich nicht veröffentlichbare Testziele verwenden.

Nicht Teil dieses Pakets sind der Ausbau auf 45 Ziele (AP 14), das Implementieren des Matchings (AP 07), Zielseitenentwicklung (AP 11) oder das Ändern der fachlichen Regeln. Neue Testdaten dürfen Regeln nur prüfen, nicht stillschweigend verändern.

## Lieferobjekte

- **Auswahlmatrix**
  - Inhalt: fünf öffentliche Ziele mit Typ, Reiseform, Saison, Preis, Zielgruppe und begründeter Abdeckung
  - Abnahmeverantwortung: Produktverantwortung

- **Öffentlicher Beispielbestand**
  - Inhalt: fünf vollständig freigegebene Zielsätze mit allen Pflichtinhalten
  - Abnahmeverantwortung: Redaktion und Qualitätssicherung

- **Journey-Datensatz**
  - Inhalt: durchgerechnete Werte für Single, Paar und Familie einschließlich erwarteter Rangfolge
  - Abnahmeverantwortung: Qualitätssicherung

- **Grenzfall-Datensatz**
  - Inhalt: Daten für null Treffer, Wunschland ohne Bestand, überbestimmte Suche, Gleichstände und fehlende Werte
  - Abnahmeverantwortung: Qualitätssicherung

- **Trennungsnachweis**
  - Inhalt: Kennzeichnung, Ablage und Freigabesperre aller künstlichen Testdaten
  - Abnahmeverantwortung: Technische Leitung und Qualitätssicherung

- **Abnahmeprotokoll**
  - Inhalt: Freigabestatus, Importnachweise, Testresultate und offene Abdeckungsgrenzen
  - Abnahmeverantwortung: Produktverantwortung

## Verbindliche Bestands- und Testregeln

- **B-01 — Öffentlicher Umfang**
  - Verbindlicher Stand: Genau fünf Ziele bilden den freigegebenen Prototypbestand. Jedes Ziel hat alle Freigabevoraussetzungen aus AP 05 erfüllt.
  - Sperrwirkung: Kein unvollständiges Ziel wird veröffentlicht.

- **B-02 — Abdeckung**
  - Verbindlicher Stand: Die Auswahlmatrix zeigt unterschiedliche Zieltypen, Reiseformen, Preisniveaus und Saisonverläufe. Mindestens ein Ziel deckt jede Reiseform ab; Familienziele enthalten Altersgruppenbegründungen.
  - Sperrwirkung: Auswahl ohne dokumentierte Lücken ist nicht abnahmefähig.

- **B-03 — Inhalte**
  - Verbindlicher Stand: Jedes öffentliche Ziel enthält Stammdaten, Klima, Saison, Interessen, Zielgruppeneignung, Charakterprofil, Preis, Reisedauer, Aktivitäten, Sehenswürdigkeiten, Bildrechte und Einordnung.
  - Sperrwirkung: Freigabe nach AP 05 bleibt gesperrt.

- **B-04 — Journey-Werte**
  - Verbindlicher Stand: Die Journey-Fälle Barcelona/Lissabon, Gardasee/Algarve und Mallorca/Kvarner-Bucht/Rhodos besitzen vollständige Eingaben, Zielwerte, Scores und erwartete Reihenfolgen.
  - Sperrwirkung: Matching darf ohne Referenzwerte nicht abgenommen werden.

- **B-05 — Fünf-gegen-sieben-Konflikt**
  - Verbindlicher Stand: Die sieben benannten Journey-Ziele sind nicht automatisch alle öffentliche Ziele. Die Auswahlmatrix kennzeichnet je Ziel `OEFFENTLICH` oder `NUR_TEST`; die Produktverantwortung bestätigt die fünf öffentlichen Ziele.
  - Sperrwirkung: Keine stille Erweiterung des öffentlichen Bestands.

- **B-06 — Künstliche Testdaten**
  - Verbindlicher Stand: Sortierzyklen, Gleichstände, fehlende Daten, Altersgruppen- und Nulltrefferfälle liegen getrennt vom öffentlichen Bestand und tragen eine harte Freigabesperre.
  - Sperrwirkung: Testdaten können nicht in Suche oder Zielseitenfreigabe gelangen.

- **B-07 — Datenstand**
  - Verbindlicher Stand: Jede erwartete Journey-Ausgabe verweist auf eine konkrete Version des Ziel- und Testdatensatzes.
  - Sperrwirkung: Testergebnisse ohne Datenstand sind ungültig.

## Konkrete Arbeitsschritte

1. Auswahlmatrix erstellen und fünf Ziele anhand von B-02 vorschlagen; Reiseform-, Saison- und Preisabdeckung sowie erkennbare Lücken ausweisen.
2. Die Produktverantwortung entscheidet und protokolliert die fünf öffentlichen Ziele sowie die Zuordnung der sieben Journey-Ziele gemäß B-05.
3. Für jedes öffentliche Ziel alle Pflichtinhalte erfassen, den Klimaimport zuordnen und den Workflow aus AP 05 bis `FREIGEGEBEN` durchlaufen.
4. Für jede Haupt-Journey Eingaben, Rohdaten, Teilwerte, Scores, Sortierung und erwartete Texte erstellen; die Datenversion festhalten.
5. Künstliche Grenzfall-Datensätze erstellen: Zyklus in der Sortierung, exakter Gleichstand, fehlende Daten, verschiedene Altersgruppen, Januar/Strand, Wunschland ohne Bestand und überbestimmte Suche.
6. Test- und Veröffentlichungsbestand technisch und fachlich trennen; den Freigabeversuch eines künstlichen Datensatzes ausdrücklich abweisen.
7. Auswahlmatrix, Freigabeprotokolle und Journey-Testergebnisse prüfen; erst danach den Bestand für AP 07 bis AP 11 übergeben.

## Teststrategie

- **Bestandsvollständigkeit**
  - Prüfobjekt: alle fünf öffentlichen Ziele
  - Mindestnachweis: Checkliste aus B-03 und erfolgreicher Freigabestatus

- **Abdeckungstest**
  - Prüfobjekt: Auswahlmatrix
  - Mindestnachweis: dokumentierte Reiseform-, Typ-, Preis- und Saisonabdeckung einschließlich verbleibender Lücken

- **Single-Journey**
  - Prüfobjekt: Barcelona/Lissabon
  - Mindestnachweis: erwartete Reihenfolge und die begründete Auswahlentscheidung sind reproduzierbar

- **Paar-Journey**
  - Prüfobjekt: Gardasee/Algarve
  - Mindestnachweis: erwartete Passung und die Alternative sind aus Daten ableitbar

- **Familien-Journey**
  - Prüfobjekt: Mallorca/Kvarner-Bucht/Rhodos
  - Mindestnachweis: Altersgruppen beeinflussen die Datenbasis gemäß Referenzfall

- **Grenzfalltest**
  - Prüfobjekt: Januar/Strand, Norwegen, keine Entscheidung, überbestimmte Suche
  - Mindestnachweis: erwartete Diagnose bzw. Lockerungsgrundlage ist vorhanden

- **Datenisolationstest**
  - Prüfobjekt: künstlicher Testdatensatz
  - Mindestnachweis: keine Freigabe, keine öffentliche Suche und keine Zielseitenausgabe möglich

- **Versionsprüfung**
  - Prüfobjekt: Journey-Ausgabe gegen Datenstand
  - Mindestnachweis: jede Erwartung verweist auf exakt eine Datensatzversion

## Risiken

- **R-01 — Fünf Ziele decken die drei Journeys nicht sinnvoll ab.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: B-05 trennt öffentlichen und reinen Testbestand; Auswahlmatrix macht Lücken sichtbar.
  - Eskalation/Abnahme: Produktverantwortung bestätigt die Einschränkung oder erweitert ausdrücklich den Umfang.

- **R-02 — Ein Ziel ist formal freigegeben, aber fachlich schlecht kalibriert.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Redaktionelle Plausibilisierung und Referenzfälle vor Freigabe.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Journey-Abnahme.

- **R-03 — Künstliche Testdaten werden öffentlich sichtbar.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: harte Freigabesperre und Isolationstest.
  - Eskalation/Abnahme: Sofortiger Rückzug und Ursachenanalyse.

- **R-04 — Journey-Scores ändern sich unbemerkt mit Datenänderungen.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: B-07 und Versionsprüfung; erwartete Roh- und Teilwerte pflegen.
  - Eskalation/Abnahme: Abweichung blockiert AP 07.

- **R-05 — Fehlende Bild- oder Klimadaten verzögern den Beispielbestand.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: Freigabekatalog früh gegen jedes Ziel anwenden.
  - Eskalation/Abnahme: Ziel ersetzen oder Freigabeumfang neu entscheiden.

## Definition of Done

- Auswahlmatrix, fünf vollständig freigegebene Ziele, Journey-Datensatz, Grenzfall-Datensatz, Trennungsnachweis und Abnahmeprotokoll liegen versioniert vor.
- Alle fünf öffentlichen Ziele erfüllen B-03 und besitzen vollständige Klima- und Lizenznachweise.
- Die drei Haupt-Journeys und alle benannten Grenzfälle sind mit versionierten Daten und erwarteten Ergebnissen reproduzierbar.
- Die Zuordnung der sieben Journey-Ziele zu öffentlichem bzw. reinem Testbestand ist durch die Produktverantwortung bestätigt.
- Künstliche Testdaten können weder freigegeben noch in einer öffentlichen Auswahl angezeigt werden.

**Nachfolger:** AP 07 bis AP 11.
