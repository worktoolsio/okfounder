import React from 'react';
import Head from 'next/head';

export interface IHeadParams {
  canonicalPath?: string;
  description?: string;
  hiddenPage?: boolean;
  keywords?: Array<string>;
  language?: string;
  opengraphImagePath?: string;
  siteName?: string;
  title?: string;
}

export const ApplicationHead = ({
  canonicalPath = '/',
  description = 'Find the rigght co founder!',
  hiddenPage,
  keywords = [],
  language = 'en-US',
  opengraphImagePath = '/imgs/home/og-image.jpg',
  siteName = 'okfounder',
  title = 'okfounder, find the right cofoudner',
}: IHeadParams): JSX.Element => (
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" type="image/png" href="/imgs/favicon.png" />
    <link rel="canonical" href={`https://okfounder.com${canonicalPath}`} />
    <meta name="robots" content={hiddenPage ? 'none' : 'all'} />
    <meta httpEquiv="content-language" content={language} />

    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={[...keywords, 'okfounder'].join(', ')} />

    <meta property="twitter:title" content={title} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:url"
      content={`https://okfounder.com${canonicalPath}`}
    />
    <meta property="twitter:description" content={description} />
    <meta
      property="twitter:image"
      content={`https://okfounder.com${opengraphImagePath}`}
    />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={`https://okfounder.com${opengraphImagePath}`}
    />
    <meta property="og:url" content={`https://okfounder.com${canonicalPath}`} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteName} />

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </Head>
);
