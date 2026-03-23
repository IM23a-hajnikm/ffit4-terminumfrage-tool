import { Link, Route, Routes } from 'react-router-dom';
import { CreatePollPage } from './pages/CreatePollPage';
import { PollPage } from './pages/PollPage';

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Termin-Umfrage Tool
        </Link>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<CreatePollPage />} />
          <Route path="/poll/:pollId" element={<PollPage />} />
        </Routes>
      </main>
    </div>
  );
}
