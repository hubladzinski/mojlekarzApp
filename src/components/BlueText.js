import React from "react"
import styled from "styled-components"

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const BlueText = ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>
}

export default BlueText
