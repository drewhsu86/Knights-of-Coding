import React from 'react'
import './KataKnight.css'

export default function KataSword(props) {

  // possible props: rank, rankText, color, small
  // const rank = props.rank || -5
  const rankText = props.rankText || '?? Rank'
  const color = props.color || '#cc2222'
  const small = props.small

  return (
    <div className={small ? "swordWrapper small" : "swordWrapper"}>
      <div className="background"
        style={{
          backgroundColor: color
        }}
      />

      <div className="blade">
        <div className="bladeTip" />
        <div className="bladeShine">
          <div className="bladeShineTip" />
        </div>
      </div>

      <div className="hilt" />
      <div className="pommel" />
      <div className="guard" />

      <div className="swordText">
        <h2>{rankText.split(' ')[0]}</h2>
        <p>&nbsp; {rankText.split(' ')[1].toUpperCase()}</p>
      </div>
    </div>
  )
}
