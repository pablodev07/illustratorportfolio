import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@layout';
import { LoadingText, GalleryGrid, MasonryGrid, Image } from '@ui';
import { useComicProject, useComicProjects } from '@hooks';
import HTMLFlipBook from 'react-pageflip';

export default function ComicProjectPage() {
    const { project } = useParams();
    const { images, loading, error } = useComicProject(project);
    const { projects } = useComicProjects();
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);


    // Buscar metadatos del proyecto desde ComicsPage
    const projectMeta = projects.find(
        (p) => p.comicProjectFields?.slug === project
    );



    const title = isEnglish && projectMeta?.comicProjectFields?.titleEn
        ? projectMeta.comicProjectFields.titleEn
        : projectMeta?.comicProjectFields?.titleEs || '';

    const description = isEnglish && projectMeta?.comicProjectFields?.descriptionEn
        ? projectMeta.comicProjectFields.descriptionEn
        : projectMeta?.comicProjectFields?.descriptionEs || '';

    const displayType = projectMeta?.comicProjectFields?.displayType || 'masonry';

    if (loading) return <Layout><LoadingText isLoading text={t('common.loading')} /></Layout>;
    if (error) return <Layout><p className="form-feedback form-feedback--error">Error: {error.message}</p></Layout>;

    const isFlipbook = displayType === 'flipbook';
    const showFlipbook = isFlipbook && !isMobile;
    const showMasonry = displayType === 'masonry';
    const showGallery = (isFlipbook && isMobile) || displayType === 'hybrid';

    return (
        <Layout>
            <section className="comic-project container">
                <h1 className="page_title">{title}</h1>
                <p className="comic-project__description">{description}</p>

                {showMasonry && <MasonryGrid images={images} />}
                {showGallery && <GalleryGrid images={images} showCaptions />}

                {showFlipbook && (
                    <div className="fanzine-reader">
                        <div className="fanzine-reader__flipbook">
                            <HTMLFlipBook
                                width={400}
                                height={550}
                                size="stretch"
                                minWidth={300}
                                maxWidth={800}
                                minHeight={400}
                                maxHeight={1100}
                                maxShadowOpacity={0.5}
                                showCover={true}
                                mobileScrollSupport={true}
                                onFlip={(e) => setCurrentPage(e.data)}
                                startPage={0}
                                drawShadow={true}
                                flippingTime={1000}
                                usePortrait={false}
                                autoSize={true}
                                clickEventForward={true}
                                useMouseEvents={true}
                                swipeDistance={30}
                                showPageCorners={true}
                                disableFlipByClick={false}
                            >
                                {images.map((img, i) => (
                                    <div key={i} className="flipbook-page">
                                        <Image src={img.sourceUrl} altLocalized={img.altLocalized} className="flipbook-image" />
                                    </div>
                                ))}
                            </HTMLFlipBook>
                        </div>
                        <p className="fanzine-reader__indicator" aria-live="polite">
                            {currentPage === 0
                                ? t('common.cover')
                                : t('common.pageNumber', { page: currentPage })}
                            {' -'} {currentPage + 1}
                            {' '}{t('common.from')} {images.length - 1}
                        </p>
                    </div>
                )}
            </section>
        </Layout>
    );
}