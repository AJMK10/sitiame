import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Clock, ExternalLink, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import FloatingActions from './FloatingActions';
import Newsletter from './Newsletter';
import SocialLinks from './SocialLinks';
import LanguageSwitcher from './LanguageSwitcher';
import HashLink from './HashLink';
import ScrollToTop from './ScrollToTop';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { cn } from '@/lib/utils';
import logo from '@/logo/sitiam.png';
import { CONTACT, SITE_PATHS } from '@/constants/site';
import { PLATFORMS } from '@/content/platforms';
import { SERVICES } from '@/content/services';

const navItem =
  'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary';
const dropdownItem =
  'flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none';

const blurActive = () => (document.activeElement as HTMLElement | null)?.blur();

function NavDropdown({ label, active, children }: { label: string; active?: boolean; children: ReactNode }) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cn(navItem, active && 'text-primary')}>
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-lg border border-border bg-background py-1 shadow-lift">{children}</div>
      </div>
    </div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{children}</h3>;
}

const footerLink = 'text-sm text-white/70 transition-colors hover:text-white';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useScrollToHash();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const onServicePage = location.pathname.startsWith('/services');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const mobileLink = 'block py-3 text-lg font-serif text-primary transition-colors hover:text-gold-ink';
  const mobileGroupLabel = 'pb-1 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground';

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-secondary focus:px-4 focus:py-2 focus:text-secondary-foreground"
      >
        Aller au contenu
      </a>

      {/* Barre d'information */}
      <div className="hidden bg-primary text-xs text-white/75 lg:block">
        <div className="container flex h-10 items-center justify-between">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            {CONTACT.city}
            <span className="mx-2 text-white/30" aria-hidden="true">
              |
            </span>
            <Clock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            {CONTACT.hours}
          </p>
          <div className="flex items-center gap-6">
            <a href={CONTACT.phones[1].href} className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
              {CONTACT.phones[1].label}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden="true" />
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow',
          isScrolled ? 'border-border shadow-card' : 'border-transparent',
        )}
      >
        <div
          className={cn(
            'container flex h-[4.5rem] items-center justify-between gap-6 transition-[height] duration-300',
            isScrolled ? 'lg:h-[4.25rem]' : 'lg:h-20',
          )}
        >
          <Link to="/" className="shrink-0" aria-label="Sitiame Capital – Accueil">
            <img
              src={logo}
              alt="Sitiame Capital"
              className={cn(
                'h-14 w-auto object-contain transition-all duration-300',
                isScrolled ? 'lg:h-14' : 'lg:h-16',
              )}
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => cn(navItem, isActive && 'text-primary')}>
              Accueil
            </NavLink>
            <HashLink sectionId="about" className={navItem}>
              À propos
            </HashLink>

            <NavDropdown label="Expertises" active={onServicePage}>
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.slug} to={service.path} onClick={blurActive} className={dropdownItem}>
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-primary">{service.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">{service.summary}</span>
                    </span>
                  </Link>
                );
              })}
            </NavDropdown>

            <NavDropdown label="Plateformes">
              {PLATFORMS.map((platform) =>
                platform.available ? (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={blurActive}
                    className={dropdownItem}
                  >
                    <platform.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="flex items-center justify-between text-sm font-semibold text-primary">
                        {platform.name}
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{platform.short}</span>
                    </span>
                  </a>
                ) : (
                  <span
                    key={platform.id}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-start gap-3 px-4 py-3 opacity-50 grayscale"
                  >
                    <platform.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
                        {platform.name}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                          Bientôt
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{platform.short}</span>
                    </span>
                  </span>
                ),
              )}
            </NavDropdown>

            <NavLink to="/faq" className={({ isActive }) => cn(navItem, isActive && 'text-primary')}>
              FAQ
            </NavLink>
          </nav>

          <LanguageSwitcher />

          <div className="hidden lg:block">
            <Link to="/rendez-vous" className="btn-primary px-5 py-2.5">
              Prendre rendez-vous
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 rounded-md p-2 text-primary lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-secondary"
        />
      </header>

      {mobileOpen &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col bg-background lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <nav className="container flex-1 overflow-y-auto overscroll-contain py-4">
              <Link to="/" className={mobileLink} onClick={closeMobile}>
                Accueil
              </Link>
              <HashLink sectionId="about" className={mobileLink} onNavigate={closeMobile}>
                À propos
              </HashLink>

              <p className={mobileGroupLabel}>Expertises</p>
              {SERVICES.map((service) => (
                <Link key={service.slug} to={service.path} className={mobileLink} onClick={closeMobile}>
                  {service.title}
                </Link>
              ))}

              <p className={mobileGroupLabel}>Plateformes</p>
              {PLATFORMS.map((platform) =>
                platform.available ? (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(mobileLink, 'flex items-center justify-between')}
                    onClick={closeMobile}
                  >
                    {platform.name}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={platform.id}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center justify-between py-3 font-serif text-lg text-muted-foreground opacity-60"
                  >
                    {platform.name}
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider">
                      Bientôt
                    </span>
                  </span>
                ),
              )}

              <p className={mobileGroupLabel}>Informations</p>
              <Link to="/faq" className={mobileLink} onClick={closeMobile}>
                Questions fréquentes
              </Link>
            </nav>
            <div className="border-t border-border bg-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link to="/rendez-vous" onClick={closeMobile} className="btn-primary w-full">
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>,
          document.body,
        )}

      <main id="contenu" className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <Newsletter />

        <div className="container py-14 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex rounded-md bg-white px-3 py-1.5">
                <img src={logo} alt="Sitiame Capital" className="h-11 w-auto object-contain" />
              </span>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
                Société de conseil en financement et investissement. Nous accompagnons les PME/PMI africaines dans leur
                développement et mobilisons le capital nécessaire à leur croissance.
              </p>
              <address className="mt-6 space-y-2.5 text-sm not-italic text-white/70">
                <p className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {CONTACT.address}
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {CONTACT.phones.map((phone, i) => (
                    <span key={phone.href}>
                      {i > 0 && <span className="mr-2 text-white/30">/</span>}
                      <a href={phone.href} className="transition-colors hover:text-white">
                        {phone.label}
                      </a>
                    </span>
                  ))}
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                    {CONTACT.email}
                  </a>
                </p>
              </address>
              <SocialLinks className="mt-6" />
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <FooterHeading>Expertises</FooterHeading>
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link to={service.path} className={footerLink}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <FooterHeading>Plateformes</FooterHeading>
              <ul className="space-y-3">
                {PLATFORMS.map((platform) => (
                  <li key={platform.id}>
                    {platform.available ? (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(footerLink, 'inline-flex items-center gap-1.5')}
                      >
                        {platform.name}
                        <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
                      </a>
                    ) : (
                      <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2 text-sm text-white/30">
                        {platform.name}
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                          Bientôt
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <FooterHeading>Ressources</FooterHeading>
              <ul className="space-y-3">
                <li>
                  <Link to="/rendez-vous" className={footerLink}>
                    Prendre rendez-vous
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className={footerLink}>
                    Questions fréquentes
                  </Link>
                </li>
                <li>
                  <a href={SITE_PATHS.references} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    Nos références
                  </a>
                </li>
                <li>
                  <a href={SITE_PATHS.forms} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    Formulaire de présentation de projet
                  </a>
                </li>
                <li>
                  <a href={SITE_PATHS.forms} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    Adhésion – personne morale
                  </a>
                </li>
                <li>
                  <a href={SITE_PATHS.forms} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    Adhésion – personne physique
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container flex flex-col items-center justify-between gap-3 py-6 pb-24 text-center text-xs text-white/55 sm:flex-row sm:text-left lg:pb-6">
            <p>© {new Date().getFullYear()} Sitiame Capital. Tous droits réservés.</p>
            <p>
              Devise : RAS — <span className="text-secondary">R</span>esponsabilité · <span className="text-secondary">A</span>mbition ·{' '}
              <span className="text-secondary">S</span>olidarité
            </p>
          </div>
        </div>
      </footer>

      {!mobileOpen && <FloatingActions />}
    </div>
  );
}
