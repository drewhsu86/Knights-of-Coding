import React from 'react'
import KataKnight from '../Kata/KataKnight'

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
    <div className="showUserAll">
      <div className="showUsers">
        <div className="userData">
          <h2>Username</h2>
          <h4> &nbsp; {user.username}</h4>
        </div>

        <div className="userData">
          {user.name ? <h2>Actual Name</h2> : null}
          {user.name ? <h4> &nbsp; {user.name}</h4> : null}
        </div>

        <div className="userData">
          {user.name ? <h2>Clan Name</h2> : null}
          {user.name ? <h4> &nbsp; {user.clan}</h4> : null}
        </div>
      </div>

      <button onClick={(e) => props.addFav(user.username, e)}>
        Add to favorites
      </button>

      <div style={
        {
          margin: '30px',
          padding: '0',
          borderRadius: '10px',
          overflow: 'hidden'
        }
      }>
        <KataKnight
          rank={user.ranks.overall.rank}
          rankText={user.ranks.overall.name}
          color={user.ranks.overall.color}
        />
      </div>
    </div>
  )
}
