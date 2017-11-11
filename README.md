# react-highlighted-textarea

React component to highlight textarea.

## Installation

```console
$ npm install --save git+https://git@github.com/en30/react-highlighted-textarea.git
```

## Usage
`HighlightedTextarea` is almost same as raw `textarea`.
Style its value and put it as `children` of `HighlightedTextarea`.

```jsx
import React, { Component } from 'react'
import HighlightedTextarea from 'highlighted-text-area'

const highlightTrailingWhitespace = (text) => (
  text.split(/(\s+)(?=\n)/).map((e, i) => {
    if (/\S/.test(e)) return e
    return <span key={i} style={{backgroundColor: 'rgba(255, 0, 0, .4)'}}>{e}</span>
  })
)

class MyTextarea extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.updateValue = this.updateValue.bind(this)
  }

  updateValue (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { value } = this.state
    return (
      <HighlightedTextarea onChange={this.updateValue} value={value}>
        {highlightTrailingWhitespace(value)}
      </HighlightedTextarea>
    )
  }
}
```
