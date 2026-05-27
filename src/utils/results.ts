import type { Poll } from '../types/poll';

export interface ResultRow {
  optionId: string;
  label: string;
  yes: number;
  maybe: number;
  no: number;
  score: number;
  isBest: boolean;
}

export function getParticipantNames(poll: Poll): string[] {
  return Array.from(new Set(poll.votes.map((vote) => vote.voterName))).sort();
}

export function getResultRows(poll: Poll): ResultRow[] {
  const rows = poll.options.map((option) => {
    const optionVotes = poll.votes.filter(
      (vote) => vote.optionId === option.id
    );
    const yes = optionVotes.filter((vote) => vote.value === 'yes').length;
    const maybe = optionVotes.filter((vote) => vote.value === 'maybe').length;
    const no = optionVotes.filter((vote) => vote.value === 'no').length;

    return {
      optionId: option.id,
      label: option.label,
      yes,
      maybe,
      no,
      score: yes * 2 + maybe,
      isBest: false
    };
  });

  const bestScore = Math.max(0, ...rows.map((row) => row.score));
  return rows.map((row) => ({
    ...row,
    isBest: bestScore > 0 && row.score === bestScore
  }));
}

function escapeCsv(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function createResultsCsv(poll: Poll): string {
  const rows = getResultRows(poll);
  const header = [
    'Terminoption',
    'Ja',
    'Vielleicht',
    'Nein',
    'Score',
    'Beste Option'
  ];
  const body = rows.map((row) => [
    row.label,
    row.yes,
    row.maybe,
    row.no,
    row.score,
    row.isBest ? 'ja' : 'nein'
  ]);

  return [header, ...body]
    .map((row) => row.map(escapeCsv).join(','))
    .join('\n');
}
