# Implementierungsauftrag

Die Implementierung startet in `ibb_schulung` mit einem schlanken Node.js-ESM-Projekt ohne Laufzeitabhängigkeiten. Der erste Lieferumfang umfasst AP 01/02-Grundlage und den Kernpfad aus AP 07/08: validierter Suchvertrag, deterministisches Matching, URL-Zustand, statischer Build, lokale Auslieferung und fünf freigegebene Referenzziele.

## DoD-Gate

Ein Paket wird erst freigegeben, wenn `npm run check` erfolgreich durchläuft. Das Gate validiert Daten, erzeugt den Build und führt Unit- sowie HTTP-E2E-Tests aus. Fehlgeschlagene Tests blockieren die Freigabe.

## Aktueller Status

- AP 01: F-02 (Reisezeitabbildung) und F-10 (Vergleich ohne Suche) sind am 2026-10-01 fachlich beschlossen und in AP 01 sowie AP 12 dokumentiert; weitere formale Abnahmeschritte bleiben erforderlich.
- AP 02: Projektfundament, Build und lokaler Server umgesetzt.
- AP 07-13: mehrere Domain-Funktionen sind implementiert und getestet; dies ist keine formale Freigabe aller Story-, Redaktions- und Journey-Anforderungen dieser Pakete.
- AP 14: nicht freigegeben. Ein 45-Ziel-Arbeitsinventar mit fünf Bestandszielen und 40 Kandidaten liegt vor; die 40 Kandidaten sind nicht recherchiert oder freigegeben. Inhalts- und Provenienznachweise der fünf Bestandsziele fehlen ebenfalls.
- AP 15: nicht freigegeben. Abnahme-, Datenschutz-, Qualitäts-, Betriebs- und Produktfreigaben liegen nicht als Nachweis vor.

`npm run check` prueft den lauffaehigen Prototypen. Es ist kein Veroeffentlichungsgate. `npm run release:check` prueft die Bestands- und Abnahmenachweise und muss bis zum Abschluss von AP 14/15 fehlschlagen.

Der Release-Audit weist den aktuellen Bestand aus und benennt fehlende Inhaltsgruppen je Ziel. Die Winter-Profilzahl ist eine vorlaeufige maschinelle Kennzahl und ersetzt keine fachliche Definition oder Freigabe der Winterfaehigkeit. AP-15-Kennzahlen sind als reine Berechnung aus aggregierten Zaehlern implementiert; eine Datenerhebung oder Analytics-Integration findet nicht statt.
