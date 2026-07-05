import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Image } from '@ui';
import PropTypes from 'prop-types';

export default function GalleryGrid({ images, showCaptions }) {
  if (!images || images.length === 0) return null;

  return (
    <Gallery
      options={{
        bgOpacity: 0.92,
        arrowKeys: true,
        loop: true,
        clickToClose: true,
        closeOnVerticalDrag: true,
        showHideAnimationType: 'fade',
        animDuration: 300,
        zoom: false,
        zoomAnimationDuration: false,
        easing: 'cubic-bezier(0.4, 0, 0.22, 1)',
        preloaderDelay: 200,
      }}
      withCaption={showCaptions}
    >
      <ul className="gallery-grid" role="list">
        {images.map((img) => (
          <li key={img.sourceUrl} role="listitem">
            <Item
              original={img.originalUrl || img.sourceUrl}
              thumbnail={img.sourceUrl}
              width={img.mediaDetails?.width || 1200}
              height={img.mediaDetails?.height || 1200}
              caption={img.captionLocalized || undefined}
            >
              {({ ref, open }) => (
                <button
                  ref={ref}
                  onClick={open}
                  className="gallery-item"
                  aria-label={img.altText || ''}
                >
                  <Image
                    src={img.sourceUrl}
                    altLocalized={img.altLocalized}
                    captionLocalized={img.captionLocalized}
                    titleLocalized={img.titleLocalized}
                    className="gallery-item__image"
                  />
                </button>
              )}
            </Item>
          </li>
        ))}
      </ul>
    </Gallery>
  );
}

GalleryGrid.propTypes = {
  images: PropTypes.array,
  showCaptions: PropTypes.bool,
};