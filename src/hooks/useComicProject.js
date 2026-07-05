import { useQuery, gql } from '@apollo/client';
import { localizeImage } from '@utils';
import { useTranslation } from 'react-i18next';

const GET_COMIC_PROJECT = gql`
  query GetComicProject {
    comicPages(first: 100) {
      nodes {
        id
        comicPageFields {
          project
          order
          titleEs
          titleEn
          descriptionEs
          descriptionEn
          image {
            node {
              sourceUrl
              altText
              caption
              title
              imageTranslations {
                altEn
                captionEn
                titleEn
              }
              mediaDetails { width height }
            }
          }
        }
      }
    }
  }
`;

export function useComicProject(project) {
    const { data, loading, error } = useQuery(GET_COMIC_PROJECT);
    const { i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const allNodes = data?.comicPages?.nodes || [];

    const nodes = allNodes
        .filter((node) => node.comicPageFields?.project === project)
        .sort((a, b) => {
            const orderA = parseInt(a.comicPageFields?.order) || 999;
            const orderB = parseInt(b.comicPageFields?.order) || 999;
            return (parseInt(orderA) || 999) - (parseInt(orderB) || 999);
        });

    const images = nodes.map((page) => {
        const img = page.comicPageFields?.image?.node;
        const localized = img ? localizeImage(img, isEnglish) : {};
        return {
            id: page.id,
            sourceUrl: localized.sourceUrl || '',
            altLocalized: localized.altLocalized || '',
            captionLocalized: localized.captionLocalized || '',
            titleLocalized: localized.titleLocalized || '',
            titleLocalizedFromParent: isEnglish && page.comicPageFields?.titleEn
                ? page.comicPageFields.titleEn
                : page.comicPageFields?.titleEs || localized.titleLocalized || '',
            descriptionLocalized: isEnglish && page.comicPageFields?.descriptionEn
                ? page.comicPageFields.descriptionEn
                : page.comicPageFields?.descriptionEs || '',
            mediaDetails: localized.mediaDetails || { width: 1200, height: 1200 },
        };
    });

    const displayType = images.find((img) => img.displayType)?.displayType || 'masonry';

    return { images, displayType, loading, error };
}