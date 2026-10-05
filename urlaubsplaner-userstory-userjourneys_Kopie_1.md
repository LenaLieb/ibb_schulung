# Konzept: Urlaubsplaner für europäische Reiseziele

> **Fassung 2 (28.09.2026).** Diese Fassung korrigiert die in der Erstfassung enthaltenen
> Widersprüche und schließt die Spezifikationslücken, die eine Umsetzung blockiert hätten.
> Alle Änderungen sind in Abschnitt 15 protokolliert. Die Erstfassung liegt als
> `urlaubsplaner-userstory-userjourneys.BACKUP-2026-09-28.md` daneben.
> Die aus diesem Konzept abgeleiteten User Stories stehen in
> `urlaubsplaner-user-stories.md`.

## 1. Ausgangspunkt und Produktidee

Viele Menschen wissen, **wann** sie verreisen möchten, aber noch nicht, **welches Reiseziel** zu ihren Vorstellungen passt. Klassische Buchungsseiten setzen meist voraus, dass Land, Hotel oder Flugziel bereits feststehen. Der Urlaubsplaner setzt davor an: Er unterstützt bei der eigentlichen Reiseentscheidung.

Die Anwendung richtet sich zunächst an deutschsprachige Reisende in Deutschland. Sie schlägt kuratierte europäische Reiseziele vor und erklärt nachvollziehbar, warum ein Ziel zum gewünschten Reisemonat, zur Reiseform und zu den Interessen passt.

Die Anwendung ist bewusst **kein Buchungsportal**. Sie zeigt keine Preise, Verfügbarkeiten oder Hotelangebote und führt in der ersten Ausbaustufe nicht zu Buchungspartnern. Ihr Ergebnis ist eine belastbare persönliche Vorauswahl von Reisezielen.

Sie zeigt allerdings ein **relatives Preisniveau** (€ / €€ / €€€) je Ziel. Das ist keine Preisangabe und keine Buchungsinformation, sondern ein Vergleichsmerkmal, ohne das eine Vorauswahl zwischen Zielen wie Mallorca, der kroatischen Küste und der dänischen Nordseeküste unvollständig bliebe.

### Leitfrage des Produkts

> Wohin kann ich reisen, damit mein Urlaub im gewünschten Zeitraum so wird, wie ich ihn mir vorstelle?

### Abgrenzung der ersten Ausbaustufe

Nicht Bestandteil: Buchung, Preise in Währungsbeträgen, Verfügbarkeiten, Live-Wetter, Nutzerkonten, Bewertungen, nutzergenerierte Inhalte, andere Sprachen als Deutsch, Ziele außerhalb Europas.

## 2. Produktziel und Nutzerwert

Der Urlaubsplaner führt Nutzende in einem klaren Ablauf von einer noch vagen Urlaubsidee zu einer überschaubaren, begründeten Auswahl von Reisezielen. Die Ergebnisliste umfasst höchstens zwölf Ziele; die drei höchstbewerteten sind als **beste Übereinstimmung** hervorgehoben.

Am Ende sollen sie nicht nur ein Land oder eine Stadt kennen, sondern beantworten können:

- Warum passt dieses Ziel zu meiner Reiseform?
- Wie ist das typische Klima in meinem Reisemonat?
- Was kann ich dort während meines Urlaubs unternehmen?
- Welche Orte und Sehenswürdigkeiten sind relevant?
- Eignet sich das Ziel eher für Erholung, Aktivität, Kultur, Strand oder eine Kombination daraus?
- Wie ordnet sich das Ziel preislich gegenüber vergleichbaren Zielen ein?
- Welche Alternativen sind ähnlich, falls mir das erste Ziel nicht zusagt?

## 3. Zielgruppen und Entscheidungssituationen

Die drei Reiseformen sind kein reines Profilmerkmal. Sie gehen als gewichteter Faktor in die Rangfolge ein (Abschnitt 4.2.3) und bestimmen, welche Informationen auf der Zielseite zuerst stehen.

### Single-Reise

Eine Person reist allein und möchte ein Ziel, das ohne feste Begleitung abwechslungsreich und unkompliziert erlebbar ist. Relevant sind die Atmosphäre des Ortes, eigenständige Aktivitäten, gute Orientierung und ein sinnvoller Mix aus Entspannung und Unternehmungen.

### Paarreise

Zwei Personen planen einen gemeinsamen Urlaub. Entscheidend ist vor allem der gewünschte gemeinsame Charakter: romantisch, ruhig, genussorientiert, aktiv, kulturell oder strandnah. Das Ziel muss eine passende Mischung aus gemeinsamen Erlebnissen und freier Zeit bieten.

### Familienreise

Eine Familie sucht ein Ziel, das Erwachsenen und Kindern gleichermaßen etwas bietet. Bei der Auswahl sind verlässliche Informationen zu Saison, Klima, Strand- oder Naturangeboten, Ausflugsmöglichkeiten und dem allgemeinen Charakter der Region entscheidend.

**Das Alter der Kinder ist dabei kein Nebendetail, sondern das wichtigste Einzelkriterium.** Ein Ziel, das für eine Familie mit Kleinkind ideal ist, kann für eine Familie mit Jugendlichen ungeeignet sein und umgekehrt. Die Anwendung erfasst deshalb bei der Reiseform Familie die vorhandenen Altersgruppen:

| Altersgruppe | Kürzel | Typische Anforderung |
|---|---|---|
| 0–5 Jahre | `A0_5` | kurze Wege, flach abfallende Strände, Schatten, ruhiges Tempo |
| 6–11 Jahre | `A6_11` | Aktivität, Entdecken, Tiere/Natur, Badebetrieb |
| 12+ Jahre | `A12P` | Eigenständigkeit, Sport, Stadt, Gleichaltrige, Abwechslung |

Mehrere Altersgruppen sind gleichzeitig wählbar; die Anwendung bewertet dann gegen die **anspruchsvollste** (siehe 4.2.3).

## 4. Konzeptioneller Ablauf der Anwendung

Die Anwendung arbeitet in vier aufeinanderfolgenden Phasen. Jede Phase reduziert Unsicherheit und bereitet die nächste Entscheidung vor.

### 4.1 Phase 1: Urlaubsvorstellung erfassen

Der Einstieg ist keine leere Volltextsuche, sondern eine geführte Frage: **„Wie soll dein Urlaub aussehen?“**

Die Person gibt nur die Kriterien an, die für eine sinnvolle erste Empfehlung erforderlich sind:

1. **Reiseform** (Pflicht): Single, Paar oder Familie.
2. **Kinderaltersgruppen** (Pflicht, nur bei Reiseform Familie): eine oder mehrere aus `A0_5`, `A6_11`, `A12P`.
3. **Reisezeit** (Pflicht): ein Monat, mehrere Monate oder ein Zeitraum. Jede Eingabe wird intern auf eine **Monatsmenge** `M ⊆ {1,…,12}` abgebildet (siehe 4.1.1).
4. **Urlaubsinteressen** (Pflicht, mindestens eines): Strand, Stadt, Natur, Kultur, Aktivurlaub, Erholung, Kulinarik oder Ausflüge; mehrere Interessen sind möglich.
5. **Optionales Wunschland** (optional, mehrfach): schränkt die Ergebnisse auf die gewählten Länder ein.
6. **Optionales Preisniveau** (optional, mehrfach): €, €€ oder €€€.

Die Eingaben werden sichtbar zusammengefasst. Dadurch kann die Person erkennen und ändern, auf welcher Grundlage die Vorschläge entstehen.

#### 4.1.1 Abbildung der Reisezeit auf Monate

Die Eingabe der Reisezeit ist auf drei Wegen möglich; alle drei erzeugen dieselbe interne Struktur, eine Monatsmenge `M`:

