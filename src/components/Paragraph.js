import styled, { css } from "styled-components"

const baseStyles = css`
  font-weight: 400;
`

const Paragraph = styled.p`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.xs};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.s};
  }

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.font.size.m};
  }
`

const Paragraph2 = styled.p`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.s};
`

const Paragraph3 = styled.p`
  ${baseStyles};
  font-size: ${({ theme }) => theme.font.size.m};
`

export { Paragraph, Paragraph2, Paragraph3 }
