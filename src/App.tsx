import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { CreatePollPage } from './pages/CreatePollPage';
import { PollPage } from './pages/PollPage';
import { ResultsPage } from './pages/ResultsPage';

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/create" className="brand">
          Termin-Umfrage Tool
        </Link>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<CreatePollPage />} />
          <Route path="/poll/:pollId" element={<PollPage />} />
          <Route path="/poll/:pollId/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/create" replace />} />
        </Routes>
      </main>
    </div>
  );
}
