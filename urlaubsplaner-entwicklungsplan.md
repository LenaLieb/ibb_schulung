# Entwicklungsplan: Urlaubsplaner

**Stand:** 29.09.2026  
**Grundlagen:** [User Stories](<urlaubsplaner-user-stories Kopie.md>) und [Konzept mit User Journeys](<urlaubsplaner-userstory-userjourneys Kopie 1.md>)  
**Status:** Planungsvorschlag für die erste Ausbaustufe. Die nachfolgend vorgeschlagenen fachlichen Korrekturen sind vor ihrer Umsetzung in beide Grundlagen zu übernehmen.

**Aktueller Arbeitsumfang:** Bearbeitet werden die Prüfpunkte 6 (Lockerungsstufen) und 7 (Prioritäten/Umsetzungsreihenfolge) aus der Dokumentprüfung, nicht die gleich nummerierten Abschnitte dieses Plans. Die übrigen Prüfbefunde stehen priorisiert in [backlog.md](backlog.md). Dieser Plan beschreibt weiterhin die gesamte Entwicklung; die übrigen Arbeiten sind damit nicht als erledigt markiert.

**Stand der Überarbeitung:** Ergänzungsgruppen, Scorebezug, Rücknahme per URL und verifizierte Nulltreffervorschläge sind in Konzept 4.2.5 und US-20/US-22/US-23/US-39 ausgearbeitet. Anhang A der User Stories enthält die maßgebliche Reihenfolge innerhalb der Lieferabschnitte. Offene Grundregeln aus dem Backlog bleiben Umsetzungsvoraussetzungen.

## 1. Ziel und Ergebnis

Die erste Ausbaustufe führt deutschsprachige Reisende von Reiseform, Reisezeit und Interessen zu einer begründeten Vorauswahl europäischer Reiseziele. Sie bietet vollständige Zielseiten, Vergleiche, Merklisten und teilbare Suchzustände. Buchung, konkrete Angebote, Nutzerkonten für Reisende und Live-Wetter bleiben ausgeschlossen.

Der Plan unterscheidet drei Ergebnisse:

1. **Durchgängiger Prototyp:** Suche, Ergebnis und Zielseite funktionieren mit fünf geprüften Beispielzielen.
2. **Testfähige Beta:** Die vorgesehenen Nutzerwege einschließlich Grenzfällen, Vergleich und Wiederaufnahme funktionieren mit einem wachsenden Bestand.
3. **Erste veröffentlichte Ausbaustufe:** Der vereinbarte Funktionsumfang ist abgenommen, 45 Ziele sind freigegeben und der laufende Betrieb ist vorbereitet.

Die fünf Beispielziele dienen der Entwicklung. Sie ersetzen weder den späteren Zielbestand noch spezielle Testdatensätze für Rechenregeln und Fehlerfälle.

## 2. Planungsregeln und Verantwortlichkeiten

- Die fachliche Abstimmung aus Phase 0 ist Voraussetzung für die davon abhängigen Arbeitspakete. Unabhängige Arbeiten wie Projektgerüst und Inhaltsinventar können bereits beginnen.
- Jede Phase endet mit einem überprüfbaren Ergebnis. Eine Story gilt erst als abgeschlossen, wenn ihre Akzeptanzkriterien erfüllt sind.
- Barrierefreiheit, mobile Bedienbarkeit, Datenschutz und automatisierte Prüfungen werden in jeder Phase berücksichtigt.
- Redaktion und Entwicklung arbeiten ab einem stabilen Datenmodell parallel. Die Veröffentlichung hängt ebenso von der Inhaltsqualität wie von der Software ab.
- Änderungen des Umfangs werden in Konzept, Stories, Abhängigkeiten und diesem Plan gemeinsam nachgeführt.
- Ein Story-Point-Wert wird nicht direkt in Stunden oder Kalendertage umgerechnet.

| Verantwortung | Aufgabe |
|---|---|
| Produktverantwortung | Fachentscheidungen treffen, Umfang festlegen, Ergebnisse abnehmen |
| Entwicklung | Architektur, Datenmodell, Import, Empfehlungslogik, Oberfläche und Betrieb umsetzen |
| Redaktion | Ziele auswählen, Inhalte erstellen, Bewertungen kalibrieren, Datenherkunft dokumentieren |
| Qualitätssicherung | Prüfbeispiele pflegen, Regeln und Nutzerwege überprüfen, Abnahme dokumentieren |
| Betrieb | Bereitstellung, Überwachung, Datensicherung und Wiederherstellung organisieren |

