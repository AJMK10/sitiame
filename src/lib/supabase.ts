import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

/** Vrai uniquement si les variables d'environnement Supabase sont renseignées. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Client Supabase, ou null tant que le projet n'est pas configuré. */
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type { SupabaseClient } from '@supabase/supabase-js';
