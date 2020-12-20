import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Logo from "./logo"

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledH1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.m};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 300;
  margin-left: 10px;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Header = () => (
  <StyledHeader>
    <Logo />
    <StyledH1>
      <StyledLink to="/">
        gdzie mój <span>lekarz?!</span>
      </StyledLink>
    </StyledH1>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
