import React from 'react'
import Button from '../components/Button'
import ListElement from '../components/ListElement'

const About = () => {
  return (
    <div id='about' className='col-center h-screen max-h-screen md:gap-12 gap-8'>
      <h1 className='font-bold text-5xl leading-normal text-start w-80 mb-6 font-["Poppins"] text-skin-secondary'>About Me</h1>
        
      <ul className='text-lg font-medium w-max flex flex-col justify-center md:gap-4 gap-2'>
        <ListElement Lkey="Name" value="Mohamad Krayem"/>
        <ListElement Lkey="Date of birth" value="May 30, 2002"/>
        <ListElement Lkey="Place of birth" value="Lebanon"/>
        <ListElement Lkey="Email" value="mohamadkrayem@yandex.com"/>
        <ListElement Lkey="Phone" value="+961 3 639 845"/>
        <Button url="/assets/resume.pdf" text="Download CV" px="px-5 md:slef-start w-48" py="py-3"/>
      </ul>
    </div>
  )
}

export default About