import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { Poll } from '../types/poll';
import { VoteTable } from './VoteTable';

describe('VoteTable', () => {
  it('aggregates yes, maybe, and no votes per option', () => {
    const poll: Poll = {
      id: 'poll-1',
      title: 'Teamtermin',
      createdAt: '2026-05-26T08:00:00.000Z',
      options: [
        { id: 'opt-1', label: 'Mo 18:00' },
        { id: 'opt-2', label: 'Di 10:00' }
      ],
      votes: [
        { optionId: 'opt-1', voterName: 'Lea', value: 'yes' },
        { optionId: 'opt-1', voterName: 'Mia', value: 'yes' },
        { optionId: 'opt-1', voterName: 'Noah', value: 'maybe' },
        { optionId: 'opt-1', voterName: 'Tim', value: 'no' },
        { optionId: 'opt-2', voterName: 'Lea', value: 'no' }
      ]
    };

    const markup = renderToStaticMarkup(<VoteTable poll={poll} />);

    expect(markup).toContain('Teilnehmende: 4');
    expect(markup).toContain(
      '<td>Mo 18:00</td><td>2</td><td>1</td><td>1</td><td>5</td>'
    );
    expect(markup).toContain(
      '<td>Di 10:00</td><td>0</td><td>0</td><td>1</td><td>0</td>'
    );
    expect(markup).toContain('<span class="badge">Best</span>');
  });
});
