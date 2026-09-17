import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import {
  generatePersistedQueryIdsFromManifest,
  createPersistedQueryManifestVerificationLink,
} from '@apollo/persisted-query-lists';

const GRAPHQL_URI = 'https://cms.pablovester.com/graphql';

// El manifest se genera en build (`npm run generate-persisted-queries`) y lista
// exactamente las operaciones que usa este front. Cada request viaja como un hash
// SHA-256 (protocolo APQ), no como query crudo. El ID sale del manifest, no se
// recalcula en runtime: así el cliente y el allowlist del server usan el mismo hash.
const loadManifest = () => import('../persisted-query-manifest.json');

const persistedQueryLink = createPersistedQueryLink(
  generatePersistedQueryIdsFromManifest({ loadManifest }),
);

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

// En dev, avisa por consola si alguna operación no está en el manifest: esa quedaría
// fuera del allowlist y el server la rechazaría en producción.
const link = import.meta.env.DEV
  ? createPersistedQueryManifestVerificationLink({
      loadManifest,
      onVerificationFailed: (details) => {
        // eslint-disable-next-line no-console
        console.warn(
          '[APQ] Operación fuera del manifest:',
          details.reason,
          details.operation?.operationName ?? '(anónima)',
        );
      },
    })
      .concat(persistedQueryLink)
      .concat(httpLink)
  : persistedQueryLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first', // Usar caché siempre que exista
    },
  },
});

export default client;
