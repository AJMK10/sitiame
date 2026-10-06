import { Check, MessageCircle, Phone } from 'lucide-react';
import BookingWidget from '@/components/BookingWidget';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import Seo from '@/components/ui/Seo';
import { CONTACT } from '@/constants/site';

const BENEFITS = [
  'Première consultation gratuite de 30 minutes',
  'Sans engagement : nous analysons vos besoins et vos options',
  "Confidentialité : NDA signé avant tout échange d'informations sensibles",
  'Confirmation du créneau par e-mail',
];

export default function Booking() {
  return (
    <>
      <Seo
        title="Prendre rendez-vous"
        description="Réservez en ligne une consultation gratuite de 30 minutes avec les experts de Sitiame Capital, du lundi au vendredi, de 8h à 17h (heure d'Abidjan)."
        path="/rendez-vous"
      />

      <PageHero
        eyebrow="Consultation gratuite"
        title="Prendre rendez-vous"
        description="Choisissez le créneau qui vous convient : un expert vous consacre 30 minutes pour étudier votre projet."
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Rendez-vous' }]}
      />

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal immediate className="lg:col-span-8">
            <BookingWidget />
          </Reveal>

          <Reveal immediate delay={0.1} className="lg:col-span-4">
            <aside className="space-y-6">
              <div className="rounded-xl bg-primary p-7 text-primary-foreground shadow-lift">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Ce qui vous attend</h2>
                <ul className="mt-5 space-y-4">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-7 shadow-card">
                <h2 className="font-serif text-xl font-semibold text-primary">Besoin d'un échange immédiat ?</h2>
                <p className="mt-2 text-sm text-muted-foreground">Joignez-nous directement pendant nos horaires d'ouverture.</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a href={CONTACT.phones[1].href} className="btn-outline">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {CONTACT.phones[1].label}
                  </a>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
