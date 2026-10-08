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
  address: "Abidjan, Dokui à côté de la pharmacie Saint Odile",
  city: "Abidjan, Côte d'Ivoire",
  phones: [
    { label: '+225 07 77 44 39 95', href: 'tel:+2250777443995' },
    { label: '+225 07 88 24 50 17', href: 'tel:+2250788245017' },
    { label: '+225 27 22 53 36 56', href: 'tel:+2252722533656' },
  ],
  email: 'contact@sitiame-capital.com',
  hours: 'Lundi – Vendredi, 8h00 – 17h00',
  whatsapp: '2250777443995',
  maps: 'https://maps.app.goo.gl/MwAMKvRsnHuJ8WKc7',
} as const;
