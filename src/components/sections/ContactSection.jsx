import { useTranslation } from 'react-i18next';
import { useSnapReveal, useHomeFields } from '@hooks';
import { ContactForm } from '@sections'
import { Image, LoadingText } from '@ui';

export default function ContactSection() {
    const { t } = useTranslation();
    const sectionRef = useSnapReveal();
    const { contact, loading } = useHomeFields();

    if (loading) return <section id="contact-home-section"
        className="contact-section"
        aria-labelledby="contact-title"><LoadingText isLoading={loading} text={t('common.loading')} /></section>;

    return (
        <section
            ref={sectionRef}
            id="contact-home-section"
            className="contact-section"
            aria-labelledby="contact-title"
        >
            <div className="container">
                <h2 id="contact-title" className="contact-section__title">
                    {contact.title}
                </h2>
                <span className="contact-section__subtitle japanese">
                    メッセージをお送りください
                </span>
                <p className="contact-section__description">
                    {contact.description}
                </p>

                <div className="contact-section__inner" style={{ marginTop: '$space-xl' }}>
                    <div className="contact-section__image">
                        <Image src={contact.image} altLocalized={contact.imageAlt} titleLocalized={contact.imageTitle} />
                    </div>
                    <div className="contact-section__form">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );

}

