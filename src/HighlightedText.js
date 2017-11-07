import React from 'react'
import slice from './slice'
import {textbox} from './styles'

const highlightedStyle = (textareaStyle) => {
  const noneBorderKeys = Object.keys(textareaStyle).filter((v) => !/^border/.test(v))
  return {
    ...textbox,
    ...slice(textareaStyle, noneBorderKeys)
  }
}

export default ({ children, style }) => (
  <div style={highlightedStyle(style)}>
    {children}
  </div>
)
