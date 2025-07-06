import { useState } from 'react'
import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
