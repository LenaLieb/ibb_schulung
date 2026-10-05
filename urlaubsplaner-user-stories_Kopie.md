# Urlaubsplaner — User Stories mit Akzeptanzkriterien

**Stand:** 28.09.2026 · **Grundlage:** `urlaubsplaner-userstory-userjourneys.md`, Fassung 2

Dieses Dokument enthält die umsetzbaren User Stories. Das Konzeptdokument beschreibt *was* das
Produkt sein soll und *warum*; dieses Dokument beschreibt, *woran geprüft wird*, dass es so ist.
Jede Story verweist auf den Konzeptabschnitt, aus dem sie stammt.

## Konventionen

**Story-Format:** *Als \<Rolle\> möchte ich \<Fähigkeit\>, damit \<Nutzen\>.*

**Rollen:**

| Rolle | Bedeutung |
|---|---|
| Reisende:r | jede Person in der Anwendung, unabhängig von der Reiseform |
| Alleinreisende:r / Paar / Familie | reiseformspezifisch, wenn die Story nur dort greift |
| Redakteur:in | pflegt Ziele, Texte, Bewertungen und Bilder |
| Betreiber:in | verantwortet Bestand, Qualität und Kennzahlen |

**Akzeptanzkriterien** sind als prüfbare Bedingungen formuliert. Sie sind der Prüfmaßstab für
„fertig“ — nicht die Story selbst.

**Priorität (MoSCoW):** `M` = Must (erste Ausbaustufe nicht lauffähig ohne), `S` = Should,
`C` = Could, `W` = Won't (bewusst außerhalb der ersten Ausbaustufe).

**Schätzung:** Story Points, Fibonacci. Die Werte sind Größenordnungen für die Reihenfolgeplanung,
keine Zusagen.

## Definition of Ready

Eine Story darf erst eingeplant werden, wenn:

1. Akzeptanzkriterien vorliegen und widerspruchsfrei sind,
2. alle Vorbedingungs-Stories abgeschlossen oder eingeplant sind,
3. benötigte Inhaltsdaten mindestens für ein Beispielziel existieren,
4. offene fachliche Fragen beantwortet sind.

## Definition of Done

1. Alle Akzeptanzkriterien nachweislich erfüllt,
2. automatisierte Tests für die Rechenregeln (Filter, Passungszahl, Gleichstand, Schwellen),
3. Tastaturbedienbarkeit und Kontrastprüfung bestanden (US-44),
4. auf schmalem Bildschirm vollwertig bedienbar (US-45),
5. keine Konsolenfehler, keine Aufrufe an Dritte beim Seitenaufruf (US-43).

---

# E1 — Datenmodell und Redaktion

> Dieses Epic ist die Voraussetzung für alle anderen. Ohne gepflegte Ziele hat die Anwendung
> nichts zu zeigen, und ohne kalibrierte Bewertungen ist jede Rangfolge beliebig.
> Konzept: Abschnitte 6 und 7.

## US-01 · Zielstammsatz anlegen

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** — · **Konzept:** 6.1, 6.2, 6.6, 6.7

> Als **Redakteur:in** möchte ich ein Reiseziel nach einer festen Struktur erfassen, damit alle
> Ziele dieselben Aussagen in derselben Qualität liefern und untereinander vergleichbar sind.

**Akzeptanzkriterien**

1. Der Stammsatz erfasst: ID, Name, Typ, Region, Land, Kurzbeschreibung (max. 200 Zeichen),
   redaktionelle Priorität `prio_d ∈ {1..5}`, Preisniveau, Reisecharakter-Text.
2. Als Typ sind ausschließlich `STADT`, `INSEL`, `KUESTENREGION`, `SEENREGION` wählbar.
   **Ein Land ist nicht als Ziel anlegbar.**
3. Für alle acht Interessen ist `interesse_d(i) ∈ {0,1,2}` zu setzen; es gibt keinen Standardwert,
   der ohne Entscheidung durchrutscht.
4. Der Wert 2 („prägend“) ist auf höchstens drei Interessen je Ziel begrenzt; ein vierter Versuch
   wird mit Begründung abgewiesen.
5. Für jede Reiseform ist `form_d(f) ∈ {0,1,2}` **mit** Begründungstext zu erfassen; ein Wert ohne
   Text lässt sich nicht speichern.
6. Für jede Kinderaltersgruppe ist `kind_d(a) ∈ {0,1,2}` **mit** Begründungstext zu erfassen.
7. Beim Speichern eines unvollständigen Satzes benennt das System jedes fehlende Pflichtfeld
   einzeln; ein Sammelhinweis genügt nicht.
8. Unvollständige Ziele sind speicherbar, aber nicht freigebbar (US-05).

## US-02 · Klimadaten importieren

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-01 · **Konzept:** 6.5, 7.2

> Als **Redakteur:in** möchte ich Klimadaten aus einer benannten Quelle importieren statt sie
> einzutippen, damit die Werte reproduzierbar, aktualisierbar und fehlerfrei sind.

**Akzeptanzkriterien**

1. Je Ziel und je Monat werden importiert: mittlere Tageshöchsttemperatur, mittlere
   Tagestiefsttemperatur, Niederschlagstendenz, Sonnenstundentendenz.
2. Quelle und Referenzperiode werden je Ziel gespeichert und auf der Zielseite ausgegeben.
3. Ein Import, der nicht für alle zwölf Monate Werte liefert, wird vollständig abgelehnt; ein
   halb befüllter Datensatz entsteht nicht.
4. Ein erneuter Import überschreibt die Werte, protokolliert Zeitpunkt und Quelle und lässt die
   redaktionellen Felder unberührt.
5. `saison_d(m)` wird **nicht** importiert, sondern bleibt redaktionell (US-03), weil es mehr
   als Temperatur einbezieht.
6. Ein Ziel ohne vollständige Klimadaten ist nicht freigebbar.

## US-03 · Saisonbewertung und Charakterprofil pflegen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-01, US-02 · **Konzept:** 6.4, 6.5

> Als **Redakteur:in** möchte ich Saisoneignung und Charakterprofil gegen hinterlegte
> Ankerbeispiele bewerten, damit die Skalen über alle Ziele und alle Redakteure hinweg dasselbe
> bedeuten.

**Akzeptanzkriterien**

1. Für alle zwölf Monate ist `saison_d(m) ∈ {0,1,2}` zu setzen.
2. Zu jedem Monat mit `saison_d(m) = 0` ist ein Grund zu erfassen (z. B. „zu kalt zum Baden“,
   „Hauptsaison überfüllt“, „viele Betriebe geschlossen“).
3. Die vier Profilwerte `trubel`, `kultur_dichte`, `strand_anteil`, `natur_anteil` sind auf der
   Skala 1–5 zu setzen.
4. Bei der Eingabe zeigt das System zu jedem Skalenpunkt das hinterlegte **Ankerbeispiel** an
   (welches bereits freigegebene Ziel diesen Wert trägt).
