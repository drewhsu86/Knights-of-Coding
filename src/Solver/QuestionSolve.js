import React, { useState } from 'react'

export default function QuestionSolve(props) {

  // this component ONLY displayed in storybook, not the app

  // variables
  const [input1, updInput1] = useState('')
  const [input2, updInput2] = useState('')

  // functions 
  function handleChange(e, upd) {
    upd(e.target.value)
  }

  // return
  return (
    <div>
      <h1>Demo Only!</h1>

      <label>Value 1</label>
      <input type="text" value={input1} onChange={e => { handleChange(e, updInput1) }} />

      <label>Value 2</label>
      <input type="text" value={input2} onChange={e => { handleChange(e, updInput2) }} />

      {!input1 || !input2 ? <p> Warning: val1 and/or val2 have no values. </p> : <p>
        {`Are ${input1} and ${input2} the same?`}
        <br />
        {compareValues(input1, input2) ? 'yes' : 'no'}
      </p>
      }


      <h1>From Props!</h1>
      {!props.val1 || !props.val2 ? <p> Warning: val1 and/or val2 not passed as props. </p> : <p>
        {`Are ${props.val1} and ${props.val2} the same?`}
        <br />
        {compareValues(props.val1, props.val2) ? 'yes' : 'no'}
      </p>
      }

      <h1>Static Examples</h1>
      <p>
        Are [1, 3, 2] and an object with keys ('0': 1, '1': 3, '2': 2 ) the same?
      <br />
        {compareValues([1, 3, 2], { '0': 1, '1': 3, '2': 2 }) ? 'yes' : 'no'}
      </p>

      <p>
        {`Are {a: 1, b: {2}} and {a:1, b:{2}} the same?`}
        <br />
        {compareValues({ a: 1, b: { b: 2 } }, { a: 1, b: { b: 2 } }) ? 'yes' : 'no'}
      </p>
    </div>
  )
}


// calculates what the person's code returns for the given inputs 
export function codeReturn(problem, testNum, code, consFunc) {
  // questions have a specific form:
  // functionName, argName
  // text is irrelevant here 
  // tests[i].inVal and tests[i].outVal 
  const functionName = problem.functionName
  const argNames = problem.argNames
  const args = problem.tests[testNum].inVal



  // function to do a fake console log 
  // using a function passed from the component with states 
  function consLog(arg) {
    // if it's an object we need to stringify 
    if (typeof arg === 'object') {
      consFunc(JSON.stringify(arg))
    } else if (typeof arg === 'string') {
      consFunc(arg)
    } else {
      consFunc(arg.toString())
    }
  } // end of function consLog


  // try to run the user's code 
  try {
    let ans

    // set up declaration for arguments 
    const varDeclare = argNames.map((arg, ind) => {
      return `const ${arg} = ${JSON.stringify(args[ind])};`
    }).join(' ')

    // first we must evaluate the user's 'code' 
    // which is hopefully a function declaration 
    // then we attempt to call the function 
    eval(varDeclare + code + `ans = ${functionName}(${argNames.join(',')})`)

    return ans
    // catch error from trying to run user's code 
  } catch (er) {
    // if it throws an error we need an error code 
    console.log(er)
    consLog(er)
    return process.env.ERROR_CODE
  } // end of catch from trying to run user's code 

} // end of function codeReturn 

// function to run code as written with eval 
export function codeRun(code, consFunc) {
  // function to do a fake console log 
  // using a function passed from the component with states 
  function consLog(arg) {
    // console.log('consLog', arg)
    // if it's an object we need to stringify 
    if (typeof arg === 'object') {
      consFunc(JSON.stringify(arg))
    } else if (typeof arg === 'string') {
      consFunc(arg)
    } else {
      consFunc(arg.toString())
    }
  } // end of function consLog

  // run code using eval 

  try {
    eval(code)
  } catch (er) {
    console.log(er)

    consLog(er.message)
  }

}


// compare two outputs to see if they are the same, using helper functions written below to compare arrays and objects 

export function compareValues(val1, val2) {

  console.log(val1)
  console.log('compares to')
  console.log(val2)

  if (typeof val1 !== typeof val2) return false

  if (Array.isArray(val1) && Array.isArray(val2)) return compArr(val1, val2)

  if (typeof val1 === 'object' && typeof val2 === 'object' && !Array.isArray(val1) && !Array.isArray(val2)) return compObj(val1, val2)

  return val1 === val2

} // end of compareValues 

// function to compare 2 arrays 
export function compArr(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (!compareValues(arr1[i], arr2[i])) return false
  }
  return true
}

// function to compare 2 objects 
export function compObj(obj1, obj2) {

  const arr1 = Object.keys(obj1)
  const arr2 = Object.keys(obj2)

  if (arr1.length !== arr2.length) {
    return false
  }

  for (let key in obj1) {
    // console.log(obj1[key], obj2[key]) 
    if (!compareValues(obj1[key], obj2[key])) return false
  }

  console.log('true')
  return true
} // end of compObj 
