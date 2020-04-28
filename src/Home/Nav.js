import React from 'react'
import { Link } from 'react-router-dom'
import NavButton from './NavButton'
import NavCastle from './NavCastle'
import KataKnight from '../Kata/KataKnight'

export default function Nav() {
  return (
    <nav className="navBar">
      <NavCastle />

      <Link path="/" className="row">
        <h1>Knights of Coding </h1>
        <KataKnight
          style={{ border: "10px solid #333333" }}
          small />
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
