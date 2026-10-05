# AP 10 – Lockerungen und Suchdiagnose

**Status:** Umsetzbar als Spezifikationspaket.  
**Verantwortung:** Produktverantwortung entscheidet fachliche Priorität und Darstellungsgrenzen; Fachkonzeption dokumentiert Lockerungslogik und Diagnosestrategie; Qualitätssicherung prüft Zustands- und URL-Konsistenz.  
**Quellen:** Entwicklungsplan, User Stories US-22 bis US-25, AP 01 F-07 bis F-09, AP 07 bis AP 09, Grenzfall-Journeys Januar/Strand, Wunschland Norwegen und keine Entscheidung.

## Auftrag und Abgrenzung

Dieses Paket definiert die fachlich verbindliche Logik für Lockerungen, Suchdiagnosen und sichtbare Zustände, wenn eine Suche eng, leer oder überbestimmt ist. Es legt fest, unter welchen Bedingungen alternative Suchpfade angeboten werden, wie der URL-Zustand zu dokumentieren ist und wie die Anwendung dem Nutzer verständliche Hinweise gibt, ohne das Empfehlungsversprechen zu verletzen.

Nicht Teil dieses Pakets sind die visuelle Gestaltung der Suchergebnisse, technische Caching-Strategien, Datenimport, Ranking-Algorithmen und die Auswahl eines Frontend-Frameworks. Jede Regel muss in der Anwendung nachvollziehbar zwischen Originalergebnis, Lockerung und Diagnose unterscheiden. Eine offene Fachentscheidung darf nicht in ein Folgepaket verschoben werden.

## Lieferobjekte

- **Lockerungsmodell**
  - Inhalt: Reihenfolge, Sichtbarkeit und Gültigkeit von `R0/R1/R2`
  - Abnahmeverantwortung: Produktverantwortung

- **Zustandsmodell**
  - Inhalt: Originalkriterien, alternativer Suchpfad, gespeicherte Lockerung und URL-Zustand
  - Abnahmeverantwortung: Fachkonzeption

- **Diagnostikregelwerk**
  - Inhalt: Nulltreffer, kombinierte Einschränkungen, überbestimmte Auswahl und unbelegter Filterwert
  - Abnahmeverantwortung: Produktverantwortung

- **Referenzfallkatalog**
  - Inhalt: Durchgerechnete Fälle mit erwarteter Anzeige, URL, Score-Auswirkung und Handlung
  - Abnahmeverantwortung: Qualitätssicherung

- **Rückverfolgbarkeitsmatrix**
  - Inhalt: Story/Journey → Lockerungsregel → Diagnose → Testfall
  - Abnahmeverantwortung: Qualitätssicherung

## Verbindliche Fachregeln und Entscheidungsprotokoll

- **L-01 — Lockerungsreihenfolge**
  - Verbindlicher Stand: `R0/R1/R2` sind disjunkt, klar sichtbar getrennt und in der festgelegten Reihenfolge auswertbar. Der Saisonfilter wird nie gelockert.
  - Sperrwirkung: Suche, Ergebnisliste und URL-Zustand

- **L-02 — Originalrekonstruktion**
  - Verbindlicher Stand: `relax=AUTO/ORIGINAL` rekonstruiert den Originalsuchzustand bzw. stellt ihn wieder her; die Wiederherstellung darf keine stillschweigende Veränderung anderer Kriterien bewirken.
  - Sperrwirkung: Suche und Ergebnisliste

- **L-03 — Ersatzmonate**
  - Verbindlicher Stand: Ersatzmonate dürfen Originalkriterien nicht verdeckt verändern. Ein Monat kann nur dann als Vorschlag dienen, wenn die ursprüngliche Restriktion nachvollziehbar erhalten bleibt.
  - Sperrwirkung: Matching und Suchdiagnose

- **L-04 — Nulltreffer**
  - Verbindlicher Stand: Bei null Treffern bietet die Anwendung höchstens zwei fachlich verifizierte Änderungsvorschläge an. Ein leerer Bestand und kombinierte Einschränkungen werden als eigene Diagnosefälle behandelt.
  - Sperrwirkung: Suchdiagnose

- **L-05 — Verifizierte Vorschläge**
  - Verbindlicher Stand: Ein Vorschlag gilt nur als verifiziert, wenn er aus dem Zielbestand, der gültigen Kriterienlogik und der fachlich dokumentierten Relevanzlogik abgeleitet ist. Nicht verifizierte Vorschläge sind nicht anzuzeigen.
  - Sperrwirkung: Suchdiagnose

- **L-06 — Wunschland**
  - Verbindlicher Stand: Länder außerhalb des Bestands bleiben als gewählte Einschränkung sichtbar; der Filter wird nur nach bewusster Einschätzung des Nutzers entfernt. Alte oder ungültige URL-Werte werden verständlich als ungültig behandelt.
  - Sperrwirkung: Länderfilter und URL-Zustand

- **L-07 — Überbestimmte Auswahl**
  - Verbindlicher Stand: Eine überbestimmte Interessenauswahl ist erkennbar und wird nur dann mit zwei bis drei empfohlenen Interessen ergänzt, wenn die definierte Unterscheidungsregel dies explizit zulässt.
  - Sperrwirkung: Suche und Suchdiagnose

