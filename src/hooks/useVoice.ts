import { useCallback, useEffect, useRef, useState } from 'react';

/* L'API de reconnaissance vocale n'est pas typée par TypeScript : on décrit le strict nécessaire. */
interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecognitionEvent {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionConstructor = new () => Recognition;

function getRecognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type VoiceError = 'denied' | 'no-speech' | 'unavailable';

/** Nettoie un texte de chat (emojis, gras, puces, numéros, e-mails) pour qu'il soit lu naturellement. */
export function toSpokenText(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/\p{Extended_Pictographic}|️|⃣/gu, '')
    .replace(/^\s*[•✅]\s*/gm, '')
    .replace(/\+225\s?(\d{10})/g, (_match, digits: string) => `plus 225, ${digits.replace(/(\d{2})(?=\d)/g, '$1 ')}`)
    .replace(/@/g, ' arobase ')
    .replace(/\.com/g, ' point com')
    .replace(/([.:!?])\s*\n+/g, '$1 ')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

interface UseVoiceOptions {
  /** Appelé avec la phrase reconnue quand l'utilisateur a fini de parler. */
  onFinal: (text: string) => void;
}

export function useVoice({ onFinal }: UseVoiceOptions) {
  const recognitionRef = useRef<Recognition | null>(null);
  const onFinalRef = useRef(onFinal);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<VoiceError | null>(null);

  const recognitionSupported = getRecognitionConstructor() !== null;
  const synthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    onFinalRef.current = onFinal;
  });

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1;
    const frenchVoice = synth.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('fr'));
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.speak(utterance);
  }, []);

  const startListening = useCallback(() => {
    const Recognition = getRecognitionConstructor();
    if (!Recognition) {
      setError('unavailable');
      return;
    }
    stopSpeaking();
    recognitionRef.current?.abort();

    const recognition = new Recognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    let finalText = '';
    recognition.onresult = (event) => {
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      setInterim(interimText || finalText);
    };
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') setError('denied');
      else if (event.error === 'no-speech') setError('no-speech');
      else if (event.error !== 'aborted') setError('unavailable');
    };
    recognition.onend = () => {
      setListening(false);
      setInterim('');
      const text = finalText.trim();
      if (text) onFinalRef.current(text);
    };

    setError(null);
    setInterim('');
    try {
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    } catch {
      setError('unavailable');
    }
  }, [stopSpeaking]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  /** Coupe tout (micro et voix de synthèse), sans envoyer ce qui a été capté. */
  const cancelAll = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    }
    setListening(false);
    setInterim('');
    stopSpeaking();
  }, [stopSpeaking]);

  useEffect(() => cancelAll, [cancelAll]);

  return {
    listening,
    interim,
    speaking,
    error,
    recognitionSupported,
    synthesisSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    cancelAll,
  };
}
