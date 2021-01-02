import React from "react"
import styled from "styled-components"
import space from "../utils/space"

const StyledPagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: min-content;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  ${space};

  ul {
    display: flex;
    list-style: none;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${({ theme }) => theme.colors.primary} 1px solid;
    border-bottom: ${({ theme }) => theme.colors.primary} 1px solid;
    border-right: ${({ theme }) => theme.colors.primary} 1px solid;

    &:first-of-type {
      border: ${({ theme }) => theme.colors.primary} 1px solid;
    }
  }

  a {
    font-size: ${({ theme }) => theme.font.size.s};
    padding: 10px 20px;
    cursor: pointer;
  }
`

const StyledLink = styled.a`
  color: ${({ number, currentPage }) =>
    number === currentPage ? ({ theme }) => theme.colors.primary : "#000"};
  font-weight: ${({ number, currentPage }) =>
    number === currentPage ? 600 : 300};
`

const Pagination = ({
  className,
  margin,
  padding,
  resultsPerPage,
  totalResults,
  currentPage,
  paginate,
}) => {
  const resultsNumbers = []
  const numberOfPages = Math.ceil(totalResults / resultsPerPage)

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    resultsNumbers.push(i)
  }
  return (
    <StyledPagination margin={margin} padding={padding} className={className}>
      <ul>
        {currentPage > 1 && (
          <li>
            <a onClick={() => paginate(currentPage - 1)}>{"<"}</a>
          </li>
        )}
        {resultsNumbers.map(number => (
          <li key={number}>
            <StyledLink
              number={number}
              currentPage={currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </StyledLink>
          </li>
        ))}
        {currentPage < numberOfPages && (
          <li>
            <a onClick={() => paginate(currentPage + 1)}>{">"}</a>
          </li>
        )}
      </ul>
    </StyledPagination>
  )
}

export default Pagination
