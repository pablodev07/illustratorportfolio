import { useQuery, gql } from '@apollo/client';

const GET_POST = gql`
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    postTranslations {
  linkedPostEn {
    nodes {
      ... on Post {
        slug
      }
    }
  }
  linkedPostEs {
    nodes {
      ... on Post {
        slug
      }
    }
  }
}
    }
  }
`;

export function usePost(slug) {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { slug },
  });

  return { data, loading, error };
}