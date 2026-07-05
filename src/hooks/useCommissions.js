import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const GET_COMMISSIONS = gql`
  query GetCommissions {
    pageBy(uri: "comisiones") {
      commissionsFields {
        pokemonImage { node { sourceUrl altText } }
        bustImage { node { sourceUrl altText } }
        pokemonTitleEs
        pokemonTitleEn
        pokemon1Usd
        pokemon2Usd
        pokemonExtraUsd
        bustUsd
        bustExtraUsd
        pokemonOpt1DescEs
        pokemonOpt1DescEn
        pokemonOpt2DescEs
        pokemonOpt2DescEn
        pokemonExtraDescEs
        pokemonExtraDescEn
        bustTitleEs
        bustTitleEn
        bustDescEs
        bustDescEn
        bustExtraDescEs
        bustExtraDescEn
        pokemonGalleryEs
        pokemonGalleryEn
        pokemonCtaEs
        pokemonCtaEn
        bustCtaEs
        bustCtaEn
        noteEs
        noteEn
        contactTitleEs
        contactTitleEn
        faqLinkEs
        faqLinkEn
      }
    }
  }
`;

export function useCommissions() {
  const { data, loading, error } = useQuery(GET_COMMISSIONS);
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const fields = data?.pageBy?.commissionsFields || {};

  return {
    images: {
      pokemon: fields.pokemonImage?.node?.sourceUrl || '',
      pokemonAlt: fields.pokemonImage?.node?.altText || '',
      bust: fields.bustImage?.node?.sourceUrl || '',
      bustAlt: fields.bustImage?.node?.altText || '',
    },
    pokemon: {
      title: isEnglish && fields.pokemonTitleEs ? fields.pokemonTitleEn : fields.pokemonTitleEs || '',
      price1: fields.pokemon1Usd || 12,
      price2: fields.pokemon2Usd || 25,
      extra: fields.pokemonExtraUsd || 10,
      opt1Desc: isEnglish && fields.pokemonOpt1DescEn ? fields.pokemonOpt1DescEn : fields.pokemonOpt1DescEs || '',
      opt2Desc: isEnglish && fields.pokemonOpt2DescEn ? fields.pokemonOpt2DescEn : fields.pokemonOpt2DescEs || '',
      extraDesc: isEnglish && fields.pokemonExtraDescEn ? fields.pokemonExtraDescEn : fields.pokemonExtraDescEs || '',
      galleryLink: isEnglish && fields.pokemonGalleryEn ? fields.pokemonGalleryEn : fields.pokemonGalleryEs || '',
      cta: isEnglish && fields.pokemonCtaEn ? fields.pokemonCtaEn : fields.pokemonCtaEs || '',
    },
    bust: {
      title: isEnglish && fields.bustTitleEs ? fields.bustTitleEn : fields.bustTitleEs || '',
      price: fields.bustUsd || 12,
      extra: fields.bustExtraUsd || 10,
      desc: isEnglish && fields.bustDescEn ? fields.bustDescEn : fields.bustDescEs || '',
      extraDesc: isEnglish && fields.bustExtraDescEn ? fields.bustExtraDescEn : fields.bustExtraDescEs || '',
      cta: isEnglish && fields.bustCtaEn ? fields.bustCtaEn : fields.bustCtaEs || '',
    },
    note: isEnglish && fields.noteEn ? fields.noteEn : fields.noteEs || '',
    contactTitle: isEnglish && fields.contactTitleEn ? fields.contactTitleEn : fields.contactTitleEs || '',
    faqLink: isEnglish && fields.faqLinkEn ? fields.faqLinkEn : fields.faqLinkEs || '',
    loading,
    error,
  };
}