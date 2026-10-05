# Erster Prototypentest

**Format:** moderierter, explorativer Usability-Test  
**Dauer:** etwa 10-15 Minuten  
**Ziel:** Verstehen Testpersonen Reisezeit, Interessenwahl und Ergebnisbegründung ohne Hilfestellung?

Die Testperson erhält ausschließlich die [Teilnehmerkarte](testkarte-prototyp.md). Dieses Dokument und insbesondere die Moderationshinweise bleiben bei der Moderation.

## Vorbereitung

1. Im Ordner `ibb_schulung` `npm run check` ausführen. Der Befehl validiert Inhalte, baut die Vorschau und prüft Unit- sowie HTTP-E2E-Tests.
2. Mit `npm run start` den lokalen Server starten.
3. Im Browser einen frischen Tab mit <http://127.0.0.1:8080/> öffnen. Der Testlink muss auf demselben Rechner geöffnet werden, auf dem der Server läuft.
4. Die Testperson darauf hinweisen, dass nur der Prototyp untersucht wird, keine Antwort- oder Buchungsfunktion besteht und keine persönlichen Daten eingegeben werden sollen. Notizen ohne Namen oder andere Identifikatoren festhalten.

## Moderation

- Sagen: „Ich teste den Prototyp, nicht Sie. Bitte sagen Sie laut, was Sie erwarten und worüber Sie gerade nachdenken.“
- Während der Aufgabe nicht auf bestimmte Felder, Schaltflächen oder Auswahlmethoden hinweisen.
- Bei einer längeren Pause neutral fragen: „Was würden Sie als Nächstes erwarten?“ Keine Lösung vorschlagen.
- Nach der Aufgabe fragen: „Was war unklar?“, „Wie kamen Sie zu Ihrer Entscheidung?“ und „Welche Information hätten Sie als Nächstes gebraucht?“
- Nur nach ausdrücklicher Zustimmung Notizen anfertigen; keine Audio- oder Videoaufnahme für diesen Ersttest.

## Beobachtungsbogen

| Beobachtung | Notiz |
|---|---|
| Zeit bis zur ersten Suche | |
| Welche Reiseform und Reisezeit wurden gewählt? | |
| Welche Interessen wurden ausgewählt? | |
| Wurde eine Auswahl versehentlich beibehalten oder entfernt? | |
| Wie wurde die Ergebnisbegründung verstanden? | |
| Wo gab es Zögern, Rücksprünge oder Rückfragen? | |
| Wörtliche Aussage der Testperson | |
| Was hätte die Testperson als Nächstes gebraucht? | |

## Hinweise nur für die Moderation

- Beim ersten Laden sind „Single“, „Juli“ und „Strand“ vorausgewählt. Nicht vorab darauf hinweisen. Beobachten, ob die Testperson die Vorauswahl bemerkt und wie sie mehrere Einträge in den Mehrfachauswahllisten ändert.
- Bei exakt `Paar`, `Oktober`, `Kultur` und `Kulinarik` sind Barcelona und Lissabon die beiden vorderen Treffer mit je 100 Prozent. Die Gleichheit ist beabsichtigt durch die vorhandenen Pilotwerte; es gibt keinen einzelnen richtigen Zielentscheid.
- Wenn die vorausgewählten Werte bestehen bleiben, verändern sich Trefferbegründung und Score. Das ist eine Beobachtung, kein Fehler der Testperson.
- In den Ergebnis-Metadaten kann der rohe Preiscode `EUR_EUR` sichtbar sein. Er ist eine bekannte Prototypgrenze und soll nicht erklärt oder verteidigt werden; notieren, ob er auffällt und wie er verstanden wird.
- Der Bestand umfasst nur fünf Ziele. Die Aufgabe prüft den Suchablauf, nicht die Vollständigkeit oder Verlässlichkeit eines veröffentlichten Reiseangebots. Zielseiten, Vergleich, Klima, Preisberatung und Buchung sind nicht Bestandteil dieses Ersttests.
- Ergebnisse dieses einzelnen Tests sind qualitative Hinweise, keine statistische Abnahme oder Releasefreigabe.