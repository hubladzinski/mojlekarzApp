import React from "react"
import styled from "styled-components"
import MainLayout from "./MainLayout"
import InnerLayout from "./InnerLayout"
import backgroundResults from "../assets/backgroundResults.svg"

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: -10%;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-image: url(${backgroundResults});
`

const BackgroundLayout = ({ children }) => (
  <MainLayout>
    <Wrapper>
      <BackgroundContainer />
      <InnerLayout>{children}</InnerLayout>
    </Wrapper>
  </MainLayout>
)

export default BackgroundLayout
