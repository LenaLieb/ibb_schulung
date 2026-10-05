# AP 05 – Redaktion, Rechte und Freigabe

**Status:** Nach der physischen Schema-Implementierung aus AP 03 umsetzbar.  
**Verantwortung:** Redaktion erfasst und bearbeitet Inhalte; prüfende Person kontrolliert Qualität und Rechte; Produktverantwortung verantwortet die Freigabeordnung; Qualitätssicherung prüft den Workflow.  
**Stories:** US-04 bis US-06; Grundlage für US-33 und US-40.  
**Abhängigkeiten:** Datenmodell und Zustandsautomat aus AP 03; vollständige Klimadaten aus AP 04 sind eine Freigabevoraussetzung.

## Auftrag und Abgrenzung

Dieses Paket etabliert einen nachvollziehbaren Redaktions- und Freigabeprozess. Nur fachlich vollständige, geprüfte und rechtlich nutzbare Ziele dürfen öffentlich erscheinen. Änderungen, Rückgaben, Rückzüge und die Korrektur daraus folgender Alternativen bleiben nachvollziehbar.

Nicht Teil dieses Pakets sind das Verfassen der fünf Beispielziele (AP 06), die öffentliche Zielseite (AP 11), Nutzerkonten für Reisende oder ein nicht festgelegtes CMS. Rollen bezeichnen fachliche Berechtigungen; ihre technische Umsetzung folgt dem Architekturentscheid aus AP 02.

## Lieferobjekte

- **Redaktionshandbuch**
  - Inhalt: Rollen, Bearbeitungsablauf, Qualitätsregeln und Wiederholungsfristen
  - Abnahmeverantwortung: Produktverantwortung

- **Freigabekatalog**
  - Inhalt: vollständige Pflichtinhalte, feldgenaue Fehlerhinweise und Freigabesperren
  - Abnahmeverantwortung: Redaktion und Qualitätssicherung

- **Lizenzstandard**
  - Inhalt: zulässiger Lizenztyp, erforderliche Bildmetadaten und Anzeigevorgaben
  - Abnahmeverantwortung: Produktverantwortung

- **Workflow-Nachweis**
  - Inhalt: Statuswechsel, Prüfprotokoll, Rückgabe, Rückzug und Korrekturliste
  - Abnahmeverantwortung: Qualitätssicherung

- **Alternativenregel**
  - Inhalt: gerichtete Beziehung, Unterschiedsnachweis und Initialprozess
  - Abnahmeverantwortung: Redaktion

- **Prüflisten**
  - Inhalt: Wiedervorlage nach 24 Monaten sowie offene Alternativen nach Rückzug
  - Abnahmeverantwortung: Redaktion

## Verbindliche Redaktions- und Freigaberegeln

- **R-01 — Rollen**
  - Verbindlicher Stand: Redaktion darf Entwürfe erstellen und ändern; prüfende Personen kontrollieren; nur berechtigte Freigaberolle setzt `FREIGEGEBEN` oder `ZURUECKGEZOGEN`.
  - Sperrwirkung: Ungültiger Statuswechsel wird abgewiesen.

- **R-02 — Statusfluss**
  - Verbindlicher Stand: `ENTWURF → IN_PRUEFUNG → FREIGEGEBEN`; Rückgabe führt nach `ENTWURF`, Rückzug nach `ZURUECKGEZOGEN`; erneute Freigabe durchläuft Prüfung erneut.
  - Sperrwirkung: Nicht erlaubter Übergang ist gesperrt.

- **R-03 — Vollständigkeit**
  - Verbindlicher Stand: Freigabe verlangt Stammdaten, deutsche Texte, acht Interessen, Saison, Reiseform- und Kindereignung, Charakterprofil, Klima, Preisbegründung, Reisedauer, Sehenswürdigkeiten, Aktivitäten, abschließende Einordnung und mindestens ein Bild.
  - Sperrwirkung: Das System nennt jedes fehlende Feld einzeln.

- **R-04 — Bildrechte**
  - Verbindlicher Stand: Lizenztyp ist ausschließlich `UNSPLASH`; Quelle/URL, Urheber, Prüfdatum, prüfende Person, Zuschnittfreigabe und Alternativtext sind Pflicht.
  - Sperrwirkung: Ziel ist nicht freigabefähig.

- **R-05 — Bildanzeige**
  - Verbindlicher Stand: Urheber- und Lizenzhinweis sind später am Bild sichtbar. Ohne Zuschnittfreigabe wird das Bild nur unbeschnitten ausgeliefert.
  - Sperrwirkung: Auslieferung bzw. Freigabe ist gesperrt.

- **R-06 — Alternativen**
  - Verbindlicher Stand: Zwei bis drei Alternativen sind gerichtet. Das Ziel der Alternative ist freigegeben und unterscheidet sich durch Profilwert `≥ 2` oder ein anderes prägendes Interesse.
  - Sperrwirkung: Beziehung wird mit Begründung abgewiesen.

- **R-07 — Rückzug**
  - Verbindlicher Stand: Ein zurückgezogenes Ziel ist nicht mehr öffentlich sichtbar und erscheint als Korrekturfall bei Alternativen, Merklisten und Vergleichen.
  - Sperrwirkung: Keine Abschaltung ohne Korrekturliste.

