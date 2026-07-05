import { useHomeFields } from '@hooks';
import { Skeleton, SkeletonText, Image } from '@ui';

// Imágenes estáticas (no cambian, directo al frontend)
const TOP_BRUSH = 'https://cms.pablovester.com/wp-content/uploads/2025/03/transparent-brush-purple-pablovester-watercolor-2.png';
const BOTTOM_BRUSH = 'https://cms.pablovester.com/wp-content/uploads/2025/03/transparent-brush-purple-pablovester-watercolor-bottom.png';

export default function HeroSection() {
  const { artistPhoto, hero, loading} = useHomeFields();

  return (
    <section className="hero">
      <Image src={TOP_BRUSH} altLocalized="" className="hero__brush hero__brush--top" />
      <div className="hero__content-parent-container bg-primary">
        <div className="hero__content">
          <div className="hero__photo-wrapper">
            {loading || !artistPhoto ? (
              <Skeleton width={560} height={600} borderRadius="12px" className="hero__photo-skeleton" />
            ) : (
              <Image
                src={artistPhoto.url}
                altLocalized={artistPhoto.alt}
                titleLocalized={artistPhoto.title}
                className="hero__photo"
                fetchPriority="high"
                loading="lazy"
              />
            )}
          </div>

          <div className="hero__text">

            {loading ? (
              <>
                <SkeletonText lines={2} spacing="0.75rem" height="3rem" />
                <div style={{ height: '1rem' }} />
                <SkeletonText lines={3} spacing="0.75rem" height="2rem" />
                <div style={{ height: '1rem' }} />
                <SkeletonText lines={4} spacing="0.75rem" height="0.75rem" />
              </>) : (
              <>
                <h1 className="hero__title">{hero.title}</h1>
                <h2 className="hero__subtitle">{hero.subtitle}</h2>
                <p className="hero__description">{hero.description}</p>
                <a href="#contact-home-section" className="btn btn--white hero__cta">
                  {hero.cta}
                </a>
              </>
            )}

          </div>
        </div>
      </div>

      <Image src={BOTTOM_BRUSH} altLocalized="" className="hero__brush hero__brush--bottom" />
    </section>
  );
}