"use client"
import {Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function MobileNavbar() {
  
    const [Open,setOpen] = useState(false)
  if (!Open) {
    return (
        <div className='md:hidden fixed bottom-4 right-4 z-50 w-10 h-10 bg-black/40 backdrop-blur-md border border-blue-400/40 rounded-2xl flex justify-center items-center shadow-md '>
            <button onClick={()=>{setOpen(true)}} className=''>
                <Menu/>
            </button>
        </div>
    )
  }
    return (  
     <nav className='w-full  h-screen  flex justify-center items-center fixed z-100 top-0 left-0 bg-black/20 backdrop-blur-md '>
    <div className='bg-black/50  border border-blue-500 w-screen h-[90%] rounded-2xl flex justify-centre items-center m-8 '>
        <ul className='flex justify-around  h-[80%] w-full items-center flex-col hover:text-blue-500 text-white text-2xl font-semibold'>
            <Link href={'/'}><li>Home</li></Link>
            <Link href={'/#about'}><li>About</li></Link>
            <Link href={'/events'}><li>Events</li></Link>
            <Link href={'/join-us'}><li>Join Us</li></Link>
            <Link href={'/team'}><li>Team</li></Link>
            {/* <Link href={'/home'}><li>Home</li></Link> */}
        <p onClick={()=>{
            setOpen(false)
        }} className='abosulte top-0 right-0 font-extrabold text-3xl'>X</p>
        </ul>
    </div>
    </nav>
  )
}

export default MobileNavbar
