import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import HashLink from '@/components/HashLink';
import CtaBand from '@/components/ui/CtaBand';
import PageHero from '@/components/ui/PageHero';
import Seo from '@/components/ui/Seo';
import { CONTACT } from '@/constants/site';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  // Services généraux
  {
    category: 'Services généraux',
    question: 'Quels sont les services proposés par Sitiame Capital ?',
    answer:
      "Sitiame Capital propose trois services principaux : les Investissements Stratégiques (identification et structuration d'investissements), les Conseils Stratégiques (diagnostic financier et planification), et la Levée de Fonds (accompagnement complet pour mobiliser des capitaux). Nous avons également 4 plateformes digitales spécialisées : NexAsset, Bridge, PME360 et AssetHub.",
  },
  {
    category: 'Services généraux',
    question: "À qui s'adressent vos services ?",
    answer:
      "Nos services s'adressent principalement aux PME/PMI africaines en phase de croissance, aux investisseurs institutionnels, aux family offices, et aux gestionnaires d'actifs. Nous accompagnons aussi bien les startups en phase seed que les entreprises établies cherchant à se développer.",
  },
  {
    category: 'Services généraux',
    question: 'Dans quels pays intervenez-vous ?',
    answer:
      "Sitiame Capital intervient principalement en Côte d'Ivoire et dans l'ensemble de l'Afrique de l'Ouest. Notre siège social est situé à Abidjan, mais nous accompagnons des projets dans toute la zone UEMOA et au-delà.",
  },

  // Investissements
  {
    category: 'Investissements',
    question: "Quels types d'investissements réalisez-vous ?",
    answer:
      "Nous accompagnons plusieurs types d'investissements : le capital-développement (financement de la croissance), le capital-risque (startups innovantes), les LBO/Transmissions (rachat d'entreprise), et les investissements sectoriels (agribusiness, fintech, énergie, santé, immobilier).",
  },
  {
    category: 'Investissements',
    question: "Quel est le montant minimum d'investissement ?",
    answer:
      "Le montant minimum varie selon le type de projet et le stade de développement de l'entreprise. Généralement, nous intervenons sur des tickets à partir de 50 000 USD. Contactez-nous pour discuter de votre projet spécifique.",
  },
  {
    category: 'Investissements',
    question: "Combien de temps prend le processus d'investissement ?",
    answer:
      "Le processus complet prend généralement entre 3 et 6 mois, comprenant l'analyse initiale, la due diligence, la structuration juridique et financière, et le closing. Ce délai peut varier selon la complexité du dossier.",
  },

  // Levée de fonds
  {
    category: 'Levée de fonds',
    question: 'Comment se déroule une levée de fonds avec Sitiame Capital ?',
    answer:
      "Notre processus se déroule en 5 étapes : (1) Analyse de vos besoins, (2) Préparation du dossier complet (business plan, prévisions), (3) Valorisation de votre entreprise, (4) Roadshow auprès d'investisseurs ciblés, (5) Négociation et closing. Nous vous accompagnons à chaque étape.",
  },
  {
    category: 'Levée de fonds',
    question: 'Quels sont les critères pour réussir une levée de fonds ?',
    answer:
      "Les principaux critères sont : un marché porteur avec un potentiel de croissance, une équipe managériale solide et expérimentée, un business model viable et scalable, des besoins de financement clairement identifiés, et une stratégie de sortie définie pour les investisseurs.",
  },
  {
    category: 'Levée de fonds',
    question: 'Travaillez-vous avec des investisseurs étrangers ?',
    answer:
      "Oui, notre réseau comprend des investisseurs locaux et internationaux, notamment des fonds d'investissement africains, des investisseurs institutionnels européens et américains, des family offices, et des business angels.",
  },

  // Plateformes
  {
    category: 'Plateformes',
    question: "Qu'est-ce que NexAsset ?",
    answer:
      "NexAsset est notre plateforme de gestion et de tokenisation d'actifs. Elle permet de digitaliser des actifs immobiliers et de les fractionner via la blockchain, rendant l'investissement plus accessible et liquide. C'est une solution innovante pour la gestion de patrimoine.",
  },
  {
    category: 'Plateformes',
    question: 'Comment fonctionne PME360 ?',
    answer:
      "PME360 est notre plateforme d'évaluation et de scoring des PME. Elle utilise des algorithmes avancés pour analyser la santé financière, le potentiel de croissance et les risques d'une entreprise. Cela aide les investisseurs à prendre des décisions éclairées et les PME à identifier leurs axes d'amélioration.",
  },
  {
    category: 'Plateformes',
    question: 'AssetHub est-elle accessible aux particuliers ?',
    answer:
      "AssetHub est principalement conçue pour les gestionnaires de portefeuilles professionnels et les investisseurs institutionnels. Cependant, nous proposons des solutions adaptées aux family offices et aux investisseurs privés qualifiés. Contactez-nous pour en savoir plus.",
  },

  // Tarifs & modalités
  {
    category: 'Tarifs & modalités',
    question: 'Quels sont vos tarifs ?',
    answer:
      "Nos tarifs sont personnalisés selon la nature et la complexité de votre projet. Pour les conseils stratégiques, nous travaillons généralement au forfait ou en honoraires journaliers. Pour les levées de fonds et investissements, nous appliquons une commission au succès. Contactez-nous pour un devis détaillé.",
  },
  {
    category: 'Tarifs & modalités',
    question: 'Proposez-vous des consultations gratuites ?',
    answer:
      "Oui, nous offrons une première consultation gratuite de 30 minutes pour analyser vos besoins et déterminer comment nous pouvons vous aider. Prenez rendez-vous en nous contactant au +225 07 09 16 13 81 ou via notre formulaire en ligne.",
  },
  {
    category: 'Tarifs & modalités',
    question: 'Signez-vous des accords de confidentialité ?',
    answer:
      "Absolument. La confidentialité est primordiale dans notre métier. Nous signons systématiquement un NDA (accord de non-divulgation) avant tout échange d'informations sensibles sur votre entreprise ou votre projet.",
  },

  // Contact & support
  {
    category: 'Contact & support',
    question: 'Comment prendre rendez-vous avec vos experts ?',
    answer:
      "Vous pouvez prendre rendez-vous par téléphone au +225 27 24 52 30 43 ou +225 07 09 16 13 81, par e-mail à contact@sitiame-capital.com, via notre formulaire de contact en ligne, ou par WhatsApp. Nous vous recontacterons dans les 24h pour confirmer votre rendez-vous.",
  },
  {
    category: 'Contact & support',
    question: "Quels sont vos horaires d'ouverture ?",
    answer:
      "Nos bureaux sont ouverts du lundi au vendredi de 8h00 à 17h00. Pour les urgences ou demandes en dehors de ces horaires, vous pouvez nous contacter sur WhatsApp au +225 07 09 16 13 81.",
  },
  {
    category: 'Contact & support',
    question: 'Où se trouvent vos bureaux ?',
    answer:
      "Notre siège social est situé à Abidjan, Cocody Angré 8ème tranche, non loin du carrefour Solibra, Immeuble SAKI, 3ème étage, porte C3. Nous recevons sur rendez-vous.",
  },
];