Eine Person kann mehrere Aufgaben übernehmen. Zuständigkeit und Freigabeverantwortung müssen trotzdem benannt werden.

## 3. Phase 0: Fachliche Regeln und Umfang verbindlich machen

**Ergebnis:** Widerspruchsfreie, versionierte Spezifikation mit ausführbaren Rechenbeispielen und einem priorisierten Backlog.

Die Dokumente enthalten bereits viele Entscheidungen. Insbesondere die Startgewichte 0,50 / 0,30 / 0,20, E-OBS als gewählte Klimaquelle, UNSPLASH als zulässiger Bildlizenztyp sowie Ortskennung, Koordinaten und IATA-Code werden aus Anhang C übernommen. Ihre konkrete Umsetzung muss in die betroffenen Stories einfließen. Das spätere Geschäftsmodell ist dadurch noch nicht entschieden.

| Entscheidung | Vorschlag für die Ausarbeitung | Betroffene Stories | Benötigt vor |
|---|---|---|---|
| Saison und Urlaubsthema | Wetterabhängige Interessen saisonbezogen bewerten oder das Empfehlungsversprechen ausdrücklich einschränken. Einen Testfall „Kultur geeignet, Baden ungeeignet“ aufnehmen. | US-01, US-03, US-17, US-18, US-21, US-27 | Datenmodell und Matching |
| Feste und flexible Reisezeit | Eingabeart sowie ursprüngliche Daten erhalten. Flexible Wunschmonate dürfen anders bewertet werden als ein fester Aufenthalt. Kurzreisen und Jahreswechsel vollständig definieren. | US-10, US-16, US-17, US-18, US-39 | Zustandsmodell und Matching |
| Ferienjahr | Jahr ausdrücklich wählen oder eine sichtbare, eindeutige Regel für die nächste Ferienperiode festlegen. | US-07, US-16 | Ferien-Einstieg |
| Sortierung | Paarweise Toleranzvergleiche durch einen eindeutigen Sortierschlüssel ersetzen; eindeutige ID als letzte Stufe. Anzeige-Rundung getrennt festlegen. | US-18, US-19 | Matching |
| Initiale Freigabe | Referenzskalen unabhängig von bereits veröffentlichten Zielen bereitstellen. Erstfreigabe eines zusammengehörigen Zielpakets oder einen ausdrücklich begrenzten Initialprozess festlegen. | US-03, US-05, US-06, US-26 | Redaktion und Freigabe |
| Veröffentlichungsbedingungen | Alle Pflichtinhalte zentral definieren; Bearbeitung, Ablehnung, Rückzug und erneute Freigabe ergänzen. | US-01, US-05, US-26 bis US-33, US-37 | Datenmodell und Redaktion |
| Lockerungen – ausgearbeitet | Drei disjunkte Gruppen `R0/R1/R2`, gruppenweise Reihenfolge und Scorebezug sowie `relax=AUTO/ORIGINAL` sind in Konzept 4.2.5 festgelegt. Ersatzmonate verändern keine Originalkriterien. | US-20 bis US-23, US-39 | Nach Klärung der übrigen Matching-Grundregeln implementieren |
| Diagnose ohne Treffer – ausgearbeitet | Null bis zwei verifizierte Vorschläge; definierte Kandidaten, leerer Bestand, kombinierte Einschränkungen und manuelle Korrektur sind in Konzept 4.2.5 festgelegt. Die optionale allgemeine Suchhilfe US-38 bleibt getrennt. | US-23 | Suche |
| Vergleich | Vergleichsmonat und Verhalten ohne Suche festlegen; widersprüchliche Gleichrangigkeit bei drei Zielen vermeiden. | US-34 bis US-36 | Vergleich |
| Länder außerhalb des Bestands | Festlegen, wie ein nicht verfügbares Land gesucht werden kann und was mit veralteten Länderparametern geschieht. | US-12, US-24, US-39 | Länderfilter |
| Klimadatenverarbeitung | E-OBS-Variablen, Aggregation 1991–2020, räumliche Zuordnung, Datenlücken und Tendenzskalen festlegen. Die geforderten Sonnenstunden sind durch E-OBS-Globalstrahlung nicht unmittelbar abgedeckt. | US-02, US-28 | Klimaimport |
| Messung | Suche, Sitzung, Ereignisse, Aggregation und Aufbewahrung konkret definieren. Messbarkeit ohne dauerhafte Personenkennung prüfen. | US-43, US-46 | Instrumentierung |

Zusätzlich werden folgende Punkte bereinigt:

