import { useQuery, gql } from '@apollo/client';
import { localizeImage } from '@utils';
import { useTranslation } from 'react-i18next';

const GET_COMIC_PAGE_IMAGES = gql`
  query GetComicPageImages($project: String!) {
    comicPages(where: { 
      orderby: { field: MENU_ORDER, order: ASC },
      metaQuery: { metaArray: [{ key: "project", value: $project, compare: EQUAL }] }
    }) {
      nodes {
        id
        title
        comicPageFields {
          project
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
              mediaDetails {
                width
                height
              }
            }
          }
          order
        }
      }
    }
  }
`;

export function useComicPageImages(project) {
  const { data, loading, error } = useQuery(GET_COMIC_PAGE_IMAGES, {
    variables: { project },
  });
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const images = (data?.comicPages?.nodes || []).map((page) => {
    const img = page.comicPageFields?.image?.node;
    return {
      id: page.id,
      ...(img ? localizeImage(img, isEnglish) : {}),
      titleLocalized: isEnglish && page.comicPageFields?.titleEn
        ? page.comicPageFields.titleEn
        : page.comicPageFields?.titleEs || '',
      descriptionLocalized: isEnglish && page.comicPageFields?.descriptionEn
        ? page.comicPageFields.descriptionEn
        : page.comicPageFields?.descriptionEs || '',
    };
  });

  return { images, loading, error };
}