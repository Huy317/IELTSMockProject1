import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './Routes.tsx'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/swiper-bundle.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
