import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PollNotFound } from '../components/PollNotFound';
import type { VoteValue } from '../types/poll';
import { clearAllPolls, getPoll, upsertVotes } from '../utils/storage';

export function PollPage() {
  const { pollId = '' } = useParams();
  const [voterName, setVoterName] = useState('');
  const [voteMap, setVoteMap] = useState<Record<string, VoteValue>>({});
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const poll = useMemo(() => getPoll(pollId), [pollId, refreshKey]);

  useEffect(() => {
    if (!poll) return;
    setVoteMap((current) => {
      const initial: Record<string, VoteValue> = {};
      for (const option of poll.options) {
        initial[option.id] = current[option.id] ?? 'yes';
      }
      return initial;
    });
  }, [poll]);

  if (!poll) {
    return <PollNotFound />;
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (voterName.trim().length === 0) {
      setError('Bitte Namen eingeben.');
      return;
    }

    const entries = poll.options.map((option) => ({
      optionId: option.id,
      value: voteMap[option.id] ?? 'yes'
    }));

    upsertVotes(poll.id, voterName, entries);
    setRefreshKey((value) => value + 1);
  };

  const resetAll = () => {
    clearAllPolls();
    setRefreshKey((value) => value + 1);
  };

  return (
    <section className="stack">
      <div className="card">
        <h1>{poll.title}</h1>
        <p>
          Abstimm-Link: <code>{window.location.href}</code>
        </p>
        <p>
          Ergebnis-Link: <code>{`${window.location.origin}/poll/${poll.id}/results`}</code>
        </p>
        <div className="actions">
          <Link to={`/poll/${poll.id}/results`} className="button-link">
            Resultate anzeigen
          </Link>
        </div>
      </div>

      <form onSubmit={onSubmit} className="card stack">
        <h2>Abstimmen</h2>
        <label>
          Dein Name
          <input value={voterName} onChange={(e) => setVoterName(e.target.value)} placeholder="Max Mustermann" />
        </label>

        {poll.options.map((option) => (
          <label key={option.id}>
            {option.label}
            <select
              value={voteMap[option.id] ?? 'yes'}
              onChange={(e) => setVoteMap((prev) => ({ ...prev, [option.id]: e.target.value as VoteValue }))}
            >
              <option value="yes">Ja</option>
              <option value="maybe">Vielleicht</option>
              <option value="no">Nein</option>
            </select>
          </label>
        ))}

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit">Stimme speichern</button>
          <button type="button" className="secondary" onClick={resetAll}>
            Alle Umfragen zurücksetzen
          </button>
        </div>
      </form>
    </section>
  );
}
