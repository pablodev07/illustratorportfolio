import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from '@layout'
import { usePosts } from '@hooks';
import { Icon, Image } from '@ui'

export default function NotFoundPage() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { data } = usePosts();

  const isEnglish = location.pathname.startsWith('/en/') || location.pathname === '/en';
  const prefix = isEnglish ? '/en' : '';

  const posts = data?.posts?.nodes || [];
  const randomPosts = [...posts].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <Layout>
      <div className="not-found">
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1 className="not-found__title">{t('notFound.title')}</h1>
        <p className="not-found__description">{t('notFound.description')}</p>


        {randomPosts.length > 0 && (
          <section className="suggested-posts " aria-labelledby="suggestions-title">
            <div className="blog-grid">
              {randomPosts.map((post) => (
                <article key={post.slug} className="blog-card card">
                  {post.featuredImage?.node?.sourceUrl && (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      titleLocalized={post.featuredImage?.node?.titleLocalized}
                      altLocalized={post?.featuredImage?.node?.altLocalized || post.featuredImage?.node?.titleLocalized}
                      className="blog-card card__image"
                      loading="lazy"
                    />
                  )}
                  <div className="blog-card card__body">
                    <h2 className="blog-card card__title">
                      <Link to={`${prefix}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="blog-card card__date">
                      <Icon name="calendar" size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: '-1px', flexShrink: 0 }} />
                      {new Date(post.date).toLocaleDateString(
                        i18n.language === 'en' ? 'en-US' : 'es-AR',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </p>
                    <p className="blog-card card__excerpt">
                      {post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                    <Link to={`${prefix}/blog/${post.slug}`} className="btn btn--white" style={{ marginTop: '$space-sm', display: 'inline-block' }}>
                      {t('blog.readMore')}
                    </Link>
                  </div>
                </article>

              ))}
            </div>
          </section>
        )}

        <Link to={prefix || '/'} className="btn btn--primary not-found__cta">
          {t('notFound.backHome')}
        </Link>
      </div>
    </Layout>
  );
}