import { CONTACT } from '@/constants/site';
import { SERVICE_OPTIONS } from '@/lib/leads';
import { supabase } from '@/lib/supabase';

/*
 * Tous les calculs se font en UTC : Abidjan est à UTC+0 toute l'année (pas d'heure d'été),
 * donc l'heure d'Abidjan est l'heure UTC.
 */

export const SLOT_MINUTES = 30;
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 17;
/** Délai minimum entre maintenant et le début d'un créneau */
export const MIN_LEAD_HOURS = 2;
/** Nombre de jours réservables à l'avance */
export const HORIZON_DAYS = 60;

export const pad = (n: number) => String(n).padStart(2, '0');

export const dateKey = (date: Date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

export const parseKey = (key: string) => new Date(`${key}T00:00:00.000Z`);

/** Lundi à vendredi */
export function isWeekday(key: string): boolean {
  const day = parseKey(key).getUTCDay();
  return day >= 1 && day <= 5;
}

/** Tous les créneaux (ISO UTC) d'une journée : 8h00, 8h30 … 16h30. */
export function slotsForDate(key: string): string[] {
  const slots: string[] = [];
  for (let minutes = OPEN_HOUR * 60; minutes + SLOT_MINUTES <= CLOSE_HOUR * 60; minutes += SLOT_MINUTES) {
    slots.push(`${key}T${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00.000Z`);
  }
  return slots;
}

export function isSlotBookable(iso: string, booked: Set<string>, nowMs = Date.now()): boolean {
  return Date.parse(iso) >= nowMs + MIN_LEAD_HOURS * 3_600_000 && !booked.has(iso);
}

export const formatSlotTime = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getUTCHours())}h${pad(d.getUTCMinutes())}`;
};

export const formatLongDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
}

export class SlotTakenError extends Error {
  constructor() {
    super('Ce créneau vient d\'être réservé.');
  }
}

/** Créneaux déjà pris sur une période (vide si Supabase n'est pas configuré). */
export async function fetchBookedSlots(from: Date, to: Date): Promise<Set<string>> {
  if (!supabase) return new Set();
  const { data, error } = await supabase.rpc('booked_slots', {
    range_start: from.toISOString(),
    range_end: to.toISOString(),
  });
  if (error || !Array.isArray(data)) return new Set();
  return new Set((data as string[]).map((value) => new Date(value).toISOString()));
}

const topicLabel = (value: string) => SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;

/** 'booked' : enregistré en base · 'mailto' : demande préparée dans la messagerie de l'utilisateur */
export type BookingResult = 'booked' | 'mailto';

export async function bookAppointment(startsAt: string, details: BookingDetails): Promise<BookingResult> {
  if (supabase) {
    const { error } = await supabase.from('appointments').insert({ starts_at: startsAt, ...details });
    if (error) {
      // 23505 : le créneau vient d'être pris par quelqu'un d'autre
      if (error.code === '23505') throw new SlotTakenError();
      throw error;
    }
    return 'booked';
  }

  const body = [
    `Demande de rendez-vous : ${formatLongDate(startsAt)} à ${formatSlotTime(startsAt)} (heure d'Abidjan, GMT)`,
    `Durée : ${SLOT_MINUTES} minutes`,
    '',
    `Nom : ${details.name}`,
    `E-mail : ${details.email}`,
    `Téléphone : ${details.phone}`,
    details.company ? `Entreprise : ${details.company}` : null,
    `Sujet : ${topicLabel(details.topic)}`,
    details.message ? `\n${details.message}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Demande de rendez-vous – ${formatLongDate(startsAt)} ${formatSlotTime(startsAt)}`,
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}

/** Fichier .ics pour ajouter le rendez-vous à Google Agenda, Outlook, Apple Calendar… */
export function downloadIcs(startsAt: string, details: BookingDetails) {
  const stamp = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = new Date(Date.parse(startsAt) + SLOT_MINUTES * 60_000).toISOString();
  const escape = (text: string) => text.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');

  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sitiame Capital//Rendez-vous//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${stamp(startsAt)}-${Math.random().toString(36).slice(2, 10)}@sitiame-capital.com`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(startsAt)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape('Consultation – Sitiame Capital')}`,
    `DESCRIPTION:${escape(`Sujet : ${topicLabel(details.topic)}\nContact : ${CONTACT.phones[1].label} · ${CONTACT.email}`)}`,
    `LOCATION:${escape(CONTACT.address)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rendez-vous-sitiame-capital.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
