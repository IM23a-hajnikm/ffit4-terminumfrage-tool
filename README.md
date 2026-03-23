# Terminumfrage-Tool (Mini-Doodle)

MVP einer einfachen Terminumfrage als standalone Web-App mit **React + Vite + TypeScript**.

## Schnellstart

```bash
npm install
npm run dev
```

Danach im Browser `http://localhost:5173` öffnen.

## MVP-Features

- Umfrage erstellen (Titel + mehrere Terminoptionen)
- Share-Link via `/poll/:id`
- Abstimmen mit Name (Ja/Nein/Vielleicht)
- Resultate je Option (Anzahl Stimmen)
- Fehlerfälle (fehlender Titel/Name), Reset aller lokalen Umfragen

## Speicherung

Aktuell **LocalStorage** (Key: `terminumfrage.polls.v1`) für schnelles MVP ohne Backend.


## Requirements

- Git-Setup im Repo: `git config pull.rebase true`
- Ziel für Setup-Issue: `npm install` und `npm run dev` müssen lokal funktionieren.
