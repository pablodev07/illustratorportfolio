import { Layout } from '@layout'
import { HeroSection, HomeGallerySection, BlogSection, AgendaSection, ContactSection, NewsletterSubscribe } from '@sections';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <HomeGallerySection />
      <BlogSection />
      <NewsletterSubscribe />
      <AgendaSection />
      <ContactSection />
    </Layout>
  );
}