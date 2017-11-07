import React from 'react'

const style = {
  fontWeight: 'normal',
  display: 'block',
  margin: '0 auto',
  position: 'relative',
  WebkitTextSizeAdjust: 'none',
  overflow: 'hidden',
  boxSizing: 'border-box'
}

export default ({children}) => (
  <div style={style}>
    {children}
  </div>
)
