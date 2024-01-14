'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { LuLogOut } from "react-icons/lu";
const LogoutButton = ({
  className = 'border flex items-center gap-2 py-2 px-4 shadow'
}) => {
  return (
    <button 
    className={className}
    onClick={()=>signOut()}>
        <span>Logout</span>
        <LuLogOut size={20}/>
    </button>
  )
}

export default LogoutButton