| Eingabeart | Beispiel | Ergebnis |
|---|---|---|
| Einzelmonat | „September“ | `M = {9}` |
| Monatsauswahl | „Juli oder August“ | `M = {7, 8}` |
| Datumsspanne | 20.07.–10.08. | `M = {7, 8}` — jeder Monat, den die Spanne mit mindestens 7 Tagen berührt |

**Schulferien:** Die Startseite bietet Ferien-Einstiege („Sommerferien“, „Herbstferien“). Weil die Ferientermine in Deutschland je Bundesland abweichen, verlangt ein Ferien-Einstieg zwingend die Auswahl eines Bundeslands und wird daraus in eine Datumsspanne und damit in `M` übersetzt. Ohne Bundesland wird der Einstieg nicht angeboten. Ein Ferienkalender je Bundesland und Schuljahr ist Bestandteil der zu pflegenden Stammdaten.

### 4.2 Phase 2: Passende Ziele vorschlagen

Die Anwendung durchsucht kein unstrukturiertes Verzeichnis, sondern einen redaktionell gepflegten Bestand ausgewählter Reiseziele (Abschnitt 6).

Das Verfahren ist zweistufig und vollständig deterministisch: erst ein **Ausschlussfilter**, dann eine **Rangfolge über eine berechnete Passungszahl**. Gleiche Eingaben führen immer zur gleichen Reihenfolge.

#### 4.2.1 Notation

Für ein Ziel `d` und die Nutzereingabe gilt:

- `saison_d(m) ∈ {0, 1, 2}` — Eignung des Ziels im Monat `m`: 0 = ungeeignet, 1 = eingeschränkt geeignet, 2 = beste Reisezeit
- `interesse_d(i) ∈ {0, 1, 2}` — Ausprägung des Interesses `i` am Ziel: 0 = nicht vorhanden, 1 = vorhanden, 2 = prägend
- `form_d(f) ∈ {0, 1, 2}` — Eignung für die Reiseform `f`: 0 = ungeeignet, 1 = geeignet, 2 = besonders geeignet
- `kind_d(a) ∈ {0, 1, 2}` — Eignung für die Kinderaltersgruppe `a`, analoge Skala
- `land_d`, `preis_d ∈ {€, €€, €€€}`

Die Nutzereingabe ist `(f, A, M, I, L, P)` mit Reiseform `f`, Altersgruppen `A`, Monatsmenge `M`, Interessen `I`, Wunschländern `L`, Preisniveaus `P`.

#### 4.2.2 Ausschlussfilter

Ein Ziel `d` gelangt nur dann in die Ergebnismenge, wenn **alle** folgenden Bedingungen erfüllt sind:

1. `max_{m ∈ M} saison_d(m) ≥ 1` — das Ziel ist in mindestens einem gewünschten Monat wenigstens eingeschränkt geeignet
2. `∃ i ∈ I : interesse_d(i) ≥ 1` — mindestens ein gewünschtes Interesse wird bedient
3. `form_d(f) ≥ 1` — das Ziel ist für die Reiseform nicht ungeeignet
4. `L = ∅ ∨ land_d ∈ L`
5. `P = ∅ ∨ preis_d ∈ P`
6. `f ≠ Familie ∨ min_{a ∈ A} kind_d(a) ≥ 1` — bei Familien muss das Ziel für **jede** angegebene Altersgruppe wenigstens geeignet sein

#### 4.2.3 Passungszahl

Für jedes verbliebene Ziel wird berechnet:

```
S(d) = 0,50 · S_I(d) + 0,30 · S_S(d) + 0,20 · S_F(d)        S(d) ∈ [0, 1]

S_I(d) = ( Σ_{i ∈ I} interesse_d(i) ) / ( 2 · |I| )          Interessen-Deckung
S_S(d) = ( max_{m ∈ M} saison_d(m) ) / 2                     Saison-Passung
S_F(d) = form_d(f) / 2                                       Reiseform-Eignung
         bzw. bei f = Familie:
S_F(d) = ( form_d(Familie) + min_{a ∈ A} kind_d(a) ) / 4
```

Die Gewichte 0,50 / 0,30 / 0,20 sind eine Setzung, kein Naturgesetz. Sie sind als Konfiguration zu halten und anhand der in Abschnitt 14 definierten Kennzahlen zu überprüfen.

Der Term `min_{a ∈ A}` bei Familien bedeutet: Das Ziel wird gegen die am schlechtesten bediente Altersgruppe bewertet. Eine Familie mit Kleinkind **und** Jugendlichem bekommt nur Ziele weit oben, die für beide taugen.

#### 4.2.4 Rangfolge und Gleichstände

Sortiert wird absteigend nach `S(d)`. Bei `|S(d₁) − S(d₂)| < 0,01` gilt folgende Kaskade, bis eine Entscheidung fällt:

1. höhere Anzahl **prägender** Interessen, also `|{ i ∈ I : interesse_d(i) = 2 }|`
2. höheres `S_S(d)`
3. höhere redaktionelle Priorität `prio_d ∈ {1,…,5}` (gepflegtes Stammdatum)
4. alphabetisch aufsteigend nach Zielname

Kriterium 4 ist der garantierte Abschluss: Die Rangfolge ist damit **total und deterministisch**. Eine zufällige oder einfügereihenfolgeabhängige Sortierung ist ausgeschlossen.

#### 4.2.5 Zu wenige Treffer

Eine leere oder sehr kurze Ergebnisliste ist ein realer und häufiger Fall (etwa Strand im Januar). Die Anwendung liefert dann nie eine kommentarlos leere Seite, sondern durchläuft gestufte, **stets sichtbar benannte** Lockerungen:

| Stufe | Bedingung | Maßnahme | Kennzeichnung im Ergebnis |
|---|---|---|---|
| 0 | ≥ 3 Treffer | keine | — |
| 1 | < 3 Treffer | Filter 2 (Interessen) entfällt; Ziele ohne Interessen-Match werden ergänzt | „Erfüllt dein Wunschthema nicht, passt aber zur Reisezeit“ |
| 2 | < 3 Treffer | `M` wird um je einen angrenzenden Monat erweitert | „Im Oktober statt im September gut geeignet“ |
| 3 | 0 Treffer | keine Lockerung mehr; stattdessen Diagnose | Benennung der blockierenden Bedingung und je ein konkreter Änderungsvorschlag |

Der Saison-Filter (Bedingung 1) wird **nie** aufgehoben. Ein Ziel in einem ungeeigneten Monat zu empfehlen, widerspricht dem Produktziel.

#### 4.2.6 Ergebniskarte

Jede Ergebnis-Karte beantwortet drei Fragen:

- **Was ist das Ziel?** Name, Region, Land und ein frei nutzbares echtes Bild.
- **Warum passt es?** Ein aus den tatsächlich erfüllten Kriterien **generierter** Satz, zum Beispiel: „Passt zu deinem Wunsch nach Stadt, Strand und Kultur im September.“ Genannt werden ausschließlich Kriterien mit `interesse_d(i) ≥ 1` bzw. eine Saisonaussage aus `saison_d`; der Satz kann niemals etwas behaupten, das die Daten nicht hergeben.
- **Was erwartet mich?** Die bis zu drei prägenden Interessen (`interesse_d(i) = 2`) sowie das Preisniveau.

Die Person kann anschließend die Auswahl verändern, statt einen neuen Suchvorgang beginnen zu müssen; die Ergebnisliste aktualisiert sich dabei ohne Verlust des übrigen Zustands (Abschnitt 12).

### 4.3 Phase 3: Ziele verstehen und vergleichen

Ein Ziel wird erst dann hilfreich, wenn seine Eignung nachvollziehbar wird. Deshalb führt jede Ergebnis-Karte auf eine vollständige Zielseite.

Auf der Zielseite werden alle Informationen in derselben Reihenfolge präsentiert:

