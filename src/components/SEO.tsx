import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'audiobook';
  image?: string;
  url?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  audioUrl?: string;
  duration?: number;
}

export const SEO = ({
  title,
  description,
  type = 'website',
  image = '/og-image.jpg',
  url,
  keywords = [],
  author,
  publishedTime,
  audioUrl,
  duration,
}: SEOProps) => {
  const siteTitle = 'ListenFlow';
  const fullTitle = `${title} | ${siteTitle}`;
  const canonicalUrl = url || typeof window !== 'undefined' ? window.location.href : '';

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'audiobook' ? 'AudioObject' : 'WebPage',
    name: title,
    description,
    ...(image && { image }),
    ...(url && { url }),
    ...(author && { author: { '@type': 'Person', name: author } }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(audioUrl && { contentUrl: audioUrl }),
    ...(duration && { duration: `PT${Math.floor(duration)}S` }),
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* DNS Prefetch & Preconnect para performance */}
      <link rel="dns-prefetch" href="https://vpehklrzzgklskapnfmk.supabase.co" />
      <link rel="preconnect" href="https://vpehklrzzgklskapnfmk.supabase.co" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://vpehklrzzgklskapnfmk.supabase.co/storage/v1" crossOrigin="anonymous" />
    </Helmet>
  );
};
