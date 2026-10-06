import { Building, Users, Award, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HashLink from '@/components/HashLink';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const officeImages = [
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      title: 'Espace de travail moderne',
      description: 'Nos bureaux à Abidjan - Cocody Angré'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      title: 'Salle de réunion',
      description: 'Espace dédié aux consultations clients'
    },
    {
      url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      title: 'Open space',
      description: 'Zone collaborative de notre équipe'
    },
    {
      url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      title: 'Vue extérieure',
      description: 'Immeuble SAKI - Notre siège social'
    }
  ];

  const teamImages = [
    {
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
      title: 'Réunion stratégique',
      description: 'Notre équipe en session de planification'
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      title: 'Collaboration',
      description: 'Travail d\'équipe sur un projet client'
    },
    {
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      title: 'Présentation client',
      description: 'Session de conseil avec nos partenaires'
    },
    {
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      title: 'Formation continue',
      description: 'Développement des compétences de l\'équipe'
    }
  ];

  const eventsImages = [
    {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      title: 'Conférence annuelle',
      description: 'Événement Sitiame Capital 2024'
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      title: 'Networking',
      description: 'Rencontre avec nos partenaires investisseurs'
    },
    {
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      title: 'Célébration',
      description: 'Succès d\'une levée de fonds majeure'
    },
    {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      title: 'Séminaire',
      description: 'Formation sur les innovations financières'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary pt-24 sm:pt-28 pb-12 sm:pb-16 md:py-20">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
              <ImageIcon className="w-4 h-4 text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">Notre Univers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Galerie Photos
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Découvrez nos bureaux, notre équipe et les moments clés de Sitiame Capital.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Bureaux */}
      <section id="bureaux" className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Building className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Nos Bureaux
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section id="equipe" className="py-16 bg-card">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Notre Équipe en Action
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements */}
      <section id="evenements" className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Événements & Moments Clés
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventsImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Visitez nos bureaux
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Venez rencontrer notre équipe dans nos locaux à Abidjan. Nous serons ravis de vous accueillir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HashLink
                sectionId="contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Prendre rendez-vous
              </HashLink>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