- Die Beschlüsse vom 29.09.2026 werden in Konzept und Akzeptanzkriterien übernommen; widersprechende Hinweise auf offene Entscheidungen entfallen.
- Datenfelder für Sehenswürdigkeiten, Aktivitäten, Reisedauer, Preisbegründung, Bildalternativtexte und abschließende Einordnung werden ergänzt.
- Testwerte der drei Journeys werden vervollständigt, einschließlich der für Gleichstände benötigten Werte.
- US-09 verlangt einen nachweisbaren Einfluss des Kinderalters in geeigneten Testdaten, keinen Rangwechsel bei jeder beliebigen Eingabeänderung.
- US-25 erhält eine definierte Berechnung des Unterscheidungsbeitrags und darf bei nur einem gewählten Interesse keine Reduktion auf zwei bis drei empfehlen.
- Messbare Qualitätsziele werden vereinbart: unterstützte Bildschirmgrößen und Browser, Lade- und Reaktionszeiten, Prüfumgebung sowie Abnahmeverfahren für Barrierefreiheit.

**Abnahme:** Jede offene Entscheidung hat eine dokumentierte Lösung oder ist ausdrücklich aus dem Lieferumfang entfernt. Für alle verpflichtenden Stories sind Abhängigkeiten und Akzeptanzkriterien widerspruchsfrei.

## 4. Architektur und technische Vorbereitung

Die Dokumente legen keinen Technologie-Stack fest. Für die erste Ausbaustufe wird bewusst eine schlanke, leicht wartbare Lösung gewählt, die ohne zusätzliche Framework-Komplexität auskommt: ein Node.js-basiertes Projekt mit statischer Web-Applikation und dateibasiertem Inhaltsmodell. Dabei werden Daten, Regeln und Rendering möglichst klar getrennt, ohne sofort einen separaten Backend-Service oder eine Datenbank einzuführen.

| Baustein | Entscheidung für die erste Ausbaustufe |
|---|---|
| Laufzeitumgebung | Node.js LTS als einheitliche Laufzeit für Logik und Build-Prozesse |
| Architektur | Statische Webanwendung mit leichtem Node.js-Server bzw. statischer Auslieferung; keine SPA-Architektur mit Frontend-Framework |
| Fachlogik | JavaScript-/TypeScript-Module für Validierung, Filter, Score, Sortierung, Lockerungen, Vergleich und Zustandslogik |
| Inhaltsmodell | Strukturierte JSON-Dateien bzw. ein valides dateibasiertes Schema mit Versionierung und Prüfungen |
| Inhaltsverwaltung | Redakteure pflegen strukturierte Daten in einer vereinfachten Dateistruktur; optional ein minimales CMS später, aber nicht als Voraussetzung |
| Importverarbeitung | Node.js-Skripte für Klimadaten-Import, Normalisierung und Validierung |
| Auslieferung | Statische HTML-Dateien oder einfaches serverseitiges Rendern mit selbst ausgelieferten Dateien |
| Zustandsverwaltung | URL-Parameter als serialisiertes Such-/Vergleichsmodell; lokale Merkliste im Browser |
| Nutzungsmessung | Datensparsame Ereignisse im Browser/Server sammeln, ohne personenbezogene Logdaten |

### Empfohlener Stack

- Runtime: Node.js LTS
- Sprache: JavaScript oder TypeScript
- Frontend: HTML, CSS und kleine JavaScript-Module ohne großes UI-Framework
- Daten: JSON-Dateien, ggf. kleine YAML- oder Markdown-Module für redaktionelle Texte
- Build/Automation: npm-Skripte, automatisierte Validierung, Linting und Testlauf
- Hosting: statische Auslieferung oder einfacher Node.js-Host; keine komplexe Container- oder Microservice-Architektur
- Persistenz: zunächst keine Datenbank; nur dateibasierte Inhalte, falls später ein CMS oder eine persistente Struktur notwendig wird

Diese Entscheidung dient der Zielsetzung „möglichst einfache Umsetzung ohne zusätzliche Komplexität“. Sie ist für Prototyp, Beta und Übergang zur ersten Ausbaustufe ausreichend, solange der Umfang und die fachlichen Regeln klar definiert sind.

Technische Grundaufgaben:

