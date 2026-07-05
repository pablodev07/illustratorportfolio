import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LanguageSwitcher({ linkedBlogPostEn, linkedBlogPostEs }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const switchLanguage = (lang) => {
    const path = location.pathname;
    const prefix = lang === 'en' ? '/en' : '';
    const linked = lang === 'en' ? linkedBlogPostEn : linkedBlogPostEs;

    // 1. Si hay traducción vinculada, ir al post equivalente
    if (linked) return navigate(`${prefix}/blog/${linked}`);

    // 2. Si es un post individual sin traducción, volver al blog
    if (path.includes('/blog/')) return navigate(`${prefix}/blog`);

    // 3. Para cualquier otra página, cambiar el prefijo de idioma
    const newPath = lang === 'en'
      ? (path.startsWith('/en/') ? path : `/en${path}`)
      : (path.replace('/en', '') || '/');

    i18n.changeLanguage(lang);
    navigate(newPath);
  };

  const isEnglish = i18n.language === 'en';

  return (
    <nav className="lang-switcher" aria-label="Selección de idioma">
      <button
        onClick={() => switchLanguage('es')}
        className={`lang-switcher__btn${!isEnglish ? ' lang-switcher__btn--active' : ''}`}
        aria-pressed={!isEnglish}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`lang-switcher__btn${isEnglish ? ' lang-switcher__btn--active' : ''}`}
        aria-pressed={isEnglish}
        aria-label="Switch to English"
      >
        EN
      </button>
    </nav>
  );
}

LanguageSwitcher.propTypes = {
  linkedBlogPostEn: PropTypes.string,
  linkedBlogPostEs: PropTypes.string,
};