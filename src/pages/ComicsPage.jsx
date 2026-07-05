import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout } from '@layout';
import { Image, LoadingText } from '@ui';
import { useComicProjects, usePageFields } from '@hooks';

export default function ComicsPage() {
  const { t, i18n } = useTranslation();
  const { projects, loading, error } = useComicProjects();
  const { title, description } = usePageFields('comics');

  const prefix = i18n.language === 'en' ? '/en' : '';
  const isEnglish = i18n.language === 'en';

  if(loading) {
    return (
      <Layout>
        <LoadingText isLoading={loading} text={t('common.loading')} />
      </Layout>
    )
  }

  if(error){
    return (
      <p className="form-feedback form-feedback--error" role="alert">Error: {error}</p>
    )

  }

  return (
    <Layout>
      <section className="comics-landing container" aria-labelledby="comics-title">
        <h1 id="comics-title" className="comics-landing__title page_title">
          COMICS
        </h1>
        <p className="comics-landing__description page_description" dangerouslySetInnerHTML={{ __html: description }}/>

          <div className="comics-grid">
            {projects.map((project) => {
              const title = isEnglish && project.comicProjectFields?.titleEn
                ? project.comicProjectFields.titleEn
                : project.comicProjectFields?.titleEs;
              const description = isEnglish && project.comicProjectFields?.descriptionEn
                ? project.comicProjectFields.descriptionEn
                : project.comicProjectFields?.descriptionEs;
              const cta = isEnglish && project.comicProjectFields?.ctaEn
                ? project.comicProjectFields.ctaEn
                : project.comicProjectFields?.ctaEs;
              const slug = project.comicProjectFields?.slug || '';
              const imageUrl = project.comicProjectFields?.coverImage?.node?.sourceUrl || '';
              const imageAlt = project.comicProjectFields?.coverImage?.node?.altLocalized || '';
              const imageTitle = project.comicProjectFields?.coverImage?.node?.titleLocalized || '';

              return (
                <article key={project.id} className="comic-card card">
                  <Image
                    src={imageUrl}
                    altLocalized={imageAlt}
                    titleLocalized={imageTitle}
                    className="card__image"
                  />
                  <div className="card__body">
                    <h2 className="card__title">{title}</h2>
                    <p className="card__description">{description}</p>
                    <Link to={`${prefix}/comics/${slug}`} className="btn btn--primary card__cta">
                      {cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
      </section>
    </Layout>
  );
}