5. Ein Profilwert lässt sich ohne angezeigtes Ankerbeispiel nicht setzen, solange für diesen
   Skalenpunkt noch kein Anker existiert — dann ist zuerst ein Anker zu bestimmen.
6. Der Import einer Klimadatenaktualisierung verändert `saison_d(m)` nie automatisch.

## US-04 · Bildlizenz vollständig erfassen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-01 · **Konzept:** 7.3

> Als **Betreiber:in** möchte ich, dass kein Bild ohne vollständigen Lizenznachweis veröffentlicht
> werden kann, damit aus einem Bild kein Rechtsrisiko wird.

**Akzeptanzkriterien**

1. Je Bild werden erfasst: Quelle/URL, Urheber, Lizenztyp aus einer **abschließenden Auswahlliste**,
   Prüfdatum, prüfende Person, Kennzeichen „Bearbeitung/Zuschnitt zulässig“.
2. Die Auswahlliste enthält ausschließlich Lizenzen, die kommerzielle Nutzung und Bearbeitung
   erlauben. Freitext als Lizenztyp ist nicht möglich.
3. Fehlt ein Pflichtfeld, ist das Ziel nicht freigebbar — unabhängig davon, wie vollständig alle
   übrigen Inhalte sind.
4. Der Urheber- und Lizenzhinweis erscheint auf der Zielseite sichtbar am Bild, nicht nur im
   Impressum.
5. Ist „Zuschnitt zulässig“ nicht gesetzt, liefert das System das Bild ausschließlich
   unbeschnitten aus.

## US-05 · Freigabe-Workflow

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-01 bis US-04 · **Konzept:** 7.4

> Als **Betreiber:in** möchte ich, dass nur geprüfte Ziele öffentlich sichtbar sind, damit kein
> unfertiger Inhalt in eine Empfehlung gerät.

**Akzeptanzkriterien**

1. Ein Ziel durchläuft die Zustände `ENTWURF` → `IN_PRUEFUNG` → `FREIGEGEBEN`.
2. Nur Ziele im Zustand `FREIGEGEBEN` erscheinen in Suchergebnissen, Vergleichen und als Alternative.
3. Der Übergang nach `FREIGEGEBEN` ist gesperrt, solange eine Pflichtangabe aus US-01 bis US-04 fehlt;
   das System listet die fehlenden Angaben einzeln auf.
4. Je Ziel werden Datum der letzten Prüfung und prüfende Person gespeichert.
5. Ziele, deren letzte Prüfung länger als 24 Monate zurückliegt, erscheinen in einer
   Wiedervorlageliste — sie werden **nicht** automatisch zurückgezogen.

## US-06 · Alternativen mit geprüftem Unterschied pflegen

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-03, US-05 · **Konzept:** 6.8

> Als **Redakteur:in** möchte ich Alternativen nur mit belegtem Unterschied hinterlegen können,
> damit die Alternativenliste tatsächlich eine Wahl eröffnet und nicht dasselbe Ziel doppelt zeigt.

**Akzeptanzkriterien**

1. Je Ziel sind zwei bis drei Alternativen zu hinterlegen, jeweils mit beschreibendem
   Unterschiedstext.
2. Das System weist eine Alternative ab, wenn sie sich weder in mindestens einem Profilwert um
   ≥ 2 Punkte unterscheidet noch ein anderes prägendes Interesse hat — mit Angabe des Grundes.
3. Die Relation ist gerichtet; eine Gegenrichtung wird **nicht** automatisch angelegt.
4. Nur freigegebene Ziele sind als Alternative wählbar.
5. Wird ein Ziel zurückgezogen, erscheinen alle Stellen, an denen es als Alternative geführt wird,
   in einer Korrekturliste.

## US-07 · Ferienkalender pflegen

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** — · **Konzept:** 4.1.1

> Als **Redakteur:in** möchte ich Schulferientermine je Bundesland pflegen, damit der
> Ferien-Einstieg für jede Familie den richtigen Zeitraum trifft.

**Akzeptanzkriterien**

1. Je Bundesland und Schuljahr sind Ferienarten mit Start- und Enddatum erfasst.
2. Fehlt für ein Bundesland das laufende oder kommende Schuljahr, wird der Ferien-Einstieg für
   dieses Bundesland nicht angeboten (statt einen falschen Zeitraum zu verwenden).
3. Eine Prüfliste zeigt an, für welche Bundesländer Termine fehlen oder in weniger als sechs
   Monaten auslaufen.

---

# E2 — Sucheinstieg erfassen

> Konzept: Abschnitt 4.1 und 5 (Startseite).

## US-08 · Reiseform wählen

**Priorität:** M · **Schätzung:** 2 · **Abhängigkeiten:** — · **Konzept:** 3, 4.1

> Als **Reisende:r** möchte ich meine Reiseform angeben, damit die Vorschläge zu meiner
> Urlaubssituation passen und nicht nur zum Wetter.

**Akzeptanzkriterien**

1. Genau eine Auswahl aus Single, Paar, Familie; die Angabe ist Pflicht.
2. Bei Auswahl „Familie“ erscheint unmittelbar die Altersgruppenabfrage (US-09).
3. Ein Wechsel der Reiseform setzt die übrigen Eingaben nicht zurück; bei Wechsel weg von
   „Familie“ werden die Altersgruppen verworfen und das sichtbar angezeigt.
4. Die Reiseform ist im Suchzustand kodiert (US-39).

## US-09 · Kinderaltersgruppen angeben

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** US-08 · **Konzept:** 3, 4.2.3

> Als **Familie** möchte ich das Alter meiner Kinder angeben, damit ich keine Ziele vorgeschlagen
> bekomme, die nur für andere Altersstufen taugen.

**Akzeptanzkriterien**

1. Mehrfachauswahl aus `A0_5` (0–5), `A6_11` (6–11), `A12P` (12+); mindestens eine Angabe ist bei
   Reiseform Familie Pflicht.
2. Ohne Auswahl ist die Suche nicht startbar; der Hinweis benennt den Grund („das Alter verändert
   die Empfehlung erheblich“).
3. Bei mehreren Altersgruppen wird sichtbar erklärt, dass gegen die am schlechtesten bediente
   Gruppe bewertet wird.
4. Eine Änderung der Auswahl aktualisiert die Ergebnisliste nachweisbar — es lässt sich zeigen,
   dass mindestens ein Ziel seinen Rang ändert oder aus der Liste fällt.

## US-10 · Reisezeit angeben

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** — · **Konzept:** 4.1.1

> Als **Reisende:r** möchte ich meine Reisezeit so angeben, wie ich sie im Kopf habe — als Monat,
> als mehrere Monate oder als Datumsspanne — damit ich mich nicht an eine Eingabeform anpassen muss.

**Akzeptanzkriterien**

