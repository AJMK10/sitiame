import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Mic, Phone, X } from 'lucide-react';
import Chatbot from './Chatbot';
import { CONTACT } from '@/constants/site';

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Bonjour, je souhaite obtenir plus d'informations sur vos services.",
)}`;

const itemClass =
  'flex items-center gap-3 rounded-full bg-background py-2 pl-5 pr-2 text-sm font-semibold text-primary shadow-lift ring-1 ring-border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary';

/** Un seul bouton flottant qui regroupe l'assistant virtuel, WhatsApp et l'appel direct. */
export default function FloatingActions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  const openChat = (voice: boolean) => {
    setMenuOpen(false);
    setVoiceMode(voice);
    setChatOpen(true);
  };

  const toggle = () => {
    // Si l'assistant est ouvert, le bouton le referme ; sinon il ouvre/ferme le menu.
    if (chatOpen) setChatOpen(false);
    else setMenuOpen((open) => !open);
  };

  const active = menuOpen || chatOpen;

  return (
    <>
      <Chatbot open={chatOpen} autoVoice={voiceMode} onClose={() => setChatOpen(false)} />

      <div ref={rootRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="floating-actions-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }, hidden: {} }}
              className="flex flex-col items-end gap-2.5"
            >
              {[
                {
                  key: 'voice',
                  label: 'Assistant vocal',
                  icon: Mic,
                  tone: 'bg-secondary text-secondary-foreground',
                  render: (children: React.ReactNode) => (
                    <button type="button" onClick={() => openChat(true)} className={itemClass}>
                      {children}
                    </button>
                  ),
                },
                {
                  key: 'chat',
                  label: 'Assistant écrit',
                  icon: Bot,
                  tone: 'bg-primary text-secondary',
                  render: (children: React.ReactNode) => (
                    <button type="button" onClick={() => openChat(false)} className={itemClass}>
                      {children}
                    </button>
                  ),
                },
                {
                  key: 'whatsapp',
                  label: 'WhatsApp',
                  icon: MessageCircle,
                  tone: 'bg-green-600 text-white',
                  render: (children: React.ReactNode) => (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className={itemClass}
                    >
                      {children}
                    </a>
                  ),
                },
                {
                  key: 'call',
                  label: 'Appeler',
                  icon: Phone,
                  tone: 'bg-secondary text-secondary-foreground',
                  render: (children: React.ReactNode) => (
                    <a href={CONTACT.phones[0].href} onClick={() => setMenuOpen(false)} className={itemClass}>
                      {children}
                    </a>
                  ),
                },
              ].map(({ key, label, icon: Icon, tone, render }) => (
                <motion.li
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {render(
                    <>
                      {label}
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tone}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </>,
                  )}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={menuOpen}
          aria-controls="floating-actions-menu"
          aria-label={active ? 'Fermer' : 'Nous contacter'}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary shadow-lift ring-2 ring-secondary/60 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary active:scale-95"
        >
          {!active && (
            <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-secondary/30 [animation-duration:3s]" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {active ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
