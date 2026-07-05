import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

//Hook para traer title y description de todas las páginas

const GET_PAGE_BY_URI = gql`
  query GetPageByUri($slug: String!) {
    pageBy(uri: $slug) {
      pageFields {
        titleEs
        titleEn
        descriptionEs
        descriptionEn
      }
    }
  }
`;

const GET_PAGE_BY_ID = gql`
  query GetPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      pageFields {
        titleEs
        titleEn
        descriptionEs
        descriptionEn
      }
    }
  }
`;

export function usePageFields(slug, isId = false) {
  const query = isId ? GET_PAGE_BY_ID : GET_PAGE_BY_URI;
  const variables = isId ? { id: slug } : { slug };

  const { data, loading, error } = useQuery(query, { variables });

  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const pageData = data?.pageBy || data?.page;
  const fields = pageData?.pageFields || {};

  return {
    title: isEnglish && fields.titleEn ? fields.titleEn : fields.titleEs || '',
    description: isEnglish && fields.descriptionEn ? fields.descriptionEn : fields.descriptionEs || '',
    loading,
    error,
  };
}