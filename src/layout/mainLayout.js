import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import theme from "../utils/theme"
import Navbar from "../components/Navbar"
import SEO from "../components/Seo"

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
}

html, body, #___gatsby, #gatsby-focus-wrapper {
  height: 100%;
  padding: 0;
  margin: 0;
}

h1,h2,h3,h4,h5,p,ul,li {
  margin: 0;
}

ul, li {
  padding: 0;
}

html {
  font-size: 62.5%;
  letter-spacing: 0.12rem;
  font-family: ${theme.font.family.primary};
}
`

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledLayout>
          <SEO />
          <Navbar />
          {children}
        </StyledLayout>
      </ThemeProvider>
    </>
  )
}

export default MainLayout
