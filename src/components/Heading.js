import styled, { css } from "styled-components"

const baseStyles = css`
  font-weight: 500;
`

const Heading = styled.h1`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.l};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`

const Heading2 = styled.h2`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.m};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.l};
  } ;
`

const Heading3 = styled.h3`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.s};

  ${({ responsive }) =>
    responsive &&
    css`
      @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.font.size.m};
      } ;
    `}
`

const SubHeading = styled.h2`
  font-size: ${({ theme }) => theme.font.size.s};
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 400;
`

export { Heading, Heading2, Heading3, SubHeading }
