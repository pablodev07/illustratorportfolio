import { useQuery, gql } from '@apollo/client';
import { localizeImage } from '@utils';
import { useTranslation } from 'react-i18next';

const GET_GALLERY = gql`
  query GetGallery {
    mediaItems(first: 100) {
      nodes {
        id
        sourceUrl
        altText
        caption
        title
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
        attachmentCategories
      }
    }
  }
`;

const getBestSize = (sizes) => {
  const best = sizes?.find(s => s.name === 'medium') 
            || sizes?.find(s => s.name === 'medium_large');
  return best?.sourceUrl || '';
};

export function useGallery() {
  const { data, loading, error } = useQuery(GET_GALLERY);
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const rawImages = data?.mediaItems?.nodes || [];
  const images = rawImages.map((img) => ({
    ...localizeImage(img, isEnglish),
    sourceUrl: getBestSize(img.mediaDetails?.sizes || []) || img.sourceUrl,
    originalUrl: img.sourceUrl,
  }));

  return { data: { ...data, mediaItems: { nodes: images } }, loading, error };
}