/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    query {
      allContentfulSpeciality {
        edges {
          node {
            name
          }
        }
      }
    }
  `)
  response.data.allContentfulSpeciality.edges.forEach(edge => {
    createPage({
      path: `/specialities/${edge.node.name}`,
      component: path.resolve("./src/templates/speciality-page.js"),
      context: {
        name: edge.node.name,
      },
    })
  })
}
