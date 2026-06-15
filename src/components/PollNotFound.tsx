import { Link } from 'react-router-dom';

export function PollNotFound() {
  return (
    <section className="card empty-state">
      <h1>Umfrage nicht gefunden</h1>
      <p>Prüfe den Link oder erstelle eine neue Umfrage.</p>
      <Link to="/create" className="button-link">
        Zur Umfrage-Erstellung
      </Link>
    </section>
  );
}
