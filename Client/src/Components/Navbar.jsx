import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { useEffect } from 'react';
import { usernameContext } from '../Context/Context';
import { DialogBoxContext } from '../Context/DialogBoxContext';
import { useNavigate } from "react-router-dom";

import { GrLogout } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Navbar = () => {
    const {username, setUsername, fullname, setFullname}=useContext(usernameContext)
    const {changePassword, setChangePassword, deleteAccount, setDeleteAccount}=useContext(DialogBoxContext)
    const navigate=useNavigate()

    const handleDeleteAccount=()=>{
        setDeleteAccount(true)
    }

    const handleChangePassword=()=>{
        setChangePassword(true)
    }

    const handleLogout=()=>{
        localStorage.removeItem("username")
        setUsername(null)
        localStorage.removeItem("fullname")
        setFullname(null)
        localStorage.removeItem("username")
        setUsername(null)
        navigate("/")
    }
    

  return (
    <>
        {changePassword && <ChangePassword/>}
        {deleteAccount && <DeleteAccount/>}

            <nav id="nav">
            <ul>
                <li id="LogoNav"><img src="../Logo.jpg"></img></li>
                <li id="Heading"><h1>DSA Practice Tracker</h1></li>
                <li id='fullname'>Welcome, <b>{fullname}</b></li>
                <li id="changePassword" onClick={handleChangePassword}>Change Password <BiSolidPencil size={20}/></li>
                <li id="deleteAccount" onClick={handleDeleteAccount}>Delete Account <MdDelete size={20}/></li>
                <li id="Logout" onClick={handleLogout}>Logout <GrLogout size={20}/></li>
            </ul>
            </nav>
    </>
  )
}

export default Navbar
