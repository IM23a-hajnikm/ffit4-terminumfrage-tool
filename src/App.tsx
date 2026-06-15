import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { CreatePollPage } from './pages/CreatePollPage';
import { PollPage } from './pages/PollPage';
import { ResultsPage } from './pages/ResultsPage';

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/create" className="brand">
            <span className="brand-mark">TU</span>
            <span>Terminumfrage</span>
          </Link>
          <Link to="/create" className="header-action">
            Neue Umfrage
          </Link>
        </div>
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
