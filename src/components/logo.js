import React from "react"
import styled from "styled-components"
import Icon from "./icon"
import logoImg from "../assets/logo.svg"

const StyledIcon = styled(Icon)`
  height: 60px;
  width: 60px;
`

const Logo = () => {
  return <StyledIcon src={logoImg} />
}

export default Logo