1. Repository, Entwicklungsanleitung, Formatierung und automatisierte Prüfungen einrichten.
2. Entwicklungs-, Test- und Produktionskonfiguration trennen.
3. Inhalts-/Datenmodell als strukturierte Dateistruktur mit Versionierung, Validierung und nachvollziehbaren Änderungen anlegen; Datenbankschema nur dann ergänzen, wenn die Anforderungen es zwingend erfordern.
4. Vorschau und Veröffentlichung organisatorisch und technisch trennen.
5. Protokollierung so konfigurieren, dass Suchparameter nicht unbeabsichtigt dauerhaft in Zugriffs- oder Fehlerprotokollen gespeichert werden.
6. Bereitstellung, Datensicherung und Rückkehr zur letzten funktionierenden Version vorbereiten.

## 5. Phase 1: Datenmodell, Redaktion und Beispielbestand

**Stories:** US-01 bis US-05, US-47; Grundlagen für US-06, US-07 und US-42 bis US-45.  
**Voraussetzung:** Entscheidungen zu Datenmodell, Klimaimport und Erstfreigabe aus Phase 0.

### Arbeitspakete

1. Zielstammdaten einschließlich Ortskennungen, Koordinaten, Flughafenbezug und sprachgebundener Texte als strukturierte JSON-/Dateidaten modellieren und validieren.
2. Bewertungen für Interessen, Saison, Reiseformen und Kinderalter einschließlich Begründungen und Skalenvalidierung als zentrale Regeldaten und JavaScript-Module umsetzen.
3. Charakterprofil und unabhängig initialisierbare Referenzskalen bereitstellen; die Referenzen als separat prüfbare Daten und Logik definieren.
4. Vollständige Inhaltsblöcke, Bildmetadaten und redaktionelle Freigabestatusse als dateibasierte Inhalte erfassen; Entwurfsspeicherung von Veröffentlichungsvalidierung trennen.
5. Klimaimport zunächst an einem Ziel erproben, danach auf fünf Ziele erweitern. Importskripte, Quellversion, Referenzperiode und Verarbeitungsschritte als nachvollziehbare, prüfbare Dateien dokumentieren.
6. Einen fehlgeschlagenen Import ohne beschädigten oder teilweise überschriebenen Veröffentlichungsstand behandeln; Import- und Veröffentlichungsstände sauber trennen.
7. Redaktionsprozess einschließlich Berechtigungen, Rückzug und erneuter Prüfung als Datei- oder Validierungsworkflow umsetzen.
8. Datenmodell für Alternativen und Ferienkalender vorbereiten; den gewählten Initialprozess für Alternativen in der dateibasierten Struktur erproben.

### Beispielbestand

Fünf Ziele werden so ausgewählt, dass unterschiedliche Reiseformen, Zieltypen, Saisonverläufe und Preisniveaus vorkommen. Für Sortierzyklen, fehlende Daten und andere künstliche Grenzfälle werden zusätzliche, ausdrücklich nicht veröffentlichte Testdaten verwendet.

**Abnahme:** Fünf vollständige Beispielziele durchlaufen den Prüfprozess. Unvollständige oder ungültige Inhalte können nicht veröffentlicht werden. Importfehler sind nachvollziehbar und beschädigen keine gültigen Daten.

## 6. Phase 2: Durchgängige Suche und erste Zielseite

**Stories:** US-08 bis US-14, US-17 bis US-24, US-39; anschließend US-06, US-26 bis US-33, US-37, US-42. US-43 bis US-45 fortlaufend.  
**Voraussetzung:** Beispielbestand sowie verbindliche Such-, Sortier- und Lockerungsregeln.

Diese Phase umfasst die Lieferabschnitte 2 (Suche) und 3 (Zielseiten) aus Anhang A der User Stories.
Sie wird in kleine, nacheinander abnehmbare Lieferpakete geteilt. Die Fachfunktionen entstehen in klar getrennten JavaScript-Modulen; Benutzeroberfläche, Zustandsmodell und gemeinsame Integration folgen in einer einfachen, statischen Struktur.

