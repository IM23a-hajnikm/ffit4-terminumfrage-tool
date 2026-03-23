import type { Poll, Vote } from '../types/poll';

const STORAGE_KEY = 'terminumfrage.polls.v1';

function readAll(): Record<string, Poll> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, Poll>;
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, Poll>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createPoll(title: string, description: string, options: string[]): Poll {
  const normalizedDescription = description.trim();

  const poll: Poll = {
    id: crypto.randomUUID().slice(0, 8),
    title,
    description: normalizedDescription.length > 0 ? normalizedDescription : undefined,
    createdAt: new Date().toISOString(),
    options: options.map((label) => ({ id: crypto.randomUUID().slice(0, 8), label })),
    votes: []
  };

  const all = readAll();
  all[poll.id] = poll;
  writeAll(all);

  return poll;
}

export function getPoll(pollId: string): Poll | null {
  const all = readAll();
  return all[pollId] ?? null;
}

export function upsertVotes(pollId: string, voterName: string, entries: Array<{ optionId: string; value: Vote['value'] }>): Poll | null {
  const all = readAll();
  const poll = all[pollId];
  if (!poll) return null;

  const normalizedName = voterName.trim();
  if (!normalizedName) return poll;

  poll.votes = poll.votes.filter((vote) => vote.voterName !== normalizedName);

  const newVotes: Vote[] = entries.map((entry) => ({
    optionId: entry.optionId,
    value: entry.value,
    voterName: normalizedName
  }));

  poll.votes.push(...newVotes);
  all[pollId] = poll;
  writeAll(all);
  return poll;
}

export function clearAllPolls() {
  localStorage.removeItem(STORAGE_KEY);
}
