import React from 'react';
import {WiMoonAltWaningCrescent1} from 'react-icons/wi';
import { useState, useEffect } from 'react';

const Navbar = () => {

  function onClick(){
    
    document.querySelector('#menu').classList.toggle('invisible');
  }

  function changeTheme(){

    let appElement = document.querySelector('#app')

    appElement.classList.toggle('dark-mode')
    appElement.classList.toggle('light-mode')
  }
  

  return (
    <nav className='flex md:py-6 md:px-32 px-4 absolute h-fit w-full justify-between md:fixed z-50 md:bg-skin-primary'>

      <h2 className='md:text-xl text-2xl font-bold lg:basis-2/5 md:basis1/5 mt-6 md:mt-0 text-skin-secondary' >Mohamad</h2>
    
      <button onClick={onClick} data-collapse-toggle="navbar-default" type="button" className="fixed right-8 top-4 z-30 button inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-skin-third outline-none ring-2 ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <ul id='menu' className={`invisible md:visible z-20 flex md:justify-between gap-12 md:gap-6 lg:gap-12 rounded-md h-full md:bg-transparent bg-skin-fourth w-full pl-8 pt-20 md:pt-0 lg:basis-3/5 md:basis-4/5 flex-col md:flex-row fixed md:static`}>
        <li className='nav-element'><a href='#home'>Home</a></li>
        <li className='nav-element'><a href='#about'>About</a></li>
        <li className='nav-element'><a href='#skills'>Skills</a></li>
        <li className='nav-element'><a href='#resume'>Resume</a></li>
        <li className='nav-element'><a href='#projects'>Projects</a></li>
        <li className='nav-element'><a href='#contact'>Contact</a></li>
        <li onClick={changeTheme}><WiMoonAltWaningCrescent1 className=' text-4xl md:text-2xl hover:text-skin-third text-skin-secondary cursor-pointer'/></li>
      </ul>

    </nav>
  )
}

export default Navbar