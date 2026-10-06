import { Facebook, Instagram, Linkedin, MessageCircle, Twitter, Youtube, type LucideIcon } from 'lucide-react';
import { CONTACT, SOCIAL_LINKS } from '@/constants/site';
import { cn } from '@/lib/utils';

interface Network {
  id: string;
  label: string;
  icon: LucideIcon;
  url: string;
}

/** WhatsApp est toujours présent ; les autres réseaux n'apparaissent que si leur URL est renseignée. */
const NETWORKS: Network[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, url: `https://wa.me/${CONTACT.whatsapp}` },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  { id: 'facebook', label: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook },
  { id: 'instagram', label: 'Instagram', icon: Instagram, url: SOCIAL_LINKS.instagram },
  { id: 'x', label: 'X (Twitter)', icon: Twitter, url: SOCIAL_LINKS.x },
  { id: 'youtube', label: 'YouTube', icon: Youtube, url: SOCIAL_LINKS.youtube },
].filter((network) => network.url);

interface SocialLinksProps {
  className?: string;
  /** 'sm' pour la barre d'information, 'md' pour le pied de page */
  size?: 'sm' | 'md';
}

export default function SocialLinks({ className, size = 'md' }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-2', className)} aria-label="Réseaux sociaux">
      {NETWORKS.map(({ id, label, icon: Icon, url }) => (
        <li key={id}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Sitiame Capital sur ${label}`}
            title={label}
            className={cn(
              'flex items-center justify-center rounded-full border border-white/20 text-white/75 transition-all hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
              size === 'sm' ? 'h-7 w-7' : 'h-10 w-10',
            )}
          >
            <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-[18px] w-[18px]'} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
