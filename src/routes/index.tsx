import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/index';
import NotFoundPage from '@/pages/NotFound/index';
import Investissements from '@/pages/Services/Investissements';
import Conseils from '@/pages/Services/Conseils';
import LeveeFonds from '@/pages/Services/LeveeFonds';
import FAQ from '@/pages/FAQ/index';
import Booking from '@/pages/Booking/index';

/**
 * Configuration du routeur.
 * Toutes les pages partagent le Layout (en-tête, pied de page) ;
 * la route 404 ('*') doit rester la dernière.
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'services/investissements', element: <Investissements /> },
        { path: 'services/conseils', element: <Conseils /> },
        { path: 'services/levee-fonds', element: <LeveeFonds /> },
        { path: 'faq', element: <FAQ /> },
        { path: 'rendez-vous', element: <Booking /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
