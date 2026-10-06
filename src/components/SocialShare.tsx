import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check, RefreshCw } from 'lucide-react';

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
}

const shareTexts = [
  "🚀 Découvrez Sitiame Capital : votre partenaire pour un investissement gagnant en Afrique ! #Finance #Investissement #PME #Afrique",
  "💼 Besoin de financement pour votre PME ? Sitiame Capital vous accompagne ! #LeveeDeFonds #ConseilStratégique #PMEAfricaine",
  "🌍 L'excellence financière africaine commence ici avec Sitiame Capital #FinanceAfricaine #Innovation #Croissance",
  "📈 4 plateformes spécialisées pour booster votre business : NexAsset, Bridge, PME360, AssetHub #Fintech #Digital",
  "💡 Conseil en financement et investissement pour les PME/PMI africaines #Business #Consulting #Investment",
  "🎯 Transformez vos ambitions en succès avec nos experts en finance #StrategieDEntreprise #Accompagnement",
  "⚡ Solutions financières sur-mesure pour propulser votre croissance #PME #Financement #Développement",
  "🏆 15+ ans d'expertise au service des entreprises africaines #Excellence #Expertise #SitiameCapital",
  "💰 Investissements stratégiques | Conseils | Levée de fonds #ServicesFinanciers #Afrique",
  "🌟 Votre réussite est notre mission ! Découvrez nos services #RAS #Responsabilité #Ambition #Solidarité",
  "📊 Scoring PME, gestion d'actifs, transactions sécurisées... tout en un écosystème #TechFinance",
  "🤝 Connectons les PME africaines aux opportunités d'investissement #NetworkingBusiness #Partenariat",
  "🔥 L'innovation financière au service de votre entreprise #DigitalTransformation #Banking",
  "💎 Des solutions premium pour des résultats exceptionnels #LuxuryBusiness #PremiumServices",
  "🎓 Expertise, rigueur et accompagnement personnalisé #ConseillerFinancier #Professionnel",
  "🌐 De Abidjan vers toute l'Afrique : votre croissance sans frontières #ExpansionAfricaine",
  "✨ Sitiame Capital : où la finance traditionnelle rencontre l'innovation digitale #Hybrid #Future",
  "📱 Plateformes technologiques de pointe pour optimiser vos investissements #TechSavvy #Smart",
  "🎯 Diagnostic, structuration, financement : nous gérons tout de A à Z #SolutionComplete",
  "🚀 Prêt à franchir une nouvelle étape ? Contactez-nous dès maintenant ! #Action #Succès"
];

export default function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : ''
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const currentShareText = shareTexts[currentTextIndex];
  const encodedText = encodeURIComponent(currentShareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${currentShareText}\n\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRefreshText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % shareTexts.length);
  };

  const handleShare = (platform: string) => {
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-primary border border-secondary/30 rounded-lg transition-all duration-300 font-medium"
        aria-label="Partager"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 z-50 w-96 bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-primary">Partager sur les réseaux</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Share Text Preview */}
            <div className="bg-background border border-border rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-3">{currentShareText}</p>
              <button
                onClick={handleRefreshText}
                className="inline-flex items-center gap-2 text-xs text-secondary hover:text-secondary/80 transition-colors font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                Changer le texte
              </button>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center gap-2 p-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xs font-medium text-foreground">Facebook</span>
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-4 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xs font-medium text-foreground">Twitter</span>
              </button>

              <button
                onClick={() => handleShare('linkedin')}
                className="flex flex-col items-center gap-2 p-4 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xs font-medium text-foreground">LinkedIn</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copier le texte et le lien
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