1. **Kurzprofil:** Was macht das Reiseziel aus und welche Urlaubsart prägt es?
2. **Warum es zur aktuellen Suche passt:** Bezug auf Reiseform, Reisemonat und ausgewählte Interessen.
3. **Charakterprofil:** die vier ordinalen Profilwerte (Abschnitt 6.4) als vergleichbare Einordnung.
4. **Klima und Reisezeit:** Typische Temperaturspanne, Sonnen- bzw. Regentendenz und Einordnung des ausgewählten Monats. Dies sind Klimadaten, kein Live-Wetter.
5. **Sehenswürdigkeiten und Orte:** Die wichtigsten kulturellen oder landschaftlichen Anlaufpunkte.
6. **Aktivitäten:** Konkrete Möglichkeiten für Strand, Natur, Stadt, Kultur, Erholung, Aktivurlaub, Kulinarik oder Ausflüge.
7. **Eignung nach Reiseform:** Getrennte Hinweise für Single, Paar und Familie; die aktuell gewählte Reiseform steht zuerst. Der Familien-Abschnitt ist nach den drei Altersgruppen gegliedert.
8. **Preisniveau:** Einordnung mit einem Satz zur Begründung, ohne Beträge.
9. **Passende Reisedauer:** Eine orientierende Empfehlung, etwa langes Wochenende, eine Woche oder zwei Wochen.
10. **Ähnliche Ziele:** Zwei bis drei Alternativen mit anderer Ausprägung, jeweils mit benanntem Unterschied.

Ein Vergleichsmodus erlaubt, zwei bis drei Ziele nebeneinander anhand derselben Kriterien zu betrachten (Abschnitt 5, Vergleichsansicht).

### 4.4 Phase 4: Entscheidung absichern

Die Anwendung trifft keine Entscheidung anstelle der Person. Sie fasst nach dem Lesen einer Zielseite aber klar zusammen, für welchen Urlaub das Ziel geeignet ist und wann eine Alternative sinnvoller sein kann.

Beispiel: „Mallorca eignet sich besonders für Familien, die Badeurlaub mit kurzen Ausflügen verbinden möchten. Wenn ruhige Natur im Vordergrund steht, ist die kroatische Kvarner-Bucht eine passende Alternative.“

Das Ergebnis ist eine persönliche, begründete Vorauswahl. Von dort kann die Person die weitere Reiseplanung außerhalb der Anwendung fortsetzen.

**Der Abbruch ist ein gleichwertiger Ausgang.** Wenn sich die Person für kein Ziel entscheidet, bietet die Anwendung an, die Suche als Link zu sichern (Abschnitt 12), und benennt, welche Eingabe die Auswahl am stärksten einschränkt.

## 5. Informationsarchitektur

### Startseite

Die Startseite vermittelt Inspiration und startet den geführten Auswahlprozess. Sie enthält keine überladenen Listen, sondern:

- eine klare Einstiegsfrage,
- die Auswahl von Reiseform, Zeitraum und Interessen,
- ausgewählte Themen-Einstiege wie „Strand im Frühjahr“, „Städtereise zu zweit“ oder „Familienurlaub in den Sommerferien“ — jeder Themen-Einstieg ist eine vollständig vorbelegte Suche und führt direkt in die Ergebnisansicht,
- eine kleine Auswahl beliebter Ziele als visuelle Orientierung.

### Such- und Auswahlansicht

Die Suchansicht zeigt alle gesetzten Kriterien dauerhaft am oberen Rand. Die Person kann dort einzelne Werte ändern oder entfernen. Darunter stehen die passenden Reiseziele als Ergebnis-Karten, inklusive Begründung für die jeweilige Empfehlung.

Bei aktiver Lockerung (Abschnitt 4.2.5) steht oberhalb der Liste ein Hinweis, welche Bedingung gelockert wurde und wie sie sich zurücknehmen lässt.

### Zielseite

Die Zielseite ist die zentrale Entscheidungshilfe. Sie beginnt mit einem emotionalen Bild und einer kurzen Einordnung, führt danach aber in klaren Informationsblöcken durch Klima, Aktivitäten und Eignung. Inhalte müssen konkret sein: Nicht „Mallorca hat viel zu bieten“, sondern beispielsweise welche Landschaften, Orte, Strände und Ausflugsarten für die jeweilige Reiseform relevant sind.

Die Zielseite ist auch ohne vorangegangene Suche vollständig lesbar und unter einer stabilen, sprechenden URL erreichbar (Abschnitt 13, SEO). Block 2 („Warum es zur aktuellen Suche passt“) entfällt dann.

### Vergleichsansicht

Die Vergleichsansicht unterstützt dann, wenn eine Person zwischen konkreten Zielen schwankt. Sie stellt keine unübersichtliche Datentabelle dar, sondern beantwortet pro Kriterium direkt die Entscheidungsfrage.

Die wertenden Aussagen („wärmer“, „ruhiger“, „kulturreicher“) werden **berechnet**, nicht redaktionell getextet, und zwar aus den ordinalen Profilwerten (Abschnitt 6.4) und den Klimadaten:

- Klima: Vergleich der mittleren Tageshöchsttemperatur im ersten gewählten Monat; Aussage ab einer Differenz von 2 °C, sonst „vergleichbar warm“.
- Trubel, Kultur-Dichte, Strand-Anteil, Natur-Anteil: Aussage nur ab einer Differenz von **mindestens 2 Skalenpunkten**, sonst „vergleichbar“.
- Preisniveau: Aussage ab einer Stufe Unterschied.

Diese Schwelle ist bewusst konservativ. Sie verhindert, dass aus einer redaktionellen Ermessensentscheidung (3 statt 4) eine scheinbar harte Aussage wird.

Verglichen werden können zwei oder drei Ziele. Auch Ziele unterschiedlicher Typen sind vergleichbar, weil alle Ziele auf derselben Granularitätsebene liegen (Abschnitt 6.1).

## 6. Inhaltliches Modell eines Reiseziels

Damit Empfehlungen konsistent und glaubwürdig sind, wird jedes Reiseziel redaktionell nach derselben Struktur gepflegt.

### 6.1 Granularität: genau eine Zielebene

Ein **Reiseziel (Destination)** ist eine Einheit, die sich als ein einziger Urlaub erleben lässt und für die einheitliche Klima-, Charakter- und Eignungsaussagen möglich sind. Zulässig sind genau vier Typen:

| Typ | Beispiele |
|---|---|
| `STADT` | Lissabon, Barcelona, Wien, Kopenhagen |
| `INSEL` | Mallorca, Kreta, Rhodos |
| `KUESTENREGION` | Algarve, Costa del Sol, Kvarner-Bucht, Dänische Nordseeküste |
| `SEENREGION` | Gardasee, Salzkammergut |

**Länder sind keine Reiseziele.** Ein Land ist ausschließlich ein Attribut (`land_d`) und ein Filterwert. Die Erstfassung führte „Dänemark“ als Ergebnis neben „Lissabon“ — das ist ausgeschlossen, weil Klimadaten, Reisedauer-Empfehlung und Charakterprofil eines ganzen Landes keine belastbare Aussage ergeben und ein Vergleich „Dänemark gegen Lissabon“ nicht beantwortbar ist.

Ein Ziel ist nur dann aufnahmefähig, wenn sich für alle zwölf Monate eine einheitliche Klimaaussage treffen lässt. Ist ein Gebiet dafür zu groß oder zu heterogen, wird es in mehrere Ziele zerlegt.

### 6.2 Grunddaten

- Eindeutige ID, Zielname, Typ (siehe 6.1), Region und Land
- Eindeutige Kurzbeschreibung (max. 200 Zeichen)
- Frei nutzbares echtes Bild mit vollständigem Lizenznachweis (siehe 7.3)
- Redaktionelle Priorität `prio_d ∈ {1,…,5}` als letzter Gleichstandsbrecher
- Preisniveau `preis_d ∈ {€, €€, €€€}` mit einem Satz Begründung