| Paket | Umsetzung | Überprüfbares Ergebnis |
|---|---|---|
| 2.1 Fachlogik | Ausschlussfilter, Teilwerte, Gewichtung und eindeutige Sortierung als JavaScript-Funktionen implementieren. | Vollständige Journey-Testdaten liefern die vereinbarten Scores und Reihenfolgen. |
| 2.2 Zustand und Eingabe | URL-Schema, Validierung, Reiseform, Kinderalter, Reisezeit, Interessen, Länder und Preisfilter in einem einfachen, serialisierten Suchzustand umsetzen. | Gültige Suchen sind teilbar; ungültige Eingaben führen zu verständlicher Korrektur. |
| 2.3 Ergebnisse | Kriterienzusammenfassung, maximal zwölf eindeutige Ziele, Hervorhebung von bis zu drei Originaltreffern und datenbasierte Begründungen umsetzen. | Jede Aussage lässt sich auf Eingabe und Zieldaten zurückführen. |
| 2.4 Grenzfälle | Ergänzungsgruppen nach Konzept 4.2.5, gespeicherte Rücknahme, verifizierte Nulltrefferdiagnose und nicht verfügbare Wunschländer umsetzen. | Enge Suchen erzeugen verständliche Zustände; Ersatzmonate werden nicht als Originaltreffer dargestellt. |
| 2.5 Zielseite mit Alternativen | Zuerst Alternativenpflege US-06 sowie Klima US-28, Preis US-31 und Alternativendarstellung US-33 bereitstellen; danach vollständige Zielseiten und Einordnung integrieren. Zielseiten werden in einer einfachen statischen Template- oder Render-Logik erzeugt. | Zielseiten sind mit und ohne Suche einschließlich aller Pflichtblöcke sinnvoll lesbar. |
| 2.6 Auslieferung | Stabile URLs, statische oder einfach serverseitig gerenderte Zielseiten, Metadaten und strukturierte Daten umsetzen. | Der Seiteninhalt ist im ausgelieferten HTML vorhanden. |

US-06, US-31 und US-33 sind als Voraussetzungen der verpflichtenden Zielseite ebenfalls Must und
werden in dieser Phase vollständig geliefert. US-26 und US-37 werden erst abgenommen, wenn alle
benötigten Bestandteile integriert sind. Der noch offene Initialprozess für Freigaben und Alternativen
ist vorher gemäß backlog.md, B-04 zu klären.

US-42 wird erst nach einer funktionierenden Zielseite vollständig abgenommen. Seine Architekturgrundlage entsteht bereits in der technischen Vorbereitung.

**Meilenstein M1 – Durchgängiger Prototyp:** Eine Person kann suchen, Kriterien ändern, ein Ziel öffnen und per Browsernavigation zur vorherigen Suche zurückkehren. Die Anwendung bleibt auch bei null Treffern verständlich. Alle drei Reiseformen sind erprobt.

## 7. Phase 3: Alternativen, Vergleich und gemeinsame Entscheidung

**Stories:** US-40, US-34 bis US-36, US-41; Integration der bereits gelieferten Alternativen aus US-06/US-33.  
**Voraussetzung:** Funktionierende Zielseiten, URL-Zustand und geprüfte Vergleichsregeln.

### Arbeitspakete

1. Bereits gepflegte Alternativen aus US-06/US-33 in die Vergleichsauswahl integrieren.
2. Den zuvor festgelegten Umgang mit zurückgezogenen Zielen auch im Vergleich und in Merklisten anwenden.
3. Vergleichsauswahl aus Ergebnisliste, Zielseite und Merkliste mit einer einfachen, clientseitigen Auswahllogik ermöglichen.
4. Zwei- und Dreiervergleich mit eindeutigem Vergleichsmonat und nachvollziehbaren Aussagen umsetzen.
5. Mobile Ansicht für zwei gleichzeitig sichtbare Ziele bereitstellen; ein drittes ausgewähltes Ziel muss erreichbar bleiben.
6. Merkliste mit maximal zehn Zielen, Entfernen, Wiederaufnahme und verständlichem Verhalten bei blockiertem Speicher umsetzen.
7. Geteilte Merklisten und vorhandene lokale Listen nach der vereinbarten Regel zusammenführen.
8. Teilen von Suche und Vergleich sowie Kopieren eines Links mit Rückmeldung umsetzen.
9. Veraltete Links, unbekannte IDs und zurückgezogene Ziele ohne Abbruch des gesamten Ablaufs behandeln.

**Meilenstein M2 – Gemeinsame Entscheidung:** Zwei Personen können denselben Vergleich über einen Link öffnen. Auf einem schmalen Bildschirm bleibt der Vergleich vollständig bedienbar. Merkliste und Browsernavigation verlieren keine gültige Auswahl.

## 8. Phase 4: Einstiege, Hilfen und Erfolgsmessung

**Stories:** US-07, US-15, US-16, US-25, US-38, US-46.  
**Voraussetzung:** Stabile Suche; festgelegtes Messkonzept und gepflegte Ferientermine.

### Arbeitspakete

