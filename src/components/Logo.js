import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import logoImg from "../assets/logo.svg"

const StyledIcon = styled(Icon)`
  height: 50px;
  width: 50px;

  @media (min-width: 768px) {
    height: 60px;
    width: 60px;
  }
`

const Logo = () => {
  return <StyledIcon src={logoImg} />
}

export default Logo
