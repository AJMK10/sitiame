import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { toSpokenText, useVoice, type VoiceError } from '@/hooks/useVoice';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'bonjour': 'Bonjour ! Bienvenue chez Sitiame Capital. Comment puis-je vous aider aujourd\'hui ? 😊',
  'hello': 'Bonjour ! Bienvenue chez Sitiame Capital. Comment puis-je vous aider aujourd\'hui ? 😊',
  'salut': 'Bonjour ! Bienvenue chez Sitiame Capital. Comment puis-je vous aider aujourd\'hui ? 😊',
  
  'services': 'Nous proposons 3 services principaux :\n\n1️⃣ **Investissements stratégiques** - Identification et structuration d\'investissements\n2️⃣ **Conseils stratégiques** - Diagnostic financier et planification\n3️⃣ **Levée de fonds** - Accompagnement complet pour mobiliser des capitaux\n\nQue souhaitez-vous approfondir ?',
  
  'investissement': 'Nos services d\'investissement incluent :\n• Analyse de marché approfondie\n• Structuration financière optimale\n• Due diligence rigoureuse\n• Mise en relation avec investisseurs\n\nVoulez-vous en savoir plus sur un aspect spécifique ?',
  
  'conseil': 'Nos conseils stratégiques couvrent :\n• Diagnostic financier complet\n• Planification stratégique\n• Restructuration d\'entreprise\n• Gouvernance d\'entreprise\n\nSouhaitez-vous discuter de votre projet avec nos experts ?',
  
  'levée de fonds': 'Notre accompagnement levée de fonds comprend :\n• Préparation du dossier complet\n• Évaluation et valorisation\n• Mise en relation investisseurs\n• Négociation et closing\n\nContactez-nous pour démarrer votre levée !',
  
  'plateformes': 'Nous avons 4 plateformes digitales :\n\n🏢 **NexAsset** - Gestion et tokenisation d\'actifs\n🌉 **Bridge** - Transactions sécurisées\n📊 **PME360** - Scoring et évaluation PME\n💼 **AssetHub** - Gestion de portefeuilles\n\nQuelle plateforme vous intéresse ?',
  
  'tarifs': 'Nos tarifs sont personnalisés selon votre projet et vos besoins. Pour obtenir un devis détaillé, je vous invite à :\n\n📞 Nous contacter au +225 0709161381\n📧 Nous écrire à contact@sitiame-capital.com\n📝 Remplir le formulaire de contact\n\nNos experts vous répondront rapidement !',
  
  'contact': 'Vous pouvez nous contacter de plusieurs façons :\n\n📍 **Adresse** : Abidjan, Cocody angré 8ème tranche, Immeuble SAKI, 3ème étage porte C3\n📞 **Téléphone** : +225 2724523043 / +225 0709161381\n📧 **Email** : contact@sitiame-capital.com\n⏰ **Horaires** : Lundi - Vendredi : 8:00 à 17:00\n\nVoulez-vous prendre rendez-vous ?',
  
  'horaires': 'Nos horaires d\'ouverture sont :\n\n📅 **Lundi à Vendredi** : 8h00 - 17h00\n🚫 **Week-end** : Fermé\n\nPour une urgence, contactez-nous sur WhatsApp : +225 0709161381',
  
  'rendez-vous': 'Pour prendre rendez-vous avec nos experts :\n\n1. Appelez-nous au +225 0709161381\n2. Envoyez un message WhatsApp\n3. Remplissez le formulaire de contact sur le site\n\nNous vous recontacterons dans les 24h pour confirmer !',
  
  'pme': 'Sitiame Capital accompagne les PME/PMI africaines dans :\n\n✅ Leur développement stratégique\n✅ La mobilisation de capitaux\n✅ L\'accès aux investisseurs institutionnels\n✅ L\'optimisation de leur structure financière\n\nVotre PME a un projet ? Parlons-en !',
  
  'secteurs': 'Nous intervenons dans plusieurs secteurs à forte croissance :\n\n🌾 Agribusiness\n💳 Fintech\n⚡ Énergie\n🏥 Santé\n🏗️ Immobilier\n🏭 Industrie\n\nVotre secteur d\'activité ?',
  
  'merci': 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Nous sommes là pour vous accompagner dans votre réussite ! 🚀',
  
  'default': 'Je ne suis pas sûr de comprendre votre question. Pour une réponse personnalisée, je vous invite à :\n\n• Contacter nos experts au +225 0709161381\n• Nous écrire à contact@sitiame-capital.com\n• Consulter notre page FAQ\n\nComment puis-je vous aider autrement ?'
};

const QUICK_REPLIES = [
  'Vos services ?',
  'Investissements',
  'Levée de fonds',
  'Nos plateformes',
  'Contactez-nous'
];


interface ChatbotProps {
  open: boolean;
  onClose: () => void;
  /** Ouvert via « Assistant vocal » : active la lecture à voix haute et lance le micro. */
  autoVoice?: boolean;
}

const VOICE_ERRORS: Record<VoiceError, string> = {
  denied: "Micro bloqué : autorisez l'accès au micro dans votre navigateur, puis réessayez.",
  'no-speech': "Je n'ai rien entendu. Appuyez sur le micro et réessayez.",
  unavailable: "La reconnaissance vocale n'est pas disponible. Vous pouvez écrire votre question.",
};

