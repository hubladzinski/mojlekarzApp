import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Logo from "./Logo"
import Card from "./Card"
import Hamburger from "./Hamburger"
import Menu from "./Menu"

const Wrapper = styled(Card)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 15px 15px;
  border-radius: 0;

  @media (min-width: 768px) {
    padding: 15px 50px;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledMenu = styled(Menu)`
  display: ${({ isMenuOpen }) => (isMenuOpen ? "block" : "none")};
`

const StyledH1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.s};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 300;
  margin-left: 10px;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
  }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.l};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenuOpen = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <LogoWrapper>
          <Logo />
          <StyledH1>
            <StyledLink to="/">
              gdzie mój <span>lekarz?!</span>
            </StyledLink>
          </StyledH1>
        </LogoWrapper>
        <Hamburger onClick={toggleMenuOpen} />
      </InnerWrapper>
      <StyledMenu isMenuOpen={isMenuOpen} />
    </Wrapper>
  )
}

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

export default Navbar
