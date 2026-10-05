# Technische Vorbereitung für die KI-Redaktionsdemo

## Zweck

Diese Anleitung ergänzt das Unterrichtsskript zur Funktion „KI erstellt Textentwürfe für Reisezielseiten“. Sie nennt die konkreten Dateien, Dienste, Installationen und Schritte, die vor der Vorführung nötig sind.

Die Vorführung läuft auf dem Rechner der Lehrkraft. Die Lernenden brauchen weder einen eigenen API-Zugang noch einen API-Schlüssel. Sie sehen die Anwendung über die Bildschirmfreigabe in Microsoft Teams.

## Verwendete KI und Schnittstelle

Die Demo ruft die **OpenAI API Platform** über die **Responses API** auf. Das JavaScript-Paket `openai` sendet die Anfrage vom Node.js-Server an OpenAI. Für die Antwort verwendet die Anwendung **Structured Outputs**: Das Modell soll ein festes JSON-Schema mit vier Texten und einer Liste offener Fragen zurückgeben.

Der Standard-Modellname in `server.js` lautet `gpt-6-luna`. Die aktuelle OpenAI-Modellübersicht nennt GPT-6 Luna als kosteneffizientes Modell für klar umrissene Aufgaben. Die Structured-Outputs-Dokumentation nennt GPT-6-Modelle als unterstützte Modelle. Modellverfügbarkeit und Preise können sich ändern; prüfen Sie vor dem Kurstag die aktuelle Modellübersicht.