1. Ferienkalender mit Bundesland, Jahr, Ferienart, Datenquelle und Prüfdatum als dateibasierte Konfiguration pflegen.
2. Ferien-Einstieg samt manueller Alternative bei fehlenden Terminen umsetzen.
3. Themen-Einstiege mit sichtbar vorbelegten Kriterien bereitstellen. Fehlende Pflichtangaben, insbesondere Kinderalter, müssen vor Ergebnissen erhoben oder transparent vorbelegt werden.
4. Hinweis auf wenig unterscheidende Interessen nach den korrigierten Regeln umsetzen.
5. Einschränkende Kriterien anhand zusätzlicher Treffer berechnen. Mehrfachblockaden und Gleichstände ausdrücklich behandeln.
6. Die sechs Kennzahlen aus Konzept 14.2 sowie die Auswertung für die Gewichtungsprüfung aus 14.3 instrumentieren.
7. Monatliche und interessenbezogene Bestandslücken aggregiert sichtbar machen.

**Meilenstein M3 – Testfähige Beta:** Alle drei Haupt-Journeys und die Grenzfall-Journeys sind durchführbar. Messereignisse sind fachlich geprüft. Redaktions- und Betriebsteam können mit der Anwendung arbeiten.

## 9. Redaktioneller Arbeitsstrang: Von fünf auf 45 Ziele

**Beginn:** Inhaltsinventar ab Phase 0; vollständige Erfassung ab stabilem Schema in Phase 1.  
**Ende:** Vor der Veröffentlichung.

1. Eine verbindliche Liste mit 45 Zielen und Verantwortlichen anlegen.
2. Mindestens zwölf Städte und mindestens zwölf nach Konzept winterfähige Ziele einplanen.
3. Zusätzlich die tatsächliche Abdeckung je Wintermonat, Reiseform und Interesse prüfen. Die reine Winterquote genügt dafür nicht.
4. Ziele in redaktionellen Paketen erfassen: Fakten, Klima, Texte, Bewertungen, Bilder, Alternativen und Prüfung.
5. Preisniveaus anhand gemeinsamer Referenzen kalibrieren; Bezugsrahmen und Prüfdatum dokumentieren.
6. Für große Inseln und Regionen prüfen, ob eine gemeinsame Klima- und Charakteraussage tragfähig ist.
7. Vor Veröffentlichung die vollständige Suche gegen den tatsächlichen Bestand testen und unplausible Empfehlungen korrigieren.
8. Jährliche Prüfung von Klima- und Ferienstammdaten sowie zweijährliche Textprüfung als wiederkehrende Aufgaben einrichten.

**Abnahme:** Alle 45 Ziele erfüllen die Veröffentlichungsbedingungen. Bestandsquoten und Abdeckung sind dokumentiert. Ungeprüfte oder künstliche Testziele gelangen nicht in den öffentlichen Bestand.

## 10. Phase 5: Gesamtabnahme und Veröffentlichung

**Stories:** Abschlussprüfung aller gelieferten Stories, insbesondere US-42 bis US-46.  
**Voraussetzung:** Testfähige Beta und vollständiger freigegebener Bestand.

### Fachliche und technische Prüfungen

| Prüfbereich | Wesentliche Fälle |
|---|---|
| Rechenregeln | Einzelne Ausschlussbedingungen, Score-Grenzen, Familienminimum, eindeutige Sortierung und unverändertes Ergebnis bei anderer Datenreihenfolge |
| Reisezeit | Kurzreise, Monatswechsel, Jahreswechsel, feste gegenüber flexibler Reisezeit, Ferienjahr und ungültige Datumsfolgen |
| Saisonbezug | Ein Ziel ist für Kultur geeignet, für Baden im selben Monat aber ungeeignet; keine unbelegte Empfehlung |
| Grenzfälle | Null, ein, zwei und mehr als zwölf Treffer; leerer Bestand; Lockerung und Rücknahme; keine erfolgreichen Änderungsvorschläge |
| Vergleich | Werte unter, genau auf und über jeder Schwelle; zwei und drei Ziele; fehlender Suchkontext; mobile Darstellung |
| Zustand | Neuladen, Zurück/Vorwärts, geteilte Links, ungültige Parameter, veraltete Ziele und blockierter lokaler Speicher |
| Redaktion | Unvollständiger Entwurf, verweigerte Freigabe, Änderungen an veröffentlichten Zielen, Rückzug und fehlgeschlagener Import |
| Bedienbarkeit | Tastatur, Fokus, Beschriftungen, Fehlermeldungen, Ergebnisankündigungen, Kontraste, Vergrößerung und vereinbarte Bildschirmgrößen |
| Auslieferung | Vollständiges HTML, gültige Ziel-URLs, Weiterleitungen, fehlende Ziele, Metadaten und strukturierte Daten |
| Datenverarbeitung | Keine unerwarteten Drittanfragen; Suchzustand wird nicht unbeabsichtigt in Protokollen gespeichert; Messung entspricht dem vereinbarten Konzept |
| Betrieb | Bereitstellung, Datensicherung, Wiederherstellung, Rücknahme einer fehlerhaften Veröffentlichung und verantwortliche Ansprechpersonen |

