import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Navbar = () => {
  return (
<nav className="bg-white border-gray-200 border-b-2">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
    <a href="https://flowbite.com/" className="flex items-start ">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-start text-2xl font-semibold whitespace-nowrap ">Decentralized LinkedIn</span>
    </a>
    <div className='absolute right-10'>
    <ConnectButton/>
    </div>
   
  </div>
</nav>
  )
}

export default Navbar