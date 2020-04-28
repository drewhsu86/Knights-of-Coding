import React, { useState } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import Users from './Users'
import Kata from './Kata'

import Home from './Home'
import Nav from './Home/Nav'

function App() {

  // ===========
  // states 
  // ===========
  const [canStore, updCanStore] = useState(typeof Storage !== 'undefined')
  const [favs, updFavs] = useState(canStore && localStorage.getItem("favUsers") ? localStorage.getItem("favUsers") : [])
  const [katas, updKatas] = useState({})
  const [currUser, updCurrUser] = useState(null)

  // ===========
  // lifecycle
  // ===========



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
    </div>
  );
}

export default App;
