import { useQuery, gql } from '@apollo/client';

const GET_COTIZACION = gql`
  query GetCotizacion {
    cotizacionDolar
  }
`;

export function useCotizacion() {
  const { data, loading, error } = useQuery(GET_COTIZACION, {
    fetchPolicy: 'cache-first', // Usar caché de Apollo
    nextFetchPolicy: 'cache-first', // Solo refetch si expiró
  });

  return {
    cotizacion: data?.cotizacionDolar || 1450,
    loading,
    error,
  };
}