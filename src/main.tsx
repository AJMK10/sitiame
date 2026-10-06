import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { router } from '@/routes';
import logo from '@/logo/sitiam.png';
import { installDomGuards } from '@/lib/domGuards';
import './index.css'

installDomGuards();

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
if (favicon) favicon.href = logo;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* Respecte la préférence système « réduire les animations » */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>,
)
