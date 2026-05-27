import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePollPage } from './CreatePollPage';
import { PollPage } from './PollPage';
import { ResultsPage } from './ResultsPage';
import { clearAllPolls, createPoll, upsertVotes } from '../utils/storage';

function renderRoute(path: string, entry: string, element: ReactElement) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>
  );
}

function setWindowLocation(path: string) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: {
        href: `http://localhost${path}`,
        origin: 'http://localhost'
      }
    }
  });
}

describe('page routes', () => {
  beforeEach(() => {
    clearAllPolls();
  });

  it('renders the create poll form', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <CreatePollPage />
      </MemoryRouter>
    );

    expect(markup).toContain('Neue Terminumfrage erstellen');
    expect(markup).toContain('Titel (Pflicht)');
    expect(markup).toContain('Beschreibung (optional)');
  });

  it('renders a poll voting page for an existing poll', () => {
    const poll = createPoll('Teamtermin', 'Bitte abstimmen', ['Mo 18:00']);
    setWindowLocation(`/poll/${poll.id}`);

    const markup = renderRoute(
      '/poll/:pollId',
      `/poll/${poll.id}`,
      <PollPage />
    );

    expect(markup).toContain('Teamtermin');
    expect(markup).toContain('Bitte abstimmen');
    expect(markup).toContain('Resultate anzeigen');
    expect(markup).toContain('Mo 18:00');
  });

  it('renders results for an existing poll', () => {
    const poll = createPoll('Teamtermin', '', ['Mo 18:00']);
    upsertVotes(poll.id, 'Lea', [
      { optionId: poll.options[0].id, value: 'yes' }
    ]);

    const markup = renderRoute(
      '/poll/:pollId/results',
      `/poll/${poll.id}/results`,
      <ResultsPage />
    );

    expect(markup).toContain('Teamtermin');
    expect(markup).toContain('Resultate');
    expect(markup).toContain('CSV exportieren');
    expect(markup).toContain(
      '<td>Mo 18:00</td><td>1</td><td>0</td><td>0</td><td>2</td>'
    );
  });
});
