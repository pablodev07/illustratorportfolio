import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@layout'
import { Icon, LoadingText } from '@ui';
import { usePost } from '@hooks';
import NotFoundPage from './NotFoundPage';

export default function PostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const { data, loading, error } = usePost(slug);

  if (loading) {
    return (
      <Layout>
        <LoadingText isLoading={loading} text={t('common.loading')} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container" style={{ padding: '$space-2xl 0' }}>
          <p className="form-feedback form-feedback--error" role="alert">
            {t('common.error', { message: error.message })}
          </p>
        </div>
      </Layout>
    );
  }

  const post = data?.post;

  if (!post) {
    return (
      <NotFoundPage />
    );
  }
  const linkedBlogPostEn = post?.postTranslations?.linkedPostEn?.nodes?.[0]?.slug;
  const linkedBlogPostEs = post?.postTranslations?.linkedPostEs?.nodes?.[0]?.slug;
  const prefix = i18n.language === 'en' ? '/en' : '';

  return (
    <Layout linkedBlogPostEn={linkedBlogPostEn} linkedBlogPostEs={linkedBlogPostEs}>
      <article className="post-single container" style={{ padding: '$space-xl 0', maxWidth: '800px' }}>
        <header className="post-single__header">
          <h1 className="post-single__title">{post.title}</h1>

          <div className="post-single__meta">
            <span className="post-single__date">
              <Icon name="calendar" size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: '-1px', flexShrink: 0 }} />
              {new Date(post.date).toLocaleDateString(
                i18n.language === 'en' ? 'en-US' : 'es-AR',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
          </div>
        </header>

        <div
          className="post-single__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="post-single__footer">
          <Link to={`${prefix}/blog`}>
            ← {t('blog.backToBlog')}
          </Link>
        </footer>
      </article>
    </Layout>
  );
}