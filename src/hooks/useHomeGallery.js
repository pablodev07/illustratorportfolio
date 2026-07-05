import { useQuery, gql } from '@apollo/client';
import { localizeImage } from '@utils';
import { useTranslation } from 'react-i18next';

const GET_HOME_GALLERY = gql`
  query GetHomeGallery {
    homeGalleryImages(where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        featuredImage {
          node {
            sourceUrl
            altText
            caption
            databaseId
            imageTranslations {
              altEn
              captionEn
              titleEn
        }
        mediaDetails {
          width
          height
          sizes {
        name
        sourceUrl
      }
        }
          }
        }
      }
    }
  }
`;

export function useHomeGallery() {
  const { data, loading, error } = useQuery(GET_HOME_GALLERY);
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const rawImages = data?.homeGalleryImages?.nodes || [];
  const getBestSize = (sizes) => {
    const best = sizes?.find(s => s.name === 'medium_large')
      || sizes?.find(s => s.name === 'large');
    return best?.sourceUrl || '';
  };

  const images = rawImages.map((item) => {
    const img = item?.featuredImage?.node || {};
    const sizes = img?.mediaDetails?.sizes || [];
    return localizeImage(
      {
        sourceUrl: getBestSize(sizes) || img.sourceUrl,
        originalUrl: img.sourceUrl,
        altText: img.altText || '',
        caption: img.caption || '',
        title: img.title || '',
        imageTranslations: img.imageTranslations,
        mediaDetails: img.mediaDetails || { width: 1200, height: 1200 },
      },
      isEnglish
    );
  });
  return { images, loading, error };
}