import {
  BarChart3,
  Building2,
  DollarSign,
  FileCheck,
  FileText,
  Handshake,
  Lightbulb,
  Network,
  Shield,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface Offering {
  icon: LucideIcon;
  title: string;
  description: string;
  points?: string[];
}

export interface Step {
  title: string;
  description: string;
}

export interface ServiceContent {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  icon: LucideIcon;
  /** Résumé court, affiché sur l'accueil */
  summary: string;
  lead: string;
  introTitle: string;
  intro: string[];
  offeringsTitle: string;
  offerings: Offering[];
  typesTitle?: string;
  types?: Step[];
  processTitle?: string;
  process?: Step[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
}

export const SERVICES: ServiceContent[] = [
  {
    slug: 'investissements',
    path: '/services/investissements',
    title: 'Investissements stratégiques',
    shortTitle: 'Investissements',
    eyebrow: 'Investissements',
    icon: Building2,
    summary:
      "Identification des critères d'investissement clés, où la combinaison de notre expertise et des conditions du marché garantit les meilleurs résultats.",
    lead:
      "Identification des critères d'investissement clés où la combinaison de notre expertise et des conditions du marché garantit les meilleurs résultats pour votre entreprise.",
    introTitle: 'Maximisez la valeur de vos actifs',
    intro: [
      "Chez Sitiame Capital, nous comprenons que chaque décision d'investissement est cruciale pour l'avenir de votre entreprise. Notre équipe combine une connaissance approfondie du marché africain avec des méthodologies d'analyse rigoureuses pour identifier les opportunités les plus prometteuses.",
      "Nous accompagnons les PME/PMI dans la structuration de leurs besoins de financement et mettons en relation les entreprises avec des investisseurs institutionnels et privés alignés sur leurs objectifs de croissance.",
    ],
    offeringsTitle: "Notre approche en matière d'investissement",
    offerings: [
      {
        icon: Target,
        title: 'Analyse de marché approfondie',
        description:
          "Analyse détaillée du secteur, de la concurrence et des tendances du marché pour identifier les opportunités à fort potentiel de croissance.",
      },
      {
        icon: TrendingUp,
        title: 'Structuration financière optimale',
        description:
          "Structures de financement adaptées à votre situation, combinant capitaux propres, dette et instruments hybrides pour optimiser votre coût du capital.",
      },
      {
        icon: Shield,
        title: 'Due diligence rigoureuse',
        description:
          "Vérification approfondie de tous les aspects de l'investissement (financier, juridique, opérationnel et stratégique) pour minimiser les risques.",
      },
      {
        icon: Network,
        title: 'Mise en relation investisseurs',
        description:
          "Un réseau d'investisseurs institutionnels, de family offices et de fonds d'investissement pour faciliter les connexions stratégiques autour de votre projet.",
      },
    ],
    typesTitle: "Types d'investissements accompagnés",
    types: [
      {
        title: 'Capital-développement',
        description: "Financement de la croissance organique et externe des PME en phase d'expansion.",
      },
      {
        title: 'Capital-risque',
        description: 'Investissement dans des startups innovantes à fort potentiel de croissance.',
      },
      {
        title: 'LBO / Transmission',
        description: "Accompagnement des opérations de rachat d'entreprise et de transmission.",
      },
      {
        title: 'Investissements sectoriels',
        description: 'Secteurs à forte croissance : agribusiness, fintech, énergie, santé, immobilier.',
      },
    ],
    ctaTitle: 'Prêt à investir dans votre croissance ?',
    ctaText:
      "Nos experts analysent vos besoins d'investissement et vous proposent des solutions sur mesure.",
    ctaLabel: 'Demander une consultation',
  },
  {
    slug: 'conseils',
    path: '/services/conseils',
    title: 'Conseils stratégiques',
    shortTitle: 'Conseils stratégiques',
    eyebrow: 'Expertise stratégique',
    icon: BarChart3,
    summary:
      "Diagnostic économique et financier, analyse des opportunités de développement et assistance à la gestion d'actifs.",
    lead:
      "Diagnostic économique et financier, buy stratégique, assistance à l'analyse des opportunités de développement et à la gestion d'actifs pour propulser votre entreprise.",
    introTitle: 'Transformez votre vision en stratégie gagnante',
    intro: [
      "Dans un environnement économique en constante évolution, les PME africaines ont besoin d'une vision claire et d'une stratégie robuste pour se démarquer et prospérer. Sitiame Capital met à votre disposition une équipe de consultants qui comprennent les défis spécifiques des entreprises africaines.",
      "Notre approche combine analyse financière rigoureuse, compréhension approfondie des marchés et expertise sectorielle pour vous fournir des recommandations actionnables et mesurables.",
    ],
    offeringsTitle: "Nos domaines d'intervention",
    offerings: [
      {
        icon: FileText,
        title: 'Diagnostic financier complet',
        description:
          "Analyse de votre situation financière, identification des forces et faiblesses, et recommandations pour optimiser votre structure financière.",
        points: ['Analyse des états financiers', 'Évaluation de la rentabilité', 'Diagnostic de trésorerie'],
      },
      {
        icon: Target,
        title: 'Planification stratégique',
        description:
          "Stratégie de développement à moyen et long terme, alignée sur vos objectifs et sur les opportunités de marché.",
        points: ['Business plan détaillé', 'Modélisation financière', "Plans d'action opérationnels"],
      },
      {
        icon: Lightbulb,
        title: "Restructuration d'entreprise",
        description:
          "Accompagnement des phases de transformation organisationnelle, de fusion-acquisition et d'optimisation des processus.",
        points: ['Réorganisation opérationnelle', 'Fusions & acquisitions', 'Optimisation des coûts'],
      },
      {
        icon: Users,
        title: "Gouvernance d'entreprise",
        description:
          "Mise en place de structures de gouvernance efficaces et conformes aux meilleures pratiques internationales.",
        points: ["Conseil d'administration", 'Contrôle interne', 'Gestion des risques'],
      },
    ],
    processTitle: 'Notre méthodologie',
    process: [
      {
        title: 'Diagnostic initial',
        description: 'Analyse de votre situation actuelle, de vos défis et de vos objectifs stratégiques.',
      },
      {
        title: 'Analyse et recommandations',
        description:
          'Recommandations stratégiques fondées sur des données concrètes et des benchmarks sectoriels.',
      },
      {
        title: "Plan d'action détaillé",
        description:
          'Feuille de route claire : étapes, responsabilités et indicateurs de performance.',
      },
      {
        title: 'Accompagnement à la mise en œuvre',
        description: "Suivi régulier de l'implémentation et ajustements selon les résultats obtenus.",
      },
    ],
    ctaTitle: 'Donnez une nouvelle dimension à votre stratégie',
    ctaText:
      "Bénéficiez de l'expertise de nos consultants pour transformer vos ambitions en résultats concrets.",
    ctaLabel: 'Planifier un diagnostic',
  },
  {
    slug: 'levee-fonds',
    path: '/services/levee-fonds',
    title: 'Levée de fonds',
    shortTitle: 'Levée de fonds',
    eyebrow: 'Financement sur mesure',
    icon: Network,
    summary:
      "Identification des besoins de trésorerie, évaluation de la structure de financement, des conditions de levée et des garanties.",
    lead:
      "Identification des besoins de trésorerie, évaluation de la structure de financement, des conditions de levée de fonds et des garanties pour propulser votre croissance.",
    introTitle: 'Mobilisez le capital nécessaire à votre croissance',
    intro: [
      "La levée de fonds est une étape cruciale dans le développement de toute entreprise. Que vous cherchiez à financer votre croissance, développer de nouveaux produits ou conquérir de nouveaux marchés, Sitiame Capital vous accompagne à chaque phase.",
      "Nous structurons des opérations adaptées à votre secteur, à votre stade de développement et à vos ambitions, en mobilisant notre réseau d'investisseurs institutionnels, de fonds d'investissement et d'investisseurs privés.",
    ],
    offeringsTitle: 'Un accompagnement de A à Z',
    offerings: [
      {
        icon: FileCheck,
        title: 'Préparation de votre dossier',
        description: "Constitution d'un dossier complet et convaincant pour les investisseurs potentiels.",
        points: [
          'Business plan détaillé',
          'Prévisions financières',
          'Pitch deck professionnel',
          "Mémorandum d'information",
        ],
      },
      {
        icon: DollarSign,
        title: 'Évaluation et valorisation',
        description: "Détermination d'une valorisation juste et défendable de votre entreprise.",
        points: [
          'Analyse comparative de marché',
          'Méthode DCF (flux de trésorerie)',
          'Multiples sectoriels',
          'Stratégie de négociation',
        ],
      },
      {
        icon: Network,
        title: 'Mise en relation investisseurs',
        description: "Accès à un réseau d'investisseurs qualifiés, ciblés pour votre projet.",
        points: [
          "Fonds d'investissement africains",
          'Investisseurs institutionnels',
          'Family offices',
          'Business angels',
        ],
      },
      {
        icon: Handshake,
        title: 'Négociation et closing',
        description: 'Accompagnement des négociations et finalisation de la transaction.',
        points: [
          'Négociation des termes',
          "Term sheet & pacte d'actionnaires",
          'Due diligence investisseurs',
          'Signature et déblocage des fonds',
        ],
      },
    ],
    typesTitle: 'Types de financement accompagnés',
    types: [
      {
        title: 'Seed & Pre-Seed',
        description: 'Financement de démarrage pour valider votre concept et développer votre MVP.',
      },
      {
        title: 'Série A, B, C+',
        description: 'Levées de fonds pour accélérer votre croissance et votre expansion.',
      },
      {
        title: 'Dette & Mezzanine',
        description: 'Financement par emprunt ou instruments hybrides pour optimiser votre structure.',
      },
    ],
    processTitle: 'Notre processus en 5 étapes',
    process: [
      {
        title: 'Analyse des besoins',
        description: 'Évaluation précise de vos besoins de financement et définition de la stratégie optimale.',
      },
      {
        title: 'Préparation',
        description: 'Constitution du dossier complet et création des documents de présentation.',
      },
      {
        title: 'Valorisation',
        description: "Détermination de la valeur de votre entreprise et des conditions de financement.",
      },
      {
        title: 'Roadshow',
        description: 'Présentation de votre projet aux investisseurs ciblés et gestion des rendez-vous.',
      },
      {
        title: 'Closing',
        description: 'Négociation finale, signature des accords et déblocage des fonds.',
      },
    ],
    ctaTitle: 'Prêt à lever des fonds ?',
    ctaText:
      "Nos experts vous accompagnent pour structurer et réussir votre levée de fonds. Parlons de votre projet.",
    ctaLabel: 'Démarrer ma levée de fonds',
  },
];

export function getService(slug: string): ServiceContent {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) throw new Error(`Service inconnu : ${slug}`);
  return service;
}