1. Drei Eingabearten stehen zur Verfügung: Einzelmonat, Monatsmehrfachauswahl, Datumsspanne.
2. Alle drei erzeugen dieselbe interne Monatsmenge `M ⊆ {1..12}`.
3. Bei einer Datumsspanne zählt ein Monat zu `M`, wenn die Spanne ihn mit **mindestens sieben
   Tagen** berührt.
4. Die Anwendung zeigt nach der Eingabe die daraus abgeleitete Monatsmenge im Klartext
   („Juli und August“), damit die Ableitung überprüfbar ist.
5. `M` ist nie leer; die Angabe ist Pflicht.
6. Eine Datumsspanne über einen Jahreswechsel ist zulässig (`M = {12, 1}`).

## US-11 · Urlaubsinteressen wählen

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** — · **Konzept:** 4.1, 6.6

> Als **Reisende:r** möchte ich angeben, was meinen Urlaub ausmachen soll, damit die Vorschläge
> zu meinen Vorstellungen passen und nicht nur zur Jahreszeit.

**Akzeptanzkriterien**

1. Mehrfachauswahl aus genau acht Werten: Strand, Stadt, Natur, Kultur, Aktivurlaub, Erholung,
   Kulinarik, Ausflüge.
2. Mindestens ein Interesse ist Pflicht; ohne Auswahl ist die Suche nicht startbar.
3. Es gibt keine Obergrenze; ab sieben gewählten Interessen erscheint der Hinweis aus US-25.
4. Die Reihenfolge der Auswahl beeinflusst das Ergebnis nicht — die Passungszahl ist symmetrisch
   über `I`.

## US-12 · Nach Wunschland eingrenzen

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** US-17 · **Konzept:** 4.1, 4.2.2

> Als **Reisende:r** möchte ich meine Suche auf bestimmte Länder eingrenzen, wenn ich schon eine
> grobe Richtung habe, damit ich nicht durch Ziele scrollen muss, die für mich nicht in Frage kommen.

**Akzeptanzkriterien**

1. Mehrfachauswahl aus den Ländern, die im freigegebenen Bestand tatsächlich vertreten sind.
2. Die Auswahl wirkt als harter Ausschlussfilter.
3. Wird ein Land gesucht, das nicht im Bestand ist, greift US-24.
4. Der aktive Länderfilter ist in der Kriterienzusammenfassung sichtbar und einzeln entfernbar.

## US-13 · Nach Preisniveau eingrenzen

**Priorität:** S · **Schätzung:** 2 · **Abhängigkeiten:** US-17 · **Konzept:** 1, 4.1, 6.2

> Als **Reisende:r** möchte ich das Preisniveau eingrenzen, damit meine Vorauswahl auch finanziell
> realistisch ist.

**Akzeptanzkriterien**

1. Mehrfachauswahl aus €, €€, €€€; die Angabe ist optional.
2. Die Auswahl wirkt als harter Ausschlussfilter.
3. Die Anwendung erklärt an der Auswahl, dass es sich um eine **relative Einordnung der typischen
   Kosten vor Ort** handelt, nicht um Preise oder Angebote.
4. An keiner Stelle wird ein Geldbetrag, ein Angebot oder eine Verfügbarkeit angezeigt.

## US-14 · Kriterien sehen und ändern

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-08 bis US-13 · **Konzept:** 4.1, 5

> Als **Reisende:r** möchte ich jederzeit sehen, auf welcher Grundlage die Vorschläge entstehen,
> damit ich sie gezielt korrigieren kann statt neu anzufangen.

**Akzeptanzkriterien**

1. Alle gesetzten Kriterien stehen dauerhaft sichtbar am oberen Rand der Ergebnisansicht.
2. Jedes Kriterium ist einzeln änderbar und — sofern nicht Pflicht — einzeln entfernbar.
3. Eine Änderung aktualisiert die Ergebnisliste, ohne die übrigen Kriterien, die Merkliste oder
   die Vergleichsauswahl zu verlieren.
4. Jede Änderung erzeugt einen Browser-Verlaufseintrag; „Zurück“ stellt den vorigen Suchzustand her.
5. Der Versuch, ein Pflichtkriterium zu entfernen, wird mit Begründung abgelehnt.

## US-15 · Themen-Einstiege nutzen

**Priorität:** C · **Schätzung:** 3 · **Abhängigkeiten:** US-14, US-39 · **Konzept:** 5

> Als **Reisende:r** ohne klare Vorstellung möchte ich über einen Themen-Einstieg starten, damit
> ich nicht vor einem leeren Formular sitze.

**Akzeptanzkriterien**

1. Jeder Themen-Einstieg („Strand im Frühjahr“, „Städtereise zu zweit“) ist eine vollständig
   vorbelegte Suche und führt direkt in die Ergebnisansicht.
2. Die vorbelegten Kriterien sind danach in der Zusammenfassung sichtbar und wie jede andere
   Suche änderbar.
3. Ein Themen-Einstieg, der im aktuellen Bestand kein Ergebnis liefern würde, wird nicht angezeigt.

## US-16 · Ferien-Einstieg mit Bundesland

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-07, US-10 · **Konzept:** 4.1.1

> Als **Familie** möchte ich „Sommerferien“ wählen können und dabei mein Bundesland angeben, damit
> der Zeitraum tatsächlich meinen Ferien entspricht und nicht denen eines anderen Bundeslands.

**Akzeptanzkriterien**

1. Der Ferien-Einstieg verlangt zwingend die Auswahl eines Bundeslands.
2. Ohne Bundesland wird der Einstieg nicht angeboten — er wird nicht mit einem Standardwert
   ausgeführt.
3. Aus Bundesland und Ferienart wird eine Datumsspanne und daraus nach US-10 die Monatsmenge `M`
   abgeleitet.
4. Die abgeleitete Spanne wird im Klartext angezeigt („Sommerferien Bayern: 28.07.–10.09.“).
5. Fehlen die Termine für das gewählte Bundesland, wird das benannt und auf die manuelle
   Zeitraumeingabe verwiesen.

---

# E3 — Matching und Ergebnisliste

> Das Herzstück. Alle Stories dieses Epics sind mit automatisierten Tests zu belegen; eine
> Sichtprüfung genügt nicht. Konzept: Abschnitt 4.2.

## US-17 · Ausschlussfilter anwenden

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-01, US-05 · **Konzept:** 4.2.2

> Als **Reisende:r** möchte ich nur Ziele sehen, die zu meiner Reisezeit, meiner Reiseform und
> meinen Vorgaben grundsätzlich passen, damit ich keine Vorschläge prüfen muss, die von vornherein
> ausscheiden.

**Akzeptanzkriterien**

1. Ein Ziel gelangt nur in die Ergebnismenge, wenn **alle sechs** Bedingungen aus Konzept 4.2.2
   erfüllt sind.
