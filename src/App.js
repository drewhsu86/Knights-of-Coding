import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Users from './Users'
import Kata from './Kata'

import Home from './Home'
import Nav from './Home/Nav'
import Favorites from './Home/Favorites'
import Footer from './Home/Footer'
import Solver from './Solver'


function App() {

  // ===========
  // states 
  // ===========
  const [canStore, updCanStore] = useState(typeof Storage !== 'undefined')
  const [favs, updFavs] = useState(canStore && localStorage.getItem('KoC_favs') ? localStorage.getItem('KoC_favs').split(',') : [])
  const [katas, updKatas] = useState({})
  const [currUser, updCurrUser] = useState(null)

  // console.log('init favs', favs)
  // console.log(localStorage.getItem('KoC_favs'))

  // ===========
  // lifecycle
  // ===========

  useEffect(() => {
    // console.log('KoC_favs', favs)

    // scroll to top 
    window.scrollTo(0, 0)

    // return acts as componentWillUnmount
    return () => {
      localStorage.setItem('KoC_favs', favs)
    }
  }, [])

  // ===========
  // functions 
  // ===========
  function childAddFav(username) {

    if (!favs.includes(username)) {
      // push if not a repeat 
      favs.push(username)
      updFavs(favs)
      localStorage.setItem('KoC_favs', favs)
      return true
    } else {
      return false
    }

  }

  function childCheckFav(username) {
    return favs.includes(username)
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
        <Home addToFav={childAddFav} />
      </Route>
      <Route path="/users/" exact>
        <Users
          user={currUser}
          katas={katas}
          addUser={childAddUsers}
          addKatas={childAddKatas}
          addToFav={childAddFav}
          checkFav={childCheckFav}
        />
      </Route>
      <Route path="/users/:name">
        <Users
          user={currUser}
          katas={katas}
          addUser={childAddUsers}
          addKatas={childAddKatas}
          addToFav={childAddFav}
          checkFav={childCheckFav}
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
      <Route path="/solver">
        <Solver />
      </Route>

      <Footer />
    </div>
  );
}

export default App;
