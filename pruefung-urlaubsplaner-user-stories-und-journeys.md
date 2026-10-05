# Prüfung: Urlaubsplaner – User Stories und User Journeys

Geprüfte Dateien:

- `urlaubsplaner-user-stories_Kopie.md`
- `urlaubsplaner-userstory-userjourneys_Kopie_1.md`

## Gesamturteil

Die Dokumente sind insgesamt sehr durchdacht, fachlich weitgehend stimmig und ungewöhnlich vollständig. Datenmodell, Matching, Sonderfälle, Redaktion, SEO, Datenschutz, Barrierefreiheit und messbare Erfolgskriterien greifen sinnvoll ineinander.

Vor einer Umsetzung sollten jedoch die folgenden Punkte geklärt oder korrigiert werden.

## Wesentliche Punkte

1. **Freigabe ist nicht vollständig prüfbar.** Die Zielseite verlangt zehn vollständig gefüllte Blöcke. Stammdaten und Freigabe-Workflow erfassen jedoch nicht ausdrücklich Sehenswürdigkeiten, Aktivitäten, Reisedauer, Preis-Begründung und mindestens ein Bild. Ein Ziel könnte dadurch formal freigegeben sein, ohne die Zielseite vollständig füllen zu können. Betroffen sind insbesondere US-01, US-05 und US-26.

2. **Must-/Should-Prioritäten widersprechen sich.** US-26 ist Must und verlangt den Block „Ähnliche Ziele“. Die Pflege und Anzeige von Alternativen sind hingegen nur Should (US-06 und US-33). Eine Must-Zielseite kann so nicht ohne Should-Funktionen freigegeben werden.

3. **Die Umsetzungsreihenfolge verletzt Abhängigkeiten.** US-42 hängt von US-26 ab, ist aber in Iteration 1 vorgesehen; US-26 erst in Iteration 3. US-14 setzt US-12 und US-13 voraus, die wiederum US-17 voraussetzen. Die vorgeschlagene Reihenfolge bildet dies nicht sauber ab.

   **Bearbeitung / Entscheidung:** Die Reihenfolge wird wie folgt bereinigt:

   - US-17 (Ausschlussfilter) wird vor US-12 und US-13 umgesetzt, weil beide Filter auf der Ergebnislogik aufbauen.
   - US-12 und US-13 folgen danach; erst anschließend wird US-14 umgesetzt, da die Kriterienzusammenfassung alle verfügbaren Filter abbilden soll.
   - US-39 wird gemeinsam mit oder vor US-14 umgesetzt, weil US-14 Browser-Historie und einen erhaltenen Suchzustand verlangt.
   - US-26 und US-42 werden in derselben Iteration umgesetzt. Die technische Entscheidung für serverseitiges Rendering bleibt Teil des Architekturstarts, die abnahmefähige SEO-Zielseite folgt jedoch erst mit der Zielseite aus US-26.

   Die empfohlene Reihenfolge lautet daher: **US-01 bis US-05 → US-08 bis US-11 → US-17 bis US-21 und US-39 → US-12, US-13 und US-14 → US-26 bis US-32 einschließlich US-42.**

4. **Vergleich ohne aktive Suche ist nicht definiert.** Ziele dürfen auch über Zielseite oder Merkliste verglichen werden. Die Klimaaussage benötigt jedoch den „ersten gewählten Monat“. Ohne Suchzustand fehlt dieser Wert. Ergänzung: Monat im Vergleich auswählbar machen oder beim suchlosen Vergleich eine Jahresübersicht verwenden.

5. **Die Lockerungs-Journey überspringt Stufe 2.** In Journey 11.1 folgt nach Stufe 1 direkt Stufe 3. Laut Regelwerk muss zuvor Stufe 2 mit angrenzenden Monaten erfolgen. Beide Darstellungen sollten vereinheitlicht werden.

   **Bearbeitung / Entscheidung:** Journey 11.1 wird so angepasst, dass Stufe 2 ausdrücklich und nur bedingt ausgeführt wird: Liefert Stufe 1 weniger als drei Ziele, erweitert die Anwendung die Monatsmenge um die angrenzenden Monate. Erst wenn danach weiterhin kein Ziel vorhanden ist, beginnt Stufe 3 mit der Diagnose und den verifizierten Änderungsvorschlägen. Liefert bereits Stufe 1 mindestens drei Ziele, endet die Lockerung dort; Stufe 2 und Stufe 3 werden nicht ausgeführt.

   Die ersetzende Formulierung für die Journey lautet:

   > Reicht Stufe 1 nicht für mindestens drei Ergebnisse, folgt Stufe 2: Die Anwendung prüft zusätzlich die angrenzenden Monate Dezember und Februar und kennzeichnet jedes ergänzte Ziel mit dem passenden Ersatzmonat. Sind danach weiterhin keine Ziele vorhanden, folgt Stufe 3. Die Anwendung benennt die blockierende Bedingung und bietet nur Änderungsvorschläge an, die nachweislich mindestens ein Ergebnis liefern.

6. **US-23 ist nicht für jeden Datenbestand erfüllbar.** Zwei Änderungsvorschläge, die garantiert zu nichtleeren Ergebnissen führen, sind bei einem kleinen oder stark eingeschränkten Bestand nicht immer möglich. Besser: „bis zu zwei, mindestens einen, sofern vorhanden“ sowie eine transparente Bestandsmeldung.

7. **US-09 enthält ein nicht garantiert erfüllbares Akzeptanzkriterium.** Die Änderung einer Kinderaltersgruppe muss einen Rangwechsel oder Ausschluss erzeugen. Dies hängt vom Zielbestand ab und kann trotz fehlerfreier Implementierung ausbleiben. Besser ist ein definierter Testdatensatz, der diesen Effekt zeigt.

8. **Die Datenschutzannahme zur URL ist zu absolut.** Suchparameter in URLs werden nicht als Nutzerkonto gespeichert, können aber in Server-Logs, Browser-Verläufen und gegebenenfalls Referrer-Headern auftauchen. Die Spezifikation sollte Referrer-Policy, Log-Minimierung und den Verzicht auf sensible Freitexte ausdrücklich ergänzen.

9. **Dokumentstände sind nicht vollständig synchron.** Das Konzept führt die konkrete Klimadatenquelle noch als offen. In Anhang C der User Stories ist Copernicus/E-OBS bereits entschieden. Das Konzept sollte aktualisiert werden.

## Weitere sinnvolle Ergänzungen

- Regel für die ersten Profil-Ankerbeispiele festlegen, damit die Kalibrierung nicht beim ersten Ziel blockiert.
- Klare Behandlung zu langer URLs und ungültiger Parameterkombinationen definieren.
- Mindest- und Qualitätskriterien für redaktionelle Texte, Sehenswürdigkeiten und Aktivitäten ergänzen.
- Vor Produktivbetrieb die rechtlichen Annahmen zu Datenschutz, einwilligungsfreier Messung und Barrierefreiheit fachlich prüfen lassen.

## Fazit

Als Konzeptbasis ist die Ausarbeitung belastbar. Die wichtigsten Nacharbeiten betreffen nicht die Produktidee, sondern die geschlossene Freigabekette, konsistente Prioritäten und Abhängigkeiten, den Vergleich ohne Suche sowie realistisch testbare Akzeptanzkriterien.