2. Ziele, die nicht `FREIGEGEBEN` sind, werden nie berücksichtigt.
3. Bei Reiseform Familie gilt `min_{a ∈ A} kind_d(a) ≥ 1` — ein Ziel, das für **eine** angegebene
   Altersgruppe ungeeignet ist, fällt heraus.
4. Ein leerer Länder- bzw. Preisfilter schränkt nicht ein.
5. Für jede Bedingung existiert ein Test mit einem Ziel, das genau an dieser Bedingung scheitert.

## US-18 · Passungszahl berechnen

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-17 · **Konzept:** 4.2.3

> Als **Reisende:r** möchte ich die am besten passenden Ziele zuerst sehen, damit ich nicht selbst
> sortieren muss.

**Akzeptanzkriterien**

1. `S(d) = 0,50·S_I + 0,30·S_S + 0,20·S_F` wird für jedes Ziel der Ergebnismenge berechnet.
2. `S_I`, `S_S`, `S_F` entsprechen exakt den Formeln aus Konzept 4.2.3.
3. Bei Reiseform Familie gilt `S_F = (form_d(Familie) + min_{a∈A} kind_d(a)) / 4`.
4. `S(d) ∈ [0,1]` für jede zulässige Eingabe — belegt durch einen Test über den gesamten
   Wertebereich.
5. Die drei Gewichte sind Konfigurationswerte, nicht im Code verstreut; ihre Summe ist 1.
6. Die drei Rechenbeispiele aus den Journeys (Konzept 8, 9, 10) sind als Testfälle hinterlegt und
   liefern exakt die dort angegebenen Werte.

## US-19 · Gleichstände deterministisch auflösen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-18 · **Konzept:** 4.2.4

> Als **Reisende:r** möchte ich bei jedem Aufruf derselben Suche dieselbe Reihenfolge sehen, damit
> ich einem Ergebnis trauen und es wiederfinden kann.

**Akzeptanzkriterien**

1. Bei `|S(d₁) − S(d₂)| < 0,01` greift die vierstufige Kaskade aus Konzept 4.2.4 in genau dieser
   Reihenfolge.
2. Die vierte Stufe (alphabetisch) garantiert, dass die Ordnung **total** ist: Für keine zwei
   verschiedenen Ziele bleibt die Reihenfolge unbestimmt.
3. Zweimaliges Ausführen derselben Suche liefert byte-identische Reihenfolge.
4. Die Reihenfolge ist unabhängig von der Reihenfolge, in der Ziele in der Datenhaltung stehen —
   belegt durch einen Test mit gemischter Eingabereihenfolge.

## US-20 · Ergebnisliste anzeigen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-19 · **Konzept:** 2, 4.2.6

> Als **Reisende:r** möchte ich eine überschaubare Ergebnisliste mit klar hervorgehobenen Favoriten,
> damit ich nicht zwischen zwanzig gleich aussehenden Karten wählen muss.

**Akzeptanzkriterien**

1. Es werden höchstens zwölf Ziele angezeigt.
2. Die drei höchstbewerteten sind als „beste Übereinstimmung“ gekennzeichnet.
3. Jede Karte zeigt: Bild mit Lizenzhinweis, Name, Region, Land, Begründungssatz (US-21), bis zu
   drei prägende Interessen, Preisniveau.
4. Gibt es mehr als zwölf Treffer, wird das benannt und auf Verfeinerung hingewiesen — ohne
   stillschweigendes Abschneiden.
5. Die Liste ist tastaturbedienbar, jede Karte einzeln fokussierbar.

## US-21 · Begründung aus den Daten erzeugen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-18 · **Konzept:** 4.2.6

> Als **Reisende:r** möchte ich auf der Karte sofort lesen, warum dieses Ziel vorgeschlagen wird,
> damit ich nicht erst die Zielseite öffnen muss, um das zu verstehen.

**Akzeptanzkriterien**

1. Der Satz wird aus den tatsächlich erfüllten Kriterien erzeugt, nicht redaktionell getextet.
2. Genannt werden ausschließlich Interessen mit `interesse_d(i) ≥ 1` aus der Nutzerauswahl sowie
   eine Saisonaussage aus `saison_d`.
3. Es ist ausgeschlossen, dass der Satz ein Merkmal nennt, das das Ziel laut Daten nicht hat —
   belegt durch einen Test, der jedes genannte Merkmal gegen den Stammsatz prüft.
4. Bei aktiver Lockerung (US-22) ist die Kennzeichnung Teil des Satzes bzw. steht unmittelbar daran.
5. Der Satz ist auch bei nur einem erfüllten Interesse sprachlich korrekt.

## US-22 · Zu wenige Treffer gestuft lockern

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-17, US-20 · **Konzept:** 4.2.5, 11.1

> Als **Reisende:r** möchte ich bei einer engen Suche brauchbare Alternativen statt einer leeren
> Seite sehen — aber erkennen können, dass meine Vorgabe dafür gelockert wurde.

**Akzeptanzkriterien**

1. Bei weniger als drei Treffern greift Stufe 1: Der Interessenfilter entfällt; ergänzte Ziele
   sind einzeln als solche gekennzeichnet.
2. Reicht das nicht, greift Stufe 2: `M` wird um je einen angrenzenden Monat erweitert; die
   Kennzeichnung nennt den Ersatzmonat konkret.
3. **Der Saisonfilter wird nie aufgehoben** — belegt durch einen Test, der für jede Lockerungsstufe
   prüft, dass kein Ziel mit `max_{m} saison_d(m) = 0` erscheint.
4. Oberhalb der Liste steht ein Hinweis, welche Bedingung gelockert wurde und wie sie sich
   zurücknehmen lässt.
5. Die Lockerung verändert die gesetzten Kriterien nicht — sie bleiben unverändert sichtbar.

## US-23 · Bei null Treffern diagnostizieren

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-22 · **Konzept:** 4.2.5, 11.1

> Als **Reisende:r** möchte ich bei einem leeren Ergebnis erfahren, **woran** es liegt und was ich
> konkret ändern kann, damit ich nicht raten muss.

**Akzeptanzkriterien**

1. Nach Stufe 2 ohne Treffer nennt die Anwendung die blockierende Bedingung im Klartext.
2. Sie zeigt mindestens zwei konkrete, anklickbare Änderungsvorschläge, die jeweils zu einem
   nicht-leeren Ergebnis führen.
3. Jeder Vorschlag ist vor der Anzeige verifiziert — ein Vorschlag, der wieder ins Leere führt,
   wird nicht angeboten.
4. Eine kommentarlos leere Ergebnisliste ist an keiner Stelle erreichbar.

## US-24 · Wunschland ohne Bestand behandeln

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** US-12 · **Konzept:** 11.2

> Als **Reisende:r** möchte ich erfahren, wenn mein Wunschland nicht im Bestand ist, statt ein
> Ergebnis zu sehen, das meinen Filter stillschweigend ignoriert.

**Akzeptanzkriterien**

