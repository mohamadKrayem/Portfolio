import React from 'react';
import {WiMoonAltWaningCrescent1} from 'react-icons/wi';

const Navbar = () => {
  return (
    <nav className='flex py-6 px-32'>

      <h2 className='text-xl font-bold basis-2/5' >Mohamad</h2>
      
      <ul className='flex justify-between basis-3/5'>
        <li className='font-medium '>Home</li>
        <li className='font-medium'>About</li>
        <li className='font-medium'>Skills</li>
        <li className='font-medium'>Resume</li>
        <li className='font-medium'>Projects</li>
        <li className='font-medium'>Contact</li>
        <WiMoonAltWaningCrescent1 className='text-2xl'/>
      </ul>

    </nav>
  )
}

export default Navbar