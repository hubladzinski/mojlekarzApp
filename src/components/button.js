import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 0.65em;
  font-size: ${({ size, theme }) =>
    size === "big" ? theme.font.size.l : theme.font.size.m};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  width: 100%;
  ${space};
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
