import { useQuery, gql } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      nodes {
        id
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        eventFields {
          eventDate
          eventTime
          location
          externalLink
        }
      }
    }
  }
`;

export function useEvents() {
    const { data, loading, error } = useQuery(GET_EVENTS);

    const events = (data?.events?.nodes || [])
        .filter((event) => {
            if (!event.eventFields?.eventDate) return false;

            // Interpretar la fecha como local (ignorar la parte de hora UTC)
            const rawDate = event.eventFields.eventDate.split('T')[0]; // "2026-05-22"
            const [year, month, day] = rawDate.split('-');
            const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

            const today = new Date();
            const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (eventDate < todayDay) return false; // Ya pasó
            if (eventDate > todayDay) return true;  // Futuro

            // Es hoy: comparar horario si existe
            if (event.eventFields?.eventTime) {
                const [hours, minutes] = event.eventFields.eventTime.split(':');
                const eventDateTime = new Date(eventDate);
                eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
                return eventDateTime >= today;
            }

            return true; // Es hoy sin horario
        })
        .sort((a, b) => {
            return new Date(a.eventFields.eventDate) - new Date(b.eventFields.eventDate);
        });

    return { events, loading, error };
}