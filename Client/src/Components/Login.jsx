import React from 'react'
import './Login.css'

import {useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'

const Login = () => {

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
            <p id='Welcome'>Welcome Back</p>
            <p id='signup'>Don't have an account yet? <NavLink to="/signup">Sign up</NavLink></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} type='text' placeholder='Email address'/>
                <input {...register("password")} type='password' placeholder='Password'/>
                <button disabled={isSubmitting} type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
