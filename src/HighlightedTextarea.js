import React, { Component } from 'react'
import isEqual from 'lodash.isequal'

const isIOS = typeof window === 'object' && /ipad|iphone|ipod/i.test(window.navigator.userAgent)
const baseZIndex = 1

const wrapperStyle = {
  fontWeight: 'normal',
  display: 'block',
  margin: '0 auto',
  position: 'relative',
  WebkitTextSizeAdjust: 'none',
  overflow: 'hidden',
  boxSizing: 'border-box'
}

const slice = (obj, keys) => keys.reduce((a, k) => {
  a[k] = obj[k]
  return a
}, {})

const textboxStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'normal',
  wordWrap: 'normal',
  fontSize: '16px',
  lineHeight: '18px',
  letterSpacing: '1px',
  fontFamily: 'monospace',
  margin: 0
}

const highlightedStyle = (textareaStyle) => {
  const borderKeys = Object.keys(textareaStyle).filter((v) => !/^border/.test(v))
  return {
    ...textboxStyle,
    ...slice(textareaStyle, borderKeys)
  }
}

const textareaStyle = (style, value) => {
  let res = {
    position: 'relative',
    display: 'block',
    overflow: 'auto',
    zIndex: style.zIndex || baseZIndex,
    ...textboxStyle,
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

const backdropStyle = (textareaStyle, style) => {
  const borderKeys = Object.keys(textareaStyle).filter((v) => /^border/.test(v))
  const borderRelated = slice(textareaStyle, borderKeys)
  return {
    position: 'absolute',
    backgroundColor: '#fff',
    overflow: 'auto',
    pointerEvents: 'none',
    padding: isIOS ? '0 3px' : 0,
    ...style,
    ...borderRelated,
    zIndex: (textareaStyle.zIndex || baseZIndex) - 1,
    borderColor: 'transparent'
  }
}

export default class HighlightedTextarea extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  adjustHighlightedPosition = (event) => {
    if (typeof this.props.onScroll === 'function') this.props.onScroll(event)
    this.backdrop.scrollTop = event.target.scrollTop
    this.backdrop.scrollLeft = event.target.scrollLeft
  }

  setBackdrop = (e) => {
    this.backdrop = e
  }

  onResize = event => this.resizeHighlighted(event.target)

  resizeHighlighted = (textarea) => {
    if (!textarea) return
    const rect = textarea.getBoundingClientRect()
    const style = {
      ...this.state.style,
      width: rect.width,
      height: rect.height
    }
    if (!isEqual(this.state.style, style)) this.setState({ bStyle: style })
  }

  render () {
    const {children, style, ...props} = this.props
    const { bStyle } = this.state

    return (
      <div style={wrapperStyle}>
        <div style={backdropStyle(style, bStyle)} ref={this.setBackdrop}>
          <div style={highlightedStyle(style)}>
            {children}{'\n'}
          </div>
        </div>
        <textarea
          style={textareaStyle(style, props.value)}
          {...props}
          onScroll={this.adjustHighlightedPosition}
          onMouseUp={this.onResize}
          onMouseMove={this.onResize}
          ref={this.resizeHighlighted}
        />
      </div>

    )
  }
}
