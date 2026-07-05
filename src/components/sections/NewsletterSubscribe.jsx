import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHomeFields } from '@hooks';

export default function NewsletterSubscribe() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { newsletter } = useHomeFields();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirigir a Substack con el email pre-llenado
    window.open(
      `https://pablovester.substack.com/subscribe?email=${encodeURIComponent(email)}`,
      '_blank'
    );
    setSubscribed(true);
    setEmail('');
  };

  return (
  <section className="newsletter-subscribe bg-secondary" aria-label="Newsletter">
    <div className="container">
      <p className="newsletter-subscribe__description">
        {newsletter.text}
      </p>

      {subscribed ? (
        <p className="form-feedback form-feedback--success" role="status">
          {t('newsletter.success')}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-subscribe__form">
          <label htmlFor="substack-email" className="sr-only">
            {t('newsletter.emailLabel')}
          </label>
          <input
            type="email"
            id="substack-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('newsletter.placeholder')}
            className="form-input"
          />
          {newsletter.cta && (
            <button type="submit" className="btn btn--white">
            {newsletter.cta}
          </button>
          )}
        </form>
      )}

      {status === 'success' && !subscribed && (
        <p className="form-feedback form-feedback--success" role="status">
          {t('newsletter.success')}
        </p>
      )}
      {status === 'error' && (
        <p className="form-feedback form-feedback--error" role="alert">
          {t('newsletter.error')}
        </p>
      )}
    </div>
  </section>
);
}