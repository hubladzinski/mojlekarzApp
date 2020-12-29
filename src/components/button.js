import React from "react"
import styled from "styled-components"
import space from "../utils/space"
import color from "../utils/color"

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 0.65em;
  font-size: ${({ theme }) => theme.font.size.m};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  width: 100%;
  cursor: pointer;
  ${space};
  ${color};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.l};
  }
`

const Button = ({ text, className, margin, padding, ...props }) => {
  return (
    <StyledButton
      className={className}
      margin={margin}
      padding={padding}
      {...props}
    >
      {text}
    </StyledButton>
  )
}

export default Button