### 6.3 Reisecharakter

Einordnung, etwa Stadturlaub, Badeurlaub, Natururlaub, Kulturreise oder Kombination. Das Ziel erhält eine konkrete Beschreibung seines Charakters, damit es nicht mit ähnlichen Zielen verwechselt wird.

### 6.4 Ordinales Charakterprofil

Vier Werte auf einer Skala von 1 bis 5. Sie sind die Grundlage der Vergleichsansicht und machen Aussagen wie „ruhiger“ überhaupt erst möglich:

| Attribut | 1 bedeutet | 5 bedeutet |
|---|---|---|
| `trubel` | sehr ruhig, kaum touristische Betriebsamkeit | durchgehend lebhaft, Nachtleben, hohe Dichte |
| `kultur_dichte` | wenige Kulturangebote | dichtes Angebot an Museen, Bauwerken, Veranstaltungen |
| `strand_anteil` | kein nennenswerter Badebetrieb | Strand prägt den Aufenthalt |
| `natur_anteil` | überwiegend bebaut | Landschaft prägt den Aufenthalt |

Für jeden vergebenen Wert ist ein **Ankerbeispiel** zu hinterlegen (welches bereits gepflegte Ziel steht für denselben Wert). Ohne diesen Anker sind die Skalen zwischen verschiedenen Redakteuren nicht kalibrierbar und damit wertlos.

### 6.5 Saison und Klima

Je Monat: `saison_d(m) ∈ {0,1,2}`, mittlere Tageshöchst- und Tagestiefsttemperatur, Niederschlagstendenz und Sonnenstundentendenz. Die Daten werden als saisonale Orientierung und nicht als Wetterprognose dargestellt.

Die Temperatur- und Niederschlagswerte werden **nicht redaktionell geschätzt**, sondern aus einer benannten Klimaquelle mit Angabe der Referenzperiode übernommen (Abschnitt 7.2). Der Wert `saison_d(m)` ist dagegen eine redaktionelle Bewertung, weil er mehr als nur Temperatur einbezieht (Hochsaison, Schließzeiten, Wind, Quallen, Hitze).

### 6.6 Interessen, Sehenswürdigkeiten und Aktivitäten

Zuordnung `interesse_d(i) ∈ {0,1,2}` für **alle acht** Interessen: Strand, Stadt, Natur, Kultur, Aktivurlaub, Erholung, Kulinarik, Ausflüge. Der Wert 2 („prägend“) darf je Ziel höchstens dreimal vergeben werden — sonst verliert die Ergebniskarte ihre Aussagekraft.

Zusätzlich eine kuratierte Auswahl wichtiger Orte, Bauwerke, Landschaften oder Museen sowie passende Aktivitäten. Allgemeine Aussagen wie „Es gibt viel zu erleben“ reichen nicht aus.

### 6.7 Zielgruppen-Eignung

- `form_d(f) ∈ {0,1,2}` je Reiseform, jeweils mit begründendem Text
- `kind_d(a) ∈ {0,1,2}` je Altersgruppe `A0_5`, `A6_11`, `A12P`, jeweils mit begründendem Text

Die Begründung ist Pflicht: Eine Eignung, die nur als Zahl oder Symbol vorliegt, erfüllt die Qualitätsanforderung aus Abschnitt 13 nicht.

### 6.8 Alternativen

Zwei bis drei ähnliche Reiseziele. Für jede Alternative ist der **konkrete Unterschied** zu beschreiben. Formal gilt:

- Die Relation ist **gerichtet** und muss nicht symmetrisch sein.
- Eine Alternative muss sich in mindestens einem ordinalen Profilwert (6.4) um mindestens 2 Punkte unterscheiden **oder** ein anderes prägendes Interesse haben. Damit ist ausgeschlossen, dass zwei nahezu identische Ziele wechselseitig als Alternative geführt werden.
- Alternativen werden gegen die aktuelle Suche gefiltert: Ein Ziel, das den Saisonfilter der laufenden Suche nicht besteht, wird als Alternative mit entsprechendem Hinweis gekennzeichnet.

## 7. Bestandsumfang, Redaktionsprozess und Datenherkunft

Der Inhalt ist der Engpass dieses Produkts, nicht die Software. Dieser Abschnitt ist deshalb Teil der Spezifikation und nicht optional.

### 7.1 Umfang

| Kenngröße | Wert für die erste Ausbaustufe |
|---|---|
| Ziele gesamt | **45** |
| davon mit `saison_d(m) ≥ 1` für mindestens einen Monat aus Nov–Mär | **mindestens 12** |
| davon Typ `STADT` | mindestens 12 |
| Aufwand je Ziel | 1.500–2.500 Wörter redaktioneller Text plus 12 Monatsdatensätze plus 4 Profilwerte plus 9 Eignungswerte |

Die Untergrenze von 12 winterfähigen Zielen ist keine Schätzung, sondern eine Ableitung: Ohne sie liefert der Filter für das gesamte Winterhalbjahr regelmäßig Stufe-2- oder Stufe-3-Ergebnisse (Abschnitt 4.2.5), und die Anwendung ist für die Hälfte des Jahres praktisch unbrauchbar. Der Länderfokus der Erstfassung (überwiegend Mittelmeer) ist entsprechend um Ziele in Österreich, Dänemark, den Niederlanden und auf den Kanaren zu ergänzen.

### 7.2 Herkunft der Klimadaten

Temperatur- und Niederschlagswerte werden aus **einer** benannten Quelle importiert, nicht von Hand erfasst. Anforderungen an die Quelle:

- flächendeckend für Europa,
- monatliche Mittelwerte einer ausgewiesenen Klimanormalperiode (Stand der Technik: 1991–2020),
- Lizenz erlaubt die Nutzung und Weitergabe im Produkt,
- Referenzperiode und Quelle werden auf der Zielseite genannt.

Handerfassung von 45 × 12 Klimadatensätzen ist ausgeschlossen: Der Aufwand ist hoch, das Ergebnis nicht reproduzierbar und die Fehlerquote bei einem faktischen Datum nicht vertretbar.

### 7.3 Bildrechte

„Frei nutzbar“ ist als Kriterium nicht prüfbar und wird ersetzt durch eine abschließende Liste zulässiger Lizenzen. Je Bild werden verpflichtend erfasst: Quelle/URL, Urheber, Lizenztyp, Datum der Prüfung, prüfende Person, Angabe ob Zuschnitt zulässig ist.

Zulässig sind ausschließlich Lizenzen, die kommerzielle Nutzung und Bearbeitung erlauben. Der erforderliche Urheber- und Lizenzhinweis erscheint sichtbar an der Zielseite, nicht ausschließlich in einem Impressum. Ein Bild ohne vollständigen Lizenzdatensatz darf nicht veröffentlicht werden — das ist eine harte Veröffentlichungsbedingung, kein Qualitätsziel.

### 7.4 Prozess

Jedes Ziel durchläuft: Entwurf → fachliche Prüfung (Vollständigkeit aller Pflichtfelder, Kalibrierung der Profilwerte gegen die Ankerbeispiele) → Bild- und Lizenzprüfung → Freigabe. Nur freigegebene Ziele sind in der Ergebnismenge sichtbar.

Klima- und Ferienstammdaten werden jährlich überprüft, redaktionelle Texte mindestens alle zwei Jahre. Jedes Ziel trägt ein Datum der letzten Prüfung.

## 8. Vollständige User Journey: Single-Urlaub

### Ausgangssituation

Eine Person möchte im September für eine Woche allein verreisen. Sie will nicht ausschließlich am Strand liegen, sondern Stadt, Kultur und Ausflüge miteinander verbinden. Ein konkretes Ziel ist noch nicht festgelegt.

