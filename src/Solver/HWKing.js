import React, { useState } from 'react'
import axios from 'axios'
import './HWKing.css'

export default function HWKing() {

  // ==============
  // states and variables
  // ==============

  const [joke, updJoke] = useState('By the Homework King\'s decree,solve this problem!')


  // ==============
  // functions and handlers
  // ==============

  // async api call to dad jokes api 
  async function apiDadJoke() {
    try {
      const headers = {
        Accept: 'application/json'
      }
      const response = await axios('https://icanhazdadjoke.com/?Accept=text/plain', { headers })
      console.log(response)

      updJoke(response.data.joke)

    } catch (er) {
      console.log(er)
      updJoke('Sorry, no jokes today. Finish your homework.')
    }
  }

  // handler for button to call api 
  function handleClickJoke() {
    apiDadJoke()
  }

  // ==============
  // return 
  // ==============

  return (
    <div className="hwWrapper">
      <div className="hwBody">
        <div className="hwBodyInner" />
        <div className="stripe left">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <div className="stripe right">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>

      <div className="hwHead">
        <div className="beard" />
        <div className="moustache">
          <div className="moustacheCutout" />
        </div>
        <div className="hair" />
        <div className="hairSide left" />
        <div className="hairSide right" />
      </div>

      <div className="crown">
        <div className="crownTip">
          <div className="jewel" />
        </div>
        <div className="crownTip">
          <div className="jewel" />
        </div>
        <div className="crownTip">
          <div className="jewel" />
        </div>

      </div>

      <button className="jokeBtn"
        onClick={handleClickJoke}>
        Hear a joke?
      </button>

      <div className="textBubble">
        {joke}
      </div>
    </div>
  )
}
