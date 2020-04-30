import React, { useState, useEffect } from 'react'
import { codeRun, codeReturn, compareValues } from './QuestionSolve'
import questions from './data/questions.json'
import './Solver.css'
import HWKing from './HWKing'

// if question = questions[i], its keys are 
// text, functionName, argNames, tests
// tests = array of objects 
// each object has 'inVal' and 'outVal'
// which are the input and output data 

export default function Index() {

  // =============
  // states and variables
  // =============

  // we need a solverIpt, string 
  // consoleText, string (does not need onchange)
  // problem object which holds current object 
  // problemID holds the index of the problems 
  // they are in the server and not from an API so it's easier 
  const [solverIpt, updSolverIpt] = useState('')
  const [consoleText, updConsoleText] = useState([])
  const [outputText, updOutputText] = useState([])
  const [problem, updProblem] = useState(null)
  const [problemID, updProblemID] = useState(-1)
  // use a queue to hold updates to our console 
  // so we don't mess up the state update timing 
  let queue = []
  // force update using boolean
  const [forcer, forceUpdate] = useState(true)




  // =============
  // lifecycle 
  // =============

  // for didMount
  useEffect(() => {
    showProblem()
  }, [])


  // =============
  // functions and handlers
  // =============

  // function that handles how the eval does "console log"
  // instead of going to console it goes to a div for text 
  function consFunc(str) {
    // console.log('consFunc: ', str) 
    if (!str) {
      str = 'undefined'
    } else if (typeof str === 'object') {
      str = JSON.stringify(str)
    } else if (typeof str !== 'string') {
      str = str.toString()
    }

    // add strings to queue in this component 
    // to not mess up timings with update state and 
    // other components 
    queue.push('> ' + str)

  }

  function consQueue() {
    // add all the strings from the queue to consoleText 
    queue.forEach((str) => {
      consoleText.push(str)
    })
    // console.log('consoleText', consoleText)
    updConsoleText(consoleText)
    queue = []
    forceUpdate(!forcer)
  }

  // handler for solverIpt which is an input area
  function handleChangeSolver(e) {
    updSolverIpt(e.target.value)
  }

  // function that adds a problem from our JSON or iterates through
  function showProblem() {
    let question = questions[0]

    console.log(problemID)
    // if problem = null, problemID should fall into if statement
    if (problemID < questions.length - 1 && questions.length > 0) {
      console.log('change problem')
      const newID = problemID + 1
      question = questions[newID]
      updProblem(question)
      updProblemID(newID)
    } else {
      // loop around if we reached the end of questions 
      console.log('loop back')
      updProblemID(0)
    }

    resetProblem(question)
  } // end of showProblem

  // function that resets the page in case your code is so bad 
  function resetProblem(question) {
    updProblem(question)
    updSolverIpt(`  // write your function here; don't change the function name \n
     function ${question.functionName}(${question.argNames.join(', ')}) { 
       \n
     }`)
    updConsoleText([])
    updOutputText([])
    forceUpdate(!forcer)
  } // end of resetProblem


  // function that runs for the 'run' button 
  // this runs the code and prints any console logs or 'consLog'

  function handleClickRun() {
    codeRun(solverIpt, consFunc)
    consFunc('------------- Code Terminated ------------- <')
    consQueue()
  } // handleClickRun

  // how to use codeReturn
  // codeReturn(functionName, argNames, args, code (as string), console logging function)

  function handleClickTest() {

    // // commented out console log to test if codeReturn 
    // // runs the function written in the code correctly 
    // console.log(codeReturn(problem.functionName, problem.argNames, problem.tests[0].inVal, solverIpt, consFunc))

    // for each test in tests, compare the inVal and outVal
    // using compareValue from our QuestionSolve component 
    // if match, test passed 
    // if not, test failed 

    // add everything up and print to output string 
    let outputStr = [`> TOTAL TESTS: ${problem.tests.length} `]

    // keep a counter 
    let testPassed = 0

    problem.tests.forEach((test, ind) => {
      // consLog the test number to avoid confusion 
      consFunc(`Test ${ind + 1} Running:`)
      // for each test see if your return is equal to outVal
      const yourReturn = codeReturn(problem, ind, solverIpt, consFunc)
      outputStr.push(`> - TEST ${ind + 1}  `)
      outputStr.push(`> ____Input: ${stringIt(test.inVal)}`)
      outputStr.push(`> ____Expected Output: ${stringIt(test.outVal)}`)
      outputStr.push(`> ____Your Output: ${stringIt(yourReturn)}`)

      const pass = compareValues(test.outVal, yourReturn)
      console.log(pass)
      if (pass) {
        outputStr.push(`> ____TEST ${ind + 1} PASSED`)
        testPassed++
      } else {
        outputStr.push(`> ____TEST ${ind + 1} FAILED`)
      }
    }) // end of forEach over tests of the problem 

    outputStr.push(`> NUMBER OF TESTS PASSED: ${testPassed}`)

    updOutputText(outputStr)

    // if console logs were used we have to grab them from queue
    consQueue()
  } // handleClickTest 

  // function to print stuff that isn't a string 
  function stringIt(thing) {
    if (thing === null) {
      return 'null'
    }
    if (thing === undefined) {
      return 'undefined'
    }
    if (typeof thing === 'object') {
      if (Array.isArray(thing)) {
        return `[${thing.join(', ')}]`
      }
    }
    if (typeof thing === 'string') {
      return thing
    }
    // number or boolean left 
    return thing.toString()
  }

  // =============
  // return 
  // =============

  return (
    <div className="solverMain">

      <div className="solverTop">

        <div className="homeworkKing">
          {/* This is the homework king */}
          <HWKing />
        </div>

        <div className="solverDescription">
          <button
            onClick={showProblem}>
            Another Problem
          </button>
          {/* This is the problem description */}
          <h3>Problem Prompt:</h3>
          {!problem ? 'No Problem Loaded' : problem.text.map((str, ind) => {
            return <p key={ind}>{str}</p>
          })}
        </div>

      </div>

      <div className="solverBottom">
        <div className="solverCode">
          {/* This is the solver code area */}

          <p className="solverInstructions">Write your code in the following text area. </p> <p> Use 'consLog()' to print things to the console.</p>

          <h4>Code Here:</h4>
          <textarea
            className="solverIpt"
            value={solverIpt}
            onChange={handleChangeSolver}
          />

          <br />

          <button
            onClick={handleClickRun}>
            Run
          </button>

          <button
            onClick={handleClickTest}>
            Test
          </button>

        </div>

        <div className="solverConsole">
          {/* This is the solver console area */}

          <button
            onClick={() => { updConsoleText([]) }} >
            Reset Console
          </button>

          <h4>
            Console:
          </h4>

          <div
            className="consoleText"
          >
            {
              consoleText.map((str, ind) => {
                return <p key={ind}>{str}</p>
              })
            }
          </div>

          <h4>Tests:</h4>
          <div
            className="outputText"
          >
            {
              outputText.map((str, ind) => {
                return <p key={ind}>{str}</p>
              })
            }
          </div>



        </div>
      </div>

    </div>
  )
}
