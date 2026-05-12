export type VoteValue = 'yes' | 'no' | 'maybe';

export interface Option {
  id: string;
  label: string;
}

// Alias for backwards compatibility/readability in components.
export type PollOption = Option;

export interface Vote {
  optionId: string;
  voterName: string;
  value: VoteValue;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  options: Option[];
  votes: Vote[];
}
