import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ShowUser from './ShowUser'
import ShowKatas from './ShowKatas'

// =========================================
// constants outside of functional component
// =========================================

const CODEWARS_API = `https://www.codewars.com/api/v1/`

export default function Index(props) {
  // the states we store locally are 
  // the onchange variables for inputs 
  // search bar initializes with my name 
  // the account info gets pushed back to the state 
  // in App.js so that Kata can also access it 

  // ===============
  // states & variables  
  // ===============

  // inputs as states 
  const urlName = useParams()['name']
  const [nameIpt, updNameIpt] = useState(urlName ? urlName : '')
  const [errMsg, updErrMsg] = useState('')


  // variables from props 
  const user = props.user
  const katas = props.katas
  const addUser = props.addUser
  const addKatas = props.addKatas
  const addToFav = props.addToFav
  const checkFav = props.checkFav


  // ===============
  // lifecycle functions   
  // ===============



  // ===============
  // functions  
  // ===============

  // Codewars api has separate calls for the user and their 
  // completed code challenges so we need two api calls 
  // I will try to dry up the code with reusable code 

  async function apiCall(url, dataFunc, path) {
    // url is the string for the api call url 

    // useSetState is the function to set a state 
    // or a function that redirects data otherwise 

    // path is an optional argument to dive into a response datastructre

    let headers = {
      Authorization: process.env.API_KEY,
    }

    try {
      const response = await axios.get(url, headers)
      let data = response

      // iterate through path (it needs to be an array with keys)
      if (path) {
        for (let i = 0; i < path.length; i++) {
          // for example, if path is ['name']
          // data = data.name or data['name']
          data = data[path[i]]
        }
      }
      // by now, data should be the part of response we want 
      console.log(data)
      // successful api call = no error message 
      updErrMsg('')

      // useSetState needs to use take data as the first argument 
      dataFunc(data)
    } catch (er) {
      // print error to error div 
      console.log(er)
      updErrMsg(er.message)
    }

  } // end of async apiCall 




  // ===============
  // event handlers 
  // ===============

  // we can use apiCall to call our api for the user and the code challenges done by the user 
  function handleClickSearch(e) {
    e.preventDefault()

    // call api if name is not empty 
    if (nameIpt) {

      apiCall(`${CODEWARS_API}users/${nameIpt}`, addUser, ['data'])
      // call for user's code challenges 
      apiCall(`${CODEWARS_API}users/${nameIpt}/code-challenges/completed`, kata => addKatas(kata, nameIpt), ['data', 'data'])

    }

  } // end of handleClickSearch 

  // function to change the state with the input on change
  function handleChangeNameIpt(e) {
    updNameIpt(e.target.value)
  }

  // ===========
  // return
  // ===========

  return (
    <div className="users page">
      <h4> Find a Codewars User! </h4>

      <div className="error">
        {errMsg ? errMsg : null}
      </div>

      <form className="usersForm"
        onSubmit={handleClickSearch}
      >
        <input type="text"
          onChange={handleChangeNameIpt}
          value={nameIpt}
        />

        <button>
          Search
        </button>
      </form>

      {
        user ? <ShowUser user={user} addFav={addToFav} checkFav={checkFav} /> : null
      }
      {
        user ? katas[user.username] ? <ShowKatas katas={katas} /> : null : null
      }

    </div>
  )
}
