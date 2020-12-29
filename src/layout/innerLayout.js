import React from "react"
import styled from "styled-components"

const StyledLayout = styled.div`
  max-width: 1350px;
  padding: 0 20px 20px 20px;
`

const InnerLayout = ({ children, className }) => {
  return <StyledLayout className={className}>{children}</StyledLayout>
}

export default InnerLayout
