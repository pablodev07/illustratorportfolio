import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import CommissionsPage from './pages/CommissionsPage';
import ComicsPage from './pages/ComicsPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import PostPage from './pages/PostPage';
import ComicProjectPage from './pages/ComicProjectPage';
import { ErrorBoundary } from '@ui';

function LanguageSync() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const isEnglishPath = location.pathname.startsWith('/en/') || location.pathname === '/en';
    const newLang = isEnglishPath ? 'en' : 'es';

    if (i18n.language !== newLang) {
      i18n.changeLanguage(newLang);
    }
  }, [location.pathname, i18n]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Español (por defecto) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/dibujos" element={<GalleryPage />} />
      <Route path="/comisiones" element={<CommissionsPage />} />
      <Route path="/commission-tos-faq" element={<FAQPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/comics" element={<ComicsPage />} />
      <Route path="/comics/:project" element={<ComicProjectPage />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<PostPage />} />


      {/* Inglés */}
      <Route path="/en" element={<HomePage />} />
      <Route path="/en/dibujos" element={<GalleryPage />} />
      <Route path="/en/comisiones" element={<CommissionsPage />} />
      <Route path="/en/commission-tos-faq" element={<FAQPage />} />
      <Route path="/en/contacto" element={<ContactPage />} />
      <Route path="/en/comics" element={<ComicsPage />} />
      <Route path="/en/comics/:project" element={<ComicProjectPage />} />
      <Route path="/en/blog" element={<BlogPage />} />
      <Route path="/en/blog/:slug" element={<PostPage />} />

      {/*Not Found*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;