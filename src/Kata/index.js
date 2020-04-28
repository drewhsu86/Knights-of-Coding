import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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

  async function kataAPICall(id) {
    let headers = {
      Authorization: process.env.API_KEY,
    }
    const response = await axios(`${CODEWARS_API_KATA}${kataID}`, headers)

    updKataInfo(response.data)
    console.log(response.data)
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
      <div className="kata">
        <h2>{kataInfo.name}</h2>
        <p>{kataInfo.description}</p>

        <a href={kataInfo.url}>
          <button>
            Try this Kata on Codewars!
          </button>
        </a>
      </div>
    )
  } else {
    return null
  }
}
