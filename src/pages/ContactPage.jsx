import { useTranslation } from 'react-i18next';
import { Layout } from '@layout'
import { ContactForm } from '@sections';
import { usePageFields } from '@hooks';
import { LoadingText } from '@ui';

export default function ContactPage() {
  const { t } = useTranslation();
  const { title, loading, error, description } = usePageFields('contacto');


  return (
    <Layout>
      <section className="container">
        
        {loading && <LoadingText isLoading={loading} text={t('common.loading')} />}
        {error && <p className="form-feedback form-feedback--error" role="alert">{t('common.error')} {error.message}</p>}

        {!loading && !error && (
          <>
          <h1 className="page_title">{title}</h1>
            
            <div className="page_description" dangerouslySetInnerHTML={{ __html: description }}/>
            <ContactForm buttonVariant='btn--primary'/>
          </>
        )}
      </section>
    </Layout>
  );
}