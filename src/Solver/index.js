import React, { useState, useEffect } from 'react'
import { codeRun, codeReturn } from './QuestionSolve'
import questions from './data/questions.json'
import './Solver.css'

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
  const [outputText, updOutputText] = useState('')
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

    // if problem = null, problemID should fall into if statement
    if (problemID < questions.length - 1 && questions.length > 0) {
      updProblem(questions[problemID + 1])
      updProblemID(problemID + 1)
    } else {
      // loop around if we reached the end of questions 
      updProblemID(0)
    }

    resetProblem(question)
  } // end of showProblem

  // function that resets the page in case your code is so bad 
  function resetProblem(question) {
    updProblemID(question)
    updSolverIpt(`  // write your function here, don't change the function name \n
     function ${question.functionName}(${question.argNames.join(', ')}) { 
       \n
     }`)
    updConsoleText([])
    updOutputText('')
  } // end of resetProblem


  // function that runs for the 'run' button 
  // this runs the code and prints any console logs or 'consLog'

  function handleClickRun() {
    codeRun(solverIpt, consFunc)
    consFunc('------------- Code Terminated ------------- <')
    consQueue()
  }

  // how to use codeReturn
  // codeReturn(functionName, argNames, args, code (as string), console logging function)

  function handleClickTest() {

    console.log(codeReturn(problem.functionName, problem.argNames, problem.tests[0].inVal, solverIpt, consFunc))
  }


  // =============
  // return 
  // =============

  return (
    <div className="solverMain">

      <div className="solverTop">

        <div className="homeworkKing">
          {/* This is the homework king */}
        </div>

        <div className="solverDescription">
          {/* This is the problem description */}
          <h3>Problem Prompt:</h3>
          {!problem ? 'No Problem Loaded' : problem.text}
        </div>

      </div>

      <div className="solverBottom">
        <div className="solverCode">
          {/* This is the solver code area */}

          <p className="solverInstructions">Write your code in the following text area. The method 'console.log()' should print things into your browser inspector, but please use 'consLog()' to print things into the console text areas in the browser window.</p>

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
            onClick={() => { updConsoleText('') }} >
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
            {outputText}
          </div>



        </div>
      </div>

    </div>
  )
}
