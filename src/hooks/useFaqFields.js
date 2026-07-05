import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const GET_FAQ_FIELDS = gql`
  query GetFaqFields($slug: String!) {
    pageBy(uri: $slug) {
      faqFields {
        faq1QEs
        faq1QEn
        faq1AEs
        faq1AEn
        faq2QEs
        faq2QEn
        faq2AEs
        faq2AEn
        faq3QEs
        faq3QEn
        faq3AEs
        faq3AEn
        faq4QEs
        faq4QEn
        faq4AEs
        faq4AEn
      }
    }
  }
`;

function buildFaqs(fields) {
  const faqs = [];
  for (let i = 1; i <= 4; i++) {
    const qEs = fields[`faq${i}QEs`];
    const qEn = fields[`faq${i}QEn`];
    const aEs = fields[`faq${i}AEs`];
    const aEn = fields[`faq${i}AEn`];
    if (qEs || qEn) {
      faqs.push({
        questionEs: qEs || '',
        questionEn: qEn || '',
        answerEs: aEs || '',
        answerEn: aEn || '',
      });
    }
  }
  return faqs;
}

export function useFaqFields(slug) {
  const { data, loading, error } = useQuery(GET_FAQ_FIELDS, {
    variables: { slug },
  });

  const fields = data?.pageBy?.faqFields || {};

  return {
    faqs: buildFaqs(fields),
    loading,
    error,
  };
}