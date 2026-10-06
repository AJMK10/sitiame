/** URLs et coordonnées du site */

export const SITE_URL = 'https://sitiame-capital.com';

export const SITE_PATHS = {
  references: `${SITE_URL}/nos-references`,
  forms: `${SITE_URL}/nos-formulaires`,
} as const;

export const PLATFORM_URLS = {
  nexasset: 'https://nexasset.sitiame-capital.com',
  bridge: 'https://bridge.sitiame-capital.com',
  pme360: 'https://erp.sitiame-capital.com/',
  assethub: 'https://assethub.sitiame-capital.com',
} as const;

/**
 * Vidéo de présentation. Tant que `src` est vide, le site affiche la présentation animée intégrée.
 * Pour utiliser une vraie vidéo, renseignez `src` avec :
 *  - un fichier hébergé (.mp4 ou .webm, par exemple '/video/presentation.mp4' placé dans /public/video/) ;
 *  - ou un lien YouTube (youtube.com/watch?v=… ou youtu.be/…).
 * `poster` est l'image affichée avant la lecture (facultatif).
 */
export const PROMO_VIDEO = {
  src: '',
  poster: '',
} as const satisfies { src: string; poster: string };

/**
 * Réseaux sociaux : renseignez l'URL complète pour faire apparaître un réseau
 * (en-tête et pied de page). Une URL vide masque le réseau.
 */
export const SOCIAL_LINKS = {
  facebook: '',
  linkedin: '',
  instagram: '',
  x: '',
  youtube: '',
} as const satisfies Record<string, string>;

export const CONTACT = {
  address: "Abidjan, Cocody Angré 8ème tranche, non loin du carrefour Solibra, Immeuble SAKI, 3ème étage, porte C3",
  city: "Abidjan, Côte d'Ivoire",
  phones: [
    { label: '+225 27 24 52 30 43', href: 'tel:+2252724523043' },
    { label: '+225 07 09 16 13 81', href: 'tel:+2250709161381' },
  ],
  email: 'contact@sitiame-capital.com',
  hours: 'Lundi – Vendredi, 8h00 – 17h00',
  whatsapp: '2250709161381',
} as const;
