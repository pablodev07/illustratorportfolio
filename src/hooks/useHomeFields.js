import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const GET_HOME_FIELDS = gql`
  query GetHomeFields {
    pageBy(uri: "/") {
      featuredImage {
        node {
          sourceUrl
          altText
          title
          imageTranslations {
            altEn
            titleEn
          }
            mediaDetails {
      sizes {
        name
        sourceUrl
      }
    }
        }
      }
      homePageFields {
        heroTitleEs
        heroTitleEn
        heroSubtitleEs
        heroSubtitleEn
        heroDescriptionEs
        heroDescriptionEn
        heroCtaEs
        heroCtaEn
        galleryTitleEs
        galleryTitleEn
        galleryDescriptionEs
        galleryDescriptionEn
        galleryCtaEs
        galleryCtaEn
        blogTitleEs
        blogTitleEn
        blogDescriptionEs
        blogDescriptionEn
        blogReadMoreEs
        blogReadMoreEn
        blogCtaEs
        blogCtaEn
        newsletterTextEs
        newsletterTextEn
        newsletterCtaEs
        newsletterCtaEn
        contactTitleEs
        contactTitleEn
        contactDescriptionEs
        contactDescriptionEn
        contactImage {
          node {
            sourceUrl
            altText
            title
             imageTranslations {
                altEn
                captionEn
                titleEn
              }
          }
        }
      }
    }
  }
`;

export function useHomeFields() {
  const { data, loading, error } = useQuery(GET_HOME_FIELDS);
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const fields = data?.pageBy?.homePageFields || {};
  const fieldsFeatured = data?.pageBy?.featuredImage || {};
  const sizes = fieldsFeatured?.node?.mediaDetails?.sizes || [];

  const getBestSize = (sizes) => {
    const best = sizes?.find(s => s.name === 'medium_large')
      || sizes?.find(s => s.name === 'large');
    return best?.sourceUrl || '';
  };


  return {
    artistPhoto: {
      url: getBestSize(sizes) || fieldsFeatured?.node?.sourceUrl || '',
      alt: isEnglish && fieldsFeatured?.node?.imageTranslations?.altEn
        ? fieldsFeatured.node.imageTranslations.altEn
        : fieldsFeatured.node?.altText || '',
      title: isEnglish && fieldsFeatured.node?.imageTranslations?.titleEn
        ? fieldsFeatured.node.imageTranslations.titleEn
        : fieldsFeatured.node?.title || '',
    },
    hero: {
      title: isEnglish && fields.heroTitleEn ? fields.heroTitleEn : fields.heroTitleEs || '',
      subtitle: isEnglish && fields.heroSubtitleEn ? fields.heroSubtitleEn : fields.heroSubtitleEs || '',
      description: isEnglish && fields.heroDescriptionEn ? fields.heroDescriptionEn : fields.heroDescriptionEs || '',
      cta: isEnglish && fields.heroCtaEn ? fields.heroCtaEn : fields.heroCtaEs || '',
    },
    newsletter: {
      text: isEnglish && fields.newsletterTextEn ? fields.newsletterTextEn : fields.newsletterTextEs || '',
      cta: isEnglish && fields.newsletterCtaEn ? fields.newsletterCtaEn : fields.newsletterCtaEs || '',
    },
    contact: {
      title: isEnglish && fields.contactTitleEn ? fields.contactTitleEn : fields.contactTitleEs || '',
      description: isEnglish && fields.contactDescriptionEn ? fields.contactDescriptionEn : fields.contactDescriptionEs || '',
      image: fields.contactImage?.node?.sourceUrl || '',
      imageAlt: isEnglish && fields.contactImage?.node?.imageTranslations?.altEn
        ? fields.contactImage.node.imageTranslations.altEn
        : fields.contactImage?.node?.altText || '',
      imageTitle: isEnglish && fields.contactImage?.node?.imageTranslations?.titleEn
        ? fields.contactImage.node.imageTranslations.titleEn
        : fields.contactImage?.node?.title || '',
    },
    gallery: {
      title: isEnglish && fields.galleryTitleEn ? fields.galleryTitleEn : fields.galleryTitleEs || '',
      description: isEnglish && fields.galleryDescriptionEn ? fields.galleryDescriptionEn : fields.galleryDescriptionEs || '',
      cta: isEnglish && fields.galleryCtaEn ? fields.galleryCtaEn : fields.galleryCtaEs || '',
    },
    blog: {
      title: isEnglish && fields.blogTitleEn ? fields.blogTitleEn : fields.blogTitleEs || '',
      description: isEnglish && fields.blogDescriptionEn ? fields.blogDescriptionEn : fields.blogDescriptionEs || '',
      readMore: isEnglish && fields.blogReadMoreEn ? fields.blogReadMoreEn : fields.blogReadMoreEs || '',
      cta: isEnglish && fields.blogCtaEn ? fields.blogCtaEn : fields.blogCtaEs || '',
    },
    fields,
    loading,
    error,
  };
}