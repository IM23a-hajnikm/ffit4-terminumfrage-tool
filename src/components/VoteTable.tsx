import type { Poll } from '../types/poll';

interface VoteTableProps {
  poll: Poll;
}

export function VoteTable({ poll }: VoteTableProps) {
  const counts = poll.options.map((option) => {
    const optionVotes = poll.votes.filter((vote) => vote.optionId === option.id);
    return {
      option,
      yes: optionVotes.filter((vote) => vote.value === 'yes').length,
      no: optionVotes.filter((vote) => vote.value === 'no').length,
      maybe: optionVotes.filter((vote) => vote.value === 'maybe').length
    };
  });

  return (
    <section>
      <h2>Resultate</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>Terminoption</th>
            <th>Ja</th>
            <th>Vielleicht</th>
            <th>Nein</th>
          </tr>
        </thead>
        <tbody>
          {counts.map((entry) => (
            <tr key={entry.option.id}>
              <td>{entry.option.label}</td>
              <td>{entry.yes}</td>
              <td>{entry.maybe}</td>
              <td>{entry.no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
