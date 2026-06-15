import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../utils/storage';

const dateTimeFormatter = new Intl.DateTimeFormat('de-CH', {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

function toDateTimeLocalValue(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function createSuggestedOption(daysFromToday = 1): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(9, 0, 0, 0);
  return toDateTimeLocalValue(date);
}

function createNextOptionValue(options: string[]): string {
  const latestValue = [...options].reverse().find(Boolean);

  if (!latestValue) {
    return createSuggestedOption(options.length + 1);
  }

  const latestDate = new Date(latestValue);
  if (Number.isNaN(latestDate.getTime())) {
    return createSuggestedOption(options.length + 1);
  }

  latestDate.setDate(latestDate.getDate() + 1);
  return toDateTimeLocalValue(latestDate);
}

function formatDateTimeOption(value: string): string {
  if (!value) {
    return 'Noch kein Termin ausgewählt';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateTimeFormatter.format(date);
}

export function CreatePollPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(() => [createSuggestedOption()]);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const validTitle = title.trim().length > 0;
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    return validTitle && validOptions.length >= 1;
  }, [title, options]);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((entry, idx) => (idx === index ? value : entry))
    );
  };

  const addOption = () => {
    setOptions((prev) => [...prev, createNextOptionValue(prev)]);
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

    const cleaned = options
      .map((option) => option.trim())
      .filter(Boolean)
      .map(formatDateTimeOption);

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
    <section className="page-section">
      <div className="section-heading">
        <span className="eyebrow">Terminumfrage</span>
        <h1>Neue Terminumfrage erstellen</h1>
      </div>

      <form onSubmit={onSubmit} className="card stack form-panel">
        <label>
          Titel (Pflicht)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Team-Retrospektive"
          />
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
          <strong className="field-title">Terminoptionen</strong>
          {options.map((option, index) => (
            <div key={index} className="option-row">
              <label className="date-field">
                Datum und Uhrzeit
                <input
                  type="datetime-local"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
              </label>
              <span className="option-preview">
                {formatDateTimeOption(option)}
              </span>
              <button
                type="button"
                className="secondary compact-button"
                onClick={() => removeOption(index)}
                disabled={options.length <= 1}
              >
                Entfernen
              </button>
            </div>
          ))}
          <button
            type="button"
            className="secondary add-option"
            onClick={addOption}
          >
            Option hinzufügen
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary-action" disabled={!canSubmit}>
          Umfrage erstellen
        </button>
      </form>
    </section>
  );
}