export default function Chatbot({ open, onClose, autoVoice = false }: ChatbotProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [speakReplies, setSpeakReplies] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de Sitiame Capital. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const spokenIdRef = useRef('1');

  const voice = useVoice({ onFinal: (text) => handleSendMessage(text) });
  const { startListening, stopListening, cancelAll, speak, stopSpeaking, recognitionSupported } = voice;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mode vocal : à l'ouverture, on active la lecture des réponses et on écoute tout de suite.
  useEffect(() => {
    if (!open || !autoVoice) return;
    setSpeakReplies(true);
    if (recognitionSupported) startListening();
  }, [open, autoVoice, recognitionSupported, startListening]);

  // Fermeture de la fenêtre : on coupe le micro et la voix.
  useEffect(() => {
    if (!open) cancelAll();
  }, [open, cancelAll]);

  // Lecture à voix haute de chaque nouvelle réponse du bot.
  useEffect(() => {
    if (!open || !speakReplies) return;
    const last = messages[messages.length - 1];
    if (last.sender !== 'bot' || last.id === spokenIdRef.current) return;
    spokenIdRef.current = last.id;
    speak(toSpokenText(last.text));
  }, [messages, open, speakReplies, speak]);

  const toggleSpeakReplies = () => {
    if (speakReplies) stopSpeaking();
    setSpeakReplies((enabled) => !enabled);
  };

  const findResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }

    return FAQ_RESPONSES.default;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!open) return null;

  const statusLabel = voice.listening
    ? 'Je vous écoute…'
    : voice.speaking
      ? 'Je vous réponds…'
      : 'Assistant virtuel';

  return (
    <div
      role="dialog"
      aria-label="Assistant virtuel Sitiame Capital"
      className={`fixed z-50 bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 inset-x-4 sm:inset-x-auto sm:right-6 bottom-24 max-h-[min(600px,calc(100vh-8rem))] flex flex-col ${
        isMinimized ? 'sm:w-80' : 'sm:w-96 h-[min(600px,75vh)]'
      }`}
    >
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            {(voice.listening || voice.speaking) && (
              <span className="absolute inset-0 rounded-full bg-secondary/50 animate-ping" aria-hidden="true" />
            )}
            <MessageCircle className="relative w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Assistant Sitiame</h3>
            <p className="text-xs text-white/80" role="status">{statusLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {voice.synthesisSupported && (
            <button
              onClick={toggleSpeakReplies}
              aria-pressed={speakReplies}
              aria-label={speakReplies ? 'Désactiver la lecture à voix haute' : 'Activer la lecture à voix haute'}
              title={speakReplies ? 'Lecture à voix haute activée' : 'Lecture à voix haute désactivée'}
              className={`p-2 rounded-lg transition-colors ${speakReplies ? 'bg-white/15 text-secondary' : 'hover:bg-white/10'}`}
            >
              {speakReplies ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Agrandir l'assistant" : "Réduire l'assistant"}
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Fermer l'assistant"
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-4 bg-background">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs bg-secondary/10 hover:bg-secondary/20 text-primary px-3 py-2 rounded-full transition-colors border border-secondary/30"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={voice.listening ? voice.interim : inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                readOnly={voice.listening}
                aria-label="Votre message"
                placeholder={voice.listening ? 'Je vous écoute…' : recognitionSupported ? 'Écrivez ou parlez…' : 'Tapez votre message...'}
                className="flex-1 min-w-0 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-sm"
              />
              {recognitionSupported && (
                <button
                  onClick={voice.listening ? stopListening : startListening}
                  aria-pressed={voice.listening}
                  aria-label={voice.listening ? "Arrêter l'écoute" : 'Parler à l\'assistant'}
                  title={voice.listening ? "Arrêter l'écoute" : 'Parler à l\'assistant'}
                  className={`relative p-3 rounded-lg transition-all ${
                    voice.listening ? 'bg-red-600 text-white' : 'bg-secondary text-secondary-foreground hover:brightness-110'
                  }`}
                >
                  {voice.listening && (
                    <span className="absolute inset-0 rounded-lg bg-red-500/50 animate-ping" aria-hidden="true" />
                  )}
                  {voice.listening ? <MicOff className="relative w-5 h-5" /> : <Mic className="relative w-5 h-5" />}
                </button>
              )}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || voice.listening}
                aria-label="Envoyer"
                className="bg-primary hover:bg-primary/90 text-white p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {voice.error && (
              <p role="alert" className="text-xs text-destructive mt-2">{VOICE_ERRORS[voice.error]}</p>
            )}
            {autoVoice && !recognitionSupported && (
              <p role="alert" className="text-xs text-destructive mt-2">
                Ce navigateur ne gère pas la reconnaissance vocale. Essayez Chrome, Edge ou Safari, ou écrivez votre question.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {recognitionSupported
                ? 'Réponses automatiques · Voix gérée par votre navigateur'
                : 'Réponses automatiques · Pour un avis personnalisé, contactez notre équipe'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
