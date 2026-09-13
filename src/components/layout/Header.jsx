import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '@ui';
import PropTypes from 'prop-types';

export default function Header({ linkedBlogPostEn, linkedBlogPostEs }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const prefix = i18n.language === 'en' ? '/en' : '';
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menú con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path.startsWith('http')) return false;
    const currentPath = location.pathname.replace(/^\/en/, '') || '/';
    return currentPath === path || (path !== '/' && currentPath.startsWith(path));
  };

  const navItems = [
    { path: '/dibujos', label: t('nav.drawings') },
    { path: '/comisiones', label: t('nav.commissions') },
    { path: '/comics', label: 'comics' },
    { path: 'https://pablovester.substack.com', label: 'newsletter' },
    { path: '/contacto', label: t('nav.contact') },
  ];

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        {/* Logo */}
        <div className="site-logo">
          <Link to={prefix || '/'} className="site-logo__main site-logo__link" aria-label={t('nav.home')}>
            <span className="site-logo__text japanese-title">ベスター</span>
          </Link>
          <p className="site-logo__subtitle">PABLO VESTER</p>
        </div>

        {/* Hamburguesa (solo mobile) */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>

        {/* Overlay */}
        <div
          className={`mobile-overlay ${menuOpen ? 'mobile-overlay--visible' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menú mobile + desktop */}
        <nav
          id="mobile-menu"
          className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
          aria-label={i18n.language === 'en' ? 'Main navigation' : 'Navegación principal'}
        >
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.path} className="site-nav__item">
                {item.path.startsWith('http') ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-nav__link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={`${prefix}${item.path}`}
                    className={`site-nav__link${isActive(item.path) ? ' site-nav__link--active' : ''}`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Language switcher en mobile (dentro del menú) */}
          <div className="site-nav__lang">
            <LanguageSwitcher linkedBlogPostEn={linkedBlogPostEn} linkedBlogPostEs={linkedBlogPostEs} />
          </div>
        </nav>

        {/* Language switcher en desktop */}
        <div className="site-header__lang-desktop">
          <LanguageSwitcher linkedBlogPostEn={linkedBlogPostEn} linkedBlogPostEs={linkedBlogPostEs} />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  linkedBlogPostEn: PropTypes.string,
  linkedBlogPostEs: PropTypes.string,
};