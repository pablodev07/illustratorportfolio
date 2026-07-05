import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@layout'
import { Icon, Image, LoadingText } from '@ui'
import { usePosts, usePageFields, useHomeFields } from '@hooks';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const { data, loading, error } = usePosts();
  const { blog } = useHomeFields();
  const { title, description } = usePageFields('5823', true);
  const prefix = i18n.language === 'en' ? '/en' : '';

  const posts = data?.posts?.nodes || [];
  const languageCategory = i18n.language === 'en' ? 'en' : 'es';
  const filteredPosts = posts.filter((post) =>
    post.categories?.nodes?.some((cat) => cat.slug === languageCategory)
  );

  return (
    <Layout>
      <div className="blog-section container">
        <h1 className="page_title">{title}</h1>
        <p className="blog-page__description page_description" dangerouslySetInnerHTML={{ __html: description }} />

        {loading && (
          <LoadingText isLoading={loading} text={t('common.loading')} />
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="blog-section__empty">{t('blog.empty')}</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="card">
                {post.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={post.featuredImage?.node?.sourceUrl}
                    altLocalized={post.featuredImage?.node?.altLocalized}
                    captionLocalized={post.featuredImage?.node?.captionLocalized}
                    titleLocalized={post.featuredImage?.node?.titleLocalized}
                    className="card__image"
                  />
                )}
                <div className="card__body">
                  <h2 className="card__title">
                    <Link to={`${prefix}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="card__date">
                    <Icon name="calendar" size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: '-1px', flexShrink: 0 }} />
                    {new Date(post.date).toLocaleDateString(
                      i18n.language === 'en' ? 'en-US' : 'es-AR',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </p>
                  <p className="card__excerpt">
                    {post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 200)}...
                  </p>
                  <Link to={`${prefix}/blog/${post.slug}`} className="btn btn--white" style={{ marginTop: '$space-sm', display: 'inline-block' }}>
                    {blog.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}