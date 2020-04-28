import React, { useState, useEffect } from 'react'
import Favorite from './Favorite'

export default function Favorites(props) {
  // uses local storage to return favorites 
  // if no local storage detected, alert user 
  // delete button removes from local array then stores 
  // array to local storage 

  // state of favorites is stored in App.js 
  // so that favorites can be added outside of this component
  // so our functions are passed from props 

  // ===========
  // variables
  // ===========

  const canStore = props.canStore
  const favList = props.favList
  const updFavList = props.updFavList

  // ===========
  // functions 
  // ===========

  // delete specified element from favorites list 
  function deleteFromFavs(ind) {
    favList.splice(ind, 1)
    localStorage.setItem('KoC_favs', favList)
    updFavList(favList)
  }

  // ===========
  // return 
  // ===========

  console.log('favs', favList)
  console.log('canStore', canStore)

  return (
    <div className="favList page">
      {
        !canStore ? <h3> Sorry, but local storage cannot be accessed. </h3> : (!favList || favList.length === 0 ? <h3> No favorites found at this time. </h3> : (favList.map((username, ind) => {
          return <Favorite
            username={username}
          />
        })))
      }
    </div>
  )

}
