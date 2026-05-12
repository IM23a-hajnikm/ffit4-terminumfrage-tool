import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../utils/storage';

export function CreatePollPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const validTitle = title.trim().length > 0;
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    return validTitle && validOptions.length >= 1;
  }, [title, options]);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((entry, idx) => (idx === index ? value : entry)));
  };

  const addOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const removeOption = (index: number) => {
    setOptions((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const cleaned = options.map((o) => o.trim()).filter(Boolean);
    if (title.trim().length === 0) {
      setError('Bitte Titel eingeben.');
      return;
    }

    if (cleaned.length < 1) {
      setError('Bitte mindestens eine Terminoption angeben.');
      return;
    }

    const poll = createPoll(title.trim(), description, cleaned);
    navigate(`/poll/${poll.id}`);
  };

  return (
    <section className="card">
      <h1>Neue Terminumfrage erstellen</h1>
      <form onSubmit={onSubmit} className="stack">
        <label>
          Titel (Pflicht)
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z. B. Team-Retrospektive" />
        </label>

        <label>
          Beschreibung (optional)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Zusatzinfos zur Umfrage (optional)"
            rows={3}
          />
        </label>

        <div className="stack">
          <strong>Terminoptionen</strong>
          {options.map((option, index) => (
            <div key={index} className="option-row">
              <input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1} (z. B. Mo 18:00)`}
              />
              <button type="button" className="secondary" onClick={() => removeOption(index)} disabled={options.length <= 1}>
                Entfernen
              </button>
            </div>
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
