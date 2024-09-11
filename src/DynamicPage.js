import React from 'react';
import { Helmet } from 'react-helmet-async';

const DynamicPage = ({ title, description, image, url }) => {
  return (
    <div>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={description} />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Rencong" />

        {/* Twitter Card Meta Tags (Optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default DynamicPage;