- **R-08 — Prüfung**
  - Verbindlicher Stand: Prüfdatum und prüfende Person sind Pflicht; nach 24 Monaten erscheint das Ziel in der Wiedervorlage, bleibt aber bis zur Entscheidung freigegeben.
  - Sperrwirkung: Fehlende Prüfdaten sperren die Freigabe.

## Konkrete Arbeitsschritte

1. Rollen und Statusfluss aus AP 03 in ein Redaktionshandbuch mit Verantwortlichkeiten und erlaubten Handlungen überführen.
2. Den Freigabekatalog gegen US-01 bis US-05 sowie alle Pflichtblöcke der Zielseite aus US-26 bis US-33 prüfen und feldgenaue Fehlermeldungen festlegen.
3. Lizenzstandard für `UNSPLASH` mit vollständigem Bilddatensatz, sichtbarer Attribution und Zuschnittregel definieren.
4. Alternativenregel und unabhängigen Initialprozess für den noch kleinen Bestand festlegen; gerichtete Beziehungen und Unterschiede mit Testdaten erproben.
5. Bearbeitung, Prüfung, Rückgabe, Freigabe, Rückzug und erneute Freigabe mit einem Referenzziel vollständig durchführen und protokollieren.
6. Prüflisten für 24-Monats-Wiedervorlage und die Korrektur nach Rückzug erstellen.
7. Fehlerfälle aus der Teststrategie prüfen; erst danach den Prozess für die fünf Ziele aus AP 06 freigeben.

## Teststrategie

- **Vollständigkeitstest**
  - Prüfobjekt: je ein fehlendes Pflichtfeld aus R-03
  - Mindestnachweis: Entwurf bleibt speicherbar; Freigabe benennt genau dieses Feld.

- **Lizenztest**
  - Prüfobjekt: fehlende Quelle, Urheber, Lizenz, Prüfdatum, Zuschnittfreigabe oder Alternativtext
  - Mindestnachweis: Freigabe ist gesperrt; Freitextlizenz wird abgewiesen.

- **Statusübergangstest**
  - Prüfobjekt: erlaubte und nicht erlaubte Zustandswechsel
  - Mindestnachweis: Nur R-02-konforme Übergänge werden protokolliert akzeptiert.

- **Alternativentest**
  - Prüfobjekt: Unterschied unter/bei/über Schwelle; nicht freigegebenes Ziel
  - Mindestnachweis: Nur R-06-konforme gerichtete Alternative ist speicherbar.

- **Rückzugstest**
  - Prüfobjekt: freigegebenes Ziel mit Alternativen
  - Mindestnachweis: Ziel verschwindet aus öffentlicher Auswahl; Korrekturliste wird erzeugt.

- **Wiedervorlagetest**
  - Prüfobjekt: Prüfdatum älter als 24 Monate
  - Mindestnachweis: Ziel erscheint in Prüfliste, wird nicht automatisch zurückgezogen.

- **Anzeigevertragstest**
  - Prüfobjekt: vollständiger Bilddatensatz
  - Mindestnachweis: AP 11 kann Attribution, Alternativtext und Zuschnittregel ausgeben.

## Risiken

- **R-01 — Ein formal freigegebenes Ziel füllt die Zielseite nicht vollständig.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: R-03 gegen alle Zielseitenblöcke validieren.
  - Eskalation/Abnahme: Redaktion verweigert Freigabe bei fehlendem Block.

- **R-02 — Ein Bild ohne belastbaren Lizenznachweis wird veröffentlicht.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Geschlossene Lizenzliste und Pflichtmetadaten.
  - Eskalation/Abnahme: Freigabe sperren; Prüfung durch Produktverantwortung.

- **R-03 — Rückzug lässt defekte Alternativen oder Vergleiche zurück.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Korrekturliste und Rückzugstest verpflichtend.
  - Eskalation/Abnahme: Rückzug erst nach dokumentierter Nachbearbeitung abschließen.

- **R-04 — Kleiner Erstbestand blockiert die Alternativenpflege.**
  - EW: 2, AW: 2
  - Gegenmaßnahme: Initialprozess mit freigegebenen Seed- bzw. Paketdaten erproben.
  - Eskalation/Abnahme: Produktverantwortung entscheidet begrenzte Erstfreigaberegel.

- **R-05 — Unklare Rollen erlauben unberechtigte Freigaben.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Rollenmatrix und protokollierte Statuswechsel.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Workflow-Abnahme.

## Definition of Done

- Redaktionshandbuch, Freigabekatalog, Lizenzstandard, Alternativenregel und Prüflisten liegen versioniert vor.
- R-01 bis R-08 sind in der gewählten Inhaltsverwaltung umgesetzt und anhand der Teststrategie geprüft.
- Ein vollständiges Referenzziel durchläuft Bearbeitung, Prüfung, Freigabe, Rückgabe, erneute Freigabe und Rückzug nachvollziehbar.
- Kein unvollständiges Ziel oder Bild ohne vollständigen Lizenzdatensatz kann freigegeben werden.
- Alternativen sind nur bei nachgewiesenem Unterschied und freigegebenem Ziel speicherbar; ein Rückzug erzeugt die Korrekturliste.

**Nachfolger:** AP 06, AP 11, AP 12 und AP 14.
