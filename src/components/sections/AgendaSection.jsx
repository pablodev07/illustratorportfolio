import { useTranslation } from 'react-i18next';
import { useEvents, useSnapReveal } from '@hooks';
import { Icon, LoadingText, AsteriskBadge } from '@ui'

function formatTime(timeString, lang) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours);
  if (lang === 'en') {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }
  return `${h}:${minutes}hs`;
}

export default function AgendaSection() {
  const { t, i18n } = useTranslation();
  const { events, loading, error } = useEvents();
  const sectionRef = useSnapReveal();

  const getYear = (dateString) => {
    const d = new Date(dateString.split('T')[0]);
    return d.getFullYear();
  };

  const getDay = (dateString) => {
    const d = new Date(dateString.split('T')[0]);
    return d.toLocaleDateString(
      i18n.language === 'en' ? 'en-US' : 'es-AR',
      { day: 'numeric' }
    );
  };

  const getMonth = (dateString) => {
    const d = new Date(dateString.split('T')[0]);
    return d.toLocaleDateString(
      i18n.language === 'en' ? 'en-US' : 'es-AR',
      { month: 'short' }
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <section ref={sectionRef} className="agenda-section section" aria-labelledby="agenda-title">
      <div className="container">
        <h2 id="agenda-title" className="agenda-section__title">AGENDA</h2>
        <span className="agenda-section__subtitle japanese">次のイベント"</span>

        {loading && <LoadingText isLoading={loading} text={t('common.loading')} />}

        {error && (
          <p className="form-feedback form-feedback--error" role="alert">{t('common.error')} {error.message}</p>
        )}

        {!loading && !error && events.length === 0 && (

          <div className="agenda-timeline">

            <article
              className="agenda-card agenda-card--left"
            >
              <div className="agenda-card__date-block">
                <div className="agenda-card__asterisk-wrap">
                  <AsteriskBadge
                    className="agenda-card__asterisk"
                    color="#61C9A8"
                    rotate="-20"
                  />
                  <div className="agenda-card__date-text">
                    <span className="agenda-card__empty">
                      {`:(`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="agenda-card__body card card__body">
                <h3 className="agenda-card__title empty">{t('agenda.empty')}</h3>
              </div>
            </article>
          </div>

        )}

        {!loading && !error && events.length > 0 && (
          <div className="agenda-timeline">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const eventYear = getYear(event.eventFields.eventDate);

              return (
                <article
                  key={event.id}
                  className={`agenda-card ${isLeft ? 'agenda-card--left' : 'agenda-card--right'}`}
                >
                  {/* Fecha + Asterisco */}
                  <div className="agenda-card__date-block">
                    <div className="agenda-card__asterisk-wrap">
                      <AsteriskBadge
                        className="agenda-card__asterisk"
                        color={isLeft ? '#61C9A8' : '#F97C65'}
                        rotate={isLeft ? -20 : 20}
                      />
                      <div className="agenda-card__date-text">
                        <span className="agenda-card__day">
                          {getDay(event.eventFields.eventDate)}
                        </span>
                        <span className="agenda-card__month">
                          {getMonth(event.eventFields.eventDate)}
                        </span>
                        {eventYear !== currentYear && (
                          <span className="agenda-card__year"> {eventYear}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="agenda-card__body card card__body">
                    <h3 className="agenda-card__title">{event.title}</h3>

                    {event.eventFields?.location && (
                      <p className="agenda-card__location">
                        <Icon name="location" size={14} />
                        {event.eventFields.location}
                      </p>
                    )}

                    {event.eventFields?.eventTime && (
                      <p className="agenda-card__time">
                        <Icon name="clock" size={14} />
                        {formatTime(event.eventFields.eventTime, i18n.language)}
                      </p>
                    )}

                    {event.excerpt && (
                      <p className="agenda-card__excerpt">
                        {event.excerpt.replace(/<[^>]*>/g, '')}
                      </p>
                    )}

                    {event.eventFields?.externalLink && (
                      <a
                        href={event.eventFields.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--white btn--sm"
                      >
                        {t('agenda.moreInfo')}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}