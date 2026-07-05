import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GalleryGrid, LoadingText } from '@ui';
import { useHomeGallery, useHomeFields, useSnapReveal } from '@hooks';

export default function HomeGallerySection() {
  const { t, i18n } = useTranslation();
  const { images, loading } = useHomeGallery();
  const { gallery } = useHomeFields();
  const sectionRef = useSnapReveal();
  const prefix = i18n.language === 'en' ? '/en' : '';

  if (!loading && images.length === 0) return null;

  return (
    <section ref={sectionRef} className="home-gallery section" aria-labelledby="home-gallery-title">
      <div className="container">
        <h2 id="home-gallery-title" className="home-gallery__title">
          {gallery.title}
        </h2>
        <span className="home-gallery__subtitle japanese">
          これは私の芸術です
        </span>
        <p className="home-gallery__description">
          {gallery.description}
        </p>

        {loading && <LoadingText isLoading={loading} text={t('common.loading')} />}
        {!loading && <GalleryGrid images={images} />}

        {gallery.cta && (
          <div style={{ textAlign: 'center', marginTop: '$space-xl' }}>
            <Link to={`${prefix}/dibujos`} className="btn btn--primary">
              {gallery.cta}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}