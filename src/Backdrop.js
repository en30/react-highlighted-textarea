import React, { Component } from 'react'
import slice from './slice'
import {baseZIndex} from './styles'

const isIOS = typeof window === 'object' && /ipad|iphone|ipod/i.test(window.navigator.userAgent)

const backdropStyle = (style, size) => {
  const borderKeys = Object.keys(style).filter((v) => /border/i.test(v))
  const borderRelated = slice(style, borderKeys)
  return {
    position: 'absolute',
    backgroundColor: '#fff',
    overflow: 'auto',
    pointerEvents: 'none',
    padding: isIOS ? '0 3px' : 0,
    ...size,
    ...borderRelated,
    zIndex: (style.zIndex || baseZIndex) - 1,
    borderColor: 'transparent'
  }
}

export default class Backdrop extends Component {
  render () {
    const {children, style, size} = this.props
    return (
      <div style={backdropStyle(style, size)}>
        {children}
      </div>
    )
  }
}
