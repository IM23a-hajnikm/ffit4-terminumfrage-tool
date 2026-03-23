import { Link, useParams } from 'react-router-dom';
import { VoteTable } from '../components/VoteTable';
import { PollNotFound } from '../components/PollNotFound';
import { getPoll } from '../utils/storage';

export function ResultsPage() {
  const { pollId = '' } = useParams();
  const poll = getPoll(pollId);

  if (!poll) {
    return <PollNotFound />;
  }

  return (
    <section className="stack">
      <div className="card">
        <h1>{poll.title} – Resultate</h1>
        <div className="actions">
          <Link to={`/poll/${poll.id}`} className="button-link">
            Zur Abstimmung
          </Link>
          <Link to="/create" className="button-link secondary-link">
            Neue Umfrage erstellen
          </Link>
        </div>
      </div>

      <div className="card">
        <VoteTable poll={poll} />
      </div>
    </section>
  );
}
