import React from 'react'
import "./Navbar.css"
import { useEffect } from 'react';

import { GrLogout } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

const Navbar = () => {

    useEffect(() => {
      //retrieve full name
    }, [])
    

  return (
    <nav id="nav">
      <ul>
        <li id="LogoNav"><img src="../Logo.jpg"></img></li>
        <li id="Heading"><h1>DSA Practice Tracker</h1></li>
        <li id='fullname'>Welcome, <b>full name</b></li>
        <li id="changePassword">Change Password <BiSolidPencil size={20}/></li>
        <li id="deleteAccount">Delete Account <MdDelete size={20}/></li>
        <li id="Logout">Logout <GrLogout size={20}/></li>
      </ul>
    </nav>
  )
}

export default Navbar
