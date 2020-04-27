import React, { useState } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import Users from './Users'

import Home from './Home'
import Nav from './Home/Nav'

function App() {
  // ===========
  // states 
  // ===========
  const [users, updUsers] = useState([])

  // ===========
  // functions 
  // ===========
  function childAddUsers(user, key) {
    users.unshift(user)
    updUsers(users)

    // can confirm if user was added 
    console.log(users)
  }

  return (
    <div className="App">
      <Nav />

      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/users">
        <Users
          user={users.length > 0 ? users[0] : null}
          addUser={childAddUsers}
        />
      </Route>
    </div>
  );
}

export default App;
