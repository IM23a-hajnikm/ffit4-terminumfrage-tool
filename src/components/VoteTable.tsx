import type { Poll } from '../types/poll';
import { getParticipantNames, getResultRows } from '../utils/results';

interface VoteTableProps {
  poll: Poll;
}

export function VoteTable({ poll }: VoteTableProps) {
  const rows = getResultRows(poll);
  const participantCount = getParticipantNames(poll).length;

  return (
    <section>
      <h2>Resultate</h2>
      <p className="result-summary">Teilnehmende: {participantCount}</p>
      <p className="result-rule">Score: Ja = 2, Vielleicht = 1, Nein = 0</p>
      <div className="table-scroll">
        <table className="result-table">
          <thead>
            <tr>
              <th>Terminoption</th>
              <th>Ja</th>
              <th>Vielleicht</th>
              <th>Nein</th>
              <th>Score</th>
              <th>Empfehlung</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.optionId} className={row.isBest ? 'best-row' : ''}>
                <td>{row.label}</td>
                <td>{row.yes}</td>
                <td>{row.maybe}</td>
                <td>{row.no}</td>
                <td>{row.score}</td>
                <td>{row.isBest ? <span className="badge">Best</span> : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
