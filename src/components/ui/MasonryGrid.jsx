import { Image } from '@ui';
import PropTypes from 'prop-types';

export default function MasonryGrid({ images, galleryLabel }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="masonry-grid" role="list" aria-label={galleryLabel}>
      {images.map((img) => (
        <div key={img.id} className="masonry-item" role="listitem">
          <Image
            src={img.sourceUrl}
            altLocalized={img.altLocalized}
            captionLocalized={img.captionLocalized}
            titleLocalized={img.titleLocalized}
            className="masonry-item__image"
          />
          <div className="masonry-item__body">
            {img.titleLocalized && (
              <h2 className="masonry-item__title">{img.titleLocalized}</h2>
            )}
            {img.captionLocalized && (
              <div className="masonry-item__description">
                <p>{img.captionLocalized}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

MasonryGrid.propTypes = {
  images: PropTypes.array,
  galleryLabel: PropTypes.string,
};