Automatisierte Tests konzentrieren sich auf Rechenregeln, Zustandsübergänge und zentrale Nutzerwege. Redaktionelle Qualität, Verständlichkeit und Teile der Barrierefreiheit werden zusätzlich manuell geprüft. Die vereinbarten Leistungsziele werden in einer dokumentierten Umgebung gemessen.

### Veröffentlichungskriterien

- Alle Must-Stories und der zusätzlich vereinbarte Lieferumfang sind abgenommen.
- Alle drei Haupt-Journeys funktionieren mit den veröffentlichten Daten.
- Kein bekannter Fehler verfälscht Empfehlungen, verhindert einen zentralen Nutzerweg oder veröffentlicht ungeprüfte Inhalte.
- 45 Ziele und die geforderten Bestandsquoten sind erreicht.
- Bild- und Klimadatenherkunft sind nachvollziehbar dokumentiert.
- Betrieb, regelmäßige Inhaltsprüfung und Fehlerbehandlung sind zugewiesen.
- Veröffentlichung und Rücknahme sind als konkrete Abläufe vorbereitet.

**Meilenstein M4 – Erste Ausbaustufe veröffentlicht:** Die Anwendung ist erreichbar, mit realen Inhalten geprüft und betrieblich übergeben.

## 11. Umfang und Priorisierung

Der vollständige Plan berücksichtigt US-01 bis US-47. Für einen kleineren ersten Veröffentlichungsschritt muss die Produktverantwortung den Umfang ausdrücklich reduzieren und die betroffenen Journeys anpassen.

| Umfang | Empfehlung |
|---|---|
| Verbindlicher Kern | Alle Must-Stories; US-06, US-12, US-13, US-24, US-31 und US-33 wurden wegen ihrer Pflichtabhängigkeiten von Should auf Must angehoben |
| Für die beschriebenen Journeys zusätzlich nötig | Vergleich und Ferien-Einstieg einschließlich der zugehörigen Datenpflege; Alternativen und Preis-Einordnung gehören bereits zum Pflichtumfang |
| Für gemeinsame Entscheidung vorgesehen | Merkliste und Teilen von Vergleichen |
| Bei Bedarf verschiebbar | Themen-Einstiege und zusätzliche Suchdiagnosen aus US-15, US-25 und US-38; der einfache Hinweis ab sieben Interessen ist bereits Pflichtbestandteil von US-11 |
| Architektur von Beginn an | URL-Zustand, serverseitige oder statische Zielseiten, Barrierefreiheit, mobile Bedienbarkeit, eigene Auslieferung und sprachlich erweiterbares Datenmodell |

Die Einstufung einzelner Stories als Should oder Could darf keine Pflichtfunktion indirekt unmöglich machen.
Die oben genannten Korrekturen sind in den Stories übernommen. Architekturentscheidungen für US-42 fallen
früh; die Funktionsabnahme erfolgt erst mit vollständigen Zielseiten. US-43 bis US-45 werden fortlaufend
geprüft. Jede spätere Umfangsänderung erfordert einen erneuten Abgleich der Abhängigkeiten.

## 12. Zeitplanung und Abhängigkeiten

Ohne Angaben zu Teamgröße, verfügbarer Arbeitszeit, Technologie und redaktioneller Kapazität ist kein belastbarer Veröffentlichungstermin ableitbar. Die Phasen sind Lieferabschnitte und können mehrere Iterationen umfassen.

Empfohlen wird eine Planung in kurzen, beispielsweise zweiwöchigen Iterationen. Nach Phase 0 werden Arbeitspakete geschätzt; nach Phase 1 wird die Prognose anhand der tatsächlich benötigten Entwicklungs- und Redaktionszeit aktualisiert.

| Reihenfolge | Meilenstein | Wesentliche Voraussetzung |
|---|---|---|
| 1 | Spezifikation und Umfang abgestimmt | Phase 0 abgeschlossen |
| 2 | Datenbasis und fünf Beispielziele nutzbar | Import, Schema und Freigabe funktionieren |
| 3 | M1: Durchgängiger Prototyp | Suche, Zielseite und Zustand funktionieren |
| 4 | M2: Gemeinsame Entscheidung | Alternativen, Vergleich und Teilen funktionieren |
| 5 | M3: Testfähige Beta | Vereinbarte Einstiege, Hilfen und Messung ergänzt |
| Parallel | 45 Ziele redaktionell fertig | Datenmodell stabil, Kapazität und Prüfprozess vorhanden |
| 6 | M4: Veröffentlichung | Funktionsabnahme, Inhaltsabnahme und Betriebsbereitschaft erreicht |

