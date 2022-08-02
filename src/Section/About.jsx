import React from 'react'
import ListElement from '../components/ListElement'

const About = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen max-h-screen'>
      <h1 className='font-bold text-5xl leading-normal w-80 mb-6'>About Me</h1>
        
      <ul className='text-lg font-medium w-max'>
        <ListElement Lkey="Name" value="Mohamad Krayem"/>
        <ListElement Lkey="Date of birth" value="May 30, 2002"/>
        <ListElement Lkey="Place of birth" value="Lebanon"/>
        <ListElement Lkey="Email" value="Mohamadkrayem1244@hotmail.com"/>
        <ListElement Lkey="Phone" value="+961 3 639 845"/>
        <button className='text-xl mt-3 bg-amber-400 rounded-full text-black px-5 py-3 border-2 border-solid border-transparent hover:border-inherit focus:border-sky-400'>Download CV</button>
      </ul>
    </div>
  )
}

export default About