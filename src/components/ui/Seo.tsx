import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/constants/site';

interface SeoProps {
  title?: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown>;
}

const SUFFIX = 'Sitiame Capital';

export default function Seo({ title, description, path = '/', jsonLd }: SeoProps) {
  const fullTitle = title ? `${title} | ${SUFFIX}` : `${SUFFIX} | Conseil en financement et investissement`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SUFFIX} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