1. Ist ein gesuchtes Land nicht im freigegebenen Bestand, wird das ausdrücklich benannt.
2. Die Anwendung bietet an, den Länderfilter zu entfernen; sie tut es nicht von sich aus.
3. Ergebnisse, die unter Wegfall des Länderfilters entstünden, werden als solche gekennzeichnet.
4. Der Filter bleibt in der Kriterienzusammenfassung sichtbar, bis die Person ihn entfernt.

## US-25 · Überbestimmte Suche erkennen

**Priorität:** C · **Schätzung:** 3 · **Abhängigkeiten:** US-18 · **Konzept:** 11.4

> Als **Reisende:r** möchte ich einen Hinweis bekommen, wenn meine Auswahl so breit ist, dass sie
> nicht mehr unterscheidet, damit ich verstehe, warum die Rangfolge flach wirkt.

**Akzeptanzkriterien**

1. Ab sieben gewählten Interessen erscheint der Hinweis.
2. Der Hinweis erscheint zusätzlich, wenn die Spanne zwischen höchstem und niedrigstem `S(d)`
   in der Ergebnisliste kleiner als 0,15 ist.
3. Der Hinweis schlägt vor, auf zwei bis drei Interessen zu reduzieren, und nennt jene mit dem
   geringsten Unterscheidungsbeitrag.
4. Es gibt **keine** technische Obergrenze für die Interessenauswahl.

---

# E4 — Zielseite

> Konzept: Abschnitt 4.3 und 5 (Zielseite).

## US-26 · Zielseite in fester Blockreihenfolge

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-01 bis US-05 · **Konzept:** 4.3

> Als **Reisende:r** möchte ich jede Zielseite in derselben Reihenfolge lesen, damit ich Ziele
> vergleichen kann, ohne jedes Mal neu suchen zu müssen, wo welche Information steht.

**Akzeptanzkriterien**

1. Die zehn Blöcke aus Konzept 4.3 erscheinen auf **jeder** Zielseite in exakt dieser Reihenfolge.
2. Kein Block wird weggelassen; ein Block ohne Inhalt ist ein Freigabefehler (US-05), keine
   Anzeigeentscheidung.
3. Ausnahme: Block 2 entfällt, wenn die Seite ohne vorangegangene Suche aufgerufen wird (US-32).
4. Jeder Block trägt eine eigene Überschrift und ist per Sprungmarke direkt erreichbar.

## US-27 · Suchbezogene Passungserklärung

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-18, US-26 · **Konzept:** 4.3

> Als **Reisende:r** möchte ich auf der Zielseite lesen, wie das Ziel zu **meiner** Suche passt,
> damit ich die Empfehlung auf meine Situation beziehen kann.

**Akzeptanzkriterien**

1. Der Block nennt konkret Reiseform, Monat(e) und jedes gewählte Interesse mit seiner Ausprägung
   am Ziel.
2. Nicht erfüllte Interessen werden **ebenfalls** genannt, nicht verschwiegen („Kulinarik spielt
   hier eine geringere Rolle“).
3. Bei Reiseform Familie wird je angegebener Altersgruppe die Eignung benannt.
4. Der Block ist aus den Daten erzeugt; er enthält keine Aussage ohne Datengrundlage.

## US-28 · Klima mit Quelle und Monatseinordnung

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** US-02, US-03 · **Konzept:** 4.3, 6.5, 7.2

> Als **Reisende:r** möchte ich das typische Klima in meinem Reisemonat einschätzen können und
> wissen, woher die Zahlen stammen, damit ich ihnen trauen kann.

**Akzeptanzkriterien**

1. Der Block zeigt den Jahresverlauf sowie die gewählten Monate hervorgehoben.
2. Je Monat: Temperaturspanne, Niederschlags- und Sonnentendenz, `saison_d(m)` als verständliche
   Einordnung.
3. Bei `saison_d(m) = 0` wird der hinterlegte Grund angezeigt.
4. Quelle und Referenzperiode stehen sichtbar am Block.
5. Der Block kennzeichnet die Werte ausdrücklich als saisonale Orientierung, nicht als
   Wettervorhersage.

## US-29 · Eignung nach Reiseform, eigene zuerst

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** US-01, US-26 · **Konzept:** 4.3, 6.7

> Als **Reisende:r** möchte ich die Einordnung für meine Reiseform zuerst lesen, ohne dass mir die
> anderen vorenthalten werden.

**Akzeptanzkriterien**

1. Alle drei Reiseformen werden mit ihrem Begründungstext gezeigt.
2. Die aktuell gewählte steht an erster Stelle und ist hervorgehoben.
3. Ohne vorangegangene Suche gilt die Reihenfolge Single, Paar, Familie.
4. Eine Eignung wird nie ausschließlich als Zahl oder Symbol dargestellt; der Begründungstext ist
   immer sichtbar.

## US-30 · Familien-Eignung nach Altersgruppen

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** US-09, US-29 · **Konzept:** 3, 4.3, 6.7

> Als **Familie** möchte ich lesen, was das Ziel für **meine** Altersstufen bietet, statt eines
> Sammeltexts über „Familien“.

**Akzeptanzkriterien**

1. Der Familienblock ist in die drei Altersgruppen gegliedert, jede mit eigenem Text.
2. Die von der Familie angegebenen Gruppen stehen zuerst und sind hervorgehoben.
3. Ist eine angegebene Gruppe nur eingeschränkt geeignet (`kind_d(a) = 1`), wird das ausdrücklich
   benannt, nicht beschönigt.
4. Ein Familienblock ohne Text für alle drei Gruppen verhindert die Freigabe des Ziels.

## US-31 · Preisniveau einordnen

**Priorität:** S · **Schätzung:** 2 · **Abhängigkeiten:** US-01 · **Konzept:** 1, 6.2

> Als **Reisende:r** möchte ich das Preisniveau des Ziels einordnen können, ohne dass mir Preise
> oder Angebote vorgegaukelt werden.

**Akzeptanzkriterien**

1. Der Block zeigt €, €€ oder €€€ mit einem Satz Begründung.
2. Er erklärt die Skala als relative Einordnung gegenüber den anderen Zielen im Bestand.
3. Es erscheint kein Geldbetrag, kein Angebot, keine Verfügbarkeit und kein Link zu einem
   Buchungspartner.

## US-32 · Zielseite ohne Suche aufrufbar

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** US-26, US-42 · **Konzept:** 5, 13.2

> Als **Reisende:r**, die über eine Suchmaschine kommt, möchte ich eine vollständig verständliche
> Zielseite vorfinden, damit ich nicht erst eine Suche ausfüllen muss.

**Akzeptanzkriterien**

1. Die Zielseite ist unter einer stabilen, sprechenden URL ohne Suchparameter erreichbar und
   vollständig lesbar.
