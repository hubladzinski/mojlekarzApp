import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledWrapper = styled.div`
  width: 100%;
  ${space};
`

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 0.65em;
  font-size: ${({ size, theme }) =>
    size === "big" ? theme.font.size.l : theme.font.size.s};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`

const DataList = ({
  text,
  handleChange,
  className,
  options,
  margin,
  padding,
  name,
  placeholder,
}) => {
  const selectOptions = options.map((option, index) => (
    <option value={option} key={index}>
      {option}
    </option>
  ))
  return (
    <StyledWrapper className={className} margin={margin} padding={padding}>
      <StyledInput
        onChange={e => handleChange(e)}
        list={name}
        name={name}
        type="text"
        placeholder={placeholder}
      />
      <datalist
        className={className}
        margin={margin}
        padding={padding}
        defaultValue={text}
        id={name}
      >
        <option value={text} disabled>
          {text}
        </option>
        {selectOptions}
      </datalist>
    </StyledWrapper>
  )
}

export default DataList
