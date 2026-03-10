export type VoteValue = 'yes' | 'no' | 'maybe';

export interface PollOption {
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
  options: PollOption[];
  votes: Vote[];
}
