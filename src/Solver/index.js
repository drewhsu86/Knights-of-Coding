import React, { useState, useEffect } from 'react'
import { codeReturn, compareValues } from './QuestionSolve'
import questions from './data/questions.json'

export default function Index() {

  // =============
  // states and variables
  // =============

  // we need a solverText, string 
  // consoleText, string (does not need onchange)
  // problem object which holds current object 
  // problemID holds the index of the problems 
  // they are in the server and not from an API so it's easier 
  const [solverText, updSolverText] = useState('')
  const [consoleText, updConsoleText] = useState('')
  const [problem, updProblem] = useState(null)
  const [problemID, updProblemID] = useState(0)

  // =============
  // functions and handlers
  // =============

  // handler for solverText which is an input area
  function handleChangeSolver(e) {
    updSolverText(e.target.value)
  }

  // =============
  // return 
  // =============



  return (
    <div className="solverMain">

      <div className="solverTop">
        <div className="solverDescription">
          This is the problem description
        </div>

        <div className="homeworkKing">
          This is the homework king
        </div>
      </div>

      <div className="solverBottom">
        <div className="solverCode">
          This is the solver code area
           <textarea
            value={solverText}
            onChange={handleChangeSolver}
          />
        </div>

        <div className="solverConsole">
          This is the solver console area
        </div>
      </div>

    </div>
  )
}
