import React from "react"
import styled, { keyframes } from "styled-components"
import space from "../utils/space"

const lds = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  ${space};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: ${lds} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.colors.primary} transparent transparent
      transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const Loader = ({ className, margin, padding }) => {
  return (
    <StyledLoader margin={margin} padding={padding} className={className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  )
}

export default Loader
