'use client'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import {signIn} from "next-auth/react"
const LoginWithGoogle = () => {
  return (
    <button
    onClick={()=> signIn('google')}
    className='bg-white shadow text-center w-full py-4 flex gap-2 justify-center items-center'>
        <FaGoogle size={25}/> 
        <span>Sign in with google</span>
      </button>
  )
}

export default LoginWithGoogle