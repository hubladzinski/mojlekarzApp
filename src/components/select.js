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

const StyledLabelWrapper = styled.div`
  max-width: 350px;
  ${space};
  select {
    font-size: ${({ theme }) => theme.font.size.xs};
    margin-top: 5px;
    color: black;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  label {
    font-size: ${({ theme }) => theme.font.size.xs};
  }
`

const Select = ({
  text,
  handleChange,
  className,
  options,
  margin,
  padding,
  label,
  labelText,
}) => {
  const selectOptions = options.map((option, index) => (
    <option value={option.code} key={index}>
      {option.name}
    </option>
  ))
  return (
    <>
      {!label ? (
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
      ) : (
        <StyledLabelWrapper margin={margin} padding={padding}>
          <label htmlFor={label}>{labelText}</label>
          <StyledSelect
            onChange={e => handleChange(e)}
            className={className}
            defaultValue={text}
            id={label}
          >
            {selectOptions}
          </StyledSelect>
        </StyledLabelWrapper>
      )}
    </>
  )
}

export default Select
