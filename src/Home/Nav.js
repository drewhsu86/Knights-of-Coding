import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="navBar">
      <h1>Knights of Coding</h1>
      <div className="navButtons">
        <Link to="/home">
          <h3> Home </h3>
        </Link>
        <Link to="/users">
          <h3> Find a Codewars User </h3>
        </Link>
      </div>
    </div >
  )
}
