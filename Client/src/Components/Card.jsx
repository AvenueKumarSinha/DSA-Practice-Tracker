import React from 'react'
import './Card.css'

import { FaCode } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoMdDocument } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Card = () => {
  return (
    <div className='CardContainer'>
        <p id="problemNumber">1.</p>
      <p id="problemName">Directed Graph(Acyclic) DFS</p>
      <p id="problemLink"><a href=""><FaCode size={30}/></a></p>
      <p id="videoLink"><a href=""><FaYoutube size={30}/></a></p>
      <p id="textMaterial"><IoMdDocument size={30}/></p>
      <p id="notes"><GrNotes size={30}/></p>
      <p id="star"><FaStar size={30}/></p>
      <p id="problemDelete"><MdDelete size={30}/></p>
    </div>
  )
}

export default Card
