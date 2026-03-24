# Datenmodell (Issue 3)

## Ziel
Datenstrukturen festlegen, die im Frontend für das Terminumfrage-Tool verwendet werden.

## TypeScript-Modelle

```ts
export type VoteValue = 'yes' | 'no' | 'maybe';

export interface Option {
  id: string;
  label: string;
}

export interface Vote {
  optionId: string;
  voterName: string;
  value: VoteValue;
}

export interface Poll {
  id: string;
  title: string;
  createdAt: string;
  options: Option[];
  votes: Vote[];
}
```

## Beziehung der Modelle
- Eine **Poll** hat mehrere **Optionen**.
- Eine **Vote** referenziert genau eine Option über `optionId`.
- Der Name der abstimmenden Person ist in `voterName` gespeichert.

## Persistenz-Entscheidung (MVP)
Für den MVP wird **LocalStorage** verwendet (kein Backend nötig):
- Key: `terminumfrage.polls.v1`
- Struktur: `Record<string, Poll>`

Begründung:
- schnell umsetzbar
- keine Auth/Server-Komplexität
- ausreichend für den MVP in LU18

## Option für später
Für spätere Iterationen kann auf **Supabase (Postgres)** migriert werden, z. B. mit Tabellen:
- `polls`
- `options`
- `votes`
