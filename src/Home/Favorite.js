import React from 'react'
import { Link } from 'react-router-dom'

export default function Favorite(props) {
  // displays username and whether 
  // the user wants to delete from local storage 

  return (
    <div className="favUser">
      <h3> Username: </h3>

      <Link to={'/users/' + props.username}>
        <p> &nbsp; {props.username}</p>
      </Link>

      <button onClick={e => props.deleteFrom(props.ind, e)}>
        Delete from Favorites
      </button>

    </div>
  )
}
