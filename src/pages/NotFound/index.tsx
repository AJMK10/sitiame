import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/ui/Seo';

export default function NotFoundPage() {
  return (
    <section className="bg-muted">
      <Seo title="Page introuvable" description="La page demandée n'existe pas ou a été déplacée." path="/404" />
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-7xl font-semibold text-secondary sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Page introuvable</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            Retour à l'accueil <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/faq" className="btn-outline">
            Consulter la FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
