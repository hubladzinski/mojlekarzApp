import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Button from "./Button"

const StyledWrapper = styled.nav`
  background-color: transparent;
  margin-top: 10px;
  ul {
    @media (min-width: 768px) {
      display: flex;
      justify-content: flex-end;
      list-style: none;
      width: 100%;
    }
    a {
      text-decoration: none;
    }
    li {
      @media (min-width: 768px) {
        width: 350px;
      }
    }
  }
`

const Menu = ({ className, isMenuOpen }) => (
  <StyledWrapper className={className} isMenuOpen={isMenuOpen}>
    <ul>
      <Link to="/info">
        <Button as="li" text={"Specjalności"} />
      </Link>
    </ul>
  </StyledWrapper>
)

export default Menu
