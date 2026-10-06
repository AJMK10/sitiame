import { CONTACT } from '@/constants/site';
import { supabase } from '@/lib/supabase';

export const SERVICE_OPTIONS = [
  { value: 'investissements', label: 'Investissements stratégiques' },
  { value: 'conseils', label: 'Conseils stratégiques' },
  { value: 'levee-fonds', label: 'Levée de fonds' },
  { value: 'nexasset', label: 'NexAsset – Gestion & tokenisation' },
  { value: 'bridge', label: 'Bridge – Transactions' },
  { value: 'pme360', label: 'PME360 – Scoring PME' },
  { value: 'assethub', label: 'AssetHub – Portefeuilles & dérivés' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

/** 'sent' : enregistrée en base · 'mailto' : transmise via la messagerie de l'utilisateur */
export type SubmitResult = 'sent' | 'mailto';

export async function submitContactRequest(data: ContactRequest): Promise<SubmitResult> {
  if (supabase) {
    const { error } = await supabase.from('contact_requests').insert(data);
    if (error) throw error;
    return 'sent';
  }

  // Repli tant que Supabase n'est pas configuré : on ouvre un e-mail pré-rempli
  // plutôt que d'afficher un faux message de succès.
  const serviceLabel = SERVICE_OPTIONS.find((s) => s.value === data.service)?.label ?? data.service;
  const body = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone}`,
    data.company ? `Entreprise : ${data.company}` : null,
    `Service : ${serviceLabel}`,
    '',
    data.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Demande de consultation – ${serviceLabel}`,
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}

export async function subscribeToNewsletter(email: string): Promise<void> {
  if (!supabase) throw new Error('Newsletter non configurée');
  const { error } = await supabase.from('newsletter_subscribers').insert({ email });
  // 23505 : adresse déjà inscrite, on considère l'inscription comme réussie
  if (error && error.code !== '23505') throw error;
}
