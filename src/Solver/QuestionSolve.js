import React from 'react'

export default function QuestionSolve(props) {
  return (
    <div>
      <h1>Demo Only!</h1>
      <p>
        Are [1, 3, 2] and an object with keys ('0': 1, '1': 3, '2': 2 ) the same?
      <br />
        {compareValues([1, 3, 2], { '0': 1, '1': 3, '2': 2 }) ? 'yes' : 'no'}
      </p>
    </div>
  )
}


// calculates what the person's code returns for the given inputs 
export function codeReturn(functionName, argNames, args, code, consFunc) {
  // questions have a specific form:
  // functionName, argName
  // text is irrelevant here 
  // tests[i].inVal and tests[i].outVal 

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

    return '> Error: ' + er
  }

}


// compare two outputs to see if they are the same, using helper functions written below to compare arrays and objects 

export function compareValues(val1, val2) {

  if (typeof val1 !== typeof val2) return false

  // arrays can be compared with compObj because they are 
  // technically objects whose keys are numbers 
  // so I removed my compArr function
  if (Array.isArray(val1) && Array.isArray(val2)) return compObj(val1, val2)

  if (typeof val1 === 'object' && typeof val2 === 'object' && !Array.isArray(val1) && !Array.isArray(val2)) return compObj(val1, val2)

  return val1 === val2

} // end of compareValues 


// function to compare 2 objects 
// also compares array because they are objects
// whose keys are numbers 
export function compObj(obj1, obj2) {

  const arr1 = Object.keys(obj1)
  const arr2 = Object.keys(obj2)

  if (arr1.length !== arr2.length) {
    return false
  }

  arr1.forEach((key) => {
    if (obj1[key] !== obj2[key]) return false
  })

  return true
} // end of compObj 
