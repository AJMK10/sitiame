import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { subscribeToNewsletter } from '@/lib/leads';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Affichée uniquement lorsque l'inscription peut réellement être enregistrée. */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isSupabaseConfigured) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!EMAIL_REGEX.test(email)) {
      setError('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email);
      setIsSuccess(true);
      setEmail('');
    } catch {
      setError("L'inscription a échoué. Veuillez réessayer dans un instant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-b border-white/10">
      <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold text-white">Restez informé</h2>
          <p className="mt-2 text-sm text-white/70">
            Actualités, analyses de marché et opportunités d'investissement, directement dans votre boîte mail.
          </p>
        </div>

        {isSuccess ? (
          <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-300">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Merci, votre inscription est bien enregistrée.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@entreprise.com"
                disabled={isSubmitting}
                className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
              <button type="submit" disabled={isSubmitting || !email} className="btn-gold shrink-0">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Inscription en cours" /> : "S'inscrire"}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-2 text-xs text-red-300">
                {error}
              </p>
            )}
            <p className="mt-2 text-xs text-white/50">Désinscription possible à tout moment.</p>
          </form>
        )}
      </div>
    </div>
  );
}
