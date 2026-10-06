import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { CONTACT } from '@/constants/site';
import { SERVICE_OPTIONS, submitContactRequest, type SubmitResult } from '@/lib/leads';

interface ContactFormProps {
  serviceType?: string;
}

type Status = 'idle' | 'submitting' | 'error' | SubmitResult;

const emptyForm = (service: string) => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  service,
  message: '',
});

export default function ContactForm({ serviceType = '' }: ContactFormProps) {
  const [form, setForm] = useState(() => emptyForm(serviceType));
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Champ piège : un robot le remplit, un humain ne le voit pas.
    if (honeypot) {
      setStatus('sent');
      return;
    }
    setStatus('submitting');
    try {
      setStatus(await submitContactRequest(form));
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm(emptyForm(serviceType));
    setStatus('idle');
  };

  if (status === 'sent' || status === 'mailto') {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-semibold text-primary">
          {status === 'sent' ? 'Demande envoyée' : 'Votre message est prêt'}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {status === 'sent'
            ? 'Merci pour votre confiance. Un membre de notre équipe vous recontactera dans les meilleurs délais.'
            : "Votre application de messagerie s'est ouverte avec votre demande pré-remplie. Il ne reste qu'à l'envoyer."}
        </p>
        <button type="button" onClick={reset} className="btn-outline mt-8">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h3 className="text-2xl font-semibold text-primary">Demander une consultation</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Décrivez votre projet : notre équipe vous répond rapidement. Les échanges restent confidentiels.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Nom complet <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            className="field"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Adresse e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="field"
            placeholder="vous@entreprise.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            Téléphone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="field"
            placeholder="+225 00 00 00 00 00"
          />
        </div>
        <div>
          <label htmlFor="company" className="field-label">
            Entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className="field"
            placeholder="Nom de votre entreprise"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="field-label">
            Service souhaité <span aria-hidden="true">*</span>
          </label>
          <select id="service" name="service" required value={form.service} onChange={handleChange} className="field">
            <option value="">Sélectionnez un service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Votre projet <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="field resize-none"
            placeholder="Secteur d'activité, besoin de financement, calendrier…"
          />
        </div>
      </div>

      {/* Champ piège anti-spam, invisible pour les humains */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            L'envoi a échoué. Réessayez, ou contactez-nous directement au{' '}
            <a href={CONTACT.phones[1].href} className="font-semibold underline">
              {CONTACT.phones[1].label}
            </a>{' '}
            ou à{' '}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary mt-7 w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer ma demande
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        En envoyant ce formulaire, vous acceptez d'être contacté par Sitiame Capital au sujet de votre demande.
      </p>
    </form>
  );
}
