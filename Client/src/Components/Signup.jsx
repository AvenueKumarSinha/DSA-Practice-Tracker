import React from 'react'
import "./Login.css"

import {useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    const{
            register,
            handleSubmit,
            watch,
            formState:{errors, isSubmitting},
        }=useForm()
    
        const onSubmit=(data)=>{
            console.log(data)
        }

  return (
    <div className='LoginBackground'>
        <div className="LoginContainer">
            <p id='Welcome'>Sign Up</p>
            <p id='signup'>Go to <NavLink to="/">Login</NavLink> Page</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("username")} type='text' placeholder='Username'/>
                <input {...register("email")} type='text' placeholder='Email address'/>
                <input {...register("password")} type='password' placeholder='Password'/>
                <button disabled={isSubmitting} type='submit'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signup