2. Block 2 („Warum es zur aktuellen Suche passt“) entfällt ersatzlos; kein leerer Platzhalter.
3. Die Seite bietet einen sichtbaren Einstieg, eine Suche zu starten oder ähnliche Ziele zu sehen.
4. Einmal veröffentlichte URLs ändern sich nicht; bei Umbenennung eines Ziels bleibt die alte URL
   per Weiterleitung gültig.

## US-33 · Ähnliche Ziele mit benanntem Unterschied

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-06 · **Konzept:** 4.3, 6.8

> Als **Reisende:r** möchte ich Alternativen mit dem konkreten Unterschied sehen, damit ich
> weiterkomme, wenn mir das Ziel nicht zusagt.

**Akzeptanzkriterien**

1. Zwei bis drei Alternativen mit Bild, Name und Unterschiedstext.
2. Eine Alternative, die den Saisonfilter der laufenden Suche nicht besteht, wird mit Hinweis
   gekennzeichnet — nicht unterschlagen.
3. Ohne laufende Suche entfällt diese Kennzeichnung.
4. Nur freigegebene Ziele erscheinen.

---

# E5 — Vergleich

> Konzept: Abschnitt 5 (Vergleichsansicht).

## US-34 · Ziele zum Vergleich auswählen

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-20, US-39 · **Konzept:** 5, 12.3

> Als **Reisende:r** möchte ich zwei oder drei Ziele nebeneinander stellen, wenn ich zwischen
> ihnen schwanke, damit ich nicht zwischen Seiten hin- und herspringen muss.

**Akzeptanzkriterien**

1. Auswahl von zwei oder drei Zielen aus Ergebnisliste, Zielseite oder Merkliste.
2. Die Auswahl ist Teil des Suchzustands und damit als Link teilbar (US-41).
3. Der Versuch, ein viertes Ziel hinzuzufügen, wird mit Begründung abgelehnt.
4. Auch Ziele unterschiedlichen Typs (Stadt gegen Insel) sind vergleichbar.

## US-35 · Vergleichsaussagen berechnen

**Priorität:** S · **Schätzung:** 8 · **Abhängigkeiten:** US-03, US-34 · **Konzept:** 5

> Als **Reisende:r** möchte ich pro Kriterium eine klare Antwort statt einer Datentabelle, damit
> der Vergleich mir die Entscheidung erleichtert statt sie zu verkomplizieren.

**Akzeptanzkriterien**

1. Die Aussagen zu `trubel`, `kultur_dichte`, `strand_anteil`, `natur_anteil` werden aus den
   ordinalen Profilwerten berechnet, nicht redaktionell getextet.
2. Eine wertende Aussage erscheint **nur** bei einer Differenz von mindestens 2 Skalenpunkten;
   sonst steht „vergleichbar“.
3. Klima: Aussage ab 2 °C Differenz der mittleren Tageshöchsttemperatur im ersten gewählten Monat,
   sonst „vergleichbar warm“.
4. Preisniveau: Aussage ab einer Stufe Unterschied.
5. Bei drei Zielen wird je Kriterium eine Rangfolge gebildet; Ziele innerhalb der Schwelle werden
   als gleichrangig ausgewiesen.
6. Für jede Schwelle existiert ein Test mit einem Wertepaar knapp darunter und knapp darüber.

## US-36 · Vergleich auf schmalen Bildschirmen

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** US-35 · **Konzept:** 13.5

> Als **Reisende:r** am Telefon möchte ich den Vergleich vollwertig nutzen können, ohne waagerecht
> scrollen zu müssen.

**Akzeptanzkriterien**

1. Auf schmalen Bildschirmen sind höchstens zwei Ziele gleichzeitig darstellbar.
2. War ein Dreiervergleich aktiv, wird das benannt und die Auswahl des dritten Ziels bleibt
   erhalten.
3. Kein waagerechtes Scrollen der Seite.
4. Die Kriteriennamen bleiben beim Blättern sichtbar.

---

# E6 — Entscheidung abschließen

> Konzept: Abschnitt 4.4 und 11.3.

## US-37 · Abschließende Einordnung

**Priorität:** M · **Schätzung:** 3 · **Abhängigkeiten:** US-26 · **Konzept:** 4.4

> Als **Reisende:r** möchte ich am Ende der Zielseite eine klare Einordnung lesen, damit ich weiß,
> wofür das Ziel taugt — und wann etwas anderes besser wäre.

**Akzeptanzkriterien**

1. Die Einordnung nennt konkret, für welche Art Urlaub das Ziel geeignet ist.
2. Sie nennt mindestens eine Bedingung, unter der eine Alternative besser passt, samt Alternative.
3. Sie enthält keine Kaufaufforderung und keinen Hinweis auf Buchung.
4. Sie bezieht die gewählte Reiseform und — bei Familien — die Altersgruppen ein.

## US-38 · Einschränkendstes Kriterium benennen

**Priorität:** C · **Schätzung:** 5 · **Abhängigkeiten:** US-17 · **Konzept:** 11.3

> Als **Reisende:r**, die sich nicht entscheiden kann, möchte ich wissen, welche meiner Vorgaben
> die Auswahl am stärksten einschränkt, damit ich gezielt lockern kann.

**Akzeptanzkriterien**

1. Je Kriterium wird berechnet, wie viele zusätzliche Ziele bei dessen Wegfall in die
   Ergebnismenge kämen.
2. Das Kriterium mit dem größten Zuwachs wird benannt, mit der konkreten Zahl.
3. Der Hinweis erscheint, wenn keine Zielseite geöffnet wurde oder auf ausdrückliche Anforderung.
4. Die Anwendung ändert die Suche nicht selbsttätig.

---

# E7 — Zustand, Teilen, Merken

> Ohne dieses Epic brechen alle drei Journeys beim ersten Zurück-Navigieren ab.
> Konzept: Abschnitt 12.

## US-39 · Suchzustand in der URL

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-08 bis US-13 · **Konzept:** 12.1

> Als **Reisende:r** möchte ich meine Suche per Link wiederfinden und weitergeben können, ohne
> ein Konto anzulegen.

**Akzeptanzkriterien**

1. Der vollständige Suchzustand `(f, A, M, I, L, P)` ist in der URL kodiert.
2. Dieselbe URL liefert bei unverändertem Bestand dasselbe Ergebnis in derselben Reihenfolge.
3. „Zurück“ und „Vorwärts“ im Browser funktionieren erwartungsgemäß.
4. Eine URL mit unvollständigen oder ungültigen Parametern führt zu einer verständlichen Meldung
   und einem gültigen Einstieg — nicht zu einem Fehler oder einem stillen Standardwert.
5. Es wird **kein** personenbezogener Suchzustand serverseitig gespeichert.
6. Die URL bleibt kurz genug, um per Nachricht verschickt zu werden.

## US-40 · Merkliste

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-39 · **Konzept:** 12.2

> Als **Reisende:r** möchte ich Ziele vormerken, damit ich sie beim nächsten Besuch wiederfinde,
> ohne mich anzumelden.

