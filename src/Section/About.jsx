import React from 'react'
import Button from '../components/Button'
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
        <Button text="Download CV" px="5" py="3"/>
      </ul>
    </div>
  )
}

export default About