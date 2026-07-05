import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, linkedBlogPostEn, linkedBlogPostEs }) {
  return (
    <div className="site-layout">
      <Header linkedBlogPostEn={linkedBlogPostEn} linkedBlogPostEs={linkedBlogPostEs} />
      <main className="site-main" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  linkedBlogPostEn: PropTypes.string,
  linkedBlogPostEs: PropTypes.string,
};