const ALL = 'Toutes';
const CATEGORIES = [ALL, ...Array.from(new Set(FAQ_DATA.map((item) => item.category)))];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_DATA.filter(
      (item) =>
        (category === ALL || item.category === category) &&
        (!q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const resetFilters = () => {
    setQuery('');
    setCategory(ALL);
  };

  return (
    <>
      <Seo
        title="Questions fréquentes"
        description="Réponses aux questions fréquentes sur les services, les processus d'investissement et de levée de fonds, les plateformes et les modalités de collaboration avec Sitiame Capital."
        path="/faq"
        jsonLd={faqJsonLd}
      />

      <PageHero
        eyebrow="Aide & informations"
        title="Questions fréquentes"
        description="Trouvez rapidement des réponses sur nos services, nos processus et nos plateformes."
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'FAQ' }]}
      />

      <section className="bg-muted py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="faq-search" className="sr-only">
                Rechercher une question
              </label>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une question…"
                className="field py-4 pl-12 text-base"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
              {CATEGORIES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  aria-pressed={category === name}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    category === name
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary',
                  )}
                >
                  {name}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground" role="status">
              {results.length} question{results.length > 1 ? 's' : ''}
            </p>

            {results.length === 0 ? (
              <div className="mt-4 rounded-xl border border-border bg-card p-10 text-center">
                <p className="text-muted-foreground">Aucune question ne correspond à votre recherche.</p>
                <button type="button" onClick={resetFilters} className="mt-4 text-sm font-semibold text-primary underline">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {results.map((item, i) => {
                  const isOpen = openQuestion === item.question;
                  const panelId = `faq-panel-${i}`;
                  return (
                    <div key={item.question} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                      <h2 className="font-sans">
                        <button
                          type="button"
                          onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/60"
                        >
                          <span>
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gold-ink">
                              {item.category}
                            </span>
                            <span className="block text-base font-semibold text-primary sm:text-lg">{item.question}</span>
                          </span>
                          <ChevronDown
                            className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                      </h2>
                      {isOpen && (
                        <div id={panelId} role="region" className="border-t border-border px-6 pb-6 pt-4">
                          <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="Vous n'avez pas trouvé votre réponse ?"
        description="Notre équipe est à votre disposition pour répondre à toutes vos questions spécifiques."
      >
        <a href={CONTACT.phones[1].href} className="btn-gold">
          Nous appeler
        </a>
        <HashLink sectionId="contact" className="btn-outline-light">
          Envoyer un message
        </HashLink>
      </CtaBand>
    </>
  );
}
