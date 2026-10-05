# Arbeitspakete: Urlaubsplaner

Diese Aufteilung konkretisiert den Entwicklungsplan in 15 aufeinander abgestimmte und einzeln abnehmbare Arbeitspakete. Grundlage sind der Entwicklungsplan, die User Stories und das Konzept mit User Journeys. Die Nummerierung bildet die empfohlene Reihenfolge ab; als parallel markierte Pakete dürfen erst nach ihren jeweiligen Voraussetzungen starten.

- **01 — Fachliche Regeln und Abnahmebasis:** versionierte Fachspezifikation, Entscheidungsprotokoll und Referenztestfälle (Abhängigkeit: –)
- **02 — Technisches Fundament und Architektur-Gate:** beschlossene lokale Architektur, reproduzierbares Projektfundament und Betriebsnachweis (Abhängigkeit: 01 teilweise parallel; Stack-Entscheid erforderlich)
- **03 — Datenmodell und Referenzskalen:** ER-Modell, Datenlexikon, Validierungsregeln und Freigabe-Zustandsautomat (Abhängigkeit: 01; technische Umsetzung nach 02)
- **04 — Klimaimport und Datenqualität:** versionierte Importspezifikation, atomare Monatsdaten und geprüfte Referenzimporte (Abhängigkeit: 03)
- **05 — Redaktion, Rechte und Freigabe:** Freigabekatalog, Lizenzstandard, Alternativenregel und nachweisbarer Workflow (Abhängigkeit: 03, 04)
- **06 — Beispielbestand und Journey-Testdaten:** fünf freigegebene Ziele, versionierte Journey-Fälle und isolierte Grenzfalldaten (Abhängigkeit: 04, 05)
- **07 — Matching-Kern:** testbarer Matching-Vertrag mit Filter, Score, totaler Sortierung und Referenztests (Abhängigkeit: 01, 03, 06)
- **08 — Sucheingabe und URL-Zustand:** validierter Eingabe- und URL-Vertrag v1 mit teilbarem Browserzustand (Abhängigkeit: 01, 02, 07)
- **09 — Ergebnisliste und Begründungen:** begrenzte, bedienbare Originaltreffer mit rückverfolgbaren Begründungen (Abhängigkeit: 07, 08)
- **10 — Lockerungen und Suchdiagnose:** verständliche Behandlung enger Suchen (Abhängigkeit: 07–09)
- **11 — Zielseiten und organische Auffindbarkeit:** vollständige, auffindbare Zielseiten (Abhängigkeit: 04–06, 08)
- **12 — Alternativen, Merkliste und Vergleich:** gemeinsame Entscheidungsansicht (Abhängigkeit: 05, 08, 11)
- **13 — Geführte Einstiege und Entscheidungshilfen:** Ferien- und Themenwege, Hinweise (Abhängigkeit: 08–10, 12)
- **14 — Bestandsausbau auf 45 Ziele:** geprüfter Veröffentlichungsbestand (Abhängigkeit: 04, 05, 11)
- **15 — Messung, Gesamtabnahme und Veröffentlichung:** abgenommene erste Ausbaustufe (Abhängigkeit: 01–14)

Durchgängige Anforderungen – Datenschutz, WCAG 2.1 AA, mobile Bedienbarkeit, deutsche Sprache, automatisierte Prüfungen und keine externen Einbindungen beim Seitenaufruf – sind in jedem Paket mitzudenken und werden in AP 15 abschließend geprüft.

Ein Arbeitspaket ist erst abgeschlossen, wenn seine Lieferobjekte versioniert vorliegen, Abhängigkeiten erfüllt oder sichtbar gesperrt sind, Risiken bewertet wurden und die dokumentierten Tests bestanden haben.