**Zugang:** [OpenAI API Platform](https://platform.openai.com/)  
**API-Schlüssel:** [API-Schlüssel verwalten](https://platform.openai.com/api-keys)  
**Modellübersicht:** [OpenAI API-Modelle](https://developers.openai.com/api/docs/models)

Ein ChatGPT-Abonnement umfasst nicht automatisch API-Nutzung. ChatGPT und die API Platform haben getrennte Abrechnungen. Prüfen Sie die API-Abrechnung, bevor Sie die Demo ausführen. Neue API-Konten verwenden laut aktueller Abrechnungsdokumentation Prepaid-Guthaben; der Mindestkauf beträgt derzeit 5 US-Dollar. Beim Einrichten ist die automatische Aufladung standardmäßig aktiviert. Schalten Sie sie aus, wenn Sie keine automatischen Nachkäufe möchten.

Die aktuelle Modellseite nennt für `gpt-6-luna` **0,10 US-Dollar pro 1 Million Eingabe-Tokens** und **0,50 US-Dollar pro 1 Million Ausgabe-Tokens**. Die Abrechnung richtet sich nach der tatsächlichen Tokenzahl. Ein kurzer Textentwurf verbraucht nur einen kleinen Teil einer Million Tokens; prüfen Sie die aktuelle Preisseite vor dem Kurstag.

## API-Zugang einrichten

1. Öffnen Sie [platform.openai.com](https://platform.openai.com/) und melden Sie sich an oder erstellen Sie ein Konto.
2. Öffnen Sie in der API Platform die API-Einstellungen beziehungsweise die Seite für API-Schlüssel.
3. Wählen Sie ein vorhandenes Projekt oder erstellen Sie ein eigenes Projekt für den Unterricht, sofern Ihr Konto diese Berechtigung hat.
4. Erstellen Sie einen neuen geheimen API-Schlüssel für dieses Projekt.
5. Kopieren Sie den Schlüssel sofort an einen sicheren Ort. Behandeln Sie ihn wie ein Passwort. Der Schlüssel darf nicht in den Browsercode, in die Unterrichtsunterlagen, in ein öffentliches Repository oder auf den geteilten Bildschirm gelangen.
6. Prüfen Sie unter **Billing**, ob API-Nutzung freigeschaltet und eine gültige Abrechnung eingerichtet ist. Prüfen Sie, ob automatische Aufladung aktiv ist, und setzen Sie sie bei Bedarf aus. Ein positiver Kontostand und die Verfügbarkeit eines Modells sind zwei getrennte Dinge.

Für die Vorführung genügen erfundene Daten zu „Hafenlicht“. Geben Sie keine echten Reise-, Kunden- oder Personendaten ein.

## Software, die installiert werden muss

Installieren Sie auf dem Rechner der Lehrkraft:

| Software | Zweck | Download |
|---|---|---|
| **Visual Studio Code** | Dateien öffnen und Code zeigen | [VS Code Downloads](https://code.visualstudio.com/download) |
| **Node.js 24 LTS** | Serverprogramm ausführen | [Node.js Downloads](https://nodejs.org/en/download) |
| **npm** | JavaScript-Pakete installieren; wird mit Node.js geliefert | wird mit Node.js installiert |
| **Webbrowser** | lokale Demo öffnen | vorhandener Browser genügt |

Auf einem Mac mit Apple-Chip wählen Sie bei Node.js den Installer für **macOS ARM64**. Bei einem Intel-Mac wählen Sie **macOS x64**. Unter Windows wählen Sie den Windows-x64-Installer. Auf der Node.js-Seite wählen Sie die mit **LTS** markierte Version, nicht „Current“.

Für die Demo ist keine VS-Code-Erweiterung erforderlich. Sie brauchen außerdem kein Datenbanksystem, keinen Cloudserver und keine Teilnehmerkonten.

## Diese Dateien enthält das Demoprojekt

Das ZIP `urlaubsplaner-ki-redaktion-demo.zip` enthält den vollständigen Ordner `urlaubsplaner-ki-redaktion`:

```text
urlaubsplaner-ki-redaktion/
├── ANFORDERUNG.md
├── package.json
├── server.js
├── README.md
├── .env.example
└── public/
    ├── index.html
    ├── app.js
    └── styles.css
```

- `ANFORDERUNG.md` beschreibt die Funktion und ihre prüfbaren Kriterien.
- `package.json` nennt die zwei benötigten Pakete: `express` für den lokalen Webserver und `openai` für den API-Aufruf.
- `server.js` nimmt Eingaben entgegen, prüft sie, ruft das Modell auf und kontrolliert die Antwort.
- `public/index.html` enthält Eingabefelder und Ergebnisbereich.
- `public/app.js` sendet die Eingabe an den eigenen Server und zeigt die Antwort an.
- `public/styles.css` gestaltet die Seite.
- `.env.example` listet die verwendeten Umgebungsvariablen. Node.js lädt diese Beispieldatei nicht automatisch.

Die Pakete werden nicht einzeln von Hand installiert. `npm install` liest `package.json` und installiert `express`, `openai` sowie deren benötigte Unterpakete.

## Installation und erster Start

### 1. ZIP entpacken und Projektordner öffnen

Entpacken Sie das ZIP. Öffnen Sie in VS Code den enthaltenen Ordner `urlaubsplaner-ki-redaktion` über **File → Open Folder** beziehungsweise **Datei → Ordner öffnen**. Öffnen Sie danach in VS Code ein neues Terminal: **Terminal → New Terminal**.

### 2. Versionen prüfen

Geben Sie im VS-Code-Terminal ein:

```sh
node --version
npm --version
```

Bei Node.js sollte eine Version `v24...` erscheinen. Wenn `node` oder `npm` nicht gefunden wird, schließen und öffnen Sie VS Code nach der Node-Installation erneut.

### 3. Pakete installieren

Stellen Sie sicher, dass das Terminal im Ordner `urlaubsplaner-ki-redaktion` steht. Führen Sie vor dem Kurstag aus:

```sh
npm install
```

Der Vorgang benötigt eine Internetverbindung. Er legt den Ordner `node_modules` und eine Sperrdatei für die installierten Paketversionen an. Diesen Schritt nicht erst während der Bildschirmfreigabe beginnen.

### 4. API-Schlüssel sicher eingeben und Demo starten

Geben Sie den API-Schlüssel erst ein, wenn die Installation abgeschlossen ist. Die folgenden Befehle fragen den Schlüssel ohne sichtbare Eingabe ab. Starten Sie die Eingabe im VS-Code-Terminal im Projektordner.

**macOS mit zsh:**

```zsh
read -s "OPENAI_API_KEY?OpenAI-API-Schlüssel eingeben: "
export OPENAI_API_KEY
echo
npm start
```

**Windows PowerShell:**

```powershell
$secret = Read-Host "OpenAI-API-Schlüssel eingeben" -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
$env:OPENAI_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
npm start
```

Der Server läuft danach im Terminal. Öffnen Sie im Browser:

```text
http://127.0.0.1:3000
```

Klicken Sie auf **Textentwurf erstellen**. Die Seite sollte eine Kurzbeschreibung, drei Zielgruppentexte und mögliche offene Fragen anzeigen. Beenden Sie den Server nach dem Unterricht mit **Ctrl+C**. Schließen Sie das Terminal, um die Umgebungsvariable aus dieser Sitzung zu entfernen.

## Modellname ändern

Die Anwendung verwendet ohne weitere Einstellung `gpt-6-luna`. Wenn dieses Modell für Ihr API-Projekt nicht freigeschaltet ist, setzen Sie `OPENAI_MODEL` im selben Terminal vor `npm start` auf eine verfügbare Modell-ID, die Structured Outputs unterstützt.

macOS/zsh:

```zsh
export OPENAI_MODEL="gpt-6-astra"
```

Windows PowerShell:

```powershell
$env:OPENAI_MODEL = "gpt-6-astra"
```

Die in diesem Beispiel eingesetzte Ersatz-ID ist ebenfalls aus der aktuellen OpenAI-Modellübersicht zu prüfen. Für die geplante Demo bleibt `gpt-6-luna` die erste Wahl.

## Vorbereitungstest

Führen Sie diesen Test durch, bevor Sie die Teams-Sitzung starten:

1. Prüfen Sie, dass `npm install` ohne Fehler beendet wird.
2. Starten Sie den Server mit einem API-Schlüssel.
3. Öffnen Sie `http://127.0.0.1:3000`.
4. Erstellen Sie mit den erfundenen Hafenlicht-Daten einen Entwurf.
5. Prüfen Sie, dass die Ausgabe als Entwurf markiert ist und bearbeitbare Textfelder enthält.
6. Prüfen Sie, dass im Feld für offene Fragen etwa fehlende Öffnungszeiten genannt werden können. Der genaue Wortlaut kann variieren.
7. Leeren Sie den Zielnamen und prüfen Sie die Fehlermeldung.
8. Beenden Sie den Server, starten Sie ihn ohne API-Schlüssel erneut und prüfen Sie die Meldung, dass der KI-Dienst nicht eingerichtet ist.

KI-Texte können bei zwei Aufrufen unterschiedlich formuliert sein. Prüfen Sie daher nicht auf einen wortgleichen Mustertext. Prüfen Sie die Datenform und gleichen Sie Tatsachenbehauptungen mit den vorgegebenen Quellen ab.

## Was während der Vorführung läuft

Der Server bindet sich an `127.0.0.1`. Die Demo ist dadurch nur auf dem Rechner der Lehrkraft erreichbar. Die Lernenden müssen die lokale Adresse nicht öffnen: Sie sehen die Browseransicht über Teams.

Der Browser sendet Zielname und Quellenangaben an `/api/drafts` auf dem eigenen Rechner. Der Node.js-Server verwendet den geheimen API-Schlüssel, ruft die OpenAI Responses API auf und gibt die geprüfte Antwort an den Browser zurück. Der API-Schlüssel wird nicht an die Lernenden oder den Browser übermittelt.

Diese Demo speichert und veröffentlicht nichts. Sie hat keine Anmeldung, Datenbank, Rechteverwaltung, dauerhafte Quellenablage oder Freigabefunktion. Die Unterrichtsdaten sind erfunden. Die Ausgabe ist ein Entwurf, keine verifizierte Reiseauskunft.

## Fehlerbehebung

| Meldung oder Problem | Ursache | Lösung |
|---|---|---|
| `node` oder `npm` nicht gefunden | Node.js wurde nicht installiert oder Terminal wurde nicht neu geöffnet | Node.js 24 LTS installieren, VS Code neu starten |
| `Cannot find package 'express'` oder `'openai'` | `npm install` fehlt oder wurde im falschen Ordner ausgeführt | Terminal im Projektordner öffnen und `npm install` ausführen |
| „Der KI-Dienst ist nicht eingerichtet“ | `OPENAI_API_KEY` ist in diesem Terminal nicht gesetzt | Server mit einem der oben genannten Schlüssel-Startabläufe neu starten |
| „Modell nicht gefunden“ oder kein Zugriff | Modell-ID nicht verfügbar für das API-Projekt | Modellübersicht prüfen, `OPENAI_MODEL` für diese Sitzung setzen |
| Abrechnungs- oder Kontingentfehler | API-Abrechnung oder Guthaben fehlt/ist erschöpft | API Platform → Billing und Usage prüfen |
| Seite lädt nicht | Server läuft nicht oder Terminal ist beendet | `npm start` erneut ausführen und Adresse `127.0.0.1:3000` öffnen |
| API antwortet nicht | Netzwerk- oder Dienstfehler | Verbindung prüfen; vorbereiteten Ersatzlauf sichtbar als Ersatz kennzeichnen |

## Offizielle Dokumentation

- [OpenAI API Developer Quickstart](https://developers.openai.com/api/docs/quickstart) — API-Schlüssel, Umgebungsvariable, JavaScript-SDK und erster API-Aufruf.
- [OpenAI API-Modelle](https://developers.openai.com/api/docs/models) — Modell-IDs, Aufgabenbereiche und aktuelle Preise.
- [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna) — Modell-ID `gpt-6-luna` und aktueller Modellpreis.
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses) — festgelegte Antwortfelder mit JSON-Schema in der Responses API.
- [OpenAI Authentifizierung](https://developers.openai.com/api/reference/overview) — API-Schlüssel bleiben geheim und serverseitig.
- [OpenAI Abrechnung für ChatGPT und API](https://help.openai.com/de-de/articles/9039756-billing-settings-in-chatgpt-vs-platform) — getrennte Abrechnungssysteme.
- [Prepaid API-Abrechnung](https://help.openai.com/en/articles/8264644-setting-up-and-managing-prepaid-api-billing) — aktueller Mindestkauf, automatische Aufladung und Guthaben.
- [Node.js Downloads](https://nodejs.org/en/download) — aktuelle LTS-Version und passende Installer.
- [VS Code für macOS installieren](https://code.visualstudio.com/docs/setup/mac) — offizieller Installationsweg für Apple Silicon und Intel.
