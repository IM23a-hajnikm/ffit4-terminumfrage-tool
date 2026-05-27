import { Link, useParams } from 'react-router-dom';
import { VoteTable } from '../components/VoteTable';
import { PollNotFound } from '../components/PollNotFound';
import { createResultsCsv } from '../utils/results';
import { getPoll } from '../utils/storage';

export function ResultsPage() {
  const { pollId = '' } = useParams();
  const poll = getPoll(pollId);

  if (!poll) {
    return <PollNotFound />;
  }

  const downloadCsv = () => {
    const csv = createResultsCsv(poll);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terminumfrage-${poll.id}-resultate.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="stack">
      <div className="card">
        <h1>{poll.title} – Resultate</h1>
        {poll.description && <p>{poll.description}</p>}
        <div className="actions">
          <Link to={`/poll/${poll.id}`} className="button-link">
            Zur Abstimmung
          </Link>
          <Link to="/create" className="button-link secondary-link">
            Neue Umfrage erstellen
          </Link>
          <button type="button" className="secondary" onClick={downloadCsv}>
            CSV exportieren
          </button>
        </div>
      </div>

      <div className="card">
        <VoteTable poll={poll} />
      </div>
    </section>
  );
}