**Akzeptanzkriterien**

1. Bis zu zehn Ziele sind vormerkbar; das Hinzufügen ist von Ergebnisliste und Zielseite aus möglich.
2. Die Liste liegt im `localStorage` des Geräts; es gibt keine serverseitige Speicherung und kein Konto.
3. Die Liste ist zusätzlich als Link kodierbar und damit auf ein anderes Gerät übertragbar.
4. Bei blockiertem `localStorage` bleibt die Anwendung voll funktionsfähig; die Merkliste ist dann
   sichtbar nicht verfügbar.
5. Der elfte Eintrag wird mit Begründung abgelehnt.

## US-41 · Vergleich und Suche teilen

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** US-34, US-39 · **Konzept:** 12.3

> Als **Paar oder Familie** möchte ich einen Vergleich als Link verschicken, damit wir gemeinsam
> entscheiden können, ohne nebeneinander am selben Gerät zu sitzen.

**Akzeptanzkriterien**

1. Die Vergleichsauswahl ist Teil der URL.
2. Ein Teilen-Element erzeugt einen Link zur aktuellen Suche bzw. zum aktuellen Vergleich.
3. Der Empfänger sieht ohne weitere Eingabe denselben Vergleich mit denselben Suchkriterien.
4. Der Link enthält keine personenbezogenen Daten über die genannten Suchkriterien hinaus.

---

# E8 — Nicht-funktionale Grundlagen

> Diese Stories sind keine Nacharbeit. Vier davon (US-42, US-43, US-44, US-47) sind nachträglich
> nur mit erheblichem Aufwand umzusetzen und gehören deshalb in die erste Iteration.
> Konzept: Abschnitt 13.

## US-42 · Auffindbare, serverseitig gerenderte Zielseiten

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** US-26 · **Konzept:** 13.2

> Als **Betreiber:in** möchte ich, dass Zielseiten über Suchmaschinen gefunden werden, weil das
> ohne Buchungsfunktion und ohne Werbebudget der einzige realistische Zugangsweg ist.

**Akzeptanzkriterien**

1. Zielseiten werden serverseitig gerendert oder statisch erzeugt; der vollständige Inhalt ist
   ohne JavaScript im ausgelieferten Dokument enthalten.
2. Je Ziel eine stabile, sprechende URL; einmal veröffentlichte URLs bleiben gültig (notfalls per
   dauerhafter Weiterleitung).
3. Je Seite eigene Titel- und Beschreibungsangaben aus den Zieldaten.
4. Strukturierte Daten je Zielseite.
5. Ergebnisansichten sind ebenfalls serverseitig darstellbar (folgt aus US-39).
6. Die Prüfung erfolgt am ausgelieferten Dokument, nicht am gerenderten Zustand im Browser.

## US-43 · Keine Übertragung an Dritte beim Seitenaufruf

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** — · **Konzept:** 13.3

> Als **Reisende:r** möchte ich die Anwendung nutzen können, ohne dass beim bloßen Aufruf meine
> IP-Adresse an Dritte fließt — und ohne Einwilligungsbanner, der mich vom Inhalt trennt.

**Akzeptanzkriterien**

1. Schriften, Bilder, Kartenmaterial und Skripte werden aus eigener Auslieferung geladen.
2. Beim Seitenaufruf geht keine Anfrage an eine fremde Domain — belegt durch eine Prüfung der
   Netzwerkanfragen einer frisch geladenen Seite.
3. Es werden keine Cookies gesetzt, die eine Einwilligung erfordern würden.
4. Die Anwendung ist ohne Einwilligungsbanner betreibbar.
5. `localStorage` wird ausschließlich für Merkliste und Anzeigeeinstellungen genutzt (US-40).

## US-44 · Barrierefreiheit nach WCAG 2.1 AA

**Priorität:** M · **Schätzung:** 8 · **Abhängigkeiten:** — · **Konzept:** 13.4

> Als **Reisende:r** mit Einschränkung möchte ich die Anwendung vollständig nutzen können — und
> als **Betreiber:in** möchte ich bei einer späteren Partneranbindung nichts nachrüsten müssen.

**Akzeptanzkriterien**

1. Jede Funktion ist per Tastatur erreichbar und bedienbar; die Fokusreihenfolge ist sinnvoll und
   der Fokus jederzeit sichtbar.
2. Kontrastverhältnisse erfüllen mindestens Stufe AA.
3. Alle informationstragenden Bilder haben Alternativtexte; dekorative Bilder sind als solche
   ausgezeichnet.
4. Formularfelder haben zugeordnete Beschriftungen; Fehlermeldungen sind textlich und werden
   assistiven Techniken angekündigt.
5. Eine Aussage wird nie allein durch Farbe transportiert — das betrifft insbesondere die
   Kennzeichnung „beste Übereinstimmung“ (US-20) und die Lockerungshinweise (US-22).
6. Die Ergebnisliste ist als Liste ausgezeichnet; die Aktualisierung nach einer Kriterienänderung
   wird angekündigt.

## US-45 · Bedienbarkeit auf schmalen Bildschirmen

**Priorität:** M · **Schätzung:** 5 · **Abhängigkeiten:** — · **Konzept:** 13.5

> Als **Reisende:r** recherchiere ich am Telefon und möchte dort keine eingeschränkte Fassung
> vorfinden.

**Akzeptanzkriterien**

1. Alle Funktionen außer dem Dreiervergleich (US-36) sind auf schmalen Bildschirmen vollständig
   nutzbar.
2. Kein waagerechtes Scrollen der Seite auf gängigen Telefonbreiten.
3. Die Kriterienzusammenfassung bleibt beim Blättern in der Ergebnisliste erreichbar.
4. Bilder werden in mehreren Auflösungen ausgeliefert und verzögert geladen.
5. Bedienelemente sind ausreichend groß für Fingerbedienung.

## US-46 · Nutzungsmessung ohne Personenbezug

**Priorität:** S · **Schätzung:** 5 · **Abhängigkeiten:** US-39, US-43 · **Konzept:** 13.3, 14.2

> Als **Betreiber:in** möchte ich die Kennzahlen aus Konzept 14.2 messen können, ohne
> personenbezogene Daten zu erheben.

**Akzeptanzkriterien**

1. Erhoben werden die sechs Kennzahlen aus Konzept 14.2.
2. Keine geräteübergreifende Wiedererkennung, keine dauerhafte Kennung, keine IP-Speicherung.
3. Die Messung funktioniert ohne Einwilligungsbanner (folgt aus US-43).
4. Suchkriterien werden nur aggregiert ausgewertet, nie einzelfallbezogen gespeichert.
5. Die Leerergebnisquote ist nach Monat und Interessenkombination auswertbar, damit sich
   Bestandslücken lokalisieren lassen (Konzept 7.1).

## US-47 · Sprachneutrales Datenmodell

**Priorität:** S · **Schätzung:** 3 · **Abhängigkeiten:** US-01 · **Konzept:** 13.6