### 1. Einstieg und Orientierung

Die Person öffnet die Startseite. Sie sieht die Frage „Wie soll dein Urlaub aussehen?“ und erkennt sofort, dass die Anwendung keine Hotels verkaufen, sondern eine Reiseidee entwickeln soll.

Sie wählt **Single**, **September** (`M = {9}`) und die Interessen **Stadt**, **Strand** und **Kultur** (`I = {stadt, strand, kultur}`).

### 2. Vorschläge erhalten

Die Ergebnisansicht zeigt zum Beispiel Barcelona, Lissabon, Valencia, Split, Palma und Kreta. Die drei höchstbewerteten sind als beste Übereinstimmung markiert.

Die Rangfolge ist aus den Daten berechnet und überprüfbar:

| Ziel | stadt | strand | kultur | `S_I` | `saison(9)` | `S_S` | `form(single)` | `S_F` | **`S`** |
|---|---|---|---|---|---|---|---|---|---|
| Barcelona | 2 | 2 | 2 | 1,000 | 2 | 1,0 | 2 | 1,0 | **1,000** |
| Lissabon | 2 | 1 | 2 | 0,833 | 2 | 1,0 | 2 | 1,0 | **0,917** |
| Valencia | 2 | 2 | 1 | 0,833 | 2 | 1,0 | 2 | 1,0 | **0,917** |

Barcelona steht vorn, weil es alle drei gewünschten Interessen **prägend** bedient. Lissabon und Valencia liegen auf demselben Wert; die Gleichstandsregel entscheidet über die Anzahl prägender Interessen (Lissabon 2 für Stadt und Kultur, Valencia 2 für Stadt und Strand — also weiter über `S_S`, dann über die redaktionelle Priorität).

> **Anmerkung zur Erstfassung:** Dort stand Lissabon ohne ableitbaren Grund vor Barcelona. Mit dem nun spezifizierten Verfahren ist die Reihenfolge nachprüfbar — und sie fällt anders aus. Das ist beabsichtigt: Eine Rangfolge, die sich nicht aus den Daten ergibt, ist eine Behauptung.

Die Ergebnis-Karte nennt die Begründung direkt. Die Person versteht deshalb, warum ein Ziel vorgeschlagen wird, ohne zuerst einen langen Text lesen zu müssen.

### 3. Auswahl eingrenzen

Die Person interessiert sich für Lissabon und Barcelona. Sie öffnet zunächst Lissabon und liest das Kurzprofil: lebendige Stadt, historische Viertel, Kulinarik, Tagesausflüge und Strände in der Umgebung.

Der Klimabereich ordnet September als angenehm warmen Reisemonat ein. Im Bereich „Allein unterwegs“ wird erklärt, dass sich das Ziel für selbstständige Stadtentdeckung, Ausflüge und abwechslungsreiche Urlaubstage eignet.

### 4. Vergleich und Abwägung

Die Person vergleicht Lissabon mit Barcelona. Die Vergleichsansicht berechnet die Aussagen aus dem Charakterprofil:

| Kriterium | Lissabon | Barcelona | Aussage |
|---|---|---|---|
| `trubel` | 3 | 5 | „Barcelona ist deutlich lebhafter“ (Δ = 2) |
| `kultur_dichte` | 4 | 5 | „vergleichbar“ (Δ = 1, unter der Schwelle) |
| `strand_anteil` | 2 | 4 | „Barcelona ist deutlich stärker strandgeprägt“ (Δ = 2) |
| `natur_anteil` | 2 | 2 | „vergleichbar“ |
| Klima September | 26 °C | 27 °C | „vergleichbar warm“ (Δ = 1 °C) |
| Preisniveau | €€ | €€€ | „Lissabon ist eine Stufe günstiger“ |

### 5. Entscheidungsergebnis

Die Person entscheidet sich für Lissabon — nicht, weil es oben stand, sondern weil sie nach dem Vergleich den geringeren Trubel und das günstigere Preisniveau höher gewichtet als den größeren Strandanteil. **Die Anwendung hat die Entscheidung nicht getroffen, sondern begründbar gemacht; das ist der eigentliche Produktwert.**

Die Anwendung schließt mit einer klaren Einordnung: „Geeignet für eine abwechslungsreiche Woche allein mit Stadt, Kultur und Tagesausflügen bei spätsommerlichem Klima.“

### Relevante Informationen für diese Journey

- Atmosphäre und Reisecharakter des Ziels (`trubel`, `kultur_dichte`)
- Selbstständig nutzbare Aktivitäten und Ausflüge
- Erreichbarkeit von Strand, Stadt und Sehenswürdigkeiten
- Saisonale Klimainformationen für September
- Vergleich zu ähnlichen Stadt-und-Strand-Zielen
- Preisniveau als Abwägungskriterium

## 9. Vollständige User Journey: Paarurlaub

### Ausgangssituation

Ein Paar möchte im Mai eine gemeinsame Woche verreisen. Es sucht eine Mischung aus Erholung, Kulinarik, Spaziergängen und besonderen gemeinsamen Erlebnissen. Ein reiner Badeurlaub und eine ausschließlich anstrengende Städtereise kommen nicht in Frage.

### 1. Einstieg und Wunschbild

Das Paar wählt auf der Startseite **Paar**, **Mai** (`M = {5}`) sowie die Interessen **Erholung**, **Natur** und **Kulinarik** (`I = {erholung, natur, kulinarik}`). Die Kriterien stehen danach als sichtbare Auswahl am oberen Rand der Seite.

Kulinarik ist seit dieser Fassung ein reguläres Interesse (Abschnitt 4.1); in der Erstfassung tauchte es nur in dieser Journey auf, ohne im Modell zu existieren.

### 2. Passende Ziele entdecken

| Ziel | erholung | natur | kulinarik | `S_I` | `saison(5)` | `S_S` | `form(paar)` | `S_F` | **`S`** |
|---|---|---|---|---|---|---|---|---|---|
| Gardasee | 2 | 2 | 2 | 1,000 | 2 | 1,0 | 2 | 1,0 | **1,000** |
| Algarve | 2 | 1 | 1 | 0,667 | 2 | 1,0 | 2 | 1,0 | **0,833** |
| Kreta | 2 | 1 | 1 | 0,667 | 1 | 0,5 | 1 | 0,5 | **0,583** |

Der Gardasee wird als besonders passend dargestellt, weil er im Mai Spaziergänge, Landschaft, Orte am Wasser, Ausflüge und regionale Küche verbindet und alle drei Interessen prägend bedient.

### 3. Zielseite vertiefen

Auf der Gardasee-Seite erfährt das Paar, welche Orte und Landschaften sich für gemeinsame Tage eignen, welche Aktivitäten möglich sind und ob die Saison im Mai bereits für die gewünschten Erlebnisse passt.

Der Abschnitt „Für Paare geeignet“ beschreibt nicht pauschal Romantik, sondern die konkrete Urlaubserfahrung: ruhige Orte am See, Ausflüge, regionale Küche, Spaziergänge und eine flexible Mischung aus Aktivität und Erholung.

### 4. Alternative bewerten

Das Paar öffnet zusätzlich die Algarve. Der Unterschied wird berechnet sichtbar: `strand_anteil` 5 gegenüber 2 (Δ = 3, deutliche Aussage), `trubel` 3 gegenüber 2 (Δ = 1, „vergleichbar“). Dazu die redaktionelle Abgrenzung: Atlantikküste gegenüber See, kleinere Orte und italienische Kulinarik am Gardasee.

### 5. Entscheidungsergebnis

Das Paar wählt den Gardasee, weil das Ziel die gewünschte Balance aus Natur, Genuss und gemeinsamen Aktivitäten besser erfüllt. Die Anwendung formuliert diese Entscheidung transparent und verweist bei stärkerem Strandwunsch auf die Algarve als Alternative.

