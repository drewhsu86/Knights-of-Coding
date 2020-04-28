import React from 'react'

export default function ShowUser(props) {

  // ===========
  // variables 
  // ===========

  // expect a user object from props 
  const user = props.user

  // ===========
  // return
  // ===========

  return (
    <div className="showUsers">
      <h2>{user.username}</h2>
      <h2>{user.name}</h2>
      <h2>{user.honor}</h2>
      <h2>{user.clan}</h2>
    </div>
  )
}
