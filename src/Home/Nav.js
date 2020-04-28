import React from 'react'
import { Link } from 'react-router-dom'
import NavButton from './NavButton'
import NavCastle from './NavCastle'

export default function Nav() {
  return (
    <nav className="navBar">
      <NavCastle />

      <Link path="/">
        <h1>Knights of Coding</h1>
      </Link>

      <div className="navButtons">
        <Link to="/">
          <NavButton text="Home" />
        </Link>
        <Link to="/users">
          <NavButton text="Find a Codewars User" />
        </Link>
        <Link to="/favs">
          <NavButton text="Your Favorite Users" />
        </Link>
      </div>
    </nav>
  )
}
