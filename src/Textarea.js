import React, { Component } from 'react'
import {textbox, baseZIndex} from './styles'

const textareaStyle = (style, value) => {
  let res = {
    position: 'relative',
    display: 'block',
    overflow: 'auto',
    zIndex: style.zIndex || baseZIndex,
    ...textbox,
    ...style
  }
  if (value && value.length > 0) {
    res = {
      ...res,
      background: 'transparent',
      WebkitTextFillColor: 'transparent'
    }
  }
  return res
}

export default class Textarea extends Component {
  static defaultProps = {
    component: 'textarea'
  };

  render () {
    const {component, style, value, ...props} = this.props
    const C = component
    return <C style={textareaStyle(style, value)} value={value} {...props} />
  }
}
