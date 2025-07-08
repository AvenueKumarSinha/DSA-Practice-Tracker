import React from 'react'
import "./Problems.css"
import Card from './Card'

const Problems = () => {
  return (
    <div className='ProblemsContainer'>
      <div className="ProblemsPanel">
        <div id="TopicName">All Topics</div>
        <div><button id="AddProblem">Add Problem</button></div>
      </div>
      <div className="ProblemsList">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default Problems