- **L-08 — Trefferbeitrag je Kriterium**
  - Verbindlicher Stand: Für jedes Kriterium ist der zusätzliche Trefferbeitrag transparent dokumentiert; Abbrecher erhalten konkrete Hilfe, nicht nur einen allgemeinen Hinweis.
  - Sperrwirkung: Ergebnisliste und Suchdiagnose

- **L-09 — Wahrnehmbarkeit**
  - Verbindlicher Stand: Jede Lockerung, jeder Vorschlag und jede Diagnose muss im sichtbaren Zustand, in der URL und in der erklärenden Meldung konsistent und nachvollziehbar sein.
  - Sperrwirkung: Suche, URL-Zustand und Abnahme

F-07 bis F-09 aus AP 01 bilden die fachliche Grundlage für dieses Paket; zusätzliche Lockerungs- und Diagnosenormen werden hier konkretisiert und in die URL-/Zustandslogik übersetzt.

## Konkrete Arbeitsschritte

1. Die formalen Lockerungsstufen `R0/R1/R2` mit Reihenfolge, Sichtbarkeit und Auswahlregeln in einer versionierten Fachspezifikation festhalten; offene Abweichungen im Änderungsprotokoll dokumentieren.
2. Für jeden Suchstate – original, lockerungsgestützt und diagnosiert – den sichtbaren Zustand, URL-Parameter und erlaubte Handlung definieren; keine Zustandsvariante darf implizit entstehen.
3. Nulltreffer- und Kombinationsfälle anhand des Referenzfallkatalogs durchrechnen; nur verifizierte Vorschläge werden als Handlung angezeigt.
4. Länder- und Interessenfilter mit Bestand, Gültigkeit und URL-Validierung konsistent abbilden; ungültige Parametervalue müssen verständlich behandelt werden.
5. Die Änderungs- und Wiederherstellungslogik für `AUTO` und `ORIGINAL` durch Journeys und Grenzfälle prüfen, insbesondere bei Januar/Strand und beim Wegfall von Wunschland.
6. Die Rückverfolgbarkeitsmatrix mit User Stories, Grenzfall-Journeys und Diagnosefällen vollständig ergänzen und gegen die Abnahmebasis prüfen.

## Teststrategie

- **Regeltest**
  - Prüfobjekt: Reihenfolge, Sichtbarkeit, URL-Parameter, Lockerungslogik
  - Mindestnachweis: Rechenblatt oder maschinenlesbarer Referenzfall mit erwartetem State und Parameter

- **Journey-Test**
  - Prüfobjekt: Januar/Strand, Wunschland Norwegen, keine Entscheidung, leere Suche
  - Mindestnachweis: Vollständiger Ablauf von Eingabe bis sichtbarer Diagnose mit erwarteter Handlung

- **Grenzfalltest**
  - Prüfobjekt: Validierungsfehler, ungültiger URL-Wert, überbestimmte Auswahl, Nulltreffer
  - Mindestnachweis: Gültige Fehlermeldung, nachvollziehbare URL, keine stillschweigende Korrektur

- **Konsistenztest**
  - Prüfobjekt: AP 01, AP 07 bis AP 09 und Paket 10
  - Mindestnachweis: Keine widersprüchliche Regel, keine Geheimvorgabe, keine Abhängigkeit ohne begründete Sperrwirkung

- **Abnahmetest**
  - Prüfobjekt: fachliche Abnahmebasis
  - Mindestnachweis: Produktverantwortung bestätigt Lockerungslogik, Diagnosen und URL-Zustand

## Risiken

- **R-10-01 — Lockerungen werden implizit statt sichtbar angewendet.**
  - EW: 3, AW: 3
  - Gegenmaßnahme: Regeln für Reihenfolge und Sichtbarkeit in der Spezifikation festhalten.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die sichtbare Fassung.

- **R-10-02 — Die URL zeigt einen anderen Zustand als die Anzeige.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Jeder State muss URL- und Anzeigezustand dokumentiert haben.
  - Eskalation/Abnahme: Qualitätssicherung verweigert Abnahme.

- **R-10-03 — Nulltreffer liefern unverifizierte Vorschläge.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Nur fachlich validierte Optionen zugelassen; jede Option muss belegt sein.
  - Eskalation/Abnahme: AP 13 darf nicht starten.

- **R-10-04 — Länder- oder Interessenfilter werden stillschweigend korrigiert.**
  - EW: 2, AW: 3
  - Gegenmaßnahme: Ungültige Werte müssen explizit gekennzeichnet und verständlich behandelt werden.
  - Eskalation/Abnahme: Produktverantwortung entscheidet die Ausnahme.

## Definition of Done

- Alle Lieferobjekte liegen versioniert vor.
- `R0/R1/R2`, Nulltreffer-, Länder-, Interesse- und URL-Regeln sind verbindlich beschlossen oder mit sichtbarer Sperrwirkung versehen.
- Jede relevante Must-Story und jeder Grenzfall ist mit einem konkreten Erwartungswert aus dem Referenzfallkatalog belegt.
- Die Anwendung zeigt Lockerung, Diagnose und URL-Zustand konsistent an; keine stillschweigende Korrektur bleibt verborgen.
- Produktverantwortung und Qualitätssicherung haben das Paket freigegeben.

**Voraussetzung:** AP 07, AP 08 und AP 09. **Nachfolger:** AP 13 und AP 15.
