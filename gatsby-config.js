module.exports = {
  siteMetadata: {
    title: `gdzie mój lekarz?!`,
    description: `Znajdź lekarza na NFZ, w twoim mieście. Wyszukaj ośrodki świadczące usługi na NFZ.`,
    baseUrl: "https://www.gdziemojlekarz.pl",
    author: `@hublad`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-G70199GS97",
      },
    },
  ],
}
