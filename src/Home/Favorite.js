import React from 'react'
import { Link } from 'react-router-dom'

export default function Favorite(props) {
  // displays username and whether 
  // the user wants to delete from local storage 

  return (
    <div className="favUser">
      <h3> Username: </h3>

      <p> &nbsp;
        <Link to={'/users/' + props.username}>
          {props.username}
        </Link>
      </p>

      <button onClick={e => props.deleteFrom(props.ind, e)}>
        Delete
      </button>

    </div>
  )
}
