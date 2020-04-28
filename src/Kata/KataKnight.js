import React from 'react'
import './KataKnight.css'

export default function KataKnight(props) {

  const rank = props.rank || -3
  const rankText = props.rankText || '3-kyu'
  const color = props.color || 'yellow'
  const small = props.small

  return (


    <div className={small ? 'wrapper small' : 'wrapper'}>

      <div className="arm left" />
      <div className="arm right" />
      <div className="body">
        <div className="tabard"
          style={{
            backgroundColor: color
          }}
        >
          <h2>{rankText.split('-')[0]}</h2>
          <p>{rankText.split('-')[1].toUpperCase()}</p>
        </div>
      </div>

      <div className="shoulders" />

      <div className="neck" />

      <div className="helm">
        <div className="helmSpike" />
        <div className="visor">
          <div className="visorGap" />
        </div>
      </div>

    </div>
  )
}