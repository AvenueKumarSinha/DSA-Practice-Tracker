import React from 'react'
import "./Problems.css"
import Card from './Card'

import { useState } from 'react'
import AddProblemComponent from './AddProblemComponent'
import { DialogBoxContext } from "../Context/DialogBoxContext";
import { useContext } from 'react'

const Problems = () => {
  const {AddProblemState,setAddProblemState}=useContext(DialogBoxContext)

  const handleAddProblem=()=>{
    setAddProblemState(true)
  }

  return (
    <>
      {AddProblemState && <AddProblemComponent/>}

      <div className='ProblemsContainer'>
        <div className="ProblemsPanel">
          <div id="TopicName">All Topics</div>
          <div><button id="AddProblem" onClick={handleAddProblem}>Add Problem</button></div>
        </div>
        <div className="ProblemsList">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </>
  )
}

export default Problems
