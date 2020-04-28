import React from 'react'
import KataThumb from './KataThumb'

export default function ShowKatas(props) {

  const katas = props.katas

  // ===========
  // return
  // ===========

  if (katas) {
    return (
      <div className="showKatas">
        {
          katas.map((kata, ind) => {
            return (<KataThumb
              kata={kata}
              key={ind}
            />)
          })
        }
      </div>
    )
  } else {
    return null
  }
}
