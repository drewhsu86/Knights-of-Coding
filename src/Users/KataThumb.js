import React from 'react'
import { Link } from 'react-router-dom'

export default function KataThumb(props) {

  // ===========
  // variables
  // ===========

  const kata = props.kata
  // keys of kata 
  // id, name, slug, completedLanguages (array), completedAt

  // ===========
  // return
  // ===========

  return (
    <Link to={`/kata/${kata.id}`}>
      <div className="kataThumb">
        <p>
          {kata.name}
        </p>
      </div>
    </Link>
  )
}
