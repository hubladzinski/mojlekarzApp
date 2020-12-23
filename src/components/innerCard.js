import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledInnerCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 2em;
  font-family: ${({ theme }) => theme.font.family.primary};
  ${space};
`

const InnerCard = ({ children, className, margin, padding }) => {
  return (
    <StyledInnerCard margin={margin} padding={padding} className={className}>
      {children}
    </StyledInnerCard>
  )
}

export default InnerCard
