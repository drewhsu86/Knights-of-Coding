import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Users from './Users'
import Kata from './Kata'

import Home from './Home'
import Nav from './Home/Nav'
import Favorites from './Home/Favorites'

function App() {

  // ===========
  // states 
  // ===========
  const [canStore, updCanStore] = useState(typeof Storage !== 'undefined')
  const [favs, updFavs] = useState(canStore && localStorage.getItem('KoC_favs') ? localStorage.getItem('KoC_favs') : [])
  const [katas, updKatas] = useState({})
  const [currUser, updCurrUser] = useState(null)

  // ===========
  // lifecycle
  // ===========

  useEffect(() => {
    // return acts as componentWillUnmount 
    return () => {
      localStorage.setItem('KoC_favs', favs)
    }
  }, [])

  // ===========
  // functions 
  // ===========
  function childAddFav(username) {
    favs.push(username)
    updFavs(favs)
  }

  function childAddUsers(user) {
    updCurrUser(user)
  } // end of childAddUsers 

  function childAddKatas(katas, username) {
    // kata will hold kata lists with the username as key 
    katas[username] = katas
    updKatas(katas)
  } // end of childAddKatas

  // ===========
  // return  
  // ===========

  return (
    <div className="App">
      <Nav />

      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/users">
        <Users
          user={currUser}
          katas={katas}
          addUser={childAddUsers}
          addKatas={childAddKatas}
        />
      </Route>
      <Route path="/kata/:id">
        <Kata
        />
      </Route>
      <Route path="/favs">
        <Favorites
          favList={favs}
          updFavList={updFavs}
          canStore={canStore}
        />
      </Route>
    </div>
  );
}

export default App;
