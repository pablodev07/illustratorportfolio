import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categoryKeys } from '@utils';
import { useGallery, usePageFields } from '@hooks';
import { GalleryGrid, Skeleton, LoadingText } from '@ui';

export default function GallerySection() {
  const { data, loading, error } = useGallery();
  const { title, description } = usePageFields('dibujos');
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const hash = location.hash.replace('#', '');
  const [activeFilter, setActiveFilter] = useState(hash || 'todos');

  useEffect(() => {
    setActiveFilter(hash || 'todos');
  }, [hash]);

  if (loading) {
    return (
      <section className="gallery container" aria-labelledby="gallery-title">
       <LoadingText isLoading={loading} text={t('common.loading')} />
        <div className="gallery-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="gallery-item">
              <Skeleton width="100%" height="280px" borderRadius="0" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) return <p>{t('common.error', { message: error.message })}</p>;

  const images = data?.mediaItems?.nodes || [];
  const galleryImages = images.filter((img) =>
    img.attachmentCategories?.includes('gallery')
  );

  const EXCLUDED_CATEGORIES = ['gallery', 'comicsaguilas', 'fanzinebook'];
  const categoriesSet = new Set();
  galleryImages.forEach((img) => {
    img.attachmentCategories?.forEach((cat) => {
      if (!EXCLUDED_CATEGORIES.includes(cat)) {
        categoriesSet.add(cat);
      }
    });
  });
  const categories = Array.from(categoriesSet).sort();

  const filteredImages =
    activeFilter === 'todos'
      ? galleryImages
      : galleryImages.filter((img) =>
        img.attachmentCategories?.includes(activeFilter)
      );

  const prefix = i18n.language === 'en' ? '/en' : '';
  const handleFilterClick = (slug) => {
    if (slug === 'todos') {
      navigate(`${prefix}/dibujos`);
    } else {
      navigate(`${prefix}/dibujos#${slug}`);
    }
    setActiveFilter(slug);
  };

  return (
    <section className="gallery container" aria-labelledby="gallery-title">
      <h1 id="gallery-title" className="gallery__title page_title">{title}</h1>
      <div className="gallery__description" dangerouslySetInnerHTML={{ __html: description }}/>
      <p className="gallery__instructions">{t('gallery.instructions')}</p>

      <div className="gallery-filters">
        <button
          onClick={() => handleFilterClick('todos')}
          className={`btn btn--pill${activeFilter === 'todos' ? ' btn--pill-active' : ''}`}
        >
          {t('gallery.all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            className={`btn btn--pill${activeFilter === cat ? ' btn--pill-active' : ''}`}
          >
            {t(categoryKeys[cat] || cat)}
          </button>
        ))}
      </div>

      <GalleryGrid images={filteredImages} showCaptions={true} />

      {filteredImages.length === 0 && (
        <p className="gallery-empty">{t('gallery.empty')}</p>
      )}
    </section>
  );
}