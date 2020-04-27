import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowUser from './ShowUser'

// constant variables 
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
  const [nameIpt, updNameIpt] = useState('drewhsu86')
  const [filterWordInpt, updFilterWordIpt] = useState('')


  // variables from props 
  const user = props.user
  const addUser = props.addUser
  const addKatas = props.addKatas
  const forceUpdate = props.forceUpdate

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

    // useSetState needs to use take data as the first argument 
    dataFunc(data)

  } // end of async apiCall 




  // ===============
  // event handlers 
  // ===============

  // we can use apiCall to call our api for the user and the code challenges done by the user 
  function handleClickSearch(e) {
    e.preventDefault()

    // call for user data 
    apiCall(`${CODEWARS_API}users/${nameIpt}`, addUser, ['data'])
    // call for user's code challenges 
    apiCall(`${CODEWARS_API}users/${nameIpt}/code-challenges/completed`, katas => addKatas(katas, nameIpt), ['data', 'data'])

  }


  return (
    <div className="users">
      Users page
      <button
        onClick={handleClickSearch}
      >
        Search
      </button>
      {
        user ? <ShowUser user={user} /> : null
      }

    </div>
  )
}
