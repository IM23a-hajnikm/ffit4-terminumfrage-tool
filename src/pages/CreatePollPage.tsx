import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    <section className="mx-auto w-full max-w-3xl">
      <Card className="border-border bg-card shadow-lg">
        <CardHeader className="space-y-2">
          <CardDescription className="text-xs font-semibold tracking-wide uppercase">
            TERMINUMFRAGE
          </CardDescription>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Neue Terminumfrage erstellen
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="poll-title">Titel (Pflicht)</Label>
              <Input
                id="poll-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z. B. Team-Retrospektive"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poll-description">Beschreibung (optional)</Label>
              <Textarea
                id="poll-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Zusatzinfos zur Umfrage (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Terminoptionen</Label>
              {options.map((option, index) => {
                const optionId = `poll-option-${index}`;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border p-4 max-sm:flex-col max-sm:items-stretch"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <Label htmlFor={optionId}>Datum und Uhrzeit</Label>
                      <Input
                        id={optionId}
                        type="datetime-local"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                    </div>
                    <span className="flex h-9 flex-1 items-center self-end text-sm font-medium text-muted-foreground max-sm:h-auto max-sm:self-stretch">
                      {formatDateTimeOption(option)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="self-end text-destructive hover:bg-destructive/10 hover:text-destructive max-sm:w-full max-sm:self-stretch"
                      onClick={() => removeOption(index)}
                      disabled={options.length <= 1}
                    >
                      Entfernen
                    </Button>
                  </div>
                );
              })}
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={addOption}
              >
                Option hinzufügen
              </Button>
            </div>

            {error && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={!canSubmit}
            >
              Umfrage erstellen
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
