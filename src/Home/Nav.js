import React from 'react'
import { Link } from 'react-router-dom'
import NavButton from './NavButton'

export default function Nav() {
  return (
    <nav className="navBar">
      <h1>Knights of Coding</h1>
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
