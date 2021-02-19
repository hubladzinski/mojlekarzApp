import React from "react"
import SVG from "react-inlinesvg"

const Icon = ({ src, ...props }) => {
  return (
    <div {...props}>
      <SVG src={src} />
    </div>
  )
}

export default Icon
