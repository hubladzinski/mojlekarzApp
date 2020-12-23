import React from "react"
import styled from "styled-components"

const StyledLayout = styled.div`
  padding: 0 20px 20px 20px;
`

const InnerLayout = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>
}

export default InnerLayout
