import React, { useState, useEffect } from 'react'

export default function Favorites() {
  // uses local storage to return favorites 
  // if no local storage detected, alert user 
  // delete button removes from local array then stores 
  // array to local storage 

  // ===========
  // states 
  // ===========


  // ===========
  // lifecycle 
  // ===========

  useEffect(() => {
    // determine if we can use webstorage 
    canStore = false
    // check for web storage 
    if (typeof Storage !== 'undefined') {
      canStore = true
    }
  }, [])



  return (
    <div>

    </div>
  )
}
