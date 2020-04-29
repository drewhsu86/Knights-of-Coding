import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import KataSword from './KataSword'

// =========================================
// constants outside of functional component
// =========================================

const CODEWARS_API_KATA = `https://www.codewars.com/api/v1/code-challenges/`

export default function () {

  // ===========
  // states and variables 
  // ===========

  const [kataInfo, updKataInfo] = useState(null)
  const kataID = useParams()['id']

  // ===========
  // lifecycle functions
  // ===========

  useEffect(() => {
    kataAPICall(kataID)
  }, [kataID])

  // ===========
  // functions 
  // ===========

  // async api call 
  async function kataAPICall(id) {
    let headers = {
      Authorization: process.env.API_KEY,
    }
    const response = await axios(`${CODEWARS_API_KATA}${kataID}`, headers)

    updKataInfo(response.data)
    console.log(response.data)
  }

  // function for cleaning up strings by replacing characters
  function replaceWith(str, repArr) {
    // eliminates instead of replaces if the replaceable
    // parts of the string are at the beginning or end 
    // but this is just for cleaning up markdown language 
    return str.split(repArr[0]).join(repArr[1])
  }

  // function for separating string into paragraphs 
  function separateBy(str, sep) {
    return str.split(sep).map((substr) => {
      return <p>{substr}</p>
    })
  }

  // ===========
  // return
  // ===========

  // keys of kata object 
  // id, name, slug, category, url, rank, createdBy, languages
  // totalAttempts: 102345
  // totalCompleted: 17048
  // rank obj: id, name, color 

  if (kataInfo) {
    return (
      <div className="kata page">

        <div
          className="swordIcon optional"
        >
          <KataSword
            rankText={kataInfo.rank.name}
            color={kataInfo.rank.color}
          />
        </div>

        <h2>  Kata Title: <i>{kataInfo.name}</i> </h2>

        <div className="pageText">
          <h4>Created by:</h4>
          <p> &nbsp; {kataInfo.createdBy ? <Link to={'/users/' + kataInfo.createdBy.username}>{kataInfo.createdBy.username}</Link> : 'No creator recorded'}</p>

          <h4>Description:</h4>
          {separateBy(replaceWith(kataInfo.description, ['__', '']), /```|##/)}
        </div>


        <a href={kataInfo.url} target="_blank" rel="noopener noreferrer">
          <button>
            Try this Kata on CodeWars!
          </button>
        </a>
      </div>
    )
  } else {
    return null
  }
}
