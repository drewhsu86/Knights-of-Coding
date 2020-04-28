import React, { useState } from 'react'
import KataKnight from '../Kata/KataKnight'

export default function ShowUser(props) {

  // ===========
  // states and variables 
  // ===========

  // for updating 
  const [forcer, forceUpdate] = useState(true)

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
          {user.name ? <h2>Actual Name</h2> : <h2>No Actual Name</h2>}
          {user.name ? <h4> &nbsp; {user.name}</h4> : null}
        </div>

        <div className="userData">
          {user.name ? <h2>Clan Name</h2> : <h2>No Clan</h2>}
          {user.name ? <h4> &nbsp; {user.clan}</h4> : null}
        </div>

      </div>


      <div className="showUsers">

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

        <button
          onClick={(e) => {
            props.addFav(user.username, e)
            forceUpdate(!forcer)
          }
          }
          disabled={props.checkFav(user.username)}
          style={!props.checkFav(user.username) ? {} : {
            color: 'grey',
            margin: '20px'
          }}
        >
          Add to favorites
        </button>

      </div>

    </div>
  )
}
