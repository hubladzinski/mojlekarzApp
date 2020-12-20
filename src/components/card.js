import React from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`

const Card = () => {
  return <StyledCard></StyledCard>
}

export default Card
