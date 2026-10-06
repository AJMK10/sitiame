import { BarChart3, Building2, Network, PieChart, type LucideIcon } from 'lucide-react';
import { PLATFORM_URLS } from '@/constants/site';

export interface Platform {
  id: string;
  name: string;
  tagline: string;
  short: string;
  description: string;
  url: string;
  icon: LucideIcon;
  /** Faux : la plateforme est affichée grisée et non cliquable. */
  available: boolean;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'nexasset',
    name: 'NexAsset',
    tagline: 'Gestion & Tokenisation',
    short: "Gestion et valorisation d'actifs",
    description:
      "Plateforme de nouvelle génération dédiée à la gestion et à la valorisation des actifs physiques et digitaux, intégrant des solutions avancées de tokenisation immobilière.",
    url: PLATFORM_URLS.nexasset,
    icon: Building2,
    available: false,
  },
  {
    id: 'bridge',
    name: 'Bridge',
    tagline: 'Connectivité & Transactions',
    short: "Passerelle d'investissement",
    description:
      "La passerelle d'investissement stratégique qui connecte les acteurs financiers, pour des transactions sécurisées et fluides à travers les marchés.",
    url: PLATFORM_URLS.bridge,
    icon: Network,
    available: false,
  },
  {
    id: 'pme360',
    name: 'PME360',
    tagline: 'Compatibilité & Scoring',
    short: 'Scoring et compatibilité PME',
    description:
      "Solution d'évaluation des PME : analyse de la santé financière, scores de solvabilité précis et optimisation de la structuration de la dette.",
    url: PLATFORM_URLS.pme360,
    icon: BarChart3,
    available: true,
  },
  {
    id: 'assethub',
    name: 'AssetHub',
    tagline: 'Portefeuilles & Dérivés',
    short: 'Portefeuilles & produits dérivés',
    description:
      "Le centre névralgique de la gestion de portefeuilles institutionnels et du traitement des produits dérivés complexes, avec des analyses en temps réel.",
    url: PLATFORM_URLS.assethub,
    icon: PieChart,
    available: false,
  },
];
