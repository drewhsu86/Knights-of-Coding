import React, { useState, useEffect } from 'react'
import KataThumb from './KataThumb'

export default function ShowKatas(props) {

  // two categories to filter by 
  // completed languages: buttons (key name completedLanguages)
  // name match: input (key name slug (all lower case but with dashes))
  // instead of  of key 'name' which has title case  

  // ===========
  // states and variables
  // ===========

  const katas = props.katas

  const [compLangs, updCompLangs] = useState({})
  const [wordIpt, updWordIpt] = useState('')
  const [forcer, forceUpdate] = useState(true)

  // ===========
  // lifecycle
  // ===========


  // ===========
  // functions & handlers
  // ===========

  // an onClick function that lets a button toggle 
  // whether compLangs[specificLanguage] is true or false 

  function handleClickLang(lang) {
    const newCompLangs = compLangs
    newCompLangs[lang] = !newCompLangs[lang]
    updCompLangs(newCompLangs)
    console.log('btn clicked', compLangs)
    // added force update because I think it only rerenders 
    // because primitive data types are recognized by the 
    // update functions from useState but objects aren't 
    forceUpdate(!forcer)
  }

  function handleChangeIpt(e) {
    updWordIpt(e.target.value)
  }


  // ===========
  // return
  // ===========

  // we put in a javascript array filter before our map 
  // we will put conditionals inside of it based on what the user
  // selects as filter options 

  // look through the completed languages of the katas
  // if we don't have it in our object (used as a dictionary)
  // add it with true (that filter will let it through)
  katas.forEach((kata) => {
    kata.completedLanguages.forEach((lang) => {
      if (typeof compLangs[lang] !== 'boolean') {
        compLangs[lang] = true
        updCompLangs(compLangs)
      }
    })
  })
  console.log(compLangs)

  if (katas) {
    return (
      <div className="showKataMain">
        <div className="showKataFilter">

          <div className="filterLangs">

            <h3> Filter by Programming Language </h3>
            <h5> (as completed by this user) </h5>
            <div>
              {
                Object.keys(compLangs).map((lang, ind) => {
                  // for each language make a button that toggles 
                  return (
                    <button
                      type="button"
                      className={compLangs[lang] ? "langOn" : "langOff"}
                      key={ind}
                      onClick={() => { handleClickLang(lang) }}
                    >{lang}</button>
                  )
                })
              }
            </div>
          </div>

          <h3> Filter by Search Term(s) </h3>
          <h5> (Results match any terms separated by space(s)) </h5>
          <input type="text"
            value={wordIpt}
            onChange={handleChangeIpt}
          />

        </div>

        <div className="showKatas">
          {
            katas.length > 0 ? katas.filter((kata) => {
              // -----------------//
              // -- filter here -- 
              // -----------------//
              // return conditions here 
              // return true to let past the filter 
              let wordFound = false
              let langFound = false

              // filter one: match word if input is not blank 
              if (wordIpt.length > 0) {
                // we can do multiple search terms so let's split 
                // via empty space(s)
                wordIpt.split(' ').forEach((term) => {
                  if (kata.name) {
                    if (kata.name.toLowerCase().includes(term.toLowerCase())) {
                      wordFound = true
                    }
                  }
                })
              } else {
                wordFound = true
              }

              // filter two: for each language in our object compLangs 
              // if the array kata.completedLanguages includes it 
              // and it's true in the object, let it through the filter 
              for (let key in compLangs) {
                if (compLangs[key] === true && kata.completedLanguages.includes(key)) {
                  langFound = true
                }
              }

              // finally return true if all filters met
              return wordFound && langFound
            }).map((kata, ind) => {
              // -----------------//
              // -- map here -- 
              // -----------------//
              // do some processing to fill in our filters

              // return actual kata thumbnail
              return (<KataThumb
                kata={kata}
                key={ind}
              />)
            }) : null
          }
        </div>
      </div>

    )
  } else {
    return null
  }
}
