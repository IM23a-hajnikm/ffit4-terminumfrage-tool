import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../utils/storage';

export function CreatePollPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const validTitle = title.trim().length > 0;
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    return validTitle && validOptions.length >= 2;
  }, [title, options]);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((entry, idx) => (idx === index ? value : entry)));
  };

  const addOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const cleaned = options.map((o) => o.trim()).filter(Boolean);
    if (title.trim().length === 0) {
      setError('Bitte Titel eingeben.');
      return;
    }

    if (cleaned.length < 2) {
      setError('Bitte mindestens zwei Terminoptionen angeben.');
      return;
    }

    const poll = createPoll(title.trim(), cleaned);
    navigate(`/poll/${poll.id}`);
  };

  return (
    <section className="card">
      <h1>Neue Terminumfrage erstellen</h1>
      <form onSubmit={onSubmit} className="stack">
        <label>
          Titel
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z. B. Team-Retrospektive" />
        </label>

        <div className="stack">
          <strong>Terminoptionen</strong>
          {options.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1} (z. B. Mo 18:00)`}
            />
          ))}
          <button type="button" onClick={addOption}>
            + Option hinzufügen
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={!canSubmit}>
          Umfrage erstellen
        </button>
      </form>
    </section>
  );
}
