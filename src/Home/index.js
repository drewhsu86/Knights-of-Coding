import React from 'react'
import { Link } from 'react-router-dom'

export default function Index(props) {

  // ===========
  // variables
  // ===========

  const addToFav = props.addToFav

  // ===========
  // functions
  // ===========



  // ===========
  // return 
  // ===========
  return (
    <div className="home page">
      <h1>Welcome to the Knights of Coding!</h1>

      <div className="introduction pageText">
        <p>Hi, my name is Andrew, and I am always trying to improve my coding skills by using sites such as <a href="https://www.codewars.com/" style={{ textDecoration: 'underline' }} target="_blank">CodeWars.com</a>. Whether you're a grizzled veteran of the coding battlefields or a novice trying to get a grasp of the art, I really recommend going to CodeWars and giving it a shot. </p>

        <p>Wondering what your friends worked on in CodeWars? Look them up using this App and see if any of the katas (code challenges) interests you! What better way to learn together or find challenges you haven't seen before?</p>

        <Link to="/users/drewhsu86">
          <button
            className="homeBtn"
          > Search for me on CodeWars </button>
        </Link>

        <Link to="/favs"
          onClick={e => addToFav('drewhsu86', e)}
          className="homeBtn"
        >
          <button> Add me to your favorites list </button>
        </Link>


      </div>


    </div>
  )
}
