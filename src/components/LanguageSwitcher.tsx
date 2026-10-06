import { useEffect } from 'react';

declare global {
  interface Window {
    gtranslateSettings?: Record<string, unknown>;
  }
}

const SCRIPT_ID = 'gtranslate-widget';
const SCRIPT_SRC = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';

/** Sélecteur de langue GTranslate (traduction automatique). Le site est rédigé en français. */
export default function LanguageSwitcher() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    window.gtranslateSettings = {
      default_language: 'fr',
      languages: ['fr', 'en', 'es', 'pt', 'ar', 'de', 'zh-CN'],
      wrapper_selector: '.gtranslate_wrapper',
      native_language_names: true,
      select_language_label: 'Langue',
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return <div className="gtranslate_wrapper notranslate" translate="no" aria-label="Choisir la langue" />;
}
