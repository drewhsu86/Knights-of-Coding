import React from 'react'

export default function Favorite(props) {
  // displays username and whether 
  // the user wants to delete from local storage 

  return (
    <div className="favUser">
      <h3> {props.username} </h3>
      <button
        onClick={props.deleteFrom}
      > Delete from Favorites
      </button>
    </div>
  )
}
