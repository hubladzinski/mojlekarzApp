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
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="image" content={logoImg} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoImg} />
      <html lang="pl" />
    </Helmet>
  )
}

export default SEO
