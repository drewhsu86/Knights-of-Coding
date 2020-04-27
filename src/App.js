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
  const [katas, updKatas] = useState({})
  const [currUser, updCurrUser] = useState(null)

  // code to force an update because we need to wait for 
  // 2 api calls (2 async functions)
  // code from: https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react
  const [, forceUpdate] = useState()

  // ===========
  // functions 
  // ===========
  function childAddUsers(user) {
    users.push(user)
    updUsers(users)
    updCurrUser(user)

    // can confirm if user was added 
    // console.log(users)
  } // end of childAddUsers 

  function childAddKatas(katas, username) {
    // kata will hold kata lists with the username as key 
    katas[username] = katas
    updKatas(katas)

    // can confirm if user was added 
    // console.log(katas)
  } // end of childAddKatas

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
          addKatas={childAddKatas}
          forceUpdate={forceUpdate}
        />
      </Route>
    </div>
  );
}

export default App;
