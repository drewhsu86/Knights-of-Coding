import React from 'react'

export default function NavButton(props) {
  return (
    <div
      className="navButton"
      style={{
        fontSize: props.textSize
      }}
    >
      <h2>{props.text}</h2>
    </div>
  )
}
