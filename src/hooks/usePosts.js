import { useQuery, gql } from '@apollo/client';
import { localizeImage } from '@utils';
import { useTranslation } from 'react-i18next';

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 100) {
      nodes {
        title
        slug
        excerpt
        date
        featuredImage {
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
              sizes {
                name
                sourceUrl
              }
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

const getBestSize = (sizes) => {
  const best = sizes?.find(s => s.name === 'medium')
    || sizes?.find(s => s.name === 'medium_large');
  return best?.sourceUrl || '';
};

export function usePosts() {
  const { data, loading, error } = useQuery(GET_POSTS);
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const posts = (data?.posts?.nodes || []).map((post) => ({
    ...post,
    featuredImage: post.featuredImage?.node
      ? {
        node: {
          ...localizeImage(post.featuredImage.node, isEnglish),
          sourceUrl: getBestSize(post.featuredImage.node.mediaDetails?.sizes || [])
            || post.featuredImage.node.sourceUrl,
        },
      }
      : null,
  }));

  return { data: { ...data, posts: { nodes: posts } }, loading, error };
}