import React from "react"
import MainLayout from "../layout/mainLayout"
import Card from "../components/card"
import styled from "styled-components"
import backgroundRotatedImg from "../assets/backgroundRotated.svg"

const StyledWrapper = styled.div`
  flex: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${backgroundRotatedImg});
`

const IndexPage = () => (
  <MainLayout>
    <StyledWrapper>
      <h1>Hi people</h1>
      <Card>
        <p>Welcome to your new Gatsby site.</p>
      </Card>
      <p>Now go build something great.</p>
    </StyledWrapper>
  </MainLayout>
)

export default IndexPage
