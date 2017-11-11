import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import isEqual from 'lodash.isequal'
import Wrapper from './Wrapper'
import Backdrop from './Backdrop'
import HighlightedText from './HighlightedText'
import Textarea from './Textarea'

export default class HighlightedTextarea extends Component {
  static defaultProps = {
    style: {}
  }

  constructor (props) {
    super(props)
    this.state = {size: {}}
  }

  adjustHighlightedPosition = (event) => {
    if (typeof this.props.onScroll === 'function') this.props.onScroll(event)
    this.backdrop.scrollTop = event.target.scrollTop
    this.backdrop.scrollLeft = event.target.scrollLeft
  }

  setBackdrop = (backdrop) => {
    this.backdrop = findDOMNode(backdrop)
  }

  onResize = event => this.resizeHighlighted(event.target)

  onMouseUp = (event) => {
    if (typeof this.props.onMouseUp === 'function') this.props.onMouseUp(event)
    this.onResize(event)
  }

  onMouseMove = (event) => {
    if (typeof this.props.onMouseMove === 'function') this.props.onMouseMove(event)
    this.onResize(event)
  }

  resizeHighlighted = (textarea) => {
    if (!textarea) return
    const rect = findDOMNode(textarea).getBoundingClientRect()
    const size = {
      width: rect.width,
      height: rect.height
    }
    if (!isEqual(this.state.size, size)) this.setState({ size })
  }

  render () {
    const {children, style, ...props} = this.props
    const { size } = this.state

    return (
      <Wrapper>
        <Backdrop style={style} size={size} ref={this.setBackdrop}>
          <HighlightedText style={style}>
            {children}{'\n'}
          </HighlightedText>
        </Backdrop>
        <Textarea
          style={style}
          {...props}
          onScroll={this.adjustHighlightedPosition}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          ref={this.resizeHighlighted}
        />
      </Wrapper>
    )
  }
}
