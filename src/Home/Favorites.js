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

  const [forcer, forceUpdate] = useState(true)
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
    forceUpdate(!forcer)
  }

  // ===========
  // return 
  // ===========

  console.log('favs', favList)
  console.log('canStore', canStore)
  console.log(typeof favList)

  if (!canStore) {
    console.log('local storage invalid', favList)
    return (<div className="favList page">
      <h3> No local storage found at this time. </h3>
    </div>)
  } else if (!favList || favList.length < 1) {
    console.log('favList invalid', favList)
    return (<div className="favList page">
      <h3> No favorites found at this time. </h3>
    </div>)
  } else {
    console.log('favList found', favList)
    return (
      <div className="favList page">
        {favList.map((username, ind) => {
          return <Favorite
            username={username}
            deleteFrom={deleteFromFavs}
            ind={ind}
          />
        })}
      </div>
    )
  }


}
