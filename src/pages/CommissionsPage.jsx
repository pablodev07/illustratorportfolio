import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@layout';
import { ContactForm } from '@sections'
import { AsteriskBadge, Image, LoadingText } from '@ui';
import { usePageFields, useCommissions, useCotizacion } from '@hooks';
import { usdToArs } from '@utils';

export default function CommissionsPage() {
  const { title } = usePageFields('comisiones');
  const { images, pokemon, bust, note, faqLink, contactTitle, loading } = useCommissions();
  const { cotizacion } = useCotizacion();
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === 'en' ? '/en' : '';
  const isEnglish = i18n.language === 'en';

  const formatUsdArs = (usd) => {
    if (isEnglish) return `$${usd} USD`;
    return `$${usdToArs(usd, cotizacion)} ARS`;
  };

  if (loading) {
    return (
      <Layout>
        <LoadingText isLoading={loading} text={t('common.loading')} />
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="commissions" aria-labelledby="commissions-title">
        <h1 id="commissions-title" className="commissions__title page_title page_title__nodescription">
          {title}
        </h1>

        {/* Pokémon */}
        <section className="pricing-card bg-primary" aria-labelledby="pokemon-title">
          <div className="pricing-card__inner container">
            <h2 id="pokemon-title" className="pricing-card__title">
              {pokemon.title}
            </h2>

            <Image src={images.pokemon} altLocalized={images.pokemonAlt} className="pricing-card__image" />

            <div className="pricing-card__info">
              <div className="pricing-card__option">
                <p className="pricing-card__price">{formatUsdArs(pokemon.price1)}</p>
                <p className="pricing-card__description" dangerouslySetInnerHTML={{ __html: pokemon.opt1Desc }}/>
              </div>

              <div className="pricing-card__option">
                <p className="pricing-card__price">{formatUsdArs(pokemon.price2)}</p>
                <p className="pricing-card__description"dangerouslySetInnerHTML={{ __html: pokemon.opt2Desc }}/>
              </div>

              <p className="pricing-card__extra">+{formatUsdArs(pokemon.extra)} — {pokemon.extraDesc}</p>

              <p className="pricing-card__gallery-link">
                <a className="pricing-card__link" href="/dibujos#pokemon">{pokemon.galleryLink}</a>
              </p>
            </div>

            <div className="pricing-card__footer">
              <AsteriskBadge
                className="pricing-card__asterisk"
                color="#61C9A8"
                rotate={-25}
              />
              <p className="pricing-card__note">
                {note}
              </p>
              <a href="#contact-commissions" className="btn btn--white pricing-card__cta">
                {pokemon.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Bust */}
        <section className="pricing-card pricing-card--reverse" aria-labelledby="bust-title">
          <div className="pricing-card__inner container">
            <h2 id="bust-title" className="pricing-card__title">
              {bust.title}
            </h2>

            <Image src={images.bust} altLocalized={images.bustAlt} className="pricing-card__image" />


            <div className="pricing-card__info">
              <p className="pricing-card__price">{formatUsdArs(bust.price)}</p>
              <p className="pricing-card__description" dangerouslySetInnerHTML={{ __html: bust.desc }}/>
              <p className="pricing-card__extra">+{formatUsdArs(bust.extra)} {bust.extraDesc}</p>

            </div>

            <div className="pricing-card__footer">
              <p className="pricing-card__note">{note}</p>
              <a href="#contact-commissions" className="btn btn--secondary pricing-card__cta">
                {bust.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-commissions" className="commissions-contact container" aria-labelledby="commissions-contact-title">
          <h3 id="commissions-contact-title" className="commissions-contact__title page_title">
            {contactTitle}
          </h3>
          <div className="commissions-contact__inner">
            <div className="commissions-contact__form">
              <ContactForm buttonVariant="btn--primary" />
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="commissions-faq">
          <p>
            <Link to={`${prefix}/commission-tos-faq`}>
              {faqLink}
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  );
}