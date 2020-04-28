import React from 'react'

export default function Favorite(props) {
  // displays username and whether 
  // the user wants to delete from local storage 

  return (
    <div className="favUser">
      <h3> Username: </h3>
      <p>{props.username}</p>
      <button
        onClick={e => props.deleteFrom(props.ind, e)}
      > Delete from Favorites
      </button>
    </div>
  )
}
