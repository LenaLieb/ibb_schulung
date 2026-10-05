# Bericht: Abgleich der LL-Anmerkungen

**Erstellt:** 29.09.2026

**Geprüfte Anmerkungen:** `urlaubsplaner-userstory-userjourneys-Kopie.md` (5 LL-Anmerkungen, Zeilen 2, 53, 54, 143, 227)
**Abgeglichen mit:** `urlaubsplaner-userstory-userjourneys-1.md` (Fassung 2) und `urlaubsplaner-user-stories.md`

## Übersicht

| Nr. | LL-Anmerkung | Status |
|---|---|---|
| 1 (Z. 2) | Produkt klingt nach Reisezielfinder statt Urlaubsplaner | **Nicht behandelt** |
| 2 (Z. 53) | Reiseart angeben (Flugzeug, Zug) | **Bewusst verworfen**, aber nur halb dokumentiert |
| 3 (Z. 54) | Urlaubsdauer angeben, auch ohne Datum | **Teilweise gelöst** — weiterhin offene Lücke |
| 4 (Z. 143) | Wann Aktivitäten sinnvoll stattfinden | **Nicht behandelt** |
| 5 (Z. 227) | Alter der Kinder angeben | **Vollständig gelöst** |

## 1. Bezeichnung „Urlaubsplaner" — nicht behandelt

Der Begriff „Reisezielfinder" kommt in keinem der beiden aktuellen Dokumente vor. Der Titel „Urlaubsplaner" ist unverändert in Konzept (`urlaubsplaner-userstory-userjourneys-1.md:1`) und User Stories (`urlaubsplaner-user-stories.md:1`). Die Anmerkung ist damit nach wie vor unbehandelt — die Dokumente nehmen die Bezeichnung nicht als Entscheidung oder offenen Punkt auf.

## 2. Reiseart/Anreise — bewusst verworfen, Einordnung unvollständig

`urlaubsplaner-userstory-userjourneys-1.md:685` protokolliert: *„Anreisedauer/Erreichbarkeit als Kriterium wurde geprüft und für die erste Ausbaustufe nicht aufgenommen."* Damit existiert zumindest eine Entscheidung.

Offen bleibt eine Präzisierung: Die Anmerkung fragt nach einem **Eingabefeld** (Reiseart wählen), das Protokoll entscheidet über ein **Kriterium** (Gewichtung/Filterung). Der Suchzustand `(f, A, M, I, L, P)` (`urlaubsplaner-userstory-userjourneys-1.md:115`) enthält kein Verkehrsmittelfeld — die Funktion ist also faktisch ebenfalls nicht vorhanden, nur nicht als solcher benannt. Für die Akzeptanzkriterien ist das eindeutig (keine Story), für die Begründung des Ausschlusses nicht.

## 3. Urlaubsdauer — weiterhin nur Ausgabe, keine Eingabe

„Passende Reisedauer" existiert ausschließlich als **Ergebnisblock** auf der Zielseite (`urlaubsplaner-userstory-userjourneys-1.md:194`, US-26-Umfeld). Es gibt:

- kein Eingabefeld für Dauer — US-10 kennt nur Einzelmonat, Monatsmehrfachauswahl, Datumsspanne (`urlaubsplaner-user-stories.md:239`)
- keinen Dauerterm in der Passungszahl `S(d) = 0,50·S_I + 0,30·S_S + 0,20·S_F` (`urlaubsplaner-userstory-userjourneys-1.md:133`)

Der Fall „ich möchte für eine Woche im Oktober verreisen" ist damit weiterhin nicht ausdrückbar. Inkonsistenz in den Journeys: Die Ausgangssituationen nennen die Dauer (`:359` „für eine Woche", `:467` „für zwei Wochen"), eingegeben wird aber nur der Monat (`:365`, `:471`). Die Dauer wirkt also im Narrativ, nicht im Modell.

## 4. Zeitpunkt für Aktivitäten — nicht behandelt

Kein Treffer für Tageszeit/Vormittag/Abend in beiden Dokumenten. Modelliert ist nur die **jahreszeitliche** Ebene: `saison_d(m)` (`urlaubsplaner-userstory-userjourneys-1.md:109`), Jahresverlauf mit markierten Monaten (US-28) sowie eine Pflichtbegründung bei `saison_d(m)=0` (US-03, AK 2). Die geforderte Feinauflösung innerhalb eines Tages („Bauwerk in der Abendsonne", „Museum früh am leersten") existiert im Datenmodell nicht — weder als Feld noch als Story.

## 5. Alter der Kinder — vollständig gelöst

Durchgängig umgesetzt: Pflichtabfrage nur bei Reiseform Familie (`urlaubsplaner-userstory-userjourneys-1.md:79`, US-09), Ausschlussfilter `min_{a ∈ A} kind_d(a) ≥ 1` (`:126`), Einbindung in die Passungszahl (`:138-144`), Zielseitenblock 7 (`:192`), eigene Story US-30, sowie durchgerechnetes Beispiel mit 8- und 14-Jährigem (`:467-486`). Als Lücke L6 im Änderungsprotokoll geführt (`:674`).

## Fazit

Von fünf Anmerkungen ist eine erledigt (Kinderalter), eine abgelehnt (Reiseart), eine nur zur Hälfte (Urlaubsdauer — als Ausgabe vorhanden, als Eingabe fehlend), zwei sind unberührt (Namensfrage, Aktivitäts-Zeitpunkt). Die beiden offenen Punkte sind in beiden aktuellen Dokumenten nicht einmal als bewusst offen vermerkt, im Gegensatz zu den Lücken L1–L12.
