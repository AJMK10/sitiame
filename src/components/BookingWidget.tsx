import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CalendarCheck, CalendarPlus, CheckCircle2, ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';
import { CONTACT } from '@/constants/site';
import {
  HORIZON_DAYS,
  SLOT_MINUTES,
  SlotTakenError,
  bookAppointment,
  dateKey,
  downloadIcs,
  fetchBookedSlots,
  formatLongDate,
  formatSlotTime,
  isSlotBookable,
  isWeekday,
  pad,
  parseKey,
  slotsForDate,
  type BookingDetails,
  type BookingResult,
} from '@/lib/appointments';
import { SERVICE_OPTIONS } from '@/lib/leads';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const monthStart = (date: Date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
const addMonths = (date: Date, count: number) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + count, 1));

const monthLabel = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);

const emptyDetails = (): BookingDetails => ({ name: '', email: '', phone: '', company: '', topic: '', message: '' });

type Step = 'pick' | 'details' | 'done';

export default function BookingWidget() {
  const [month, setMonth] = useState(() => monthStart(new Date()));
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('pick');
  const [details, setDetails] = useState<BookingDetails>(emptyDetails);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  const nowMs = Date.now();
  const todayKey = dateKey(new Date(nowMs));
  const horizonKey = dateKey(new Date(nowMs + HORIZON_DAYS * 86_400_000));

  // Créneaux déjà pris sur le mois affiché
  useEffect(() => {
    let cancelled = false;
    fetchBookedSlots(month, addMonths(month, 1)).then((slots) => {
      if (!cancelled) setBooked(slots);
    });
    return () => {
      cancelled = true;
    };
  }, [month]);

  const days = useMemo(() => {
    const year = month.getUTCFullYear();
    const monthIndex = month.getUTCMonth();
    const offset = (month.getUTCDay() + 6) % 7; // semaine commençant le lundi
    const count = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
    const cells: (string | null)[] = Array.from({ length: offset }, () => null);
    for (let day = 1; day <= count; day++) cells.push(`${year}-${pad(monthIndex + 1)}-${pad(day)}`);
    return cells;
  }, [month]);

  const isDateAvailable = (key: string) =>
    isWeekday(key) &&
    key >= todayKey &&
    key <= horizonKey &&
    slotsForDate(key).some((iso) => isSlotBookable(iso, booked, nowMs));

  const canGoBack = month > monthStart(new Date(nowMs));
  const canGoForward = dateKey(addMonths(month, 1)) <= horizonKey;

  const pickDate = (key: string) => {
    setSelectedDate(key);
    setSlot(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!slot) return;
    if (honeypot) {
      setResult('booked');
      setStep('done');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      setResult(await bookAppointment(slot, details));
      setStep('done');
    } catch (err) {
      if (err instanceof SlotTakenError) {
        setError("Ce créneau vient d'être réservé par quelqu'un d'autre. Merci d'en choisir un autre.");
        setBooked((prev) => new Set(prev).add(slot));
        setSlot(null);
        setStep('pick');
      } else {
        setError(`L'enregistrement a échoué. Réessayez ou appelez-nous au ${CONTACT.phones[1].label}.`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setStep('pick');
    setSlot(null);
    setSelectedDate(null);
    setDetails(emptyDetails());
    setResult(null);
    setError(null);
  };

  /* ───────── Étape 3 : confirmation ───────── */
  if (step === 'done' && slot) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-semibold text-primary">
          {result === 'booked' ? 'Demande de rendez-vous enregistrée' : 'Votre demande est prête à être envoyée'}
        </h2>
        <p className="mx-auto mt-4 max-w-md rounded-lg bg-muted px-5 py-4 text-primary">
          <span className="block font-semibold capitalize">{formatLongDate(slot)}</span>
          <span className="block text-lg">
            {formatSlotTime(slot)} · {SLOT_MINUTES} min
          </span>
          <span className="block text-xs text-muted-foreground">Heure d'Abidjan (GMT)</span>
        </p>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          {result === 'booked'
            ? `Nous vous confirmerons ce créneau par e-mail à ${details.email}, dans les 24 h ouvrées.`
            : "Votre messagerie s'est ouverte avec votre demande pré-remplie : envoyez-la pour que nous puissions confirmer le créneau."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => downloadIcs(slot, details)} className="btn-gold">
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Ajouter à mon agenda
          </button>
          <button type="button" onClick={restart} className="btn-outline">
            Réserver un autre créneau
          </button>
        </div>
      </div>
    );
  }

  /* ───────── Étape 2 : coordonnées ───────── */
  if (step === 'details' && slot) {
    return (
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted px-5 py-4">
          <div className="flex items-center gap-3 text-primary">
            <CalendarCheck className="h-5 w-5 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="font-semibold capitalize">{formatLongDate(slot)}</p>
              <p className="text-sm text-muted-foreground">
                {formatSlotTime(slot)} · {SLOT_MINUTES} min · heure d'Abidjan (GMT)
              </p>
            </div>
          </div>
          <button type="button" onClick={() => setStep('pick')} className="text-sm font-semibold text-primary underline">
            Modifier
          </button>
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-primary">Vos coordonnées</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bk-name" className="field-label">
              Nom complet <span aria-hidden="true">*</span>
            </label>
            <input id="bk-name" name="name" required autoComplete="name" value={details.name} onChange={handleChange} className="field" />
          </div>
          <div>
            <label htmlFor="bk-email" className="field-label">
              Adresse e-mail <span aria-hidden="true">*</span>
            </label>
            <input id="bk-email" name="email" type="email" required autoComplete="email" value={details.email} onChange={handleChange} className="field" />
          </div>
          <div>
            <label htmlFor="bk-phone" className="field-label">
              Téléphone <span aria-hidden="true">*</span>
            </label>
            <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" value={details.phone} onChange={handleChange} className="field" placeholder="+225 00 00 00 00 00" />
          </div>
          <div>
            <label htmlFor="bk-company" className="field-label">
              Entreprise
            </label>
            <input id="bk-company" name="company" autoComplete="organization" value={details.company} onChange={handleChange} className="field" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bk-topic" className="field-label">
              Sujet de l'échange <span aria-hidden="true">*</span>
            </label>
            <select id="bk-topic" name="topic" required value={details.topic} onChange={handleChange} className="field">
              <option value="">Sélectionnez un sujet</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bk-message" className="field-label">
              Votre projet en quelques mots
            </label>
            <textarea id="bk-message" name="message" rows={4} value={details.message} onChange={handleChange} className="field resize-none" placeholder="Secteur, besoin de financement, calendrier…" />
          </div>
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="bk-website">Ne pas remplir</label>
          <input id="bk-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {error && (
          <div role="alert" className="mt-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setStep('pick')} className="btn-outline sm:w-auto">
            Retour
          </button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Enregistrement…
              </>
            ) : (
              'Confirmer le rendez-vous'
            )}
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Première consultation gratuite et sans engagement. Vos informations restent confidentielles.
        </p>
      </form>
    );
  }

  /* ───────── Étape 1 : date et heure ───────── */
  const slots = selectedDate ? slotsForDate(selectedDate) : [];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
      {error && (
        <div role="alert" className="mb-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
        {/* Calendrier */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold capitalize text-primary">{monthLabel(month)}</h2>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setMonth(addMonths(month, -1))}
                disabled={!canGoBack}
                aria-label="Mois précédent"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-primary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMonth(addMonths(month, 1))}
                disabled={!canGoForward}
                aria-label="Mois suivant"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-primary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {WEEKDAYS.map((day) => (
              <span key={day} className="py-2">
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((key, i) => {
              if (!key) return <span key={`blank-${i}`} />;
              const available = isDateAvailable(key);
              const selected = key === selectedDate;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available}
                  onClick={() => pickDate(key)}
                  aria-pressed={selected}
                  aria-label={new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(parseKey(key))}
                  className={cn(
                    'aspect-square rounded-md text-sm font-medium transition-all',
                    selected
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : available
                        ? 'text-primary hover:bg-secondary/20'
                        : 'cursor-not-allowed text-muted-foreground/40',
                    key === todayKey && !selected && 'ring-1 ring-secondary',
                  )}
                >
                  {Number(key.slice(8))}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Du lundi au vendredi, de 8h00 à 17h00 (heure d'Abidjan, GMT).</p>
        </div>

        {/* Créneaux */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-primary">
            <Clock className="h-5 w-5 text-gold-ink" aria-hidden="true" />
            {selectedDate ? <span className="capitalize">{formatLongDate(`${selectedDate}T00:00:00.000Z`)}</span> : 'Horaires disponibles'}
          </h3>
          {!selectedDate ? (
            <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              Choisissez d'abord un jour dans le calendrier pour voir les créneaux de {SLOT_MINUTES} minutes.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((iso) => {
                const bookable = isSlotBookable(iso, booked, nowMs);
                const selected = iso === slot;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={!bookable}
                    onClick={() => setSlot(iso)}
                    aria-pressed={selected}
                    className={cn(
                      'rounded-md border px-2 py-2.5 text-sm font-medium transition-all',
                      selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : bookable
                          ? 'border-border text-primary hover:border-secondary hover:bg-secondary/10'
                          : 'cursor-not-allowed border-transparent bg-muted text-muted-foreground/50 line-through',
                    )}
                  >
                    {formatSlotTime(iso)}
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            disabled={!slot}
            onClick={() => {
              setError(null);
              setStep('details');
            }}
            className="btn-primary mt-6 w-full"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