### Relevante Informationen für diese Journey

- Charakter des gemeinsamen Urlaubs: ruhig, genussorientiert, aktiv oder kulturell
- Orte, Sehenswürdigkeiten und Aktivitäten für eine gemeinsame Woche
- Klima und Saison im Mai
- Einordnung der passenden Reisedauer
- Alternative Ziele mit nachvollziehbarer, berechneter Abgrenzung

## 10. Vollständige User Journey: Familienurlaub

### Ausgangssituation

Eine Familie mit einem 8-jährigen und einem 14-jährigen Kind möchte in den Sommerferien für zwei Wochen verreisen. Gewünscht sind Strand, verlässliches Sommerwetter und genügend Ausflugsmöglichkeiten, damit der Urlaub nicht nur aus Badetagen besteht.

### 1. Einstieg und Anforderungen

Die Familie wählt **Familie** und gibt die Altersgruppen **`A6_11`** und **`A12P`** an. Sie nutzt den Einstieg **Sommerferien** und wählt dazu ihr Bundesland; die Anwendung übersetzt das in eine Datumsspanne und daraus in `M = {7, 8}`. Als Interessen wählt sie **Strand**, **Natur** und **Ausflüge** (`I = {strand, natur, ausfluege}`).

Ausflüge ist seit dieser Fassung ein reguläres Interesse; in der Erstfassung stand es nur in dieser Journey, ohne im Modell zu existieren.

Die Altersangabe ist nicht kosmetisch: Sie verändert die Ergebnismenge messbar, weil Ziele, die für Jugendliche zu wenig bieten, über `min_{a ∈ A} kind_d(a)` abgewertet oder ausgeschlossen werden.

### 2. Familiengeeignete Vorschläge

| Ziel | `S_I` | `S_S` | `form(fam)` | `kind(A6_11)` | `kind(A12P)` | `min` | `S_F` | **`S`** |
|---|---|---|---|---|---|---|---|---|
| Mallorca | 0,833 | 1,0 | 2 | 2 | 2 | 2 | 1,00 | **0,917** |
| Kvarner-Bucht | 0,833 | 1,0 | 2 | 2 | 1 | 1 | 0,75 | **0,867** |
| Rhodos | 0,833 | 1,0 | 2 | 2 | 1 | 1 | 0,75 | **0,867** |
| Dänische Nordseeküste | 0,667 | 1,0 | 2 | 2 | 1 | 1 | 0,75 | **0,783** |

Kvarner-Bucht und Rhodos stehen gleichauf; die Gleichstandskaskade (Abschnitt 4.2.4) entscheidet und ist im Ergebnis stabil reproduzierbar.

**Der Eintrag „Dänemark“ aus der Erstfassung ist hier durch „Dänische Nordseeküste“ ersetzt.** Ein Land ist kein Reiseziel (Abschnitt 6.1): Für „Dänemark“ ließen sich weder ein Charakterprofil noch eine Reisedauer-Empfehlung belastbar angeben.

Die Karten nennen jeweils eine konkrete familienbezogene Begründung, etwa Strände plus kurze Ausflüge, vielseitige Landschaft oder ein ruhigeres Urlaubstempo — und jeweils den Hinweis, für welche der angegebenen Altersgruppen das Ziel am besten passt.

### 3. Zielseite prüfen

Die Familie öffnet Mallorca. Der Klimabereich zeigt die typische Sommerlage mit Quelle und Referenzperiode. Die Seite beschreibt verschiedene Strand- und Küstentypen, Orte für Ausflüge, Naturerlebnisse und Möglichkeiten, Badeurlaub mit Aktivitäten zu verbinden.

Im Abschnitt „Für Familien geeignet“ steht nicht ein Sammeltext, sondern drei nach Altersgruppen getrennte Einordnungen. Für `A6_11` und `A12P` wird jeweils konkret benannt, was die Insel bietet.

### 4. Gegenalternative prüfen

Die Familie vergleicht Mallorca mit der Kvarner-Bucht. Dabei wird nicht nur ein Ziel als besser dargestellt: Mallorca steht für ein breites Angebot und kurze Ausflüge (`trubel` 4), die kroatische Alternative für Küstenlandschaft und ruhigeren Naturfokus (`trubel` 2, Δ = 2 ⇒ „deutlich ruhiger“; `natur_anteil` 4 gegenüber 3, Δ = 1 ⇒ „vergleichbar“). Das Preisniveau unterscheidet sich um eine Stufe.

### 5. Entscheidungsergebnis

Die Familie wählt das Ziel, das besser zum gewünschten Urlaubstempo passt. Die Anwendung fasst die Eignung zusammen und macht sichtbar, welche Interessen besonders gut erfüllt werden und welche Alternative bei einer anderen Priorität sinnvoll wäre.

### Relevante Informationen für diese Journey

- Typisches Klima während der Sommerferien, mit korrekter Ferienspanne des eigenen Bundeslands
- Getrennte Eignungsaussagen je Kinderaltersgruppe
- Strand-, Natur- und Ausflugsmöglichkeiten
- Allgemeiner Charakter der Region über das ordinale Profil
- Geeignete Reisedauer für zwei Wochen
- Preisniveau bei zwei Wochen und vier Personen
- Transparenter Vergleich zu einer ähnlich passenden Alternative

## 11. User Journey: Grenzfälle und Abbruch

Die Erstfassung beschrieb ausschließlich Verläufe, in denen die Person findet, was sie sucht, und sich entscheidet. Das ist nicht der häufigste Fall. Die folgenden Verläufe sind Teil der Spezifikation.

### 11.1 Kein Treffer: Strand im Januar

Eine Person wählt **Single**, **Januar**, **Strand**. Der Ausschlussfilter liefert keinen Treffer, weil kein Ziel im Januar `saison ≥ 1` mit prägendem Strandcharakter verbindet.

Die Anwendung zeigt keine leere Liste, sondern durchläuft die Stufen aus 4.2.5 und kommuniziert jeden Schritt:

1. **Stufe 1** ergänzt Ziele, die im Januar gut geeignet sind, aber kein Strandthema bedienen — etwa Städteziele — sichtbar gekennzeichnet.
2. Reicht das nicht, benennt **Stufe 3** die blockierende Bedingung im Klartext: „Im Januar bietet kein Ziel im Bestand Badewetter. Zwei Wege: einen späteren Monat wählen (ab Mai) oder das Thema Strand gegen Stadt oder Kultur tauschen.“ Beide Vorschläge sind anklickbar und ändern die Suche direkt.

Entscheidend ist, dass die Anwendung an dieser Stelle **nicht** den Saisonfilter aufhebt. Ein Strandziel im Januar zu empfehlen wäre die einzige Antwort, die dem Produktziel widerspricht.

### 11.2 Wunschland ohne Bestand

Eine Person gibt „Norwegen“ als Wunschland an. Norwegen ist im Bestand der ersten Ausbaustufe nicht vertreten.

Die Anwendung sagt das direkt: „Norwegen ist derzeit nicht im Bestand.“ Sie bietet an, den Länderfilter zu entfernen, und zeigt — ohne dass der Filter dadurch stillschweigend entfällt — welche Ziele den übrigen Kriterien entsprechen. Ein kommentarloses Ignorieren des Filters ist ausgeschlossen.

### 11.3 Person entscheidet sich für kein Ziel

Der häufigste reale Ausgang. Die Anwendung erzwingt keine Entscheidung. Sie bietet an:

- die aktuelle Suche als Link zu sichern und per E-Mail oder Messenger an sich selbst zu schicken (Abschnitt 12),
- eine Rückmeldung, welche Eingabe die Auswahl am stärksten einschränkt — berechnet, indem je Kriterium ermittelt wird, wie viele zusätzliche Ziele bei dessen Wegfall in die Ergebnismenge kämen.

