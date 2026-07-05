import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Skeleton } from '@ui'
import { usePosts, useHomeFields, useSnapReveal } from '@hooks';

export default function BlogSection() {
  const { t, i18n } = useTranslation();
  const { data, loading, error } = usePosts();
  const { blog } = useHomeFields();
  const sectionRef = useSnapReveal();

  //Titulo y descripcion que se ven en Home y /blog vienen de HomePageFields
  const posts = data?.posts?.nodes || [];
  const languageCategory = i18n.language === 'en' ? 'en' : 'es';
  //filtrados por idioma
  const filteredPosts = posts.filter((post) =>
    post.categories?.nodes?.some((cat) => cat.slug === languageCategory)
  );
  //ultimos 3 posts
  const recentPosts = filteredPosts.slice(0, 3);
  const prefix = i18n.language === 'en' ? '/en' : '';

  if (error) {
    return (
      <section className="blog-section section">
        <div className="container">
          <p className="form-feedback form-feedback--error" role="alert">
            {t('common.error', { message: error.message })}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="blog-section section">
      <div className="container">
        <h2 className="blog-section__title">{blog.title}</h2>
        <span className="blog-section__subtitle japanese">芸術についての私の考え</span>
        <p className="blog-section__description">{blog.description}</p>

        <div className="blog-grid">
          {loading
            ? // Skeleton cards mientras carga
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="blog-card card" style={{ overflow: 'hidden' }} >
                <Skeleton width="100%" height={200} borderRadius={0} />
                <div className="blog-card card__body">
                  <Skeleton width="80%" height="1.2rem" style={{ marginLeft: '10px', marginBottom: '8px', marginTop: '10px' }} />
                  <Skeleton width="40%" height="0.8rem" style={{ marginLeft: '10px', marginBottom: '12px' }} />
                  <Skeleton width="90%" height="0.8rem" style={{ marginLeft: '10px', marginBottom: '6px' }} />
                  <Skeleton width="90%" height="0.8rem" />
                </div>
              </div>
            ))
            : recentPosts.map((post) => (
              <article key={post.slug} className="blog-card card">
                {post.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={post.featuredImage?.node?.sourceUrl}
                    altLocalized={post.featuredImage?.node?.altLocalized}
                    captionLocalized={post.featuredImage?.node?.captionLocalized}
                    titleLocalized={post.featuredImage?.node?.titleLocalized}
                    className="blog-card card__image"
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
                  <Link to={`${prefix}/blog/${post.slug}`} className="btn btn--white" style={{ marginTop: '$space-sm' }}>
                    {blog.readMore}
                  </Link>
                </div>
              </article>
            ))}
        </div>

        {!loading && (
          <div style={{ textAlign: 'center', marginTop: '$space-xl' }}>
            <Link to={`${prefix}/blog`} className="btn btn--primary">
              {blog.cta}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}