import styled from "styled-components"

const SubParagraph = styled.p`
  font-size: ${({ theme, small }) =>
    small ? theme.font.size.xs : theme.font.size.s};
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 400;
`

export default SubParagraph
