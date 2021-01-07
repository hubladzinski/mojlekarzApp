import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import logoImg from "../assets/logo.svg"

const SEO = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          baseUrl
        }
      }
    }
  `)

  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description
  const url = new URL(data.site.siteMetadata.baseUrl)

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-G70199GS97"
      ></script>
      <script type="application/ld+json">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('config', 'G-G70199GS97');
  `}
      </script>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="image" content={logoImg} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoImg} />
    </Helmet>
  )
}

export default SEO
