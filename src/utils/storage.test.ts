import { beforeEach, describe, expect, it } from 'vitest';
import { clearAllPolls, createPoll, getPoll, upsertVotes } from './storage';

describe('storage', () => {
  beforeEach(() => {
    clearAllPolls();
  });

  it('creates and persists a poll with optional description', () => {
    // Arrange
    const title = 'Team-Meeting';
    const description = 'Bitte alle abstimmen';
    const options = ['Mo 18:00'];

    // Act
    const created = createPoll(title, description, options);
    const loaded = getPoll(created.id);

    // Assert
    expect(loaded).not.toBeNull();
    expect(loaded?.title).toBe(title);
    expect(loaded?.description).toBe(description);
    expect(loaded?.options).toHaveLength(1);
  });

  it('omits an empty description', () => {
    // Act
    const created = createPoll('Team-Meeting', '   ', ['Mo 18:00']);
    const loaded = getPoll(created.id);

    // Assert
    expect(loaded?.description).toBeUndefined();
  });

  it('upserts votes per voter name', () => {
    // Arrange
    const poll = createPoll('Retro', '', ['Di 10:00']);
    const optionId = poll.options[0].id;

    // Act
    upsertVotes(poll.id, 'Lea', [{ optionId, value: 'yes' }]);
    upsertVotes(poll.id, 'Lea', [{ optionId, value: 'no' }]);
    const loaded = getPoll(poll.id);

    // Assert
    expect(loaded?.votes).toHaveLength(1);
    expect(loaded?.votes[0].value).toBe('no');
  });

  it('ignores blank voter names', () => {
    // Arrange
    const poll = createPoll('Retro', '', ['Di 10:00']);
    const optionId = poll.options[0].id;

    // Act
    upsertVotes(poll.id, '   ', [{ optionId, value: 'yes' }]);
    const loaded = getPoll(poll.id);

    // Assert
    expect(loaded?.votes).toHaveLength(0);
  });
});
