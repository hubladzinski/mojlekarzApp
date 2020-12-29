import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 0.65em;
  font-size: ${({ theme }) => theme.font.size.s};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  width: 100%;
  ${space};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.m};
  }
`

const Select = ({
  text,
  handleChange,
  className,
  options,
  margin,
  padding,
}) => {
  const selectOptions = options.map((option, index) => (
    <option value={option.code} key={index}>
      {option.name}
    </option>
  ))
  return (
    <StyledSelect
      onChange={e => handleChange(e)}
      className={className}
      margin={margin}
      padding={padding}
      defaultValue={text}
    >
      <option value={text} disabled>
        {text}
      </option>
      {selectOptions}
    </StyledSelect>
  )
}

export default Select