### 11.4 Widerspruchsfreie, aber überbestimmte Suche

Eine Person wählt sieben der acht Interessen. `S_I` wird dadurch für alle Ziele niedrig und die Rangfolge flach. Die Anwendung weist darauf hin, dass die Auswahl kaum noch unterscheidet, und schlägt vor, auf zwei bis drei Interessen zu reduzieren. Ein Hard Limit gibt es nicht.

## 12. Zustand, Teilen und Wiederaufnahme

Die Erstfassung setzte an mehreren Stellen einen erhaltenen Zustand voraus („die Auswahl verändern, statt einen neuen Suchvorgang beginnen zu müssen“, mehrfaches Öffnen und Vergleichen von Zielen), ohne ihn zu definieren. Ohne Zustandsmodell brechen alle drei Journeys beim ersten Zurück-Navigieren ab.

### 12.1 Die Suche lebt in der URL

Der vollständige Suchzustand `(f, A, M, I, L, P)` wird in der URL kodiert. Daraus folgt unmittelbar:

- Zurück und Vorwärts im Browser funktionieren erwartungsgemäß.
- Eine Suche ist ohne jede weitere Funktion teilbar und wiederaufnehmbar — das deckt den Fall aus 11.3 vollständig ab.
- Die Ergebnisansicht ist serverseitig renderbar (Abschnitt 13, SEO).
- Es ist **kein Nutzerkonto und keine serverseitige Speicherung** nötig, um den Zustand zu erhalten. Das ist zugleich die datenschutzfreundlichste Lösung (13.3).

### 12.2 Merkliste

Bis zu zehn Ziele lassen sich vormerken. Die Merkliste liegt im `localStorage` des Geräts und ist zusätzlich als Link kodierbar. Kein Konto, keine serverseitige Speicherung.

### 12.3 Vergleichsauswahl

Die zu vergleichenden Ziele (zwei oder drei) sind ebenfalls Teil der URL. Ein Vergleich ist damit als Link teilbar — für ein Paar oder eine Familie, die gemeinsam entscheiden, ist das der zentrale Anwendungsfall und in der Erstfassung nicht vorgesehen.

## 13. Qualitäts- und nicht-funktionale Anforderungen

### 13.1 Inhaltliche Qualität

Eine tragfähige Empfehlung entsteht nicht durch allgemeine Werbetexte. Jeder Text muss auf die konkrete Entscheidung einzahlen und nachvollziehbar machen, warum ein Ziel vorgeschlagen wird.

- Klimainformationen werden als typische saisonale Werte formuliert, nicht als Wetterprognose, und tragen Quelle und Referenzperiode.
- Sehenswürdigkeiten und Aktivitäten beziehen sich konkret auf das jeweilige Ziel.
- Die Eignung für Single, Paar und Familie sowie je Kinderaltersgruppe wird begründet, nicht nur mit einer Zahl oder einem Symbol markiert.
- Bilder sind echte Bilder mit vollständigem Lizenzdatensatz nach 7.3; ohne diesen ist eine Veröffentlichung ausgeschlossen.
- Die Anwendung verspricht keine Verfügbarkeiten, Preise in Beträgen oder Buchungsmöglichkeiten.
- Begründungstexte auf Ergebniskarten werden aus den erfüllten Kriterien generiert und können nichts behaupten, was die Daten nicht belegen.
- Ordinale Profilwerte sind gegen die hinterlegten Ankerbeispiele kalibriert (6.4).

### 13.2 Auffindbarkeit (SEO)

Ohne Buchungsfunktion und ohne Marketingbudget ist organischer Suchmaschinen-Traffic auf die Zielseiten der einzige realistische Akquisekanal. Das ist keine Marketingfrage, sondern eine Architekturentscheidung, die vor der ersten Zeile Code zu treffen ist:

- Zielseiten werden serverseitig gerendert oder statisch generiert, nicht ausschließlich clientseitig.
- Stabile, sprechende URLs je Ziel; einmal veröffentlichte URLs ändern sich nicht.
- Jede Zielseite ist ohne vorangegangene Suche vollständig und sinnvoll lesbar.
- Strukturierte Daten und je Seite eigene Meta-Angaben.

Eine rein clientseitige Filter-Anwendung erfüllt das nicht und ist nachträglich nur mit erheblichem Aufwand umzustellen.

### 13.3 Datenschutz

Reiseform, Kinderaltersgruppen, Zeitraum und Interessen ergeben zusammen ein Nutzerprofil. Deshalb:

- Der Suchzustand wird ausschließlich in der URL und optional im `localStorage` des Geräts gehalten, nicht serverseitig personenbezogen gespeichert.
- Es gibt kein Nutzerkonto in der ersten Ausbaustufe.
- Nutzungsmessung (Abschnitt 14) erfolgt ohne personenbezogene Merkmale und ohne geräteübergreifende Wiedererkennung; sie muss ohne Einwilligungsbanner auskommen.
- Externe Einbindungen (Schriften, Karten, Bilder) laufen über eigene Auslieferung, damit beim Seitenaufruf keine IP-Adresse an Dritte übertragen wird.

### 13.4 Barrierefreiheit

Die Anwendung wird nach WCAG 2.1 Stufe AA umgesetzt. Das ist zunächst eine Selbstverpflichtung: Solange kein Vertrag mit Verbrauchern geschlossen wird, dürfte der Anwendungsbereich des BFSG (in Kraft seit 28.06.2025) nach dessen § 1 nicht eröffnet sein, da „Dienstleistungen im elektronischen Geschäftsverkehr“ dort auf den Abschluss eines Verbrauchervertrags abstellen.

**Diese Einschätzung ist vor der Anbindung von Buchungspartnern (Abschnitt 1) rechtlich neu zu prüfen.** Eine Anwendung, die von Beginn an barrierefrei gebaut wird, muss dann nichts nachrüsten.

### 13.5 Endgeräte und Leistung

Mobile First: Die Zielgruppe recherchiert Reiseideen überwiegend am Telefon. Die Suchansicht ist auf schmalen Bildschirmen vollwertig bedienbar; die Vergleichsansicht ist auf Mobilgeräten auf zwei Ziele begrenzt. Bilder werden in mehreren Auflösungen ausgeliefert und verzögert geladen.

### 13.6 Sprache

Erste Ausbaustufe ausschließlich Deutsch. Das Datenmodell trennt jedoch von Beginn an sprachneutrale Felder (alle Zahlenwerte, Zuordnungen, Bilder, Geodaten) von sprachgebundenen Texten. Eine spätere Sprachversion ist damit eine Übersetzungs-, keine Migrationsaufgabe.

## 14. Erfolgsmessung

Die Erstfassung definierte Erfolg als Selbstauskunft („die Person kann sicher sagen …“). Das ist nicht messbar. Weil ein Buchungsabschluss als natürlicher Erfolgsindikator bewusst fehlt, werden Stellvertretergrößen benötigt.

### 14.1 Leitfrage

Das Konzept ist erfolgreich, wenn eine Person mit einer unklaren Reiseidee innerhalb weniger Schritte eine begründete Auswahl erhält und nach dem Lesen der Zielseite sicher sagen kann: „Dieses Ziel passt zu meinem Urlaub – oder ich weiß konkret, welche Alternative besser wäre.“

### 14.2 Messbare Stellvertretergrößen

