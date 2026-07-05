import { useTranslation } from 'react-i18next';
import { Layout } from '@layout';
import { LoadingText } from '@ui';
import { usePageFields, useFaqFields } from '@hooks';

export default function FAQPage() {
  const { t, i18n } = useTranslation();
  const { title, description } = usePageFields('commission-tos-faq');
  const { faqs, loading, error } = useFaqFields('commission-tos-faq');
  const isEnglish = i18n.language === 'en';

  return (
    <Layout>
      <section className="container">
        <h1 className="page_title">{title || t('faq.title')}</h1>
        {description && <p className="page_description" dangerouslySetInnerHTML={{ __html: description }}/>}

        {loading && <LoadingText isLoading={loading} text={t('common.loading')} />}
        {error && <p className="form-feedback form-feedback--error" role="alert">{t('common.error')} {error.message}</p>}

        {!loading && !error && faqs.length === 0 && (
          <p>{t('faq.empty')}</p>
        )}

        {!loading && !error && faqs.length > 0 && (
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-item__question">
                  <span className="faq-item__icon-closed"></span>
                  <span className="faq-item__icon-opened"></span>
                  <span>
                    {isEnglish && faq.questionEn
                      ? faq.questionEn
                      : faq.questionEs}
                  </span>
                </summary>
                <div
                  className="faq-item__answer"
                  dangerouslySetInnerHTML={{
                    __html: isEnglish && faq.answerEn
                      ? faq.answerEn
                      : faq.answerEs || '',
                  }}
                />
              </details>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}