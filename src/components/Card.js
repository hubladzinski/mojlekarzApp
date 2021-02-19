import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledCard = styled.div`
  ${space};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  padding: 2em;
  font-family: ${({ theme }) => theme.font.family.primary};

  @media (min-width: 768px) {
    padding: 3em;
  }
`

const Card = ({ children, className, margin, padding }) => {
  return (
    <StyledCard margin={margin} padding={padding} className={className}>
      {children}
    </StyledCard>
  )
}

export default Card