> Als **Betreiber:in** möchte ich, dass eine spätere Sprachversion eine Übersetzungsaufgabe ist
> und keine Datenmigration.

**Akzeptanzkriterien**

1. Das Modell trennt sprachneutrale Felder (alle Zahlenwerte, Zuordnungen, Bilder, Geodaten,
   Lizenzangaben) von sprachgebundenen Texten.
2. Sprachgebundene Texte sind je Sprache ablegbar, auch wenn zunächst nur Deutsch gepflegt wird.
3. Keine Anzeigezeichenkette ist fest im Programmcode verdrahtet.
4. Datums-, Zahlen- und Temperaturformate sind zentral konfiguriert.

---

# Anhang A — Empfohlene Umsetzungsreihenfolge

Die Reihenfolge folgt der Abhängigkeitsstruktur, nicht dem sichtbaren Fortschritt. Wer mit der
Oberfläche beginnt, baut sie zweimal.

| Iteration | Inhalt | Ergebnis |
|---|---|---|
| **1 — Fundament** | US-01, US-02, US-03, US-04, US-05, US-42, US-43, US-44, US-47 | Fünf gepflegte Beispielziele, auffindbar, barrierefrei, datensparsam |
| **2 — Suchen und Finden** | US-08 bis US-11, US-14, US-17 bis US-21, US-39 | Erster durchgängiger Weg von der Eingabe zum begründeten Ergebnis |
| **3 — Verstehen** | US-26 bis US-32, US-37, US-45 | Zielseite vollständig, Entscheidung begründbar |
| **4 — Robustheit** | US-22, US-23, US-24, US-25, US-38 | Die Anwendung bricht bei enger oder unpassender Suche nicht ab |
| **5 — Vergleichen und Teilen** | US-06, US-33, US-34, US-35, US-36, US-40, US-41 | Gemeinsame Entscheidung möglich |
| **6 — Vervollständigen** | US-07, US-12, US-13, US-15, US-16, US-46 | Bestand auf 45 Ziele, Filter und Einstiege vollständig, Messung aktiv |

**Der kritische Pfad ist Iteration 1**, und zwar nicht wegen der Software: Die Redaktion von
45 Zielen (Konzept 7.1) läuft parallel zu allen Iterationen und bestimmt den Starttermin. Fünf
Beispielziele reichen für die Entwicklung, nicht für den Betrieb.

# Anhang B — Rückverfolgbarkeit Konzept → Stories

| Konzeptabschnitt | Stories |
|---|---|
| 3 Zielgruppen, Kinderaltersgruppen | US-09, US-30 |
| 4.1 Sucheingabe | US-08 bis US-13 |
| 4.1.1 Reisezeit auf Monate | US-10, US-16 |
| 4.2.2 Ausschlussfilter | US-17 |
| 4.2.3 Passungszahl | US-18 |
| 4.2.4 Gleichstandskaskade | US-19 |
| 4.2.5 Lockerungsstufen | US-22, US-23 |
| 4.2.6 Ergebniskarte | US-20, US-21 |
| 4.3 Zielseite | US-26 bis US-33 |
| 4.4 Entscheidung absichern | US-37 |
| 5 Vergleichsansicht | US-34, US-35, US-36 |
| 5 Startseite, Themen-Einstiege | US-15, US-16 |
| 6.1 Zielebene | US-01 |
| 6.4 Ordinales Charakterprofil | US-03, US-35 |
| 6.5 / 7.2 Klima | US-02, US-28 |
| 6.7 Zielgruppen-Eignung | US-01, US-29, US-30 |
| 6.8 Alternativen | US-06, US-33 |
| 7.1 Bestandsumfang | Anhang A, US-46 (Messung der Lücken) |
| 7.3 Bildrechte | US-04 |
| 7.4 Redaktionsprozess | US-05 |
| 11.1 Kein Treffer | US-22, US-23 |
| 11.2 Wunschland ohne Bestand | US-24 |
| 11.3 Keine Entscheidung | US-38, US-40, US-41 |
| 11.4 Überbestimmte Suche | US-25 |
| 12 Zustand und Teilen | US-39, US-40, US-41 |
| 13.2 SEO | US-42, US-32 |
| 13.3 Datenschutz | US-43, US-46 |
| 13.4 Barrierefreiheit | US-44 |
| 13.5 Endgeräte | US-45, US-36 |
| 13.6 Sprache | US-47 |
| 14.2 Kennzahlen | US-46 |

Jeder Konzeptabschnitt mit Umsetzungsbezug ist durch mindestens eine Story abgedeckt.

# Anhang C — Offene Punkte

Diese Punkte sind bewusst nicht als Story formuliert, weil sie eine fachliche Entscheidung
voraussetzen. Sie blockieren die erste Iteration nicht, müssen aber vor der genannten Iteration
beantwortet sein.

**Entschieden am 29.09.2026:**

| Nr. | Offener Punkt | Benötigt vor | Entscheidung |
|---|---|---|---|
| O1 | Auswahl der konkreten Klimadatenquelle (Anforderungen in Konzept 7.2) | Iteration 1, US-02 | Copernicus/E-OBS-Gitterdatensatz (Klimanormalperiode 1991–2020, europaweit, freie Weitergabe); Interpolation auf Zielkoordinaten als einmaliger Entwicklungsschritt |
| O2 | Abschließende Liste zulässiger Bildlizenzen | Iteration 1, US-04 | Ausschließlich `UNSPLASH` (Unsplash License) als zulässiger Lizenztyp |
| O3 | Festlegung der 45 Ziele, insbesondere der ≥ 12 winterfähigen | Iteration 6 | Redaktion clustert Ziele entlang der drei Journeys (Single/Paar/Familie), Winterquote (≥ 12) und Städtequote (≥ 12) laufend gegen eine Steuerungstabelle „Ziel → Cluster → winterfähig? → Typ“ geprüft |
| O4 | Bestätigung der Gewichte 0,50 / 0,30 / 0,20 als Startwerte | Iteration 2, US-18 | Gewichte wie im Konzept übernommen, keine vorherige Nutzerkalibrierung; Überprüfung erst nach Betriebsstart über die Kennzahl aus Konzept 14.3 |
| O5 | Geschäftsmodell nach der ersten Ausbaustufe (Konzept 14.4) | Iteration 1, US-01 | Erweiterte Erfassung ab US-01: Ortskennung, Geokoordinaten **und** IATA-Code des nächstgelegenen Flughafens je Ziel |
| O6 | Rechtliche Neubewertung des BFSG-Anwendungsbereichs bei Partneranbindung (Konzept 13.4) | vor Partneranbindung | Rechtliche Prüfung erst unmittelbar vor tatsächlicher Partneranbindung beauftragen; bis dahin gilt die WCAG-2.1-AA-Umsetzung (US-44) als Selbstverpflichtung unverändert |
