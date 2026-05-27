import { describe, expect, it } from 'vitest';
import type { Poll } from '../types/poll';
import {
  createResultsCsv,
  getParticipantNames,
  getResultRows
} from './results';

const poll: Poll = {
  id: 'poll-1',
  title: 'Teamtermin',
  createdAt: '2026-05-26T08:00:00.000Z',
  options: [
    { id: 'opt-1', label: 'Mo 18:00' },
    { id: 'opt-2', label: 'Di, 10:00' }
  ],
  votes: [
    { optionId: 'opt-1', voterName: 'Lea', value: 'yes' },
    { optionId: 'opt-1', voterName: 'Mia', value: 'maybe' },
    { optionId: 'opt-2', voterName: 'Lea', value: 'no' }
  ]
};

describe('results', () => {
  it('counts unique participants', () => {
    // Act
    const participants = getParticipantNames(poll);

    // Assert
    expect(participants).toEqual(['Lea', 'Mia']);
  });

  it('scores rows and marks the best option', () => {
    // Act
    const rows = getResultRows(poll);

    // Assert
    expect(rows[0]).toMatchObject({
      label: 'Mo 18:00',
      yes: 1,
      maybe: 1,
      no: 0,
      score: 3,
      isBest: true
    });
    expect(rows[1]).toMatchObject({ score: 0, isBest: false });
  });

  it('exports CSV with escaped option labels', () => {
    // Act
    const csv = createResultsCsv(poll);

    // Assert
    expect(csv).toContain('Terminoption,Ja,Vielleicht,Nein,Score,Beste Option');
    expect(csv).toContain('Mo 18:00,1,1,0,3,ja');
    expect(csv).toContain('"Di, 10:00",0,0,1,0,nein');
  });
});