Der tatsächliche Veröffentlichungstermin richtet sich nach dem später fertig werdenden Arbeitsstrang: Software oder Redaktion. Klimaimport und initialer Freigabeprozess werden früh erprobt, weil Fehler dort viele nachfolgende Aufgaben blockieren.

## 13. Unmittelbar nächste Arbeitspakete

1. Fachentscheidungen aus Phase 0 in einem Entscheidungsprotokoll festhalten und beide Quelldokumente synchronisieren.
2. Verbindlichen Veröffentlichungsumfang, Verantwortliche und verfügbare Kapazität festlegen.
3. Fünf Beispielziele sowie vollständige und künstliche Testdatensätze auswählen.
4. Daten- und URL-Schema entwerfen und mit den drei Journeys sowie den Grenzfällen prüfen.
5. Klimaimport und Erstfreigabe als erste technische Risiken praktisch erproben.
6. Anschließend die Arbeitspakete aus Phase 1 und Paket 2.1 für die ersten Entwicklungsiterationen schätzen und einplanen.

## Teststrategie und Orchestrator

Die Teststrategie und die Orchestrator-Pipeline sind nun Bestandteil des Projektauftrags und liegen im Repository als dauerhafte Referenz vor.

- **Orchestrator:** `scripts/orchestrator.py` analysiert alle Arbeitspakete in `arbeitspakete-urlaubsplaner/`, extrahiert Abhängigkeiten und DoD-Hinweise und erzeugt einen maschinenlesbaren Report `reports/workpackages_report.json`.
- **Automatisierte Tests:** Das Projekt enthält Unit- und E2E-Tests (siehe `tests/`) die:
  - prüfen, dass jedes Arbeitspaket eine erkennbare ID und Abhängigkeitsangaben hat,
  - sicherstellen, dass die Übersichtspakete DoD-Formulierungen enthalten,
  - die Report-Erstellung und Grundkonsistenz der Umsetzungsreihenfolge validieren.
- **Teststrategie-Dokument:** `README-test-strategy.md` beschreibt die Testziele, Abläufe und die Art der Prüfungen; diese Datei ist Teil des Projektauftrags.

Freigabe-Workflow (Kurzfassung):

1. Entwickler/Agent implementiert Paket und fügt Tests/Änderungen ins Repo ein.
2. Orchestrator erzeugt Report; die Testpipeline (`pytest`) wird ausgeführt.
3. Nur wenn alle relevanten Tests für das Paket erfolgreich sind und die Dokumentation aktualisiert wurde, setzt der Freigabe-Agent den Status des Pakets auf "abgeschlossen" und dokumentiert die Freigabe im Report.

Abweichungen, Risiken und offene Punkte werden im Abschnitt "Unmittelbar nächste Arbeitspakete" und im Orchestrator-Report verlinkt.

## 14. Implementierungsstand in `ibb_schulung`

Die Umsetzung wurde am 01.10.2026 in diesem Ordner neu begonnen. Der erste
technische Lieferumfang umfasst ein Node.js-ESM-Projekt ohne Laufzeit-
Abhängigkeiten, fünf synthetische freigegebene Referenzziele, den zentralen
Matching-Kern, den URL-Suchvertrag v1, eine statische Suchoberfläche sowie
einen lokalen HTTP-Server.

**Nachgewiesen abgeschlossen für diesen Lieferumfang:**

- AP 02-Grundlage: Projektmanifest, Build, lokale Auslieferung und Inhaltsprüfung.
- AP 07-Kern: Freigabefilter, Saison-/Interessen-/Reiseformfilter, Gewichtung
  `0,50 / 0,30 / 0,20` und deterministische Ergebnisreihenfolge.
- AP 08-Erstlieferung: Suchparameter `f, A, M, I, L, P`, kanonischer URL-Zustand
  und reloadbarer Pfad `/suche`.

Der Nachweis liegt in `reports/testlauf-protokoll.json` und
`reports/dod-gate.json`. AP 01, AP 03 bis AP 06 und AP 09 bis AP 15 sind nicht
vorzeitig freigegeben; insbesondere fehlen noch vollständige Zielseiten,
Lockerungen, Vergleich, geführte Einstiege, 45 Ziele und Gesamtabnahme.