| Kennzahl | Definition | Richtwert erste Ausbaustufe |
|---|---|---|
| Vertiefungsquote | Anteil der Suchen mit mindestens einem Zielseitenaufruf | ≥ 60 % |
| Vergleichsquote | Anteil der Suchen mit genutzter Vergleichsansicht | ≥ 20 % |
| Lesetiefe | Anteil der Zielseitenaufrufe, bei denen der Abschnitt „Eignung nach Reiseform“ sichtbar wurde | ≥ 50 % |
| Sicherungsquote | Anteil der Sitzungen mit Merkliste oder geteiltem Link | ≥ 15 % |
| Leerergebnisquote | Anteil der Suchen, die Stufe 2 oder 3 aus 4.2.5 erreichen | ≤ 5 % |
| Verfeinerungsrate | durchschnittliche Zahl der Kriterienänderungen je Suche | 1–3 (darüber: Erstergebnis zu schwach) |

Die Leerergebnisquote ist zugleich die Kontrollgröße für den Bestandsumfang aus 7.1: Überschreitet sie den Richtwert dauerhaft, fehlen Ziele — und zwar erkennbar in welcher Monats- und Interessenkombination.

### 14.3 Überprüfung der Gewichte

Die Gewichte 0,50 / 0,30 / 0,20 (4.2.3) sind zu überprüfen, sobald genügend Nutzungsdaten vorliegen. Prüfgröße: Wie oft wird ein Ziel geöffnet, das **nicht** unter den ersten drei stand? Liegt dieser Anteil dauerhaft hoch, bildet die Passungszahl die tatsächliche Präferenz nicht ab.

### 14.4 Offener Punkt: Geschäftsmodell

Abschnitt 1 schließt Buchungspartner für die erste Ausbaustufe aus, lässt aber offen, wovon das Produkt danach lebt. Das ist bewusst als offener Punkt vermerkt, weil es rückwirkend auf das Datenmodell wirkt: Eine spätere Partneranbindung benötigt je Ziel Verknüpfungsmerkmale (eindeutige Ortskennungen, Geokoordinaten, IATA-Codes der nächstgelegenen Flughäfen). Diese Felder jetzt mitzuerfassen ist billig; sie für 45 Ziele nachzupflegen ist es nicht.

**Empfehlung:** Ortskennungen und Geokoordinaten ab dem ersten Ziel miterfassen, auch wenn sie in der ersten Ausbaustufe nicht angezeigt werden.

## 15. Änderungsprotokoll gegenüber der Erstfassung

### 15.1 Behobene Widersprüche

| Nr. | Widerspruch in der Erstfassung | Auflösung in dieser Fassung |
|---|---|---|
| W1 | Interessen als 6 Werte definiert, Journeys nutzten zusätzlich „Kulinarik“ und „Ausflüge“ | Taxonomie auf **8 Interessen** erweitert (4.1); beide Journeys sind nun modellkonform |
| W2 | „zwei bis fünf Empfehlungen“ gegen sechs Ergebnisse in der Familien-Journey | Ergebnisliste: **höchstens 12**, die drei besten hervorgehoben (2) |
| W3 | Reiseform sollte die Vorschläge beeinflussen, kam in der Matching-Regel nicht vor | Reiseform ist **Ausschlusskriterium und gewichteter Summand** `S_F` (4.2.2, 4.2.3) |
| W4 | Vergleichsansicht sollte „ruhiger/kulturreicher“ beantworten; das Datenmodell konnte es nicht | **Ordinales Charakterprofil** mit vier Werten 1–5 und definierter Aussageschwelle (5, 6.4) |
| W5 | Rangfolge „nach Anzahl erfüllter Kriterien“ erzeugte massenhaft Gleichstände ohne Auflösung | **Passungszahl `S(d)` plus vierstufige Gleichstandskaskade**, total und deterministisch (4.2.3, 4.2.4) |
| W6 | Journey 1 behauptete Lissabon vor Barcelona, ohne dass sich das aus der Regel ergab | Rangfolge **durchgerechnet und offengelegt**; Barcelona steht vorn, die Journey ist entsprechend korrigiert (8) |
| W7 | Wunschland als Eingabe eingeführt, im Matching nicht verwendet | Wunschland ist **harter Ausschlussfilter** mit definiertem Verhalten bei fehlendem Bestand (4.2.2, 11.2) |
| W8 | „passt zum Reisemonat“ binär und undefiniert | `saison_d(m) ∈ {0,1,2}` mit definierter Filter- und Scoring-Semantik (4.2, 6.5) |
| W9 | „Monat oder Zeitraum“ gegen monatliche Klimadaten, „Sommerferien“ ohne Bundesland | **Abbildungsregel auf Monatsmengen**, Ferien-Einstiege verlangen ein Bundesland (4.1.1) |
| W10 | „Reiseziel“ vermischte Städte, Inseln, Regionen, einen See und ein ganzes Land | **Genau eine Zielebene** mit vier Typen; Länder sind nur noch Attribut (6.1); „Dänemark“ → „Dänische Nordseeküste“ (10) |

### 15.2 Geschlossene Lücken

| Nr. | Lücke | Ergänzung |
|---|---|---|
| L1 | Kein Verhalten bei null oder wenigen Treffern | Gestufte, stets benannte Lockerung; Saisonfilter bleibt unantastbar (4.2.5, 11.1) |
| L2 | Kein Zustandsmodell trotz Zustandsversprechen | Suche, Merkliste und Vergleich vollständig in der URL bzw. im `localStorage` (12) |
| L3 | Content als eigentlicher Engpass nicht adressiert | Bestandsumfang, Winterabdeckung, Aufwand je Ziel, Prozess und Prüfzyklen (7) |
| L4 | Klimadaten-Herkunft offen | Import aus benannter Quelle mit Referenzperiode; Handerfassung ausgeschlossen (7.2) |
| L5 | „frei nutzbares Bild“ nicht prüfbar | Abschließender Lizenzdatensatz als harte Veröffentlichungsbedingung (7.3) |
| L6 | Kinderalter fehlte, obwohl es die Familienempfehlung dominiert | Drei Altersgruppen als Pflichteingabe, `min`-Verknüpfung im Score (3, 4.2.3) |
| L7 | Preisniveau ausgeschlossen, obwohl entscheidungsrelevant | Relative Klassifikation €/€€/€€€ ohne Beträge (1, 6.2) |
| L8 | Journeys nur als Erfolgsfall beschrieben | Vier Grenzfall-Verläufe inklusive Abbruch (11) |
| L9 | Keine nicht-funktionalen Anforderungen | SEO, Datenschutz, Barrierefreiheit, Endgeräte, Sprache (13) |
| L10 | Erfolg nicht messbar | Sechs Stellvertretergrößen mit Richtwerten plus Prüfverfahren für die Gewichte (14) |
| L11 | Bestand implizit mediterran verzerrt | Mindestens 12 winterfähige Ziele als harte Bestandsanforderung (7.1) |
| L12 | Alternativen-Relation ohne Regeln, O(n²)-pflegeintensiv | Gerichtete Relation mit Mindestunterschied und Saisonfilterung (6.8) |

### 15.3 Bewusst offen gelassen

- **Geschäftsmodell nach der ersten Ausbaustufe** (14.4) — mit der Empfehlung, verknüpfungsfähige Ortskennungen vorsorglich mitzuerfassen.
- **Anreisedauer/Erreichbarkeit** als Kriterium wurde geprüft und für die erste Ausbaustufe nicht aufgenommen.
- **Konkrete Klimadatenquelle** — Anforderungen sind in 7.2 definiert, die Auswahl steht aus.
- **Numerische Gewichte** der Passungszahl — gesetzt, als Konfiguration gehalten, Überprüfungsverfahren in 14.3 definiert.

### 15.4 Hinweis zum Dokumenttitel

Dieses Dokument ist ein **Konzept- und Journey-Dokument**. Es enthält bewusst keine User Stories; der Dateiname der Erstfassung führte insoweit in die Irre. Die daraus abgeleiteten User Stories mit Akzeptanzkriterien stehen in `urlaubsplaner-user-stories.md`.
