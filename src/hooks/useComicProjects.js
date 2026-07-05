import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { localizeImage } from '@utils';

const GET_COMIC_PROJECTS = gql`
  query GetComicProjects {
    comicProjects(where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        comicProjectFields {
          titleEs
          titleEn
          descriptionEs
          descriptionEn
          displayType
          coverImage {
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
            }
          }
          slug
          ctaEs
          ctaEn
        }
      }
    }
  }
`;

export function useComicProjects() {
    const { data, loading, error } = useQuery(GET_COMIC_PROJECTS);
    const { i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const projects = (data?.comicProjects?.nodes || []).map((project) => ({
        ...project,
        comicProjectFields: {
            ...project.comicProjectFields,
            displayType: Array.isArray(project.comicProjectFields?.displayType)
                ? project.comicProjectFields.displayType[0]
                : project.comicProjectFields?.displayType,
        },
    }));

    return { projects, loading, error };
}