import React from "react"
import styled from "styled-components"

const StyledHamburger = styled.button`
  padding: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const InnerHamburger = styled.div`
  position: relative;
  width: 28px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary};

  ::after,
  ::before {
    content: "";
    position: absolute;
    left: 0;
    width: 28px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ::before {
    top: -8px;
  }

  ::after {
    top: 8px;
  }
`

const Hamburger = (props, { className }) => (
  <StyledHamburger className={className} {...props}>
    <InnerHamburger></InnerHamburger>
  </StyledHamburger>
)

export default Hamburger
